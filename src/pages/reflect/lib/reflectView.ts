export type ReflectView = 'loading' | 'error' | 'empty' | 'session';

interface ReflectViewInput {
  /** True once the first queue has arrived and been copied. */
  hasSnapshot: boolean;
  /** Number of items in the snapshot. */
  count: number;
  isError: boolean;
}

/**
 * Which body the page shows. Once a snapshot exists it is trusted: a failed
 * background refetch must not unmount a running session, because the session
 * keeps its position in local state and would restart from the first item.
 */
export function reflectView({
  hasSnapshot,
  count,
  isError,
}: ReflectViewInput): ReflectView {
  if (!hasSnapshot) return isError ? 'error' : 'loading';
  return count === 0 ? 'empty' : 'session';
}
