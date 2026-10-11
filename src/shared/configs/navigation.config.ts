import {
  ChartColumnIcon,
  HistoryIcon,
  HouseIcon,
  PlusIcon,
  TargetIcon,
  type IconComponent,
} from '@/shared/icons';

export interface NavItem {
  to: string;
  label: string;
  icon: IconComponent;
  /** The sage add button in the middle of the bar. */
  isAction?: boolean;
  isActive: (pathname: string) => boolean;
}

/** Five slots, left to right. Routes without a slot (History, Settings, …) show no active tab. */
export const NAV_ITEMS: NavItem[] = [
  {
    to: '/overview',
    label: 'Hôm nay',
    icon: HouseIcon,
    isActive: (pathname) => pathname === '/overview',
  },
  {
    to: '/reflect',
    label: 'Nhìn lại',
    icon: HistoryIcon,
    isActive: (pathname) => pathname.startsWith('/reflect'),
  },
  {
    to: '/transactions/new',
    label: 'Ghi khoản chi',
    icon: PlusIcon,
    isAction: true,
    isActive: (pathname) =>
      pathname === '/transactions/new' || pathname === '/log',
  },
  {
    to: '/leaks',
    label: 'Rò rỉ',
    icon: ChartColumnIcon,
    isActive: (pathname) => pathname.startsWith('/leaks'),
  },
  {
    to: '/goals',
    label: 'Mục tiêu',
    icon: TargetIcon,
    isActive: (pathname) => pathname.startsWith('/goals'),
  },
];
