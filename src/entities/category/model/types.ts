export type CategoryType = 'INCOME' | 'EXPENSE' | 'INVESTMENT';

export interface CategoryModel {
  id: string;
  name: string;
  emoji?: string;
  type: CategoryType;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
