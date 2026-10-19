import { useMemo, useState } from 'react';

import { categoriesForType, useCategories } from '@/entities/category';
import {
  useUpdateTransaction,
  type TransactionModel,
} from '@/entities/transaction';
import { useWallets } from '@/entities/wallet';
import { getApiErrorMessage } from '@/shared/api';
import {
  applyNumpadKey,
  describeDateChoice,
  formatAmountInput,
} from '@/shared/lib';
import { useToast } from '@/shared/ui';

import {
  amountFromText,
  buildUpdatePatch,
  initialEditState,
  isEditValid,
  withType,
} from '../lib/editDraft';

export const SUCCESS_TEXT = 'Cập nhật giao dịch thành công';

export function useEditTransactionForm(
  transaction: TransactionModel,
  onDone: () => void
) {
  // Read once: the sheet is keyed by transaction id, so a new one starts fresh.
  const [initial] = useState(() => initialEditState(transaction));
  const [state, setState] = useState(initial);

  const { data: allCategories = [], isLoading: categoriesLoading } =
    useCategories();
  const { data: wallets = [] } = useWallets();
  const { showToast } = useToast();
  const { mutate, isPending, error } = useUpdateTransaction();

  const categories = useMemo(
    () => categoriesForType(allCategories, state.type),
    [allCategories, state.type]
  );
  const patch = buildUpdatePatch(initial, state);
  const canSave = patch !== null && isEditValid(state) && !isPending;

  const set = (changes: Partial<typeof state>) =>
    setState((prev) => ({ ...prev, ...changes }));

  const save = () => {
    if (!patch || !isEditValid(state)) return;
    mutate(
      { id: transaction.id, ...patch },
      {
        onSuccess: () => {
          showToast(SUCCESS_TEXT);
          onDone();
        },
      }
    );
  };

  return {
    type: state.type,
    setType: (type: typeof state.type) =>
      setState((prev) => withType(prev, initial, type)),
    amountText:
      state.amount === '0' ? '' : formatAmountInput(Number(state.amount)),
    setAmountText: (text: string) => set({ amount: amountFromText(text) }),
    pressKey: (key: string) =>
      setState((prev) => ({
        ...prev,
        amount: applyNumpadKey(prev.amount, key),
      })),
    categories,
    categoriesLoading,
    categoryId: state.categoryId,
    setCategoryId: (categoryId: string) => set({ categoryId }),
    wallets,
    // The wallet may be archived, so it can be missing from the active list.
    walletName:
      wallets.find((w) => w.id === state.accountId)?.name ??
      transaction.walletName,
    walletId: state.accountId,
    canPickWallet: wallets.some((w) => w.id !== state.accountId),
    setWalletId: (accountId: string) => set({ accountId }),
    note: state.note,
    setNote: (note: string) => set({ note }),
    occurredOn: state.occurredOn,
    // An emptied date input is ignored; the last valid day stays.
    setOccurredOn: (value: string) => value && set({ occurredOn: value }),
    dateChoice: describeDateChoice(state.occurredOn),
    canSave,
    save,
    isSaving: isPending,
    errorText: error
      ? getApiErrorMessage(
          error,
          'Cập nhật giao dịch thất bại. Vui lòng thử lại.'
        )
      : null,
  };
}
