# Project Rules

## UI Component Library

- Always use **daisyUI** component classes (e.g., `input`, `btn`, `badge`, `select`, `modal`, `card`, etc.) for building UI components instead of writing long, repetitive ad-hoc Tailwind utility classes.

## Interface Naming

- All model interfaces must be suffixed with `Model` (e.g., `CategoryModel`, `TransactionModel`, `UserModel`).

## Language & Localization

- Use **Vietnamese** for all user-facing UI elements (labels, buttons, placeholders, display text, tooltips, screen titles, notifications, etc.).
- Keep all underlying code logic, type definitions, variable/function names, API schemas, and comments in **English**.

## View-Only UI Components & Entity Deserialization

- UI components must be strictly **view-only**. Do not parse, format, map, or transform raw data or values directly within components.
- All data transformations, number formatting, fallback defaults, and visual status class determinations must be handled in the entity layer's `deserialize.ts` function and stored as extra fields on the model interface.
