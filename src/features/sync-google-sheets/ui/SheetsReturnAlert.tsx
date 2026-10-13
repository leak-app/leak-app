import { useQueryClient } from '@tanstack/react-query';
import { clsx } from 'clsx';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { GOOGLE_SHEETS_STATUS_KEY } from '../api/sheetsSync.api';
import { parseSheetsReturn } from '../lib/deserialize';
import { SHEETS_SYNC_COPY } from '../model/content';

/** Shows the result of the Google consent round-trip (?sheets=connected | error) until dismissed. */
export function SheetsReturnAlert() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
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

  return (
    <div
      role="alert"
      className={clsx(
        'alert alert-vertical sm:alert-horizontal alert-soft text-sm',
        message.tone === 'success' ? 'alert-success' : 'alert-error'
      )}
    >
      <span>{message.text}</span>
      <button
        type="button"
        className="btn btn-sm min-h-11"
        onClick={dismiss}
      >
        {SHEETS_SYNC_COPY.dismiss}
      </button>
    </div>
  );
}
