import dayjs from 'dayjs';

/** Monday first, as Vietnamese calendars are laid out. */
export const WEEKDAY_LABELS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

const WEEKDAY_NAMES = [
  'Chủ nhật',
  'Thứ hai',
  'Thứ ba',
  'Thứ tư',
  'Thứ năm',
  'Thứ sáu',
  'Thứ bảy',
];

export interface CalendarDayModel {
  /** "2026-10-14" */
  date: string;
  /** 14 */
  day: number;
  /** False for the days of the neighbouring months that fill the first and last week. */
  inMonth: boolean;
}

/** The weeks of `month` ("YYYY-MM"), Monday first, each with seven days. */
export function buildMonthGrid(month: string): CalendarDayModel[][] {
  const first = dayjs(`${month}-01`);
  const lead = (first.day() + 6) % 7;
  const total = Math.ceil((lead + first.daysInMonth()) / 7) * 7;
  const start = first.subtract(lead, 'day');

  const weeks: CalendarDayModel[][] = [];
  for (let index = 0; index < total; index++) {
    const date = start.add(index, 'day');
    if (index % 7 === 0) weeks.push([]);
    weeks[weeks.length - 1].push({
      date: date.format('YYYY-MM-DD'),
      day: date.date(),
      inMonth: date.month() === first.month(),
    });
  }
  return weeks;
}

/** "2026-10" moved by `delta` months. */
export function shiftMonth(month: string, delta: number): string {
  return dayjs(`${month}-01`).add(delta, 'month').format('YYYY-MM');
}

/** "2026-10" → "Tháng 10, 2026" */
export function formatMonthTitle(month: string): string {
  const date = dayjs(`${month}-01`);
  return `Tháng ${date.month() + 1}, ${date.year()}`;
}

/** "2026-10-14" → "Thứ tư, 14 tháng 10, 2026", the spoken name of a day. */
export function formatDayName(date: string): string {
  const value = dayjs(date);
  return `${WEEKDAY_NAMES[value.day()]}, ${value.date()} tháng ${value.month() + 1}, ${value.year()}`;
}
