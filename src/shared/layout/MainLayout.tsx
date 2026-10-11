import type { ReactNode } from 'react';

import { clsx } from 'clsx';
import { BottomNavigation } from './navigation/BottomNavigation';

type Mist = 'sage' | 'lavender' | 'apricot';

const MIST_CLASS: Record<Mist, string> = {
  sage: 'mist-sage',
  lavender: 'mist-lavender',
  apricot: 'mist-apricot',
};

interface MainLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
  /** The one glow at the top of the screen: sage by default, lavender for reflection and logging, apricot for leaks. */
  mist?: Mist;
}

export function MainLayout({
  children,
  showBottomNav = true,
  mist = 'sage',
}: MainLayoutProps) {
  return (
    <div className="relative flex min-h-screen w-full items-start justify-center overflow-x-clip bg-bg text-text">
      <div
        aria-hidden="true"
        className={clsx(
          'pointer-events-none absolute inset-x-0 top-0 h-[640px]',
          MIST_CLASS[mist]
        )}
      />
      <div className="relative flex min-h-screen w-full max-w-[480px] flex-col">
        <div
          className={clsx(
            'flex w-full flex-1 flex-col',
            // Pages reserve 112px for the nav; this adds the home-indicator inset it now clears.
            showBottomNav && 'pb-[env(safe-area-inset-bottom)]'
          )}
        >
          {children}
        </div>
        {showBottomNav && <BottomNavigation />}
      </div>
    </div>
  );
}
