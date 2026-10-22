import { useState } from 'react';

import { getApiErrorMessage } from '@/shared/api';
import { Button, Card } from '@/shared/ui';

import {
  useConnectGoogleSheets,
  useDisconnectGoogleSheets,
  useGoogleSheetsStatus,
  useRunGoogleSheetsSync,
  useSetGoogleSheetsSync,
} from '../api/sheetsSync.api';
import { SHEETS_SYNC_COPY as COPY } from '../model/content';
import { SheetsConnectPanel } from './SheetsConnectPanel';
import { SheetsConsentSheet } from './SheetsConsentSheet';
import { SheetsDisconnectSheet } from './SheetsDisconnectSheet';
import { SheetsProblemPanel } from './SheetsProblemPanel';
import { SheetsRunningPanel } from './SheetsRunningPanel';
import { SheetsSettingsGroup } from './SheetsSettingsGroup';
import { SheetsStatusPanel } from './SheetsStatusPanel';

/** The "Dữ liệu & đồng bộ" section of the profile: one panel per state, plus two sheets. */
export function GoogleSheetsSyncCard() {
  const { data: status, isLoading, isError, refetch } = useGoogleSheetsStatus();
  const connect = useConnectGoogleSheets();
  const setSync = useSetGoogleSheetsSync();
  const run = useRunGoogleSheetsSync();
  const disconnect = useDisconnectGoogleSheets();
  const [consentOpen, setConsentOpen] = useState(false);
  const [disconnectOpen, setDisconnectOpen] = useState(false);

  if (isLoading) {
    return <div className="skeleton h-40 rounded-card" />;
  }
  if (isError || !status) {
    return (
      <Card
        variant="danger"
        role="alert"
        className="flex items-center justify-between gap-3"
      >
        <span className="text-description text-text">{COPY.loadError}</span>
        <Button
          variant="secondary"
          onClick={() => refetch()}
        >
          {COPY.retry}
        </Button>
      </Card>
    );
  }
  // The server is not configured for Google Sheets: say so, the screen would be blank otherwise.
  if (!status.available) {
    return (
      <Card>
        <p className="text-description text-muted">{COPY.unavailable}</p>
      </Card>
    );
  }

  const busy =
    connect.isPending ||
    setSync.isPending ||
    run.isPending ||
    disconnect.isPending;
  const failedAction = [connect, setSync, run, disconnect].find(
    (mutation) => mutation.isError
  );

  const closeConsent = () => setConsentOpen(false);
  const closeDisconnect = () => setDisconnectOpen(false);
  const startConsent = () =>
    connect.mutate(undefined, { onError: closeConsent });
  const handleProblemAction = () => {
    if (status.problemAction === 'reconnect') setConsentOpen(true);
    else run.mutate();
  };

  return (
    <section
      aria-labelledby="sheets-sync-eyebrow"
      className="flex flex-col gap-4"
    >
      <h2
        id="sheets-sync-eyebrow"
        className="text-eyebrow text-muted"
      >
        {status.connected ? COPY.eyebrowConnected : COPY.eyebrow}
      </h2>

      {status.panel === 'connect' && (
        <SheetsConnectPanel onConnect={() => setConsentOpen(true)} />
      )}
      {status.panel === 'status' && (
        <SheetsStatusPanel
          status={status}
          runLoading={run.isPending}
          disabled={busy}
          onRun={() => run.mutate()}
        />
      )}
      {status.panel === 'running' && <SheetsRunningPanel status={status} />}
      {status.panel === 'problem' && (
        <SheetsProblemPanel
          status={status}
          actionLoading={status.problemAction === 'retry' && run.isPending}
          disabled={busy}
          onAction={handleProblemAction}
        />
      )}

      {status.connected && (
        <>
          <SheetsSettingsGroup
            status={status}
            disabled={busy}
            onToggle={(enabled) => setSync.mutate(enabled)}
          />
          <Button
            variant="dangerGhost"
            className="self-center"
            disabled={busy}
            onClick={() => setDisconnectOpen(true)}
          >
            {COPY.disconnect}
          </Button>
        </>
      )}

      {failedAction && (
        <p
          role="alert"
          className="text-center text-caption text-danger"
        >
          {getApiErrorMessage(failedAction.error, COPY.actionError)}
        </p>
      )}

      <SheetsConsentSheet
        open={consentOpen}
        loading={connect.isPending}
        onClose={closeConsent}
        onContinue={startConsent}
      />
      <SheetsDisconnectSheet
        open={disconnectOpen}
        loading={disconnect.isPending || setSync.isPending}
        canPause={status.isEnabled}
        onClose={closeDisconnect}
        onPause={() => setSync.mutate(false, { onSettled: closeDisconnect })}
        onConfirm={() =>
          disconnect.mutate(undefined, { onSettled: closeDisconnect })
        }
      />
    </section>
  );
}
