# Clickable Links in Modal Overlays

## Feature
URLs and email addresses in modal overlay content are now automatically converted to clickable links.

## Implementation
- `js/utils/linkify.js` - Utility to convert text URLs to anchor tags
- `css/modal-links.css` - Warm-colored link styling
- Updated `showNodeDescriptionModal.js` and `node-display.js` to use linkify

## Styling
Links use warm colors: orange on default, coral on hover [[memory:7023960]]

## Usage
Automatically applied to all node translation content containing:
- URLs (with or without http/https)
- Email addresses (converted to mailto links)

