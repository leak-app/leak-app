import { useBudgetReport, useBudgets } from '@/entities/budget';
import {
  BudgetGrid,
  BudgetHeaderSummary,
  BudgetQuickEditSheet,
  MonthYearSelector,
  useBudgetQuickEdit,
} from '@/features/manage-budget';
import { SettingsIcon } from '@/shared/icons';
import {
  BackButton,
  HeaderIconButton,
  MainLayout,
  Screen,
  ScreenHeader,
} from '@/shared/layout';
import { useEffect, useRef, useState } from 'react';
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
  const { data: budgets = [], isLoading: isBudgetsLoading } = useBudgets(
    month,
    year
  );
  const quickEdit = useBudgetQuickEdit(budgets);

  // A link from the overview card (?category=<id>) opens that category's sheet once, then drops the param.
  const linkedCategoryId = searchParams.get('category');
  const linkHandled = useRef(false);
  useEffect(() => {
    if (!linkedCategoryId || linkHandled.current || !report || isBudgetsLoading)
      return;
    linkHandled.current = true;
    const item = report.categories.find(
      (c) => c.categoryId === linkedCategoryId
    );
    if (item) quickEdit.open(item, month, year);
    setSearchParams(
      { month: String(month), year: String(year) },
      { replace: true }
    );
  }, [
    linkedCategoryId,
    report,
    isBudgetsLoading,
    month,
    year,
    quickEdit,
    setSearchParams,
  ]);

  return (
    <MainLayout showBottomNav={true}>
      <Screen
        className="pb-28"
        header={
          <ScreenHeader
            title="Ngân sách hàng tháng"
            leftAction={<BackButton />}
            rightAction={
              <HeaderIconButton
                icon={SettingsIcon}
                label="Thiết lập ngân sách"
                onClick={() =>
                  navigate(`/budgets/setup?month=${month}&year=${year}`)
                }
              />
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
              onSelect={(item) => quickEdit.open(item, month, year)}
            />
          ) : null}
        </div>
        <BudgetQuickEditSheet edit={quickEdit} />
      </Screen>
    </MainLayout>
  );
}
