# Deployment Fix - Bundled Scripts

## Issue
Production server (one.com) was receiving 404 errors for individual JS files because HTML referenced unbundled source files instead of webpack bundles.

## Solution
Removed manual script tags from template. Webpack now auto-injects bundled scripts.

## Deployment Steps

1. Upload entire `dist/` folder contents to production root:
   - All `*.bundle.js` files
   - `css/` folder
   - `images/` folder
   - `index.html`

2. Verify these files exist on production:
   - nodes.bundle.js
   - contactModal.bundle.js
   - terminal.bundle.js
   - serviceCard.bundle.js
   - activityCard.bundle.js
   - cache.bundle.js
   - linkify.bundle.js
   - githubAPI.bundle.js
   - youtubeAPI.bundle.js
   - linkedinAPI.bundle.js
   - main.bundle.js

## Files Changed
- `templates/template.html` - Removed manual script tags
- `dist/index.html` - Regenerated with webpack-injected bundles

