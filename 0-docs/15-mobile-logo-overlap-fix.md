# Mobile Logo Overlap Fix

## Problem
Logo overlaps with terminal text on mobile:
- Logo: positioned at top 15px, size 100px (total ~115px from top)
- Hero padding: only 30px on mobile
- Terminal text starts too early, overlaps with logo

## Solutions

### Option A: Increase Hero Top Padding (Recommended)
- Add more top padding to hero section on mobile
- Ensures logo + terminal text don't overlap
- Mobile: increase from 30px to 100-120px
- **Pros**: Simple, clean separation
- **Cons**: Pushes content down slightly

### Option B: Reduce Logo Size Further
- Make logo 60-80px on mobile instead of 100px
- **Pros**: Saves vertical space
- **Cons**: Logo might be too small, loses brand presence

### Option C: Hide Logo on Mobile
- Show logo only on desktop/tablet
- **Pros**: Maximum space for content
- **Cons**: Loses branding on mobile

### Option D: Sticky Logo in Header
- Keep logo in fixed header bar
- Adjust header height accordingly
- **Pros**: Always visible, no overlap
- **Cons**: Takes fixed screen space

## Recommendation
**Option A**: Increase hero top padding to 100-120px on mobile (480px and below).

This maintains logo visibility and brand presence while cleanly separating sections.

