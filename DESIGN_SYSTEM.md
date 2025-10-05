# Design System — Tabs Component

Source: Figma node 6546:1177

## Tokens
- color.primary.blue: #002c77
- color.tertiary.blue: #1b222f
- color.interactive.button.focus.border.on-light: #009de0
- font-family-base: Noto Sans
- font-size-base: 16px
- line-height-base: 24px
- space-20: 20px (horizontal padding)
- space-12: 12px (vertical padding)
- disabled opacity: 0.7

## Component: TabButton V3 (Underline, Medium)

States
- Default: label color tertiary, underline hidden (opacity 0)
- Hover: subtle background, underline visible
- Selected: label color primary, font-weight 600, underline visible
- Focus: 3px border focus ring, underline animates
- Disabled: opacity 0.7, pointer-events: none

## Motion
- Use a short easing (120-200ms) for underline reveal. Implement bottom-to-top or left-to-right as needed.

## Usage
- Tabs are horizontal, allow overflow on small screens.
- Use semantic roles: tablist/tabpanel; keyboard support (Arrow keys, Home/End).

## Files
- tokens: `src/styles/_tokens.scss`
- Tabs component: `src/components/Tabs/Tabs.tsx`
- Tabs styles: `src/components/Tabs/Tabs.module.scss`

## Next steps
- Implement exact motion animations using CSS transitions.
- Convert icons to SVGR for better control.
