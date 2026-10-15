import { useBalanceVisibility } from '@/shared/hooks';
import { EyeIcon, EyeOffIcon, ICON } from '@/shared/icons';

/** Round 44px button that hides or shows every amount on the screen. */
export function BalanceToggleButton() {
  const { isHidden, toggle } = useBalanceVisibility();
  const Icon = isHidden ? EyeOffIcon : EyeIcon;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isHidden}
      aria-label={isHidden ? 'Hiện số tiền' : 'Ẩn số tiền'}
      className="flex size-touch items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors duration-200 ease-out hover:text-text focus-visible:shadow-focus focus-visible:outline-none"
    >
      <Icon
        size={ICON.size.ui}
        strokeWidth={ICON.stroke.idle}
        aria-hidden="true"
      />
    </button>
  );
}
