/*
 * Main.js - Simplified version for non-canvas approach
 */

const DEBUG_MODE = false;
const debug = document.getElementById('debug');

if (!DEBUG_MODE) {
  debug.style.display = 'none';
}

// Handle language change by updating node display
function setLanguage(lang) {
  // Update the node display with the new language
  if (window.NodeDisplay) {
    window.NodeDisplay.setLanguage(lang);
  }

  // Update active class and ARIA attributes in language menu
  const langItems = document.querySelectorAll('.lang-item');
  langItems.forEach(item => {
    item.classList.remove('active');
    item.setAttribute('aria-selected', 'false');

    if (item.dataset.lang === lang) {
      item.classList.add('active');
      item.setAttribute('aria-selected', 'true');
    }
  });

  // Set RTL direction for Arabic, Persian, and Urdu
  if (lang === 'ar' || lang === 'fa' || lang === 'ur') {
    document.body.setAttribute('dir', 'rtl');
  } else {
    document.body.setAttribute('dir', 'ltr');
  }

  // Auto-hide the language menu in responsive mode
  if (window.innerWidth <= 768) {
    const langMenu = document.getElementById('languageSelector');
    const langToggle = document.getElementById('langToggle');

    // Add a small delay to allow the user to see their selection first
    setTimeout(() => {
      langMenu.classList.remove('active');
      langToggle.setAttribute('aria-expanded', 'false');

      // Remove keyboard listener for escape key
      document.removeEventListener('keydown', closeMenuOnEscape);
    }, 300);
  }
}

// Function to handle keyboard navigation in language selector
function handleLanguageKeydown(event, lang) {
  // Enter or Space key
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    setLanguage(lang);
  }

  // Arrow Up/Down for navigation
  else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault();

    const langItems = Array.from(document.querySelectorAll('.lang-item'));
    const currentIndex = langItems.findIndex(item => item.dataset.lang === lang);
    let nextIndex;

    if (event.key === 'ArrowUp') {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : langItems.length - 1;
    } else {
      nextIndex = currentIndex < langItems.length - 1 ? currentIndex + 1 : 0;
    }

    langItems[nextIndex].focus();
  }
}

// Close menu on escape key
function closeMenuOnEscape(e) {
  if (e.key === 'Escape') {
    const langMenu = document.getElementById('languageSelector');
    const langToggle = document.getElementById('langToggle');

    langMenu.classList.remove('active');
    langToggle.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', closeMenuOnEscape);
  }
}

// Setup language toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const langToggle = document.getElementById('langToggle');
  const langMenu = document.getElementById('languageSelector');

  // Initialize toggle button's aria state
  langToggle.setAttribute('aria-expanded', 'false');

  // Add click handler for language toggle
  langToggle.addEventListener('click', function() {
    const isExpanded = langToggle.getAttribute('aria-expanded') === 'true';

    if (!isExpanded) {
      langMenu.classList.add('active');
      langToggle.setAttribute('aria-expanded', 'true');
      document.addEventListener('keydown', closeMenuOnEscape);
    } else {
      langMenu.classList.remove('active');
      langToggle.setAttribute('aria-expanded', 'false');
      document.removeEventListener('keydown', closeMenuOnEscape);
    }
  });

  // Close language menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!langToggle.contains(event.target) && !langMenu.contains(event.target)) {
      langMenu.classList.remove('active');
      langToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Make handle language keydown available globally
  window.handleLanguageKeydown = handleLanguageKeydown;
});
