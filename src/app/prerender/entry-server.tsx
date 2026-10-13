import type { ComponentType } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import HomePage, { HOME_PAGE_DESCRIPTION, HOME_PAGE_TITLE } from '@/pages/home';
import PrivacyPage, {
  PRIVACY_PAGE_DESCRIPTION,
  PRIVACY_PAGE_TITLE,
} from '@/pages/privacy';
import TermsPage, {
  TERMS_PAGE_DESCRIPTION,
  TERMS_PAGE_TITLE,
} from '@/pages/terms';
import { APP_URL } from '@/shared/configs/app-info.config';
import { PUBLIC_PATHS } from '@/shared/routing';

interface PrerenderedPage {
  path: string;
  Component: ComponentType;
  title: string;
  description: string;
}

const PAGES: PrerenderedPage[] = [
  {
    path: PUBLIC_PATHS.home,
    Component: HomePage,
    title: HOME_PAGE_TITLE,
    description: HOME_PAGE_DESCRIPTION,
  },
  {
    path: PUBLIC_PATHS.privacy,
    Component: PrivacyPage,
    title: PRIVACY_PAGE_TITLE,
    description: PRIVACY_PAGE_DESCRIPTION,
  },
  {
    path: PUBLIC_PATHS.terms,
    Component: TermsPage,
    title: TERMS_PAGE_TITLE,
    description: TERMS_PAGE_DESCRIPTION,
  },
];

export interface PrerenderResult {
  path: string;
  html: string;
  title: string;
  description: string;
  canonicalUrl: string;
}

/** Renders the public pages (home, privacy, terms) to static HTML at build time. */
export function prerenderPublicPages(): PrerenderResult[] {
  return PAGES.map(({ path, Component, title, description }) => ({
    path,
    title,
    description,
    canonicalUrl: `${APP_URL}${path === '/' ? '/' : path}`,
    html: renderToString(
      <StaticRouter location={path}>
        <Component />
      </StaticRouter>
    ),
  }));
}
