---
name: Midnight Emerald (Dark Mode)
colors:
  surface: '#0d1a10'
  surface-dim: '#09120b'
  surface-bright: '#15281a'
  surface-container-lowest: '#040805'
  surface-container-low: '#0a160c'
  surface-container: '#0d1d11'
  surface-container-high: '#122817'
  surface-container-highest: '#18321e'
  on-surface: '#f0f0f0'
  on-surface-variant: '#8a9a8b'
  inverse-surface: '#e6f2e8'
  inverse-on-surface: '#0a120b'
  outline: '#4f6854'
  outline-variant: '#2a3d2f'
  surface-tint: '#00ff66'
  primary: '#00ff66'
  on-primary: '#003812'
  primary-container: '#00521e'
  on-primary-container: '#99ffd4'
  inverse-primary: '#00a33e'
  secondary: '#00e5ff'
  on-secondary: '#00363d'
  secondary-container: '#004d57'
  on-secondary-container: '#80f2ff'
  tertiary: '#ff8a7a'
  on-tertiary: '#4a120b'
  tertiary-container: '#7d1c10'
  on-tertiary-container: '#ffdad6'
  error: '#ff5449'
  on-error: '#4e0002'
  error-container: '#ba1a1a'
  on-error-container: '#ffdad6'
  primary-fixed: '#00ff66'
  primary-fixed-dim: '#00cc52'
  on-primary-fixed: '#002107'
  on-primary-fixed-variant: '#00531b'
  secondary-fixed: '#80f2ff'
  secondary-fixed-dim: '#00e5ff'
  on-secondary-fixed: '#001f24'
  on-secondary-fixed-variant: '#004d57'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#ffb4a9'
  on-tertiary-fixed: '#410002'
  on-tertiary-fixed-variant: '#7f2920'
  background: '#0a120b'
  on-background: '#f0f0f0'
  surface-variant: '#1a241b'
  bg-sage: '#0a120b'
  glass-white: 'rgba(26, 36, 27, 0.6)'
  deep-forest: '#0a120b'
  vibrant-green: '#00ff66'
  electric-cyan: '#00e5ff'
  soft-coral: '#ff8a7a'
  pastel-yellow: '#fdf07b'
typography:
  display-currency:
    fontFamily: Baloo Da 2
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-currency-mobile:
    fontFamily: Baloo Da 2
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Baloo Da 2
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Baloo Da 2
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Baloo Da 2
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Baloo Da 2
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  metadata:
    fontFamily: Baloo Da 2
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  container-padding: 24px
  element-gap: 16px
  micro-padding: 12px
  section-margin: 40px
---

## Brand & Style

The design system for this personal finance app is built upon the concept of "Financial Clarity through Softness." It merges **Soft Minimalist Glassmorphism** with **Fintech Neo-Minimalism** to transform the often stressful experience of money management into a calm, premium, and approachable ritual.

The visual style is characterized by:

- **Atmospheric Depth:** Using semi-transparent surfaces and backdrop blurs to create a sense of organized layers without the weight of heavy shadows.
- **Organic Geometry:** Extremely large border radii and generous internal padding (micro-padding) that make the interface feel tactile and safe.
- **High-Chroma Utility:** Using color not just for decoration, but as a clear, high-contrast signal for financial health and movement.
- **Precision Typography:** A focus on legibility and scale, ensuring financial values are the hero of every view.

## Colors

This palette is designed to be "low-stress" while maintaining high functional clarity in dark mode.

- **Background:** A deep, dark forest-charcoal (`#0A120B`) acts as the foundation, providing a premium, low-stress, and immersive canvas.
- **Primary Accent:** Vibrant Neon Green (`#00FF66`) represents financial health, growth, and positive flow (income). It glows against the dark background.
- **Secondary Accent:** Electric Cyan (`#00E5FF`) is used for active states, liquid assets, transfers, and high-tech highlights.
- **Tertiary Accent:** Sunset Peach / Soft Coral (`#FF8A7A`) is used for expenses, warnings, and negative flow.
- **Neutrals:** Snow White (`#F0F0F0`) is used for high-contrast value presentation, and muted Sage Grey (`#8A9A8B`) is reserved for secondary metadata.

## Typography

The typography system prioritizes the "Display Currency" role and supports both English and Vietnamese natively.

**Baloo Da 2** serves as the primary typeface. Its friendly, rounded, and clean geometric letterforms transform financial data into a approachable and friendly experience. For metadata and secondary data points (like transaction timestamps or category tags), a muted weight is used. **JetBrains Mono** is used selectively for numbers, labels, and technical data to reinforce "fintech" precision and provide textural contrast to the soft UI.

## Layout & Spacing

The layout follows a **fluid grid** model with high internal breathing room.

- **Micro-padding:** Elements within cards and containers should have a minimum of 12px padding to maintain the "soft" aesthetic.
- **Margins:** A standard 24px side margin is maintained on mobile, scaling to 40px on tablet and desktop.
- **The "Glass Stack":** Content is organized in semi-transparent dark forest cards. Spacing between these cards (element-gap) is 16px to create a clear visual rhythm.
- **Safe Areas:** High-top padding is used for header sections (48px+) to allow the dark forest background to bleed through, enhancing the airy feel.

## Elevation & Depth

This design system eschews traditional shadows in favor of **Tonal Layers and Glassmorphism**.

1.  **Base Layer:** The dark Midnight Emerald background (`#0A120B`).
2.  **Surface Layer:** Semi-transparent dark forest (`rgba(26, 36, 27, 0.6)`) with a `backdrop-filter: blur(20px)`. This creates the primary container for all content.
3.  **Active Layer:** Elements that require focus or are currently being interacted with use a solid background (such as a brighter forest green surface `#15281A`) or a vibrant border.
4.  **Floating Elements:** Main CTAs may use a subtle radial glow effect or tinted dropshadow matching the neon primary/secondary green/cyan at a low opacity to indicate they sit above the glass containers.

## Shapes

The shape language is defined by **Extreme Circularity**.

All primary containers use a 24px to 32px radius to feel friendly and organic. Buttons and chips are strictly **pill-shaped** (full radius). This softness is a direct counter-balance to the precision of the financial data, making the app feel less like a spreadsheet and more like a lifestyle companion.

## Components

- **Buttons:** Primary buttons are pill-shaped, solid Vibrant Green (`#00FF66`) with dark forest green (`#003812`) text. Secondary buttons use the glass style with a thin 1px border.
- **Glass Cards:** The standard container. Always semi-transparent with blur. Borders should be a subtle 1px white/green at 5% opacity to define the edge against the dark background.
- **Input Fields:** Large, pill-shaped fields with a background of `rgba(26, 36, 27, 0.4)`. Focus states switch the border to solid Vibrant Green (`#00FF66`) or Electric Cyan (`#00E5FF`).
- **Chips:** Small, highly-rounded tags for categories. Use low-saturation versions of the flow colors (e.g., a dark green background with `#00FF66` text at 20% opacity for "Income" tags).
- **Progress Bars:** Thick (8px+), fully rounded tracks. The background track is semi-transparent, while the progress indicator is a solid, vibrant brand color (Vibrant Green or Electric Cyan).
- **Iconography:** Icons must be thin-stroke (1.5pt to 2pt), rounded-end line icons (local icon pack in `src/shared/icons`, Lucide/Feather geometry). They should be colored in Snow White (`#F0F0F0`), Sage Grey (`#8A9A8B`), or the specific Flow color relevant to their context.
