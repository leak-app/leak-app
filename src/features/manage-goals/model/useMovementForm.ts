import { useState } from 'react';

import { useMoveGoalMoney, type GoalModel } from '@/entities/goal';
import {
  pickDefaultWallet,
  readLastWalletId,
  useWallets,
} from '@/entities/wallet';
import { getApiErrorMessage } from '@/shared/api';
import { formatAmountInput, parseAmountInput } from '@/shared/lib';

export type MovementKind = 'deposit' | 'withdraw';

export function useMovementForm(
  goal: GoalModel,
  kind: MovementKind,
  onDone: () => void
) {
  const { data: wallets = [] } = useWallets();
  const [walletId, setWalletId] = useState<string | null>(readLastWalletId);
  const [amountText, setAmountText] = useState('');
  const move = useMoveGoalMoney();
  const wallet = pickDefaultWallet(wallets, walletId);
  const amount = parseAmountInput(amountText) ?? 0;

  const warningText =
    kind === 'deposit' && wallet && amount > wallet.currentBalance
      ? 'Số dư ví sẽ âm sau khi nạp.'
      : null;
  const overWithdraw = kind === 'withdraw' && amount > goal.savedAmount;

  return {
    wallets,
    wallet,
    setWalletId,
    amountText,
    setAmount: (text: string) => {
      const v = parseAmountInput(text);
      setAmountText(v === null ? '' : formatAmountInput(Math.abs(v)));
    },
    fillAll: () => setAmountText(formatAmountInput(goal.savedAmount)),
    warningText,
    overWithdrawText: overWithdraw
      ? 'Số tiền rút vượt quá số đã tích lũy'
      : null,
    canSubmit: amount > 0 && !overWithdraw && !move.isPending,
    submit: () =>
      move.mutate(
        { goalId: goal.id, kind, amount, accountId: wallet?.id },
        { onSuccess: onDone }
      ),
    isSaving: move.isPending,
    errorText: move.error
      ? getApiErrorMessage(
          move.error,
          'Không thực hiện được. Vui lòng thử lại.'
        )
      : null,
  };
}
