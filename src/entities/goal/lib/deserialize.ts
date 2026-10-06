import dayjs, { type Dayjs } from 'dayjs';

import {
  formatCompactVnd,
  formatRelativeDateTime,
  formatVnd,
} from '@/shared/lib';

import type {
  GoalContributionModel,
  GoalModel,
  RawGoalContributionModel,
  RawGoalModel,
} from '../model/types';

const TYPE_LABELS: Record<GoalContributionModel['type'], string> = {
  OPENING: 'Số dư ban đầu',
  DEPOSIT: 'Nạp tiền',
  WITHDRAWAL: 'Rút tiền',
};

export function deserializeGoal(
  raw: RawGoalModel,
  now: Dayjs = dayjs()
): GoalModel {
  const targetAmount = Number(raw.targetAmount);
  const savedAmount = Number(raw.savedAmount);
  const remaining = Math.max(0, targetAmount - savedAmount);
  const percent =
    targetAmount > 0
      ? Math.min(100, Math.floor((savedAmount / targetAmount) * 100))
      : 0;
  const isCompleted = savedAmount >= targetAmount;
  // Stored as UTC midnight; read the calendar date, not the local time.
  const target = raw.targetDate ? dayjs(raw.targetDate.slice(0, 10)) : null;

  let paceText: string | null = null;
  if (target && !isCompleted) {
    const monthsLeft = target.diff(now.startOf('month'), 'month');
    paceText = target.isBefore(now, 'day')
      ? 'Đã quá hạn'
      : `Cần ${formatCompactVnd(remaining / Math.max(1, monthsLeft))}/tháng`;
  }

  return {
    id: raw.id,
    name: raw.name,
    emoji: raw.emoji || '🎯',
    targetAmount,
    savedAmount,
    targetDate: raw.targetDate,
    savedText: formatVnd(savedAmount),
    targetText: formatVnd(targetAmount),
    remainingText: formatVnd(remaining),
    percent,
    percentText: `${percent}%`,
    isCompleted,
    targetDateText: target ? `Hạn: ${target.format('MM/YYYY')}` : null,
    paceText,
    targetMonthValue: target ? target.format('YYYY-MM') : '',
  };
}

export function deserializeContribution(
  raw: RawGoalContributionModel
): GoalContributionModel {
  const amount = Number(raw.amount);
  const sign = raw.type === 'WITHDRAWAL' ? '−' : '+';
  const isReclaim = raw.source === 'LEAK_RECLAIM' && raw.type === 'DEPOSIT';
  return {
    id: raw.id,
    type: raw.type,
    amount,
    note: raw.note,
    createdAt: raw.createdAt,
    amountText: `${sign} ${formatVnd(amount)}`,
    dateText: formatRelativeDateTime(raw.createdAt),
    typeLabel: isReclaim ? 'Bịt rò rỉ' : TYPE_LABELS[raw.type],
    walletName: raw.account?.name ?? '',
    isReclaim,
  };
}
