import type { IconProps } from './types';

/** Lucide `mic` (ISC), cloned locally. */
export function MicIcon({
  size = 24,
  stroke = 'currentColor',
  strokeWidth = 2,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 19v3" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <rect
        x="9"
        y="2"
        width="6"
        height="13"
        rx="3"
      />
    </svg>
  );
}
