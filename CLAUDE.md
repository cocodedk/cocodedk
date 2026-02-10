# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website (cocode.dk) for an IT consultancy specializing in software development and cybersecurity. The site features a "warm glassmorphism" design with multi-language support (11 languages) and interactive components including service cards, terminal typewriter effects, and activity feeds from GitHub/YouTube/LinkedIn.

## Common Commands

### Build & Development
```bash
# Install dependencies
npm install

# Development server (opens browser at http://localhost:8080)
npm run dev

# Production build (outputs to dist/)
npm run build

# Run tests
npm test

# Watch mode for tests
npm run test:watch
```

### Testing
- Test files: Uses Jest with jsdom environment
- Test pattern: `tests/**/*.test.js` and `tests/**/*.test.ts`
- Setup file: `tests/jest.setup.js`
- Note: Some tests may be skipped (`.skip`) - do not modify skipped tests unless explicitly instructed

### Deployment
- Automatically deploys to GitHub Pages on push to `main` branch
- GitHub Action: `.github/workflows/deploy-pages.yml`
- Deployment artifact: `dist/` directory

## Architecture & Key Patterns

### Module System
- **Bundler**: Webpack with multiple entry points (see `webpack.config.js`)
- **TypeScript**: Configured for ES6 target with strict null checks
- **Babel**: Used for transpiling TypeScript and modern JavaScript

### Code Organization
```
js/                          # JavaScript modules
  ├── components/           # UI components (terminal, cards, overlays)
  ├── api/                  # External API integrations (GitHub, YouTube, LinkedIn)
  ├── utils/                # Utilities (cache, linkify)
  ├── data/                 # Data definitions (nodes, portfolio, translations)
  └── main/                 # Main application modules (modularized functions)

src/ts/                     # TypeScript source (Cytoscape integration - in progress)
  └── cytoscape/            # Graph visualization modules

css/                        # Stylesheets (colors, glassmorphism, components)
templates/                  # HTML templates
dist/                       # Build output (ignored in git)
```

### Key Components

**Node System**
- Node definitions: `js/data/nodes/` - individual ES6 modules for each node
- Central registry: `js/nodes.js` - imports and exposes all nodes to `window.nodes`
- Links between nodes defined in `window.links` array
- Each node has translations for 11 languages

**Language Support**
- Supported languages: en, da, es, zh, ja, de, ar, fa, hi, ur, fr
- Translation files: `js/data/*-translations.js`
- Default language: Danish (da)
- Language state managed in `js/main.js` via `mainCurrentLanguage`

**Glassmorphism Design**
- Color palette: `css/colors.css` with CSS variables
- Glassmorphic effects: `css/glassmorphism.css` with backdrop blur utilities
- Warm color scheme: coral, amber, terracotta on dark charcoal backgrounds

**Cache System**
- Implementation: `js/utils/cache.js`
- Uses localStorage with TTL (5 minutes default)
- Used for GitHub/YouTube/LinkedIn API responses

### TypeScript Integration
- Cytoscape TypeScript modules in `src/ts/cytoscape/` are work-in-progress
- TS compiled via ts-loader in webpack
- Type definitions: `src/ts/types/cytoscape.d.ts`
- Functions exposed to global window namespace for JS interop

### Global Namespace Pattern
Many modules expose functions to `window` for cross-module communication:
```javascript
window.showNodeDescriptionModal = function() { ... };
window.ContactModal = { showModal: function() { ... } };
window.nodes = [...];
window.links = [...];
```

## Development Guidelines

### Phased Development
This project follows a structured 7-phase development plan documented in `BUILD-PLAN.md` and `IMPLEMENTATION-STATUS.md`. When making changes:
1. Check current phase status in `IMPLEMENTATION-STATUS.md`
2. Follow implementation sequence to avoid breaking dependencies
3. Do not jump ahead to future phases without completing current work

### Component Development
When creating or modifying components:
- Follow ES6 module pattern with default/named exports
- Expose public APIs to window namespace if needed by other modules
- Support multi-language content via translation files
- Apply warm glassmorphism styling for consistency

### API Integration Pattern
External API integrations follow this structure:
```javascript
// js/api/service-name.js
export async function fetchData() {
  // 1. Check cache first
  // 2. If cached, return cached data
  // 3. If not cached, fetch from API
  // 4. Store in cache with TTL
  // 5. Return data
}
```

### Accessibility
- Cytoscape accessibility features in progress (see `js/README.md`)
- Keyboard navigation: ESC key closes modals
- Screen reader support being implemented
- All interactive elements should have appropriate ARIA attributes

### Environment Variables
- `.env` file contains API keys (SendGrid, reCAPTCHA)
- **CRITICAL**: `.env` is currently tracked in git but should not be committed with real credentials
- For YouTube API, set `window.YOUTUBE_API_KEY` in browser console or config

### Git Workflow
- Main branch: `main` (protected, triggers deployment)
- Feature branches: `feature/*` pattern
- All changes to main should be via pull requests
- Commit messages should reference co-authoring: `Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>`

## Important Files & Their Roles

- `js/main.js` - Application entry point, initializes all components
- `js/nodes.js` - Central node registry for service cards
- `webpack.config.js` - Build configuration with multiple entry points
- `templates/template.html` - Base HTML template with comprehensive SEO meta tags
- `BUILD-PLAN.md` - Development roadmap and execution plan
- `IMPLEMENTATION-STATUS.md` - Current progress tracking
- `js/README.md` - Detailed component documentation

## Testing Considerations

- All tests marked with `.skip` must remain skipped unless explicitly instructed otherwise
- Reference `/issues/test-preservation.md` for test preservation policy
- When implementing functionality, ensure backward compatibility
- Document all new functions following existing patterns

## Common Pitfalls

1. **Language State**: Always use `mainCurrentLanguage` from main.js for current language
2. **Window Namespace**: Components may depend on window-scoped functions - check before refactoring
3. **Node Order**: Node array order in `js/nodes.js` determines display order - change import order to reorder
4. **Cache Keys**: API cache keys must be consistent for cache hits to work
5. **Build Output**: `dist/` is auto-generated - never edit files in dist directly
