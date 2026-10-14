import { CheckIcon, ExternalLinkIcon, ICON } from '@/shared/icons';
import { BottomSheet, Button } from '@/shared/ui';

import { CONSENT_COPY as COPY, SHEETS_SYNC_COPY } from '../model/content';
import { RichText } from './RichText';

interface SheetsConsentSheetProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onContinue: () => void;
}

/** Shown before leaving for Google, so the redirect is never a surprise. */
export function SheetsConsentSheet({
  open,
  loading,
  onClose,
  onContinue,
}: SheetsConsentSheetProps) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      ariaLabel={COPY.title}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2.5">
          <span className="flex size-12 items-center justify-center rounded-full bg-primary-tint text-primary">
            <ExternalLinkIcon
              size={22}
              strokeWidth={ICON.stroke.idle}
              aria-hidden="true"
            />
          </span>
          <h3 className="text-xl font-medium text-text">{COPY.title}</h3>
          <p className="text-body text-soft">{COPY.body}</p>
        </div>

        <ol className="flex flex-col gap-3.5 rounded-choice border border-border bg-surface px-4.5 py-4">
          {COPY.steps.map((step, index) => {
            const isLast = index === COPY.steps.length - 1;
            return (
              <li
                key={step.id}
                className="flex items-start gap-3"
              >
                {isLast ? (
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary">
                    <CheckIcon
                      size={14}
                      strokeWidth={2.4}
                      aria-hidden="true"
                    />
                  </span>
                ) : (
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/7 text-xs font-semibold text-soft">
                    {index + 1}
                  </span>
                )}
                <span className="text-description text-soft">
                  <RichText parts={step.parts} />
                </span>
              </li>
            );
          })}
        </ol>

        <div className="flex flex-col gap-1.5">
          <Button
            size="lg"
            fullWidth
            loading={loading}
            onClick={onContinue}
          >
            {COPY.continue}
          </Button>
          <Button
            variant="ghost"
            fullWidth
            disabled={loading}
            onClick={onClose}
          >
            {SHEETS_SYNC_COPY.later}
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
