import { useAuthStore, type User } from '@/entities/auth';
import { apiClient } from '@/shared/api';
import { createContext, useContext, useEffect, type ReactNode } from 'react';

export type { User };

interface AuthContextType {
  user: User | null;
  isReady: boolean;
}

interface RefreshResponse {
  success: boolean;
  data: {
    accessToken: string;
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, isReady, setAccessToken, setReady } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await apiClient.post<any, RefreshResponse>(
          '/auth/refresh-token'
        );
        if (response && response.success && response.data?.accessToken) {
          setAccessToken(response.data.accessToken);
        } else {
          setAccessToken(null);
        }
      } catch (error) {
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
