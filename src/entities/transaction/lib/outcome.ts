import type {
  LeakReason,
  OutcomeIconName,
  ReviewableOutcome,
  SpendOutcome,
} from '../model/types';

export const OUTCOME_META: Record<
  SpendOutcome,
  { label: string; badgeClass: string; icon: OutcomeIconName }
> = {
  UNREVIEWED: {
    label: 'Chưa đánh giá',
    badgeClass: 'badge badge-outline text-on-surface-variant',
    icon: 'circle-dashed',
  },
  WORTH_IT: {
    label: 'Đáng giá',
    badgeClass: 'badge badge-success badge-soft',
    icon: 'check',
  },
  NEUTRAL: {
    label: 'Bình thường',
    badgeClass: 'badge badge-ghost',
    icon: 'minus',
  },
  LEAK: {
    label: 'Rò rỉ',
    badgeClass: 'badge badge-error badge-soft',
    icon: 'trending-down',
  },
};

export const LEAK_REASON_LABELS: Record<LeakReason, string> = {
  IMPULSIVE: 'Bốc đồng',
  UNUSED: 'Mua về không dùng',
  OVERPRICED: 'Quá đắt so với giá trị',
  SOCIAL_PRESSURE: 'Áp lực xã hội',
  FORGOTTEN_SUB: 'Quên hủy đăng ký',
  OTHER: 'Lý do khác',
};

export const OUTCOME_OPTIONS: {
  value: ReviewableOutcome;
  label: string;
  icon: OutcomeIconName;
  buttonClass: string;
}[] = [
  {
    value: 'WORTH_IT',
    label: 'Đáng giá',
    icon: 'check',
    buttonClass: 'btn-success btn-soft',
  },
  {
    value: 'NEUTRAL',
    label: 'Bình thường',
    icon: 'minus',
    buttonClass: 'btn-ghost border-outline/20',
  },
  {
    value: 'LEAK',
    label: 'Rò rỉ',
    icon: 'trending-down',
    buttonClass: 'btn-error btn-soft',
  },
];

export const LEAK_REASON_OPTIONS = (
  Object.keys(LEAK_REASON_LABELS) as LeakReason[]
).map((value) => ({ value, label: LEAK_REASON_LABELS[value] }));

export const OUTCOME_FILTER_OPTIONS: { value?: SpendOutcome; label: string }[] =
  [
    { label: 'Tất cả' },
    { value: 'UNREVIEWED', label: 'Chưa đánh giá' },
    { value: 'WORTH_IT', label: 'Đáng giá' },
    { value: 'NEUTRAL', label: 'Bình thường' },
    { value: 'LEAK', label: 'Rò rỉ' },
  ];

/** Accepts only known outcomes; anything else (e.g. a hand-edited URL) becomes undefined. */
export function parseSpendOutcome(
  value: string | null
): SpendOutcome | undefined {
  return value && value in OUTCOME_META ? (value as SpendOutcome) : undefined;
}
