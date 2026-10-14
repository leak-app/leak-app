import { CheckIcon, ICON, RefreshIcon, XMarkIcon } from '@/shared/icons';
import { BottomSheet, Button } from '@/shared/ui';

import { DISCONNECT_COPY as COPY } from '../model/content';

const BULLET_CLASS =
  'flex size-6 shrink-0 items-center justify-center rounded-full';

interface SheetsDisconnectSheetProps {
  open: boolean;
  loading: boolean;
  /** Offer "turn off auto sync instead" only while auto sync is on. */
  canPause: boolean;
  onClose: () => void;
  onPause: () => void;
  onConfirm: () => void;
}

/** Confirms disconnecting, and says what stays and what stops. */
export function SheetsDisconnectSheet({
  open,
  loading,
  canPause,
  onClose,
  onPause,
  onConfirm,
}: SheetsDisconnectSheetProps) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={COPY.title}
    >
      <div className="flex flex-col gap-5">
        <p className="-mt-2 text-body text-soft">{COPY.body}</p>

        <ul className="flex flex-col gap-3.5 rounded-choice border border-border bg-surface px-4.5 py-4">
          <li className="flex items-start gap-3">
            <span className={`${BULLET_CLASS} bg-primary-tint text-primary`}>
              <CheckIcon
                size={14}
                strokeWidth={2.4}
                aria-hidden="true"
              />
            </span>
            <span className="text-description text-soft">
              <span className="font-medium text-text">{COPY.keeps[0]}</span>
              {COPY.keeps[1]}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className={`${BULLET_CLASS} bg-white/7 text-pebble`}>
              <XMarkIcon
                size={13}
                strokeWidth={2.4}
                aria-hidden="true"
              />
            </span>
            <span className="text-description text-soft">
              <span className="font-medium text-text">{COPY.stops[0]}</span>
              {COPY.stops[1]}
            </span>
          </li>
          {canPause && (
            <li className="flex items-start gap-3">
              <span className={`${BULLET_CLASS} bg-white/7 text-pebble`}>
                <RefreshIcon
                  size={13}
                  strokeWidth={ICON.stroke.active}
                  aria-hidden="true"
                />
              </span>
              <span className="text-description text-soft">
                {COPY.pausePrompt}{' '}
                <button
                  type="button"
                  disabled={loading}
                  onClick={onPause}
                  className="-my-3 inline py-3 text-left font-semibold text-primary hover:underline disabled:opacity-50"
                >
                  {COPY.pauseAction}
                </button>
                {COPY.pauseSuffix}
              </span>
            </li>
          )}
        </ul>

        <div className="flex flex-col gap-2.5">
          <Button
            variant="danger"
            size="lg"
            fullWidth
            loading={loading}
            onClick={onConfirm}
          >
            {COPY.confirm}
          </Button>
          <Button
            variant="secondary"
            fullWidth
            disabled={loading}
            onClick={onClose}
          >
            {COPY.cancel}
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
