# Modular Nodes Structure

## Overview
Nodes refactored into individual files for faster editing and management.

## Structure
```
js/data/nodes/
├── 01-cocode-dk.js          # Main hub node
├── 02-ai-integration.js     # AI Integration card
├── 03-mcp-development.js    # MCP Development card
├── 04-openai-integration.js # OpenAI Integration card
├── 05-fullstack-innovation.js # Fullstack Innovation card
├── 06-spec-driven-development.js # Spec-Driven Development card
├── 07-cybersecurity-audit.js # Cybersecurity Audit card
├── 08-fits-dk.js            # FITS.DK partnership card
├── 09-contact.js            # Contact card
├── 10-github.js             # GitHub link
└── 11-linkedin.js           # LinkedIn link
```

## Reordering Cards
To change card order in the grid:
1. Open `js/nodes.js`
2. Reorder the imports at the top
3. Update the `window.nodes` array order
4. Run `npm run build`

## Editing a Card
1. Navigate to the specific node file
2. Edit content (labels, translations, x/y coords)
3. Save
4. Run `npm run build`

## Benefits
- Faster file navigation
- Easier content updates
- Clear organization
- Simple reordering

