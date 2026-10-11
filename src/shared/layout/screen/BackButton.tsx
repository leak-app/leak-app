import { useNavigate } from 'react-router-dom';

import { ChevronLeftIcon, ICON } from '@/shared/icons';

import { HEADER_CIRCLE_CLASS } from './HeaderActions';

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

export function BackButton({
  onClick,
  className = '',
  ariaLabel = 'Quay lại',
}: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${HEADER_CIRCLE_CLASS} ${className}`}
      aria-label={ariaLabel}
    >
      <ChevronLeftIcon
        size={ICON.size.ui}
        strokeWidth={ICON.stroke.active}
        aria-hidden="true"
      />
    </button>
  );
}
