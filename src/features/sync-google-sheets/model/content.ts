/** User-facing strings of the Google Sheets sync card. */
export const SHEETS_SYNC_COPY = {
  title: 'Đồng bộ Google Sheets',
  toggleLabel: 'Bật đồng bộ Google Sheets',
  disclosure:
    'Khi bật, mỗi ngày lúc 00:00 Leak ghi một bản sao giao dịch, ví, ngân sách và mục tiêu của bạn vào một bảng tính mới trong Google Drive của bạn. Leak chỉ truy cập bảng tính do chính Leak tạo.',
  privacyLink: 'Xem chính sách quyền riêng tư',
  reconnectBanner:
    'Leak không còn quyền truy cập Google của bạn. Hãy kết nối lại để tiếp tục đồng bộ.',
  reconnect: 'Kết nối lại',
  runNow: 'Đồng bộ ngay',
  openSheet: 'Mở bảng tính',
  disconnect: 'Ngắt kết nối',
  disconnectConfirm:
    'Thu hồi quyền truy cập và xóa kết nối? Bảng tính vẫn nằm trong Google Drive của bạn.',
  disconnectYes: 'Ngắt kết nối',
  cancel: 'Hủy',
  loadError: 'Không tải được trạng thái đồng bộ',
  retry: 'Thử lại',
  dismiss: 'Đóng',
  actionError: 'Thao tác thất bại. Vui lòng thử lại.',
} as const;

/** Optional Apps Script that builds the report tabs inside the user's own spreadsheet. */
export const REPORT_SCRIPT_COPY = {
  title: 'Báo cáo nâng cao (Apps Script)',
  intro:
    'Tùy chọn: dán một đoạn Apps Script vào bảng tính để dựng sẵn các tab báo cáo (tổng quan, theo tháng, ngân sách, rò rỉ, tài khoản, mục tiêu). Script chạy trong tài khoản Google của bạn; Leak không xem script và không nhận thêm quyền nào.',
  copy: 'Sao chép script',
  copied: 'Đã sao chép',
  copyFailed: 'Không sao chép được, hãy tải file',
  download: 'Tải file .gs',
  stepsLabel: 'Các bước cài đặt',
  steps: [
    'Mở bảng tính, chọn Tiện ích mở rộng → Apps Script.',
    'Xóa đoạn mã mẫu, dán script vừa sao chép rồi bấm Lưu.',
    'Chọn hàm buildTemplate ở danh sách hàm rồi bấm Chạy.',
    'Google sẽ hỏi quyền một lần. Với script của chính bạn, hãy chọn Nâng cao → Đi tới … (không an toàn) là bình thường.',
    'Tải lại bảng tính: menu Leak xuất hiện để dựng lại báo cáo.',
  ],
  demoWarning:
    'Mục "Nạp dữ liệu mẫu" trong menu Leak ghi dữ liệu giả vào các tab bắt đầu bằng "_" để xem thử. Lần đồng bộ kế tiếp sẽ ghi đè lại bằng dữ liệu thật.',
} as const;
