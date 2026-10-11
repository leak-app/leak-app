import dayjs, { type Dayjs } from 'dayjs';

const SYMBOL = '₫';

const grouped = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const oneDecimal = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });

/** Whole dong; anything that is not a finite number counts as 0 (never "NaN"). */
function whole(amount: number): number {
  return Number.isFinite(amount) ? Math.round(amount) || 0 : 0;
}

/** 285000 → "285,000". Commas, whole dong, no symbol. */
export function formatNumber(amount: number): string {
  return grouped.format(whole(amount));
}

/** 850000 → "850,000₫". Expenses carry no minus sign, so callers pass them as positive numbers. */
export function formatVnd(amount: number): string {
  return `${formatNumber(amount)}${SYMBOL}`;
}

/** 600000 → "+600,000₫". Money coming in (income, savings) is marked with a plus. */
export function formatIncomeVnd(amount: number): string {
  const value = whole(amount);
  return value > 0 ? `+${formatVnd(value)}` : formatVnd(value);
}

/** 285000 → { value: "285,000", symbol: "₫" }, so the Amount component can style the symbol. */
export function formatVndParts(amount: number): {
  value: string;
  symbol: string;
} {
  return { value: formatNumber(amount), symbol: SYMBOL };
}

/** 1250000 → "1.3tr₫", 850000 → "850k₫", 900 → "900₫" */
export function formatCompactVnd(amount: number): string {
  if (!Number.isFinite(amount)) return formatVnd(0);
  if (amount >= 1_000_000)
    return `${oneDecimal.format(amount / 1_000_000)}tr${SYMBOL}`;
  if (amount >= 1_000)
    return `${grouped.format(Math.round(amount / 1_000))}k${SYMBOL}`;
  return formatVnd(amount);
}

/** "Hôm nay, 09:30" / "Hôm qua, 21:05" / "12/09, 08:00" */
export function formatRelativeDateTime(
  iso: string,
  now: Dayjs = dayjs()
): string {
  const date = dayjs(iso);
  const time = date.format('HH:mm');
  if (date.isSame(now, 'day')) return `Hôm nay, ${time}`;
  if (date.isSame(now.subtract(1, 'day'), 'day')) return `Hôm qua, ${time}`;
  return date.format('DD/MM, HH:mm');
}
