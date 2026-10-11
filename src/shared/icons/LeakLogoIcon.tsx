import type { ComponentProps } from 'react';

interface IconProps extends ComponentProps<'svg'> {
  size?: number;
}

export function LeakLogoIcon({
  size = 24,
  fill = 'none',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path
        d="m392.41 385.25c0-37.811-30.691-68.502-68.502-68.502s-68.502 30.691-68.502 68.502v68.502h68.502c37.811 0 68.502-30.691 68.502-68.502z"
        fill="#8fd9b6"
        strokeWidth=".61382"
      />
      <path
        d="m107.59 46.244v293.34c0 63.039 51.131 114.17 114.17 114.17v-293.34c0-63.039-51.131-114.17-114.17-114.17z"
        fill="#3d7a62"
        strokeWidth=".61382"
      />
    </svg>
  );
}
