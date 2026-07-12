import type { ComponentType } from 'react';

export type RouteConfig =
  | {
      path: string;
      Component: ComponentType;
      protected?: boolean;
    }
  | {
      path: string;
      redirectTo: string;
      protected?: boolean;
    };
