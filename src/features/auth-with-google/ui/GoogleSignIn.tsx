import { useAuthStore } from '@/entities/auth';
import { apiClient, type BaseResponseModel } from '@/shared/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from '../GoogleLogin';

interface GoogleSignInProps {
  onAuthError: (errorMsg: string) => void;
}

export function GoogleSignIn({ onAuthError }: GoogleSignInProps) {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const [loading, setLoading] = useState(false);

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
    <div className="w-full [&>div]:w-full! [&_iframe]:w-full! [&_iframe]:mx-auto! flex justify-center min-h-[40px]">
      {loading ? (
        <span className="loading loading-spinner loading-md text-primary"></span>
      ) : (
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => onAuthError('Xác thực Google thất bại')}
          theme="filled_black"
          shape="circle"
          size="large"
        />
      )}
    </div>
  );
}
