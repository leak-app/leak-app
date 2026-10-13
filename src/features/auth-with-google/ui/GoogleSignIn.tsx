import { useAuthStore } from '@/entities/auth';
import { apiClient, type BaseResponseModel } from '@/shared/api';
import { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from '../GoogleLogin';

// Google only accepts a button width between 200 and 400 px.
const GOOGLE_BUTTON_MIN_WIDTH = 200;
const GOOGLE_BUTTON_MAX_WIDTH = 400;

interface GoogleSignInProps {
  onAuthError: (errorMsg: string) => void;
}

export function GoogleSignIn({ onAuthError }: GoogleSignInProps) {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [buttonWidth, setButtonWidth] = useState<number>();

  // Google draws the button in its own iframe, so stretching the iframe with CSS does not
  // stretch the button. Ask Google for the width the layout actually has instead.
  useLayoutEffect(() => {
    const available = containerRef.current?.clientWidth ?? 0;
    setButtonWidth(
      Math.min(
        GOOGLE_BUTTON_MAX_WIDTH,
        Math.max(GOOGLE_BUTTON_MIN_WIDTH, available)
      )
    );
  }, []);

  const handleGoogleSuccess = async (googleResponse: any) => {
    setLoading(true);
    try {
      const response = await apiClient
        .post<BaseResponseModel<{ accessToken: string }>>(
          '/auth/google-sign-in',
          {
            credentialToken: googleResponse.credential,
          }
        )
        .then((res) => res.data);
      if (response && response.success && response.data?.accessToken) {
        setAccessToken(response.data.accessToken);
        navigate('/overview');
      } else {
        onAuthError('Không thể xác thực với Google.');
      }
    } catch (err: any) {
      console.error(err);
      onAuthError(
        err?.error?.message ||
          (Array.isArray(err?.message) ? err.message[0] : err?.message) ||
          'Xác thực Google thất bại'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex min-h-[40px] w-full justify-center [color-scheme:light]"
    >
      {loading ? (
        <span className="loading loading-spinner loading-md text-primary"></span>
      ) : (
        buttonWidth && (
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => onAuthError('Xác thực Google thất bại')}
            theme="filled_black"
            shape="circle"
            size="large"
            width={buttonWidth}
          />
        )
      )}
    </div>
  );
}
