import { APP_NAME } from '@/shared/configs/app-info.config';

export type HomeFeatureIcon =
  'pencil' | 'history' | 'leak' | 'target' | 'sheets' | 'shield';

export interface HomeFeatureModel {
  id: string;
  icon: HomeFeatureIcon;
  title: string;
  description: string;
}

export const HOME_PAGE_TITLE = `${APP_NAME} - Quản lý chi tiêu, phát hiện khoản rò rỉ`;

export const HOME_PAGE_DESCRIPTION =
  'Leak giúp bạn ghi chi tiêu nhanh, nhìn lại từng khoản sau 24–48 giờ và phát hiện những khoản tiền đang rò rỉ khỏi ví của bạn.';

export const HOME_HERO = {
  heading: 'Biết tiền của bạn đang rò rỉ đi đâu',
  description:
    'Leak giúp bạn ghi chi tiêu trong vài giây, nhìn lại từng khoản sau 24–48 giờ khi cảm xúc đã nguội, và thấy rõ những khoản chi bạn thật sự thấy không đáng.',
  primaryAction: 'Tạo tài khoản',
  secondaryAction: 'Đăng nhập',
} as const;

export const HOME_PURPOSE = {
  heading: 'Leak App là gì',
  paragraphs: [
    'Leak App là ứng dụng web quản lý chi tiêu cá nhân. Bạn ghi lại các khoản thu chi, chia theo ví và danh mục, đặt ngân sách và mục tiêu tiết kiệm.',
    'Điểm khác biệt của Leak là bước nhìn lại: sau 24–48 giờ bạn đánh giá từng khoản chi là đáng giá, bình thường hay rò rỉ. Từ đó ứng dụng cho thấy tiền của bạn đang rò rỉ đi đâu và bạn có thể bịt lại bao nhiêu mỗi tháng.',
  ],
} as const;

export const HOME_GOOGLE_DATA = {
  heading: 'Leak dùng dữ liệu Google của bạn như thế nào',
  text: 'Bạn có thể đăng nhập bằng tài khoản Google. Khi đó Leak chỉ nhận địa chỉ email và tên hiển thị để tạo tài khoản và đăng nhập cho bạn. Nếu bạn tự bật đồng bộ Google Sheets (tùy chọn), Leak chỉ truy cập bảng tính do chính Leak tạo trong Google Drive của bạn. Leak không đọc Gmail, danh bạ hay các tệp khác của bạn, không bán dữ liệu và không dùng dữ liệu đó để quảng cáo.',
} as const;

export const HOME_FEATURES_HEADING = 'Leak làm được gì';

export const HOME_FEATURES: HomeFeatureModel[] = [
  {
    id: 'quick-log',
    icon: 'pencil',
    title: 'Ghi chi tiêu nhanh',
    description:
      'Nhập số tiền bằng bàn phím số, chọn ví và danh mục. Một khoản chi chỉ mất vài giây.',
  },
  {
    id: 'reflect',
    icon: 'history',
    title: 'Nhìn lại chi tiêu',
    description:
      'Sau 24–48 giờ, đánh giá từng khoản là Đáng giá, Bình thường hay Rò rỉ, kèm lý do nếu bạn thấy hối tiếc.',
  },
  {
    id: 'leak-report',
    icon: 'leak',
    title: 'Báo cáo rò rỉ',
    description:
      'Xem tỷ lệ rò rỉ theo tháng, theo danh mục và theo lý do để biết nên cắt giảm ở đâu.',
  },
  {
    id: 'budget-goals',
    icon: 'target',
    title: 'Ngân sách và mục tiêu',
    description:
      'Đặt ngân sách theo danh mục và biến khoản rò rỉ đã bịt được thành tiền tiết kiệm cho mục tiêu của bạn.',
  },
  {
    id: 'google-sheets',
    icon: 'sheets',
    title: 'Xuất sang Google Sheets',
    description:
      'Tùy chọn và mặc định tắt: khi bạn bật, mỗi ngày Leak ghi một bản sao dữ liệu theo một chiều vào bảng tính mới trong Google Drive của chính bạn để làm báo cáo riêng. Leak chỉ truy cập tệp do Leak tạo, không đọc các tệp khác của bạn.',
  },
  {
    id: 'privacy',
    icon: 'shield',
    title: 'Dữ liệu của riêng bạn',
    description:
      'Dữ liệu tài chính chỉ phục vụ chính bạn. Chúng tôi không bán dữ liệu và không dùng nó để quảng cáo.',
  },
];

export const HOME_PRIVACY_NOTE = {
  text: 'Tìm hiểu cách chúng tôi bảo vệ dữ liệu của bạn trong',
  privacyLabel: 'Chính sách quyền riêng tư',
  and: 'và',
  termsLabel: 'Điều khoản dịch vụ',
} as const;
