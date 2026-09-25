import type { WalletGroupModel, WalletModel } from '@/entities/wallet';

import { WalletRow } from './WalletRow';

interface Props {
  group: WalletGroupModel;
  onOpen: (wallet: WalletModel) => void;
  onMore: (wallet: WalletModel) => void;
}

export function WalletGroup({ group, onOpen, onMore }: Props) {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between px-1">
        <h2 className="text-sm font-bold text-on-surface">{group.title}</h2>
        <span className="text-xs text-on-surface-variant tabular-nums">
          {group.totalText}
        </span>
      </div>
      <ul className="flex flex-col gap-2">
        {group.wallets.map((wallet) => (
          <WalletRow
            key={wallet.id}
            wallet={wallet}
            onOpen={onOpen}
            onMore={onMore}
          />
        ))}
      </ul>
    </section>
  );
}
