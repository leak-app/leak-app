import type { ComponentProps } from 'react';

interface IconProps extends ComponentProps<'svg'> {
  size?: number;
}

export function ArrowLeftIcon({
  size = 24,
  stroke = 'currentColor',
  fill = 'none',
  strokeWidth = 2,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line
        x1="19"
        y1="12"
        x2="5"
        y2="12"
      />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}
