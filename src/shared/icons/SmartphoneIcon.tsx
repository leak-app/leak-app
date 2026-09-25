import type { ComponentProps } from 'react';

interface IconProps extends ComponentProps<'svg'> {
  size?: number;
}

export function SmartphoneIcon({
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
      <rect
        x="5"
        y="2"
        width="14"
        height="20"
        rx="2"
      />
      <path d="M12 18h.01" />
    </svg>
  );
}
