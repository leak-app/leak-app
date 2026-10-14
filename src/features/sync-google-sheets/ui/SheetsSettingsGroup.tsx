import { Link } from 'react-router-dom';

import { ChevronRightIcon, ICON } from '@/shared/icons';
import { Switch } from '@/shared/ui';

import { SHEETS_SYNC_COPY as COPY, SHEETS_REPORT_PATH } from '../model/content';
import type { GoogleSheetsStatusModel } from '../model/types';

const ROW_CLASS = 'flex min-h-16 items-center gap-3';
const DIVIDED_ROW_CLASS = `${ROW_CLASS} border-t border-border-subtle`;

interface SheetsSettingsGroupProps {
  status: GoogleSheetsStatusModel;
  disabled: boolean;
  onToggle: (enabled: boolean) => void;
}

/** Auto-sync switch, the connected account, and the way to the optional report guide. */
export function SheetsSettingsGroup({
  status,
  disabled,
  onToggle,
}: SheetsSettingsGroupProps) {
  return (
    <section
      aria-label="Cài đặt đồng bộ"
      className="flex flex-col rounded-card border border-border bg-surface px-5 py-1"
    >
      <div className={ROW_CLASS}>
        <div className="flex flex-1 flex-col gap-0.5">
          <span
            id="sheets-auto-sync-label"
            className="text-body text-text"
          >
            {COPY.autoSync}
          </span>
          <span className="text-caption text-muted">{status.switchNote}</span>
        </div>
        <Switch
          checked={status.isEnabled}
          disabled={disabled || status.switchDisabled}
          aria-labelledby="sheets-auto-sync-label"
          onCheckedChange={onToggle}
        />
      </div>

      <div className={DIVIDED_ROW_CLASS}>
        <div className="flex flex-1 flex-col gap-0.5">
          <span className="text-body text-text">{COPY.account}</span>
          <span className="text-caption break-all text-muted">
            {status.accountEmail}
          </span>
        </div>
      </div>

      {status.showReports && (
        <Link
          to={SHEETS_REPORT_PATH}
          className={`${DIVIDED_ROW_CLASS} text-text`}
        >
          <div className="flex flex-1 flex-col gap-0.5">
            <span className="text-body">{COPY.reports}</span>
            <span className="text-caption text-muted">{COPY.reportsNote}</span>
          </div>
          <ChevronRightIcon
            size={ICON.size.row}
            strokeWidth={ICON.stroke.active}
            className="shrink-0 text-muted"
            aria-hidden="true"
          />
        </Link>
      )}
    </section>
  );
}
