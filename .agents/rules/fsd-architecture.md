---
trigger: always_on
---

# Feature-Sliced Design (FSD) Architecture

Strictly adhere to the Feature-Sliced Design (FSD) architectural methodology for all front-end code within `src/`.

---

## 1. Unidirectional Dependency Hierarchy

Code may **ONLY** import from lower layers in the hierarchy. Importing from a higher layer or backwards dependencies is **STRICTLY FORBIDDEN**:

$$\text{app} \longrightarrow \text{pages} \longrightarrow \text{widgets} \longrightarrow \text{features} \longrightarrow \text{entities} \longrightarrow \text{shared}$$

### Layer Responsibilities

| Layer | Responsibility | Allowed to Import From |
| :--- | :--- | :--- |
| `app/` | Global entry point, providers, router configuration, global CSS. | `pages`, `widgets`, `features`, `entities`, `shared` |
| `pages/` | Route view orchestrators combining widgets and features. | `widgets`, `features`, `entities`, `shared` |
| `widgets/` | Composable multi-feature UI blocks (e.g., `bottom-nav`, `main-header`). | `features`, `entities`, `shared` |
| `features/` | User actions carrying direct business value (e.g., `add-transaction`, `manage-budget`). | `entities`, `shared` |
| `entities/` | Domain business models, API clients, deserializers, and view-only entity cards (e.g., `transaction`, `category`). | `shared` |
| `shared/` | Reusable, domain-agnostic UI primitives, API base client, utilities, hooks, constants. | None (only external packages) |

---

## 2. Public API Entry Point (`index.ts`)

Every slice in `pages/`, `widgets/`, `features/`, and `entities/` **MUST** expose its public interface exclusively via its root `index.ts`. Never import internal files directly from outside the slice.

### ❌ Incorrect (Bypassing Public API)
```typescript
// Bypassing index.ts to import deep internal paths
import { TransactionCard } from '@/entities/transaction/ui/TransactionCard';
import { useTransactionQuery } from '@/entities/transaction/api/transactions.api';
```

### ✅ Correct (Importing from Public API)
```typescript
// Clean import through the slice's public root index.ts
import { TransactionCard, useInfiniteTransactions } from '@/entities/transaction';
```

---

## 3. Strict Sibling Slice Isolation

Direct imports between sibling slices on the same layer are **STRICTLY FORBIDDEN**:
- An entity slice cannot import from another entity slice (e.g., `entities/transaction` cannot import from `entities/category`).
- A feature slice cannot import from another feature slice (e.g., `features/add-transaction` cannot import from `features/manage-budget`).

If two slices need to interact:
1. Orchestrate them at a higher layer (`widgets` or `pages`).
2. Or extract common models/utilities to `entities` (for features) or `shared` (for entities).

### ❌ Incorrect (Sibling cross-import)
```typescript
// Inside src/features/add-transaction/ui/AddTransactionForm.tsx:
import { useBudgetLimit } from '@/features/manage-budget'; // FORBIDDEN: Sibling feature import!
```

### ✅ Correct (Orchestrated at Page or Widget Layer)
```typescript
// Inside src/pages/overview/ui/OverviewPage.tsx:
import { AddTransactionModal } from '@/features/add-transaction';
import { BudgetProgressBar } from '@/features/manage-budget';
```

---

## 4. Standard Slice Folder Structure

When creating or modifying slices in `features/` or `entities/`, maintain the following segment structure:

```text
slice-name/
├── api/            # React Query hooks, Axios fetchers, mutation logic
├── ui/             # Purely presentational, view-only React components
├── model/          # Types (*Model), Zustand stores, or slice-specific hooks
├── lib/            # Slice-internal helper functions
|     └── deserialize.ts  # Entity data transformation and formatting (Entities layer)
└── index.ts        # Public API — ONLY export symbols required by upper layers
```