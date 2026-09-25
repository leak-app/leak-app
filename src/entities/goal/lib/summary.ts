import { formatVnd } from '@/shared/lib';

import type { GoalModel, GoalsSummaryModel } from '../model/types';

export function summarizeGoals(goals: GoalModel[]): GoalsSummaryModel {
  const saved = goals.reduce((s, g) => s + g.savedAmount, 0);
  const target = goals.reduce((s, g) => s + g.targetAmount, 0);
  const percent =
    target > 0 ? Math.min(100, Math.floor((saved / target) * 100)) : 0;
  const completed = goals.filter((g) => g.isCompleted).length;
  return {
    savedText: formatVnd(saved),
    targetText: `/ ${formatVnd(target)}`,
    percent,
    percentText: `${percent}% tổng mục tiêu`,
    completedText: completed > 0 ? `${completed} mục tiêu đã hoàn thành` : null,
  };
}
