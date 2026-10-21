import { create } from 'zustand';

/**
 * Waits before each check after a save: 6, 12, 20, 30 and 45 seconds in. The worker ticks every
 * 15 seconds and a model call takes a second or two, so most comments land in this window. A later
 * one just appears in the history list.
 */
export const WATCH_DELAYS_MS = [6_000, 6_000, 8_000, 10_000, 15_000] as const;

/** The wait before check number `attempt` (0-based), or null once the watch is over. */
export function nextWatchDelay(attempt: number): number | null {
  return attempt >= 0 && attempt < WATCH_DELAYS_MS.length
    ? WATCH_DELAYS_MS[attempt]
    : null;
}

interface BuddyWatchState {
  /** The just-saved transaction whose comment we are waiting for, if any. */
  transactionId: string | null;
  startWatching: (transactionId: string) => void;
  stopWatching: () => void;
}

export const useBuddyWatch = create<BuddyWatchState>((set) => ({
  transactionId: null,
  startWatching: (transactionId) => set({ transactionId }),
  stopWatching: () => set({ transactionId: null }),
}));
