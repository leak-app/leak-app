import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { AlertTriangleIcon, CheckIcon, ICON, XMarkIcon } from '@/shared/icons';
import { Button } from '@/shared/ui';

import {
  GOOGLE_SHEETS_STATUS_KEY,
  useConnectGoogleSheets,
} from '../api/sheetsSync.api';
import { parseSheetsReturn } from '../lib/deserialize';
import { SHEETS_SYNC_COPY } from '../model/content';

/** Shows the result of the Google consent round-trip (?sheets=connected | error) until dismissed. */
export function SheetsReturnAlert() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const connect = useConnectGoogleSheets();
  const message = useMemo(
    () => parseSheetsReturn(searchParams.toString()),
    [searchParams]
  );

  // Coming back from Google: the connection and the first run are new, so refetch the status.
  useEffect(() => {
    if (message) {
      queryClient.invalidateQueries({ queryKey: GOOGLE_SHEETS_STATUS_KEY });
    }
  }, [message, queryClient]);

  if (!message) return null;

  const dismiss = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('sheets');
    next.delete('reason');
    setSearchParams(next, { replace: true });
  };

  if (message.tone === 'success') {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-choice border border-primary/30 bg-primary/10 py-3.5 pr-2 pl-4"
      >
        <span className="mt-px flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
          <CheckIcon
            size={14}
            strokeWidth={2.6}
            aria-hidden="true"
          />
        </span>
        <span className="flex-1 text-description text-text">
          {message.text}
        </span>
        <button
          type="button"
          aria-label={SHEETS_SYNC_COPY.dismiss}
          onClick={dismiss}
          className="-my-2.5 flex size-touch shrink-0 items-center justify-center rounded-full text-muted hover:text-text focus-visible:shadow-focus focus-visible:outline-none"
        >
          <XMarkIcon
            size={18}
            strokeWidth={ICON.stroke.active}
            aria-hidden="true"
          />
        </button>
      </div>
    );
  }

  return (
    <div
      role="alert"
      className="flex flex-col gap-4 rounded-card border border-danger/30 bg-danger/7 p-5"
    >
      <div className="flex items-start gap-2.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-danger/16 text-danger">
          <AlertTriangleIcon
            size={17}
            strokeWidth={ICON.stroke.active}
            aria-hidden="true"
          />
        </span>
        <p className="pt-1 text-description text-text">{message.text}</p>
      </div>
      <div className="flex gap-2.5">
        <Button
          className="flex-1"
          loading={connect.isPending}
          onClick={() => connect.mutate()}
        >
          {SHEETS_SYNC_COPY.retry}
        </Button>
        <Button
          variant="ghost"
          disabled={connect.isPending}
          onClick={dismiss}
        >
          {SHEETS_SYNC_COPY.later}
        </Button>
      </div>
    </div>
  );
}
