# Redesign Implementation Plan: Stitch Design System

This folder contains the implementation plan for migrating cocode.dk to the new "Stitch" design system based on the mockups in `./stitch_home_secure_software_cyber/`.

## Design Source

The new design mockups include 4 pages:
- **Home** - Terminal hero, value proposition, CTAs, trust badges
- **Services** - Service cards with images, icons, and descriptions
- **Portfolio** - Project cards with filters and case studies
- **Contact/About** - Stats, location map, contact form

## Key Design Characteristics

| Feature | New Design | Current Design |
|---------|------------|----------------|
| Layout | Mobile-first, max-width ~448px centered | Full-width responsive |
| Primary Color | `#ee5f2b` (warm orange) | `#e8735e` (coral) |
| Background | `#221510` (dark brown) | `#1a1a1a` (dark gray) |
| Font | Space Grotesk | System fonts |
| Icons | Material Symbols Outlined | Emoji-based |
| Effects | Glassmorphism + ambient glows | Glass + gradients |
| Navigation | Bottom nav bar (mobile app style) | Traditional footer |

## Preserved Elements

- **Current logo** (as requested)
- Multi-language support (11 languages)
- Terminal typing effect in hero
- Service/portfolio data structure
- Activity feed functionality
- Contact modal system
- Campaign overlay

## Implementation Files

| File | Description | Priority |
|------|-------------|----------|
| [01-design-analysis.md](./01-design-analysis.md) | Design comparison and gap analysis | Reference |
| [02-css-architecture.md](./02-css-architecture.md) | CSS restructure with Tailwind integration | High |
| [03-typography-colors.md](./03-typography-colors.md) | New typography and color system | High |
| [04-layout-structure.md](./04-layout-structure.md) | Layout and container changes | High |
| [05-hero-section.md](./05-hero-section.md) | Hero section with terminal card | High |
| [06-service-cards.md](./06-service-cards.md) | Service cards component update | Medium |
| [07-portfolio-section.md](./07-portfolio-section.md) | Portfolio section with filters | Medium |
| [08-contact-about.md](./08-contact-about.md) | Contact and about page integration | Medium |
| [09-navigation.md](./09-navigation.md) | Bottom navigation implementation | High |
| [10-animations-effects.md](./10-animations-effects.md) | Animations, glows, glassmorphism | Low |
| [11-migration-checklist.md](./11-migration-checklist.md) | Step-by-step migration tasks | Reference |

## Estimated Timeline

- **Phase 1** (Foundation): CSS architecture, typography, colors, layout - 2-3 days
- **Phase 2** (Components): Hero, service cards, portfolio cards - 3-4 days
- **Phase 3** (Features): Navigation, contact, animations - 2-3 days
- **Phase 4** (Polish): Testing, mobile optimization, i18n verification - 1-2 days

**Total Estimate**: 8-12 days

## Notes

- The new design is heavily mobile-first; desktop will need responsive scaling
- Consider keeping Tailwind via CDN during development, then compile for production
- Multi-language support must be preserved in all new components
