import { ExternalLinkIcon, ICON, RefreshIcon } from '@/shared/icons';
import { Button, buttonStyles } from '@/shared/ui';

import { SHEETS_SYNC_COPY as COPY } from '../model/content';

interface SheetsActionRowProps {
  canRun: boolean;
  runLoading: boolean;
  spreadsheetUrl: string | null;
  onRun: () => void;
}

/** "Đồng bộ ngay" and "Mở bảng tính", side by side. */
export function SheetsActionRow({
  canRun,
  runLoading,
  spreadsheetUrl,
  onRun,
}: SheetsActionRowProps) {
  return (
    <div className="flex gap-2.5">
      <Button
        className="flex-1"
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
          className={buttonStyles({ variant: 'secondary' }) + ' flex-1'}
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
