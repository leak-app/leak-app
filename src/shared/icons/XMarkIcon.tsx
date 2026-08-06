import type { ComponentProps } from 'react';

interface IconProps extends ComponentProps<'svg'> {
  size?: number;
}

export function XMarkIcon({
  size = 24,
  stroke = 'currentColor',
  fill = 'none',
  strokeWidth = 1.5,
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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
}
