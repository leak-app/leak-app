# Scalable React Native Architecture: Feature-Sliced Design (FSD)

This document provides a practical adaptation and guidelines for **Feature-Sliced Design (FSD)** in this **React Native** project. FSD organizes code by **business value** with clear layers, slices, and segments. It promotes loose coupling, high cohesion, scalability, and maintainability.

---

## 🏗️ Core Principles

To keep the codebase maintainable as it scales, enforce these core principles strictly:

- **Hierarchy (Unidirectional Dependency)**: Layers depend only downward (higher layers cannot be imported by lower ones).
- **Public API**: Every slice/segment must export via `index.ts` (or `index.js`). Internal files are private.
- **Isolation**: Slices are self-contained. No direct imports between sibling slices in the same layer.
- **Business-Oriented**: Group by business domains/features/entities, not technical concerns.

---

## 📂 Project Folder Structure

```text
src/
├── app/                  # Layer: App-wide configuration, global styles, providers
│   ├── providers/        # Context providers (Theme, Auth, QueryClient, Redux)
│   ├── routes/           # Global navigation setup (React Navigation)
│   ├── styles/           # Global theme variables, design system tokens
│   └── App.tsx           # Application entry point shell
│
├── pages/              # Layer: Full screen/page components (FSD "pages" layer)
│   ├── home/
│   │   ├── ui/           # Screen layout & structure
│   │   └── index.ts      # Public API for home screen
│   └── product-details/
│
├── widgets/              # Layer: Composable large UI blocks (Header, ProductGrid, CartSummary)
│   ├── product-grid/
│   │   ├── ui/           # Grid container and internal sub-components
│   │   └── index.ts
│   └── main-header/
│
├── features/             # Layer: Interactive user actions carrying business value (auth-by-email, add-to-cart)
│   ├── auth-by-email/
│   │   ├── ui/           # LoginForm, SubmitButton
│   │   ├── model/        # authFormSchema, useAuthSubmit hook
│   │   └── index.ts
│   └── add-to-cart/
│
├── entities/             # Layer: Core business domain models/entities (user, product, cart, order)
│   ├── product/
│   │   ├── api/          # Product-specific API endpoints/requests
│   │   ├── model/        # Product types, state/slices, selectors
│   │   ├── ui/           # ProductCard, ProductRow (pure visual displays of the entity)
│   │   └── index.ts
│   └── user/
│
└── shared/               # Layer: Reusable infrastructure (agnostic to business logic)
    ├── api/              # Base API client instances (Axios/Fetch configs, interceptors)
    ├── ui/               # Primitive UI components / Design System (Button, Typography, Input)
    │   └── icons/        # Custom SVG icon components
    ├── helpers/          # Utils, helper helpers (date formatting, storage)
    ├── config/           # Environment variables, app constants
    ├── hooks/            # Global hooks (useDebounce, useAppTheme, useAppState)
    └── routing/          # Common navigation helpers

vendors/                  # Cloned/vendored external libraries
    └── rn-primitives/
```

---

## 📂 Deep Dive: The Layers (Top-to-Bottom)

1. **`app` (The Orchestration Layer - Highest)**
   - App-wide entry point, global configurations, and initialization.
   - Sets up App providers (Theme, Redux/Zustand, QueryClient) and navigation wrappers.
   - Global styles / theme configurations, error boundaries, splash screen logic.
   - `App.tsx` and routing entry points.

2. **`pages` (The Pages/Views Layer)**
   - Complete screen components (e.g., `home-screen`, `profile-screen`) that act as routing targets.
   - Pages contain minimal logic. They act as **layout orchestrators**, laying out `widgets` and `features`, and managing screen-specific navigation headers or Safe Area Views.

3. **`widgets` (The Assembly Layer)**
   - Large self-contained UI components combining entities and features into functional modules.
   - Examples: `product-grid` (combining `product-card` entity + `add-to-wishlist` feature), `main-header` (combining logo, search bar, and profile avatar).

4. **`features` (The Actions/Interactions Layer)**
   - User-facing interactions carrying business value. Features are interactive and drive side effects (e.g., API mutations, global state updates).
   - Examples: `auth-by-email` (login form + auth API call), `add-to-cart` (button + hook to modify cart).

5. **`entities` (The Domain Layer)**
   - Represents core business domain models.
   - Contains TS types, base API queries, and pure UI representations (e.g., `product-card` displaying only product info).
   - _Rule:_ Entities cannot perform actions directly (e.g., `product-card` shouldn't call `add-to-cart` API; it must trigger a callback prop).

6. **`shared` (The Infrastructure Layer - Lowest)**
   - Low-level reusable assets and utilities that are completely generic (agnostic to business logic).
   - **`shared/ui/`**: Basic UI components (Button, Input, Spinner, custom SVG icons).
   - **`shared/api/`**: Base API client configs (Axios/fetch instances, interceptors).
   - **`shared/helpers/`**: General JS/TS utilities (MMKV storage, date/number formatting).
   - **`shared/hooks/`**: Global hooks (e.g., theme toggles, device layout hooks).
   - **`shared/config/`**: App-wide constants, Env configs.
   - **`shared/routing/`**: Common navigation types and helper utilities.

---

## 🗂️ Slices and Segments

### Slices (Within Each Layer)

Slices group code by business domain under each layer. Slices must be named after **business domains**, not technical names.

- **Allowed:** `features/auth/`, `features/post-feed/`, `entities/user/`, `entities/post/`, `widgets/post-card/`.
- **Forbidden:** `features/buttons/` (technical group), `entities/api/`.

### Segments (Inside Each Slice)

Standard segments structure a slice's codebase:

```text
slice-name/
├── api/              # API calls (queries, mutations, endpoints)
├── ui/               # React Native components (View, Text, stylesheets)
├── store/            # State logic (stores, selectors, hooks)
├── lib/              # Internal utilities/helpers specific to this slice
├── config/           # Slice-specific configs (rare)
├── consts/           # Slice-specific constants
├── types/            # TypeScript types/interfaces
├── index.ts          # PUBLIC API - only export what's needed
└── README.md         # (Optional) Slice documentation
```

### Public API (`index.ts`)

Each slice must expose a single entry point through `index.ts`. Other slices can only import from this public entry point.

- **Example (`src/features/auth/index.ts`)**:
  ```ts
  export { LoginForm } from './ui/LoginForm';
  export { useLogin } from './store';
  export type { LoginCredentials } from './types';
  ```

---

## 📏 Core FSD Architecture Rules

### Rule 1: Unidirectional Imports (Top-Down Flow)

A layer can **only import** from layers below it. It can **never** import from layers above it.
$$\text{app} \rightarrow \text{processes} \rightarrow \text{pages} \rightarrow \text{widgets} \rightarrow \text{features} \rightarrow \text{entities} \rightarrow \text{shared}$$

- **Allowed:** A component in `widgets` imports a component from `features`, `entities`, or `shared`.
- **Forbidden:** A component in `entities` imports a component from `features` or `widgets`.

### Rule 2: No Cross-Imports within the Same Layer

Slices within the same layer cannot import from one another directly.

- **Forbidden:** `features/add-to-cart` importing directly from `features/auth-by-email`.
- **Solution:** If slices need to share logic, extract the shared code to a lower layer (e.g., to `entities/user` or a custom hook in `shared/hooks`).

### Rule 3: Restrictive Relative Imports

- Relative imports are allowed only **inside the same slice** (e.g., `import { Button } from './Button'`).
- External code MUST import via path aliases targeting the slice's public API (e.g., `import { LoginForm } from '@/features/auth'`).

---

## ⚡ React Native Specific Adaptations

- **Navigation**: Put screen definitions in `pages/`. Keep routing configurations inside `app/routes/`. Common helper functions can go to `shared/routing/`.
- **Styling**: Use `StyleSheet.create` inside component `ui/` folders. Keep the base design system, themes, and stylesheets in `app/styles/` or `shared/ui/`.
- **State Management**:
  - Global/shared stores (e.g., Theme, Auth context) belong to `app/providers/` or `shared/`.
  - Slice-specific stores (e.g., Zustand or Redux Toolkit slices) go in the slice's `model/` segment.
- **Assets**: Store static images, fonts, and icons in `shared/assets/` or `assets/` at the root, importing them through `shared`.
- **Testing**: Place unit and component tests next to the code they test (e.g., inside `__tests__/` folder next to the component/file).
- **Mobile Considerations**:
  - Device APIs and native permissions should be managed in `features/` (if interactive) or `shared/lib/` (if utility-based).
  - Responsive layouts and platform-specific code (e.g., iOS vs. Android split files like `.ios.tsx` / `.android.tsx`) are typically placed in `ui/` segments of components.

---

## ⚡ React Native Developer Experience Configurations

To implement this structure without messy import paths (e.g., `../../../../shared/ui/Button`), configure **Path Aliases**.

### 1. Configure TypeScript (`tsconfig.json`)

Modify `tsconfig.json` to define path mapping under `compilerOptions`:

```json
{
  "extends": "@react-native/typescript-config",
  "compilerOptions": {
    "types": ["jest"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["**/node_modules", "**/Pods"]
}
```

### 2. Configure Babel (`babel.config.js`)

Install the resolver plugin if not already installed:

```bash
npm install --save-dev babel-plugin-module-resolver
```

Then update `babel.config.js` to parse the `@/*` alias:

```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src',
        },
      },
    ],
  ],
};
```

This lets you import cleanly from anywhere in your codebase:

```tsx
import { Button } from '@/shared/ui';
import { ProductCard } from '@/entities/Product';
import { AddToCartButton } from '@/features/AddToCart';
```

---

## 📂 File & Folder Naming Conventions

To maintain consistency and predictability throughout the codebase, adhere strictly to the following folder and file naming rules.

### 1. Folder Naming

- **Layers**: Always lowercase, singular or plural as defined by FSD:
  - `app`, `pages`, `widgets`, `features`, `entities`, `shared`
- **Slices**:
  - **Pages**: PascalCase matching the route/screen (e.g., `home`, `product-details`, `user-profile`).
  - **Widgets / Features**: kebab-case representing the functional scope (e.g., `product-grid`, `auth-by-email`, `add-to-cart`).
  - **Entities**: lowercase singular (e.g., `user`, `product`, `cart`, `order`).
- **Segments**: Always lowercase singular (e.g., `ui`, `model`, `api`, `lib`, `config`).

### 2. File Naming

- **React Components**: PascalCase with `.tsx` extension (e.g., `Button.tsx`, `ProductCard.tsx`, `LoginForm.tsx`).
  - Component files must export a main component matching the file name.
- **Hooks**: camelCase prefixed with `use` (e.g., `useAuthSubmit.ts`, `useProductDetails.ts`).
- **Stores / Global State**: `[slice-name].store.ts` (e.g., `auth.store.ts`, `theme.store.ts`) or `store.ts` if internal to a slice.
- **APIs / Endpoints**: `[slice-name].api.ts` (e.g., `product.api.ts`, `user.api.ts`) or `api.ts` if internal to a slice.
- **Helpers / Utilities**: camelCase describing the utility function (e.g., `formatDate.ts`, `storage.ts`).
- **Types / Constants**:
  - Types: `types.ts` or `[slice-name].types.ts`.
  - Constants: `constants.ts` or `consts.ts` (consistent with the project).
- **Tests**: Same name as the target file with `.test.ts` or `.test.tsx` suffix (e.g., `LoginForm.test.tsx`, `useLogin.test.ts`).

---

## 🚀 Enforcement Tips for AI Agents / Developers

1. **Strict Conventions Compliance**: Always verify that all new folders and files strictly adhere to the naming guidelines above before committing changes.
2. **When to Create a New Slice**:
   - If functionality has distinct business value and can be isolated, create a new slice in the appropriate layer.
3. **Automated Enforcement**:
   - ESLint plugins like `eslint-plugin-boundaries` or `eslint-plugin-feature-sliced` are highly recommended to enforce import rules and hierarchy programmatically.
