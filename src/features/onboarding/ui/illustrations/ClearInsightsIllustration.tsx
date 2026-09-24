import illustrationSrc from './assets/clear-insights.svg';
import {
  OnboardingIllustration,
  type OnboardingIllustrationProps,
} from './OnboardingIllustration';

export function ClearInsightsIllustration({
  className,
}: OnboardingIllustrationProps) {
  return (
    <OnboardingIllustration
      src={illustrationSrc}
      className={className}
    />
  );
}
