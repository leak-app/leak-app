import type {
  BuddyBubbleModel,
  BuddyReactionModel,
  BuddySentiment,
  RawBuddyReactionModel,
} from '../model/types';

const BUDDY_META: Record<
  BuddySentiment,
  { emoji: string; label: string; containerClass: string }
> = {
  ROAST: {
    emoji: '💀',
    label: 'Bạn thân cà khịa',
    containerClass: 'border-danger/30 bg-danger/7',
  },
  PRAISE: {
    emoji: '🔥',
    label: 'Bạn thân cổ vũ',
    containerClass: 'border-primary/20 bg-primary/8',
  },
  NUDGE: {
    emoji: '💬',
    label: 'Bạn thân nhắc nhẹ',
    containerClass: 'border-secondary/25 bg-secondary/7',
  },
};

export function parseBuddySentiment(value: unknown): BuddySentiment | null {
  return value === 'ROAST' || value === 'PRAISE' || value === 'NUDGE'
    ? value
    : null;
}

/** Null when there is nothing worth showing: no comment, a blank one, or an unknown sentiment. */
export function deserializeBuddy(
  comment: string | null | undefined,
  sentiment: unknown
): BuddyBubbleModel | null {
  const text = comment?.trim();
  const parsed = parseBuddySentiment(sentiment);
  if (!text || !parsed) return null;
  return { text, sentiment: parsed, ...BUDDY_META[parsed] };
}

export function deserializeBuddyReaction(
  raw: RawBuddyReactionModel
): BuddyReactionModel {
  return {
    isPending: raw.status === 'PENDING',
    buddy:
      raw.status === 'DONE'
        ? deserializeBuddy(raw.comment, raw.sentiment)
        : null,
  };
}
