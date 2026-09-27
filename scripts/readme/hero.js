// The top of the README: who this is on the left, the six plates mounted on the right, as on the
// site's share picture. The plates rise in one after another, once.
import { PALETTE as P, FONT, GRAIN, SHADOW, esc, wrap, lines, svg } from './svg.js';

const W = 1600;
const H = 720;
const PLATE = 190;
const GAP = 12;
const PAD = 16;
const MOUNT = { x: 1080, y: 47, w: PAD * 2 + PLATE * 2 + GAP, h: PAD * 2 + PLATE * 3 + GAP * 2 };

function mount(works) {
  const cells = works.slice(0, 6).map((work, i) => {
    const x = MOUNT.x + PAD + (i % 2) * (PLATE + GAP);
    const y = MOUNT.y + PAD + Math.floor(i / 2) * (PLATE + GAP);
    return `<use class="p" style="animation-delay:${(0.15 + i * 0.12).toFixed(2)}s" href="#${work.plate}" x="${x}" y="${y}" width="${PLATE}" height="${PLATE}"/>`;
  });
  return `<rect x="${MOUNT.x}" y="${MOUNT.y}" width="${MOUNT.w}" height="${MOUNT.h}" fill="${P.sheet}" filter="url(#shadow)"/>\n${cells.join('\n')}`;
}

export function hero(model, fontCss, platesMarkup) {
  const { kicker, title } = model.intro;
  const first = wrap(title[0], 24, 2, 'hero title');
  const second = wrap(title[1], 24, 2, 'hero title');
  const css = `${fontCss}
.mark{font:400 46px ${FONT.serif};fill:${P.ink}}
.kicker{font:520 27px ${FONT.sc};letter-spacing:.075em;fill:${P.ink2}}
.t{font:400 72px ${FONT.serif};fill:${P.ink}}
.t2{fill:${P.lapis}}
.p{animation:rise .9s cubic-bezier(.22,.8,.2,1) both}
@keyframes rise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}`;
  const body = `<rect width="${W}" height="${H}" fill="${P.paper}"/>
<rect width="${W}" height="${H}" filter="url(#grain)"/>
<text class="mark" x="96" y="128">cocode.dk</text>
<text class="kicker" x="96" y="290">${esc(kicker)}</text>
<text class="t">${lines(first, 96, 384, 84)}</text>
<text class="t t2">${lines(second, 96, 384 + first.length * 84 + 24, 84)}</text>
${mount(model.works)}`;
  return svg({ w: W, h: H, title: `${kicker}. ${title.join(' ')}`, css, defs: GRAIN + SHADOW + platesMarkup, body });
}
