---
title: View-Only UI Components and Entity Deserialization
impact: CRITICAL
impactDescription: Prevents business logic and data manipulation leaks into UI components, ensuring maintainability and clean separation of concerns.
tags: ui, components, deserialization, entities, models, presentation
---

# View-Only UI Components & Entity Deserialization Rule

Maintain strict separation between data transformation and view presentation across all React components and entity layers.

---

## 1. View-Only UI Components

React components located in `ui/` directories across all layers (`entities/`, `features/`, `widgets/`, `pages/`, `shared/`) **MUST remain strictly presentational**.

### Forbidden in UI Components
- ❌ **NO currency or number formatting** (e.g., `toLocaleString()`, `Intl.NumberFormat`, manual currency string concats).
- ❌ **NO date/time parsing or formatting** (e.g., `format(date, ...)`, `new Date().toISOString()`).
- ❌ **NO status color or styling branching** (e.g., `status === 'SUCCESS' ? 'badge-success' : 'badge-error'`).
- ❌ **NO fallback defaults or data remediation** (e.g., `item.title ?? 'Chưa đặt tên'`).

---

## 2. Entity Deserialization (`deserialize.ts`)

All data transformation, formatting, visual badge class determinations, and fallback handling **MUST** be performed in the entity's deserializer (`entities/<slice>/deserialize.ts` or `entities/<slice>/lib/deserialize.ts`) when processing raw API responses.

The deserializer prepares ready-to-render fields on the model:
- `amountFormatted`: Pre-formatted currency string (e.g., `"150.000 ₫"`).
- `dateFormatted`: Pre-formatted date string (e.g., `"11/09/2026"`).
- `statusBadgeClass`: Ready-to-use DaisyUI badge class (e.g., `"badge-success"` or `"badge-error"`).
- `fallbackText`: Pre-resolved labels if optional fields are missing.

---

## 3. Model Interface Naming Convention

All domain model TypeScript interfaces and entity types **MUST** end with the suffix `Model`:
- ✅ `TransactionModel`
- ✅ `CategoryModel`
- ✅ `BudgetModel`
- ✅ `UserModel`
- ✅ `AccountModel`
- ❌ `Transaction`, `Category`, `IBudget`, `IUser` (Forbidden: Missing `Model` suffix)

---

## Code Comparison

### ❌ Incorrect (Polluting UI with Formatting & Logic)
```tsx
// Inside TransactionCard.tsx:
export function TransactionCard({ transaction }: { transaction: any }) {
  // FORBIDDEN: Formatting and logic inside UI component!
  const formattedAmount = `${transaction.amount.toLocaleString('vi-VN')} ₫`;
  const badgeClass = transaction.type === 'EXPENSE' ? 'badge-error' : 'badge-success';
  const displayTitle = transaction.title ?? 'Khoản chi không tên';

  return (
    <div className="card bg-base-200 p-4">
      <h3>{displayTitle}</h3>
      <span className={`badge ${badgeClass}`}>{transaction.type}</span>
      <p>{formattedAmount}</p>
    </div>
  );
}
```

### ✅ Correct (View-Only Component Consuming Deserialized Model)
```typescript
// 1. Model Definition (entities/transaction/model/types.ts):
export interface TransactionModel {
  id: string;
  amount: number;
  amountFormatted: string;       // Pre-formatted
  statusBadgeClass: string;      // DaisyUI class pre-computed
  displayTitle: string;          // Fallback handled
  dateFormatted: string;
}

// 2. Deserializer (entities/transaction/lib/deserialize.ts):
export function deserializeTransaction(raw: RawTransactionResponse): TransactionModel {
  const isExpense = raw.type === 'EXPENSE';
  return {
    ...raw,
    amountFormatted: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(raw.amount),
    statusBadgeClass: isExpense ? 'badge-error' : 'badge-success',
    displayTitle: raw.title?.trim() || 'Chưa đặt tên',
    dateFormatted: new Date(raw.createdAt).toLocaleDateString('vi-VN'),
  };
}

// 3. View-Only UI Component (entities/transaction/ui/TransactionCard.tsx):
export function TransactionCard({ transaction }: { transaction: TransactionModel }) {
  return (
    <div className="card bg-surface p-4">
      <h3>{transaction.displayTitle}</h3>
      <span className={`badge ${transaction.statusBadgeClass}`}>
        {transaction.statusBadgeClass}
      </span>
      <p className="font-semibold">{transaction.amountFormatted}</p>
    </div>
  );
}
```
