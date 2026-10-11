# ICONS.md — Local icon pack (for agents)

The app has **no icon package**. Every icon is a local React SVG component in `app/src/shared/icons`, imported from the slice's public API:

```tsx
import { ICON, PlusIcon } from '@/shared/icons';

<PlusIcon
  size={ICON.size.row}
  strokeWidth={ICON.stroke.idle}
  aria-hidden="true"
/>;
```

Never import from `lucide-react` (removed) or deep-import an icon file (`@/shared/icons/PlusIcon`). Never add another icon library or icon font.

## Rules

- **Outline only**, `strokeWidth` 1.75–2 (use `ICON.stroke.*`). No filled or multi-color icons in new UI.
- **Sizes**: `ICON.size.ui` = 20 (actions, tabs), `ICON.size.row` = 18 (list rows). Other sizes are allowed for badges and empty states.
- **Strokes**: `ICON.stroke.idle` 1.6, `active` 1.8, `onPrimary` 2 (on sage fills).
- All icons use `viewBox="0 0 24 24"` (except `LeakLogoIcon` and `ReceiptIcon`), `strokeLinecap="round"` and `strokeLinejoin="round"`.
- Color is inherited: icons use `currentColor`. Set color with a Tailwind `text-*` class on the icon or its parent.
- Decorative icons get `aria-hidden="true"`; icon-only buttons carry an `aria-label` (Vietnamese) on the button.
- Interactive elements around icons keep a **44×44px** touch target.

## Props

All icons accept `IconProps` (`ComponentProps<'svg'>` plus `size?: number`, default 24) from `./types`. Spread props (`className`, `aria-*`, `strokeWidth`) reach the `<svg>`.

When a prop accepts "any icon", type it as `IconComponent` (from `@/shared/icons`), not a library type:

```tsx
import type { IconComponent } from '@/shared/icons';

interface Props {
  icon: IconComponent;
}
```

Three families exist; know which one an icon belongs to before overriding color:

| Family                                           | Color prop                                                           | Stroke width                                                                    | Icons                                                                                                                                                                                |
| ------------------------------------------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Standard** (use as the template for new icons) | `stroke` (default `currentColor`)                                    | `strokeWidth` prop, default 2                                                   | the Lucide clones below, plus `AlertCircle`, `ArrowLeft`, `Bell`, `Gear`, `Lock`, `Mail`, `Pencil`, `Trash`, `XMark`                                                                 |
| **Legacy stroke**                                | stroke color is set through the `fill` prop (default `currentColor`) | fixed default (1.75, `Plus` 2.5); `strokeWidth` still overridable through props | `Check`, `ChevronDown`, `ChevronRight`, `CircleDashed`, `EllipsisVertical`, `MagnifyingGlass`, `Minus`, `Monitor`, `Plus`, `ShieldCheck`, `Smartphone`, `TrendingDown`, `TrendingUp` |
| **Legacy solid** (do not use in new UI)          | `fill`                                                               | n/a, filled shapes                                                              | `Backspace`, `Dollar`, `Home`, `Receipt`, `Wallet`                                                                                                                                   |

`LeakLogoIcon` is the brand mark (500×500, two fixed greens) and is not a UI icon.

## Catalog

Import every icon as `<Name>Icon` from `@/shared/icons`.

| Icon                   | Shows                   | Used for                                            |
| ---------------------- | ----------------------- | --------------------------------------------------- |
| `AlertCircleIcon`      | circle with exclamation | form and auth error banners                         |
| `ArrowLeftIcon`        | arrow pointing left     | back affordances                                    |
| `ArrowRightIcon`       | arrow pointing right    | submit/next on primary buttons                      |
| `BackspaceIcon`        | backspace key           | legacy solid, prefer `DeleteIcon`                   |
| `BellIcon`             | bell                    | notifications                                       |
| `ChartColumnIcon`      | bar chart with axes     | Leaks tab in the bottom navigation                  |
| `CheckIcon`            | check mark              | selected state in selects, choices, wallet picker   |
| `ChevronDownIcon`      | chevron down            | select and picker triggers                          |
| `ChevronLeftIcon`      | chevron left            | `BackButton`                                        |
| `ChevronRightIcon`     | chevron right           | row disclosure, "see all" links                     |
| `CircleDashedIcon`     | dashed circle           | "no data / not yet" outcome state                   |
| `DeleteIcon`           | backspace key with an x | `Numpad` delete key                                 |
| `DollarIcon`           | dollar sign             | money rows in the report                            |
| `EllipsisVerticalIcon` | three vertical dots     | row overflow menus                                  |
| `GearIcon`             | cog (Feather style)     | legacy settings glyph, prefer `SettingsIcon`        |
| `HistoryIcon`          | counter-clockwise clock | Reflect tab in the bottom navigation                |
| `HomeIcon`             | house                   | legacy solid, prefer `HouseIcon`                    |
| `HouseIcon`            | house outline           | Today tab in the bottom navigation                  |
| `LeakLogoIcon`         | brand mark              | auth screens                                        |
| `LockIcon`             | padlock                 | password inputs                                     |
| `MagnifyingGlassIcon`  | magnifier               | search inputs                                       |
| `MailIcon`             | envelope                | email inputs                                        |
| `MicIcon`              | microphone              | voice quick-log button                              |
| `MinusIcon`            | minus sign              | "no change" outcome and delta                       |
| `MonitorIcon`          | desktop monitor         | desktop session rows                                |
| `PencilIcon`           | pencil                  | edit actions                                        |
| `PlusIcon`             | plus sign               | add actions, center action of the bottom navigation |
| `ReceiptIcon`          | receipt                 | transaction rows                                    |
| `SettingsIcon`         | settings cog (Lucide)   | header button to Profile / Budget settings          |
| `ShieldCheckIcon`      | shield with check       | leak reclaimed, security                            |
| `SmartphoneIcon`       | phone                   | mobile session rows                                 |
| `TargetIcon`           | concentric target       | Goals tab in the bottom navigation                  |
| `TrashIcon`            | trash can               | delete actions                                      |
| `TrendingDownIcon`     | trend line down         | spending went down                                  |
| `TrendingUpIcon`       | trend line up           | spending went up                                    |
| `WalletIcon`           | wallet                  | wallet chips and rows                               |
| `XMarkIcon`            | cross                   | close and clear actions                             |

Also exported: `ICON` (size and stroke tokens, in `tokens.ts`), `IconProps` and `IconComponent` (in `types.ts`).

## Lucide origin

These nine icons are verbatim clones of [Lucide](https://lucide.dev) (ISC license) geometry, taken from `lucide-react@1.48.0` before the package was removed. They replaced the former `lucide-react` imports:

| Local icon        | Lucide name                          |
| ----------------- | ------------------------------------ |
| `ArrowRightIcon`  | `arrow-right`                        |
| `ChartColumnIcon` | `chart-column`                       |
| `ChevronLeftIcon` | `chevron-left`                       |
| `DeleteIcon`      | `delete`                             |
| `HistoryIcon`     | `rotate-ccw-clock` (alias `history`) |
| `HouseIcon`       | `house`                              |
| `MicIcon`         | `mic`                                |
| `SettingsIcon`    | `settings`                           |
| `TargetIcon`      | `target`                             |

`PlusIcon`, `CheckIcon` and `ChevronDownIcon` already had identical Lucide geometry and are used where `Plus`, `Check` and `ChevronDown` were imported.

## Adding a new icon

1. Copy the `<path>` / `<circle>` / `<rect>` children of the SVG you need (from lucide.dev, 24×24 grid, stroke style). Do not install an icon package.
2. Create `app/src/shared/icons/<Name>Icon.tsx` by copying `MicIcon.tsx` (the Standard family template) and replacing the children.
3. Add `export * from './<Name>Icon';` to `index.ts` (keep alphabetical order).
4. Add a row to the **Catalog** table above (and to **Lucide origin** if cloned from Lucide).
5. Check that it renders in both `ICON.stroke.idle` and `onPrimary` on the sage button.
