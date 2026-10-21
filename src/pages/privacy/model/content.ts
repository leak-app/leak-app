import {
  APP_NAME,
  APP_URL,
  CONTACT_EMAIL,
} from '@/shared/configs/app-info.config';
import type { LegalDocumentModel } from '@/shared/ui';

const PRIVACY_UPDATED_LABEL = 'Cập nhật lần cuối: 21 tháng 10, 2026';

export const PRIVACY_DOCUMENT: LegalDocumentModel = {
  title: 'Chính sách quyền riêng tư',
  updatedAtLabel: PRIVACY_UPDATED_LABEL,
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
        'Cấu hình đồng bộ Google Sheets (chỉ khi bạn bật): email của tài khoản Google đã kết nối, mã làm mới được mã hóa và mã định danh của bảng tính do Leak tạo trong Drive của bạn.',
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
        'Đồng bộ Google Sheets là tính năng tùy chọn và mặc định tắt. Chỉ khi bạn tự bật trong mục Hồ sơ và đồng ý trên màn hình cấp quyền của Google, Leak App mới tạo một bảng tính mới trong Google Drive của bạn và, mỗi ngày vào lúc 00:00 (giờ Việt Nam), ghi một bản sao dữ liệu của bạn vào bảng tính đó. Việc đồng bộ chỉ theo một chiều: dữ liệu trong bảng tính không được ghi ngược lại vào Leak App.',
        'Dữ liệu được ghi vào bảng tính gồm: giao dịch (ngày, loại, số tiền, danh mục, ví, mô tả, đánh giá và lý do rò rỉ), ví và số dư, ngân sách và mục tiêu tiết kiệm.',
      ],
      items: [
        'Quyền truy cập chúng tôi yêu cầu: https://www.googleapis.com/auth/drive.file, chỉ cho phép truy cập các tệp do chính Leak App tạo, không đọc, liệt kê hay sửa các tệp khác trong Google Drive của bạn; cùng quyền cơ bản openid và email để biết bạn đang kết nối tài khoản Google nào.',
        'Mã làm mới (refresh token) do Google cấp được lưu trong cơ sở dữ liệu của chúng tôi ở dạng mã hóa AES-256-GCM, chỉ dùng để chạy đồng bộ cho bạn, không gửi tới trình duyệt và không ghi vào nhật ký.',
        'Bạn có thể tắt đồng bộ bất cứ lúc nào bằng công tắc trong Hồ sơ, hoặc chọn "Ngắt kết nối" để chúng tôi thu hồi quyền tại Google và xóa mã làm mới khỏi hệ thống. Bảng tính đã tạo vẫn nằm trong Google Drive của bạn và do bạn quản lý.',
        'Bạn cũng có thể thu hồi quyền truy cập tại https://myaccount.google.com/permissions; khi đó đồng bộ sẽ dừng.',
        'Dữ liệu nhận được từ Google chỉ được dùng để cung cấp tính năng này; không bán, không chuyển cho bên thứ ba và không dùng cho quảng cáo.',
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
      id: 'quick-log-ai',
      heading: '5. Nhập nhanh, Bạn thân AI và Gemini của Google',
      paragraphs: [
        'Ô nhập nhanh cho phép bạn gõ một câu như "hai lăm nghìn xe ôm" để điền sẵn biểu mẫu giao dịch. Phần lớn câu được ứng dụng tự đọc ngay trên máy chủ của chúng tôi. Chỉ khi ứng dụng không tự xác định được số tiền hoặc danh mục, chúng tôi mới nhờ Gemini API của Google đọc giúp câu đó.',
        'Tính năng "Bạn thân AI" thỉnh thoảng nhờ Gemini viết một câu nhận xét ngắn về một khoản chi bạn vừa ghi. Việc này chạy nền, chỉ với một số ít khoản chi (ví dụ chi vượt ngân sách, chi vào đêm muộn hoặc chi lớn bất thường), tối đa vài lần mỗi ngày.',
      ],
      items: [
        'Dữ liệu được gửi đi: chính câu bạn vừa gõ và tên các danh mục của bạn. Chúng tôi không gửi ví, số dư, email, lịch sử giao dịch hay bất kỳ thông tin nào khác.',
        'Gemini chỉ trả về số tiền, loại giao dịch và tên một danh mục có sẵn của bạn. Kết quả chỉ điền sẵn vào biểu mẫu để bạn xem lại; không có giao dịch nào được lưu cho tới khi bạn bấm lưu.',
        'Google lưu lời nhắc và phản hồi trong một thời gian giới hạn để phát hiện lạm dụng và có thể xử lý chúng ở các quốc gia khác. Chúng tôi dùng khóa API của gói trả phí, theo đó Google cho biết không dùng nội dung này để huấn luyện mô hình của họ.',
        'Chúng tôi không ghi câu bạn gõ vào nhật ký máy chủ khi gọi Gemini, và giới hạn số lần gọi của mỗi tài khoản.',
        'Bạn có thể tránh việc này hoàn toàn bằng cách không dùng ô nhập nhanh và điền biểu mẫu thủ công. Vì câu được gửi đi nguyên văn, đừng gõ tên người, số tài khoản hay thông tin nhạy cảm vào ô nhập nhanh.',
        'Dữ liệu gửi đi cho nhận xét này: số tiền, tên danh mục, ghi chú của khoản chi (tối đa 80 ký tự đầu), giờ ghi và mức đã dùng của ngân sách danh mục. Chúng tôi không gửi tên, email, ví hay số dư.',
        'Nhận xét được lưu cùng giao dịch và chỉ hiển thị cho bạn. Trong Hồ sơ cá nhân, bạn có thể chuyển sang "Tích cực nhẹ nhàng" hoặc chọn "Tắt"; khi tắt, không có dữ liệu nào được gửi đi cho tính năng này.',
        'Vì ghi chú được gửi đi nguyên văn, đừng ghi tên người, số tài khoản hay thông tin nhạy cảm vào ghi chú giao dịch. Chúng tôi không ghi ghi chú hay nhận xét vào nhật ký máy chủ.',
      ],
    },
    {
      id: 'sharing',
      heading: '6. Chia sẻ dữ liệu',
      paragraphs: [
        'Chúng tôi không bán hay cho thuê dữ liệu cá nhân. Dữ liệu chỉ được xử lý bởi các bên sau khi thật sự cần thiết:',
      ],
      items: [
        'Google: cung cấp đăng nhập bằng Google và, nếu bạn bật, tính năng xuất sang Google Sheets. Phông chữ của ứng dụng được tải từ Google Fonts, nên trình duyệt của bạn gửi yêu cầu (gồm địa chỉ IP) tới Google khi mở trang.',
        'Google (Gemini API): đọc giúp câu nhập nhanh mà ứng dụng không tự hiểu được và viết nhận xét "Bạn thân AI", như mô tả ở mục 5.',
        'Nhà cung cấp dịch vụ gửi email: chỉ để gửi thư đặt lại mật khẩu và thông báo tài khoản.',
        'Cơ quan nhà nước có thẩm quyền, khi pháp luật yêu cầu.',
      ],
    },
    {
      id: 'security',
      heading: '7. Lưu trữ và bảo mật',
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
      heading: '8. Thời gian lưu giữ và xóa dữ liệu',
      items: [
        'Chúng tôi lưu dữ liệu trong thời gian tài khoản của bạn còn hoạt động.',
        'Khi bạn xóa giao dịch, ví hoặc danh mục trong ứng dụng, mục đó được đánh dấu là đã xóa và ẩn khỏi giao diện, nhưng vẫn được lưu để số dư và báo cáo luôn nhất quán.',
        'Khi bạn chọn "Ngắt kết nối" Google Sheets, mã làm mới và mã định danh bảng tính bị xóa khỏi hệ thống ngay lập tức.',
        `Để xóa hoàn toàn tài khoản và toàn bộ dữ liệu, hãy gửi email tới ${CONTACT_EMAIL} từ địa chỉ email đã đăng ký. Chúng tôi xử lý yêu cầu trong vòng 30 ngày.`,
        'Bản sao đã xuất sang Google Sheets nằm trong tài khoản Google của bạn và do bạn tự quản lý.',
      ],
    },
    {
      id: 'rights',
      heading: '9. Quyền của bạn',
      paragraphs: [
        `Bạn có quyền truy cập và nhận bản sao dữ liệu, chỉnh sửa dữ liệu không chính xác, yêu cầu xóa dữ liệu, rút lại sự đồng ý, và phản đối hoặc hạn chế việc xử lý dữ liệu. Hãy gửi yêu cầu tới ${CONTACT_EMAIL}; chúng tôi có thể cần xác minh danh tính của bạn trước khi thực hiện.`,
      ],
    },
    {
      id: 'children',
      heading: '10. Trẻ em',
      paragraphs: [
        `${APP_NAME} không dành cho người dưới 16 tuổi và chúng tôi không cố ý thu thập dữ liệu của trẻ em. Nếu bạn cho rằng một trẻ em đã tạo tài khoản, hãy liên hệ để chúng tôi xóa dữ liệu đó.`,
      ],
    },
    {
      id: 'changes',
      heading: '11. Thay đổi chính sách',
      paragraphs: [
        'Khi chính sách thay đổi, chúng tôi cập nhật ngày ở đầu trang. Với thay đổi quan trọng, chúng tôi sẽ thông báo trong ứng dụng hoặc qua email.',
      ],
    },
    {
      id: 'contact',
      heading: '12. Liên hệ',
      paragraphs: [
        `Mọi câu hỏi về quyền riêng tư, vui lòng gửi email tới ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};

export const PRIVACY_PAGE_DESCRIPTION =
  'Chính sách quyền riêng tư của Leak App: dữ liệu chúng tôi thu thập, cách sử dụng, chia sẻ, lưu giữ và các quyền của bạn, gồm cả dữ liệu từ đăng nhập Google và nhập nhanh bằng Gemini.';

export const PRIVACY_PAGE_TITLE = `${PRIVACY_DOCUMENT.title} | ${APP_NAME}`;
