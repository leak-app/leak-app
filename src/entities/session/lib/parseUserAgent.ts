export interface ParsedUserAgent {
  browser: string | null;
  os: string | null;
  isMobile: boolean;
}

// Order matters: Edge and Cốc Cốc also contain "Chrome"; Chrome contains "Safari".
const BROWSERS: [RegExp, string][] = [
  [/Zalo/i, 'Zalo'],
  [/coc_coc_browser/i, 'Cốc Cốc'],
  [/Edg\//, 'Edge'],
  [/Firefox\/|FxiOS/, 'Firefox'],
  [/Chrome\/|CriOS/, 'Chrome'],
  [/Safari\//, 'Safari'],
];

const OSES: [RegExp, string][] = [
  [/iPhone|iPad|iPod/, 'iOS'],
  [/Android/, 'Android'],
  [/Mac OS X|Macintosh/, 'macOS'],
  [/Windows/, 'Windows'],
  [/Linux/, 'Linux'],
];

export function parseUserAgent(ua: string | null): ParsedUserAgent {
  if (!ua) return { browser: null, os: null, isMobile: false };
  const browser = BROWSERS.find(([re]) => re.test(ua))?.[1] ?? null;
  const os = OSES.find(([re]) => re.test(ua))?.[1] ?? null;
  return { browser, os, isMobile: /Mobi|iPhone|iPad|Android/.test(ua) };
}
