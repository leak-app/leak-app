import dayjs from 'dayjs';

export interface MonthOptionModel {
  /** "YYYY-MM", or "" for all time. */
  value: string;
  label: string;
}

const monthLabel = (month: string) => dayjs(`${month}-01`).format('MM/YYYY');

/** "Tất cả", then `count` months back from `now`, newest first; a selected month outside them is kept. */
export function buildMonthOptions(
  selected: string,
  now: string,
  count = 12
): MonthOptionModel[] {
  const months = Array.from({ length: count }, (_, index) =>
    dayjs(`${now}-01`).subtract(index, 'month').format('YYYY-MM')
  );
  if (selected && !months.includes(selected)) months.push(selected);
  return [
    { value: '', label: 'Tất cả' },
    ...months.map((value) => ({ value, label: monthLabel(value) })),
  ];
}

interface ActiveFilterInput {
  month: string;
  currentMonth: string;
  categoryId: string;
  accountId: string;
  outcome?: string;
}

/** How many filters differ from the default view (this month, nothing narrowed). */
export function countActiveFilters({
  month,
  currentMonth,
  categoryId,
  accountId,
  outcome,
}: ActiveFilterInput): number {
  return [
    month !== currentMonth,
    categoryId !== '',
    accountId !== '',
    outcome !== undefined,
  ].filter(Boolean).length;
}

interface FilterSummaryInput {
  month: string;
  categoryLabel?: string;
  walletLabel?: string;
  outcomeLabel?: string;
}

/** One line under the toolbar: the period, then whatever narrows it. */
export function buildFilterSummary({
  month,
  categoryLabel,
  walletLabel,
  outcomeLabel,
}: FilterSummaryInput): string {
  const period = month ? `Tháng ${monthLabel(month)}` : 'Mọi thời gian';
  return [period, categoryLabel, walletLabel, outcomeLabel]
    .filter(Boolean)
    .join(' · ');
}
