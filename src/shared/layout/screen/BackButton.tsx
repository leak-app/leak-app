import { useNavigate } from 'react-router-dom';

import { ArrowLeftIcon } from '@/shared/icons';

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
      className={`w-10 h-10 rounded-2xl bg-surface border border-outline/10 flex items-center justify-center text-on-surface hover:bg-surface-bright transition-all active:scale-95 group ${className}`}
      aria-label={ariaLabel}
    >
      <ArrowLeftIcon
        size={18}
        className="group-hover:-translate-x-0.5 transition-transform"
      />
    </button>
  );
}
