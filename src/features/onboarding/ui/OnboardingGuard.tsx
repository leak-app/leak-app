import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useOnboardingStore } from '../model';

interface OnboardingGuardProps {
  children: ReactNode;
}

export function OnboardingGuard({ children }: OnboardingGuardProps) {
  const location = useLocation();
  const isCompleted = useOnboardingStore((s) => s.isCompleted);
  const hasHydrated = useOnboardingStore((s) => s.hasHydrated);

  // Defer redirect until store hydrates from localStorage to prevent flash
  if (!hasHydrated) {
    return null;
  }

  // Development tools such as the kit gallery (/dev/kit) skip onboarding.
  if (import.meta.env.DEV && location.pathname.startsWith('/dev/')) {
    return <>{children}</>;
  }

  const isOnboardingRoute = location.pathname === '/onboarding';

  if (!isCompleted && !isOnboardingRoute) {
    return (
      <Navigate
        to="/onboarding"
        replace
      />
    );
  }

  if (isCompleted && isOnboardingRoute) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <>{children}</>;
}
