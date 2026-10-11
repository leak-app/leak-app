# CLAUDE.md — Leak App (Frontend)

React 19 Single Page Application built with Vite, TypeScript, Tailwind CSS v4, and DaisyUI.

---

## ⚡ CLI Commands

Run all commands inside the `app/` directory:

```bash
yarn dev                  # Start Vite development server
yarn build                # Type check & production build (tsc -b && vite build)
yarn lint                 # Run lint-staged / ESLint
yarn preview              # Preview production build locally
```

---

## 🏗️ Architecture: Feature-Sliced Design (FSD)

Follow the strict FSD layer hierarchy:

```
src/
├── app/                  # Providers, routing, global styles, entry initialization
├── pages/                # Route pages (compositional views)
├── widgets/              # Large composite UI blocks (Header, Sidebar, OverviewWidgets)
├── features/             # User interactions with business value (AddTransaction, SetBudget)
├── entities/             # Business domains (transaction, wallet, category, user)
└── shared/               # Reusable primitives, API client, UI kit, utilities
```

### Import Rules & Boundaries

- **Strict Unidirectional Flow**: Layers may ONLY import from layers strictly below them (`app ➔ pages ➔ widgets ➔ features ➔ entities ➔ shared`).
- **No Sibling Imports**: Slices within the same layer cannot import from each other (e.g. `entities/wallet` must not import from `entities/transaction`).
- **Public API Enforcement**: Slices must expose their interface exclusively through their root `index.ts`. Never deep-import into internal files of another slice.

---

## 🎨 UI & Design System Conventions

### 1. View-Only UI & Entity Deserialization

- React components under `ui/` must remain purely presentational.
- **No inline data manipulation in JSX**:
  - Do NOT format currency (e.g. `100.000 ₫`) directly in JSX.
  - Do NOT parse or format dates directly in JSX.
  - Do NOT calculate CSS status badge classes directly in JSX.
- **Deserialization Layer**: Perform all formatting, date transformations, and visual badge mapping in a dedicated `deserialize.ts` file within the entity/feature.
- **Model Suffix**: All domain model interfaces must end with the `Model` suffix (e.g., `TransactionModel`, `WalletModel`).

### 2. Design System & DaisyUI

- **DaisyUI Semantic Classes**: Prioritize DaisyUI classes (`btn`, `card`, `badge`, `input`, `modal`, `tabs`, `table`, etc.) over verbose, repetitive Tailwind utility strings.
- **Touch Targets**: Maintain a minimum **44×44px touch target** for buttons and interactive controls.
- **Icons**: Use the local icon pack from `@/shared/icons` (see `app/src/shared/icons/ICONS.md`) in outline style only with `strokeWidth={1.75 - 2}`. Do not add an icon package.
- **Illustrations**: Visual assets and empty states must follow a minimal geometric and soft line-art vector style (Energetic unDraw hybrid) restricted to dark surfaces (`#1E293B`) and theme accents (`#38BDF8`, `#A78BFA`).

---

## 🌐 Localization Boundary

Maintain a strict separation of languages:

- **Vietnamese (User-Facing UI)**: All text presented to users must be in Vietnamese (button labels, titles, table headers, toasts, form validation messages, empty states).
- **English (Code Engine)**: All source code, component names, hook names, props, state variables, schemas, and technical comments must be in English.
