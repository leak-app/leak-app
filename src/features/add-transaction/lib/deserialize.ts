import type { CategoryModel } from '@/entities/category';
import type { TransactionType } from '@/entities/transaction';

export const AMOUNT_LABELS: Record<TransactionType, string> = {
  EXPENSE: 'SỐ TIỀN CHI TIÊU',
  INCOME: 'SỐ TIỀN THU NHẬP',
};

export const EMPTY_CATEGORY_TEXT: Record<TransactionType, string> = {
  EXPENSE: 'Chưa có danh mục chi tiêu',
  INCOME: 'Chưa có danh mục thu nhập',
};

const vnd = new Intl.NumberFormat('vi-VN');

export function formatAmountDisplay(amount: number): string {
  return vnd.format(amount);
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
