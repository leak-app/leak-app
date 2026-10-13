/** Pages anyone can open without an account or a finished onboarding. */
export const PUBLIC_PATHS = {
  home: '/',
  privacy: '/privacy',
  terms: '/terms',
} as const;

const PUBLIC_PATH_LIST: readonly string[] = Object.values(PUBLIC_PATHS);

/** True for the public pages (landing, privacy policy, terms), tolerating a trailing slash. */
export function isPublicPath(pathname: string): boolean {
  const normalized =
    pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return PUBLIC_PATH_LIST.includes(normalized);
}
