import { Card } from '@/shared/ui';

import { SHEETS_SYNC_COPY as COPY } from '../model/content';
import type { GoogleSheetsStatusModel } from '../model/types';
import { SheetsActionRow } from './SheetsActionRow';

interface SheetsRunningPanelProps {
  status: GoogleSheetsStatusModel;
}

/** A sync is in progress (first run after connecting, or started elsewhere). */
export function SheetsRunningPanel({ status }: SheetsRunningPanelProps) {
  return (
    <Card
      as="section"
      aria-live="polite"
      className="flex flex-col gap-4.5"
    >
      <div className="flex flex-col gap-1.5">
        <span className="flex items-center gap-2 text-label font-semibold text-secondary">
          <span
            className="size-1.5 rounded-full bg-secondary"
            aria-hidden="true"
          />
          {status.runningKicker}
        </span>
        <div className="text-3xl leading-[1.15] font-light tracking-[-0.02em] text-text">
          {COPY.runningHeadline}
        </div>
      </div>

      <div
        className="h-1.5 overflow-hidden rounded-full bg-track"
        aria-hidden="true"
      >
        <div className="h-1.5 w-[38%] animate-sheets-flow rounded-full bg-primary motion-reduce:translate-x-[60%] motion-reduce:animate-none" />
      </div>

      <p className="text-description text-muted">{status.runningNote}</p>

      <SheetsActionRow
        canRun={false}
        runLoading={false}
        spreadsheetUrl={status.spreadsheetUrl}
        onRun={() => undefined}
      />
    </Card>
  );
}
