// The site's own faces, cut down to the letters one picture uses and packed into it. An SVG shown as an
// image may not fetch anything, so a font it does not carry falls back to whatever the reader has.
import fs from 'fs';
import path from 'path';
import subsetFont from 'subset-font';

const dir = path.resolve(import.meta.dirname, '../../fonts');

// The faces are variable; each is pinned to the weights the pictures use, which is most of the saving.
export const FACES = {
  serif: { family: 'Ibarra Real Nova', file: 'ibarra-real-nova.woff2', style: 'normal', weight: 400 },
  serifItalic: { family: 'Ibarra Real Nova', file: 'ibarra-real-nova-italic.woff2', style: 'italic', weight: 400 },
  sans: { family: 'Ysabeau Office', file: 'ysabeau-office.woff2', style: 'normal', weight: '420 560' },
  sc: { family: 'Ysabeau SC', file: 'ysabeau-sc.woff2', style: 'normal', weight: 520 },
};

const axes = (weight) => {
  const [min, max = min] = String(weight).split(' ').map(Number);
  return { wght: min === max ? min : { min, max, default: min } };
};

export async function fontCss(faces, text) {
  const rules = await Promise.all(
    faces.map(async (face) => {
      const cut = await subsetFont(fs.readFileSync(path.join(dir, face.file)), text, {
        targetFormat: 'woff2',
        variationAxes: axes(face.weight),
      });
      const src = `url(data:font/woff2;base64,${cut.toString('base64')}) format('woff2')`;
      return `@font-face{font-family:'${face.family}';font-style:${face.style};font-weight:${face.weight};src:${src}}`;
    }),
  );
  return rules.join('');
}
