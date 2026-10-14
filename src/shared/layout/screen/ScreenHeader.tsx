import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface ScreenHeaderProps {
  /** A string is set as the page title; a node is rendered as is. */
  title?: ReactNode;
  /** Small muted line above the title, for example the date on Today. */
  eyebrow?: string;
  /** With a left action (back or close) the title is centred; without one it sits left. */
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  className?: string;
}

/**
 * Transparent header with no background, so the screen's mist shows through.
 * It scrolls with the page; only the bottom navigation stays fixed.
 */
export function ScreenHeader({
  title,
  eyebrow,
  leftAction,
  rightAction,
  className,
}: ScreenHeaderProps) {
  const hasLeftAction = Boolean(leftAction);
  const titleNode =
    typeof title === 'string' ? (
      <h1
        className={clsx(
          hasLeftAction ? 'text-heading truncate' : 'text-page-title',
          'text-text'
        )}
      >
        {title}
      </h1>
    ) : (
      title
    );

  return (
    <header
      className={clsx(
        'flex w-full select-none items-center justify-between gap-3 px-container-padding pt-[max(3rem,calc(env(safe-area-inset-top)+1rem))] pb-2',
        className
      )}
    >
      {hasLeftAction ? (
        <>
          <div className="flex min-w-touch items-center justify-start">
            {leftAction}
          </div>
          <div className="flex min-w-0 flex-1 justify-center text-center">
            {titleNode}
          </div>
          <div className="flex min-w-touch items-center justify-end">
            {rightAction}
          </div>
        </>
      ) : (
        <>
          <div className="flex min-w-0 flex-col gap-1">
            {eyebrow && <span className="text-sm text-muted">{eyebrow}</span>}
            {titleNode}
          </div>
          {rightAction && (
            <div className="flex shrink-0 items-center justify-end">
              {rightAction}
            </div>
          )}
        </>
      )}
    </header>
  );
}
