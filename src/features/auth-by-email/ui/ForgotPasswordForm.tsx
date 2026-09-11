import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { apiClient, type BaseResponseModel } from '@/shared/api';
import { MailIcon } from '@/shared/icons';

import {
  forgotPasswordSchema,
  type ForgotPasswordSchemaType,
} from '../models/forgot-password.schema';

interface ForgotPasswordFormProps {
  onAuthError: (errorMsg: string) => void;
  onClearError: () => void;
}

export function ForgotPasswordForm({
  onAuthError,
  onClearError,
}: ForgotPasswordFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const mutation = useMutation<
    BaseResponseModel<{ message: string }>,
    any,
    ForgotPasswordSchemaType
  >({
    mutationFn: async (payload) => {
      return apiClient
        .post('/auth/forgot-password', payload)
        .then((res) => res.data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
    },
    onError: (err: any) => {
      console.error(err);
      onAuthError(
        err?.error?.message ||
          (Array.isArray(err?.message) ? err.message[0] : err?.message) ||
          'Không thể gửi yêu cầu đặt lại mật khẩu. Vui lòng thử lại sau.'
      );
    },
  });

  const onSubmit = (data: ForgotPasswordSchemaType) => {
    onClearError();
    mutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="space-y-4 text-center">
        <div className="p-4 rounded-2xl bg-success-container/20 border border-success-container/40 text-xs text-on-surface leading-relaxed">
          <p className="font-semibold text-primary mb-1">
            Đã gửi yêu cầu thành công!
          </p>
          <p className="text-hint">
            Nếu email của bạn tồn tại trong hệ thống, hướng dẫn đặt lại mật khẩu
            đã được gửi. Vui lòng kiểm tra hộp thư của bạn (kể cả thư mục Spam).
          </p>
        </div>

        <Link
          to="/login"
          className="btn btn-outline btn-primary w-full rounded-2xl font-bold text-sm border transition-all"
        >
          Quay lại đăng nhập
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
          <MailIcon
            size={18}
            className="opacity-60 text-hint"
          />
          <input
            type="email"
            className="grow text-sm text-default placeholder-hint focus:outline-none"
            placeholder="Email đã đăng ký"
            {...register('email')}
          />
        </label>
        {errors.email && (
          <span className="text-xs text-error mt-1 px-1">
            {errors.email.message}
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
          'Gửi yêu cầu đặt lại'
        )}
      </button>
    </form>
  );
}
