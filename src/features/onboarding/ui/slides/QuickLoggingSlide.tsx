import { QuickLoggingIllustration } from '../illustrations';
import { BaseSlide } from './BaseSlide';

export function QuickLoggingSlide() {
  return (
    <BaseSlide
      illustration={
        <QuickLoggingIllustration className="h-56 w-full max-w-70 drop-shadow-sm" />
      }
      title="Ghi chép Nhanh chóng"
      description="Nhập giao dịch tức thì với bàn phím số thông minh và lưới danh mục 1-chạm."
    />
  );
}
