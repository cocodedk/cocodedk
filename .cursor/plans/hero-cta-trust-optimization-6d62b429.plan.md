<!-- 6d62b429-afa1-4174-a343-ea3556aa9b90 a585e1e7-1ad5-410d-ac9c-ebf636202e5e -->
# Hero, CTA, Trust & Link Preview Optimization

## 1. Enhanced Hero Section with Multilingual Value Proposition

**Create**: `js/data/hero-translations.js` - New file with translations for all 11 languages

Structure with headline, valueProp, and ctaButton objects containing all language codes (en, da, es, zh, ja, de, ar, fa, hi, ur, fr).

**Update**: `index.html` (lines 138-144) - Change hero structure to use dynamic IDs:

```html
<h1 class="hero-headline" id="hero-headline"></h1>
<p class="hero-value-prop" id="hero-value-prop"></p>
<button class="cta-button" id="cta-button" onclick="showContactModal()"></button>
```

**Update**: `js/main/setLanguage.js` - Add hero content update logic to call new function that updates hero headline, value prop, and CTA button text based on current language.

**Create**: `js/main/updateHeroContent.js` - New helper function (< 100 lines) that loads hero translations and updates DOM elements.

**Update**: `css/hero.css` - Add new styles:

- `.hero-headline`: 24px font, bold, warm accent color
- `.hero-value-prop`: 18px, readable, secondary text color
- `.cta-button`: warm-colored button (coral/amber from existing palette), hover effects, min 44px height

## 2. Detailed Service Node Content

**Update**: Expand 4 key service node files in `js/data/nodes/`:

- `01-cocode-dk.js`: Overview of cocode.dk offerings
- `02-ai-integration.js`: Specific AI services with 2-3 value bullets
- `05-fullstack-innovation.js`: Django/Neo4j details with deliverables
- `07-cybersecurity-audit.js`: Verify format consistency (already detailed)

Each service description should include specific deliverables, benefits/outcomes, and technologies/standards covered in all 11 languages.

## 3. About Section & Trust Signals

**Create**: `js/data/nodes/13-about.js` - New node with multilingual content:

- Background (software engineer, podcaster, consultant)
- Experience and specializations
- Key certifications (cybersecurity, compliance)
- Methodology/approach
- Note for professional photo placeholder

**Create**: `js/data/nodes/14-testimonials.js` - New node with multilingual content:

- 2-3 anonymized testimonial placeholders
- Format: Quote with measurable outcomes + Role/Industry/Country
- Focus on results (e.g., compliance achieved, time saved)

## 4. Open Graph Enhancement for Rich Link Previews

**Update**: `index.html` (lines 38-53) - Enhance/replace Open Graph meta tags:

Add comprehensive OG tags:

- `og:type`, `og:title`, `og:description` (updated with stronger copy)
- `og:image` (with width: 1200, height: 630)
- `og:image:alt`, `og:url`, `og:site_name`

Add Twitter Card tags:

- `twitter:card` (summary_large_image)
- `twitter:title`, `twitter:description`, `twitter:image`

**Note**: Document that existing logo may need optimization to 1200x630px for optimal social sharing.

## 5. Mobile Responsiveness Optimization

**Update**: `css/hero.css` - Add/verify mobile responsive styles:

- CTA button min 44px height for touch targets
- Hero headline responsive sizing (smaller on mobile)
- Value prop text legible at 320px width minimum
- Verify no overlap with footer
- Test on existing mobile breakpoints (768px, 480px)

## 6. Service Cards Preview Enhancement

**Update**: `js/components/service-card.js` (line 17):

- Change preview from 100 to 150 characters
- Verify modal rendering handles expanded content properly

## 7. Documentation

**Create**: `0-docs/17-hero-cta-trust-optimization.md`

Document:

- Hero structure and multilingual implementation
- CTA integration with contact modal
- New About and Testimonials nodes
- Open Graph tags for link previews
- Content placeholders requiring real data
- Social sharing image requirements (1200x630px)

## Implementation Notes

**Key principles**:

- Maintain existing warm color palette (coral/amber)
- Keep glassmorphism effects and current design aesthetic
- Single-page layout with existing modal system
- All content in 11 languages (en, da, es, zh, ja, de, ar, fa, hi, ur, fr)
- Follow 100-line file limit (create helper files as needed)
- Commit after completion per workspace rules

**Content placeholders**: About section, testimonials, and detailed service descriptions will use professional placeholder text that site owner should replace with actual content.

**Image optimization**: Note requirement for 1200x630px social sharing image in documentation.

### To-dos

- [ ] Update hero section HTML and CSS with clear value proposition and headline
- [ ] Add prominent CTA button that opens contact modal with proper styling
- [ ] Expand service node files with specific deliverables and value bullets
- [ ] Create About node with background, expertise, and certifications
- [ ] Create Testimonials node with anonymized case study placeholders
- [ ] Enhance Open Graph and Twitter Card meta tags for rich link previews
- [ ] Test and optimize mobile responsiveness for new hero and CTA
- [ ] Create documentation file in 0-docs for changes and content requirements