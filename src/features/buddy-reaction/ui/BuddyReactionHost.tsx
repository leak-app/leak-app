import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import {
  BuddyBubble,
  fetchBuddyReaction,
  nextWatchDelay,
  refreshTransactionList,
  useBuddyWatch,
  type BuddyBubbleModel,
} from '@/entities/transaction';

const SHOW_MS = 8_000;

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Mounted once for the whole app. After an expense is saved it checks, a few times over about
 * 45 seconds, whether the Buddy has something to say, and shows it as a card above the bottom
 * navigation. It does nothing when nothing was just saved.
 */
export function BuddyReactionHost() {
  const transactionId = useBuddyWatch((state) => state.transactionId);
  const stopWatching = useBuddyWatch((state) => state.stopWatching);
  const queryClient = useQueryClient();
  const [buddy, setBuddy] = useState<BuddyBubbleModel | null>(null);

  useEffect(() => {
    if (!transactionId) return;
    let cancelled = false;

    const watch = async () => {
      for (let attempt = 0; ; attempt += 1) {
        const delay = nextWatchDelay(attempt);
        if (delay === null) break;
        await wait(delay);
        if (cancelled) return;

        try {
          const reaction = await fetchBuddyReaction(transactionId);
          if (cancelled) return;
          if (reaction.buddy) {
            setBuddy(reaction.buddy);
            refreshTransactionList(queryClient);
            break;
          }
          if (!reaction.isPending) break; // skipped, failed or none: nothing is coming
        } catch {
          // A failed check is not worth telling the user about; the next one retries.
        }
      }
      if (!cancelled) stopWatching();
    };

    void watch();
    return () => {
      cancelled = true;
    };
  }, [transactionId, queryClient, stopWatching]);

  useEffect(() => {
    if (!buddy) return;
    const timer = setTimeout(() => setBuddy(null), SHOW_MS);
    return () => clearTimeout(timer);
  }, [buddy]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 z-50 flex justify-center px-4 bottom-[calc(5.75rem+env(safe-area-inset-bottom))]"
    >
      {buddy && (
        <button
          type="button"
          onClick={() => setBuddy(null)}
          aria-label="Đóng nhận xét"
          className="pointer-events-auto min-h-11 w-full max-w-md rounded-2xl bg-sheet text-left shadow-lg"
        >
          <BuddyBubble buddy={buddy} />
        </button>
      )}
    </div>
  );
}
