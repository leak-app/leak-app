import { Link } from 'react-router-dom';

import { ChevronRightIcon, ICON, TargetIcon } from '@/shared/icons';

/** Entry to savings goals. Its own icon and line keep it apart from the spending budget above it. */
export function SavingsGoalsEntryCard() {
  return (
    <Link
      to="/goals"
      className="flex min-h-touch items-center gap-3.5 rounded-card border border-border bg-surface py-4 pr-4.5 pl-4.5 shadow-lg focus-visible:shadow-focus focus-visible:outline-none"
    >
      <span className="flex size-disc shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary">
        <TargetIcon
          size={ICON.size.row}
          strokeWidth={ICON.stroke.idle}
          aria-hidden="true"
        />
      </span>
      <span className="flex flex-1 flex-col gap-0.5">
        <span className="text-heading text-text">Mục tiêu tiết kiệm</span>
        <span className="text-caption text-muted">
          Tiền để dành cho điều bạn muốn — khác với ngân sách chi tiêu
        </span>
      </span>
      <ChevronRightIcon
        size={ICON.size.row}
        strokeWidth={ICON.stroke.active}
        className="shrink-0 text-muted"
        aria-hidden="true"
      />
    </Link>
  );
}
