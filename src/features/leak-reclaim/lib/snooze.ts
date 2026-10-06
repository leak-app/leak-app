import dayjs from 'dayjs';

const KEY = 'leak.reclaimSnoozedUntil';

/** "Để sau" hides the card until the next day, on this device only. */
export function isSnoozed(now: Date): boolean {
  try {
    const until = localStorage.getItem(KEY);
    return !!until && dayjs(now).isBefore(dayjs(until));
  } catch {
    return false;
  }
}

export function snoozeUntilTomorrow(now: Date): void {
  try {
    localStorage.setItem(
      KEY,
      dayjs(now).add(1, 'day').startOf('day').toISOString()
    );
  } catch {
    // Blocked storage: the card simply shows again next time.
  }
}
