import { useId } from 'react';

import type { WalletModel } from '@/entities/wallet';
import { AmountField, BottomSheet, Button, Card, Numpad } from '@/shared/ui';

import { useBalanceUpdate } from '../model/useBalanceUpdate';
import { BalancePreviewCard } from './BalancePreviewCard';
import { ModeChoice } from './ModeChoice';

interface BalanceUpdateSheetProps {
  /** The investment wallet being updated; the sheet is open while it is set. */
  wallet: WalletModel | null;
  onClose: () => void;
}

/** Asks for the wallet's new total and shows the profit it implies before saving. */
export function BalanceUpdateSheet({
  wallet,
  onClose,
}: BalanceUpdateSheetProps) {
  return (
    <BottomSheet
      open={!!wallet}
      onClose={onClose}
      title={wallet ? `Cập nhật số dư · ${wallet.name}` : undefined}
      ariaLabel="Cập nhật số dư"
      size="tall"
    >
      {/* Keyed so the form resets when switching between wallets. */}
      {wallet && (
        <BalanceUpdateForm
          key={wallet.id}
          wallet={wallet}
          onDone={onClose}
        />
      )}
    </BottomSheet>
  );
}

function BalanceUpdateForm({
  wallet,
  onDone,
}: {
  wallet: WalletModel;
  onDone: () => void;
}) {
  const form = useBalanceUpdate(wallet, onDone);
  const questionId = useId();
  const helper = `Trong ứng dụng đang ghi: ${form.currentText}${
    form.isFirstUpdate && form.isOpeningBalance ? ' (số dư ban đầu)' : ''
  }`;

  return (
    <form
      className="flex min-h-full flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        form.submit();
      }}
    >
      {form.isFirstUpdate ? (
        <span className="self-start rounded-full bg-secondary-tint px-2.5 py-1 text-tab font-semibold text-secondary">
          Lần đầu cho ví này
        </span>
      ) : (
        <p className="text-label leading-normal font-normal text-muted">
          Nhập tổng số dư {wallet.name} đang có hôm nay. Phần chênh lệch so với
          số liệu trong ứng dụng sẽ được tính là lãi hoặc lỗ.
        </p>
      )}

      <AmountField
        label="Số dư hiện tại"
        value={form.amountText}
        onValueChange={form.setAmount}
        helper={helper}
        // The numpad replaces the phone keyboard; a physical keyboard still types.
        inputMode={form.isFirstUpdate ? 'numeric' : 'none'}
        autoFocus
      />

      {form.isFirstUpdate && (
        <div
          role="radiogroup"
          aria-labelledby={questionId}
          className="flex flex-col gap-2"
        >
          <span
            id={questionId}
            className="text-body font-medium text-text"
          >
            Con số này nên được tính thế nào?
          </span>
          <ModeChoice
            label="Đây là số dư hiện tại"
            hint="Bắt đầu tính lãi lỗ từ hôm nay. Số bạn nhập được tính là vốn."
            checked={form.asBaseline}
            onSelect={() => form.setAsBaseline(true)}
          />
          <ModeChoice
            label="Tính lãi từ lúc mở ví"
            hint={`Phần chênh so với ${form.currentText} trong ứng dụng được tính là lãi hoặc lỗ.`}
            checked={!form.asBaseline}
            onSelect={() => form.setAsBaseline(false)}
          />
        </div>
      )}

      {form.preview && <BalancePreviewCard preview={form.preview} />}

      {form.errorText && (
        <Card
          variant="danger"
          role="alert"
          className="text-description text-text"
        >
          {form.errorText}
        </Card>
      )}

      {!form.isFirstUpdate && (
        <Numpad
          onKeyPress={form.pressKey}
          className="mt-auto !px-0"
        />
      )}

      <div
        className={form.isFirstUpdate ? 'mt-auto flex gap-2.5' : 'flex gap-2.5'}
      >
        <Button
          type="button"
          variant="ghost"
          onClick={onDone}
        >
          Hủy
        </Button>
        <Button
          type="submit"
          size="lg"
          className="flex-1"
          loading={form.isSaving}
          disabled={!form.canSubmit}
        >
          Lưu số dư
        </Button>
      </div>
    </form>
  );
}
