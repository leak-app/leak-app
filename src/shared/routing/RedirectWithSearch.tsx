import { Navigate, useLocation } from 'react-router-dom';

/** Redirects to `to`, keeping the current query string (e.g. ?month=9). */
export function RedirectWithSearch({ to }: { to: string }) {
  const { search } = useLocation();
  return (
    <Navigate
      to={`${to}${search}`}
      replace
    />
  );
}
