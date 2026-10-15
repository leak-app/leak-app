export interface CountingUpdateModel {
  /** ISO time the update was entered. */
  createdAt: string;
  /** "01/10/2026" */
  dateText: string;
}

/**
 * A balance update counts every transfer made before it was entered, and the API
 * then refuses to delete such a transfer. Returns the day ("01/10") of the first
 * update that counted the transfer, or null while it is still waiting for one.
 */
export function findCountingUpdateDay(
  transferCreatedAt: string,
  updates: readonly CountingUpdateModel[]
): string | null {
  const moment = Date.parse(transferCreatedAt);
  let first: CountingUpdateModel | null = null;
  for (const update of updates) {
    if (Date.parse(update.createdAt) <= moment) continue;
    if (!first || Date.parse(update.createdAt) < Date.parse(first.createdAt)) {
      first = update;
    }
  }
  return first ? first.dateText.slice(0, 5) : null;
}
