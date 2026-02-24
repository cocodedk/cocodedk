# CLAUDE.md

## Commands

```bash
npm run dev       # Dev server localhost:8080
npm run build     # Production build → /dist
npm test          # Jest (jsdom)
npm run lint:length  # Check 200-line file limit
```

## Architecture

Vanilla JS SPA (no framework). Webpack 5, Warm Glassmorphism design, 2 languages (en, da).

- **Entry**: `js/main.js` → initializes components on `DOMContentLoaded`
- **Template**: `templates/template.html` (single page, Webpack-injected bundles)
- **Bundles**: Separate entries in `webpack.config.js`; components expose via `window.*`
- **i18n**: Hash navigation (`#en`, `#da`) + localStorage. Strings in `js/data/section-translations.js`
- **APIs**: `js/api/{github,youtube,linkedin}.js` with 5-min localStorage cache
- **CSS**: Component files in `css/`, tokens in `css/colors.css`, copied to dist (not JS-imported)

## Brand

AI agent development & cybersecurity compliance for Danish SMEs. USP: "AI agents that are secure and compliant from day one." Portfolio: MCP servers (Planner, Calendar, CodeScan) + FITS.DK GRC platform.

## Conventions

- **Max 200 lines per file** — enforced by pre-commit hook and CI
- **New code in TypeScript** (`src/ts/`)
- **One feature per commit**
- **Components**: self-contained in `js/components/`, attached to `window.*`

## Deploy

Push to `main` → GitHub Actions → `npm ci && npm run build` → GitHub Pages.
