import illustrationSrc from './assets/quick-logging.svg';
import {
  OnboardingIllustration,
  type OnboardingIllustrationProps,
} from './OnboardingIllustration';

export function QuickLoggingIllustration({
  className,
}: OnboardingIllustrationProps) {
  return (
    <OnboardingIllustration
      src={illustrationSrc}
      className={className}
    />
  );
}
