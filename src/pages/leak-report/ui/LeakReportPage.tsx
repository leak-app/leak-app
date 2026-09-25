import { useState } from 'react';

import {
  currentPeriod,
  LeakReport,
  type LeakRatePeriodModel,
} from '@/features/category-leak-rate';
import { MainLayout, Screen, ScreenHeader } from '@/shared/layout';

const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: `Tháng ${i + 1}`,
}));

function yearOptions(currentYear: number) {
  return [currentYear - 2, currentYear - 1, currentYear];
}

export default function LeakReportPage() {
  const [period, setPeriod] = useState<LeakRatePeriodModel>(currentPeriod());
  const years = yearOptions(currentPeriod().year);

  return (
    <MainLayout>
      <Screen
        className="pb-28"
        header={<ScreenHeader title="Vùng rò rỉ" />}
      >
        <div className="mb-4 flex gap-2">
          <select
            aria-label="Chọn tháng"
            value={period.month}
            onChange={(e) =>
              setPeriod((p) => ({ ...p, month: Number(e.target.value) }))
            }
            className="select select-sm min-h-11 flex-1 rounded-full"
          >
            {MONTH_OPTIONS.map((m) => (
              <option
                key={m.value}
                value={m.value}
              >
                {m.label}
              </option>
            ))}
          </select>
          <select
            aria-label="Chọn năm"
            value={period.year}
            onChange={(e) =>
              setPeriod((p) => ({ ...p, year: Number(e.target.value) }))
            }
            className="select select-sm min-h-11 flex-1 rounded-full"
          >
            {years.map((y) => (
              <option
                key={y}
                value={y}
              >
                {y}
              </option>
            ))}
          </select>
        </div>

        <LeakReport
          month={period.month}
          year={period.year}
        />
      </Screen>
    </MainLayout>
  );
}
