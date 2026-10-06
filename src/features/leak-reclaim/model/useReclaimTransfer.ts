import { useState } from 'react';

import type { GoalModel } from '@/entities/goal';
import {
  pickDefaultWallet,
  readLastWalletId,
  useWallets,
} from '@/entities/wallet';
import { getApiErrorMessage } from '@/shared/api';
import { formatAmountInput, parseAmountInput } from '@/shared/lib';

import { useTransferReclaim } from '../api/reclaim.api';
import { transferredText } from '../lib/deserialize';

export function useReclaimTransfer(
  goals: GoalModel[],
  defaultGoalId: string | null,
  defaultAmount: number,
  onDone: (successText: string) => void
) {
  const { data: wallets = [] } = useWallets();
  const [goalId, setGoalId] = useState(defaultGoalId ?? goals[0]?.id ?? '');
  const [walletId, setWalletId] = useState<string | null>(readLastWalletId);
  const [amountText, setAmountText] = useState(
    formatAmountInput(defaultAmount)
  );
  const transfer = useTransferReclaim();
  const wallet = pickDefaultWallet(wallets, walletId);
  const amount = parseAmountInput(amountText) ?? 0;
  const goal = goals.find((g) => g.id === goalId) ?? goals[0];

  return {
    goals,
    goalId: goal?.id ?? '',
    setGoalId,
    wallets,
    wallet,
    setWalletId,
    amountText,
    setAmount: (text: string) => {
      const v = parseAmountInput(text);
      setAmountText(v === null ? '' : formatAmountInput(Math.abs(v)));
    },
    canSubmit: amount > 0 && !!goal && !transfer.isPending,
    submit: () =>
      goal &&
      transfer.mutate(
        { goalId: goal.id, amount, accountId: wallet?.id },
        { onSuccess: () => onDone(transferredText(amount, goal.name)) }
      ),
    isSaving: transfer.isPending,
    errorText: transfer.error
      ? getApiErrorMessage(
          transfer.error,
          'Không chuyển được. Vui lòng thử lại.'
        )
      : null,
  };
}
