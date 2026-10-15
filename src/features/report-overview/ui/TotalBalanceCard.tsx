import { Link } from 'react-router-dom';

import { useBalanceVisibility } from '@/shared/hooks';
import { EyeIcon, EyeOffIcon } from '@/shared/icons';

interface TotalBalanceCardProps {
  totalText: string;
  growthPercentage: number;
  accountsCount: number;
  splitText?: string | null;
}

export function TotalBalanceCard({
  totalText,
  growthPercentage,
  accountsCount,
  splitText,
}: TotalBalanceCardProps) {
  const { isHidden, toggle, mask } = useBalanceVisibility();
  const ToggleIcon = isHidden ? EyeOffIcon : EyeIcon;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold tracking-widest text-on-surface-variant/70 uppercase">
          Tổng số dư hiện tại
        </span>
        <button
          type="button"
          onClick={toggle}
          aria-pressed={isHidden}
          aria-label={isHidden ? 'Hiện số dư' : 'Ẩn số dư'}
          className="btn btn-ghost btn-circle min-h-11 min-w-11 -my-2 -mr-2 text-on-surface-variant"
        >
          <ToggleIcon
            size={20}
            strokeWidth={1.75}
          />
        </button>
      </div>

      <Link
        to="/wallets"
        aria-label="Xem các ví"
        className="flex flex-col gap-2 rounded-2xl min-h-11"
      >
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-on-surface tracking-tight">
            {mask(totalText)}
          </span>
          <span className="text-lg font-bold text-primary">VND</span>
        </div>

        {splitText && !isHidden && (
          <span className="text-xs text-on-surface-variant">{splitText}</span>
        )}

        <div className="flex items-center gap-2 mt-1">
          <div className="badge badge-success badge-soft font-semibold gap-1 px-3 py-1 text-xs">
            <span>📈</span>
            <span>+{growthPercentage}%</span>
          </div>

          <div className="badge badge-info badge-soft font-medium gap-1.5 px-3 py-1 text-xs">
            <span>💳</span>
            <span>{accountsCount} Tài khoản</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
