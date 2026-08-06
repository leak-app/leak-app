import type { CategoryModel } from '@/entities/category';

export type TransactionType = 'INCOME' | 'EXPENSE';

export interface TransactionModel {
  id: string;
  amount: number;
  type: TransactionType;
  description?: string;
  categoryId: string;
  category?: CategoryModel;
  userId: string;
  createdAt: string;
  updatedAt: string;

  // Added for UI
  isExpense: boolean;
}

export interface CreateTransactionParamsModel {
  amount: number;
  type: TransactionType;
  categoryId: string;
  description?: string;
}

export interface GetTransactionsQueryParamsModel {
  search?: string;
  page?: number;
  limit?: number;
  type?: TransactionType;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface TransactionListResponseModel {
  transactions: TransactionModel[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
