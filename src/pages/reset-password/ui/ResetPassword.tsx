import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { ResetPasswordForm } from '@/features/auth-by-email';
import { AlertCircleIcon, LeakLogoIcon } from '@/shared/icons';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
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
            <h2 className="text-xl font-bold text-default">Đặt lại mật khẩu</h2>
            <p className="text-xs text-hint mt-1">
              Nhập mật khẩu mới cho tài khoản của bạn
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

          {!token ? (
            <div className="space-y-4 text-center">
              <div className="p-4 rounded-2xl bg-error-container/20 border border-error-container/40 text-xs text-on-error-container leading-relaxed">
                <p className="font-semibold mb-1">
                  Liên kết không hợp lệ hoặc thiếu mã xác thực.
                </p>
                <p className="opacity-80">
                  Vui lòng yêu cầu một liên kết đặt lại mật khẩu mới từ hệ
                  thống.
                </p>
              </div>

              <Link
                to="/forgot-password"
                className="btn btn-primary w-full rounded-2xl font-bold text-sm text-on-primary hover:bg-primary-hover border-none transition-all"
              >
                Yêu cầu liên kết mới
              </Link>
            </div>
          ) : (
            <ResetPasswordForm
              token={token}
              onAuthError={setError}
              onClearError={() => setError(null)}
            />
          )}

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
