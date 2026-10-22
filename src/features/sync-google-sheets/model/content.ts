/** User-facing strings of the Google Sheets sync card. */
export const SHEETS_SYNC_COPY = {
  eyebrow: 'Dữ liệu & đồng bộ',
  eyebrowConnected: 'Dữ liệu & đồng bộ · Google Sheets',
  title: 'Đồng bộ Google Sheets',
  subtitle: 'Một bản sao dữ liệu, trong Drive của bạn',
  pitch: [
    {
      id: 'own-file',
      lead: 'File của bạn.',
      text: 'Bảng tính nằm trong Google Drive của bạn, kể cả khi bạn ngắt kết nối.',
    },
    {
      id: 'one-file',
      lead: 'Chỉ một file.',
      text: 'Leak chỉ truy cập bảng tính do chính Leak tạo, không thấy file nào khác.',
    },
    {
      id: 'nightly',
      lead: 'Mỗi đêm lúc 00:00.',
      text: 'Giao dịch, ví, ngân sách và mục tiêu được chép sang. Sửa bảng tính không thay đổi dữ liệu trong Leak.',
    },
  ],
  connect: 'Kết nối Google',
  privacyLink: 'Xem chính sách quyền riêng tư',
  runNow: 'Đồng bộ ngay',
  openSheet: 'Mở bảng tính',
  autoSync: 'Tự đồng bộ mỗi đêm',
  account: 'Tài khoản Google',
  reports: 'Báo cáo nâng cao',
  reportsNote: 'Tùy chọn · dựng tab biểu đồ bằng Apps Script',
  disconnect: 'Ngắt kết nối Google',
  runningHeadline: 'Đang đồng bộ…',
  loadError: 'Không tải được trạng thái đồng bộ',
  unavailable: 'Đồng bộ Google Sheets chưa sẵn sàng. Bạn quay lại sau nhé.',
  retry: 'Thử lại',
  later: 'Để sau',
  dismiss: 'Đóng',
  actionError: 'Thao tác thất bại. Vui lòng thử lại.',
} as const;

/** The sheet shown before leaving for Google's consent screen. */
export const CONSENT_COPY = {
  title: 'Bạn sẽ chuyển sang Google',
  body: 'Google sẽ hỏi bạn cho phép Leak tạo một bảng tính trong Drive. Xong, Google tự đưa bạn quay lại đây.',
  steps: [
    { id: 'account', parts: ['Chọn tài khoản Google bạn muốn dùng.'] },
    {
      id: 'permission',
      parts: [
        'Cho phép quyền ',
        { strong: 'chỉ với các tệp Drive bạn dùng cùng Leak' },
        '. Leak không đọc được file nào khác.',
      ],
    },
    {
      id: 'back',
      parts: ['Quay lại Leak — lần đồng bộ đầu tiên tự bắt đầu.'],
    },
  ],
  continue: 'Tiếp tục với Google',
} as const;

/** The sheet that confirms disconnecting. */
export const DISCONNECT_COPY = {
  title: 'Ngắt kết nối Google Sheets?',
  body: 'Thu hồi quyền truy cập và xóa kết nối? Bảng tính vẫn nằm trong Google Drive của bạn.',
  keeps: ['Giữ nguyên', ' bảng tính “Leak – Dữ liệu” và mọi dữ liệu đã xuất.'],
  stops: ['Dừng', ' đồng bộ mỗi đêm và thu hồi quyền của Leak tại Google.'],
  pausePrompt: 'Muốn tạm nghỉ thôi?',
  pauseAction: 'Tắt “Tự đồng bộ mỗi đêm”',
  pauseSuffix: ' thay vì ngắt kết nối.',
  confirm: 'Ngắt kết nối',
  cancel: 'Hủy',
} as const;

export type RichPart = string | { strong: string } | { code: string };

/** The Apps Script guide that builds the report tabs inside the user's own spreadsheet. */
export const REPORT_GUIDE_COPY = {
  title: 'Báo cáo nâng cao',
  badge: 'Tùy chọn',
  intro:
    'Dán một đoạn Apps Script vào bảng tính để dựng sẵn các tab báo cáo: tổng quan, theo tháng, ngân sách, rò rỉ, tài khoản, mục tiêu.',
  trust:
    'Script chạy trong tài khoản Google của bạn; Leak không xem script và không nhận thêm quyền nào.',
  copy: 'Sao chép script',
  copied: 'Đã sao chép',
  copyFailed: 'Không sao chép được, hãy tải file',
  download: 'Tải file .gs',
  downloadName: 'build-template.gs',
  stepsLabel: 'Các bước cài đặt',
  steps: [
    {
      id: 'open',
      parts: [
        'Mở bảng tính, chọn ',
        { strong: 'Tiện ích mở rộng → Apps Script' },
        '.',
      ],
    },
    {
      id: 'paste',
      parts: [
        'Xóa đoạn mã mẫu, dán script vừa sao chép rồi bấm ',
        { strong: 'Lưu' },
        '.',
      ],
    },
    {
      id: 'run',
      parts: [
        'Chọn hàm ',
        { code: 'buildTemplate' },
        ' ở danh sách hàm rồi bấm ',
        { strong: 'Chạy' },
        '.',
      ],
    },
    {
      id: 'permission',
      parts: ['Google sẽ hỏi quyền một lần.'],
      callout: {
        title: 'Thấy cảnh báo “không an toàn”? Bình thường.',
        parts: [
          'Google cảnh báo mọi script chưa được Google duyệt — kể cả script của chính bạn. Chọn ',
          { strong: 'Nâng cao → Đi tới … (không an toàn)' },
          ' để tiếp tục.',
        ],
      },
    },
    {
      id: 'reload',
      parts: [
        'Tải lại bảng tính: menu ',
        { strong: 'Leak' },
        ' xuất hiện để dựng lại báo cáo.',
      ],
    },
  ],
  demoWarning:
    'Mục “Nạp dữ liệu mẫu” trong menu Leak ghi dữ liệu giả vào các tab bắt đầu bằng “_” để xem thử. Lần đồng bộ kế tiếp sẽ ghi đè lại bằng dữ liệu thật.',
} as const;

/** Route of the report guide page (it lives under the profile). */
export const SHEETS_REPORT_PATH = '/profile/sheets-report';
