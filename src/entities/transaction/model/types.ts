export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  description?: string;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionParams {
  amount: number;
  type: TransactionType;
  categoryId: string;
  description?: string;
}
