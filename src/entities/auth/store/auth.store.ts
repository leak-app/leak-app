import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  name?: string;
}

interface DecodedToken {
  sub: string;
  email: string;
  name?: string;
  exp: number;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isReady: boolean;
  setAccessToken: (token: string | null) => void;
  setReady: (isReady: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isReady: false,

  setAccessToken: (token) => {
    if (!token) {
      set({ accessToken: null, user: null });
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      set({
        accessToken: token,
        user: {
          id: decoded.sub,
          email: decoded.email,
          name: decoded.name,
        },
      });
    } catch (error) {
      console.error('Failed to decode JWT token', error);
      set({ accessToken: null, user: null });
    }
  },

  setReady: (isReady) => set({ isReady }),

  logout: () => {
    set({ accessToken: null, user: null });
  },
}));
