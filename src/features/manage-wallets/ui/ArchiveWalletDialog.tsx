import { useArchiveWallet, type WalletModel } from '@/entities/wallet';
import { getApiErrorMessage } from '@/shared/api';
import { BottomSheet } from '@/shared/ui';

interface Props {
  wallet: WalletModel | null;
  onClose: () => void;
}

export function ArchiveWalletDialog({ wallet, onClose }: Props) {
  const archive = useArchiveWallet();
  const close = () => {
    archive.reset();
    onClose();
  };
  return (
    <BottomSheet
      open={!!wallet}
      onClose={close}
      title={wallet ? `Lưu trữ ví ${wallet.name}?` : undefined}
    >
      <p className="text-sm text-on-surface-variant">
        Giao dịch cũ vẫn được giữ lại. Ví sẽ không còn hiển thị khi ghi chép.
      </p>
      {archive.isError && (
        <div
          role="alert"
          className="alert alert-error alert-soft text-xs mt-3"
        >
          {getApiErrorMessage(archive.error, 'Không lưu trữ được ví.')}
        </div>
      )}
      <div className="flex gap-2 mt-4">
        <button
          type="button"
          className="btn btn-ghost flex-1 min-h-11"
          onClick={close}
        >
          Hủy
        </button>
        <button
          type="button"
          disabled={archive.isPending}
          className="btn btn-error flex-1 min-h-11"
          onClick={() =>
            wallet && archive.mutate(wallet.id, { onSuccess: close })
          }
        >
          Lưu trữ
        </button>
      </div>
    </BottomSheet>
  );
}
