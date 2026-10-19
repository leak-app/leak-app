import { Link } from 'react-router-dom';

import type { WalletGroupModel, WalletModel } from '@/entities/wallet';
import { useBalanceVisibility } from '@/shared/hooks';

import { WalletRow } from './WalletRow';

interface Props {
  group: WalletGroupModel;
  onOpen: (wallet: WalletModel) => void;
  onMore: (wallet: WalletModel) => void;
  onUpdateBalance: (wallet: WalletModel) => void;
}

export function WalletGroup({ group, onOpen, onMore, onUpdateBalance }: Props) {
  const { mask } = useBalanceVisibility();
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between px-1">
        <h2 className="text-sm font-bold text-on-surface">{group.title}</h2>
        {group.type === 'INVESTMENT' ? (
          <Link
            to="/investment"
            className="flex min-h-11 items-center text-label text-primary focus-visible:shadow-focus focus-visible:outline-none"
          >
            Xem lãi lỗ →
          </Link>
        ) : (
          <span className="text-xs text-on-surface-variant tabular-nums">
            {mask(group.totalText)}
          </span>
        )}
      </div>
      <ul className="flex flex-col gap-2">
        {group.wallets.map((wallet) => (
          <WalletRow
            key={wallet.id}
            wallet={wallet}
            onOpen={onOpen}
            onMore={onMore}
            onUpdateBalance={onUpdateBalance}
          />
        ))}
      </ul>
    </section>
  );
}
