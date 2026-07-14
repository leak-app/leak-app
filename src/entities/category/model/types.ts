export type CategoryType = 'INCOME' | 'EXPENSE' | 'INVESTMENT';

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
