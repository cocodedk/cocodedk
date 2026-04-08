/* Floating Contact Badges - Phone, Email, WhatsApp */

function initFloatBadges() {
  const container = document.createElement('div');
  container.id = 'float-badges';
  container.innerHTML = `
    <div class="float-badge float-badge--phone" onclick="window.floatBadges.showPhone()" title="Call">
      <div class="float-badge__icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 5.8 5.8l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      </div>
      <span class="float-badge__label">Call</span>
    </div>
    <div class="float-badge float-badge--email" onclick="window.floatBadges.showEmail(event)" title="Email">
      <div class="float-badge__icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
      </div>
      <span class="float-badge__label">Email</span>
    </div>
    <div class="float-badge float-badge--wa" onclick="window.floatBadges.openWA()" title="WhatsApp">
      <div class="float-badge__icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.829L.057 23.57a.75.75 0 0 0 .906.918l5.857-1.435A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.686-.523-5.205-1.431l-.373-.223-3.865.947.988-3.77-.245-.389A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
      </div>
      <span class="float-badge__label">WhatsApp</span>
    </div>
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
