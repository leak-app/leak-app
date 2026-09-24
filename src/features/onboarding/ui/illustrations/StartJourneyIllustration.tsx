import illustrationSrc from './assets/start-journey.svg';
import {
  OnboardingIllustration,
  type OnboardingIllustrationProps,
} from './OnboardingIllustration';

export function StartJourneyIllustration({
  className,
}: OnboardingIllustrationProps) {
  return (
    <OnboardingIllustration
      src={illustrationSrc}
      className={className}
    />
  );
}
