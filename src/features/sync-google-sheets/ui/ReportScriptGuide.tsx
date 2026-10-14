import { useState } from 'react';

import {
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  ICON,
  InfoIcon,
  ShieldCheckIcon,
} from '@/shared/icons';
import { Button, buttonStyles, type ButtonVariant } from '@/shared/ui';

import {
  copyTemplateScript,
  TEMPLATE_SCRIPT_PATH,
} from '../lib/templateScript';
import { REPORT_GUIDE_COPY as COPY } from '../model/content';
import { RichText } from './RichText';

type CopyState = 'idle' | 'copying' | 'copied' | 'failed';

const COPY_LABEL: Record<CopyState, string> = {
  idle: COPY.copy,
  copying: COPY.copy,
  copied: COPY.copied,
  failed: COPY.copyFailed,
};

const COPY_VARIANT: Record<CopyState, ButtonVariant> = {
  idle: 'primary',
  copying: 'primary',
  copied: 'tint',
  failed: 'secondary',
};

const STEP_DOT_CLASS =
  'flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold';

/** The optional Apps Script that builds the report tabs: copy it, then five steps. */
export function ReportScriptGuide() {
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const lastIndex = COPY.steps.length - 1;

  const handleCopy = async () => {
    setCopyState('copying');
    setCopyState(await copyTemplateScript());
  };

  return (
    <div className="flex flex-col gap-5.5">
      <p className="text-body leading-[1.55] text-soft">{COPY.intro}</p>

      <div className="flex items-start gap-3 rounded-tile border border-primary/20 bg-primary/7 px-4 py-3.5">
        <ShieldCheckIcon
          size={ICON.size.row}
          strokeWidth={ICON.stroke.idle}
          className="shrink-0 pt-px text-primary"
          aria-hidden="true"
        />
        <span className="text-sm leading-normal text-soft">{COPY.trust}</span>
      </div>

      <div className="flex gap-2.5">
        <Button
          variant={COPY_VARIANT[copyState]}
          className="flex-1"
          loading={copyState === 'copying'}
          aria-live="polite"
          onClick={handleCopy}
          leadingIcon={
            copyState === 'copied' ? (
              <CheckIcon
                size={17}
                strokeWidth={2.2}
                aria-hidden="true"
              />
            ) : (
              <CopyIcon
                size={17}
                strokeWidth={ICON.stroke.onPrimary}
                aria-hidden="true"
              />
            )
          }
        >
          {COPY_LABEL[copyState]}
        </Button>
        <a
          href={TEMPLATE_SCRIPT_PATH}
          download={COPY.downloadName}
          className={buttonStyles({ variant: 'secondary' })}
        >
          <DownloadIcon
            size={17}
            strokeWidth={ICON.stroke.active}
            aria-hidden="true"
          />
          {COPY.download}
        </a>
      </div>

      <ol
        aria-label={COPY.stepsLabel}
        className="flex flex-col"
      >
        {COPY.steps.map((step, index) => {
          const isLast = index === lastIndex;
          const hasCallout = 'callout' in step;
          return (
            <li
              key={step.id}
              className="flex gap-3.5"
            >
              <div className="flex flex-col items-center">
                {isLast ? (
                  <span
                    className={`${STEP_DOT_CLASS} bg-primary-tint text-primary`}
                  >
                    <CheckIcon
                      size={14}
                      strokeWidth={2.4}
                      aria-hidden="true"
                    />
                  </span>
                ) : (
                  <span
                    className={`${STEP_DOT_CLASS} ${
                      hasCallout
                        ? 'bg-secondary/16 text-secondary'
                        : 'bg-white/7 text-text'
                    }`}
                  >
                    {index + 1}
                  </span>
                )}
                {!isLast && (
                  <span
                    className="my-1 w-0.5 flex-1 bg-white/7"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div
                className={`flex flex-col gap-2.5 pt-0.75 ${isLast ? '' : 'pb-5'}`}
              >
                <p className="text-description leading-[1.55] text-soft">
                  <RichText parts={step.parts} />
                </p>
                {'callout' in step && (
                  <div className="flex flex-col gap-1.5 rounded-tile border border-secondary/25 bg-secondary/8 px-4 py-3.5">
                    <span className="text-sm font-semibold text-secondary">
                      {step.callout.title}
                    </span>
                    <span className="text-sm leading-normal text-soft">
                      <RichText parts={step.callout.parts} />
                    </span>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="flex items-start gap-3 rounded-tile border border-border bg-white/4 px-4 py-3.5">
        <InfoIcon
          size={ICON.size.row}
          strokeWidth={ICON.stroke.idle}
          className="shrink-0 pt-px text-pebble"
          aria-hidden="true"
        />
        <span className="text-sm leading-normal text-muted">
          {COPY.demoWarning}
        </span>
      </div>
    </div>
  );
}
