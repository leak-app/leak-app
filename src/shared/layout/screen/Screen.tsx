import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface ScreenProps {
  children: ReactNode;
  header?: ReactNode;
  className?: string;
  padding?: boolean;
}

export function Screen({
  children,
  header,
  className,
  padding = true,
}: ScreenProps) {
  return (
    <div
      className={clsx(
        'flex flex-col min-h-screen w-full bg-background text-on-surface',
        className
      )}
    >
      {header}
      <main
        className={clsx(
          'flex-1 w-full flex flex-col',
          padding && 'px-container-padding py-4'
        )}
      >
        {children}
      </main>
    </div>
  );
}
