# 02 - CSS Architecture

## Current Architecture

The current CSS is split into modular files:

```
css/
├── styles.css          # Base styles, resets, typography
├── colors.css          # CSS custom properties for colors
├── backgrounds.css     # Background gradients/effects
├── glassmorphism.css   # Glass effect utilities
├── hero.css            # Hero section styles
├── service-cards.css   # Service card component
├── portfolio-cards.css # Portfolio card component
├── campaign.css        # Campaign overlay
├── activity-feed.css   # Activity feed component
├── modal-links.css     # Modal styling
├── footer-lang.css     # Footer language selector
└── node-display.css    # Node visualization
```

## Proposed Architecture

### Option A: Tailwind Integration (Recommended)

Add Tailwind CSS while preserving existing custom CSS for specialized components.

**Phase 1: Add Tailwind CDN**
```html
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script>
  tailwind.config = {
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          "primary": "#ee5f2b",
          "background-light": "#f8f6f6",
          "background-dark": "#221510",
          "glass-surface": "rgba(34, 21, 16, 0.6)",
          "glass-border": "rgba(255, 255, 255, 0.1)",
        },
        fontFamily: {
          "display": ["Space Grotesk", "sans-serif"],
          "mono": ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"]
        },
        borderRadius: {
          "DEFAULT": "0.25rem",
          "lg": "0.5rem",
          "xl": "0.75rem",
          "2xl": "1rem"
        },
      },
    },
  }
</script>
```

**Phase 2: Build Integration (Later)**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

### New CSS File Structure

```
css/
├── tailwind-config.css  # Tailwind directives (if compiled)
├── base/
│   ├── reset.css        # Minimal reset
│   └── typography.css   # Font imports, text styles
├── theme/
│   ├── colors.css       # CSS variables (updated)
│   └── effects.css      # Glassmorphism, glows
├── layout/
│   ├── container.css    # Mobile-first container
│   ├── header.css       # Sticky header
│   └── navigation.css   # Bottom nav
├── components/
│   ├── terminal-card.css    # Terminal hero
│   ├── service-card.css     # Service cards
│   ├── portfolio-card.css   # Portfolio cards
│   ├── contact-form.css     # Contact form
│   └── buttons.css          # CTA buttons
├── utilities/
│   └── animations.css   # Keyframes, transitions
└── legacy/
    ├── activity-feed.css  # Keep for now
    └── campaign.css       # Keep for now
```

## Updated CSS Variables

Replace `css/colors.css` with new theme:

```css
:root {
  /* === New Design System Colors === */

  /* Primary */
  --primary: #ee5f2b;
  --primary-light: #ff7a47;
  --primary-dark: #c94112;

  /* Backgrounds */
  --bg-dark: #221510;
  --bg-darker: #181311;
  --bg-light: #f8f6f6;
  --bg-surface: #271f1c;

  /* Glass */
  --glass-surface: rgba(34, 21, 16, 0.6);
  --glass-surface-light: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-border-light: rgba(255, 255, 255, 0.1);

  /* Text */
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-tertiary: rgba(255, 255, 255, 0.4);
  --text-muted: #9ca3af;

  /* Status Colors */
  --success: #27c93f;
  --warning: #ffbd2e;
  --error: #ff5f56;
  --info: #60a5fa;

  /* Shadows */
  --shadow-primary: rgba(238, 95, 43, 0.2);
  --shadow-dark: rgba(0, 0, 0, 0.3);
  --shadow-glow: rgba(238, 95, 43, 0.3);

  /* Gradients */
  --gradient-warm: radial-gradient(circle at 50% 0%, rgba(238, 95, 43, 0.15) 0%, transparent 70%);
  --gradient-cta: linear-gradient(to right, var(--primary), #c94112);

  /* Spacing */
  --container-max: 448px;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
  --transition-slow: 500ms ease;

  /* Z-index Scale */
  --z-base: 0;
  --z-above: 10;
  --z-header: 50;
  --z-modal: 100;
  --z-toast: 150;
}

/* Dark mode is default */
html {
  color-scheme: dark;
}
```

## Glassmorphism Utilities

Update `css/glassmorphism.css`:

```css
/* Glass Panel - Default */
.glass-panel {
  background: var(--glass-surface);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
}

/* Glass Panel - Light */
.glass-panel-light {
  background: var(--glass-surface-light);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border-light);
}

/* Glass Navigation (Header/Footer) */
.glass-nav {
  background: rgba(34, 21, 16, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--glass-border);
}

/* Glass Input */
.glass-input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--glass-border-light);
  color: var(--text-primary);
  border-radius: var(--radius-lg);
  padding: 0.75rem 1rem;
  transition: var(--transition-base);
}

.glass-input:focus {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--primary);
  outline: none;
  box-shadow: 0 0 0 2px var(--shadow-primary);
}

/* Glass Chip (Tags/Pills) */
.glass-chip {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--glass-border-light);
  border-radius: var(--radius-full);
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.glass-chip-active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
  box-shadow: 0 4px 12px var(--shadow-glow);
}
```

## Ambient Glow Backgrounds

New file `css/theme/effects.css`:

```css
/* Ambient Background Glows */
.ambient-glows {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
}

.glow-orb-primary {
  background: rgba(238, 95, 43, 0.2);
}

.glow-orb-secondary {
  background: rgba(217, 119, 6, 0.1);
}

.glow-orb-tertiary {
  background: rgba(124, 45, 18, 0.2);
}

/* Warm Glow Background */
.bg-warm-glow {
  background: var(--gradient-warm);
}

/* Card Glow Effect */
.card-glow {
  position: relative;
}

.card-glow::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(to right, var(--primary), #c94112);
  border-radius: inherit;
  filter: blur(4px);
  opacity: 0.2;
  z-index: -1;
  transition: opacity var(--transition-base);
}

.card-glow:hover::before {
  opacity: 0.4;
}
```

## Migration Strategy

### Step 1: Add Tailwind CDN to template
- Insert in `<head>` with config
- Test that existing styles still work

### Step 2: Update CSS variables
- Replace `css/colors.css` with new theme
- Verify all components still render

### Step 3: Add new utility classes
- Update `glassmorphism.css`
- Add `effects.css`

### Step 4: Migrate components one by one
- Start with layout (container, header)
- Then hero section
- Then cards
- Finally navigation

### Step 5: Clean up legacy CSS
- Remove unused styles
- Consolidate duplicates
- Document any kept legacy code
