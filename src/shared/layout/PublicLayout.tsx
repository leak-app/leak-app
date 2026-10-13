import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { APP_NAME, CONTACT_EMAIL } from '@/shared/configs/app-info.config';
import { LeakLogoIcon } from '@/shared/icons';
import { PUBLIC_PATHS } from '@/shared/routing';
import { buttonStyles } from '@/shared/ui';

const FOOTER_LINK_CLASS =
  'inline-flex min-h-touch items-center text-[13px] text-muted hover:text-text';

interface PublicLayoutProps {
  children: ReactNode;
}

/** Frame for pages anyone can open: brand header, content column, legal footer. */
export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-bg text-text">
      <header className="mx-auto flex h-nav w-full max-w-3xl items-center justify-between px-container-padding">
        <Link
          to={PUBLIC_PATHS.home}
          aria-label={`${APP_NAME} - Trang chủ`}
          className="inline-flex min-h-touch items-center gap-2"
        >
          <LeakLogoIcon
            size={28}
            className="text-primary"
          />
          <span className="text-lg font-bold tracking-wider">LEAK</span>
        </Link>
        <Link
          to="/login"
          className={buttonStyles({ variant: 'ghost' })}
        >
          Đăng nhập
        </Link>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-container-padding">
        {children}
      </main>

      <footer className="mx-auto mt-8 w-full max-w-3xl border-t border-border-subtle px-container-padding py-6">
        <nav
          aria-label="Liên kết pháp lý"
          className="flex flex-wrap gap-x-6"
        >
          <Link
            to={PUBLIC_PATHS.home}
            className={FOOTER_LINK_CLASS}
          >
            Trang chủ
          </Link>
          <Link
            to={PUBLIC_PATHS.privacy}
            className={FOOTER_LINK_CLASS}
          >
            Chính sách quyền riêng tư
          </Link>
          <Link
            to={PUBLIC_PATHS.terms}
            className={FOOTER_LINK_CLASS}
          >
            Điều khoản dịch vụ
          </Link>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className={FOOTER_LINK_CLASS}
          >
            {CONTACT_EMAIL}
          </a>
        </nav>
        <p className="mt-2 text-[13px] text-subtle">{APP_NAME}</p>
      </footer>
    </div>
  );
}
