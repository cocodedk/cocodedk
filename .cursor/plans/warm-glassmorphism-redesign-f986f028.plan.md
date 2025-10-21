<!-- f986f028-5084-4f09-9b24-4da46d5f2d5c 4067979c-322b-4bb0-b850-97e9a121c260 -->
# Warm Glassmorphism Site Redesign

## Overview

Transform site into warm glassmorphism design with floating cards, terminal hero, and dynamic activity feeds (GitHub, LinkedIn, YouTube). Keep all 11 languages. Follow strict file size limits (100 lines max) and MVP principles.

## Documentation Structure (./0-docs/)

All implementation docs will be created in `./0-docs/redesign/` with enumeration:

- `01-color-palette.md` - Warm color variables and usage
- `02-css-architecture.md` - CSS file structure (small chunks)
- `03-service-cards.md` - Card component specs
- `04-terminal-effect.md` - Hero typewriter specs
- `05-activity-feeds.md` - API integration specs
- `06-animations.md` - Animation timing and effects
- `07-testing-plan.md` - Playwright test scenarios

## File Structure (Respecting 100-line Limit)

### CSS Files (Small Chunks)

```
css/
  colors.css              (30 lines) - Color variables only
  backgrounds.css         (40 lines) - Gradients and backgrounds
  glassmorphism.css       (50 lines) - Shared glass effects
  hero.css                (60 lines) - Hero section styles
  service-cards.css       (80 lines) - Card component styles
  activity-feed.css       (90 lines) - Activity feed styles
  language-selector.css   (70 lines) - Language menu styles
  modals.css              (80 lines) - Modal styles
  animations.css          (90 lines) - Keyframes and transitions
  responsive.css          (95 lines) - Media queries
```

### JS Files (Under 100 Lines Each)

```
js/
  config.js               (30 lines) - App configuration
  
  components/
    terminal.js           (80 lines) - Terminal typewriter effect
    service-card.js       (90 lines) - Single card component
    activity-card.js      (75 lines) - Activity feed item
    modal.js              (85 lines) - Modal manager
  
  api/
    github.js             (95 lines) - GitHub API client
    youtube.js            (90 lines) - YouTube API client
    linkedin.js           (60 lines) - LinkedIn handler
  
  utils/
    cache.js              (70 lines) - localStorage cache manager
    debounce.js           (20 lines) - Debounce utility
    animations.js         (85 lines) - Animation helpers
    language.js           (90 lines) - Language utilities
  
  main-init.js            (95 lines) - Main initialization
```

## MVP Implementation Phases

### Phase 1: Foundation (Commit after each)

1. **Colors & Background** - Update color palette, test contrast

   - Create `css/colors.css`, `css/backgrounds.css`
   - Update existing styles to use new colors
   - Doc: `./0-docs/redesign/01-color-palette.md`
   - **Commit**: "feat: add warm color palette and backgrounds"

2. **Glassmorphism Base** - Create reusable glass effects

   - Create `css/glassmorphism.css`
   - Doc: `./0-docs/redesign/02-css-architecture.md`
   - **Commit**: "feat: add glassmorphism utilities"

### Phase 2: Hero & Terminal (Commit after each)

3. **Hero Section Layout** - HTML structure for hero

   - Update `index.html` hero section
   - Create `css/hero.css`
   - **Commit**: "feat: add hero section structure"

4. **Terminal Effect** - Typewriter animation

   - Create `js/components/terminal.js`
   - Add terminal text with blinking cursor
   - Doc: `./0-docs/redesign/04-terminal-effect.md`
   - **Commit**: "feat: add terminal typewriter effect"

### Phase 3: Service Cards (Commit after each)

5. **Remove Cytoscape** - Clean up graph dependencies

   - Remove graph container from HTML
   - Remove unused Cytoscape files
   - **Commit**: "refactor: remove cytoscape graph"

6. **Card Component** - Build service card

   - Create `js/components/service-card.js`
   - Create `css/service-cards.css`
   - Doc: `./0-docs/redesign/03-service-cards.md`
   - **Commit**: "feat: add service card component"

7. **Cards Grid** - Layout cards in grid

   - Update HTML with cards grid
   - Wire up card click handlers
   - **Commit**: "feat: add service cards grid layout"

### Phase 4: Activity Feeds (Commit after each)

8. **Cache Manager** - localStorage caching

   - Create `js/utils/cache.js`
   - Test cache expiration logic
   - **Commit**: "feat: add cache manager utility"

9. **GitHub API** - Fetch repos and commits

   - Create `js/api/github.js`
   - Test API calls and rate limiting
   - Doc: `./0-docs/redesign/05-activity-feeds.md`
   - **Commit**: "feat: add github api integration"

10. **YouTube API** - Fetch latest videos

    - Create `js/api/youtube.js`
    - Add API key configuration
    - **Commit**: "feat: add youtube api integration"

11. **LinkedIn Handler** - Manual/automated updates

    - Create `js/api/linkedin.js`
    - Setup fallback for limited API
    - **Commit**: "feat: add linkedin activity handler"

12. **Activity Feed UI** - Display activity cards

    - Create `css/activity-feed.css`
    - Create `js/components/activity-card.js`
    - Wire up API data to UI
    - **Commit**: "feat: add activity feed section"

### Phase 5: Animations (Commit after each)

13. **Entrance Animations** - Staggered reveals

    - Create `js/utils/animations.js`
    - Create `css/animations.css`
    - Add card entrance effects
    - Doc: `./0-docs/redesign/06-animations.md`
    - **Commit**: "feat: add entrance animations"

14. **Scroll Effects** - Parallax and smooth scroll

    - Add scroll listeners
    - Implement parallax
    - **Commit**: "feat: add scroll animations"

### Phase 6: Polish (Commit after each)

15. **Language Selector** - Update colors

    - Update `css/language-selector.css`
    - Test all 11 languages
    - **Commit**: "style: update language selector colors"

16. **Modal Updates** - Warm glassmorphism

    - Update `css/modals.css`
    - Test modal interactions
    - **Commit**: "style: update modals to warm theme"

17. **Responsive Design** - Mobile/tablet optimization

    - Create `css/responsive.css`
    - Test breakpoints
    - **Commit**: "feat: add responsive design"

18. **Performance Optimization** - 60fps animations

    - Optimize animations
    - Add will-change properties
    - Test cross-browser
    - **Commit**: "perf: optimize animations"

### Phase 7: Testing (Commit after)

19. **Playwright Tests** - E2E test suite

    - Create test files in `tests/`
    - Test card interactions, modals, API calls
    - Doc: `./0-docs/redesign/07-testing-plan.md`
    - **Commit**: "test: add playwright e2e tests"

## Branch Strategy

- Create branch: `feature/warm-glassmorphism-redesign`
- Merge to `reshape` after all phases complete
- Each phase can have sub-branches if needed

## Dead Code Removal

- Remove all Cytoscape-related files
- Remove unused CSS selectors
- Remove commented-out code
- Clean up after each phase

## API Configuration Needed

- GitHub: No key needed (public API)
- YouTube: API key required (will need user to provide)
- LinkedIn: May need manual configuration

## Key Constraints

- Every file ≤ 100 lines
- CSS in small, focused chunks
- Commit after each task
- Documentation in enumerated files
- MVP approach - simplest solution first
- No unit tests - only Playwright E2E tests

### To-dos

- [ ] Create warm color palette variables and test color contrast ratios
- [ ] Replace cool gradients with warm gradients (burgundy, charcoal, dark orange)
- [ ] Create service-cards.css with glassmorphism card styles and warm borders
- [ ] Update index.html to replace graph container with cards grid structure
- [ ] Implement service-cards.js for hover effects and modal triggers
- [ ] Create terminal-effect.js with typewriter animation for hero text
- [ ] Add staggered card entrance animations with fade + slide effects
- [ ] Update modal styles to match warm glassmorphism theme
- [ ] Test and optimize responsive layouts for mobile and tablet
- [ ] Optimize animations for 60fps and test cross-browser compatibility