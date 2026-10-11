import type { CategoryModel } from '@/entities/category';
import type { TransactionType } from '@/entities/transaction';
import { formatNumber } from '@/shared/lib';

export const AMOUNT_LABELS: Record<TransactionType, string> = {
  EXPENSE: 'SỐ TIỀN CHI TIÊU',
  INCOME: 'SỐ TIỀN THU NHẬP',
};

export const EMPTY_CATEGORY_TEXT: Record<TransactionType, string> = {
  EXPENSE: 'Chưa có danh mục chi tiêu',
  INCOME: 'Chưa có danh mục thu nhập',
};

export function formatAmountDisplay(amount: number): string {
  return formatNumber(amount);
}

/** Expense mode: EXPENSE then INVESTMENT categories (the ledger accepts both). */
export function categoriesForType(
  all: CategoryModel[],
  type: TransactionType
): CategoryModel[] {
  if (type === 'INCOME') return all.filter((c) => c.type === 'INCOME');
  return [
    ...all.filter((c) => c.type === 'EXPENSE'),
    ...all.filter((c) => c.type === 'INVESTMENT'),
  ];
}
