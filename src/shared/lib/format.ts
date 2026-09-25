import dayjs, { type Dayjs } from 'dayjs';

const vnd = new Intl.NumberFormat('vi-VN');
const oneDecimal = new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 1 });

/** 120000 → "120.000 ₫" */
export function formatVnd(amount: number): string {
  return `${vnd.format(Math.round(amount))} ₫`;
}

/** 1250000 → "1,3tr ₫", 850000 → "850k ₫", 900 → "900 ₫" */
export function formatCompactVnd(amount: number): string {
  if (amount >= 1_000_000)
    return `${oneDecimal.format(amount / 1_000_000)}tr ₫`;
  if (amount >= 1_000) return `${vnd.format(Math.round(amount / 1_000))}k ₫`;
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
