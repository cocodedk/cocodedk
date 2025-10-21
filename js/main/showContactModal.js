/**
 * Bridge function to show contact modal (works with both implementations)
 *
 * args:
 *   ▸ nodeData: object - node data (currently unused but kept for interface compatibility)
 * return:
 *   ▸ void
 * raise:
 *   ▸ Error - if contact modal cannot be shown
 * test:
 *   ▸ /home/bba/0-projects/cocodedk/js/main/test/showContactModal.test.js
 *   ▸ npm test -- --testPathPattern=showContactModal.test.js
 */
export function showContactModal(nodeData) {
  //console.log('[DEBUG] Showing contact modal for:', nodeData);

  // Check if we have direct access to the ContactModal from the contact-modal.js
  if (typeof window.ContactModal !== 'undefined' && typeof window.ContactModal.showModal === 'function') {
    window.ContactModal.showModal();
  } else {
    // Fallback - try to find and click the Contact node
    try {
      const contactNode = document.getElementById('node-Contact');
      if (contactNode) {
        // Create and dispatch a synthetic click event
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        contactNode.dispatchEvent(clickEvent);
      } else {
        console.error('[DEBUG] Could not find Contact node element');
      }
    } catch (e) {
      console.error('[DEBUG] Error showing contact modal:', e);
    }
  }
}
