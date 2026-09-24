import { Link } from 'react-router-dom';

import { useLeakRate } from '../api/leakRate.api';
import type { LeakRatePeriodModel } from '../model/types';
import { LeakRow } from './LeakRow';

export function LeakReport(period: LeakRatePeriodModel) {
  const { data, isLoading, isError } = useLeakRate(period);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-on-surface-variant">
        <span className="loading loading-spinner loading-md text-primary" />
        <span className="text-xs font-medium">Đang tải báo cáo rò rỉ...</span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div
        role="alert"
        className="alert alert-error alert-soft my-8 text-xs font-medium"
      >
        Không thể tải báo cáo rò rỉ. Vui lòng thử lại sau.
      </div>
    );
  }

  if (data.isEmpty) {
    return (
      <p className="py-16 text-center text-sm text-on-surface-variant">
        Chưa có khoản chi nào trong tháng này
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="card bg-surface border border-primary/20 rounded-3xl p-5">
        <LeakRow row={data.summary} />
      </div>

      {data.categories.map((row) =>
        row.transactionsLink ? (
          <Link
            key={row.categoryId}
            to={row.transactionsLink}
            className="card bg-surface/90 border border-outline/10 rounded-3xl p-4 min-h-11 hover:bg-surface transition-colors"
          >
            <LeakRow row={row} />
          </Link>
        ) : null
      )}
    </div>
  );
}
