import type { ReactNode } from 'react';

interface EmptyStateProps {
  /** An illustration, at most 240px wide. */
  illustration?: ReactNode;
  title: string;
  description?: string;
  /** Usually one `Button`. */
  action?: ReactNode;
}

export function EmptyState({
  illustration,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
      {illustration && <div className="w-full max-w-60">{illustration}</div>}
      <h2 className="text-section-title text-text">{title}</h2>
      {description && (
        <p className="text-description text-muted">{description}</p>
      )}
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
