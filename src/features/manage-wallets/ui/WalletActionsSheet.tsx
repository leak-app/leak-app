import type { WalletModel } from '@/entities/wallet';
import { BottomSheet } from '@/shared/ui';

interface Props {
  wallet: WalletModel | null;
  canArchive: boolean;
  canTransfer: boolean;
  onTransfer: (wallet: WalletModel) => void;
  onUpdateBalance: (wallet: WalletModel) => void;
  onEdit: (wallet: WalletModel) => void;
  onArchive: (wallet: WalletModel) => void;
  onClose: () => void;
}

export function WalletActionsSheet({
  wallet,
  canArchive,
  canTransfer,
  onTransfer,
  onUpdateBalance,
  onEdit,
  onArchive,
  onClose,
}: Props) {
  return (
    <BottomSheet
      open={!!wallet}
      onClose={onClose}
      title={wallet?.name}
    >
      {wallet && (
        <div className="flex flex-col gap-2">
          {wallet.valuation && (
            <button
              type="button"
              className="btn btn-ghost min-h-12 justify-start"
              onClick={() => onUpdateBalance(wallet)}
            >
              Cập nhật số dư
            </button>
          )}
          {canTransfer && (
            <button
              type="button"
              className="btn btn-ghost min-h-12 justify-start"
              onClick={() => onTransfer(wallet)}
            >
              Chuyển tiền từ ví này
            </button>
          )}
          <button
            type="button"
            className="btn btn-ghost min-h-12 justify-start"
            onClick={() => onEdit(wallet)}
          >
            Sửa ví
          </button>
          <button
            type="button"
            disabled={!canArchive}
            className="btn btn-ghost min-h-12 justify-start text-error"
            onClick={() => onArchive(wallet)}
          >
            Lưu trữ ví
          </button>
          {!canArchive && (
            <p className="text-xs text-on-surface-variant px-4">
              Bạn cần ít nhất một ví đang dùng.
            </p>
          )}
        </div>
      )}
    </BottomSheet>
  );
}
