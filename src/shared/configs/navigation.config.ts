import {
  ChartColumn,
  History,
  House,
  Plus,
  Target,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  /** The sage add button in the middle of the bar. */
  isAction?: boolean;
  isActive: (pathname: string) => boolean;
}

/** Five slots, left to right. Routes without a slot (History, Settings, …) show no active tab. */
export const NAV_ITEMS: NavItem[] = [
  {
    to: '/overview',
    label: 'Hôm nay',
    icon: House,
    isActive: (pathname) => pathname === '/overview',
  },
  {
    to: '/reflect',
    label: 'Nhìn lại',
    icon: History,
    isActive: (pathname) => pathname.startsWith('/reflect'),
  },
  {
    to: '/transactions/new',
    label: 'Ghi khoản chi',
    icon: Plus,
    isAction: true,
    isActive: (pathname) =>
      pathname === '/transactions/new' || pathname === '/log',
  },
  {
    to: '/leaks',
    label: 'Rò rỉ',
    icon: ChartColumn,
    isActive: (pathname) => pathname.startsWith('/leaks'),
  },
  {
    to: '/goals',
    label: 'Mục tiêu',
    icon: Target,
    isActive: (pathname) => pathname.startsWith('/goals'),
  },
];
