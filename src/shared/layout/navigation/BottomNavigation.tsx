import type { ComponentType } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { GearIcon, HomeIcon, PlusIcon, ReceiptIcon } from '@/shared/icons';

interface TabProps {
  to: string;
  label: string;
  isActive: boolean;
  Icon: ComponentType<{ size?: number }>;
}

const TAB_BASE =
  'p-3 rounded-full transition-all duration-300 flex items-center justify-center';
const TAB_ACTIVE = 'bg-surface-bright text-primary scale-110';
const TAB_IDLE =
  'text-on-surface-variant hover:text-on-surface hover:scale-105';

function Tab({ to, label, isActive, Icon }: TabProps) {
  return (
    <Link
      to={to}
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
      className="relative flex flex-col items-center justify-center"
    >
      <div className={`${TAB_BASE} ${isActive ? TAB_ACTIVE : TAB_IDLE}`}>
        <Icon size={20} />
      </div>
    </Link>
  );
}

export function BottomNavigation() {
  const { pathname } = useLocation();

  const isLogActive = pathname === '/transactions/new' || pathname === '/log';

  return (
    <nav className="fixed bottom-6 left-1/2 z-50 max-w-[448px] -translate-x-1/2">
      <div className="glass-dark flex items-center justify-around gap-6 py-2 px-6 rounded-full border border-outline/15 shadow-2xl">
        <Tab
          to="/overview"
          label="Trang chủ"
          Icon={HomeIcon}
          isActive={pathname === '/overview'}
        />
        <Tab
          to="/transactions"
          label="Lịch sử"
          Icon={ReceiptIcon}
          isActive={pathname === '/transactions'}
        />

        {/* Center: quick log (raised) */}
        <Link
          to="/transactions/new"
          aria-label="Ghi chép"
          aria-current={isLogActive ? 'page' : undefined}
          className="relative flex flex-col items-center justify-center"
        >
          <div
            className={`p-3.5 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center bg-primary text-on-primary hover:scale-110 active:scale-95 ${
              isLogActive
                ? 'ring-4 ring-primary/30 scale-110 shadow-primary/50'
                : 'shadow-primary/30 hover:shadow-primary/50'
            }`}
          >
            <PlusIcon size={22} />
          </div>
        </Link>

        <Tab
          to="/profile"
          label="Cài đặt"
          Icon={GearIcon}
          isActive={
            pathname.startsWith('/profile') ||
            pathname.startsWith('/categories')
          }
        />
      </div>
    </nav>
  );
}
