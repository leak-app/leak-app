import dayjs from 'dayjs';

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
      formattedAmount: Number(item.amount).toLocaleString('vi-VN') + 'đ',
      formattedTimestamp: formatTimestamp(item.createdAt),
    })),
    budgetGoals: raw.budgetGoals || [],
  };
}
