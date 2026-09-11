---
title: Illustrations and Vector Assets (Energetic unDraw Style)
impact: MEDIUM
impactDescription: Ensures visual assets, empty states, and illustrations maintain a cohesive, clean, professional engineering aesthetic.
tags: assets, illustrations, svg, undraw, design
---

# Illustrations & Vector Assets (Energetic unDraw Hybrid)

When creating or integrating illustrations, empty state graphics, or onboarding hero banners, strictly follow the visual guidelines below.

---

## 1. Visual Style

- **Minimal Geometric + Soft Line-Art Vector**: Use clean lines, subtle geometric shapes, and negative space reminiscent of a refined, energetic unDraw aesthetic.
- **Precision & Clarity**: Illustrations should clearly convey intent (e.g., empty transaction list, no budget configured) without clutter.
- **Tone**: Calm, precise, and senior-engineer clean.
  - ❌ **NO playful, chaotic, childlike, or cartoonish graphics**.
  - ❌ **NO photorealistic images or heavy textures**.

---

## 2. Asset Format

- **Format**: Prefer clean, lightweight inline React SVG components or optimized `.svg` files located in `shared/ui/` or the respective slice's `ui/` directory.
- Ensure all SVG elements scale responsively with `viewBox` and maintain accessibility (`aria-hidden="true"` or proper title).

---

## 3. Strict Illustration Color Palette

Limit all illustration paths and fills strictly to the design system tokens:

| Role | Color Value | Usage in Illustration |
| :--- | :--- | :--- |
| **Base Surface** | `#1E293B` | Structural elements, containers, backgrounds. |
| **Neutral Strokes / Lines** | `#334155` / `#475569` | Grid lines, subtle borders, wireframe shapes. |
| **Primary Accent** | `#38BDF8` (Cyan) | Focal highlights, active rays, primary focal points. |
| **Secondary Accent** | `#A78BFA` (Soft Purple) | Supporting shapes, soft gradients, tags. |
| **Muted Fills** | `#64748B` / `#94A3B8` | Supporting details, body tones. |

---

## Example (Empty State SVG Component)

```tsx
export function EmptyTransactionsIllustration() {
  return (
    <svg
      viewBox="0 0 200 160"
      className="w-48 h-auto mx-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Background surface card */}
      <rect x="20" y="30" width="160" height="100" rx="12" fill="#1E293B" stroke="#334155" strokeWidth="2" />
      {/* Structural neutral lines */}
      <line x1="40" y1="60" x2="110" y2="60" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
      <line x1="40" y1="80" x2="85" y2="80" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
      {/* Primary Cyan accent highlight */}
      <circle cx="145" cy="70" r="16" stroke="#38BDF8" strokeWidth="2" fill="#38BDF8" fillOpacity="0.1" />
      <path d="M140 70L144 74L152 66" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
```
