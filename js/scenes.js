// The slide. For every scene: --enter is how far it has come up the screen (0 to 1),
// --cover how far the next one has come up over it. css/slide.css does the rest.

// Must say the same as the media query around "THE SLIDE" in css/slide.css.
const STACK = '(prefers-reduced-motion: no-preference) and (min-height: 600px) and (max-height: 1400px)';
const clamp = (v) => Math.min(1, Math.max(0, v));

export function initScenes() {
  const root = document.documentElement;
  const scenes = Array.from(document.querySelectorAll('.scene'));
  if (!scenes.length || !window.matchMedia) return;
  const stack = window.matchMedia(STACK);
  let queued = false;

  function overflows(scene) {
    const inner = scene.firstElementChild;
    const text = inner.lastElementChild;
    if (inner.scrollHeight > inner.clientHeight + 1) return true;
    // scrollHeight only notices text that has left the box altogether. Text that has merely run
    // into the bottom padding is already behind the bar, so measure where it ends (k undoes the scale).
    const box = inner.getBoundingClientRect();
    const k = box.height / inner.offsetHeight || 1;
    const room = inner.clientHeight - parseFloat(getComputedStyle(inner).paddingBottom);
    return (text.getBoundingClientRect().bottom - box.top) / k > room + 1;
  }

  // A scene is exactly one screen tall, so text that outgrows it (large text settings)
  // would be cut off. If that happens anywhere, the whole stack lies flat instead.
  function guard() {
    root.classList.remove('is-flat');
    if (stack.matches) root.classList.toggle('is-flat', scenes.some(overflows));
  }

  function frame() {
    queued = false;
    const on = stack.matches && !root.classList.contains('is-flat');
    const vh = window.innerHeight;
    const tops = scenes.map((s) => s.getBoundingClientRect().top);
    scenes.forEach((s, i) => {
      if (!on) { s.style.removeProperty('--enter'); s.style.removeProperty('--cover'); return; }
      s.style.setProperty('--enter', clamp(1 - tops[i] / vh).toFixed(3));
      if (i + 1 < scenes.length) s.style.setProperty('--cover', clamp(1 - tops[i + 1] / vh).toFixed(3));
    });
  }

  function settle() { guard(); frame(); }

  window.addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(frame); } }, { passive: true });
  window.addEventListener('resize', settle);
  window.addEventListener('load', settle);
  stack.addEventListener('change', settle);
  // Webfonts change every measurement above.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(settle);
  settle();
}
