import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import {
  AuthProvider,
  GoogleAccessTokenProvider,
  QueryProvider,
} from '@/app/providers';
import { routes } from '@/app/routes';
import { wrapWithProtected } from '@/entities/auth';
import { GoogleOAuthProvider } from '@/features/auth-with-google';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? '';

export default function App() {
  const routing = (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
          const element =
            'redirectTo' in route ? (
              <Navigate
                to={route.redirectTo}
                replace
              />
            ) : (
              <route.Component />
            );

          return (
            <Route
              key={route.path}
              path={route.path}
              element={wrapWithProtected(element, route.protected)}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );

  return (
    <QueryProvider>
      <AuthProvider>
        <GoogleOAuthProvider
          clientId={googleClientId}
          locale="vi"
        >
          <GoogleAccessTokenProvider>{routing}</GoogleAccessTokenProvider>
        </GoogleOAuthProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
