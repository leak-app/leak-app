import { useState } from 'react';

import {
  useParseTransaction,
  type QuickLogDraftModel,
} from '@/entities/transaction';

import {
  QUICK_LOG_ERROR_TEXT,
  normalizeQuickLogText,
} from '../lib/quickLogInput';

export function useQuickLog(onDraft: (draft: QuickLogDraftModel) => void) {
  const [text, setText] = useState('');
  const { mutate, isPending, isError, reset } = useParseTransaction();

  const phrase = normalizeQuickLogText(text);

  const submit = () => {
    if (!phrase || isPending) return;
    mutate(phrase, { onSuccess: onDraft });
  };

  return {
    text,
    setText: (value: string) => {
      if (isError) reset();
      setText(value);
    },
    submit,
    canSubmit: phrase !== null && !isPending,
    isPending,
    // A failed parse never blocks logging: the manual form stays usable.
    errorText: isError ? QUICK_LOG_ERROR_TEXT : null,
  };
}
