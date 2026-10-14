import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ForgotPasswordForm } from '@/features/auth-by-email';
import { AlertCircleIcon, LeakLogoIcon } from '@/shared/icons';

export default function ForgotPassword() {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-default overflow-hidden px-4 py-12">
      {/* Blur Background Highlights */}
      <div className="absolute top-[-10%] left-[-10%] h-125 w-125 rounded-full bg-primary opacity-[0.04] blur-[7.5rem]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] h-125 w-125 rounded-full bg-secondary opacity-[0.04] blur-[7.5rem]"></div>

      {/* Main Container */}
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Header Branding */}
        <div className="mb-6 flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary/15 to-secondary/15 border border-primary/20 shadow-lg shadow-primary/5">
            <LeakLogoIcon
              size={32}
              className="text-primary"
            />
          </div>
          <h1 className="mt-3 font-bold text-2xl tracking-wider text-default">
            LEAK
          </h1>
          <p className="text-xs text-hint mt-0.5">
            Quản lý Tài chính & Đầu tư Cá nhân
          </p>
        </div>

        {/* Card */}
        <div className="w-full backdrop-blur-xl p-4">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-default">Quên mật khẩu</h2>
            <p className="text-xs text-hint mt-1">
              Nhập email của bạn để nhận liên kết đặt lại mật khẩu
            </p>
          </div>

          {error && (
            <div className="alert alert-error mb-4 py-2.5 px-3 text-xs text-on-error-container bg-error-container/20 border border-error-container/40">
              <AlertCircleIcon
                size={18}
                className="shrink-0 stroke-current"
              />
              <span>{error}</span>
            </div>
          )}

          <ForgotPasswordForm
            onAuthError={setError}
            onClearError={() => setError(null)}
          />

          <div className="mt-6 text-center text-xs text-hint">
            <Link
              to="/login"
              className="link link-hover text-primary font-semibold"
            >
              Quay lại đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
