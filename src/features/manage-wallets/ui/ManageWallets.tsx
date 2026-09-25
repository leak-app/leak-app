import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  summarizeWallets,
  useWallets,
  type WalletModel,
} from '@/entities/wallet';

import { ArchiveWalletDialog } from './ArchiveWalletDialog';
import { WalletActionsSheet } from './WalletActionsSheet';
import { WalletFormSheet } from './WalletFormSheet';
import { WalletGroup } from './WalletGroup';
import { WalletTotalCard } from './WalletTotalCard';

export function ManageWallets({ addRequested }: { addRequested: number }) {
  const navigate = useNavigate();
  const { data: wallets = [], isLoading, isError, refetch } = useWallets();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<WalletModel | null>(null);
  const [actionsFor, setActionsFor] = useState<WalletModel | null>(null);
  const [archiving, setArchiving] = useState<WalletModel | null>(null);

  // The page's "Thêm ví" button bumps addRequested; react to the change during
  // render (https://react.dev/learn/you-might-not-need-an-effect).
  const [seenAddRequest, setSeenAddRequest] = useState(addRequested);
  if (addRequested !== seenAddRequest) {
    setSeenAddRequest(addRequested);
    setEditing(null);
    setFormOpen(true);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 mt-4">
        <div className="skeleton h-32 rounded-3xl" />
        <div className="skeleton h-14 rounded-2xl" />
        <div className="skeleton h-14 rounded-2xl" />
        <div className="skeleton h-14 rounded-2xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="card bg-surface border border-outline/10 p-6 mt-4 items-center gap-3">
        <span className="text-sm text-on-surface">
          Không tải được danh sách ví
        </span>
        <button
          type="button"
          className="btn btn-primary btn-sm min-h-11"
          onClick={() => refetch()}
        >
          Thử lại
        </button>
      </div>
    );
  }

  const summary = summarizeWallets(wallets);
  // month=all: a wallet's history is its whole history, not just this month.
  const openHistory = (w: WalletModel) =>
    navigate(`/transactions?accountId=${encodeURIComponent(w.id)}&month=all`);

  return (
    <div className="flex flex-col gap-6 mt-4 pb-28">
      <WalletTotalCard
        totalText={summary.totalText}
        countTexts={summary.countTexts}
      />
      {summary.groups.map((group) => (
        <WalletGroup
          key={group.type}
          group={group}
          onOpen={openHistory}
          onMore={setActionsFor}
        />
      ))}

      <WalletActionsSheet
        wallet={actionsFor}
        canArchive={summary.canArchive}
        onClose={() => setActionsFor(null)}
        onEdit={(w) => {
          setActionsFor(null);
          setEditing(w);
          setFormOpen(true);
        }}
        onArchive={(w) => {
          setActionsFor(null);
          setArchiving(w);
        }}
      />
      <WalletFormSheet
        open={formOpen}
        editing={editing}
        onClose={() => setFormOpen(false)}
      />
      <ArchiveWalletDialog
        wallet={archiving}
        onClose={() => setArchiving(null)}
      />
    </div>
  );
}
