import { Link } from 'react-router-dom';

import { useLeakRate } from '../api/leakRate.api';
import { LeakRow } from './LeakRow';

export function CategoryLeakCard() {
  const { data, isLoading, isError } = useLeakRate();

  // Never block the Overview: hide while loading or on error.
  if (isLoading || isError || !data) return null;

  return (
    <div className="card bg-surface/90 border border-outline/10 rounded-3xl p-5 shadow-lg select-none">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-on-surface">
          Vùng rò rỉ tháng này
        </h3>
        <Link
          to="/leaks"
          className="min-h-11 flex items-center text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors"
        >
          Xem tất cả
        </Link>
      </div>

      {data.hasLeaks ? (
        <div className="mt-3 flex flex-col gap-4">
          {data.topLeakRows.map((row) => (
            <LeakRow
              key={row.categoryId}
              row={row}
            />
          ))}
        </div>
      ) : (
        <p className="mt-3 text-xs text-on-surface-variant">
          Chưa phát hiện rò rỉ nào tháng này
        </p>
      )}
    </div>
  );
}
