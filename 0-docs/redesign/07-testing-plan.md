# Testing Plan - Playwright E2E

## Test Categories

### 1. Visual Regression
- [ ] Hero section renders with warm colors
- [ ] Service cards display in correct grid layout
- [ ] Terminal text appears in correct color
- [ ] Activity feed section visible
- [ ] Language selector shows correct colors

### 2. Interactions
- [ ] Card hover effect triggers scale/glow
- [ ] Card click opens modal
- [ ] Modal close button works
- [ ] Language selector toggle opens menu
- [ ] Language selection changes text content

### 3. Terminal Effect
- [ ] Text types out character by character
- [ ] Cursor blinks after text complete
- [ ] Language change restarts animation
- [ ] Animation respects reduced-motion preference

### 4. API Integration
- [ ] GitHub API fetch succeeds
- [ ] YouTube API fetch (with key) succeeds
- [ ] LinkedIn data displays
- [ ] Cache stores and retrieves data
- [ ] Rate limit handling graceful

### 5. Responsive Design
- [ ] Desktop layout (1200px+): 4-column cards
- [ ] Tablet layout (768px-1199px): 3-column cards
- [ ] Mobile layout (≤767px): 1-2 column cards
- [ ] Touch interactions work on mobile
- [ ] Font sizes scale appropriately

### 6. Accessibility
- [ ] Keyboard navigation works
- [ ] Tab order correct
- [ ] Focus indicators visible
- [ ] ARIA labels present
- [ ] Reduced motion respected

### 7. Performance
- [ ] Page load < 2 seconds
- [ ] Animations smooth (60fps)
- [ ] No layout shifts (CLS < 0.1)
- [ ] Cross-browser compatibility

## Test File Structure
```
tests/
  01-visual.spec.js
  02-interactions.spec.js
  03-terminal.spec.js
  04-api.spec.js
  05-responsive.spec.js
  06-accessibility.spec.js
  07-performance.spec.js
```

## Key Test Scenarios
1. Page loads, hero appears
2. Terminal types out text
3. Cards render and hover effects work
4. Click card opens modal
5. Switch language restarts terminal
6. Activity feed loads data
7. Mobile viewport stacks cards vertically

## CI/CD Integration
- Run tests on every commit
- Fail build if tests fail
- Generate coverage report
