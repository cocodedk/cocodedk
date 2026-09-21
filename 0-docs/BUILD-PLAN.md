# Build Plan - Warm Glassmorphism Redesign

## Current Status
✅ **Phase 1-3 Complete** (Committed)
- Documentation, color palette, glassmorphism utilities
- Hero section with terminal typewriter effect
- Service cards grid with language support
- Cytoscape removed

## Phase 4: Activity Feeds (Ready to Execute)
**Files Created:**
- ✅ `js/utils/cache.js` - localStorage cache manager with TTL
- ✅ `js/api/github.js` - GitHub API client (public repos)
- ✅ `js/api/youtube.js` - YouTube API client (requires API key)
- ✅ `js/api/linkedin.js` - LinkedIn activity handler (manual fallback)
- ✅ `css/activity-feed.css` - Activity feed grid styles
- ✅ `js/components/activity-card.js` - Activity card renderer

**To Execute Phase 4:**
```bash
bash /home/bba/0-projects/cocodedk/run-phase-4.sh
```

This script will:
1. Update `index.html` with CSS links and script tags
2. Add activity feed section to HTML
3. Update `main.js` to initialize activity feed on page load
4. Commit all changes with message

## Remaining Phases

### Phase 5: Animations (To Be Implemented)
Create entrance animations and scroll effects:
- `css/animations.css` - Keyframes for staggered card reveals
- `js/utils/animations.js` - Animation helper functions
- Scroll effects with parallax

### Phase 6: Polish (To Be Implemented)  
Update existing components to warm theme:
- `css/language-selector.css` - Warm color updates
- Update modals to warm glassmorphism
- `css/responsive.css` - Media query consolidation
- Performance optimization

### Phase 7: Testing (To Be Implemented)
Playwright E2E tests:
- `tests/01-visual.spec.js` - Visual regression tests
- `tests/02-interactions.spec.js` - Card interactions
- `tests/03-terminal.spec.js` - Terminal animation
- `tests/04-api.spec.js` - API integration
- `tests/05-responsive.spec.js` - Responsive layouts

## Important Notes

### YouTube API Setup Required
When Phase 4 is complete, configure YouTube API:
```javascript
// In browser console or config:
window.YOUTUBE_API_KEY = 'your-api-key-here';
```

Get free API key from: https://console.cloud.google.com/

### Configuration
- GitHub: No config needed (public API, 60 req/hour)
- YouTube: Requires API key (10,000 units/day free)
- LinkedIn: Manual updates (API limited)

### Cache Behavior
- All activity data cached for 5 minutes
- Cache stored in localStorage with timestamps
- Automatic fallback if APIs fail
- Manual refresh available

## File Structure After Phase 4
```
js/
  utils/
    cache.js (70 lines)
  api/
    github.js (62 lines)
    youtube.js (55 lines)
    linkedin.js (62 lines)
  components/
    activity-card.js (87 lines)
css/
  activity-feed.css (95 lines)
```

## Commits Made
1. ✅ Phase 1-3: 5 commits
2. ⏳ Phase 4: Ready (run script)
3. ⏳ Phase 5-7: Pending

## Next Steps
1. Run Phase 4 script
2. Test GitHub/YouTube/LinkedIn data loading
3. Configure YouTube API key if needed
4. Proceed with Phase 5 (Animations)
5. Polish (Phase 6)
6. Testing (Phase 7)

## Quick Checklist
- [ ] Run Phase 4 script: `bash run-phase-4.sh`
- [ ] Verify activity feed loads
- [ ] Test GitHub repos appear
- [ ] (Optional) Configure YouTube API key
- [ ] Check responsive on mobile
- [ ] Ready for Phase 5
