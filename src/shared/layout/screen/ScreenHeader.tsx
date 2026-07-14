import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface ScreenHeaderProps {
  title?: ReactNode;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  className?: string;
}

export function ScreenHeader({
  title,
  leftAction,
  rightAction,
  className,
}: ScreenHeaderProps) {
  return (
    <header
      className={clsx(
        'sticky top-0 z-45 w-full flex items-center justify-between px-container-padding pt-6 py-2 bg-background/80 backdrop-blur-md h-16 select-none',
        className
      )}
    >
      <div className="flex items-center justify-start min-w-14">
        {leftAction}
      </div>

      <div className="flex-1 flex justify-center text-center">
        {typeof title === 'string' ? (
          <h1 className="text-headline-md text-on-surface font-semibold">
            {title}
          </h1>
        ) : (
          title
        )}
      </div>

      <div className="flex items-center justify-end min-w-14">
        {rightAction}
      </div>
    </header>
  );
}
