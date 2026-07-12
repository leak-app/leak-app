import { createContext, useContext, useState, type ReactNode } from 'react';

interface GoogleAccessTokenContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

const GoogleAccessTokenContext = createContext<
  GoogleAccessTokenContextType | undefined
>(undefined);

export function GoogleAccessTokenProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);

  return (
    <GoogleAccessTokenContext.Provider value={{ token, setToken }}>
      {children}
    </GoogleAccessTokenContext.Provider>
  );
}

export function useGoogleAccessToken() {
  const context = useContext(GoogleAccessTokenContext);
  if (context === undefined) {
    throw new Error(
      'useGoogleAccessToken must be used within a GoogleAccessTokenProvider'
    );
  }
  return context;
}
