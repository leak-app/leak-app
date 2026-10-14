import AddTransactionPage from '@/pages/add-transaction';
import BudgetPage from '@/pages/budget';
import BudgetSetupPage from '@/pages/budget-setup';
import CategoriesPage from '@/pages/categories';
import ForgotPassword from '@/pages/forgot-password';
import HomePage from '@/pages/home';
import Investment from '@/pages/investment';
import KitGallery from '@/pages/kit-gallery';
import LeakReportPage from '@/pages/leak-report';
import Login from '@/pages/login';
import OnboardingPage from '@/pages/onboarding';
import Overview from '@/pages/overview';
import PrivacyPage from '@/pages/privacy';
import Profile from '@/pages/profile';
import ProfileSecurity from '@/pages/profile-security';
import ProfileSheetsReport from '@/pages/profile-sheets-report';
import Reflect from '@/pages/reflect';
import Register from '@/pages/register';
import ResetPassword from '@/pages/reset-password';
import SavingsGoals from '@/pages/savings-goals';
import TermsPage from '@/pages/terms';
import Transaction from '@/pages/transaction';
import Wallet from '@/pages/wallet';
import { PUBLIC_PATHS, type RouteConfig } from '@/shared/routing';

export const routes: RouteConfig[] = [
  { path: PUBLIC_PATHS.home, Component: HomePage, protected: false },
  { path: PUBLIC_PATHS.privacy, Component: PrivacyPage, protected: false },
  { path: PUBLIC_PATHS.terms, Component: TermsPage, protected: false },
  { path: '/onboarding', Component: OnboardingPage, protected: false },
  { path: '/login', Component: Login, protected: false },
  { path: '/register', Component: Register, protected: false },
  { path: '/forgot-password', Component: ForgotPassword, protected: false },
  { path: '/reset-password', Component: ResetPassword, protected: false },
  { path: '/overview', Component: Overview, protected: true },
  { path: '/transactions', Component: Transaction, protected: true },
  { path: '/transactions/new', Component: AddTransactionPage, protected: true },
  { path: '/log', Component: AddTransactionPage, protected: true },
  { path: '/categories', Component: CategoriesPage, protected: true },
  { path: '/budgets', Component: BudgetPage, protected: true },
  { path: '/budgets/setup', Component: BudgetSetupPage, protected: true },
  { path: '/wallets', Component: Wallet, protected: true },
  { path: '/goals', Component: SavingsGoals, protected: true },
  { path: '/leaks', Component: LeakReportPage, protected: true },
  { path: '/reflect', Component: Reflect, protected: true },
  { path: '/investment', Component: Investment, protected: true },
  { path: '/profile', Component: Profile, protected: true },
  { path: '/profile/security', Component: ProfileSecurity, protected: true },
  {
    path: '/profile/sheets-report',
    Component: ProfileSheetsReport,
    protected: true,
  },

  // Development only: every kit component in its states.
  ...(import.meta.env.DEV
    ? [{ path: '/dev/kit', Component: KitGallery, protected: false }]
    : []),

  // Legacy paths (kept for bookmarks); the query string is preserved.
  { path: '/transaction', redirectTo: '/transactions', protected: true },
  {
    path: '/transaction/add',
    redirectTo: '/transactions/new',
    protected: true,
  },
  { path: '/budget', redirectTo: '/budgets', protected: true },
  { path: '/budget/setup', redirectTo: '/budgets/setup', protected: true },
  { path: '/wallet', redirectTo: '/wallets', protected: true },
  { path: '/savings-goals', redirectTo: '/goals', protected: true },
];
