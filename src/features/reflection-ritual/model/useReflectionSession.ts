import { useState } from 'react';

import type {
  ReviewableOutcome,
  TransactionModel,
} from '@/entities/transaction';

export interface ReflectionTally {
  worthIt: number;
  neutral: number;
  leak: number;
  leakAmount: number;
}

const EMPTY_TALLY: ReflectionTally = {
  worthIt: 0,
  neutral: 0,
  leak: 0,
  leakAmount: 0,
};

/** Walks a fixed snapshot of queue items one at a time and tallies the results. */
export function useReflectionSession(items: TransactionModel[]) {
  const [index, setIndex] = useState(0);
  const [tally, setTally] = useState<ReflectionTally>(EMPTY_TALLY);

  const record = (
    transaction: TransactionModel,
    outcome: ReviewableOutcome
  ) => {
    setTally((prev) => ({
      worthIt: prev.worthIt + (outcome === 'WORTH_IT' ? 1 : 0),
      neutral: prev.neutral + (outcome === 'NEUTRAL' ? 1 : 0),
      leak: prev.leak + (outcome === 'LEAK' ? 1 : 0),
      leakAmount:
        prev.leakAmount + (outcome === 'LEAK' ? transaction.amount : 0),
    }));
    setIndex((i) => i + 1);
  };

  const skip = () => setIndex((i) => i + 1);

  return {
    current: items[index] as TransactionModel | undefined,
    index,
    total: items.length,
    isDone: index >= items.length,
    tally,
    record,
    skip,
  };
}
