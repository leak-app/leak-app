import AddTransactionPage from '@/pages/add-transaction';
import CategoriesPage from '@/pages/categories';
import Investment from '@/pages/investment';
import Login from '@/pages/login';
import Overview from '@/pages/overview';
import Profile from '@/pages/profile';
import SavingsGoals from '@/pages/savings-goals';
import Transaction from '@/pages/transaction';
import Wallet from '@/pages/wallet';
import type { RouteConfig } from '@/shared/routing';

export const routes: RouteConfig[] = [
  { path: '/', redirectTo: '/overview', protected: true },
  { path: '/login', Component: Login, protected: false },
  { path: '/overview', Component: Overview, protected: true },
  { path: '/wallet', Component: Wallet, protected: true },
  { path: '/transaction', Component: Transaction, protected: true },
  { path: '/transaction/add', Component: AddTransactionPage, protected: true },
  { path: '/categories', Component: CategoriesPage, protected: true },
  { path: '/investment', Component: Investment, protected: true },
  { path: '/savings-goals', Component: SavingsGoals, protected: true },
  { path: '/profile', Component: Profile, protected: true },
];
