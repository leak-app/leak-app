import illustrationSrc from './assets/track-spends.svg';
import {
  OnboardingIllustration,
  type OnboardingIllustrationProps,
} from './OnboardingIllustration';

export function TrackSpendsIllustration({
  className,
}: OnboardingIllustrationProps) {
  return (
    <OnboardingIllustration
      src={illustrationSrc}
      className={className}
    />
  );
}
