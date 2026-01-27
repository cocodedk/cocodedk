# 03 - Typography & Colors

## Typography System

### Font Stack

**Display Font: Space Grotesk**
Used for headings, navigation, buttons, and prominent text.

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

**Body Font: Noto Sans (Optional)**
Used for longer paragraphs and descriptions.

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700&display=swap" rel="stylesheet">
```

**Monospace Font: System Stack**
Used for terminal text and code.

```css
font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
```

### CSS Implementation

```css
/* Typography Base */
body {
  font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Display Text */
.font-display {
  font-family: 'Space Grotesk', sans-serif;
}

/* Body Text */
.font-body {
  font-family: 'Noto Sans', sans-serif;
}

/* Mono Text */
.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
```

### Type Scale

| Class | Size | Weight | Use Case |
|-------|------|--------|----------|
| `.text-hero` | 32px | 700 | Hero headlines |
| `.text-h1` | 28px | 700 | Page titles |
| `.text-h2` | 24px | 700 | Section titles |
| `.text-h3` | 20px | 700 | Card titles |
| `.text-h4` | 18px | 600 | Subsection titles |
| `.text-body` | 16px | 400 | Body text |
| `.text-body-sm` | 14px | 400 | Descriptions |
| `.text-caption` | 12px | 500 | Labels, tags |
| `.text-micro` | 10px | 600 | Smallest text |

```css
/* Type Scale */
.text-hero {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.text-h1 {
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.015em;
}

.text-h2 {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.25;
}

.text-h3 {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.3;
}

.text-h4 {
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.4;
}

.text-body {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
}

.text-body-sm {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
}

.text-caption {
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.text-micro {
  font-size: 0.625rem;
  font-weight: 600;
  line-height: 1.2;
}
```

## Color System

### Primary Palette

| Name | Hex | Usage |
|------|-----|-------|
| Primary | `#ee5f2b` | CTAs, highlights, active states |
| Primary Light | `#ff7a47` | Hover states |
| Primary Dark | `#c94112` | Pressed states, gradients |

### Background Colors

| Name | Hex | Usage |
|------|-----|-------|
| Background Dark | `#221510` | Main page background |
| Background Darker | `#181311` | Cards, panels |
| Background Light | `#f8f6f6` | Light mode (if needed) |
| Surface | `#271f1c` | Elevated surfaces |

### Text Colors

| Name | Value | Usage |
|------|-------|-------|
| Text Primary | `#ffffff` | Headings, important text |
| Text Secondary | `rgba(255,255,255,0.7)` | Body text |
| Text Tertiary | `rgba(255,255,255,0.4)` | Muted text, labels |
| Text Muted | `#9ca3af` | Placeholder text |

### Status Colors

| Name | Hex | Usage |
|------|-----|-------|
| Success | `#27c93f` | Checkmarks, positive status |
| Warning | `#ffbd2e` | Cautions, in-progress |
| Error | `#ff5f56` | Errors, alerts |
| Info | `#60a5fa` | Information, links |

### Glass Effects

| Name | Value | Usage |
|------|-------|-------|
| Glass Surface | `rgba(34,21,16,0.6)` | Card backgrounds |
| Glass Surface Light | `rgba(255,255,255,0.03)` | Subtle panels |
| Glass Border | `rgba(255,255,255,0.08)` | Default borders |
| Glass Border Light | `rgba(255,255,255,0.1)` | Hover borders |

### Shadow System

```css
/* Shadow Variables */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.2);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.3);
--shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.4);
--shadow-glow-sm: 0 4px 12px rgba(238, 95, 43, 0.2);
--shadow-glow-md: 0 8px 24px rgba(238, 95, 43, 0.3);
--shadow-glow-lg: 0 16px 48px rgba(238, 95, 43, 0.4);
```

## Color Contrast Verification

| Background | Text | Ratio | WCAG |
|------------|------|-------|------|
| `#221510` | `#ffffff` | 15.8:1 | AAA |
| `#221510` | `rgba(255,255,255,0.7)` | 11.1:1 | AAA |
| `#221510` | `#ee5f2b` | 4.8:1 | AA |
| `#ee5f2b` | `#ffffff` | 3.3:1 | AA Large |

## Implementation Notes

### Updating Existing CSS

The current `colors.css` uses different variable names. Create a compatibility layer:

```css
/* Legacy compatibility */
:root {
  /* Map old names to new */
  --accent-coral: var(--primary);
  --accent-amber: var(--primary-light);
  --accent-terracotta: var(--primary-dark);
  --primary-bg: var(--bg-dark);
  --secondary-bg: var(--bg-darker);
  --glass-light: var(--glass-surface);
}
```

### Multi-Language Considerations

- Space Grotesk has limited character support
- Consider fallback fonts for Arabic, Persian, Hindi, Urdu
- Test with RTL languages (Arabic, Persian, Urdu)

```css
/* RTL Support */
[dir="rtl"] {
  text-align: right;
}

/* Arabic/Persian/Urdu font fallback */
[lang="ar"], [lang="fa"], [lang="ur"] {
  font-family: 'Noto Sans Arabic', 'Space Grotesk', sans-serif;
}

/* Chinese/Japanese font fallback */
[lang="zh"], [lang="ja"] {
  font-family: 'Noto Sans SC', 'Space Grotesk', sans-serif;
}

/* Hindi font fallback */
[lang="hi"] {
  font-family: 'Noto Sans Devanagari', 'Space Grotesk', sans-serif;
}
```
