import dayjs, { type Dayjs } from 'dayjs';

import type {
  BudgetCategoryReportModel,
  BudgetReportModel,
} from '@/entities/budget';
import { formatNumber, formatVnd, formatVndParts } from '@/shared/lib';

import type { BudgetCardModel, BudgetCardRowModel } from '../model/types';
import {
  barGeometry,
  isSpendingFast,
  monthProgress,
  perDayAmount,
  rowState,
  usedPercent,
  type BudgetRowState,
} from './budgetStatus';

/** The overview shows the tightest budgets only; the rest are one tap away. */
const MAX_ROWS = 3;

function statusText(state: BudgetRowState, spent: number, limit: number) {
  const left = formatVnd(limit - spent);
  if (state === 'over') return `Vượt ${formatVnd(spent - limit)}`;
  if (state === 'full') return 'Đã dùng hết';
  if (state === 'near') return `Còn ${left} · sắp chạm`;
  return `Còn ${left}`;
}

function ariaText(
  name: string,
  state: BudgetRowState,
  spent: number,
  limit: number
) {
  const base = `${name}: đã chi ${formatNumber(spent)} trên ${formatNumber(limit)} đồng`;
  if (state === 'over')
    return `${base}, vượt ${formatNumber(spent - limit)} đồng`;
  if (state === 'full') return `${base}, đã dùng hết`;
  return `${base}, còn ${formatNumber(limit - spent)} đồng`;
}

function deserializeRow(item: BudgetCategoryReportModel): BudgetCardRowModel {
  const spent = item.spentAmount;
  const limit = item.budgetAmount;
  const state = rowState(spent, limit);
  const isAlert = state !== 'ok';

  return {
    categoryId: item.categoryId,
    name: item.categoryName,
    emoji: item.emoji ?? '🏷️',
    href: `/budgets?category=${item.categoryId}`,
    statusText: statusText(state, spent, limit),
    isAlert,
    tone: isAlert ? 'danger' : 'primary',
    ...barGeometry(spent, limit),
    amountsText: `${formatNumber(spent)} / ${formatVnd(limit)}`,
    percentText: `${usedPercent(spent, limit)}%`,
    ariaLabel: ariaText(item.categoryName, state, spent, limit),
  };
}

/**
 * Totals cover budgeted categories only: the report's own `totalSpent` also counts
 * categories without a budget, which would eat into a limit they were never part of.
 */
export function deserializeBudgetCard(
  raw: BudgetReportModel,
  now: Dayjs = dayjs()
): BudgetCardModel {
  const budgeted = (raw.categories ?? [])
    .filter((c) => c.budgetAmount > 0)
    .sort(
      (a, b) => b.spentAmount / b.budgetAmount - a.spentAmount / a.budgetAmount
    );

  const limit = budgeted.reduce((sum, c) => sum + c.budgetAmount, 0);
  const spent = budgeted.reduce((sum, c) => sum + c.spentAmount, 0);
  const remaining = limit - spent;
  const isOver = remaining < 0;

  const { todayPercent, daysLeft } = monthProgress(
    now.date(),
    now.daysInMonth()
  );
  const used = usedPercent(spent, limit);
  const isPaceFast = isOver || isSpendingFast(used, todayPercent);

  let perDayText: string | null = null;
  if (remaining > 0) {
    perDayText =
      daysLeft > 0
        ? `Khoảng ${formatVnd(perDayAmount(remaining, daysLeft))} mỗi ngày cho ${daysLeft} ngày còn lại`
        : 'Hôm nay là ngày cuối tháng';
  }

  const shown = budgeted.slice(0, MAX_ROWS);
  const others = budgeted.slice(MAX_ROWS);
  const othersNeedingCare = others.filter(
    (c) => rowState(c.spentAmount, c.budgetAmount) !== 'ok'
  ).length;
  let othersText: string | null = null;
  if (others.length > 0) {
    othersText =
      othersNeedingCare > 0
        ? `${others.length} ngân sách khác · ${othersNeedingCare} sắp chạm hoặc vượt`
        : `${others.length} ngân sách khác đều ổn`;
  }

  return {
    isEmpty: budgeted.length === 0,
    monthText: `Tháng ${raw.month}`,
    heroLabel: isOver ? 'Đã vượt hạn mức tháng này' : 'Còn lại tháng này',
    heroAmount: formatVndParts(Math.abs(remaining)),
    isHeroOver: isOver,
    perDayText,
    usedPercent: Math.min(100, used),
    todayPercent,
    tone: isPaceFast ? 'danger' : 'primary',
    spentOfLimitText: `Đã chi ${formatVnd(spent)} / ${formatVnd(limit)}`,
    paceText: isOver
      ? 'Đã chi quá hạn mức'
      : isPaceFast
        ? 'Đang chi nhanh hơn nhịp tháng'
        : 'Đang đúng nhịp',
    isPaceFast,
    rows: shown.map(deserializeRow),
    othersText,
  };
}
