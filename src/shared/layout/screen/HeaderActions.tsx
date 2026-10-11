import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { ICON } from '@/shared/icons';

/** The 44px glass circle shared by the back button and header icon buttons. */
export const HEADER_CIRCLE_CLASS =
  'flex size-touch shrink-0 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors duration-200 ease-out hover:text-text focus-visible:shadow-focus focus-visible:outline-none';

interface HeaderIconButtonProps {
  icon: LucideIcon;
  /** Spoken label; the button shows only the icon. */
  label: string;
  /** Navigates when set, otherwise renders a button that calls `onClick`. */
  to?: string;
  onClick?: () => void;
}

/** A glass circle with one icon, for the right side of a screen header. */
export function HeaderIconButton({
  icon: Icon,
  label,
  to,
  onClick,
}: HeaderIconButtonProps) {
  const icon = (
    <Icon
      size={ICON.size.ui}
      strokeWidth={ICON.stroke.idle}
      aria-hidden="true"
    />
  );

  if (to) {
    return (
      <Link
        to={to}
        aria-label={label}
        className={HEADER_CIRCLE_CLASS}
      >
        {icon}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={HEADER_CIRCLE_CLASS}
    >
      {icon}
    </button>
  );
}

interface HeaderPillProps {
  children: ReactNode;
  onClick?: () => void;
}

/** A small glass pill for a text action in a header, for example "Thêm ví". */
export function HeaderPill({ children, onClick }: HeaderPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      // The pill is 36px tall as designed; the pseudo-element extends the hit area to 44px.
      className="relative inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 text-label text-soft transition-colors duration-200 ease-out before:absolute before:inset-x-0 before:-inset-y-1 before:content-[''] hover:text-text focus-visible:shadow-focus focus-visible:outline-none"
    >
      {children}
    </button>
  );
}
