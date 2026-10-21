import { clsx } from 'clsx';

import type { BuddyBubbleModel } from '../model/types';

interface BuddyBubbleProps {
  buddy: BuddyBubbleModel;
  className?: string;
}

/** The Buddy's one-line reaction to a spend. */
export function BuddyBubble({ buddy, className }: BuddyBubbleProps) {
  return (
    <span
      className={clsx(
        'flex items-start gap-2.5 rounded-2xl border px-3 py-2.5',
        buddy.containerClass,
        className
      )}
    >
      <span
        aria-hidden="true"
        className="text-base leading-6"
      >
        {buddy.emoji}
      </span>
      <span className="min-w-0 text-sm leading-6 text-soft">
        <span className="sr-only">{buddy.label}: </span>
        {buddy.text}
      </span>
    </span>
  );
}
