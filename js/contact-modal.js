/**
 * Contact Modal Component
 *
 * Provides a secure way to display contact information
 * with protection against web scraping.
 */

const ContactModal = (function() {
  // Private variables
  let modalElement = null;
  let overlayElement = null;
  let isVerified = false;

  // Store contact info in obfuscated format
  const contactData = {
    // Public information (searchable)
    public: {
      company: "cocode.dk",
      name: "Babak Bandpey",
      cvr: "37219630",
      officialLink: "https://datacvr.virk.dk/enhed/virksomhed/37219630?fritekst=cocode.dk&sideIndex=0&size=10"
    },
    // Protected information (not searchable)
    protected: {
      email: "kd.edococ@bb",
      phone: "4157373554+"
    }
  };

  // Create modal HTML structure
  function createModal() {
    // Create overlay
    overlayElement = document.createElement('div');
    overlayElement.className = 'contact-overlay';
    overlayElement.addEventListener('click', function(e) {
      if (e.target === overlayElement) {
        hideModal();
      }
    });

    // Create modal container
    modalElement = document.createElement('div');
    modalElement.className = 'contact-modal';
    modalElement.setAttribute('role', 'dialog');
    modalElement.setAttribute('aria-modal', 'true');
    modalElement.setAttribute('aria-labelledby', 'contact-modal-title');

    // Set initial content
    modalElement.innerHTML = `
      <div class="modal-header">
        <h2 id="contact-modal-title">Contact Information</h2>
        <button class="close-button" aria-label="Close contact information">×</button>
      </div>
      <div class="modal-content">
        <div class="contact-section public">
          <div class="company-info">
            <div class="company-logo">🏢</div>
            <div class="company-details">
              <h3>${contactData.public.company}</h3>
              <p>${contactData.public.name}</p>
              <p>CVR/VAT: ${contactData.public.cvr}</p>
              <p><a href="${contactData.public.officialLink}" target="_blank" rel="noopener">Official Business Registry</a></p>
            </div>
          </div>
        </div>
        <div class="contact-section protected">
          <h3>Contact Details</h3>
          <div class="verification-container">
            <p>Please verify you are human to view contact details</p>
            <div class="verification-challenge">
              <label for="verification-slider">Slide to reveal contact info</label>
              <div class="slider-container">
                <input type="range" id="verification-slider" min="0" max="100" value="0" class="slider">
                <div class="slider-track"></div>
                <div class="slider-thumb">👉</div>
              </div>
            </div>
          </div>
          <div class="protected-content" style="display: none;">
            <div class="contact-item">
              <div class="contact-icon">✉️</div>
              <div class="contact-value email-value">•••••••••••</div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">📱</div>
              <div class="contact-value phone-value">•••••••••••</div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Append modal to overlay
    overlayElement.appendChild(modalElement);

    // Attach event listeners
    const closeButton = modalElement.querySelector('.close-button');
    closeButton.addEventListener('click', hideModal);

    // Set up verification slider
    const slider = modalElement.querySelector('#verification-slider');
    const sliderThumb = modalElement.querySelector('.slider-thumb');
    const sliderTrack = modalElement.querySelector('.slider-track');

    slider.addEventListener('input', function() {
      // Update slider thumb position
      const percentage = slider.value;
      sliderThumb.style.left = `${percentage}%`;
      sliderTrack.style.width = `${percentage}%`;

      // Check if slider is complete
      if (percentage == 100) {
        verifyHuman();
      }
    });

    // Keyboard accessibility
    modalElement.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        hideModal();
      }
    });

    return overlayElement;
  }

  // Show the modal
  function showModal() {
    if (!modalElement) {
      document.body.appendChild(createModal());
    } else {
      document.body.appendChild(overlayElement);
    }

    // Set focus to the modal for accessibility
    modalElement.focus();

    // Add class to show with animation
    setTimeout(() => {
      overlayElement.classList.add('visible');
      modalElement.classList.add('visible');
    }, 10);

    // Add class to body to prevent scrolling
    document.body.classList.add('modal-open');
  }

  // Hide the modal
  function hideModal() {
    if (!overlayElement) return;

    // Remove visible class to trigger animation
    overlayElement.classList.remove('visible');
    modalElement.classList.remove('visible');

    // Wait for animation to complete before removing from DOM
    setTimeout(() => {
      if (overlayElement.parentNode) {
        document.body.removeChild(overlayElement);
      }
      document.body.classList.remove('modal-open');
    }, 300);
  }

  // Reveal protected information after verification
  function verifyHuman() {
    if (isVerified) return;

    // Mark as verified
    isVerified = true;

    // Hide verification challenge
    const verificationContainer = modalElement.querySelector('.verification-container');
    verificationContainer.style.display = 'none';

    // Show protected content
    const protectedContent = modalElement.querySelector('.protected-content');
    protectedContent.style.display = 'block';

    // Reveal email with delay (reversed to normal)
    const emailElement = modalElement.querySelector('.email-value');
    const unreversedEmail = contactData.protected.email.split('').reverse().join('');

    // Reveal phone with delay (reversed to normal)
    const phoneElement = modalElement.querySelector('.phone-value');
    const unreversedPhone = contactData.protected.phone.split('').reverse().join('');

    // Animated reveal of contact details
    let emailIndex = 0;
    let phoneIndex = 0;

    const emailInterval = setInterval(() => {
      if (emailIndex <= unreversedEmail.length) {
        emailElement.textContent = unreversedEmail.substring(0, emailIndex);
        emailIndex++;
      } else {
        clearInterval(emailInterval);
      }
    }, 100);

    setTimeout(() => {
      const phoneInterval = setInterval(() => {
        if (phoneIndex <= unreversedPhone.length) {
          phoneElement.textContent = unreversedPhone.substring(0, phoneIndex);
          phoneIndex++;
        } else {
          clearInterval(phoneInterval);
        }
      }, 100);
    }, 500);
  }

  // Initialize and attach to Contact node click
  function initialize() {
    // Add click event listener for the Contact node
    document.addEventListener('click', function(e) {
      // Check if the clicked element is the Contact node
      const contactNode = document.getElementById('node-Contact');
      if (contactNode && contactNode.contains(e.target)) {
        e.preventDefault();
        e.stopPropagation();
        showModal();
      }
    });

    // Add necessary styles
    addStyles();
  }

  // Add required CSS styles
  function addStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .contact-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .contact-overlay.visible {
        opacity: 1;
      }

      .contact-modal {
        background: linear-gradient(145deg, #2d1b2e, #3d2534, #4a2c38);
        color: #fff;
        border-radius: 16px;
        box-shadow: 0 15px 50px rgba(255, 107, 107, 0.2), 0 5px 20px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 160, 122, 0.2);
        max-width: 500px;
        width: 90%;
        transform: translateY(20px);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
        overflow: hidden;
      }

      .contact-modal.visible {
        transform: translateY(0);
        opacity: 1;
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px;
        background: linear-gradient(135deg, rgba(255, 107, 107, 0.15), rgba(255, 160, 122, 0.1));
        border-bottom: 1px solid rgba(255, 160, 122, 0.2);
      }

      .modal-header h2 {
        margin: 0;
        font-size: 1.6rem;
        background: linear-gradient(135deg, #ff9a76, #ffb088);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .close-button {
        background: none;
        border: none;
        color: #fff;
        font-size: 1.8rem;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.2s;
      }

      .close-button:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .modal-content {
        padding: 20px;
      }

      .contact-section {
        margin-bottom: 24px;
      }

      .contact-section h3 {
        background: linear-gradient(135deg, #ff9a76, #ffb088);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin: 0 0 15px 0;
      }

      .company-info {
        display: flex;
        align-items: center;
        background: rgba(255, 107, 107, 0.08);
        padding: 18px;
        border-radius: 12px;
        border: 1px solid rgba(255, 160, 122, 0.2);
      }

      .company-logo {
        font-size: 3rem;
        margin-right: 15px;
      }

      .company-details h3 {
        margin: 0 0 10px 0;
      }

      .company-details p {
        margin: 5px 0;
      }

      .company-details a {
        color: #ff9a76;
        text-decoration: none;
        transition: color 0.2s;
      }

      .company-details a:hover {
        color: #ffb088;
        text-decoration: underline;
      }

      .verification-container {
        background: rgba(255, 107, 107, 0.08);
        padding: 18px;
        border-radius: 12px;
        text-align: center;
        border: 1px solid rgba(255, 160, 122, 0.2);
      }

      .verification-challenge {
        margin-top: 15px;
      }

      .verification-challenge label {
        display: block;
        margin-bottom: 10px;
        font-size: 0.9rem;
        color: #bbb;
      }

      .slider-container {
        position: relative;
        height: 40px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 20px;
        overflow: hidden;
      }

      .slider {
        width: 100%;
        height: 40px;
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
        outline: none;
        z-index: 10;
        position: relative;
        cursor: pointer;
        opacity: 0;
      }

      .slider-track {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: linear-gradient(90deg, rgba(255, 107, 107, 0.4), rgba(255, 160, 122, 0.5));
        width: 0%;
        transition: width 0.2s;
        pointer-events: none;
      }

      .slider-thumb {
        position: absolute;
        top: 0;
        left: 0;
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #ff9a76, #ffb088);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
        pointer-events: none;
      }

      .protected-content {
        background: rgba(255, 107, 107, 0.08);
        padding: 18px;
        border-radius: 12px;
        animation: fadeIn 0.5s;
        border: 1px solid rgba(255, 160, 122, 0.2);
      }

      .contact-item {
        display: flex;
        align-items: center;
        margin: 15px 0;
      }

      .contact-icon {
        font-size: 1.5rem;
        margin-right: 15px;
        width: 30px;
        text-align: center;
      }

      .contact-value {
        font-family: monospace;
        letter-spacing: 1px;
        font-size: 1.1rem;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .modal-open {
        overflow: hidden;
      }

      /* Make Contact node gold color */
      /* This will be overridden in main.js */
    `;

    document.head.appendChild(styleElement);
  }

  // Public API
  return {
    initialize: initialize,
    showModal: showModal,
    hideModal: hideModal
  };
})();

// Expose ContactModal to the global scope for both implementations
window.ContactModal = ContactModal;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', ContactModal.initialize);
