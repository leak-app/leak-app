import { clsx } from 'clsx';
import { Link, useLocation } from 'react-router-dom';

import { NAV_ITEMS, type NavItem } from '@/shared/configs/navigation.config';
import { ICON } from '@/shared/icons';

const FOCUS = 'focus-visible:shadow-focus focus-visible:outline-none';

function Tab({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;

  return (
    <Link
      to={item.to}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'flex h-13 w-15 flex-col items-center justify-center gap-1 rounded-full text-tab transition-colors duration-200 ease-out',
        FOCUS,
        active
          ? 'font-semibold text-primary'
          : 'font-medium text-muted hover:text-text'
      )}
    >
      <Icon
        size={ICON.size.ui}
        strokeWidth={active ? ICON.stroke.active : ICON.stroke.idle}
        aria-hidden="true"
      />
      {item.label}
    </Link>
  );
}

function AddButton({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;

  return (
    <Link
      to={item.to}
      aria-label={item.label}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'flex size-nav-action items-center justify-center rounded-full bg-primary text-on-primary transition-[filter] duration-200 ease-out hover:brightness-110',
        FOCUS
      )}
    >
      <Icon
        size={22}
        strokeWidth={ICON.stroke.onPrimary}
        aria-hidden="true"
      />
    </Link>
  );
}

/** The floating pill: the only glass-with-blur element in the app. */
export function BottomNavigation() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Điều hướng chính"
      className="pointer-events-none fixed inset-x-0 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-50 mx-auto w-full max-w-120 px-4"
    >
      <div className="pointer-events-auto flex h-nav items-center justify-between rounded-full border border-border bg-glass px-2.5 shadow-nav [-webkit-backdrop-filter:var(--glass-blur)] [backdrop-filter:var(--glass-blur)]">
        {NAV_ITEMS.map((item) =>
          item.isAction ? (
            <AddButton
              key={item.to}
              item={item}
              active={item.isActive(pathname)}
            />
          ) : (
            <Tab
              key={item.to}
              item={item}
              active={item.isActive(pathname)}
            />
          )
        )}
      </div>
    </nav>
  );
}
