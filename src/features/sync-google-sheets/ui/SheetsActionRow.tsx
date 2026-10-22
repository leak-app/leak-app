import { ExternalLinkIcon, ICON, RefreshIcon } from '@/shared/icons';
import { Button, buttonStyles } from '@/shared/ui';

import { SHEETS_SYNC_COPY as COPY } from '../model/content';

interface SheetsActionRowProps {
  canRun: boolean;
  runLoading: boolean;
  spreadsheetUrl: string | null;
  onRun: () => void;
}

/** "Đồng bộ ngay" and "Mở bảng tính": side by side when they fit, stacked on a narrow phone. */
export function SheetsActionRow({
  canRun,
  runLoading,
  spreadsheetUrl,
  onRun,
}: SheetsActionRowProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      <Button
        className="flex-auto whitespace-nowrap"
        loading={runLoading}
        disabled={!canRun}
        onClick={onRun}
        leadingIcon={
          <RefreshIcon
            size={ICON.size.row}
            strokeWidth={ICON.stroke.onPrimary}
            aria-hidden="true"
          />
        }
      >
        {COPY.runNow}
      </Button>
      {spreadsheetUrl && (
        <a
          href={spreadsheetUrl}
          target="_blank"
          rel="noreferrer"
          className={
            buttonStyles({ variant: 'secondary' }) +
            ' flex-auto whitespace-nowrap'
          }
        >
          {COPY.openSheet}
          <ExternalLinkIcon
            size={16}
            strokeWidth={ICON.stroke.active}
            aria-hidden="true"
          />
        </a>
      )}
    </div>
  );
}
