import type { ComponentProps } from 'react';

interface IconProps extends ComponentProps<'svg'> {
  size?: number;
}

export function SlidersIcon({
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
      <path d="M21 4h-7M10 4H3" />
      <path d="M21 12h-9M8 12H3" />
      <path d="M21 20h-5M12 20H3" />
      <path d="M14 2v4M8 10v4M16 18v4" />
    </svg>
  );
}
