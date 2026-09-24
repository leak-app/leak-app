import { useState } from 'react';

import { LEAK_REASON_OPTIONS, OUTCOME_OPTIONS } from '../lib/outcome';
import type {
  LeakReason,
  ReviewableOutcome,
  SpendOutcome,
} from '../model/types';
import { OutcomeIcon } from './OutcomeIcon';

interface OutcomePickerProps {
  value?: SpendOutcome;
  isSaving?: boolean;
  onSelect: (outcome: ReviewableOutcome, leakReason?: LeakReason) => void;
}

/** Step 1: pick an outcome. Choosing "Rò rỉ" opens step 2: an optional reason. */
export function OutcomePicker({
  value,
  isSaving = false,
  onSelect,
}: OutcomePickerProps) {
  const [step, setStep] = useState<'outcome' | 'reason'>('outcome');

  if (step === 'reason') {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-on-surface">
          Vì sao đây là khoản rò rỉ?
        </p>
        <div className="flex flex-wrap gap-2">
          {LEAK_REASON_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              disabled={isSaving}
              onClick={() => onSelect('LEAK', option.value)}
              className="btn btn-sm min-h-11 rounded-full border-outline/20 bg-surface-bright text-on-surface"
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            disabled={isSaving}
            onClick={() => setStep('outcome')}
            className="btn btn-ghost min-h-11"
          >
            Quay lại
          </button>
          <button
            type="button"
            disabled={isSaving}
            onClick={() => onSelect('LEAK')}
            className="btn btn-ghost min-h-11"
          >
            Bỏ qua
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {OUTCOME_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          disabled={isSaving}
          aria-pressed={value === option.value}
          onClick={() =>
            option.value === 'LEAK' ? setStep('reason') : onSelect(option.value)
          }
          className={`btn h-auto min-h-16 flex-col gap-1 py-3 ${option.buttonClass} aria-pressed:ring-2 aria-pressed:ring-primary`}
        >
          <OutcomeIcon
            name={option.icon}
            size={22}
          />
          <span className="text-xs font-semibold">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
