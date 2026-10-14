import { ReceiptIcon } from '@/shared/icons';
import { Amount, Card } from '@/shared/ui';

import type { ReflectionItemModel } from '../lib/deserialize';

interface ReflectionItemCardProps {
  item: ReflectionItemModel;
}

/** The expense being looked back at: where, when, what, how much. */
export function ReflectionItemCard({ item }: ReflectionItemCardProps) {
  return (
    <Card
      variant="elevated"
      className="flex flex-col items-center gap-2 px-6 text-center"
    >
      <span
        aria-hidden="true"
        className="flex size-touch items-center justify-center rounded-full bg-white/6 text-xl text-soft"
      >
        {item.emoji ?? (
          <ReceiptIcon
            size={22}
            strokeWidth={1.6}
          />
        )}
      </span>
      <span className="text-sm text-muted">{item.meta}</span>
      <h2 className="max-w-full text-xl font-medium break-words text-text">
        {item.title}
      </h2>
      <Amount
        value={item.amountValue}
        symbol={item.amountSymbol}
        size="lg"
      />
    </Card>
  );
}
