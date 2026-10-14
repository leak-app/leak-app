import { ICON, MoonIcon } from '@/shared/icons';
import { Card } from '@/shared/ui';

import type { GoogleSheetsStatusModel } from '../model/types';
import { SheetsActionRow } from './SheetsActionRow';

interface SheetsStatusPanelProps {
  status: GoogleSheetsStatusModel;
  runLoading: boolean;
  disabled: boolean;
  onRun: () => void;
}

/** Connected and calm: when it last synced, when it syncs next, and the two everyday actions. */
export function SheetsStatusPanel({
  status,
  runLoading,
  disabled,
  onRun,
}: SheetsStatusPanelProps) {
  return (
    <Card
      as="section"
      aria-label="Trạng thái đồng bộ"
      className="flex flex-col gap-4.5"
    >
      <div className="flex flex-col gap-1.5">
        <span
          className={`flex items-center gap-2 text-label font-semibold ${status.badgeTextClass}`}
        >
          <span
            className={`size-1.5 rounded-full ${status.badgeDotClass}`}
            aria-hidden="true"
          />
          {status.badgeLabel}
        </span>
        <div className="text-3xl leading-[1.15] font-light tracking-[-0.02em] text-text">
          {status.headline}
        </div>
        <span className="text-sm text-muted">{status.subline}</span>
      </div>

      <div className="flex items-center gap-2.5 rounded-[1.125rem] bg-white/4 px-3.5 py-3">
        <MoonIcon
          size={ICON.size.row}
          strokeWidth={ICON.stroke.idle}
          className="shrink-0 text-secondary"
          aria-hidden="true"
        />
        <span className="text-description text-soft">
          {status.nextRunLabel}{' '}
          <span className="font-medium text-text">{status.nextRunValue}</span>
        </span>
      </div>

      <SheetsActionRow
        canRun={status.canRunNow && !disabled}
        runLoading={runLoading}
        spreadsheetUrl={status.spreadsheetUrl}
        onRun={onRun}
      />
    </Card>
  );
}
