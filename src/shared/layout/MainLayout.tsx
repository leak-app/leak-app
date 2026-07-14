import type { ReactNode } from 'react';

import { clsx } from 'clsx';
import { BottomNavigation } from './navigation/BottomNavigation';

interface MainLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

export function MainLayout({
  children,
  showBottomNav = true,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-background flex justify-center items-start">
      <div className="w-full max-w-[480px] min-h-screen flex flex-col relative">
        <div
          className={clsx(
            'flex-1 w-full flex flex-col',
            showBottomNav ? 'pb-28' : 'pb-6'
          )}
        >
          {children}
        </div>
        {showBottomNav && <BottomNavigation />}
      </div>
    </div>
  );
}
