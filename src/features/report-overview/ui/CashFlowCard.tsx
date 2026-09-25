import { clsx } from 'clsx';

import { MinusIcon, TrendingDownIcon, TrendingUpIcon } from '@/shared/icons';

import { useMonthlyCashFlow } from '../api';

const DELTA_ICONS = {
  up: TrendingUpIcon,
  down: TrendingDownIcon,
  flat: MinusIcon,
};

export function CashFlowCard() {
  const { data, isLoading, isError } = useMonthlyCashFlow();
  if (isLoading) return <div className="skeleton h-28 rounded-3xl" />;
  if (isError || !data) return null;
  const DeltaIcon = data.deltaDirection
    ? DELTA_ICONS[data.deltaDirection]
    : null;

  return (
    <section
      aria-label="Dòng tiền tháng này"
      className="card bg-surface/90 border border-outline/10 rounded-3xl p-4 gap-3"
    >
      <h2 className="text-sm font-bold text-on-surface">Dòng tiền tháng này</h2>
      <div className="stats stats-horizontal bg-transparent w-full">
        <div className="stat px-2 py-1">
          <div className="stat-title text-xs">Thu nhập</div>
          <div className="stat-value text-base tabular-nums text-on-surface">
            {data.incomeText}
          </div>
        </div>
        <div className="stat px-2 py-1">
          <div className="stat-title text-xs">Chi tiêu</div>
          <div className="stat-value text-base tabular-nums text-on-surface">
            {data.expenseText}
          </div>
        </div>
        <div className="stat px-2 py-1">
          <div className="stat-title text-xs">Còn lại</div>
          <div
            className={clsx(
              'stat-value text-base tabular-nums',
              data.isNetNegative ? 'text-error' : 'text-on-surface'
            )}
          >
            {data.netText}
          </div>
        </div>
      </div>
      <p className="flex items-center gap-1.5 text-xs text-on-surface-variant">
        {DeltaIcon && (
          <DeltaIcon
            size={14}
            aria-hidden="true"
          />
        )}
        {data.deltaText}
      </p>
    </section>
  );
}
