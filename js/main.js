/*
 * Main.js - Simplified version for non-canvas approach
 */

// Import modular functions
import { setLanguage as setLanguageModule } from './main/setLanguage.js';
import { handleLanguageKeydown as handleLanguageKeydownModule } from './main/handleLanguageKeydown.js';
import { showNodeDescriptionModal as showNodeDescriptionModalModule } from './main/showNodeDescriptionModal.js';
import { closeNodeDescriptionModal as closeNodeDescriptionModalModule } from './main/closeNodeDescriptionModal.js';
import { addTitleParallaxEffect } from './main/addTitleParallaxEffect.js';
import { updateHeroContent } from './main/updateHeroContent.js';
import { updateSectionContent } from './main/updateSectionContent.js';

// Current language selection (default to Danish)
let mainCurrentLanguage = 'da';

// Define currentModal at the top to avoid ReferenceError
let currentModal = null;
let isModalOpening = false; // Flag to prevent immediate closure

// Handle language change by updating node display
function setLanguage(lang) {
  mainCurrentLanguage = setLanguageModule(lang);
}

// Function to handle keyboard navigation in language selector
function handleLanguageKeydown(event, lang) {
  handleLanguageKeydownModule(event, lang, setLanguage);
}

// Function to show a modal with node description
function showNodeDescriptionModal(nodeData) {
  // Create reference objects for state variables
  const currentModalRef = { value: currentModal };
  const isModalOpeningRef = { value: isModalOpening };
  const currentEscapeKeyHandlerRef = { value: currentEscapeKeyHandler };

  showNodeDescriptionModalModule(
    nodeData,
    mainCurrentLanguage,
    currentModalRef,
    isModalOpeningRef,
    currentEscapeKeyHandlerRef,
    closeNodeDescriptionModal,
    addTitleParallaxEffect
  );

  // Update global variables with any changes
  currentModal = currentModalRef.value;
  isModalOpening = isModalOpeningRef.value;
  currentEscapeKeyHandler = currentEscapeKeyHandlerRef.value;
}

// Store the current escape key handler for cleanup
let currentEscapeKeyHandler = null;

// Function to close the node description modal
function closeNodeDescriptionModal(event) {
  // Create reference objects for state variables
  const isModalOpeningRef = { value: isModalOpening };
  const currentEscapeKeyHandlerRef = { value: currentEscapeKeyHandler };

  closeNodeDescriptionModalModule(event, isModalOpeningRef, currentEscapeKeyHandlerRef);

  // Update global variables with any changes
  isModalOpening = isModalOpeningRef.value;
  currentEscapeKeyHandler = currentEscapeKeyHandlerRef.value;
}

// Expose functions globally so they can be called from HTML onclick handlers and components
window.closeNodeDescriptionModal = closeNodeDescriptionModal;
window.showNodeDescriptionModal = showNodeDescriptionModal;

// Expose contact modal function globally for CTA button
window.showContactModal = function() {
  if (window.ContactModal && typeof window.ContactModal.showModal === 'function') {
    window.ContactModal.showModal();
  }
};

// Setup language toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  // Logo shrink on scroll — listen on window + body (body may be scroll container)
  const header = document.querySelector('.header-container');
  if (header) {
    const onScroll = function() {
      const y = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      header.classList.toggle('scrolled', y > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    document.body.addEventListener('scroll', onScroll, { passive: true });
  }

  // Initialize hero content
  updateHeroContent(mainCurrentLanguage);
  // Initialize static section content
  updateSectionContent(mainCurrentLanguage);

  // Initialize terminal effect
  if (window.terminal && typeof window.terminal.init === 'function') {
    window.terminal.init();
  }

  // Initialize mesh background
  if (window.MeshBackground && typeof window.MeshBackground.init === 'function') {
    window.MeshBackground.init({
      bg: '#0a0a0a',
      glow: null,
      nodeColor: '#4af626',
      labels: ['MCP', 'AGENT', 'GDPR', 'NIS2', 'DORA', 'WORKFLOW'],
      // Quieted per design-audit M6 + design/flow.md: opacity ~0.5x, speed ~0.5x
      // so the mesh becomes ambient texture rather than active motion.
      layers: [
        { count: 8, speed: 0.13, mouseStrength: 4,  size: 1.8, opacity: 0.14 },
        { count: 6, speed: 0.25, mouseStrength: 10, size: 2.8, opacity: 0.21 },
        { count: 4, speed: 0.40, mouseStrength: 18, size: 4.0, opacity: 0.32 },
      ],
    });
  }

  // Initialize service cards
  if (window.serviceCards && window.nodes) {
    window.serviceCards.render(window.nodes, mainCurrentLanguage);
  }

  // Initialize FITS showcase
  if (window.fitsShowcase) {
    window.fitsShowcase.render(mainCurrentLanguage);
  }

  // Initialize skills section
  if (window.skillsSection) {
    window.skillsSection.render(mainCurrentLanguage);
  }

  // Initialize floating contact badges
  if (window.floatBadges) {
    window.floatBadges.init();
  }

  // Initialize activity feed
  if (window.activityFeed) {
    window.activityFeed.render();
  }

  // Render portfolio items (if data/component loaded)
  if (window.renderPortfolio && window.portfolioItems) {
    window.renderPortfolio(window.portfolioItems, mainCurrentLanguage);
  }

  // Expose globals for HTML onclick handlers
  window.handleLanguageKeydown = handleLanguageKeydown;
  window.setLanguage = setLanguage;
  window.updateHeroContent = updateHeroContent;
  window.updateSectionContent = updateSectionContent;

  if (window.CampaignOverlay && typeof window.CampaignOverlay.autoShow === 'function') {
    window.CampaignOverlay.autoShow();
  }

  // Scroll-triggered section fade-in
  const revealSections = document.querySelectorAll('.fits-showcase-section, .portfolio-section, .skills-section, .activity-feed-section');
  revealSections.forEach(s => s.classList.add('section-hidden'));
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('section-visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    revealSections.forEach(s => obs.observe(s));
  } else { revealSections.forEach(s => s.classList.add('section-visible')); }

  // Set initial language from URL hash or localStorage
  const validLanguages = ['en', 'da'];
  let initialLang = 'da';
  const hash = window.location.hash && window.location.hash.substring(1);
  if (hash && validLanguages.includes(hash)) { initialLang = hash; }
  else if (localStorage.getItem('preferredLanguage')) { initialLang = localStorage.getItem('preferredLanguage'); }
  setLanguage(initialLang);

  // Handle browser back/forward — close modals when hash is removed
  window.addEventListener('popstate', function() {
    if (!window.location.hash) {
      const mc = document.getElementById('node-description-modal-container');
      if (mc) {
        const ev = { preventDefault(){}, stopPropagation(){}, target: { classList: { contains: () => true } } };
        window.closeNodeDescriptionModal(ev);
      }
      if (window.ContactModal && typeof window.ContactModal.hideModal === 'function') { window.ContactModal.hideModal(true); }
    }
  });
});
