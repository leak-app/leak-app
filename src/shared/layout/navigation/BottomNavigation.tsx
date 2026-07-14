import { Link, useLocation } from 'react-router-dom';

import { NAVIGATION_CONFIG } from '@/shared/configs/navigation.config';

export function BottomNavigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-6 left-1/2 z-50 max-w-[448px] -translate-x-1/2">
      <div className="glass-dark flex items-center justify-around gap-4 py-2.5 px-2.5 rounded-full border border-outline/15 shadow-2xl">
        {NAVIGATION_CONFIG.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center justify-center group"
              aria-label={item.label}
            >
              <div
                className={`
                  p-3 rounded-full transition-all duration-300 flex items-center justify-center
                  ${
                    isActive
                      ? 'bg-surface-bright text-primary scale-110'
                      : 'text-on-surface-variant hover:text-on-surface hover:scale-105'
                  }
                `}
              >
                <item.Icon
                  size={20}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
