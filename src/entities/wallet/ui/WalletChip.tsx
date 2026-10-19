import { ChevronDownIcon, WalletIcon } from '@/shared/icons';

interface Props {
  /** The wallet's name; nothing is shown without one. */
  name?: string;
  onClick: () => void;
}

export function WalletChip({ name, onClick }: Props) {
  if (!name) return null;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Ví: ${name}. Nhấn để đổi ví`}
      className="btn btn-ghost btn-sm min-h-11 rounded-full gap-2 self-center text-on-surface-variant"
    >
      <WalletIcon size={16} />
      <span className="font-semibold text-on-surface">{name}</span>
      <ChevronDownIcon size={16} />
    </button>
  );
}
