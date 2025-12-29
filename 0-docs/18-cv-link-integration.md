# CV Link Integration Plan

## Overview
Add a link to the CV generator site (https://cocodedk.github.io/cv-generator/) from the main cocodedk site.

## Target URL
- **CV Site**: https://cocodedk.github.io/cv-generator/

## Implementation Options

### Option 1: Footer Link (Recommended)
**Location**: Footer section, alongside language selector
**Pros**:
- Non-intrusive
- Consistent with footer design
- Easy to implement
- Always visible

**Implementation**:
- Add CV link in footer, next to or below language selector
- Use icon (📄 or CV icon) + text
- Multilingual support for "CV" / "Resume" text

### Option 2: Header Link
**Location**: Header container, next to logo
**Pros**:
- Highly visible
- Professional placement

**Cons**:
- May clutter header
- Less space available

### Option 3: Service Card Node
**Location**: As a new node in the service cards section
**Pros**:
- Consistent with existing pattern (GitHub, LinkedIn nodes)
- Can include description and icon
- Multilingual support built-in

**Cons**:
- Requires creating new node file
- More complex implementation

### Option 4: Hero CTA Button
**Location**: Hero section, alongside existing CTA buttons
**Pros**:
- High visibility
- Direct call-to-action

**Cons**:
- May compete with primary CTAs
- Less space in hero section

## Recommended Approach: **Option 1 (Footer) + Option 3 (Node)**

### Phase 1: Footer Link (Quick Win)
Add a simple, clean link in the footer section.

### Phase 2: Service Card Node (Enhanced)
Create a CV node similar to GitHub/LinkedIn nodes for consistency.

## Implementation Details

### Phase 1: Footer Link

**Files to Modify**:
- `templates/template.html` - Add CV link in footer
- `js/data/section-translations.js` - Add translations for "CV" / "Resume" text
- `css/footer-lang.css` - Style the CV link

**Design**:
- Icon: 📄 or document icon
- Text: "CV" / "Resume" (multilingual)
- Opens in new tab (`target="_blank"`)
- Hover effect consistent with footer styling
- Responsive design

**Translations Needed**:
- English: "CV"
- Danish: "CV"
- Spanish: "CV"
- Chinese: "简历"
- Japanese: "履歴書"
- German: "Lebenslauf"
- Arabic: "السيرة الذاتية"
- Persian: "رزومه"
- Hindi: "सीवी"
- Urdu: "سی وی"
- French: "CV"

### Phase 2: CV Node

**Files to Create**:
- `js/data/nodes/16-cv.js` - New CV node definition

**Files to Modify**:
- `js/nodes.js` - Import and add CV node to nodes array
- `js/nodes.js` - Add link from 'cocode.dk' to 'CV'

**Node Structure**:
```javascript
{
  id: 'CV',
  x: [position], y: [position], r: 35,
  labels: { /* multilingual labels */ },
  translations: { /* multilingual descriptions */ },
  category: 'CV',
  image: 'data:image/svg+xml;base64,[CV icon SVG]'
}
```

**Node Content**:
- Title: "CV Generator" / "Resume Builder"
- Description: Brief description of the CV generator tool
- Link: https://cocodedk.github.io/cv-generator/
- Icon: Document/resume icon

## Technical Considerations

### Accessibility
- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly

### SEO
- Add to JSON-LD structured data `sameAs` array
- Proper link attributes (`rel="noopener noreferrer"` for external links)

### Styling
- Consistent with existing design system
- Warm color scheme (per user preference)
- Responsive on mobile devices

## File Structure

```
js/
  data/
    nodes/
      16-cv.js (new)
templates/
  template.html (modify)
js/
  nodes.js (modify)
js/
  data/
    section-translations.js (modify)
css/
  footer-lang.css (modify or create footer-cv.css)
```

## Testing Checklist

- [ ] Footer link appears and is clickable
- [ ] Link opens CV site in new tab
- [ ] Translations work for all languages
- [ ] Responsive design on mobile
- [ ] Hover effects work correctly
- [ ] Accessibility (keyboard navigation, screen readers)
- [ ] CV node appears in service cards (Phase 2)
- [ ] CV node link works correctly
- [ ] Node description modal works (if applicable)

## Implementation Order

1. **Phase 1**: Footer link implementation
   - Add translations
   - Add HTML to footer
   - Style the link
   - Test all languages
   - Test responsive design

2. **Phase 2**: CV node implementation
   - Create node file
   - Add to nodes array
   - Add link connection
   - Test node display
   - Test node interactions

## Notes

- CV site is already live at https://cocodedk.github.io/cv-generator/
- No authentication or API keys needed
- Simple external link implementation
- Should open in new tab to keep main site accessible
