/**
 * Function to show a modal with node description
 *
 * args:
 *   ▸ nodeData: object - node data containing id, labels, translations, etc.
 *   ▸ mainCurrentLanguage: string - current language setting
 *   ▸ currentModalRef: object - reference to current modal state
 *   ▸ isModalOpeningRef: object - reference to modal opening flag
 *   ▸ currentEscapeKeyHandlerRef: object - reference to escape key handler
 *   ▸ closeNodeDescriptionModal: function - function to close the modal
 *   ▸ addTitleParallaxEffect: function - function to add parallax effect
 * return:
 *   ▸ void
 * raise:
 *   ▸ none
 * test:
 *   ▸ /home/bba/0-projects/cocodedk/js/main/test/showNodeDescriptionModal.test.js
 *   ▸ npm test -- --testPathPattern=showNodeDescriptionModal.test.js
 */
export function showNodeDescriptionModal(nodeData, mainCurrentLanguage, currentModalRef, isModalOpeningRef, currentEscapeKeyHandlerRef, closeNodeDescriptionModal, addTitleParallaxEffect) {

  // Aggressive cleanup of any existing modals before starting
  const existingModals = document.querySelectorAll('.node-modal-overlay, .node-modal, .modal-backdrop, .node-description-modal, #node-description-modal-container');
  existingModals.forEach(modal => modal.remove());
  //console.log('Aggressive cleanup of existing modals before starting, removed:', existingModals.length, 'elements');
  currentModalRef.value = null;

  //console.log('[DEBUG] Showing description modal for:', nodeData);
  //console.log('Checking ContactModal availability at start of showNodeDescriptionModal:', typeof ContactModal !== 'undefined' ? 'Available' : 'Not available');

  // Set flag to indicate modal is opening
  isModalOpeningRef.value = true;
  //console.log('Setting isModalOpening to true');

  // Add hash to URL for navigation
  const nodeHash = nodeData.id.toLowerCase().replace(/\s+/g, '-');
  window.history.pushState({ modal: nodeHash }, '', `#${nodeHash}`);

  // Special handling for Contact node
  if (nodeData.id === 'Contact' || nodeData.category === 'Contact') {
    //console.log('Checking ContactModal and ContactModal.showModal availability:', typeof ContactModal !== 'undefined' ? 'ContactModal Available' : 'Not available', typeof ContactModal !== 'undefined' && ContactModal.showModal ? 'showModal Available' : 'showModal Not available');
    if (typeof ContactModal !== 'undefined' && ContactModal.showModal) {
      //console.log('ContactModal is available, showing modal');
      // Close any existing modals to prevent overlap or visibility issues
      closeNodeDescriptionModal();
      // Attempt to ensure no other modal elements interfere
      const existingModals = document.querySelectorAll('.modal-backdrop, .node-description-modal');
      existingModals.forEach(modal => modal.remove());
      //console.log('Before showing ContactModal, lingering elements count:', document.querySelectorAll('.modal-backdrop, .node-description-modal').length);
      //console.log('Triggering description modal for node:', nodeData.id);
      ContactModal.showModal();
      return; // Exit early to prevent showing the description modal
    } else {
      //console.log('ContactModal not available, falling back to description modal');
    }
  }

  // Get the current language
  const lang = mainCurrentLanguage || 'en';

  // Get node label and description
  const label = nodeData.labels && nodeData.labels[lang] ? nodeData.labels[lang] : nodeData.label || nodeData.id;
  const description = nodeData.translations && nodeData.translations[lang] ? nodeData.translations[lang] : 'No description available.';
  
  // Convert URLs and emails to clickable links
  const linkedDescription = window.linkifyText ? window.linkifyText(description) : description;

  // Create modal HTML with legacy styling
  const modalHTML = `
    <div class="node-modal-overlay" onclick="closeNodeDescriptionModal(event)"></div>
    <div class="node-modal" ${(mainCurrentLanguage === 'ar' || mainCurrentLanguage === 'fa' || mainCurrentLanguage === 'ur') ? 'dir="rtl"' : 'dir="ltr"'}>
      <button class="node-modal-close" onclick="closeNodeDescriptionModal(event)" aria-label="Close">&times;</button>
      <h2>${label}</h2>
      <div class="node-modal-content">${linkedDescription}</div>
    </div>
  `;

  // Remove any existing modal
  closeNodeDescriptionModal();

  // Add modal to the body
  const modalContainer = document.createElement('div');
  modalContainer.id = 'node-description-modal-container';
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer);

  // Add escape key event listener
  currentEscapeKeyHandlerRef.value = (e) => {
    if (e.key === 'Escape') {
      // Create a synthetic event that mimics the close button to bypass isModalOpening check
      const syntheticEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
        target: { classList: { contains: () => true } } // Mimics node-modal-close class
      };
      closeNodeDescriptionModal(syntheticEvent);
    }
  };
  document.addEventListener('keydown', currentEscapeKeyHandlerRef.value);

  // Add debug log to confirm modal is being triggered for non-Contact nodes
  //console.log('Triggering description modal for node:', nodeData.id);
  // Additional debug to confirm modal is in DOM
  //console.log('Modal container added to DOM, ID:', modalContainer.id);
  //console.log('Modal elements in DOM:', document.querySelectorAll('.node-description-modal').length);
  //console.log('Backdrop elements in DOM:', document.querySelectorAll('.modal-backdrop').length);
  // Ensure modal and backdrop are visible
  const modalElement = document.querySelector('.node-modal');
  if (modalElement) {
    modalElement.style.display = 'block';
    modalElement.style.visibility = 'visible';
    //console.log('Modal style set to visible');

    // Add parallax effect to title (desktop only)
    addTitleParallaxEffect(modalElement);
  }
  const backdropElement = document.querySelector('.modal-backdrop');
  if (backdropElement) {
    backdropElement.style.display = 'block';
    backdropElement.style.visibility = 'visible';
    //console.log('Backdrop style set to visible');
  }

  // Add a longer delay before allowing modal to be closed to prevent accidental closures
  setTimeout(() => {
    const backdropElement = document.querySelector('.modal-backdrop');
    if (backdropElement) {
      backdropElement.onclick = function(event) {
        if (event.target === backdropElement) {
          //console.log('Backdrop clicked directly, but not closing modal to prevent accidental closure - Event details:', event);
          // Do not close the modal
        } else {
          //console.log('Click on modal content, not closing - Event details:', event);
        }
      };
      //console.log('Backdrop click handler set after longer delay');
    }
    // Reset the flag after a shorter delay - 2 seconds was too long
    setTimeout(() => {
      isModalOpeningRef.value = false;
      //console.log('Setting isModalOpening to false after delay');
    }, 500); // Reduced from 2000ms to 500ms
  }, 500);

  // Add global click event listener to log background clicks outside modal and backdrop
  document.addEventListener('click', function(event) {
    const modalElement = document.querySelector('.node-description-modal');
    const backdropElement = document.querySelector('.modal-backdrop');
    if (modalElement && backdropElement && !modalElement.contains(event.target) && !backdropElement.contains(event.target)) {
      //console.log('Background clicked outside modal and backdrop - Event details:', event);
    }
  }, true);
}
