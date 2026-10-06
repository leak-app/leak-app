interface RuntimeConfig {
  apiBaseUrl?: string;
  googleClientId?: string;
}

declare global {
  interface Window {
    __APP_CONFIG__?: RuntimeConfig;
  }
}

// Container deployments inject values at start-up through /env.js; local dev
// falls back to Vite's build-time VITE_* variables.
const runtime = window.__APP_CONFIG__ ?? {};

export const appConfig = {
  apiBaseUrl:
    runtime.apiBaseUrl ||
    import.meta.env.VITE_BASE_API_URL ||
    'http://localhost:3000/api',
  googleClientId:
    runtime.googleClientId || import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
};
