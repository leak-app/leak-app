import { useBudgetReport } from '@/entities/budget';
import {
  BudgetGrid,
  BudgetHeaderSummary,
  MonthYearSelector,
} from '@/features/manage-budget';
import { GearIcon } from '@/shared/icons';
import { BackButton, MainLayout, Screen, ScreenHeader } from '@/shared/layout';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function BudgetPage() {
  const navigate = useNavigate();
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

  const { data: report, isLoading, isError } = useBudgetReport(month, year);

  return (
    <MainLayout showBottomNav={true}>
      <Screen
        className="pb-28"
        header={
          <ScreenHeader
            title="Ngân sách hàng tháng"
            leftAction={<BackButton />}
            rightAction={
              <button
                onClick={() =>
                  navigate(`/budget/setup?month=${month}&year=${year}`)
                }
                className="btn btn-ghost btn-circle btn-sm font-bold hover:bg-primary/10 rounded-xl"
              >
                <GearIcon size={16} />
              </button>
            }
          />
        }
      >
        <div className="space-y-6 pb-20">
          {/* Header Summary & Month Selector */}
          <div className="flex flex-col justify-between gap-4 glass-card p-5 rounded-2xl border border-outline/10">
            <BudgetHeaderSummary
              totalBudget={report?.totalBudget ?? 0}
              month={month}
              year={year}
            />

            <MonthYearSelector
              month={month}
              year={year}
              onMonthChange={handleMonthChange}
              onYearChange={handleYearChange}
            />
          </div>

          {/* Body Content */}
          {isLoading ? (
            <div className="flex justify-center p-12">
              <span
                aria-label="Đang tải dữ liệu"
                className="loading loading-spinner loading-lg text-primary"
              />
            </div>
          ) : isError ? (
            <div className="alert alert-error text-white rounded-2xl">
              <span>Đã có lỗi xảy ra khi tải dữ liệu ngân sách.</span>
            </div>
          ) : report ? (
            <BudgetGrid
              categories={report.categories}
              savingsInsight={report.savingsInsight}
              month={month}
              year={year}
            />
          ) : null}
        </div>
      </Screen>
    </MainLayout>
  );
}
