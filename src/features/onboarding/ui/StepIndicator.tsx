export interface StepIndicatorProps {
  totalSteps: number;
  currentStepIndex: number;
  onStepClick?: (index: number) => void;
}

export function StepIndicator({
  totalSteps,
  currentStepIndex,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <div
      className="flex items-center gap-2"
      role="tablist"
      aria-label="Tiến trình giới thiệu"
    >
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = index === currentStepIndex;
        const isPast = index < currentStepIndex;

        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Trang ${index + 1}`}
            onClick={() => onStepClick?.(index)}
            className="min-h-11 min-w-4 flex items-center justify-center p-1 focus:outline-hidden"
          >
            <span
              className={`h-2 rounded-full transition-all duration-300 ease-out ${
                isActive
                  ? 'w-7 bg-primary shadow-xs shadow-primary/40'
                  : isPast
                    ? 'w-2 bg-primary/60'
                    : 'w-2 bg-outline/40'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
