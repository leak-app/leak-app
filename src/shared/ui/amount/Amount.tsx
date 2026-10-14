import { clsx } from 'clsx';

export type AmountSize = 'xl' | 'lg' | 'md' | 'row';

interface AmountProps {
  /** Already formatted digits, for example "285,000". */
  value: string;
  /** Currency symbol, shown smaller and muted. Leave out for a bare number. */
  symbol?: string;
  size?: AmountSize;
  /** Decided by the data mapper: "+" for money coming in, nothing for expenses. */
  sign?: string;
  className?: string;
}

const VALUE_CLASS: Record<AmountSize, string> = {
  xl: 'text-amount-xl',
  lg: 'text-amount-lg',
  md: 'text-amount-md',
  row: 'text-amount-row',
};

const SYMBOL_CLASS: Record<AmountSize, string> = {
  xl: 'text-[1.75rem]',
  lg: 'text-2xl',
  md: 'text-base',
  row: 'text-sm',
};

/** A money amount: thin, tabular, with the symbol set smaller in muted text. */
export function Amount({
  value,
  symbol,
  size = 'xl',
  sign,
  className,
}: AmountProps) {
  return (
    <span className={clsx('text-text', VALUE_CLASS[size], className)}>
      {sign}
      {value}
      {symbol && (
        <span className={clsx('ml-1 text-muted', SYMBOL_CLASS[size])}>
          {symbol}
        </span>
      )}
    </span>
  );
}
