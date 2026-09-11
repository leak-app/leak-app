import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { apiClient, type BaseResponseModel } from '@/shared/api';
import { LockIcon } from '@/shared/icons';

import {
  resetPasswordSchema,
  type ResetPasswordSchemaType,
} from '../models/reset-password.schema';

interface ResetPasswordFormProps {
  token: string;
  onAuthError: (errorMsg: string) => void;
  onClearError: () => void;
}

export function ResetPasswordForm({
  token,
  onAuthError,
  onClearError,
}: ResetPasswordFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const mutation = useMutation<
    BaseResponseModel<{ message: string }>,
    any,
    { password: string }
  >({
    mutationFn: async ({ password }) => {
      return apiClient
        .post('/auth/reset-password', { token, password })
        .then((res) => res.data);
    },
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: (err: any) => {
      console.error(err);
      onAuthError(
        err?.error?.message ||
          (Array.isArray(err?.message) ? err.message[0] : err?.message) ||
          'Không thể đặt lại mật khẩu. Liên kết có thể đã hết hạn hoặc không hợp lệ.'
      );
    },
  });

  const onSubmit = (data: ResetPasswordSchemaType) => {
    onClearError();
    mutation.mutate({ password: data.password });
  };

  if (isSuccess) {
    return (
      <div className="space-y-4 text-center">
        <div className="p-4 rounded-2xl bg-success-container/20 border border-success-container/40 text-xs text-on-surface leading-relaxed">
          <p className="font-semibold text-primary mb-1">
            Đặt lại mật khẩu thành công!
          </p>
          <p className="text-hint">
            Mật khẩu mới của bạn đã được cập nhật. Bạn có thể đăng nhập ngay bây
            giờ.
          </p>
        </div>

        <Link
          to="/login"
          className="btn btn-primary w-full rounded-2xl font-bold text-sm text-on-primary hover:bg-primary-hover border-none transition-all shadow-md shadow-primary/10"
        >
          Đến trang đăng nhập
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div className="form-control w-full">
        <label className="input flex items-center gap-2 rounded-2xl bg-input-default/60 border-none transition-all py-3 px-4 shadow-inner">
          <LockIcon
            size={18}
            className="opacity-60 text-hint"
          />
          <input
            type="password"
            className="grow text-sm text-default placeholder-hint focus:outline-none"
            placeholder="Mật khẩu mới"
            {...register('password')}
          />
        </label>
        {errors.password && (
          <span className="text-xs text-error mt-1 px-1">
            {errors.password.message}
          </span>
        )}
        <span className="text-xs text-hint mt-1 px-1">
          Ít nhất 6 ký tự, chứa chữ thường và chữ hoa
        </span>
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
            placeholder="Xác nhận mật khẩu mới"
            {...register('confirmPassword')}
          />
        </label>
        {errors.confirmPassword && (
          <span className="text-xs text-error mt-1 px-1">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="btn btn-primary w-full rounded-2xl font-bold mt-2 text-on-primary hover:bg-primary-hover disabled:bg-primary/30 disabled:text-on-primary/50 border-none transition-all shadow-md shadow-primary/10"
      >
        {mutation.isPending ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          'Lưu mật khẩu mới'
        )}
      </button>
    </form>
  );
}
