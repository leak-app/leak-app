import {
  APP_NAME,
  APP_URL,
  CONTACT_EMAIL,
  LEGAL_UPDATED_LABEL,
} from '@/shared/configs/app-info.config';
import type { LegalDocumentModel } from '@/shared/ui';

export const TERMS_DOCUMENT: LegalDocumentModel = {
  title: 'Điều khoản dịch vụ',
  updatedAtLabel: LEGAL_UPDATED_LABEL,
  intro: `Khi tạo tài khoản hoặc sử dụng ${APP_NAME} tại ${APP_URL}, bạn đồng ý với các điều khoản dưới đây. Nếu bạn không đồng ý, vui lòng không sử dụng dịch vụ.`,
  sections: [
    {
      id: 'service',
      heading: '1. Dịch vụ là gì',
      paragraphs: [
        `${APP_NAME} là công cụ ghi chép chi tiêu cá nhân giúp bạn theo dõi thu chi, nhìn lại từng khoản chi, phát hiện các khoản rò rỉ, đặt ngân sách và mục tiêu tiết kiệm. Dịch vụ không phải là lời khuyên về tài chính, đầu tư, thuế hay pháp lý. Mọi quyết định tài chính là của riêng bạn.`,
      ],
    },
    {
      id: 'account',
      heading: '2. Tài khoản',
      items: [
        'Bạn phải từ đủ 16 tuổi trở lên để tạo tài khoản.',
        'Bạn cung cấp thông tin chính xác và tự bảo mật mật khẩu cũng như các thiết bị đã đăng nhập.',
        'Bạn chịu trách nhiệm về hoạt động diễn ra trong tài khoản của mình. Hãy báo cho chúng tôi ngay nếu nghi ngờ bị truy cập trái phép.',
      ],
    },
    {
      id: 'your-data',
      heading: '3. Dữ liệu của bạn',
      paragraphs: [
        'Dữ liệu bạn nhập vào ứng dụng vẫn thuộc về bạn. Bạn cấp cho chúng tôi quyền hạn chế để lưu trữ và xử lý dữ liệu đó nhằm vận hành dịch vụ cho bạn. Cách chúng tôi thu thập và sử dụng dữ liệu được mô tả trong Chính sách quyền riêng tư.',
        'Số liệu hiển thị trong ứng dụng do bạn tự nhập; bạn chịu trách nhiệm kiểm tra tính chính xác của chúng.',
      ],
    },
    {
      id: 'acceptable-use',
      heading: '4. Sử dụng hợp lệ',
      paragraphs: ['Bạn không được:'],
      items: [
        'sử dụng dịch vụ vào mục đích trái pháp luật;',
        'truy cập tài khoản hoặc dữ liệu của người khác;',
        'dò quét, tấn công, làm quá tải hoặc cố gắng vượt qua các biện pháp bảo mật của dịch vụ;',
        'sao chép, bán lại hoặc khai thác dịch vụ thương mại khi chưa có sự đồng ý bằng văn bản.',
      ],
    },
    {
      id: 'google',
      heading: '5. Tích hợp Google',
      paragraphs: [
        'Đăng nhập bằng Google và xuất dữ liệu sang Google Sheets là các tính năng tùy chọn. Khi sử dụng, bạn cũng chịu sự điều chỉnh của điều khoản dịch vụ của Google. Bạn có thể thu hồi quyền truy cập bất cứ lúc nào tại https://myaccount.google.com/permissions; khi đó các tính năng này sẽ ngừng hoạt động nhưng tài khoản của bạn vẫn dùng được.',
      ],
    },
    {
      id: 'availability',
      heading: '6. Tình trạng dịch vụ',
      paragraphs: [
        'Dịch vụ được cung cấp “nguyên trạng” và “như hiện có”. Chúng tôi cố gắng duy trì hoạt động ổn định nhưng không cam kết dịch vụ luôn liên tục hoặc không có lỗi. Chúng tôi có thể thay đổi, tạm ngừng hoặc ngừng một phần dịch vụ; với thay đổi lớn, chúng tôi sẽ thông báo trước khi có thể.',
        'Bạn nên giữ bản sao dữ liệu quan trọng của mình, ví dụ bằng tính năng xuất sang Google Sheets.',
      ],
    },
    {
      id: 'liability',
      heading: '7. Giới hạn trách nhiệm',
      paragraphs: [
        'Trong phạm vi pháp luật cho phép, chúng tôi không chịu trách nhiệm về các thiệt hại gián tiếp, mất mát dữ liệu hoặc thiệt hại tài chính phát sinh từ việc sử dụng hay không thể sử dụng dịch vụ, bao gồm các quyết định tài chính dựa trên số liệu trong ứng dụng. Điều này không loại trừ các trách nhiệm mà pháp luật không cho phép loại trừ.',
      ],
    },
    {
      id: 'termination',
      heading: '8. Chấm dứt',
      paragraphs: [
        `Bạn có thể ngừng sử dụng dịch vụ và yêu cầu xóa tài khoản bất cứ lúc nào bằng cách gửi email tới ${CONTACT_EMAIL}. Chúng tôi có thể tạm khóa hoặc chấm dứt tài khoản vi phạm các điều khoản này. Việc xử lý dữ liệu sau khi chấm dứt tuân theo Chính sách quyền riêng tư.`,
      ],
    },
    {
      id: 'governing-law',
      heading: '9. Luật áp dụng',
      paragraphs: [
        'Các điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Tranh chấp phát sinh sẽ được ưu tiên giải quyết thông qua thương lượng.',
      ],
    },
    {
      id: 'changes',
      heading: '10. Thay đổi điều khoản',
      paragraphs: [
        'Chúng tôi có thể cập nhật các điều khoản này. Ngày cập nhật được ghi ở đầu trang; với thay đổi quan trọng, chúng tôi sẽ thông báo trong ứng dụng hoặc qua email. Việc tiếp tục sử dụng dịch vụ sau khi thay đổi có hiệu lực nghĩa là bạn chấp nhận điều khoản mới.',
      ],
    },
    {
      id: 'contact',
      heading: '11. Liên hệ',
      paragraphs: [
        `Mọi câu hỏi về điều khoản, vui lòng gửi email tới ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};

export const TERMS_PAGE_DESCRIPTION =
  'Điều khoản dịch vụ của Leak App: quy định về tài khoản, dữ liệu của bạn, sử dụng hợp lệ, tích hợp Google và giới hạn trách nhiệm.';

export const TERMS_PAGE_TITLE = `${TERMS_DOCUMENT.title} | ${APP_NAME}`;
