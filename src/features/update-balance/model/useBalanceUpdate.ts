import { useState } from 'react';

import type { WalletModel } from '@/entities/wallet';
import { getApiErrorMessage } from '@/shared/api';
import {
  applyNumpadKey,
  formatAmountInput,
  formatVnd,
  parseAmountInput,
} from '@/shared/lib';

import { useCreateValuation } from '../api/valuations.api';
import { deserializeBalancePreview } from '../lib/deserialize';
import { computeBalancePreview } from '../lib/preview';

export function useBalanceUpdate(wallet: WalletModel, onDone: () => void) {
  const lastBalance = wallet.valuation?.lastBalance ?? null;
  const isFirstUpdate = lastBalance === null;

  const [amountText, setAmountText] = useState('');
  // The first update defaults to a baseline: the wallet may have been stale for months.
  const [asBaseline, setAsBaseline] = useState(true);
  const mutation = useCreateValuation();

  const entered = parseAmountInput(amountText);
  const preview = computeBalancePreview({
    currentBalance: wallet.currentBalance,
    initialBalance: wallet.initialBalance,
    lastBalance,
    entered: entered === null ? null : Math.abs(entered),
    asBaseline: isFirstUpdate && asBaseline,
  });

  const setAmount = (text: string) => {
    const parsed = parseAmountInput(text);
    setAmountText(parsed === null ? '' : formatAmountInput(Math.abs(parsed)));
  };

  /** A numpad key edits the digits typed so far; Backspace on the last digit clears the field. */
  const pressKey = (key: string) => {
    const digits = entered === null ? '0' : String(Math.abs(entered));
    if (key === 'Backspace' && digits.length <= 1) {
      setAmountText('');
      return;
    }
    setAmount(applyNumpadKey(digits, key));
  };

  const submit = () => {
    if (entered === null) return;
    mutation.mutate(
      {
        walletId: wallet.id,
        balance: Math.abs(entered),
        expectedBalance: wallet.currentBalance,
        asBaseline: isFirstUpdate && asBaseline,
      },
      { onSuccess: onDone }
    );
  };

  return {
    amountText,
    setAmount,
    pressKey,
    isFirstUpdate,
    asBaseline,
    setAsBaseline,
    /** "12,000,000₫", what the app holds for the wallet now. */
    currentText: formatVnd(Math.max(wallet.currentBalance, 0)),
    /** The app's balance is still the opening balance, so it can be called that. */
    isOpeningBalance: wallet.currentBalance === wallet.initialBalance,
    preview: preview
      ? deserializeBalancePreview(preview, {
          isFirstUpdate,
          lastBalance,
          lastDayText: wallet.valuation?.lastDayText ?? null,
        })
      : null,
    canSubmit: entered !== null && !mutation.isPending,
    isSaving: mutation.isPending,
    submit,
    errorText: mutation.error
      ? getApiErrorMessage(
          mutation.error,
          'Không lưu được số dư. Vui lòng thử lại.'
        )
      : null,
  };
}
