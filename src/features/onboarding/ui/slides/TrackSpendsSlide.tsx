import { TrackSpendsIllustration } from '../illustrations';
import { BaseSlide } from './BaseSlide';

export function TrackSpendsSlide() {
  return (
    <BaseSlide
      illustration={
        <TrackSpendsIllustration className="h-56 w-full max-w-70 drop-shadow-sm" />
      }
      title="Theo dõi Chi tiêu"
      description="Ghi nhận và sắp xếp các khoản chi hàng ngày chỉ trong vài giây."
    />
  );
}
