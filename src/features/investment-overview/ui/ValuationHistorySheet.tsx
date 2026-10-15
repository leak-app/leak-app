import { clsx } from 'clsx';
import { useState } from 'react';

import {
  useWalletTransfers,
  type TransferItemModel,
} from '@/entities/transfer';
import {
  useWalletValuations,
  type ValuationHistoryItemModel,
} from '@/entities/valuation';
import { getApiErrorMessage } from '@/shared/api';
import { useBalanceVisibility } from '@/shared/hooks';
import { ICON, LockIcon, UndoIcon } from '@/shared/icons';
import { BottomSheet, Button, Card } from '@/shared/ui';

import { useDeleteTransfer } from '../api/deleteTransfer.api';
import { useUndoValuation } from '../api/undoValuation.api';
import { findCountingUpdateDay } from '../lib/counted';

type HistoryTab = 'updates' | 'transfers';

const TABS: { id: HistoryTab; label: string }[] = [
  { id: 'updates', label: 'Cập nhật số dư' },
  { id: 'transfers', label: 'Chuyển tiền' },
];

interface ValuationHistorySheetProps {
  /** The wallet whose history is shown; the sheet is open while it is set. */
  wallet: { id: string; name: string } | null;
  onClose: () => void;
}

export function ValuationHistorySheet({
  wallet,
  onClose,
}: ValuationHistorySheetProps) {
  return (
    <BottomSheet
      open={!!wallet}
      onClose={onClose}
      title={wallet ? `Lịch sử · ${wallet.name}` : undefined}
      ariaLabel="Lịch sử cập nhật số dư"
      size="tall"
    >
      {wallet && (
        <HistoryBody
          key={wallet.id}
          walletId={wallet.id}
        />
      )}
    </BottomSheet>
  );
}

function HistoryBody({ walletId }: { walletId: string }) {
  const [tab, setTab] = useState<HistoryTab>('updates');

  return (
    <div className="flex flex-col gap-4">
      <div
        role="tablist"
        aria-label="Loại lịch sử"
        className="grid grid-cols-2 gap-1 rounded-card bg-white/5 p-1"
      >
        {TABS.map((item) => {
          const selected = item.id === tab;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setTab(item.id)}
              className={clsx(
                'h-10 rounded-full text-description transition-colors duration-200 ease-out focus-visible:shadow-focus focus-visible:outline-none',
                selected
                  ? 'bg-white/10 font-semibold text-text'
                  : 'font-medium text-muted'
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {tab === 'updates' ? (
        <HistoryList walletId={walletId} />
      ) : (
        <TransferList walletId={walletId} />
      )}
    </div>
  );
}

function HistoryList({ walletId }: { walletId: string }) {
  const { data, isLoading, isError } = useWalletValuations(walletId);
  const undo = useUndoValuation();
  const [confirming, setConfirming] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <span
          className="loading loading-spinner loading-md text-primary"
          aria-label="Đang tải"
        />
      </div>
    );
  }
  if (isError || !data) {
    return (
      <Card
        variant="danger"
        role="alert"
        className="text-description text-text"
      >
        Không tải được lịch sử cập nhật. Vui lòng thử lại sau.
      </Card>
    );
  }
  if (data.length === 0) {
    return (
      <p className="text-description text-muted">
        Chưa có lần cập nhật số dư nào.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col">
        {data.map((item) => (
          <HistoryRow
            key={item.id}
            item={item}
            confirming={confirming === item.id}
            busy={undo.isPending}
            onAskUndo={() => setConfirming(item.id)}
            onCancel={() => setConfirming(null)}
            onUndo={() =>
              undo.mutate(item.id, { onSettled: () => setConfirming(null) })
            }
          />
        ))}
      </ul>
      {undo.error && (
        <Card
          variant="danger"
          role="alert"
          className="text-description text-text"
        >
          {getApiErrorMessage(
            undo.error,
            'Không hoàn tác được. Vui lòng thử lại.'
          )}
        </Card>
      )}
    </div>
  );
}

interface HistoryRowProps {
  item: ValuationHistoryItemModel;
  confirming: boolean;
  busy: boolean;
  onAskUndo: () => void;
  onCancel: () => void;
  onUndo: () => void;
}

function HistoryRow({
  item,
  confirming,
  busy,
  onAskUndo,
  onCancel,
  onUndo,
}: HistoryRowProps) {
  const { mask } = useBalanceVisibility();
  const { flow, result } = item;

  return (
    <li className="flex flex-col gap-1.5 border-b border-border-subtle py-3.5 last:border-b-0">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-label font-normal text-muted">
          {item.dateText}
          {item.isLatest && ' · mới nhất'}
        </span>
        <span className="text-heading tabular-nums text-text">
          {mask(item.balanceText)}
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-3 text-label font-normal">
        <span className="text-soft">
          {flow.label}
          {flow.amountText && ` ${mask(flow.amountText)}`}
        </span>
        <span className={clsx('text-right font-semibold', result.toneClass)}>
          {result.label}
          {result.amountText && ` ${mask(result.amountText)}`}
          {result.returnText && ` (${result.returnText})`}
        </span>
      </div>
      {item.canUndo &&
        (confirming ? (
          <Card
            role="alert"
            variant="danger"
            className="mt-1.5 flex flex-col gap-2.5 !rounded-tile !p-3.5"
          >
            <span className="text-label leading-normal font-normal text-text">
              Hoàn tác lần cập nhật này? Số dư ví sẽ quay về như trước.
            </span>
            <div className="flex gap-2">
              <Button
                variant="danger"
                className="flex-1 text-sm"
                loading={busy}
                onClick={onUndo}
              >
                Hoàn tác
              </Button>
              <Button
                variant="secondary"
                className="flex-1 text-sm"
                disabled={busy}
                onClick={onCancel}
              >
                Giữ lại
              </Button>
            </div>
          </Card>
        ) : (
          <Button
            variant="secondary"
            className="mt-1 self-start text-label"
            leadingIcon={
              <UndoIcon
                size={14}
                strokeWidth={1.9}
                aria-hidden="true"
              />
            }
            onClick={onAskUndo}
          >
            Hoàn tác
          </Button>
        ))}
    </li>
  );
}

function TransferList({ walletId }: { walletId: string }) {
  const { data, isError } = useWalletTransfers(walletId);
  const { data: updates } = useWalletValuations(walletId);
  const remove = useDeleteTransfer();
  const [confirming, setConfirming] = useState<string | null>(null);

  if (isError) {
    return (
      <Card
        variant="danger"
        role="alert"
        className="text-description text-text"
      >
        Không tải được các lần chuyển tiền.
      </Card>
    );
  }
  if (!data) return null;
  if (data.length === 0) {
    return (
      <p className="text-description text-muted">
        Chưa có lần chuyển tiền nào.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col">
        {data.map((item) => (
          <TransferRow
            key={item.id}
            item={item}
            countedOn={findCountingUpdateDay(item.createdAt, updates ?? [])}
            confirming={confirming === item.id}
            busy={remove.isPending}
            onAskDelete={() => setConfirming(item.id)}
            onCancel={() => setConfirming(null)}
            onDelete={() =>
              remove.mutate(item.id, {
                onSettled: () => setConfirming(null),
              })
            }
          />
        ))}
      </ul>
      {remove.error && (
        <Card
          variant="danger"
          role="alert"
          className="text-description text-text"
        >
          {getApiErrorMessage(
            remove.error,
            'Không xóa được lần chuyển tiền. Vui lòng thử lại.'
          )}
        </Card>
      )}
    </div>
  );
}

interface TransferRowProps {
  item: TransferItemModel;
  /** "01/10" when a balance update already counted this transfer. */
  countedOn: string | null;
  confirming: boolean;
  busy: boolean;
  onAskDelete: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

function TransferRow({
  item,
  countedOn,
  confirming,
  busy,
  onAskDelete,
  onCancel,
  onDelete,
}: TransferRowProps) {
  const { mask } = useBalanceVisibility();

  return (
    <li className="flex flex-col gap-1.5 border-b border-border-subtle py-3.5 last:border-b-0">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-label font-normal text-muted">
          {item.dateText}
        </span>
        <span className={`text-heading tabular-nums ${item.toneClass}`}>
          {mask(item.amountText)}
        </span>
      </div>
      <span className="text-description text-text">{item.title}</span>
      {item.note && (
        <span className="text-label font-normal text-soft">“{item.note}”</span>
      )}
      {countedOn ? (
        <span className="flex items-center gap-1.5 text-caption text-muted">
          <LockIcon
            size={13}
            strokeWidth={ICON.stroke.active}
            aria-hidden="true"
          />
          Đã tính trong lần cập nhật {countedOn} — hoàn tác lần đó để xóa.
        </span>
      ) : confirming ? (
        <Card
          role="alert"
          variant="danger"
          className="mt-1.5 flex flex-col gap-2.5 !rounded-tile !p-3.5"
        >
          <span className="text-label leading-normal font-normal text-text">
            Xóa lần chuyển tiền này? Tiền sẽ quay về ví cũ.
          </span>
          <div className="flex gap-2">
            <Button
              variant="danger"
              className="flex-1 text-sm"
              loading={busy}
              onClick={onDelete}
            >
              Xóa
            </Button>
            <Button
              variant="secondary"
              className="flex-1 text-sm"
              disabled={busy}
              onClick={onCancel}
            >
              Giữ lại
            </Button>
          </div>
        </Card>
      ) : (
        <>
          <span className="text-caption text-muted">
            Sẽ được tính ở lần cập nhật số dư tới.
          </span>
          <Button
            variant="dangerGhost"
            className="mt-1 self-start border-danger/40 text-label"
            onClick={onAskDelete}
          >
            Xóa
          </Button>
        </>
      )}
    </li>
  );
}
