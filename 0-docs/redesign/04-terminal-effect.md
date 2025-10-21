# Terminal Typewriter Effect

## Hero Text Animation
Animated terminal-style text appearing in hero section with blinking cursor.

## Text Content by Language
- EN: `cocode.dk | IT • Security • Innovation`
- DA: `cocode.dk | IT • Sikkerhed • Innovation`
- ES: `cocode.dk | IT • Seguridad • Innovación`
- ZH: `cocode.dk | 信息技术 • 安全 • 创新`
- JA: `cocode.dk | IT • セキュリティ • イノベーション`
- DE: `cocode.dk | IT • Sicherheit • Innovation`
- AR: `cocode.dk | تكنولوجيا المعلومات • الأمن • الابتكار`
- FA: `cocode.dk | فناوری اطلاعات • امنیت • نوآوری`
- HI: `cocode.dk | आईटी • सुरक्षा • नवाचार`
- UR: `cocode.dk | آئی ٹی • سیکیورٹی • نوآوری`
- FR: `cocode.dk | TI • Sécurité • Innovation`

## Animation Specs
- **Font**: `'Courier New', monospace`
- **Color**: `#e8735e` (Warm Coral)
- **Cursor Color**: `#d4a574` (Amber Gold)
- **Typing Speed**: 80ms per character
- **Cursor Blink**: 500ms on, 500ms off
- **Start Delay**: 300ms after page load
- **Total Duration**: ~4 seconds (text) + infinite cursor blink

## Implementation
```javascript
- Get current language text
- Clear terminal div
- Loop through characters, append with delay
- Show/hide cursor with animation
- On language change, restart animation
```

## Styling
- **Font Size**: 24px (desktop), 18px (mobile)
- **Text Shadow**: `0 0 10px rgba(232, 115, 94, 0.5)`
- **Glow**: `text-shadow` creates warm halo effect
- **Letter Spacing**: 1px for clarity

## Performance
- Use `requestAnimationFrame` for smooth typing
- Debounce language changes
- Use CSS for cursor blinking (no JS animation)
