import { WelcomeIllustration } from '../illustrations';
import { BaseSlide } from './BaseSlide';

export function WelcomeSlide() {
  return (
    <BaseSlide
      illustration={
        <WelcomeIllustration className="h-56 w-full max-w-70 drop-shadow-sm" />
      }
      title="Chào mừng đến với Leak App"
      description="Loại bỏ rò rỉ tài chính ngầm và gia tăng tài sản ròng của bạn."
    />
  );
}
