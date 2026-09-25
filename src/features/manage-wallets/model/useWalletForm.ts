import { useState } from 'react';

import {
  buildUpdatePayload,
  useCreateWallet,
  useUpdateWallet,
  type AccountType,
  type WalletModel,
} from '@/entities/wallet';
import { getApiErrorMessage } from '@/shared/api';
import { formatAmountInput, parseAmountInput } from '@/shared/lib';

export function useWalletForm(editing: WalletModel | null, onDone: () => void) {
  const [name, setName] = useState(editing?.name ?? '');
  const [type, setType] = useState<AccountType>(editing?.type ?? 'LIQUID');
  const [amountText, setAmountText] = useState(
    formatAmountInput(Math.abs(editing?.initialBalance ?? 0))
  );
  const [negative, setNegative] = useState((editing?.initialBalance ?? 0) < 0);
  const [validation, setValidation] = useState<string | null>(null);
  const create = useCreateWallet();
  const update = useUpdateWallet();
  const mutation = editing ? update : create;

  const setAmount = (text: string) => {
    const parsed = parseAmountInput(text);
    setAmountText(parsed === null ? '' : formatAmountInput(Math.abs(parsed)));
  };

  const submit = () => {
    const trimmed = name.trim();
    if (!trimmed) return setValidation('Tên ví là bắt buộc');
    if (trimmed.length > 50) return setValidation('Tên ví tối đa 50 ký tự');
    const abs = parseAmountInput(amountText) ?? 0;
    const initialBalance = negative ? -abs : abs;
    setValidation(null);

    if (!editing) {
      create.mutate(
        { name: trimmed, type, initialBalance },
        { onSuccess: onDone }
      );
      return;
    }
    const payload = buildUpdatePayload(editing, trimmed, initialBalance);
    if (!payload) return onDone();
    update.mutate(payload, { onSuccess: onDone });
  };

  return {
    name,
    setName,
    type,
    setType,
    amountText,
    setAmount,
    negative,
    toggleNegative: () => setNegative((n) => !n),
    submit,
    isSaving: mutation.isPending,
    errorText:
      validation ??
      (mutation.error
        ? getApiErrorMessage(
            mutation.error,
            'Không lưu được ví. Vui lòng thử lại.'
          )
        : null),
  };
}
