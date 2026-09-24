# DESIGN.md — Leak App Design System

Design rules for the Leak App frontend: a mobile-first daily spend and outcome tracker.

**Tone:** calm, precise, professional ("senior-engineer clean"). No cartoonish, playful or childish elements.

**Product goal:** help users find hidden money leaks and rate the emotional value of their spending through asynchronous reflection.

---

## 1. Foundations

### 1.1 Color tokens (dark theme, default)

| Token                  | Hex       | Role                                                      |
| ---------------------- | --------- | --------------------------------------------------------- |
| App background         | `#0F172A` | Page background (`base-100`)                              |
| Surface card           | `#1E293B` | Cards, 12px radius (`base-200`)                           |
| Elevated               | `#334155` | Inputs, elevated cards, 10px radius (`base-300`)          |
| Primary accent         | `#38BDF8` | Interactive elements only (buttons, active states, links) |
| Secondary accent       | `#A78BFA` | Tags, secondary chart series                              |
| Success                | `#34D399` | Positive outcomes / `WORTH_IT`                            |
| Danger                 | `#F87171` | `LEAK` and errors only                                    |
| Text (strong)          | `#F8FAFC` | Hero numbers, headings                                    |
| Text (body)            | `#E2E8F0` | Body text, list content                                   |
| Text (muted)           | `#94A3B8` | Secondary text on background and card surfaces            |
| Text (muted, elevated) | `#CBD5E1` | Secondary text and placeholders on `#334155`              |

### 1.2 Measured contrast ratios

WCAG targets: 4.5:1 for body text, 3:1 for large text and UI components.

| Text             | App `#0F172A` | Card `#1E293B` | Elevated `#334155` |
| ---------------- | ------------- | -------------- | ------------------ |
| `#F8FAFC`        | 17.06         | 13.98          | 9.90               |
| Muted `#94A3B8`  | 6.96          | 5.71           | **4.04 ✗**         |
| Cyan `#38BDF8`   | 8.33          | 6.83           | 4.83               |
| Purple `#A78BFA` | 6.56          | 5.38           | **3.80 ✗**         |
| Green `#34D399`  | 9.29          | 7.61           | 5.39               |
| Red `#F87171`    | 6.45          | 5.29           | **3.74 ✗**         |

Surface separation: background to card is 1.22:1, card to elevated is 1.41:1.

Text on a cyan fill: `#0F172A` is 8.33:1 (pass); white `#F8FAFC` is 2.05:1 (fail).

### 1.3 Contrast rules

1. **Muted, purple or red text never goes on `#334155`.** Use `#CBD5E1` for placeholders and helper text inside inputs. Show validation errors _below_ the input, on the card surface.
2. **Content on cyan is always dark (`#0F172A`).** Never put white text on a primary button.
3. **Separate surfaces with a hairline, not only fill color.** Cards and elevated surfaces get `border border-white/[0.06]` (or `ring-1 ring-slate-400/10`) so they stay distinct at low OLED brightness.
4. **Use `#E2E8F0` for body text.** Reserve `#F8FAFC` for hero numbers and headings to avoid halation in long lists.
5. **Color is never the only signal.** `LEAK` and `WORTH_IT` (red/green, the pair colorblind users confuse most) always come with an icon (`TrendingDown` / `Check`) or a text label.

### 1.4 Typography

- Font: Inter with the system UI fallback stack.
- Vietnamese diacritics (ệ, ở, ữ) need `line-height` ≥ 1.4. Never set tight leading on Vietnamese text.
- Test every button and label with real Vietnamese copy; it runs longer than English.

| Level       | Size    | Weight  | Use                                 |
| ----------- | ------- | ------- | ----------------------------------- |
| Hero number | 32–40px | 600     | One per screen (e.g. today's spend) |
| Heading     | 20–24px | 600     | Screen and section titles           |
| Body        | 15–17px | 400–500 | Lists, labels, secondary figures    |
| Caption     | 13px    | 400     | Metadata, timestamps                |

### 1.5 Spacing and touch

- 4px grid: 8, 12, 16, 20, 24px.
- Touch targets are **≥ 44×44px** without exception.
- Keep primary actions in the bottom 40% of the screen (the thumb zone).

### 1.6 Icons and illustrations

- Lucide React, outline only, `strokeWidth` 1.75–2. No filled icons.
- Illustrations ("Energetic unDraw" style, locked to `#38BDF8` and `#A78BFA`) appear **only in onboarding and empty states**, at ≤ 120px on core screens.
- Prefer geometric objects over characters. Character poses must stay restrained so they don't conflict with the no-cartoonish tone.
- **Human characters come from Storyset "Cuate" artwork recolored to this palette, never drawn in code.** The production guide and pipeline live in `wiki/illustrations/README.md`.

---

## 2. Financial Metrics

- **Amounts are neutral colored.** Spending is normal, so never color every expense red. Red is reserved for `LEAK`. Color only the status or the delta, not the amount.
- **One hero number per screen.** Everything else sits at body size.
- **Always apply `tabular-nums`** (`font-variant-numeric: tabular-nums`) to amounts so columns line up and values don't jitter when they change.
- **Format with `Intl.NumberFormat('vi-VN')`**, with no decimals for VND. Formatting happens in `deserialize.ts`, never in JSX.
- **De-emphasize the currency symbol.** Render `₫` smaller and in the muted color.
- **Use compact form in dense lists** (`1,25tr`) and the full amount on detail screens.
- **Cyan means "interactive".** Don't use it to highlight passive figures, so users learn that cyan is tappable.

---

## 3. Key Flows

### 3.1 Quick log (numpad)

- **Custom in-app numpad** in the bottom 40% of the screen, not the native keyboard. It avoids layout jumps and the keyboard covering content, and it has no decimal key (VND doesn't need one). Include a **`000`** key.
- **Layout order:** amount display (auto-focused), then a row of the 5–6 most recent categories as chips, then a full-width save button.
- **Smart defaults:** date = today, wallet = last used. Only show those fields when the user taps them.
- **No confirmation dialog.** Save optimistically and show an **undo toast** for about 5 seconds.
- **"Lưu & thêm tiếp"** keeps the sheet open for logging several items in a row.
- **Haptics:** `navigator.vibrate(10)` on key press and save. It works on Android only (iOS Safari ignores it), so treat it as progressive enhancement.
- **No rating while logging.** Rating belongs to the reflection ritual.

### 3.2 Reflection ritual

- **Cooling period:** only surface transactions older than 24 hours. The time gap is what makes the rating honest.
- **Cap each session at 3–5 items**, with visible progress ("2/5").
- **One card at a time, with three large buttons** in the thumb zone: _Đáng tiền / Bình thường / Lãng phí_. Swipe is an optional shortcut, never the only input.
- **Skipping is allowed.** Unrated items older than about 7 days are archived quietly. Never show a growing backlog.
- **No streak shame.** End each session with a short summary (e.g. "Tuần này: 3 khoản lãng phí, 420k"). The reward is the insight, not a badge.
- **User-chosen reminder time**, e.g. an evening wind-down slot.

---

## 4. Category Leak Rate

`Leak Rate = Total Leak Amount / Total Spent`

1. **Sort by leak amount, not by rate.** 90% leak on 50k ₫ matters less than 30% on 5M ₫. The rate is secondary information.
2. **Show each category as one stacked bar:** total spend, split into leak (red), rated OK (neutral) and **unrated (hatched or grey)**. Label it `32% · 1,2tr ₫`.
3. **Handle the denominator honestly.** Counting unrated spend as "not a leak" makes the rate look lower when users skip reflection. Either use _rated spend_ as the denominator or always show the unrated share visibly.
4. **Show a trend** vs last month (▲ / ▼, with an icon, not color alone).
5. **Make it actionable.** Tapping the row opens the filtered list of leak transactions, with a "Đặt ngân sách" CTA.
6. **Minimum sample:** hide the rate until the category has about 5 rated transactions, and show "Chưa đủ dữ liệu" instead.

---

## 5. DaisyUI Setup & Component Patterns

### 5.1 Theme

```css
@plugin 'daisyui/theme' {
  name: 'leak';
  default: true;
  color-scheme: dark;
  --color-base-100: #0f172a;
  --color-base-200: #1e293b;
  --color-base-300: #334155;
  --color-base-content: #e2e8f0;
  --color-primary: #38bdf8;
  --color-primary-content: #0f172a;
  --color-secondary: #a78bfa;
  --color-secondary-content: #0f172a;
  --color-success: #34d399;
  --color-error: #f87171;
  --radius-box: 12px;
  --radius-field: 10px;
}
```

In this theme, `base-200` and `base-300` are _lighter_ than `base-100`, the reverse of DaisyUI's default order. Apply them explicitly, and check built-in components that assume the default order (`menu`, `tabs`, `table` zebra rows).

### 5.2 Modal sheets

- Use `<dialog class="modal modal-bottom sm:modal-middle">`.
- Add safe-area padding: `pb-[max(1rem,env(safe-area-inset-bottom))]`.
- Show a drag handle at the top. DaisyUI has no drag-to-dismiss; add it yourself (or use `vaul`) where it matters.

### 5.3 Charts

- DaisyUI has no charts. Use `stats` for KPI tiles and `radial-progress` or `progress` for single ratios.
- For real charts (Recharts or visx), read colors from theme CSS variables. Never hard-code hex values.
- Keep charts sparse: no gridlines, direct labels instead of legends, at most two series colors per chart.

### 5.4 Empty states

- A card with a small illustration (≤ 120px), one sentence and one CTA button.
- The copy says what to do next, not just "Chưa có dữ liệu".

### 5.5 Loading

- Use skeletons that match the final layout. Never use a full-screen spinner for content loads.

---

## 6. Platform & Accessibility

- **Bottom navigation (glass):** `rgba(15, 23, 42, 0.65)` + `backdrop-filter: blur(20px)`, with an `@supports not (backdrop-filter: blur(1px))` fallback to a solid `#0F172A` at 95% opacity. Scrollable content reserves bottom padding for the bar plus `env(safe-area-inset-bottom)` so the last item is never hidden.
- **Focus:** every interactive element gets a visible `focus-visible` ring: 2px `#38BDF8` with a 2px offset.
- **Motion:** respect `prefers-reduced-motion`; disable sheet slide and card-swipe animations when it is set.
- **Privacy:** provide a "hide amounts" toggle that blurs all figures, for use in public.
- **Outdoor use:** dark stays the default, but plan to follow the system light/dark setting eventually.

---

## 7. Copy Tone

- User-facing text is Vietnamese; code is English (see `CLAUDE.md`).
- Neutral and curious, never moralizing. "Leak" framing can feel judgmental, so toasts and summaries describe what happened without blaming the user.
