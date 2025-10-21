# Animations & Transitions

## Entrance Animations

### Hero Section
- **Duration**: 800ms
- **Easing**: `ease-out`
- **Effect**: Fade in + slide up (40px)
- **Delay**: 0ms (start immediately)

### Terminal Text
- **Duration**: Character by character (80ms each)
- **Total**: ~4 seconds for full text
- **Cursor**: Infinite blink (500ms on, 500ms off)

### Service Cards
- **Stagger**: 60ms between cards
- **Duration**: 500ms
- **Easing**: `cubic-bezier(0.34, 1.56, 0.64, 1)` (bounce)
- **Effect**: Fade in + slide up (30px) from bottom

### Activity Feed Items
- **Stagger**: 100ms between items
- **Duration**: 600ms
- **Easing**: `ease-out`
- **Effect**: Fade in + slide in from left (50px)

## Interaction Animations

### Card Hover
- **Scale**: 1.05
- **Lift**: translateY(-4px)
- **Glow**: Box shadow intensifies
- **Duration**: 200ms
- **Easing**: `ease-out`

### Card Click/Active
- **Scale**: 1.1
- **Lift**: translateY(-8px)
- **Glow**: Maximum brightness
- **Duration**: 150ms

### Button Hover
- **Brightness**: Increase by 10%
- **Shadow**: Expand slightly
- **Duration**: 150ms

## Scroll Effects

### Parallax
- **Hero Section**: Moves at 0.5x scroll speed
- **Card Lift**: Subtle float animation as user scrolls
- **Trigger**: Between -100px and +500px viewport

### Fade on Scroll
- **Elements**: Activity cards
- **Trigger**: Element enters viewport
- **Duration**: 400ms

## Performance Targets
- **FPS**: 60 (use `transform` and `opacity` only)
- **GPU**: Enable with `will-change` on animated elements
- **Mobile**: Reduce motion on `prefers-reduced-motion`

## CSS Easing Functions
```css
--ease-in: cubic-bezier(0.42, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.58, 1);
--ease-in-out: cubic-bezier(0.42, 0, 0.58, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
```

## Accessibility
- Respect `prefers-reduced-motion`
- Disable animations on slow devices
- Keep motion duration under 1 second
