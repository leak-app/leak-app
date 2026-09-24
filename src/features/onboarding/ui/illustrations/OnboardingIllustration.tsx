export interface OnboardingIllustrationProps {
  className?: string;
}

interface BaseIllustrationProps extends OnboardingIllustrationProps {
  src: string;
}

/**
 * Renders an unDraw illustration recolored to the Leak App palette.
 * Each SVG asset carries its own lightweight CSS animations, which are
 * disabled inside the SVG when the user prefers reduced motion.
 */
export function OnboardingIllustration({
  src,
  className = 'w-full h-auto max-h-56',
}: BaseIllustrationProps) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`object-contain ${className}`}
    />
  );
}
