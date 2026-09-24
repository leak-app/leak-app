import illustrationSrc from './assets/welcome.svg';
import {
  OnboardingIllustration,
  type OnboardingIllustrationProps,
} from './OnboardingIllustration';

export function WelcomeIllustration({
  className,
}: OnboardingIllustrationProps) {
  return (
    <OnboardingIllustration
      src={illustrationSrc}
      className={className}
    />
  );
}
