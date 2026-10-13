export type SheetsRunStatus = 'RUNNING' | 'SUCCESS' | 'FAILED';

/** Shape returned by GET /sync/google-sheets (inside the response envelope). */
export interface RawGoogleSheetsStatusModel {
  available: boolean;
  connected: boolean;
  syncEnabled: boolean;
  needsReconnect: boolean;
  googleEmail: string | null;
  spreadsheetUrl: string | null;
  lastRun: {
    status: SheetsRunStatus;
    trigger: 'CRON' | 'MANUAL' | 'CONNECT';
    startedAt: string;
    finishedAt: string | null;
    transactionCount: number;
    errorMessage: string | null;
  } | null;
}

export type SheetsRunTone = 'none' | 'running' | 'success' | 'error';

/** Status plus every display string and flag the UI needs, prepared in deserialize.ts. */
export interface GoogleSheetsStatusModel extends RawGoogleSheetsStatusModel {
  /** Toggle position: connected, enabled and healthy. */
  isEnabled: boolean;
  isRunning: boolean;
  canRunNow: boolean;
  showReconnect: boolean;
  accountText: string;
  runTone: SheetsRunTone;
  runBadgeClass: string;
  runBadgeLabel: string;
  runText: string;
}

export interface SheetsReturnMessageModel {
  tone: 'success' | 'error';
  text: string;
}
