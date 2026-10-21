import type { BuddyMode, BuddyModeOptionModel } from '@/entities/user';
import type { SelectOption } from '@/shared/ui';

export interface BuddySettingsViewModel {
  value: BuddyMode;
  options: SelectOption<BuddyMode>[];
  hint: string;
}

export function deserializeBuddySettings(
  mode: BuddyMode | undefined,
  options: BuddyModeOptionModel[]
): BuddySettingsViewModel {
  const value = mode ?? 'SAVAGE';
  const current = options.find((option) => option.value === value);
  return {
    value,
    options: options.map(({ value: optionValue, label }) => ({
      value: optionValue,
      label,
    })),
    hint: current?.hint ?? '',
  };
}
