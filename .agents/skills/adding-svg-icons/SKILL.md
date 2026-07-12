---
name: adding-svg-icons
description: 'Guides on how to add a new custom SVG icon component to the React Native project under src/shared/ui/icons, export it, and use it with the Icon wrapper.'
---

# Adding SVG Icons to the Project

This skill documents the step-by-step process for converting a standard web SVG icon into a React Native compatible SVG icon component, integrating it into the codebase, and consuming it with the custom wrapper component.

---

## 1. Icon File Creation

All custom icons are located in [src/shared/ui/icons/](src/shared/ui/icons/).

### Naming Conventions

- File name: PascalCase with `Icon` suffix (e.g., `ExclamationTriangleIcon.tsx`).
- Component function name: Matches the file name (e.g., `ExclamationTriangleIcon`).

### Component Template

Use the following template for the new icon component. Ensure you import from `react-native-svg` and handle props cleanly:

```tsx
import * as React from 'react';

import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

interface IconProps extends SvgProps {
  size?: number;
}

export function ExclamationTriangleIcon({
  size = 24,
  fill = 'none',
  stroke = 'currentColor',
  strokeWidth = 2,
  ...props
}: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Map SVG paths/elements here. Keep tags on single lines to prevent Prettier warnings */}
      <Path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </Svg>
  );
}
```

---

## 2. Converting SVG for React Native

Web SVGs must be adapted to React Native:

- **Tags**: Use capitalized tags imported from `react-native-svg` (e.g. `Svg`, `Path`, `Rect`, `Circle`, `Polyline`, `G`).
- **Attributes**: Convert kebab-case attributes to camelCase:
  - `stroke-width` -> `strokeWidth`
  - `stroke-linecap` -> `strokeLinecap`
  - `stroke-linejoin` -> `strokeLinejoin`
  - `fill-rule` -> `fillRule`
  - `clip-rule` -> `clipRule`
- **Formatting**: Self-closing tags with long strings (like paths) should ideally be formatted on a single line to comply with the project's Prettier settings and avoid linter warnings:
  - **Correct**: `<Path d="..." />`
  - **Incorrect**:
    ```tsx
    <Path d="..." />
    ```

---

## 3. Exporting the Icon

Export the new icon from the index file [src/shared/ui/icons/index.ts](src/shared/ui/icons/index.ts):

```typescript
export * from './HomeIcon';
...
export * from './ExclamationTriangleIcon'; // Add the new export here
```

---

## 4. Consumption and Usage

To render the icon, wrap it using the custom [Icon](src/shared/ui/icon.tsx) wrapper. This enables Tailwind CSS / Nativewind utility class support (e.g. coloring, sizing):

```tsx
import { Icon } from '@/shared/ui/icon';
import { ExclamationTriangleIcon } from '@/shared/ui/icons';

// Example inside component:
<Icon as={ExclamationTriangleIcon} className="text-destructive size-6" />;
```

---

## 5. Verification

After adding the icon, verify that everything compiles and formats cleanly by running:

1. **TypeScript compilation check**: `npx tsc --noEmit`
2. **ESLint / Prettier check**: `npm run lint`
