import type { WalletModel } from '@/entities/wallet';
import {
  EllipsisVerticalIcon,
  TrendingUpIcon,
  WalletIcon,
} from '@/shared/icons';
import { Button } from '@/shared/ui';

interface Props {
  wallet: WalletModel;
  onOpen: (wallet: WalletModel) => void;
  onMore: (wallet: WalletModel) => void;
  onUpdateBalance: (wallet: WalletModel) => void;
}

export function WalletRow({ wallet, onOpen, onMore, onUpdateBalance }: Props) {
  const Icon = wallet.type === 'INVESTMENT' ? TrendingUpIcon : WalletIcon;
  const { valuation } = wallet;
  return (
    <li className="rounded-2xl bg-surface/60 border border-outline/10">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onOpen(wallet)}
          className="flex flex-1 min-h-14 items-center gap-3 px-4 text-left"
        >
          <Icon
            size={20}
            className="text-on-surface-variant shrink-0"
            aria-hidden="true"
          />
          <span className="flex-1 text-sm font-semibold text-on-surface line-clamp-1">
            {wallet.name}
          </span>
          <span className="text-sm font-bold text-on-surface tabular-nums">
            {wallet.balanceText}
          </span>
        </button>
        <button
          type="button"
          onClick={() => onMore(wallet)}
          aria-label={`Tùy chọn ví ${wallet.name}`}
          className="btn btn-ghost btn-square min-h-11 min-w-11 mr-1"
        >
          <EllipsisVerticalIcon size={18} />
        </button>
      </div>
      {valuation && (
        <div className="flex flex-col gap-2.5 px-4 pb-3">
          <span className="text-caption text-muted">
            {valuation.hasUpdates && (
              <>
                <span className={`font-semibold ${valuation.toneClass}`}>
                  {valuation.profitWord} {valuation.profitText}
                </span>
                {valuation.returnText && ` · ${valuation.returnText}`}
                {' · '}
              </>
            )}
            {valuation.lastUpdatedText}
            {valuation.staleText && (
              <span className="font-medium text-secondary">
                {' · '}
                {valuation.staleText}
              </span>
            )}
          </span>
          {valuation.staleText && (
            <Button
              variant="reminder"
              className="self-start text-label"
              onClick={() => onUpdateBalance(wallet)}
            >
              Cập nhật số dư
            </Button>
          )}
        </div>
      )}
    </li>
  );
}
