import { CheckIcon } from '@/shared/icons';
import { BottomSheet } from '@/shared/ui';

import type { WalletModel } from '../model/types';

interface Props {
  open: boolean;
  wallets: WalletModel[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}

export function WalletPickerSheet({
  open,
  wallets,
  selectedId,
  onSelect,
  onClose,
}: Props) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Chọn ví"
    >
      <ul className="flex flex-col gap-1">
        {wallets.map((wallet) => (
          <li key={wallet.id}>
            <button
              type="button"
              onClick={() => {
                onSelect(wallet.id);
                onClose();
              }}
              className="btn btn-ghost w-full min-h-14 justify-between rounded-2xl px-4"
            >
              <span className="flex flex-col items-start">
                <span className="text-sm font-semibold text-on-surface">
                  {wallet.name}
                </span>
                <span className="text-xs text-on-surface-variant">
                  {wallet.typeLabel}
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-sm tabular-nums text-on-surface">
                  {wallet.compactBalanceText}
                </span>
                {wallet.id === selectedId && (
                  <CheckIcon
                    size={18}
                    className="text-primary"
                    aria-hidden="true"
                  />
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </BottomSheet>
  );
}
