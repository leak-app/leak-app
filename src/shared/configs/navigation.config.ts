import { DollarIcon, HomeIcon, ReceiptIcon, WalletIcon } from '../icons';

export interface NavigationType {
  path: string;
  label: string;
  Icon: (props: any) => React.JSX.Element;
}

export const NAVIGATION_CONFIG: NavigationType[] = [
  { path: '/overview', label: 'Overview', Icon: HomeIcon },
  { path: '/wallet', label: 'Wallet', Icon: WalletIcon },
  { path: '/transaction', label: 'Swap', Icon: ReceiptIcon },
  { path: '/savings-goals', label: 'Savings', Icon: DollarIcon },
];
