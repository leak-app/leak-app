import { useAuthStore, type UserModel } from '@/entities/auth';
import { apiClient, type BaseResponseModel } from '@/shared/api';
import { createContext, useContext, useEffect, type ReactNode } from 'react';

export type { UserModel };

interface AuthContextType {
  user: UserModel | null;
  isReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, isReady, setAccessToken, setReady } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await apiClient
          .post<BaseResponseModel<{ accessToken: string }>>(
            '/auth/refresh-token'
          )
          .then((res) => res.data);
        if (response && response.success && response.data?.accessToken) {
          setAccessToken(response.data.accessToken);
        } else {
          setAccessToken(null);
        }
      } catch {
        console.log('No active session or failed to refresh token on mount');
        setAccessToken(null);
      } finally {
        setReady(true);
      }
    };

    initAuth();
  }, [setAccessToken, setReady]);

  return (
    <AuthContext.Provider value={{ user, isReady }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
