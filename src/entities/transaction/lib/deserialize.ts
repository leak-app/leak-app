import type { TransactionModel } from '../model/types';

export function deserialize(raw: TransactionModel): TransactionModel {
  const isExpense = raw.type === 'EXPENSE';
  if (raw.category && !raw.category.emoji) {
    raw.category.emoji = isExpense ? '💸' : '💵';
  }

  if (!raw.description) {
    raw.description = raw.category.name;
  }

  raw.isExpense = isExpense;

  return raw;
}
