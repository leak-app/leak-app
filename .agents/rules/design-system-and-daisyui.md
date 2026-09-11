---
title: Design System, DaisyUI Components, and Lucide Icons
impact: HIGH
impactDescription: Enforces consistent design token usage, semantic DaisyUI components over utility spam, accessible touch targets, and unified icon styling.
tags: design-system, daisyui, tailwind, styling, tokens, icons, lucide
---

# Design System, DaisyUI Components & Icon Rules

All front-end UI must strictly adhere to the project design tokens, DaisyUI semantic component library, and Lucide icon guidelines.

---

## 1. Dark Theme Token Palette

Always use the standard theme tokens or semantic classes matching the project design system:

| Token Name | Hex Code | Role / Usage |
| :--- | :--- | :--- |
| **App Background** | `#0F172A` (`--bg`) | Main application background. |
| **Surface Cards** | `#1E293B` (`--surface`) | Content cards, list containers (border radius: `12px`). |
| **Elevated Elements** | `#334155` (`--surface-elevated`) | Dropdowns, dialogs, modals, floating bars. |
| **Primary Accent** | `#38BDF8` | Cyan — active states, primary CTA buttons, key actions. |
| **Secondary Accent** | `#A78BFA` | Soft Purple — tags, categories, secondary chart indicators. |
| **Success Highlight** | `#34D399` | Emerald Green — positive financial outcomes, `WORTH_IT` items. |
| **Danger / Error** | `#F87171` | Red-Orange — overspending, alerts, `LEAK` indicators. |
| **Primary Text** | `#F8FAFC` | High-contrast body text, headings. |
| **Muted Text** | `#94A3B8` | Subtitles, labels, secondary metadata. |

---

## 2. DaisyUI Component Classes First

Do **NOT** write long, repetitive ad-hoc Tailwind utility chains when standard DaisyUI components exist.

### Core Component Classes
- **Buttons**: `btn`, `btn-primary`, `btn-secondary`, `btn-outline`, `btn-ghost`, `btn-sm`
- **Cards & Containers**: `card`, `card-body`, `card-title`
- **Badges & Tags**: `badge`, `badge-success`, `badge-error`, `badge-warning`, `badge-info`
- **Form Inputs**: `input`, `input-bordered`, `select`, `select-bordered`, `checkbox`, `toggle`
- **Overlays & Nav**: `modal`, `modal-box`, `drawer`, `tabs`, `tab`

### Touch Target Minimum
- All interactive controls (buttons, icon triggers, tabs, list action items) **MUST** have a minimum touch target size of **44×44px** (e.g., `min-h-[44px] min-w-[44px]` or adequate padding).

---

## 3. Lucide Icons Rule

Icons enhance usability and must strictly follow these constraints:
1. **Source**: Use `lucide-react` icons **ONLY**. Do not introduce external icon fonts or other icon libraries.
2. **Style**: Use **OUTLINE** style exclusively.
3. **Stroke Width**: Maintain a `strokeWidth` strictly between `1.75` and `2px` (default to `strokeWidth={2}`).
4. **Forbidden Styles**:
   - ❌ **NEVER** use filled icon variants (e.g., solid fills).
   - ❌ **NEVER** use multi-color decorative icons.

---

## Code Comparison

### ❌ Incorrect (Tailwind utility spaghetti & non-standard icon)
```tsx
// FORBIDDEN: Long repetitive ad-hoc utility classes + tiny touch target
<button className="flex items-center justify-center rounded-lg bg-sky-500 px-2 py-1 text-xs text-white shadow-md hover:bg-sky-600 active:scale-95">
  <svg fill="currentColor" viewBox="0 0 20 20">{/* filled icon */}</svg>
  <span>Lưu</span>
</button>
```

### ✅ Correct (DaisyUI component + Lucide outline icon)
```tsx
import { Plus } from 'lucide-react';

// Semantic DaisyUI class + 44px minimum touch target + standard Lucide outline icon
<button className="btn btn-primary min-h-[44px] min-w-[44px] gap-2">
  <Plus size={18} strokeWidth={2} />
  <span>Thêm giao dịch</span>
</button>
```
