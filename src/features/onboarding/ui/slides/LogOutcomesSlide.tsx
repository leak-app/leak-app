import { LogOutcomesIllustration } from '../illustrations';
import { BaseSlide } from './BaseSlide';

export function LogOutcomesSlide() {
  return (
    <BaseSlide
      illustration={
        <LogOutcomesIllustration className="h-56 w-full max-w-70 drop-shadow-sm" />
      }
      title="Đánh giá Giá trị"
      description="Đánh giá chất lượng khoản chi nhẹ nhàng, không phán xét."
    />
  );
}
