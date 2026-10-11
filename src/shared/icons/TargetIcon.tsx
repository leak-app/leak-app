import type { IconProps } from './types';

/** Lucide `target` (ISC), cloned locally. */
export function TargetIcon({
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
      <circle
        cx="12"
        cy="12"
        r="10"
      />
      <circle
        cx="12"
        cy="12"
        r="6"
      />
      <circle
        cx="12"
        cy="12"
        r="2"
      />
    </svg>
  );
}
