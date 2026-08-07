export type CategoryType = 'INCOME' | 'EXPENSE' | 'INVESTMENT';

export interface CategoryModel {
  id: string;
  name: string;
  emoji?: string;
  type: CategoryType;
  userId: string;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryParamsModel {
  name: string;
  emoji?: string;
  type: CategoryType;
}

export interface UpdateCategoryParamsModel {
  id: string;
  name?: string;
  emoji?: string;
  type?: CategoryType;
}
