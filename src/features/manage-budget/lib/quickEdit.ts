import type { BudgetCategoryReportModel } from '@/entities/budget';
import { formatVnd } from '@/shared/lib';

export const monthLabel = (month: number, year: number) =>
  `Tháng ${month}/${year}`;

export const spentLabel = (item: BudgetCategoryReportModel) =>
  `Đã chi: ${formatVnd(item.spentAmount)}`;

const roundTo1000 = (n: number) => Math.max(1000, Math.round(n / 1000) * 1000);

/** Quick amounts. Chips only appear when they mean something for this row. */
export function chipAmounts(item: BudgetCategoryReportModel) {
  const chips: { label: string; amount: number }[] = [];
  if (item.spentAmount > 0)
    chips.push({ label: '= Đã chi', amount: roundTo1000(item.spentAmount) });
  if (item.budgetAmount > 0) {
    chips.push({ label: '+10%', amount: roundTo1000(item.budgetAmount * 1.1) });
    chips.push({ label: '−10%', amount: roundTo1000(item.budgetAmount * 0.9) });
  }
  return chips;
}
