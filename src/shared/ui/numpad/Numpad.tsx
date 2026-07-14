import { clsx } from 'clsx';

import { BackspaceIcon } from '@/shared/icons';

interface NumpadProps {
  onKeyPress: (key: string) => void;
  className?: string;
}

export function Numpad({ onKeyPress, className }: NumpadProps) {
  const keys = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '.000',
    '0',
    'delete',
  ];

  return (
    <div
      className={clsx(
        'grid grid-cols-3 gap-y-3 gap-x-4 px-6 select-none',
        className
      )}
    >
      {keys.map((key) => {
        if (key === 'delete') {
          return (
            <button
              key={key}
              onClick={() => onKeyPress('Backspace')}
              className="py-4 rounded-2xl bg-surface/50 hover:bg-surface border border-outline/5 active:scale-95 transition-all text-on-surface flex items-center justify-center group"
              aria-label="Backspace"
            >
              <BackspaceIcon className="w-6 h-6 text-tertiary group-hover:scale-105 transition-transform" />
            </button>
          );
        }

        return (
          <button
            key={key}
            onClick={() => onKeyPress(key)}
            className="py-4 rounded-2xl bg-surface/50 hover:bg-surface border border-outline/5 active:scale-95 transition-all text-on-surface text-xl font-semibold flex items-center justify-center"
          >
            {key}
          </button>
        );
      })}
    </div>
  );
}
