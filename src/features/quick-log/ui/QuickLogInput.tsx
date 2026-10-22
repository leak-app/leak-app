import type { QuickLogDraftModel } from '@/entities/transaction';
import { ArrowRightIcon, ICON } from '@/shared/icons';

import {
  QUICK_LOG_MAX_LENGTH,
  QUICK_LOG_PLACEHOLDER,
} from '../lib/quickLogInput';
import { useQuickLog } from '../model/useQuickLog';

interface Props {
  onDraft: (draft: QuickLogDraftModel) => void;
  /** Focus the field on mount, for a box the user just opened on purpose. */
  autoFocus?: boolean;
}

export function QuickLogInput({ onDraft, autoFocus = false }: Props) {
  const quickLog = useQuickLog(onDraft);

  return (
    <form
      className="w-full px-2"
      onSubmit={(e) => {
        e.preventDefault();
        quickLog.submit();
      }}
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          inputMode="text"
          autoFocus={autoFocus}
          enterKeyHint="go"
          autoComplete="off"
          maxLength={QUICK_LOG_MAX_LENGTH}
          placeholder={QUICK_LOG_PLACEHOLDER}
          aria-label="Nhập nhanh giao dịch"
          value={quickLog.text}
          onChange={(e) => quickLog.setText(e.target.value)}
          className="input input-bordered flex-1 min-h-11 bg-surface/60 border-outline/20 rounded-2xl focus:border-primary text-sm"
        />
        <button
          type="submit"
          disabled={!quickLog.canSubmit}
          aria-label="Điền nhanh"
          className="btn btn-primary min-h-11 min-w-11 rounded-2xl px-3"
        >
          {quickLog.isPending ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <ArrowRightIcon
              size={ICON.size.ui}
              strokeWidth={ICON.stroke.onPrimary}
              aria-hidden="true"
            />
          )}
        </button>
      </div>
      {quickLog.errorText && (
        <p
          role="alert"
          className="mt-2 px-1 text-xs text-error font-medium"
        >
          {quickLog.errorText}
        </p>
      )}
    </form>
  );
}
