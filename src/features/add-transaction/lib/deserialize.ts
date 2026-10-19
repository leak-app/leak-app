import type { TransactionType } from '@/entities/transaction';
import { formatNumber } from '@/shared/lib';

export const AMOUNT_LABELS: Record<TransactionType, string> = {
  EXPENSE: 'SỐ TIỀN CHI TIÊU',
  INCOME: 'SỐ TIỀN THU NHẬP',
};

export function formatAmountDisplay(amount: number): string {
  return formatNumber(amount);
}
