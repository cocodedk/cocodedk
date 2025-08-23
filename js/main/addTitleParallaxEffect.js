/**
 * Add parallax effect to modal title
 *
 * args:
 *   ▸ modal: HTMLElement - the modal element containing the title
 * return:
 *   ▸ void
 * raise:
 *   ▸ none
 * test:
 *   ▸ /home/bba/0-projects/cocodedk/js/main/test/addTitleParallaxEffect.test.js
 *   ▸ npm test -- --testPathPattern=addTitleParallaxEffect.test.js
 */
export function addTitleParallaxEffect(modal) {
  const title = modal.querySelector('h2');

  if (!title || !modal) return;

  // Skip parallax effect for mobile devices
  if (window.innerWidth <= 768) {
    // Reset the title styling to ensure it displays properly on mobile
    title.style.transform = 'translateX(-50%)';
    title.style.filter = 'drop-shadow(0 0 15px rgba(255,255,255,0.2))';
    return;
  }

  modal.addEventListener('mousemove', (e) => {
    const rect = modal.getBoundingClientRect();
    const x = e.clientX - rect.left; // X position within the modal
    const y = e.clientY - rect.top;  // Y position within the modal

    // Calculate movement (limited to small range)
    const moveX = (x - rect.width / 2) / 50;
    const moveY = (y - rect.height / 2) / 50;

    // Apply the transform - subtle movement based on mouse position
    title.style.transform = `translateX(calc(-50% + ${moveX}px)) translateY(${moveY}px)`;

    // Also adjust the glow direction slightly
    title.style.filter = `drop-shadow(${moveX/2}px ${moveY/2}px 15px rgba(255,255,255,0.2))`;
  });

  // Reset when mouse leaves
  modal.addEventListener('mouseleave', () => {
    title.style.transform = 'translateX(-50%) translateY(0)';
    title.style.filter = 'drop-shadow(0 0 15px rgba(255,255,255,0.2))';
  });
}
