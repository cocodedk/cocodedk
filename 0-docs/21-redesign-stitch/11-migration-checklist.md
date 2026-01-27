# 11 - Migration Checklist

## Phase 1: Foundation (Days 1-3)

### 1.1 Setup & Dependencies
- [ ] Add Tailwind CSS CDN to template.html
- [ ] Add Tailwind configuration
- [ ] Import Google Fonts (Space Grotesk, Noto Sans)
- [ ] Import Material Symbols icons
- [ ] Create backup of current CSS files

### 1.2 CSS Architecture
- [ ] Update `css/colors.css` with new color variables
- [ ] Update `css/glassmorphism.css` with new glass effects
- [ ] Create `css/theme/effects.css` for glow effects
- [ ] Add new CSS custom properties

### 1.3 Typography
- [ ] Add font imports to template
- [ ] Create typography utility classes
- [ ] Update body font-family
- [ ] Test font loading performance

### 1.4 Layout Structure
- [ ] Add ambient background glow elements
- [ ] Update body classes
- [ ] Create `.site-container` wrapper (max-width: 448px)
- [ ] Test centered layout on desktop

---

## Phase 2: Navigation (Days 3-4)

### 2.1 Header
- [ ] Create new sticky header structure
- [ ] **Keep current logo** (`images/cocode-logo.png`)
- [ ] Add EN|DK language toggle
- [ ] Add language dropdown for remaining languages
- [ ] Style header with glassmorphism

### 2.2 Bottom Navigation
- [ ] Create bottom nav bar HTML
- [ ] Add nav item icons (Material Symbols)
- [ ] Style with glassmorphism
- [ ] Implement smooth scroll navigation
- [ ] Add scroll-based active state detection

### 2.3 Footer Update
- [ ] Simplify footer to copyright only
- [ ] Remove language selector from footer
- [ ] Add safe area padding for iOS

---

## Phase 3: Hero Section (Days 4-5)

### 3.1 Terminal Card
- [ ] Create terminal card structure
- [ ] Add macOS traffic light dots
- [ ] Style terminal header and body
- [ ] Keep existing terminal typing effect
- [ ] Add status panel (GDPR, NIS2)

### 3.2 Value Proposition Card
- [ ] Create value card with glassmorphism
- [ ] Add "Compliance-Ready" badge
- [ ] Connect headline to translations
- [ ] Add abstract visual with grid lines
- [ ] Implement shimmer animation

### 3.3 CTA Section
- [ ] Style primary button (solid orange)
- [ ] Style secondary button (ghost)
- [ ] Connect to existing onclick handlers
- [ ] Add hover/active states

### 3.4 Trust Badges
- [ ] Create trust badges section
- [ ] Add ISO 27001, GDPR, NIS2 chips
- [ ] Style with glass chip effect

---

## Phase 4: Service Cards (Days 5-6)

### 4.1 Section Header
- [ ] Add "Our Expertise" headline
- [ ] Style with primary color accent
- [ ] Add subtitle text

### 4.2 Card Component
- [ ] Update `js/components/service-card.js`
- [ ] Create new card HTML structure
- [ ] Add icon container
- [ ] Add image section with gradient overlay
- [ ] Style title, description, action link

### 4.3 Card Styling
- [ ] Add glassmorphism background
- [ ] Implement hover glow effect
- [ ] Add scale transition on active

### 4.4 Data & Images
- [ ] Update services data with images
- [ ] Source/create service images
- [ ] Verify translation integration

---

## Phase 5: Portfolio Section (Days 6-7)

### 5.1 Section Setup
- [ ] Add section header with title
- [ ] Create filter chips row
- [ ] Style horizontal scrolling filters

### 5.2 Filter Functionality
- [ ] Implement filter chip click handlers
- [ ] Add filter animation
- [ ] Connect to portfolio data categories

### 5.3 Portfolio Cards
- [ ] Create featured card variant
- [ ] Add image with gradient overlay
- [ ] Add category labels
- [ ] Add status badges
- [ ] Style "View Case Study" links

### 5.4 CTA Banner
- [ ] Create gradient CTA section
- [ ] Add pattern background
- [ ] Style white button

---

## Phase 6: Contact/About (Days 7-8)

### 6.1 About Hero
- [ ] Add "Secure Code. Human Expertise." text
- [ ] Style two-line headline
- [ ] Add subtitle paragraph

### 6.2 Stats Grid
- [ ] Create 2-column stats layout
- [ ] Add stat cards (Experience, Focus)
- [ ] Style icons and values

### 6.3 Location Section
- [ ] Add location header with badge
- [ ] Create map placeholder
- [ ] Add address link

### 6.4 Connect Section
- [ ] Add phone card
- [ ] Create 3-column social grid
- [ ] Add Email, LinkedIn, GitHub links

### 6.5 Contact Form
- [ ] Style form with glass panel
- [ ] Add form inputs with glass-input class
- [ ] Style submit button
- [ ] Verify form submission works

---

## Phase 7: Animations & Polish (Days 8-9)

### 7.1 Ambient Effects
- [ ] Add floating orb animations
- [ ] Test performance
- [ ] Add reduced motion fallbacks

### 7.2 Micro-interactions
- [ ] Add button hover effects
- [ ] Add link underline animations
- [ ] Add icon transitions

### 7.3 Page Transitions
- [ ] Add fade-in on load
- [ ] Add staggered reveal for cards
- [ ] Implement scroll-triggered animations

### 7.4 Performance
- [ ] Audit CSS for unused styles
- [ ] Optimize images (WebP conversion)
- [ ] Test on mobile devices
- [ ] Check Lighthouse score

---

## Phase 8: Testing & QA (Days 9-10)

### 8.1 Functionality Testing
- [ ] Test all 11 languages
- [ ] Test language switching
- [ ] Test contact form submission
- [ ] Test navigation scrolling
- [ ] Test campaign overlay
- [ ] Test all links

### 8.2 Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### 8.3 Responsive Testing
- [ ] Mobile (320px - 480px)
- [ ] Tablet (768px)
- [ ] Desktop (1024px+)
- [ ] Large screens (1440px+)

### 8.4 Accessibility
- [ ] Keyboard navigation
- [ ] Screen reader testing
- [ ] Color contrast verification
- [ ] Focus states visible
- [ ] ARIA labels present

### 8.5 Performance
- [ ] Page load time < 3s
- [ ] First contentful paint < 1.5s
- [ ] No layout shifts
- [ ] Images optimized

---

## Final Steps

### Documentation
- [ ] Update README if needed
- [ ] Document new component APIs
- [ ] Update deployment notes

### Deployment
- [ ] Build production assets
- [ ] Test on staging environment
- [ ] Deploy to production
- [ ] Verify live site

### Cleanup
- [ ] Remove unused legacy CSS
- [ ] Remove unused JavaScript
- [ ] Archive old files
- [ ] Update version numbers

---

## Rollback Plan

If issues arise:
1. Keep backup of current `dist/` folder
2. Keep backup of current CSS files
3. Revert template.html to backup if needed
4. CSS changes are additive, can revert by removing new classes

---

## Notes

- **Logo**: Keep current logo (`images/cocode-logo.png`)
- **Translations**: All existing translations must continue working
- **Terminal effect**: Preserve existing typing animation
- **Contact modal**: Keep functional as quick action
- **Activity feed**: Decide whether to keep, modify, or remove
- **Campaign overlay**: Keep functional

---

## Dependencies Added

```html
<!-- Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">

<!-- Tailwind (CDN for development) -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
```

---

## Estimated Effort

| Phase | Days | Priority |
|-------|------|----------|
| Foundation | 2-3 | High |
| Navigation | 1-2 | High |
| Hero | 1-2 | High |
| Service Cards | 1-2 | Medium |
| Portfolio | 1-2 | Medium |
| Contact/About | 1-2 | Medium |
| Animations | 1-2 | Low |
| Testing | 2 | High |
| **Total** | **10-17** | |
