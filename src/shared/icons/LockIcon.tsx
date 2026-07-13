import type { ComponentProps } from 'react';

interface IconProps extends ComponentProps<'svg'> {
  size?: number;
}

export function LockIcon({
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
      <rect
        x="3"
        y="11"
        width="18"
        height="11"
        rx="2"
        ry="2"
      />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
