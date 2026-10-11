import { useState } from 'react';

import {
  currentPeriod,
  LeakReport,
  type LeakRatePeriodModel,
} from '@/features/category-leak-rate';
import { MainLayout, Screen, ScreenHeader } from '@/shared/layout';
import { Select, type SelectOption } from '@/shared/ui';

const MONTH_OPTIONS: SelectOption<number>[] = Array.from(
  { length: 12 },
  (_, i) => ({ value: i + 1, label: `Tháng ${i + 1}` })
);

function yearOptions(currentYear: number): SelectOption<number>[] {
  return [currentYear - 2, currentYear - 1, currentYear].map((year) => ({
    value: year,
    label: String(year),
  }));
}

export default function LeakReportPage() {
  const [period, setPeriod] = useState<LeakRatePeriodModel>(currentPeriod());

  return (
    <MainLayout>
      <Screen
        className="pb-28"
        header={<ScreenHeader title="Vùng rò rỉ" />}
      >
        <div className="mb-4 flex gap-2">
          <Select
            variant="pill"
            className="flex-1"
            ariaLabel="Chọn tháng"
            value={period.month}
            options={MONTH_OPTIONS}
            onChange={(month) => setPeriod((p) => ({ ...p, month }))}
          />
          <Select
            variant="pill"
            className="flex-1"
            ariaLabel="Chọn năm"
            value={period.year}
            options={yearOptions(currentPeriod().year)}
            onChange={(year) => setPeriod((p) => ({ ...p, year }))}
          />
        </div>

        <LeakReport
          month={period.month}
          year={period.year}
        />
      </Screen>
    </MainLayout>
  );
}
