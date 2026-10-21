import {
  BUDDY_MODE_OPTIONS,
  useUpdateUserPreferences,
  useUserPreferences,
  type BuddyMode,
} from '@/entities/user';
import { getApiErrorMessage } from '@/shared/api';
import { Card, Select, useToast } from '@/shared/ui';

import { deserializeBuddySettings } from '../lib/deserialize';

/** Profile card: how talkative the Buddy is. */
export function BuddySettingsCard() {
  const { data, isLoading } = useUserPreferences();
  const { mutate, isPending, error } = useUpdateUserPreferences();
  const { showToast } = useToast();

  if (isLoading) return null;
  const settings = deserializeBuddySettings(
    data?.buddyMode,
    BUDDY_MODE_OPTIONS
  );

  const change = (buddyMode: BuddyMode) =>
    mutate({ buddyMode }, { onSuccess: () => showToast('Đã lưu') });

  return (
    <Card
      as="section"
      aria-labelledby="buddy-settings-heading"
      className="flex flex-col gap-3 border p-5"
    >
      <h2
        id="buddy-settings-heading"
        className="text-eyebrow text-muted"
      >
        Chế độ Bạn thân AI
      </h2>
      <Select<BuddyMode>
        label="Chế độ"
        value={settings.value}
        options={settings.options}
        onChange={change}
        disabled={isPending}
      />
      <p className="text-caption text-muted">{settings.hint}</p>
      {error && (
        <p
          role="alert"
          className="text-caption text-danger"
        >
          {getApiErrorMessage(error, 'Không lưu được. Thử lại sau.')}
        </p>
      )}
    </Card>
  );
}
