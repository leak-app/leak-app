export type BuddyMode = 'SAVAGE' | 'GENTLE' | 'MUTE';

export interface UserPreferencesModel {
  buddyMode: BuddyMode;
}

export interface BuddyModeOptionModel {
  value: BuddyMode;
  label: string;
  hint: string;
}
