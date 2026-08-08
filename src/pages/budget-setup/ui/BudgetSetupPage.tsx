import { BudgetSetupForm, MonthYearSelector } from '@/features/manage-budget';
import { BackButton, MainLayout, Screen, ScreenHeader } from '@/shared/layout';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function BudgetSetupPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const selectedMonth = parseInt(
    searchParams.get('month') || String(currentMonth),
    10
  );
  const selectedYear = parseInt(
    searchParams.get('year') || String(currentYear),
    10
  );

  const [month, setMonth] = useState(selectedMonth);
  const [year, setYear] = useState(selectedYear);

  const handleMonthChange = (m: number) => {
    setMonth(m);
    setSearchParams({ month: String(m), year: String(year) });
  };

  const handleYearChange = (y: number) => {
    setYear(y);
    setSearchParams({ month: String(month), year: String(y) });
  };

  return (
    <MainLayout showBottomNav={false}>
      <Screen
        header={
          <ScreenHeader
            title="Thiết lập ngân sách"
            leftAction={<BackButton />}
          />
        }
      >
        <div className="space-y-6 pb-20">
          <div className="flex flex-col gap-4 glass-card p-4 rounded-2xl border border-outline/10">
            <div>
              <h2 className="text-base font-bold text-on-surface">
                Chọn tháng áp dụng
              </h2>
              <p className="text-xs text-on-surface-variant">
                Ngân sách sẽ được tính cho từng danh mục chi tiêu
              </p>
            </div>

            <MonthYearSelector
              month={month}
              year={year}
              onMonthChange={handleMonthChange}
              onYearChange={handleYearChange}
            />
          </div>

          <BudgetSetupForm
            month={month}
            year={year}
          />
        </div>
      </Screen>
    </MainLayout>
  );
}
