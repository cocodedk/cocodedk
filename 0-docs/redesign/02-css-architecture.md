# CSS Architecture

## File Organization

Split CSS into small, focused files (each ≤ 100 lines) to maintain clarity and reusability.

### Core CSS Files
- **colors.css** (30 lines) - CSS custom properties only
- **glassmorphism.css** (50 lines) - Reusable glass effects
- **backgrounds.css** (40 lines) - Gradients and main background
- **typography.css** (60 lines) - Fonts, text styles
- **hero.css** (60 lines) - Hero section
- **service-cards.css** (80 lines) - Service card component
- **activity-feed.css** (90 lines) - Activity feed section
- **language-selector.css** (70 lines) - Language menu
- **modals.css** (80 lines) - Modal styles
- **animations.css** (90 lines) - Keyframes and transitions
- **responsive.css** (95 lines) - Media queries

## Import Order (index.html)
```html
<link rel="stylesheet" href="css/colors.css">
<link rel="stylesheet" href="css/glassmorphism.css">
<link rel="stylesheet" href="css/backgrounds.css">
<link rel="stylesheet" href="css/typography.css">
<link rel="stylesheet" href="css/hero.css">
<link rel="stylesheet" href="css/service-cards.css">
<link rel="stylesheet" href="css/activity-feed.css">
<link rel="stylesheet" href="css/language-selector.css">
<link rel="stylesheet" href="css/modals.css">
<link rel="stylesheet" href="css/animations.css">
<link rel="stylesheet" href="css/responsive.css">
```

## Color Variables Usage
All files reference CSS custom properties defined in colors.css:
- `--primary-bg`
- `--secondary-bg`
- `--accent-warm`
- `--accent-coral`
- etc.

## Naming Convention
- `.section-name` - Main sections
- `.component-name` - Components
- `.component-name__element` - BEM sub-elements
- `.is-active` - States
- `.u-` prefix - Utilities

## Line Limits Per File
Keep all files under 100 lines for maintainability.
If a component needs more, split into separate files.
