# 08 - Contact & About Section

## Current Implementation

Currently uses a modal for contact:

```html
<!-- Contact is triggered via modal -->
<button onclick="showContactModal()">Contact</button>
```

## New Design Approach

The new design incorporates contact as a full section/page rather than a modal. This can be:
1. **In-page section** - Scroll to contact area
2. **Separate view** - Navigate to contact "page" (SPA-style)

Recommendation: Keep as in-page section for simplicity, but with expanded content matching the mockup.

### HTML Structure

```html
<section class="about-section" id="contact">
  <!-- Hero Text -->
  <div class="about-hero">
    <h2 class="about-title">
      Secure Code.<br>
      <span class="text-primary">Human Expertise.</span>
    </h2>
    <p class="about-subtitle">
      Bridging the gap between building fast and staying safe. We specialize in secure software development and cybersecurity for European SMEs.
    </p>
  </div>

  <!-- Stats Grid -->
  <div class="stats-grid">
    <div class="stat-card glass-panel">
      <div class="stat-icon-wrap">
        <span class="material-symbols-outlined">workspace_premium</span>
      </div>
      <p class="stat-label">Experience</p>
      <p class="stat-value">10+ Years</p>
    </div>
    <div class="stat-card glass-panel">
      <div class="stat-icon-wrap">
        <span class="material-symbols-outlined">security</span>
      </div>
      <p class="stat-label">Focus</p>
      <p class="stat-value">Dev & Sec</p>
    </div>
  </div>

  <!-- Location Section -->
  <div class="location-section">
    <div class="location-header">
      <h3 class="location-title">Location</h3>
      <span class="location-badge">
        <span class="material-symbols-outlined">location_on</span>
        Copenhagen
      </span>
    </div>

    <div class="location-card glass-panel">
      <div class="map-container">
        <div class="map-overlay"></div>
        <div class="map-pin">
          <span class="material-symbols-outlined">pin_drop</span>
          <span>Magistervej 54, NV</span>
        </div>
      </div>
      <a href="https://maps.google.com/..." target="_blank" class="location-link">
        <div class="location-details">
          <span class="location-street">Magistervej 54</span>
          <span class="location-city">2400 Copenhagen NV, Denmark</span>
        </div>
        <span class="material-symbols-outlined">arrow_outward</span>
      </a>
    </div>
  </div>

  <!-- Connect Section -->
  <div class="connect-section">
    <h3 class="connect-title">Connect</h3>

    <!-- Phone Card -->
    <a href="tel:+4553737514" class="connect-card glass-panel">
      <div class="connect-icon connect-icon-phone">
        <span class="material-symbols-outlined">call</span>
      </div>
      <div class="connect-info">
        <span class="connect-label">Call Us</span>
        <span class="connect-value">+45 53 73 75 14</span>
      </div>
      <span class="material-symbols-outlined connect-arrow">chevron_right</span>
    </a>

    <!-- Social Grid -->
    <div class="social-grid">
      <a href="mailto:hello@cocode.dk" class="social-card glass-panel">
        <span class="material-symbols-outlined">mail</span>
        <span class="social-label">Email</span>
      </a>
      <a href="https://linkedin.com/company/cocode-dk" target="_blank" class="social-card glass-panel">
        <span class="material-symbols-outlined">business_center</span>
        <span class="social-label">LinkedIn</span>
      </a>
      <a href="https://github.com/cocode-dk" target="_blank" class="social-card glass-panel">
        <span class="material-symbols-outlined">code</span>
        <span class="social-label">GitHub</span>
      </a>
    </div>
  </div>

  <!-- Contact Form -->
  <div class="contact-form-section glass-panel">
    <h3 class="form-title">Get in Touch</h3>
    <form class="contact-form" id="contact-form">
      <div class="form-group">
        <label for="contact-name" class="form-label">Name</label>
        <input type="text" id="contact-name" class="glass-input" placeholder="John Doe" required />
      </div>
      <div class="form-group">
        <label for="contact-email" class="form-label">Email</label>
        <input type="email" id="contact-email" class="glass-input" placeholder="john@company.com" required />
      </div>
      <div class="form-group">
        <label for="contact-message" class="form-label">Project Brief</label>
        <textarea id="contact-message" class="glass-input" rows="3" placeholder="Tell us about your security needs..." required></textarea>
      </div>
      <button type="submit" class="form-submit btn btn-primary">
        <span>Start a Conversation</span>
        <span class="material-symbols-outlined">send</span>
      </button>
    </form>
  </div>
</section>
```

### CSS Implementation

```css
/* About Section */
.about-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  padding-top: var(--spacing-xl);
}

/* Hero Text */
.about-hero {
  margin-bottom: var(--spacing-md);
}

.about-title {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: var(--spacing-sm);
}

.about-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1.25rem;
}

.stat-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(238, 95, 43, 0.2);
  border-radius: 50%;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-tertiary);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

/* Location Section */
.location-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.location-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.location-title {
  font-size: 1.25rem;
  font-weight: 700;
}

.location-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background: rgba(238, 95, 43, 0.1);
  border: 1px solid rgba(238, 95, 43, 0.2);
  border-radius: var(--radius-full);
  color: var(--primary);
  font-size: 0.875rem;
  font-weight: 500;
}

.location-badge .material-symbols-outlined {
  font-size: 16px;
}

.location-card {
  padding: 0.5rem;
}

.map-container {
  position: relative;
  height: 10rem;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: #2d2d2d;
}

.map-overlay {
  position: absolute;
  inset: 0;
  background: rgba(34, 21, 16, 0.6);
  z-index: 1;
}

.map-pin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--bg-dark);
  border: 1px solid var(--glass-border-light);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(8px);
}

.map-pin .material-symbols-outlined {
  color: var(--primary);
}

.location-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin-top: 0.25rem;
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: white;
  transition: background var(--transition-fast);
}

.location-link:hover {
  background: rgba(255, 255, 255, 0.05);
}

.location-details {
  display: flex;
  flex-direction: column;
}

.location-street {
  font-weight: 700;
  font-size: 0.875rem;
}

.location-city {
  font-size: 0.75rem;
  color: var(--text-tertiary);
}

/* Connect Section */
.connect-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.connect-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: var(--spacing-xs);
}

.connect-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  text-decoration: none;
  color: white;
  transition: background var(--transition-fast);
}

.connect-card:hover {
  background: rgba(255, 255, 255, 0.05);
}

.connect-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  transition: transform var(--transition-fast);
}

.connect-card:hover .connect-icon {
  transform: scale(1.1);
}

.connect-icon-phone {
  background: rgba(39, 201, 63, 0.2);
  color: #4ade80;
}

.connect-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.connect-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary);
}

.connect-value {
  font-size: 1.125rem;
  font-weight: 500;
}

.connect-arrow {
  color: var(--text-tertiary);
}

/* Social Grid */
.social-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-sm);
}

.social-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  aspect-ratio: 1;
  padding: 0.75rem;
  text-decoration: none;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.social-card:hover {
  background: rgba(255, 255, 255, 0.05);
}

.social-card .material-symbols-outlined {
  font-size: 1.875rem;
  transition: color var(--transition-fast);
}

.social-card:hover .material-symbols-outlined {
  color: var(--primary);
}

.social-label {
  font-size: 0.75rem;
  color: var(--text-tertiary);
}

/* Contact Form */
.contact-form-section {
  padding: 1.25rem;
  margin-top: var(--spacing-sm);
}

.form-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.form-label {
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary);
  margin-left: 0.25rem;
}

.form-submit {
  margin-top: var(--spacing-sm);
}

.form-submit .material-symbols-outlined {
  font-size: 20px;
}
```

## Keep Existing Contact Modal

The existing contact modal should still work as a quick action. Update it to match the new styling:

```css
/* Update contact-modal.css to match new theme */
.contact-modal {
  background: var(--bg-dark);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
}

.contact-modal .glass-input {
  /* Uses shared glass-input styles */
}
```

## Form Handling

Keep existing form submission logic from `contact-modal.js`:

```javascript
// Ensure form submission works with new structure
document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  // Use existing submission logic
  await submitContactForm({
    name: document.getElementById('contact-name').value,
    email: document.getElementById('contact-email').value,
    message: document.getElementById('contact-message').value
  });
});
```

## Translation Integration

Add new translation keys:

```javascript
// js/data/section-translations.js

export const aboutTranslations = {
  title: {
    en: 'Secure Code.',
    da: 'Sikker Kode.',
    // ...
  },
  titleHighlight: {
    en: 'Human Expertise.',
    da: 'Menneskelig Ekspertise.',
    // ...
  },
  subtitle: {
    en: 'Bridging the gap between building fast and staying safe...',
    da: 'Vi bygger bro mellem hurtig udvikling og sikkerhed...',
    // ...
  },
  // ... more translations
};
```

## Migration Steps

1. [ ] Create about section HTML structure
2. [ ] Add stats grid CSS
3. [ ] Add location section with map placeholder
4. [ ] Add connect section with social links
5. [ ] Style contact form to match new design
6. [ ] Integrate translations
7. [ ] Ensure existing contact modal still works
8. [ ] Test form submission
9. [ ] Add map integration (optional: Google Maps static image)
10. [ ] Mobile responsiveness check
