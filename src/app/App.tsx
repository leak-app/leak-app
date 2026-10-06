import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  AuthProvider,
  GoogleAccessTokenProvider,
  QueryProvider,
} from '@/app/providers';
import { routes } from '@/app/routes';
import { wrapWithProtected } from '@/entities/auth';
import { GoogleOAuthProvider } from '@/features/auth-with-google';
import { OnboardingGuard } from '@/features/onboarding';
import { appConfig } from '@/shared/configs/runtime.config';
import { RedirectWithSearch } from '@/shared/routing';

const googleClientId = appConfig.googleClientId;

export default function App() {
  const routing = (
    <BrowserRouter>
      <OnboardingGuard>
        <Routes>
          {routes.map((route) => {
            const element =
              'redirectTo' in route ? (
                <RedirectWithSearch to={route.redirectTo} />
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
      </OnboardingGuard>
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
