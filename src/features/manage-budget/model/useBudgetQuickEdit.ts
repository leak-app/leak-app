import { useState } from 'react';

import {
  useDeleteBudget,
  useUpsertBudget,
  type BudgetCategoryReportModel,
  type BudgetModel,
} from '@/entities/budget';
import { getApiErrorMessage } from '@/shared/api';
import { formatAmountInput, parseAmountInput } from '@/shared/lib';

import { chipAmounts, monthLabel, spentLabel } from '../lib/quickEdit';

export interface QuickEditTarget {
  item: BudgetCategoryReportModel;
  month: number;
  year: number;
  budgetId: string | null;
  titleText: string;
  monthText: string;
  spentText: string;
  chips: { label: string; amount: number }[];
}

export function useBudgetQuickEdit(budgets: BudgetModel[]) {
  const [target, setTarget] = useState<QuickEditTarget | null>(null);
  const [amountText, setAmountText] = useState('');
  const upsert = useUpsertBudget();
  const del = useDeleteBudget();

  const amount = parseAmountInput(amountText) ?? 0;
  const close = () => {
    upsert.reset();
    del.reset();
    setTarget(null);
  };

  return {
    target,
    // month/year are captured here so a later month switch on the page cannot redirect the save.
    open: (item: BudgetCategoryReportModel, month: number, year: number) => {
      const budget = budgets.find(
        (b) =>
          b.categoryId === item.categoryId &&
          b.month === month &&
          b.year === year
      );
      setAmountText(
        item.budgetAmount > 0 ? formatAmountInput(item.budgetAmount) : ''
      );
      setTarget({
        item,
        month,
        year,
        budgetId: budget?.id ?? null,
        titleText: `${item.emoji ?? '🏷️'} ${item.categoryName}`,
        monthText: monthLabel(month, year),
        spentText: spentLabel(item),
        chips: chipAmounts(item),
      });
    },
    close,
    amountText,
    setAmount: (text: string) => {
      const v = parseAmountInput(text);
      setAmountText(v === null ? '' : formatAmountInput(Math.abs(v)));
    },
    applyChip: (value: number) => setAmountText(formatAmountInput(value)),
    canSave: amount > 0 && !upsert.isPending,
    canClear: !!target?.budgetId && !del.isPending,
    save: () => {
      if (!target || amount <= 0) return;
      upsert.mutate(
        {
          categoryId: target.item.categoryId,
          amount,
          month: target.month,
          year: target.year,
        },
        { onSuccess: close }
      );
    },
    clear: () => {
      if (!target?.budgetId) return close();
      del.mutate(target.budgetId, { onSettled: close });
    },
    isSaving: upsert.isPending || del.isPending,
    errorText: upsert.error
      ? getApiErrorMessage(upsert.error, 'Không lưu được ngân sách.')
      : null,
  };
}

export type BudgetQuickEdit = ReturnType<typeof useBudgetQuickEdit>;
