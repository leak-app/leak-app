import dayjs from 'dayjs';

import { formatCompactVnd, formatVnd } from '@/shared/lib';

import type { ReportOverviewModel } from '../model/types';

function formatTimestamp(dateStr: string): string {
  const d = dayjs(dateStr);
  const today = dayjs();
  const yesterday = dayjs().subtract(1, 'day');

  if (d.isSame(today, 'day')) {
    return `Hôm nay, ${d.format('HH:mm')}`;
  }
  if (d.isSame(yesterday, 'day')) {
    return `Hôm qua, ${d.format('HH:mm')}`;
  }
  return d.format('DD ThMM, HH:mm');
}

function formatShortAmount(val: number): string {
  if (val >= 1000000) {
    return (val / 1000000).toFixed(1) + 'M';
  }
  if (val >= 1000) {
    return (val / 1000).toFixed(0) + 'K';
  }
  return val.toString();
}

export function deserializeReportOverview(
  raw: ReportOverviewModel
): ReportOverviewModel {
  return {
    totalBalance: raw.totalBalance,
    walletsBalance: raw.walletsBalance,
    goalsBalance: raw.goalsBalance,
    balanceSplitText:
      raw.goalsBalance > 0
        ? `Trong ví ${formatCompactVnd(raw.walletsBalance)} · Mục tiêu ${formatCompactVnd(raw.goalsBalance)}`
        : null,
    growthPercentage: raw.growthPercentage,
    accountsCount: raw.accountsCount,
    weeklyExpense: {
      totalAmount: raw.weeklyExpense?.totalAmount,
      days: (raw.weeklyExpense?.days || []).map((d) => ({
        ...d,
        formattedAmount: formatShortAmount(d.amount),
      })),
    },
    recentExpenses: (raw.recentExpenses || []).map((item) => ({
      ...item,
      formattedAmount: formatVnd(Number(item.amount)),
      formattedTimestamp: formatTimestamp(item.createdAt),
    })),
    budgetGoals: raw.budgetGoals || [],
  };
}
