import { useState } from 'react';

import {
  LEAK_REASON_OPTIONS,
  useReviewTransaction,
  type LeakReason,
  type ReviewableOutcome,
  type TransactionModel,
} from '@/entities/transaction';
import { Button, Card, Chip, Choice } from '@/shared/ui';

import { deserializeReflectionItem } from '../lib/deserialize';
import { nextLabel } from '../lib/session';
import { REFLECTION_CHOICES, REFLECTION_COPY } from '../model/choices';
import { useReflectionSession } from '../model/useReflectionSession';
import { ReflectionItemCard } from './ReflectionItemCard';
import { ReflectionProgress } from './ReflectionProgress';
import { ReflectionSummary } from './ReflectionSummary';

interface ReflectionSessionProps {
  items: TransactionModel[];
  onClose: () => void;
}

export function ReflectionSession({ items, onClose }: ReflectionSessionProps) {
  const session = useReflectionSession(items);
  const review = useReviewTransaction();
  const [outcome, setOutcome] = useState<ReviewableOutcome | null>(null);
  const [reason, setReason] = useState<LeakReason | null>(null);

  if (session.isDone || !session.current) {
    return (
      <ReflectionSummary
        tally={session.tally}
        onClose={onClose}
      />
    );
  }

  const item = session.current;
  const isLeak = outcome === 'LEAK';

  const resetStep = () => {
    review.reset();
    setOutcome(null);
    setReason(null);
  };

  const handleChoose = (value: ReviewableOutcome) => {
    setOutcome(value);
    if (value !== 'LEAK') setReason(null);
  };

  const handleNext = () => {
    if (!outcome) return;
    review.mutate(
      {
        transactionId: item.id,
        outcome,
        leakReason: isLeak ? (reason ?? undefined) : undefined,
      },
      {
        onSuccess: () => {
          resetStep();
          session.record(item, outcome);
        },
      }
    );
  };

  const handleSkip = () => {
    resetStep();
    session.skip();
  };

  return (
    <div className="flex flex-1 flex-col gap-5">
      <ReflectionProgress
        index={session.index}
        total={session.total}
      />

      <ReflectionItemCard item={deserializeReflectionItem(item)} />

      <div className="flex flex-col gap-2">
        <p className="mb-1 text-center text-base font-medium text-text">
          {REFLECTION_COPY.question}
        </p>
        {REFLECTION_CHOICES.map((choice) => (
          <Choice
            key={choice.value}
            tone={choice.tone}
            label={choice.label}
            hint={choice.hint}
            selected={outcome === choice.value}
            disabled={review.isPending}
            onSelect={() => handleChoose(choice.value)}
          />
        ))}
      </div>

      {isLeak && (
        <div className="flex flex-col gap-2.5">
          <span className="text-sm text-muted">
            {REFLECTION_COPY.reasonPrompt}
          </span>
          <div
            role="group"
            aria-label={REFLECTION_COPY.reasonsLabel}
            className="flex flex-wrap gap-2"
          >
            {LEAK_REASON_OPTIONS.map((option) => (
              <Chip
                key={option.value}
                compact
                tone="danger"
                selected={reason === option.value}
                disabled={review.isPending}
                onClick={() =>
                  setReason(reason === option.value ? null : option.value)
                }
              >
                {option.label}
              </Chip>
            ))}
          </div>
        </div>
      )}

      {review.isError && (
        <Card
          variant="danger"
          role="alert"
          className="py-3 text-description text-text"
        >
          {REFLECTION_COPY.saveError}
        </Card>
      )}

      <div className="mt-auto flex flex-col gap-1 pt-2 pb-8">
        <Button
          size="lg"
          fullWidth
          loading={review.isPending}
          disabled={!outcome}
          onClick={handleNext}
        >
          {nextLabel(session.index, session.total)}
        </Button>
        <Button
          variant="ghost"
          fullWidth
          disabled={review.isPending}
          onClick={handleSkip}
        >
          {REFLECTION_COPY.skip}
        </Button>
      </div>
    </div>
  );
}
