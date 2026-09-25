/** Shape returned by GET /auth/sessions. */
export interface RawSessionModel {
  id: number;
  userAgent: string | null;
  ipAddress: string | null; // already masked by the API
  lastActiveAt: string;
  expiresAt: string;
  isCurrent: boolean;
}

export interface SessionModel extends RawSessionModel {
  // Added for UI (see lib/deserialize.ts)
  deviceText: string;
  ipText: string;
  lastActiveText: string;
  icon: 'smartphone' | 'monitor';
}
