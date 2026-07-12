import { Navigate } from 'react-router-dom';

import { useAuth } from '@/app/providers';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isReady } = useAuth();

  if (!isReady) {
    return null;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }
  return <>{children}</>;
}

export function wrapWithProtected(
  element: React.ReactNode,
  isProtected?: boolean
): React.ReactNode {
  if (isProtected !== false) {
    return <ProtectedRoute>{element}</ProtectedRoute>;
  }

  return element;
}
