/* Floating Contact Badges - Phone, Email, WhatsApp */

function initFloatBadges() {
  // Phase 3 (design rollout): only the phone button stays floating. Email + WhatsApp
  // move to the footer contact strip — see docs/optimize-presence-on-web/design/flow.md.
  // Their handlers (showEmail, openWA below) are kept callable for the new footer wiring.
  const container = document.createElement('div');
  container.id = 'float-badges';
  container.innerHTML = `
    <button type="button" class="float-badge float-badge--phone" onclick="window.floatBadges.showPhone()" title="Ring til Babak" aria-label="Ring til Babak">
      <div class="float-badge__icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 5.8 5.8l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      </div>
    </button>
  `;
  document.body.appendChild(container);
}

function tel() {
  return [43, 52, 53, 50, 55, 56, 50, 51, 48, 55, 55].map(c => String.fromCharCode(c)).join('');
}
function telDisplay() {
  return [43, 52, 53, 32, 50, 55, 32, 56, 50, 32, 51, 48, 32, 55, 55].map(c => String.fromCharCode(c)).join('');
}
function email() {
  return [98, 98, 64, 99, 111, 99, 111, 100, 101, 46, 100, 107].map(c => String.fromCharCode(c)).join('');
}

window.floatBadges = {
  init: initFloatBadges,

  showPhone() {
    const t = tel(), d = telDisplay();
    const o = document.createElement('div');
    o.id = 'fb-overlay';
    o.className = 'fb-overlay';
    o.innerHTML = `<div class="fb-modal">
      <h3>Call me</h3>
      <div class="fb-number"><span>${d}</span>
        <button onclick="navigator.clipboard.writeText('${t}');this.textContent='Copied!';setTimeout(()=>this.textContent='Copy',2000)">Copy</button>
      </div>
      <a href="tel:${t}" class="fb-action">Call now</a>
      <button class="fb-close" onclick="document.getElementById('fb-overlay').remove()">Close</button>
    </div>`;
    o.addEventListener('click', e => { if (e.target === o) o.remove(); });
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { o.remove(); document.removeEventListener('keydown', esc); }
    });
    document.body.appendChild(o);
  },

  showEmail(ev) {
    ev.stopPropagation();
    const e = email();
    const s = encodeURIComponent('Enquiry from cocode.dk');
    const b = encodeURIComponent('Hi Babak,\n\n');
    const o = document.createElement('div');
    o.id = 'fb-overlay';
    o.className = 'fb-overlay';
    o.innerHTML = `<div class="fb-modal">
      <h3>Email me</h3>
      <p class="fb-email-addr">${e}</p>
      <a href="https://mail.google.com/mail/?view=cm&fs=1&to=${e}&su=${s}&body=${b}" target="_blank" class="fb-action" onclick="document.getElementById('fb-overlay').remove()">Open Gmail</a>
      <a href="https://outlook.live.com/mail/0/deeplink/compose?to=${e}&subject=${s}&body=${b}" target="_blank" class="fb-action fb-action--outline" onclick="document.getElementById('fb-overlay').remove()">Open Outlook</a>
      <button onclick="navigator.clipboard.writeText('${e}');this.textContent='Copied!';setTimeout(()=>this.textContent='Copy address',2000)" class="fb-action fb-action--outline">Copy address</button>
      <button class="fb-close" onclick="document.getElementById('fb-overlay').remove()">Close</button>
    </div>`;
    o.addEventListener('click', ev2 => { if (ev2.target === o) o.remove(); });
    document.addEventListener('keydown', function esc(ev2) {
      if (ev2.key === 'Escape') { o.remove(); document.removeEventListener('keydown', esc); }
    });
    document.body.appendChild(o);
  },

  openWA() {
    const n = [50, 55, 56, 50, 51, 48, 55, 55].map(c => String.fromCharCode(c)).join('');
    window.open('https://wa.me/45' + n + '?text=' + encodeURIComponent('Hi Babak, I found cocode.dk and would like to get in touch.'), '_blank');
  }
};
