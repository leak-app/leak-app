import type { TransactionType } from '../model/types';

const OPTIONS: { value: TransactionType; label: string }[] = [
  { value: 'EXPENSE', label: 'Chi tiêu' },
  { value: 'INCOME', label: 'Thu nhập' },
];

interface Props {
  value: TransactionType;
  onChange: (type: TransactionType) => void;
}

export function TransactionTypeToggle({ value, onChange }: Props) {
  return (
    <div
      role="radiogroup"
      aria-label="Loại giao dịch"
      className="join self-center"
    >
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className="join-item btn btn-sm min-h-11 px-6 btn-ghost aria-checked:btn-primary"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
