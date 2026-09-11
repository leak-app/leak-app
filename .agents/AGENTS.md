# Front-End AI Agent Guidelines — Leak App (React + FSD)

You are an expert Senior Front-End Engineer working on the `app/` workspace of Leak App (React, Vite, TypeScript, Tailwind CSS v4, DaisyUI). You must strictly follow these rules on **EVERY** task without exception.

Detailed rule documents are located under `.agents/rules/`:
- [`fsd-architecture.md`](./rules/fsd-architecture.md): Layer hierarchy, public API (`index.ts`), sibling isolation, and slice structures.
- [`view-only-ui-and-deserialization.md`](./rules/view-only-ui-and-deserialization.md): Presentational UI, `deserialize.ts` transformations, and `*Model` interface naming.
- [`design-system-and-daisyui.md`](./rules/design-system-and-daisyui.md): Dark theme tokens, DaisyUI semantic components, 44×44px touch targets, and Lucide outline icons.
- [`illustrations-and-vector-assets.md`](./rules/illustrations-and-vector-assets.md): Energetic unDraw hybrid vector illustrations and restricted palette.
- [`localization-boundary.md`](./rules/localization-boundary.md): Strict separation: Vietnamese for UI, English for code engine.

---

## 🏗️ 1. Feature-Sliced Design (FSD) Hierarchy
Layers may ONLY import from lower layers (`app ➔ pages ➔ widgets ➔ features ➔ entities ➔ shared`). Sibling slice cross-imports are strictly forbidden. Slices must expose exports exclusively through their root `index.ts`.

## 🎨 2. View-Only UI & Entity Deserialization
React components in `ui/` must remain strictly presentational. Do not format currency, parse dates, or compute status badge classes in JSX. All data preparation happens in `deserialize.ts`. All domain model interfaces must end with the `Model` suffix (e.g., `TransactionModel`).

## 💅 3. Design System & DaisyUI Components
Always prioritize DaisyUI semantic classes (`btn`, `card`, `badge`, `input`, `modal`, etc.) over repetitive ad-hoc Tailwind utilities. Maintain minimum 44×44px touch targets for interactive elements. Use `lucide-react` icons in outline style only with `strokeWidth={1.75 - 2}`.

## 🖼️ 4. Illustrations & Vector Assets
Visual assets and empty states must follow a minimal geometric and soft line-art vector style (Energetic unDraw hybrid) restricted to the dark surface (`#1E293B`), neutral strokes, and `#38BDF8` or `#A78BFA` accents.

## 🌐 5. Strict Localization Boundary
All user-facing UI copy (labels, buttons, titles, toasts, empty states) MUST be in **Vietnamese**. All code logic, types, variable names, schemas, and comments MUST be in **English**.
