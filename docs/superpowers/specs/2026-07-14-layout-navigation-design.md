# Design Specification: Screen Wrapper and Bottom Navigation

**Date:** 2026-07-14  
**Topic:** Screen Layout & Bottom Navigation  
**Status:** Approved for Implementation

---

## 1. Objectives

- Implement a consistent, premium user experience for page layout (`Screen.tsx`, `ScreenHeader.tsx`) in the Midnight Emerald dark theme.
- Add a global floating glassmorphic navigation dock (`BottomNavigation.tsx`) centered inside a fixed 480px column on desktop.
- Adapt the FSD (Feature-Sliced Design) routing in `App.tsx` to wrap protected routes in a common centered layout shell.

---

## 2. Architecture & Components

### 2.1 MainLayout (Global Shell Router Wrapper)

We will introduce `MainLayout` in `src/shared/layout/MainLayout.tsx` which will serve as the shared container for all protected screens.

- **Desktop viewports:** Centered 480px container with border lines separating it from the background.
- **Mobile viewports:** Fills the screen.
- **Children rendering:** Via React Router's `<Outlet />`.
- **Bottom Navigation:** Rendered globally inside this container, pinned to the bottom.

### 2.2 BottomNavigation (`src/shared/layout/navigation/BottomNavigation.tsx`)

A global, floating, glassmorphic pill-shaped navigation dock positioned at the bottom of the active page column.

- **Path:** `/src/shared/layout/navigation/BottomNavigation.tsx`
- **Tabs:**
  - **Home/Overview:** Route `/overview`
  - **Wallet:** Route `/wallet`
  - **Transactions/Swap:** Route `/transaction`
  - **Savings Goals:** Route `/savings-goals`
- **Active state style:** Lighter transparent button background (`bg-surface-bright/50`) with green accent glow and Vibrant Green (`#00FF66`) icon.
- **Inactive state style:** Sage Grey (`#8A9A8B`) icon with hover state brightness.

### 2.3 Screen Wrapper (`src/shared/layout/screen/Screen.tsx`)

A basic wrapper for individual pages.

- **Path:** `/src/shared/layout/screen/Screen.tsx`
- **Props:**
  - `children`: ReactNode (the screen content).
  - `className`: string (optional additional CSS classes).
  - `header`: ReactNode (optional, for passing `<ScreenHeader>`).
- **Layout:** Flex container (`flex flex-col min-h-screen pb-28`) ensuring that content scrolls properly and does not get cut off by the floating bottom navigation bar (which has height + safe space padding).

### 2.4 ScreenHeader (`src/shared/layout/screen/ScreenHeader.tsx`)

A reusable header component for page titles, action buttons, back buttons, etc.

- **Path:** `/src/shared/layout/screen/ScreenHeader.tsx`
- **Props:**
  - `title`: string or ReactNode (center title or branding).
  - `leftAction`: ReactNode (optional back button or user avatar).
  - `rightAction`: ReactNode (optional settings or notification bell).
- **Layout:** Sticky header at the top of the page, styled in transparent glassmorphic style with matching borders to align with the Midnight Emerald design language.

---

## 3. Style Details

- **Background:** Deep dark forest-charcoal (`bg-background` / `#0A120B`)
- **Theme Variables:** Styled with Tailwind CSS v4 custom color classes (`bg-background`, `border-outline/10`, `text-on-surface`, `bg-surface-bright`, etc.).
- **Glassmorphism:** Bottom bar uses `glass-dark` utility style.
- **Rounding:** Large pill radius (`rounded-full`) for bottom nav buttons, rounded borders for interactive panels.
