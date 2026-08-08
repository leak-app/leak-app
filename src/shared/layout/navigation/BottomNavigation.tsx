import { Link, useLocation } from 'react-router-dom';

import { DollarIcon, HomeIcon, PlusIcon, ReceiptIcon } from '@/shared/icons';

export function BottomNavigation() {
  const location = useLocation();

  const isOverviewActive = location.pathname === '/overview';
  const isBudgetActive = location.pathname.startsWith('/budget');
  const isAddActive = location.pathname === '/transaction/add';
  const isSavingsActive = location.pathname === '/savings-goals';

  return (
    <nav className="fixed bottom-6 left-1/2 z-50 max-w-[448px] -translate-x-1/2">
      <div className="glass-dark flex items-center justify-around gap-6 py-2 px-6 rounded-full border border-outline/15 shadow-2xl">
        {/* Left: Overview Report */}
        <Link
          to="/overview"
          className="relative flex flex-col items-center justify-center group"
          aria-label="Overview Report"
        >
          <div
            className={`
              p-3 rounded-full transition-all duration-300 flex items-center justify-center
              ${
                isOverviewActive
                  ? 'bg-surface-bright text-primary scale-110'
                  : 'text-on-surface-variant hover:text-on-surface hover:scale-105'
              }
            `}
          >
            <HomeIcon size={20} />
          </div>
        </Link>

        {/* Budget Management */}
        <Link
          to="/budget"
          className="relative flex flex-col items-center justify-center group"
          aria-label="Monthly Budget"
        >
          <div
            className={`
              p-3 rounded-full transition-all duration-300 flex items-center justify-center
              ${
                isBudgetActive
                  ? 'bg-surface-bright text-primary scale-110'
                  : 'text-on-surface-variant hover:text-on-surface hover:scale-105'
              }
            `}
          >
            <ReceiptIcon size={20} />
          </div>
        </Link>

        {/* Center: Transaction / Add (Pop out style) */}
        <Link
          to="/transaction/add"
          className="relative flex flex-col items-center justify-center group"
          aria-label="Add Transaction"
        >
          <div
            className={`
              p-3.5 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center
              bg-primary text-on-primary hover:scale-110 active:scale-95
              ${
                isAddActive
                  ? 'ring-4 ring-primary/30 scale-110 shadow-primary/50'
                  : 'shadow-primary/30 hover:shadow-primary/50'
              }
            `}
          >
            <PlusIcon size={22} />
          </div>
        </Link>

        {/* Right: Savings Goals */}
        <Link
          to="/savings-goals"
          className="relative flex flex-col items-center justify-center group"
          aria-label="Savings Goals"
        >
          <div
            className={`
              p-3 rounded-full transition-all duration-300 flex items-center justify-center
              ${
                isSavingsActive
                  ? 'bg-surface-bright text-primary scale-110'
                  : 'text-on-surface-variant hover:text-on-surface hover:scale-105'
              }
            `}
          >
            <DollarIcon size={20} />
          </div>
        </Link>
      </div>
    </nav>
  );
}
