import type { ChoiceTone } from '@/shared/ui';

import type { ReviewableOutcome } from '@/entities/transaction';

export interface ReflectionChoice {
  value: ReviewableOutcome;
  tone: ChoiceTone;
  label: string;
  hint: string;
}

export const REFLECTION_CHOICES: readonly ReflectionChoice[] = [
  {
    value: 'WORTH_IT',
    tone: 'worth',
    label: 'Đáng giá',
    hint: 'Mang lại niềm vui hoặc giá trị thật',
  },
  {
    value: 'NEUTRAL',
    tone: 'neutral',
    label: 'Bình thường',
    hint: 'Chi tiêu cần thiết, không có gì đặc biệt',
  },
  {
    value: 'LEAK',
    tone: 'leak',
    label: 'Rò rỉ',
    hint: 'Bốc đồng, lãng phí hoặc không đáng',
  },
];

export const REFLECTION_COPY = {
  question: 'Nhìn lại, khoản chi này…',
  reasonPrompt: 'Vì sao? (không bắt buộc)',
  reasonsLabel: 'Lý do rò rỉ',
  skip: 'Bỏ qua',
  saveError: 'Không thể lưu đánh giá. Vui lòng thử lại.',
  close: 'Đóng',
} as const;
