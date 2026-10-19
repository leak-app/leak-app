import type { CategoryModel } from '../model/types';

type TransactionKind = 'INCOME' | 'EXPENSE';

export const EMPTY_CATEGORY_TEXT: Record<TransactionKind, string> = {
  EXPENSE: 'Chưa có danh mục chi tiêu',
  INCOME: 'Chưa có danh mục thu nhập',
};

/** Expense mode: EXPENSE then INVESTMENT categories (the ledger accepts both). */
export function categoriesForType(
  all: CategoryModel[],
  type: TransactionKind
): CategoryModel[] {
  if (type === 'INCOME') return all.filter((c) => c.type === 'INCOME');
  return [
    ...all.filter((c) => c.type === 'EXPENSE'),
    ...all.filter((c) => c.type === 'INVESTMENT'),
  ];
}
