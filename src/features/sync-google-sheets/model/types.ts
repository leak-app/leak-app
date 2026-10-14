export type SheetsRunStatus = 'RUNNING' | 'SUCCESS' | 'FAILED';
export type SheetsRunTrigger = 'CRON' | 'MANUAL' | 'CONNECT';

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
    trigger: SheetsRunTrigger;
    startedAt: string;
    finishedAt: string | null;
    transactionCount: number;
    errorMessage: string | null;
  } | null;
}

/** Which panel the card shows: the pitch, a live run, a problem, or the calm status. */
export type SheetsPanel = 'connect' | 'running' | 'problem' | 'status';

/** What the problem panel's primary button does. */
export type SheetsProblemAction = 'reconnect' | 'retry';

/** Status plus every display string and flag the UI needs, prepared in deserialize.ts. */
export interface GoogleSheetsStatusModel extends RawGoogleSheetsStatusModel {
  /** Toggle position: connected, enabled and healthy. */
  isEnabled: boolean;
  isRunning: boolean;
  canRunNow: boolean;
  panel: SheetsPanel;
  accountEmail: string;

  /** The "auto sync" row. */
  switchNote: string;
  switchDisabled: boolean;
  showReports: boolean;

  /** Status panel. */
  badgeLabel: string;
  badgeTextClass: string;
  badgeDotClass: string;
  headline: string;
  subline: string;
  nextRunLabel: string;
  nextRunValue: string;

  /** Running panel. */
  runningKicker: string;
  runningNote: string;

  /** Problem panel. */
  problemAction: SheetsProblemAction;
  problemActionLabel: string;
  problemKicker: string;
  problemTitle: string;
  problemBody: string;
}

export interface SheetsReturnMessageModel {
  tone: 'success' | 'error';
  text: string;
}
