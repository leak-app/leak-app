import type { QuickLogDraftModel } from '../model/types';

const FIELD_ORDER = ['amount', 'category'] as const;

const FIELD_LABELS: Record<(typeof FIELD_ORDER)[number], string> = {
  amount: 'số tiền',
  category: 'danh mục',
};

/** "Chưa xác định: số tiền, danh mục", or null when the draft is complete. */
export function describeUnresolved(
  draft: Pick<QuickLogDraftModel, 'unresolved'>
): string | null {
  const labels = FIELD_ORDER.filter((field) =>
    draft.unresolved.includes(field)
  ).map((field) => FIELD_LABELS[field]);
  return labels.length ? `Chưa xác định: ${labels.join(', ')}` : null;
}
