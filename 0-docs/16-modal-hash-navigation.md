# Modal Hash Navigation Implementation

## Feature
Hash-based URL navigation for service card modals with browser back button support.

## How It Works

### Opening Modals
- Click service card → URL changes to `#card-name` (e.g., `#contact`, `#ai-integration`)
- Modal opens and hash is added to browser history
- Works for both node description modals and contact modal

### Closing Modals
- Click close button/overlay → Hash removed from URL
- Press ESC key → Hash removed from URL
- Press browser back button → Modal closes automatically

### Back Button Navigation
- User opens modal: `cocode.dk` → `cocode.dk#contact`
- User clicks back: Hash removed → Modal auto-closes
- Enables intuitive mobile navigation

## Technical Details

### Modified Files
1. `js/main/showNodeDescriptionModal.js` - Add hash when opening
2. `js/main/closeNodeDescriptionModal.js` - Remove hash when closing
3. `js/contact-modal.js` - Add/remove hash for contact modal
4. `js/main.js` - Listen for popstate events, close modals when hash removed

### Hash Format
- Node ID converted to lowercase with spaces replaced by hyphens
- Example: "AI Integration" → `#ai-integration`
- Contact modal → `#contact`

### Language Hash Compatibility
- Valid language codes: en, da, es, zh, ja, de, ar, fa, hi, ur, fr
- Language hashes still work: `cocode.dk#da`
- Modal hashes don't interfere with language selection
- On page load, only valid language codes are used for language setting

## Benefits
- Shareable URLs: `cocode.dk#contact` opens directly to contact modal
- Browser back button works intuitively
- Better mobile UX (back button closes modals)
- Navigation history preserved

