import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

import { useCategories, type CategoryModel } from '@/entities/category';
import {
  describeUnresolved,
  useAddTransaction,
  type QuickLogDraftModel,
  type TransactionType,
} from '@/entities/transaction';
import {
  pickDefaultWallet,
  readLastWalletId,
  useWallets,
  writeLastWalletId,
  type WalletModel,
} from '@/entities/wallet';
import { getApiErrorMessage } from '@/shared/api';
import { applyNumpadKey } from '@/shared/lib';

import { describeDateChoice, type DateChoiceModel } from '../lib/dateChoice';
import {
  AMOUNT_LABELS,
  categoriesForType,
  formatAmountDisplay,
} from '../lib/deserialize';
import { initialFormState } from '../lib/draftState';

export interface AddTransactionFormState {
  type: TransactionType;
  setType: (type: TransactionType) => void;
  amountLabel: string;
  amountText: string;
  canSave: boolean;
  description: string;
  setDescription: (value: string) => void;
  /** The day of the transaction, "YYYY-MM-DD". */
  occurredOn: string;
  setOccurredOn: (value: string) => void;
  dateChoice: DateChoiceModel;
  categories: CategoryModel[];
  categoriesLoading: boolean;
  activeCategoryId: string;
  /** "Chưa xác định: ..." while a field from the quick-log draft is still open. */
  unresolvedText: string | null;
  categoryUnresolved: boolean;
  setCategoryId: (id: string) => void;
  wallets: WalletModel[];
  selectedWallet?: WalletModel;
  setWalletId: (id: string) => void;
  pressKey: (key: string) => void;
  save: (onSaved: () => void) => void;
  isSaving: boolean;
  errorText: string | null;
}

export function useAddTransactionForm(
  draft?: QuickLogDraftModel
): AddTransactionFormState {
  // Read once: the page re-mounts the form (new key) for every new draft.
  const [initial] = useState(() => initialFormState(draft));
  const [type, setTypeState] = useState<TransactionType>(initial.type);
  const [amount, setAmount] = useState(initial.amount);
  const [description, setDescription] = useState(initial.description);
  const [occurredOn, setOccurredOn] = useState(() =>
    dayjs().format('YYYY-MM-DD')
  );
  const [categoryId, setCategoryIdState] = useState(initial.categoryId);
  // True until the user picks a category themselves: no first-category guess.
  const [categoryUnresolved, setCategoryUnresolved] = useState(
    initial.categoryUnresolved
  );
  const [walletId, setWalletId] = useState<string | null>(
    () => initial.walletId ?? readLastWalletId()
  );

  const { data: allCategories = [], isLoading: categoriesLoading } =
    useCategories();
  const { data: wallets = [] } = useWallets();
  const { mutate, isPending, error } = useAddTransaction();

  const categories = useMemo(
    () => categoriesForType(allCategories, type),
    [allCategories, type]
  );
  // A stale selection (other type, deleted) falls back to the first listed category.
  const activeCategoryId = categoryUnresolved
    ? ''
    : categories.some((c) => c.id === categoryId)
      ? categoryId
      : (categories[0]?.id ?? '');
  const selectedWallet = pickDefaultWallet(wallets, walletId);

  const numericAmount = parseInt(amount, 10) || 0;
  const dateChoice = describeDateChoice(occurredOn);

  const setCategoryId = (id: string) => {
    setCategoryIdState(id);
    setCategoryUnresolved(false);
  };

  const setType = (next: TransactionType) => {
    setTypeState(next);
    setCategoryId('');
  };

  const unresolvedText = describeUnresolved({
    unresolved: [
      ...(draft?.unresolved.includes('amount') && numericAmount === 0
        ? (['amount'] as const)
        : []),
      ...(categoryUnresolved ? (['category'] as const) : []),
    ],
  });

  const save = (onSaved: () => void) => {
    if (numericAmount <= 0 || !activeCategoryId) return;
    mutate(
      {
        amount: numericAmount,
        type,
        categoryId: activeCategoryId,
        accountId: selectedWallet?.id,
        description: description.trim() || undefined,
        // Today is left to the server, so a wrong phone clock cannot move it.
        occurredOn: dateChoice.isToday ? undefined : occurredOn,
      },
      {
        onSuccess: () => {
          if (selectedWallet) writeLastWalletId(selectedWallet.id);
          onSaved();
        },
      }
    );
  };

  return {
    type,
    setType,
    amountLabel: AMOUNT_LABELS[type],
    amountText: formatAmountDisplay(numericAmount),
    canSave: numericAmount > 0 && !!activeCategoryId && !isPending,
    description,
    setDescription,
    occurredOn,
    // An emptied date input is ignored; the last valid day stays.
    setOccurredOn: (value) => value && setOccurredOn(value),
    dateChoice,
    categories,
    categoriesLoading,
    activeCategoryId,
    unresolvedText,
    categoryUnresolved,
    setCategoryId,
    wallets,
    selectedWallet,
    setWalletId,
    pressKey: (key) => setAmount((prev) => applyNumpadKey(prev, key)),
    save,
    isSaving: isPending,
    errorText: error
      ? getApiErrorMessage(error, 'Lưu giao dịch thất bại. Vui lòng thử lại.')
      : null,
  };
}
