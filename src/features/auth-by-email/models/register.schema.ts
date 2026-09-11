import { z } from 'zod';

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'Vui lòng nhập email')
    .email('Email không đúng định dạng'),
  password: z
    .string()
    .min(1, 'Vui lòng nhập mật khẩu')
    .min(6, 'Mật khẩu phải dài ít nhất 6 ký tự')
    .refine((val) => /[a-z]/.test(val) && /[A-Z]/.test(val), {
      message: 'Mật khẩu phải chứa ít nhất một chữ thường và một chữ hoa',
    }),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
