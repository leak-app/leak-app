/** From this share of the limit a budget counts as "about to run out". */
export const NEAR_LIMIT_PERCENT = 80;

/** The month may be this many points ahead of the day-of-month marker before spending counts as fast. */
export const PACE_TOLERANCE_PERCENT = 5;

export type BudgetRowState = 'ok' | 'near' | 'full' | 'over';

export interface BarGeometry {
  /** Width of the solid part, in percent of the track. */
  fillPercent: number;
  /** Where the striped over-limit stretch starts, or null while within the limit. */
  overflowStartPercent: number | null;
}

export function usedPercent(spent: number, limit: number): number {
  return limit > 0 ? Math.round((spent / limit) * 100) : 0;
}

/** Compared on money, not on the rounded percent, so 99.6% is "near", never "full". */
export function rowState(spent: number, limit: number): BudgetRowState {
  if (spent > limit) return 'over';
  if (spent === limit) return 'full';
  return usedPercent(spent, limit) >= NEAR_LIMIT_PERCENT ? 'near' : 'ok';
}

/** Over the limit the bar shrinks to the spent amount: the limit becomes a point inside it. */
export function barGeometry(spent: number, limit: number): BarGeometry {
  if (limit <= 0) return { fillPercent: 0, overflowStartPercent: null };
  if (spent > limit) {
    const limitPercent = (limit / spent) * 100;
    return { fillPercent: limitPercent, overflowStartPercent: limitPercent };
  }
  return {
    fillPercent: Math.min(100, (spent / limit) * 100),
    overflowStartPercent: null,
  };
}

export interface MonthProgress {
  /** How far into the month today is, in percent (13th of 30 → 43). */
  todayPercent: number;
  daysLeft: number;
}

export function monthProgress(
  dayOfMonth: number,
  daysInMonth: number
): MonthProgress {
  return {
    todayPercent: Math.round((dayOfMonth / daysInMonth) * 100),
    daysLeft: Math.max(0, daysInMonth - dayOfMonth),
  };
}

export function isSpendingFast(
  usedPercentOfMonth: number,
  todayPercent: number
): boolean {
  return usedPercentOfMonth > todayPercent + PACE_TOLERANCE_PERCENT;
}

/** What is left to spend per remaining day; thousands when it is big enough, else whole dong. */
export function perDayAmount(remaining: number, daysLeft: number): number {
  if (remaining <= 0 || daysLeft <= 0) return 0;
  const perDay = remaining / daysLeft;
  return perDay >= 1000 ? Math.round(perDay / 1000) * 1000 : Math.round(perDay);
}
