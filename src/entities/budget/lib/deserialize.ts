import { formatNumber } from '@/shared/lib';
import type {
  BudgetCategoryReportModel,
  BudgetReportModel,
} from '../model/types';

export function deserializeCategoryReport(
  raw: BudgetCategoryReportModel
): BudgetCategoryReportModel {
  const formattedBudget = formatNumber(raw.budgetAmount);
  const formattedSpent = formatNumber(raw.spentAmount);
  const formattedRemaining = formatNumber(Math.max(0, raw.remainingAmount));

  const progressPercent = Math.min(100, Math.max(0, raw.percentage));

  let progressColorClass = 'progress-primary';
  if (raw.percentage >= 100) {
    progressColorClass = 'progress-error';
  } else if (raw.percentage >= 80) {
    progressColorClass = 'progress-warning';
  }

  const warningBadgeText =
    raw.percentage >= 100 ? 'Đã vượt ngân sách!' : 'Gần chạm hạn mức!';

  return {
    ...raw,
    emoji: raw.emoji || '🏷️',
    formattedBudget,
    formattedSpent,
    formattedRemaining,
    progressPercent,
    progressColorClass,
    warningBadgeText,
  };
}

export function deserializeBudgetReport(
  raw: BudgetReportModel
): BudgetReportModel {
  if (!raw) return raw;
  return {
    ...raw,
    categories: (raw.categories || []).map(deserializeCategoryReport),
  };
}
