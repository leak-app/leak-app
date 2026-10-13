import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

import App from './app/App.tsx';
import './app/styles/index.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The public pages ship pre-rendered (see scripts/prerender.mjs): hydrate them only
// when the markup belongs to the current URL, and render from scratch otherwise.
const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';

if (container.dataset.prerendered === currentPath) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
