import { ClearInsightsIllustration } from '../illustrations';
import { BaseSlide } from './BaseSlide';

export function ClearInsightsSlide() {
  return (
    <BaseSlide
      illustration={
        <ClearInsightsIllustration className="h-56 w-full max-w-70 drop-shadow-sm" />
      }
      title="Báo cáo Trực quan"
      description="Theo dõi thói quen tài chính biến chuyển qua các vòng tiến độ sạch bách."
    />
  );
}
