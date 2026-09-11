import { RegisterWithEmailForm } from '@/features/auth-by-email';
import { GoogleSignIn } from '@/features/auth-with-google';
import { AlertCircleIcon, LeakLogoIcon } from '@/shared/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-default overflow-hidden px-4 py-12">
      {/* Blur Background Highlights */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary opacity-[0.04] blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-secondary opacity-[0.04] blur-[120px]"></div>

      {/* Main Auth Container */}
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

        {/* Flat Auth Card with no border */}
        <div className="w-full backdrop-blur-xl p-4">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-default">
              Đăng ký tài khoản
            </h2>
            <p className="text-xs text-hint mt-1">
              Tạo tài khoản mới để bắt đầu quản lý tài chính
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

          {/* Email/Password Registration Form */}
          <RegisterWithEmailForm
            onAuthError={setError}
            onClearError={() => setError(null)}
          />

          {/* Login Link */}
          <div className="mt-4 text-center text-xs text-hint">
            Đã có tài khoản?{' '}
            <Link
              to="/login"
              className="link link-hover text-primary font-semibold"
            >
              Đăng nhập
            </Link>
          </div>

          {/* Or Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="w-full border-t border-default/20"></div>
            <span className="absolute bg-card px-3 text-xs text-hint font-medium">
              hoặc
            </span>
          </div>

          {/* Google Sign-in Button */}
          <GoogleSignIn onAuthError={setError} />
        </div>
      </div>
    </div>
  );
}
