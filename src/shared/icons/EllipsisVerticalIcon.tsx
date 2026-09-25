import type { ComponentProps } from 'react';

interface IconProps extends ComponentProps<'svg'> {
  size?: number;
}

export function EllipsisVerticalIcon({
  size = 24,
  fill = 'currentColor',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={fill}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle
        cx="12"
        cy="5"
        r="1"
      />
      <circle
        cx="12"
        cy="12"
        r="1"
      />
      <circle
        cx="12"
        cy="19"
        r="1"
      />
    </svg>
  );
}
