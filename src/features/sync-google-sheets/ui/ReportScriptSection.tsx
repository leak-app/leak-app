import { useState } from 'react';

import { Button, buttonStyles } from '@/shared/ui';

import {
  copyTemplateScript,
  TEMPLATE_SCRIPT_PATH,
} from '../lib/templateScript';
import { REPORT_SCRIPT_COPY as COPY } from '../model/content';

type CopyState = 'idle' | 'copying' | 'copied' | 'failed';

const COPY_LABEL: Record<CopyState, string> = {
  idle: COPY.copy,
  copying: COPY.copy,
  copied: COPY.copied,
  failed: COPY.copyFailed,
};

/** Optional, collapsed by default: the Apps Script that builds the report tabs. */
export function ReportScriptSection() {
  const [copyState, setCopyState] = useState<CopyState>('idle');

  const handleCopy = async () => {
    setCopyState('copying');
    setCopyState(await copyTemplateScript());
  };

  return (
    <details className="group rounded-2xl border border-border">
      <summary className="flex min-h-11 cursor-pointer list-none items-center px-4 text-[15px] font-semibold text-text">
        {COPY.title}
      </summary>
      <div className="flex flex-col gap-3 px-4 pb-4">
        <p className="text-[13px] leading-relaxed text-soft">{COPY.intro}</p>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            loading={copyState === 'copying'}
            onClick={handleCopy}
          >
            {COPY_LABEL[copyState]}
          </Button>
          <a
            href={TEMPLATE_SCRIPT_PATH}
            download="build-template.gs"
            className={buttonStyles({ variant: 'ghost' })}
          >
            {COPY.download}
          </a>
        </div>

        <ol
          aria-label={COPY.stepsLabel}
          className="list-decimal space-y-1 pl-5 text-[13px] leading-relaxed text-soft"
        >
          {COPY.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>

        <p className="text-[13px] leading-relaxed text-muted">
          {COPY.demoWarning}
        </p>
      </div>
    </details>
  );
}
