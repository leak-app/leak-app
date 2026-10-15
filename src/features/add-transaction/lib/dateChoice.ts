import dayjs from 'dayjs';

const INPUT_FORMAT = 'YYYY-MM-DD';

export interface DateChoiceModel {
  /** Today as "YYYY-MM-DD": the latest day that can be picked. */
  today: string;
  yesterday: string;
  isToday: boolean;
  isYesterday: boolean;
  /** "12/10/2026" for any other day, null for today and yesterday. */
  customLabel: string | null;
}

/** Which quick choice `value` ("YYYY-MM-DD") is, or the date to show for another day. */
export function describeDateChoice(
  value: string,
  now: dayjs.Dayjs = dayjs()
): DateChoiceModel {
  const today = now.format(INPUT_FORMAT);
  const yesterday = now.subtract(1, 'day').format(INPUT_FORMAT);
  const isToday = value === today;
  const isYesterday = value === yesterday;
  return {
    today,
    yesterday,
    isToday,
    isYesterday,
    customLabel:
      isToday || isYesterday ? null : dayjs(value).format('DD/MM/YYYY'),
  };
}
