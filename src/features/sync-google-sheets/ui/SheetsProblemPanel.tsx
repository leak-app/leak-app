import { AlertTriangleIcon, ICON } from '@/shared/icons';
import { Button, buttonStyles, Card } from '@/shared/ui';

import { SHEETS_SYNC_COPY as COPY } from '../model/content';
import type { GoogleSheetsStatusModel } from '../model/types';

interface SheetsProblemPanelProps {
  status: GoogleSheetsStatusModel;
  actionLoading: boolean;
  disabled: boolean;
  onAction: () => void;
}

/** Access lost or the last run failed: say what happened, then one way to fix it. */
export function SheetsProblemPanel({
  status,
  actionLoading,
  disabled,
  onAction,
}: SheetsProblemPanelProps) {
  return (
    <Card
      as="section"
      variant="danger"
      role="alert"
      className="flex flex-col gap-4"
    >
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-danger/16 text-danger">
          <AlertTriangleIcon
            size={17}
            strokeWidth={ICON.stroke.active}
            aria-hidden="true"
          />
        </span>
        <span className="text-label font-semibold text-danger">
          {status.problemKicker}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-section-title text-text">{status.problemTitle}</p>
        <p className="text-description text-muted">{status.problemBody}</p>
      </div>

      <div className="flex flex-wrap gap-2.5">
        <Button
          className="flex-auto whitespace-nowrap"
          loading={actionLoading}
          disabled={disabled}
          onClick={onAction}
        >
          {status.problemActionLabel}
        </Button>
        {status.spreadsheetUrl && (
          <a
            href={status.spreadsheetUrl}
            target="_blank"
            rel="noreferrer"
            className={
              buttonStyles({ variant: 'secondary' }) +
              ' flex-auto whitespace-nowrap'
            }
          >
            {COPY.openSheet}
          </a>
        )}
      </div>
    </Card>
  );
}
