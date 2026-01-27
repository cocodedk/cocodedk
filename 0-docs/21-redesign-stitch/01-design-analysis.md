# 01 - Design Analysis

## Overview

This document analyzes the design mockups from `stitch_home_secure_software_cyber/` and compares them with the current implementation.

## Design Philosophy Shift

### Current Design
- **Desktop-first** responsive approach
- Full-width sections that scale down to mobile
- Traditional web layout with header → content → footer flow
- Emoji-based icons for quick implementation
- System font stack

### New Design
- **Mobile-first** app-like experience
- Constrained container (`max-width: 448px`) centered on screen
- App-style navigation with sticky header and bottom nav bar
- Material Symbols icon system (consistent, scalable)
- Space Grotesk display font for modern tech aesthetic

## Page-by-Page Analysis

### 1. Home Page (`home:_secure_software_&_cyber/`)

**Key Components:**
1. **Sticky Header**
   - Logo/brand on left
   - Language toggle (EN|DK) on right
   - Glassmorphic background with blur

2. **Terminal Hero Card**
   - macOS-style traffic lights (red/yellow/green)
   - Monospace font for terminal text
   - Typing animation with blinking cursor
   - System status badges (GDPR Compliant, NIS2 Ready)

3. **Value Proposition Card**
   - Glassmorphism panel
   - "Compliance-Ready" badge
   - "Bridge the Gap" headline
   - Descriptive text
   - Abstract data visualization image

4. **CTA Buttons**
   - Primary: "Free Consultation" - solid orange with arrow
   - Secondary: "View Pricing" - ghost style with border

5. **Trust Badges**
   - "Trusted Standards" label
   - Pills for ISO 27001, GDPR, NIS2

### 2. Services Page (`services:_core_offerings/`)

**Key Components:**
1. **Header with Hamburger Menu**
   - Centered "cocode.dk" brand
   - Hamburger menu icon

2. **Section Headline**
   - "Our **Expertise**" (with primary color accent)
   - Subtitle text

3. **Service Cards** (3 cards)
   - Glow effect on hover
   - Icon in colored container
   - Image section with gradient overlay
   - Title, description, "Learn More" link

   Cards:
   - Software Development (terminal icon)
   - Cybersecurity & Compliance (security icon)
   - AI & Modern Tech (neurology icon)

4. **Floating Action Button**
   - "Book Consultation" with calendar icon
   - Fixed position above bottom nav

5. **Bottom Navigation**
   - Home, Services (active), Contact
   - Icon + label format

### 3. Portfolio Page (`portfolio:_recent_work/`)

**Key Components:**
1. **Header with Filters**
   - Back arrow, centered title, hamburger
   - Horizontal scrolling filter chips (All, Security, E-commerce, Audit, Cloud)

2. **Project Cards**
   - Featured card with larger image
   - Image with gradient overlay
   - Category tags in primary color
   - Project title
   - Description
   - Status badge (e.g., "100% Uptime", "Risk -40%")
   - "View Case Study" link

3. **CTA Banner**
   - "Have a project in mind?"
   - Gradient background
   - "Start a Project" button

4. **Bottom Navigation**
   - 4 items: Home, Work (active), Services, Contact

### 4. Contact/About Page (`about/contact/`)

**Key Components:**
1. **Header**
   - Back arrow
   - Centered "About cocode.dk"

2. **Hero Text**
   - "Secure Code."
   - "Human Expertise." (primary color)
   - Subtitle paragraph

3. **Stats Grid**
   - 2-column layout
   - "10+ Years" experience
   - "Dev & Sec" focus
   - Glassmorphic cards with icons

4. **Location Section**
   - "Copenhagen" badge
   - Map image with pin overlay
   - Address details

5. **Connect Section**
   - Phone number card
   - 3-column grid: Email, LinkedIn, GitHub

6. **Contact Form**
   - Name, Email, Project Brief fields
   - "Start a Conversation" submit button

## Visual Elements Comparison

### Colors

| Element | New Design | Current Design |
|---------|------------|----------------|
| Primary | `#ee5f2b` | `#e8735e` |
| Background (dark) | `#221510` | `#1a1a1a` |
| Background (light) | `#f8f6f6` | N/A |
| Glass surface | `rgba(34,21,16,0.6)` | `rgba(255,255,255,0.1)` |
| Glass border | `rgba(255,255,255,0.1)` | `rgba(255,255,255,0.1)` |
| Text primary | `#ffffff` | `#ffffff` |
| Text secondary | `#9ca3af` (gray-400) | `#e0e0e0` |

### Typography

| Element | New Design | Current Design |
|---------|------------|----------------|
| Display Font | Space Grotesk | System fonts |
| Body Font | Noto Sans (optional) | System fonts |
| Mono Font | ui-monospace stack | Monaco/Consolas |

### Spacing & Layout

| Element | New Design | Current Design |
|---------|------------|----------------|
| Max width | `448px` (max-w-md) | `1400px` |
| Container padding | `16px` (p-4) | `20px` |
| Card border radius | `0.75rem` (rounded-xl) | `16px` |
| Section gap | `24px` (gap-6) | Variable |

## Content Mapping

### Current → New

| Current Section | Maps To | Notes |
|-----------------|---------|-------|
| Hero with terminal | Home hero card | Keep terminal effect, add traffic lights |
| Service cards | Services page cards | Add images, restructure layout |
| Portfolio cards | Portfolio page | Add filters, featured badges |
| Activity feed | TBD | Consider integrating or removing |
| Footer language selector | Header language toggle | Simpler toggle |
| Contact modal | Contact/About page | Full page instead of modal |

## Technical Considerations

### CSS Framework

The mockups use **Tailwind CSS via CDN**. Options:
1. **Keep CDN** for rapid prototyping, compile later
2. **Integrate into build** via PostCSS/webpack
3. **Hybrid** - keep existing CSS, add Tailwind utilities

Recommendation: Option 1 initially, migrate to Option 2 for production.

### Icons

Current: Emoji-based
New: Material Symbols Outlined

```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
```

Usage:
```html
<span class="material-symbols-outlined">terminal</span>
```

### Responsive Strategy

The new design is constrained to mobile width. For desktop:
- Center the content container
- Add subtle side margins/backgrounds
- Consider wider cards on larger screens

### Accessibility

The new design maintains:
- Semantic HTML (header, main, nav, section, article)
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states (need to verify)
