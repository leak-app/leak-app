import type { ComponentProps, ComponentType } from 'react';

export interface IconProps extends ComponentProps<'svg'> {
  size?: number;
}

/** Any icon from `@/shared/icons`, for props that accept an icon component. */
export type IconComponent = ComponentType<IconProps>;
