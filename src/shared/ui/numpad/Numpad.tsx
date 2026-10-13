import { clsx } from 'clsx';

import { DeleteIcon, ICON } from '@/shared/icons';

interface NumpadProps {
  onKeyPress: (key: string) => void;
  className?: string;
}

const KEY_CLASS =
  'flex h-12 sm:h-14 items-center justify-center rounded-full border border-border bg-surface text-lg sm:text-xl font-medium text-text transition-colors duration-200 ease-out hover:bg-surface-elevated active:bg-surface-elevated focus-visible:shadow-focus focus-visible:outline-none';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.000', '0'];

export function Numpad({ onKeyPress, className }: NumpadProps) {
  return (
    <div
      className={clsx(
        'grid grid-cols-3 gap-2.5 sm:gap-3 px-4 sm:px-6 select-none',
        className
      )}
    >
      {KEYS.map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => onKeyPress(key)}
          aria-label={key === '.000' ? 'Thêm ba chữ số không' : undefined}
          className={KEY_CLASS}
        >
          {key}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onKeyPress('Backspace')}
        aria-label="Xóa số cuối"
        className={KEY_CLASS}
      >
        <DeleteIcon
          size={ICON.size.ui}
          strokeWidth={ICON.stroke.idle}
          className="text-muted"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
