---
title: Strict Localization Boundary (Vietnamese UI & English Codebase)
impact: HIGH
impactDescription: Eliminates language inconsistency by separating user-facing presentation (Vietnamese) from codebase architecture and implementation (English).
tags: localization, i18n, naming, language, ui
---

# Strict Localization Boundary (Dual-Rule)

Maintain an absolute separation between what the end-user sees and how the codebase is written and documented.

---

## 1. User Interface Text: Vietnamese ONLY

All text visible to the end-user in the browser or mobile web view **MUST** be written in **Vietnamese**. This includes:
- Page & section headings, screen titles.
- Button labels, form inputs, placeholder attributes.
- Dropdown select options, radio/checkbox labels.
- Toast notifications, alert banners, modal dialog messages.
- Tooltips, badge text, helper texts, validation error messages shown to users.
- Empty state titles and descriptive paragraphs.

---

## 2. Codebase Engine: English ONLY

All underlying technical artifacts and code files **MUST** be written in **English**. This includes:
- Variable, function, class, and constant identifiers.
- TypeScript interfaces, types, enums, and generics.
- File names, directory names, and route paths.
- API endpoints, query parameter keys, request/response payload schemas.
- Code comments, docstrings, git commit messages, and internal documentation.

---

## Code Comparison

### ❌ Incorrect (Mixed UI language or Vietnamese identifiers)
```typescript
// FORBIDDEN: Vietnamese identifiers and English UI text
const danhSachGiaoDich = []; // Should be transactionList

export function AddTransactionButton() {
  return (
    // FORBIDDEN: User-facing text in English
    <button className="btn btn-primary">
      Add Transaction
    </button>
  );
}

// FORBIDDEN: Vietnamese comment
// Lấy danh sách giao dịch từ server
export function fetchTransactions() { ... }
```

### ✅ Correct (Vietnamese UI + English Code Engine)
```typescript
// English identifiers, types, and comments
export interface TransactionListProps {
  isLoading: boolean;
}

/**
 * Fetch and display user transactions
 */
export function AddTransactionButton({ onClick }: { onClick: () => void }) {
  return (
    // User-facing text in natural Vietnamese
    <button className="btn btn-primary" onClick={onClick}>
      Thêm giao dịch
    </button>
  );
}
```
