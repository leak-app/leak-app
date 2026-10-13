import {
  APP_NAME,
  APP_URL,
  CONTACT_EMAIL,
  LEGAL_UPDATED_LABEL,
} from '@/shared/configs/app-info.config';
import type { LegalDocumentModel } from '@/shared/ui';

export const PRIVACY_DOCUMENT: LegalDocumentModel = {
  title: 'Chính sách quyền riêng tư',
  updatedAtLabel: LEGAL_UPDATED_LABEL,
  intro: `${APP_NAME} (“chúng tôi”) là ứng dụng quản lý chi tiêu cá nhân tại ${APP_URL}. Chính sách này giải thích chúng tôi thu thập những dữ liệu nào, dùng vào việc gì, chia sẻ với ai và bạn có những quyền gì đối với dữ liệu của mình.`,
  sections: [
    {
      id: 'data-collected',
      heading: '1. Dữ liệu chúng tôi thu thập',
      paragraphs: [
        'Chúng tôi chỉ thu thập dữ liệu cần thiết để ứng dụng hoạt động:',
      ],
      items: [
        'Thông tin tài khoản: email, tên hiển thị (nếu có) và mật khẩu. Mật khẩu được lưu dưới dạng băm một chiều; chúng tôi không lưu và không xem được mật khẩu gốc.',
        'Đăng nhập bằng Google: nếu bạn chọn đăng nhập bằng Google, chúng tôi nhận email và tên hiển thị của tài khoản Google. Chúng tôi không truy cập Gmail, Google Drive, danh bạ hay dữ liệu Google nào khác thông qua tính năng đăng nhập.',
        'Dữ liệu tài chính do bạn nhập: giao dịch (số tiền, mô tả, ngày), danh mục, ví và số dư, ngân sách, mục tiêu tiết kiệm, cùng đánh giá và lý do rò rỉ của từng khoản chi.',
        'Dữ liệu phiên đăng nhập: loại thiết bị hoặc trình duyệt, địa chỉ IP và thời điểm đăng nhập, dùng để hiển thị danh sách thiết bị đang đăng nhập và bảo vệ tài khoản.',
        'Cookie và bộ nhớ trình duyệt: một cookie đăng nhập để giữ phiên của bạn và bộ nhớ cục bộ ghi nhớ việc bạn đã xem phần giới thiệu. Chúng tôi không dùng cookie quảng cáo hay cookie theo dõi.',
      ],
    },
    {
      id: 'data-use',
      heading: '2. Chúng tôi sử dụng dữ liệu như thế nào',
      items: [
        'Cung cấp các chức năng bạn yêu cầu: ghi chép chi tiêu, nhìn lại chi tiêu, báo cáo rò rỉ, ngân sách và mục tiêu tiết kiệm.',
        'Xác thực, bảo mật tài khoản và ngăn chặn truy cập trái phép.',
        'Gửi email cần thiết cho hoạt động của tài khoản, ví dụ email đặt lại mật khẩu.',
        'Khắc phục lỗi và duy trì hoạt động ổn định của dịch vụ.',
      ],
      paragraphs: [
        'Chúng tôi không bán dữ liệu của bạn và không dùng dữ liệu tài chính của bạn cho mục đích quảng cáo.',
      ],
    },
    {
      id: 'google-data',
      heading: '3. Dữ liệu người dùng Google và Google Sheets',
      paragraphs: [
        'Tính năng xuất dữ liệu sang Google Sheets là tùy chọn và chỉ theo một chiều: ứng dụng ghi một bản sao dữ liệu của bạn vào bảng tính Google do bạn sở hữu để bạn làm báo cáo riêng. Dữ liệu trong bảng tính không được ghi ngược lại vào ứng dụng.',
      ],
      items: [
        'Phạm vi truy cập: https://www.googleapis.com/auth/spreadsheets, chỉ dùng để ghi vào bảng tính được chỉ định. Chúng tôi không đọc, liệt kê hay thay đổi các tệp khác trong Google Drive của bạn.',
        'Thông tin xác thực Google (refresh token) được giữ trong cấu hình bảo mật phía máy chủ, không gửi tới trình duyệt và không ghi vào nhật ký.',
        'Dữ liệu nhận được từ Google chỉ được dùng để cung cấp tính năng này; không bán, không chuyển cho bên thứ ba và không dùng cho quảng cáo.',
        'Bạn có thể thu hồi quyền truy cập bất cứ lúc nào tại https://myaccount.google.com/permissions.',
      ],
    },
    {
      id: 'google-limited-use',
      heading: '4. Cam kết với Chính sách dữ liệu của Google',
      paragraphs: [
        `Việc ${APP_NAME} sử dụng và chuyển giao thông tin nhận được từ các API của Google tuân thủ Chính sách Dữ liệu Người dùng của Google API Services (Google API Services User Data Policy), bao gồm các yêu cầu về Sử dụng Hạn chế (Limited Use).`,
      ],
    },
    {
      id: 'sharing',
      heading: '5. Chia sẻ dữ liệu',
      paragraphs: [
        'Chúng tôi không bán hay cho thuê dữ liệu cá nhân. Dữ liệu chỉ được xử lý bởi các bên sau khi thật sự cần thiết:',
      ],
      items: [
        'Google: cung cấp đăng nhập bằng Google và, nếu bạn bật, tính năng xuất sang Google Sheets. Phông chữ của ứng dụng được tải từ Google Fonts, nên trình duyệt của bạn gửi yêu cầu (gồm địa chỉ IP) tới Google khi mở trang.',
        'Nhà cung cấp dịch vụ gửi email: chỉ để gửi thư đặt lại mật khẩu và thông báo tài khoản.',
        'Cơ quan nhà nước có thẩm quyền, khi pháp luật yêu cầu.',
      ],
    },
    {
      id: 'security',
      heading: '6. Lưu trữ và bảo mật',
      items: [
        'Dữ liệu được truyền qua kết nối HTTPS.',
        'Mật khẩu được băm một chiều; phiên đăng nhập có thời hạn và bạn có thể thu hồi từng thiết bị trong phần Hồ sơ.',
        'Quyền truy cập vào máy chủ và cơ sở dữ liệu được giới hạn cho người vận hành ứng dụng.',
      ],
      paragraphs: [
        'Không có hệ thống nào an toàn tuyệt đối. Nếu xảy ra sự cố ảnh hưởng đến dữ liệu của bạn, chúng tôi sẽ thông báo theo quy định của pháp luật.',
      ],
    },
    {
      id: 'retention',
      heading: '7. Thời gian lưu giữ và xóa dữ liệu',
      items: [
        'Chúng tôi lưu dữ liệu trong thời gian tài khoản của bạn còn hoạt động.',
        'Khi bạn xóa giao dịch, ví hoặc danh mục trong ứng dụng, mục đó được đánh dấu là đã xóa và ẩn khỏi giao diện, nhưng vẫn được lưu để số dư và báo cáo luôn nhất quán.',
        `Để xóa hoàn toàn tài khoản và toàn bộ dữ liệu, hãy gửi email tới ${CONTACT_EMAIL} từ địa chỉ email đã đăng ký. Chúng tôi xử lý yêu cầu trong vòng 30 ngày.`,
        'Bản sao đã xuất sang Google Sheets nằm trong tài khoản Google của bạn và do bạn tự quản lý.',
      ],
    },
    {
      id: 'rights',
      heading: '8. Quyền của bạn',
      paragraphs: [
        `Bạn có quyền truy cập và nhận bản sao dữ liệu, chỉnh sửa dữ liệu không chính xác, yêu cầu xóa dữ liệu, rút lại sự đồng ý, và phản đối hoặc hạn chế việc xử lý dữ liệu. Hãy gửi yêu cầu tới ${CONTACT_EMAIL}; chúng tôi có thể cần xác minh danh tính của bạn trước khi thực hiện.`,
      ],
    },
    {
      id: 'children',
      heading: '9. Trẻ em',
      paragraphs: [
        `${APP_NAME} không dành cho người dưới 16 tuổi và chúng tôi không cố ý thu thập dữ liệu của trẻ em. Nếu bạn cho rằng một trẻ em đã tạo tài khoản, hãy liên hệ để chúng tôi xóa dữ liệu đó.`,
      ],
    },
    {
      id: 'changes',
      heading: '10. Thay đổi chính sách',
      paragraphs: [
        'Khi chính sách thay đổi, chúng tôi cập nhật ngày ở đầu trang. Với thay đổi quan trọng, chúng tôi sẽ thông báo trong ứng dụng hoặc qua email.',
      ],
    },
    {
      id: 'contact',
      heading: '11. Liên hệ',
      paragraphs: [
        `Mọi câu hỏi về quyền riêng tư, vui lòng gửi email tới ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};

export const PRIVACY_PAGE_DESCRIPTION =
  'Chính sách quyền riêng tư của Leak App: dữ liệu chúng tôi thu thập, cách sử dụng, chia sẻ, lưu giữ và các quyền của bạn, gồm cả dữ liệu từ đăng nhập Google.';

export const PRIVACY_PAGE_TITLE = `${PRIVACY_DOCUMENT.title} | ${APP_NAME}`;
