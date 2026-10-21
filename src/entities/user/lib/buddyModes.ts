import type { BuddyMode, BuddyModeOptionModel } from '../model/types';

export const DEFAULT_BUDDY_MODE: BuddyMode = 'SAVAGE';

export const BUDDY_MODE_OPTIONS: BuddyModeOptionModel[] = [
  {
    value: 'SAVAGE',
    label: 'Cà khịa gắt',
    hint: 'Khen thật lòng, chê thẳng thừng như một người bạn thân.',
  },
  {
    value: 'GENTLE',
    label: 'Tích cực nhẹ nhàng',
    hint: 'Chỉ khen và nhắc nhẹ, không cà khịa.',
  },
  {
    value: 'MUTE',
    label: 'Tắt',
    hint: 'Không có nhận xét nào về chi tiêu của bạn.',
  },
];

export function describeBuddyMode(mode: BuddyMode): BuddyModeOptionModel {
  return (
    BUDDY_MODE_OPTIONS.find((option) => option.value === mode) ??
    BUDDY_MODE_OPTIONS[0]
  );
}
