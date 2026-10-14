import { StartJourneyIllustration } from '../illustrations';
import { BaseSlide } from './BaseSlide';

export function StartJourneySlide() {
  return (
    <BaseSlide
      illustration={
        <StartJourneyIllustration className="h-56 w-full max-w-70 drop-shadow-sm" />
      }
      title="Bắt đầu Hành trình"
      description="Làm chủ chi tiêu và giá trị cuộc sống ngay hôm nay."
    />
  );
}
