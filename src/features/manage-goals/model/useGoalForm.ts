import { useState } from 'react';

import { useCreateGoal, useUpdateGoal, type GoalModel } from '@/entities/goal';
import { getApiErrorMessage } from '@/shared/api';
import { formatAmountInput, parseAmountInput } from '@/shared/lib';

export function useGoalForm(editing: GoalModel | null, onDone: () => void) {
  const [name, setName] = useState(editing?.name ?? '');
  const [emoji, setEmoji] = useState(editing?.emoji ?? '🎯');
  const [targetText, setTargetText] = useState(
    editing ? formatAmountInput(editing.targetAmount) : ''
  );
  const [month, setMonth] = useState(editing?.targetMonthValue ?? '');
  const [validation, setValidation] = useState<string | null>(null);
  const create = useCreateGoal();
  const update = useUpdateGoal();
  const mutation = editing ? update : create;

  const submit = () => {
    const targetAmount = parseAmountInput(targetText) ?? 0;
    if (!name.trim()) return setValidation('Tên mục tiêu là bắt buộc');
    if (targetAmount <= 0)
      return setValidation('Số tiền mục tiêu phải là số dương');
    setValidation(null);
    // <input type="month"> gives "2027-03"; the API takes the first day of that month.
    // An emptied month on edit sends null to clear the deadline.
    const targetDate = month ? `${month}-01` : editing ? null : undefined;
    const params = { name: name.trim(), emoji, targetAmount, targetDate };
    if (editing)
      update.mutate({ id: editing.id, ...params }, { onSuccess: onDone });
    else create.mutate(params, { onSuccess: onDone });
  };

  return {
    name,
    setName,
    emoji,
    setEmoji,
    month,
    setMonth,
    targetText,
    setTarget: (text: string) => {
      const v = parseAmountInput(text);
      setTargetText(v === null ? '' : formatAmountInput(Math.abs(v)));
    },
    submit,
    isSaving: mutation.isPending,
    errorText:
      validation ??
      (mutation.error
        ? getApiErrorMessage(mutation.error, 'Không lưu được mục tiêu.')
        : null),
  };
}
