import type { WalletModel } from '@/entities/wallet';
import { ChevronDownIcon, WalletIcon } from '@/shared/icons';

interface Props {
  wallet?: WalletModel;
  onClick: () => void;
}

export function WalletChip({ wallet, onClick }: Props) {
  if (!wallet) return null;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Ví: ${wallet.name}. Nhấn để đổi ví`}
      className="btn btn-ghost btn-sm min-h-11 rounded-full gap-2 self-center text-on-surface-variant"
    >
      <WalletIcon size={16} />
      <span className="font-semibold text-on-surface">{wallet.name}</span>
      <ChevronDownIcon size={16} />
    </button>
  );
}
