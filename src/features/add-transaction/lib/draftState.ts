import type { QuickLogDraftModel } from '@/entities/transaction';

type TransactionType = QuickLogDraftModel['type'];

export interface InitialFormState {
  type: TransactionType;
  /** Digits as typed on the numpad. */
  amount: string;
  description: string;
  /** Empty when the parser did not resolve it; never defaulted here. */
  categoryId: string;
  /** Null means "use the remembered or default wallet". */
  walletId: string | null;
  categoryUnresolved: boolean;
}

/** Starting values for the add-transaction form, from a quick-log draft if there is one. */
export function initialFormState(
  draft: QuickLogDraftModel | undefined
): InitialFormState {
  if (!draft) {
    return {
      type: 'EXPENSE',
      amount: '0',
      description: '',
      categoryId: '',
      walletId: null,
      categoryUnresolved: false,
    };
  }
  return {
    type: draft.type,
    amount: draft.amount ? String(draft.amount) : '0',
    description: draft.description,
    categoryId: draft.categoryId ?? '',
    walletId: draft.accountId,
    categoryUnresolved: draft.unresolved.includes('category'),
  };
}
