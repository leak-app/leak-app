import { formatRelativeDateTime } from '@/shared/lib';

import type { RawSessionModel, SessionModel } from '../model/types';
import { parseUserAgent } from './parseUserAgent';

export function deviceText(ua: string | null): string {
  const { browser, os } = parseUserAgent(ua);
  if (browser && os) return `${browser} trên ${os}`;
  return browser ?? os ?? 'Thiết bị không xác định';
}

export function deserializeSession(raw: RawSessionModel): SessionModel {
  return {
    ...raw,
    deviceText: deviceText(raw.userAgent),
    ipText: raw.ipAddress ? `IP ${raw.ipAddress}` : 'IP không xác định',
    lastActiveText: `Hoạt động gần nhất: ${formatRelativeDateTime(raw.lastActiveAt)}`,
    icon: parseUserAgent(raw.userAgent).isMobile ? 'smartphone' : 'monitor',
  };
}
