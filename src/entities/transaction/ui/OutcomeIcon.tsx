import {
  CheckIcon,
  CircleDashedIcon,
  MinusIcon,
  TrendingDownIcon,
} from '@/shared/icons';

import type { OutcomeIconName } from '../model/types';

const ICONS = {
  check: CheckIcon,
  minus: MinusIcon,
  'trending-down': TrendingDownIcon,
  'circle-dashed': CircleDashedIcon,
} satisfies Record<OutcomeIconName, unknown>;

export function OutcomeIcon({
  name,
  size = 16,
}: {
  name: OutcomeIconName;
  size?: number;
}) {
  const Icon = ICONS[name];
  return (
    <Icon
      size={size}
      aria-hidden="true"
    />
  );
}
