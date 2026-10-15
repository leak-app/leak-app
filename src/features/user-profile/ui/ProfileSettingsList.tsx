import { useNavigate } from 'react-router-dom';

import { usePortfolio } from '@/entities/valuation';
import { ChevronRightIcon, ICON } from '@/shared/icons';

interface SettingsItem {
  id: string;
  label: string;
  desc: string;
  to?: string;
}

const ITEMS: SettingsItem[] = [
  {
    id: 'wallets',
    label: 'Ví & tài khoản',
    desc: 'Quản lý ví tiền mặt, tài khoản ngân hàng và đầu tư',
    to: '/wallets',
  },
  {
    id: 'investment',
    label: 'Đầu tư',
    desc: 'Cập nhật số dư mỗi tháng và xem lãi lỗ',
    to: '/investment',
  },
  {
    id: 'categories',
    label: 'Quản lý danh mục',
    desc: 'Thêm, sửa, xóa các danh mục thu chi & đầu tư',
    to: '/categories',
  },
  {
    id: 'security',
    label: 'Bảo mật & Mật khẩu',
    desc: 'Thiết bị đang đăng nhập',
    to: '/profile/security',
  },
  {
    id: 'payment',
    label: 'Phương thức thanh toán',
    desc: 'Liên kết thẻ hoặc tài khoản ngân hàng',
  },
  {
    id: 'notifications',
    label: 'Thông báo ứng dụng',
    desc: 'Cấu hình thông báo và cảnh báo',
  },
  { id: 'language', label: 'Ngôn ngữ', desc: 'Tiếng Việt' },
];

/** Account settings as one glass card of rows. */
export function ProfileSettingsList() {
  const navigate = useNavigate();
  const { data: portfolio } = usePortfolio();
  const investmentNeedsUpdate = (portfolio?.entry.staleCount ?? 0) > 0;

  return (
    <section
      aria-labelledby="profile-settings-heading"
      className="flex flex-col gap-4"
    >
      <h2
        id="profile-settings-heading"
        className="text-eyebrow text-muted"
      >
        Cài đặt
      </h2>
      <div className="flex flex-col rounded-card border border-border bg-surface px-5 py-1 select-none">
        {ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={item.to ? () => navigate(item.to as string) : undefined}
            className="flex min-h-16 items-center gap-3 border-b border-border-subtle py-2 text-left last:border-b-0 focus-visible:outline-none"
          >
            <span className="flex flex-1 flex-col gap-0.5">
              <span className="text-body text-text">{item.label}</span>
              <span className="text-caption text-muted">{item.desc}</span>
            </span>
            {item.id === 'investment' && investmentNeedsUpdate && (
              <span
                role="img"
                aria-label="Có ví cần cập nhật"
                className="size-2 shrink-0 rounded-full bg-secondary"
              />
            )}
            <ChevronRightIcon
              size={ICON.size.row}
              strokeWidth={ICON.stroke.active}
              className="shrink-0 text-muted"
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
