// The two kinds of picture a catalogue card can show: a site's own share picture, made smaller, or
// the name set on paper when there is no site to take one from.
import sharp from 'sharp';
import { PALETTE, FONT, GRAIN, esc, wrap, lines, svg } from '../readme/svg.js';
import { PICTURE } from './paths.js';

// Top-aligned, because a share picture puts its title and logo at the top; sharp throws on anything
// that is not an image, so an error page saved as a picture stops the run.
export const shrink = (buffer) =>
  sharp(buffer)
    .resize(PICTURE.width, PICTURE.height, { fit: 'cover', position: 'top' })
    .webp({ quality: 80 })
    .toBuffer();

// The same size and ratio as the site's own share picture (templates/og-card.html). The name is
// broken into lines by character count, as on the README cards; one that cannot fit stops the run.
export function housePicture({ name, ink }, css) {
  if (!PALETTE[ink]) throw new Error(`"${name}" has no colour called "${ink}"`);
  const text = wrap(name, 18, 3, name);
  const size = 120;
  const lineHeight = 136;
  const first = 315 - ((text.length - 1) * lineHeight) / 2 + size * 0.33;
  const style = `${css}.name{font:400 ${size}px ${FONT.serif};fill:${PALETTE[ink]}}`;
  const body = `<rect width="1200" height="630" fill="${PALETTE.paper}"/>
<rect width="1200" height="630" filter="url(#grain)"/>
<text class="name" text-anchor="middle">${lines(text, 600, first, lineHeight)}</text>`;
  return svg({ w: 1200, h: 630, title: name, css: style, defs: GRAIN, body });
}
