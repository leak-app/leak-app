export interface NavigationControlsProps {
  primaryLabel: string;
  isFinalStep: boolean;
  canGoBack: boolean;
  onNext: () => void;
  onBack: () => void;
}

export function NavigationControls({
  primaryLabel,
  isFinalStep,
  canGoBack,
  onNext,
  onBack,
}: NavigationControlsProps) {
  return (
    <div className="flex w-full items-center gap-3 pt-4">
      {canGoBack && (
        <button
          type="button"
          onClick={onBack}
          className="btn btn-ghost min-h-[48px] min-w-[48px] px-4 text-hint font-medium text-sm hover:text-default"
          aria-label="Quay lại slide trước"
        >
          Quay lại
        </button>
      )}

      <button
        type="button"
        onClick={onNext}
        className={`btn min-h-[48px] flex-1 text-base font-semibold shadow-lg transition-transform active:scale-[0.98] ${
          isFinalStep
            ? 'btn-primary shadow-primary/20 text-on-primary'
            : 'btn-primary shadow-primary/15 text-on-primary'
        }`}
      >
        {primaryLabel}
      </button>
    </div>
  );
}
