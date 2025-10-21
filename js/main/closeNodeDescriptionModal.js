/**
 * Function to close the node description modal
 *
 * args:
 *   ▸ event: Event - the event that triggered the close (optional)
 *   ▸ isModalOpeningRef: object - reference to modal opening flag
 *   ▸ currentEscapeKeyHandlerRef: object - reference to escape key handler
 * return:
 *   ▸ void
 * raise:
 *   ▸ none
 * test:
 *   ▸ /home/bba/0-projects/cocodedk/js/main/test/closeNodeDescriptionModal.test.js
 *   ▸ npm test -- --testPathPattern=closeNodeDescriptionModal.test.js
 */
export function closeNodeDescriptionModal(event, isModalOpeningRef, currentEscapeKeyHandlerRef) {
  // Prevent event bubbling and default behavior
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

    // Bypass isModalOpening check if the event target is the close button
  if (event && event.target && (
    (event.target.tagName === 'BUTTON' && (event.target.textContent === 'Close' || event.target.textContent === '×' || event.target.innerHTML === '&times;')) ||
    event.target.classList.contains('node-modal-close')
  )) {
    // console.log('Close button detected, bypassing isModalOpening check');
  } else if (isModalOpeningRef.value) {
    // console.log('Preventing modal closure as it is still opening');
    return;
  }
  // console.log('closeNodeDescriptionModal called - Stack trace:');
  // console.trace('Closure Stack Trace');
  const modalContainer = document.getElementById('node-description-modal-container');
  if (modalContainer) {
    modalContainer.remove();
  }

  // Clean up escape key event listener
  if (currentEscapeKeyHandlerRef.value) {
    document.removeEventListener('keydown', currentEscapeKeyHandlerRef.value);
    currentEscapeKeyHandlerRef.value = null;
  }

  // Additional cleanup to ensure no modal state persists
  const leftoverModals = document.querySelectorAll('.node-modal-overlay, .node-modal, .modal-backdrop, .node-description-modal');
  leftoverModals.forEach(modal => modal.remove());
  // console.log('Modal closed, state reset - checking for lingering elements:', document.querySelectorAll('.modal-backdrop, .node-description-modal').length);
  // Reset node selection state to allow immediate reselection
  if (window.CytoscapeManager && typeof window.CytoscapeManager.clearSelection === 'function') {
    window.CytoscapeManager.clearSelection();
    // console.log('Node selection state reset after modal closure');
  } else {
    // console.log('CytoscapeManager.clearSelection not available, selection state not reset');
  }
}
