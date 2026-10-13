import { useState } from 'react';
import { Link } from 'react-router-dom';

import { getApiErrorMessage } from '@/shared/api';
import { Button, buttonStyles, Card } from '@/shared/ui';

import {
  useConnectGoogleSheets,
  useDisconnectGoogleSheets,
  useGoogleSheetsStatus,
  useRunGoogleSheetsSync,
  useSetGoogleSheetsSync,
} from '../api/sheetsSync.api';
import { SHEETS_SYNC_COPY as COPY } from '../model/content';
import { ReportScriptSection } from './ReportScriptSection';

export function GoogleSheetsSyncCard() {
  const { data: status, isLoading, isError, refetch } = useGoogleSheetsStatus();
  const connect = useConnectGoogleSheets();
  const setSync = useSetGoogleSheetsSync();
  const run = useRunGoogleSheetsSync();
  const disconnect = useDisconnectGoogleSheets();
  const [confirmingDisconnect, setConfirmingDisconnect] = useState(false);

  if (isLoading) {
    return <div className="skeleton h-40 rounded-2xl" />;
  }
  if (isError || !status) {
    return (
      <div
        role="alert"
        className="alert alert-error alert-soft text-sm"
      >
        <span>{COPY.loadError}</span>
        <button
          type="button"
          className="btn btn-sm min-h-11"
          onClick={() => refetch()}
        >
          {COPY.retry}
        </button>
      </div>
    );
  }
  // The server is not configured for Google Sheets: the feature simply does not exist yet.
  if (!status.available) return null;

  const busy =
    connect.isPending ||
    setSync.isPending ||
    run.isPending ||
    disconnect.isPending;
  const failedAction = [connect, setSync, run, disconnect].find(
    (mutation) => mutation.isError
  );

  // Turning the toggle on without a usable connection starts Google consent;
  // every other change is a plain switch of the stored toggle.
  const handleToggle = (checked: boolean) => {
    if (checked && (!status.connected || status.needsReconnect)) {
      connect.mutate();
      return;
    }
    setSync.mutate(checked);
  };

  return (
    <Card
      as="section"
      aria-labelledby="sheets-sync-heading"
      className="flex flex-col gap-4"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <h3
            id="sheets-sync-heading"
            className="text-[17px] font-semibold text-text"
          >
            {COPY.title}
          </h3>
          <p className="text-[15px] leading-relaxed text-soft">
            {COPY.disclosure}{' '}
            <Link
              to="/privacy"
              className="font-semibold text-primary hover:underline"
            >
              {COPY.privacyLink}
            </Link>
          </p>
        </div>
        {/* The app's `--border` token is a colour; DaisyUI sizes toggles and badges with a `--border` length, so it is reset to 1px on those elements. */}
        <label className="flex min-h-11 min-w-11 shrink-0 items-center justify-center">
          <span className="sr-only">{COPY.toggleLabel}</span>
          <input
            type="checkbox"
            role="switch"
            className="toggle toggle-primary [--border:1px]"
            checked={status.isEnabled}
            disabled={busy}
            onChange={(event) => handleToggle(event.target.checked)}
          />
        </label>
      </div>

      {status.showReconnect && (
        <div
          role="alert"
          className="alert alert-vertical sm:alert-horizontal alert-warning alert-soft text-sm"
        >
          <span>{COPY.reconnectBanner}</span>
          <Button
            variant="secondary"
            className="whitespace-nowrap"
            loading={connect.isPending}
            onClick={() => connect.mutate()}
          >
            {COPY.reconnect}
          </Button>
        </div>
      )}

      {status.connected && (
        <div className="flex flex-col gap-3">
          <p className="text-[13px] text-muted">{status.accountText}</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`badge ${status.runBadgeClass} [--border:1px]`}>
              {status.runBadgeLabel}
            </span>
            <span className="text-[13px] text-muted">{status.runText}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              loading={run.isPending}
              disabled={!status.canRunNow || busy}
              onClick={() => run.mutate()}
            >
              {COPY.runNow}
            </Button>
            {status.spreadsheetUrl && (
              <a
                href={status.spreadsheetUrl}
                target="_blank"
                rel="noreferrer"
                className={buttonStyles({ variant: 'secondary' })}
              >
                {COPY.openSheet}
              </a>
            )}
          </div>

          {status.spreadsheetUrl && <ReportScriptSection />}

          {confirmingDisconnect ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[13px] text-soft">
                {COPY.disconnectConfirm}
              </span>
              <Button
                variant="secondary"
                loading={disconnect.isPending}
                onClick={() =>
                  disconnect.mutate(undefined, {
                    onSettled: () => setConfirmingDisconnect(false),
                  })
                }
              >
                {COPY.disconnectYes}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setConfirmingDisconnect(false)}
              >
                {COPY.cancel}
              </Button>
            </div>
          ) : (
            <div>
              <Button
                variant="ghost"
                disabled={busy}
                onClick={() => setConfirmingDisconnect(true)}
              >
                {COPY.disconnect}
              </Button>
            </div>
          )}
        </div>
      )}

      {failedAction && (
        <p
          role="alert"
          className="text-xs text-error"
        >
          {getApiErrorMessage(failedAction.error, COPY.actionError)}
        </p>
      )}
    </Card>
  );
}
