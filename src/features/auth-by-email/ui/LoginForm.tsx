import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/entities/auth';
import { apiClient, type BaseResponseModel } from '@/shared/api';
import { LockIcon, MailIcon } from '@/shared/icons';

import { loginSchema, type LoginSchemaType } from '../models/login.schema';

interface LoginFormProps {
  onAuthError: (errorMsg: string) => void;
  onClearError: () => void;
}

export function LoginWithEmailForm({
  onAuthError,
  onClearError,
}: LoginFormProps) {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation<
    BaseResponseModel<{ accessToken: string }>,
    any,
    LoginSchemaType
  >({
    mutationFn: async (credentials) => {
      return apiClient
        .post('/auth/sign-in', credentials)
        .then((res) => res.data);
    },
    onSuccess: (response) => {
      if (response && response.success && response.data?.accessToken) {
        setAccessToken(response.data.accessToken);
        navigate('/overview');
      } else {
        onAuthError('Đăng nhập thất bại. Có lỗi hệ thống');
      }
    },
    onError: (err: any) => {
      console.error(err);
      onAuthError(
        err?.error?.message ||
          (Array.isArray(err?.message) ? err.message[0] : err?.message) ||
          'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.'
      );
    },
  });

  const onSubmit = (data: LoginSchemaType) => {
    onClearError();
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div className="form-control w-full">
        <label className="input flex items-center gap-2 rounded-2xl bg-input-default/60 border-none transition-all py-3 px-4 shadow-inner">
          <MailIcon
            size={18}
            className="opacity-60 text-hint"
          />
          <input
            type="email"
            className="grow text-sm text-default placeholder-hint focus:outline-none"
            placeholder="Email"
            {...register('email')}
          />
        </label>
        {errors.email && (
          <span className="text-xs text-error mt-1 px-1">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="form-control w-full">
        <label className="input flex items-center gap-2 rounded-2xl bg-input-default/60 border-none transition-all py-3 px-4 shadow-inner">
          <LockIcon
            size={18}
            className="opacity-60 text-hint"
          />
          <input
            type="password"
            className="grow text-sm text-default placeholder-hint focus:outline-none"
            placeholder="Mật khẩu"
            {...register('password')}
          />
        </label>
        {errors.password && (
          <span className="text-xs text-error mt-1 px-1">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-xs px-1">
        <label className="label cursor-pointer justify-start gap-2 p-0">
          <input
            type="checkbox"
            className="checkbox checkbox-xs checkbox-primary rounded"
          />
          <span className="label-text text-hint">Ghi nhớ đăng nhập</span>
        </label>

        <Link
          to="/forgot-password"
          className="link link-hover text-secondary font-medium"
        >
          Quên mật khẩu?
        </Link>
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="btn btn-primary w-full rounded-2xl font-bold mt-2 text-on-primary hover:bg-primary-hover disabled:bg-primary/30 disabled:text-on-primary/50 border-none transition-all shadow-md shadow-primary/10"
      >
        {mutation.isPending ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          'Đăng nhập'
        )}
      </button>
    </form>
  );
}
