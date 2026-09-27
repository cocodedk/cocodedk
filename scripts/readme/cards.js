// The README's paper objects: a card per featured work, the closing card, and the section headings.
// Sizes are twice the width GitHub shows them at, so they stay sharp on a dense screen.
import { PALETTE as P, FONT, GRAIN, SHADOW, esc, wrap, lines, svg } from './svg.js';

const label = (url) => (url.startsWith('mailto:') ? 'Ask for a demo' : new URL(url).host);

export function workCard(work, fontCss, platesMarkup) {
  const text = wrap(work.line, 48, 3, work.name);
  // The dotted leader runs from the number to the kind, as on the site; the kind's width is estimated
  // generously from its length, since an SVG cannot measure text before it is drawn.
  const leaderEnd = 740 - work.kind.length * 24 * 0.72 - 18;
  const css = `${fontCss}
.no{font:italic 400 36px ${FONT.serif};fill:${P.ochre}}
.kind{font:520 24px ${FONT.sc};letter-spacing:.075em;fill:${P.ink2}}
.title{font:400 76px ${FONT.serif};fill:${P.ink}}
.line{font:420 30px ${FONT.sans};fill:${P.ink2}}
.link{font:560 27px ${FONT.sans};fill:${P.lapis};text-decoration:underline}`;
  const body = `<rect x="20" y="12" width="760" height="1130" fill="${P.sheet}" filter="url(#shadow)"/>
<rect x="20" y="12" width="760" height="1130" filter="url(#grain)"/>
<use href="#${work.plate}" x="60" y="52" width="680" height="680"/>
<text class="no" x="60" y="808">No. ${work.no}</text>
<line x1="170" y1="798" x2="${leaderEnd}" y2="798" stroke="${P.rule}" stroke-width="3" stroke-linecap="round" stroke-dasharray="0 9"/>
<text class="kind" x="740" y="806" text-anchor="end">${esc(work.kind)}</text>
<text class="title" x="60" y="898">${esc(work.name)}</text>
<text class="line">${lines(text, 60, 958, 42)}</text>
<text class="link" x="60" y="1100">${esc(label(work.url))}</text>`;
  const title = `No. ${work.no}, ${work.name}. ${work.kind}. ${work.line}`;
  return svg({ w: 800, h: 1170, title, css, defs: GRAIN + SHADOW + platesMarkup, body });
}

export function contactCard(contact, fontCss) {
  const lead = wrap(contact.lead, 40, 2, 'contact lead');
  const css = `${fontCss}
.h{font:400 84px ${FONT.serif};fill:${P.sheet}}
.lead{font:420 30px ${FONT.sans};fill:${P.onLapis2}}
.mail{font:560 40px ${FONT.sans};fill:${P.saffronText};text-decoration:underline}`;
  const body = `<rect x="20" y="12" width="760" height="420" fill="${P.lapis}" filter="url(#shadow)"/>
<text class="h" x="72" y="150">${esc(contact.heading)}</text>
<text class="lead">${lines(lead, 72, 214, 42)}</text>
<text class="mail" x="72" y="360">${esc(contact.email)}</text>`;
  const title = `${contact.heading}. ${contact.lead} ${contact.email}`;
  return svg({ w: 800, h: 460, title, css, defs: SHADOW, body });
}

export function heading(title, fontCss) {
  const css = `${fontCss}.h{font:400 66px ${FONT.serif};fill:${P.ochre}}`;
  const body = `<text class="h" x="520" y="78" text-anchor="middle">${esc(title)}</text>
<path d="M490 108h60" stroke="${P.ochre}" stroke-width="2"/>`;
  return svg({ w: 1040, h: 124, title, css, body });
}
