import { DollarIcon, HomeIcon, ReceiptIcon, WalletIcon } from '../icons';

export interface NavigationType {
  path: string;
  label: string;
  Icon: (props: any) => React.JSX.Element;
}

export const NAVIGATION_CONFIG: NavigationType[] = [
  { path: '/overview', label: 'Trang chủ', Icon: HomeIcon },
  { path: '/transactions', label: 'Lịch sử', Icon: ReceiptIcon },
  { path: '/transactions/new', label: 'Ghi chép', Icon: DollarIcon },
  { path: '/profile', label: 'Cài đặt', Icon: WalletIcon },
];
