import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Vui lòng nhập email')
    .email('Email không đúng định dạng'),
});

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
