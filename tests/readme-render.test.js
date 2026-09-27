import copy from '../readme/copy.en.json';
import { buildModel } from '../scripts/readme/model';
import { renderReadme } from '../scripts/readme/markdown';
import { workCard, heading } from '../scripts/readme/cards';
import { hero } from '../scripts/readme/hero';
import { loadPage } from './helpers/page';

const card = { no: 1, name: 'R&D', kind: 'AI tool', line: 'Short.', url: 'https://x.cocode.dk', plate: 'art-x' };

describe('the README', () => {
  let model;
  let readme;
  beforeEach(() => {
    loadPage();
    model = buildModel(document, copy);
    readme = renderReadme(model);
  });

  test('should link every work that has a site', () => {
    const urls = model.works.concat(model.groups.flatMap((g) => g.items)).map((w) => w.url).filter(Boolean);
    expect(urls.filter((url) => !readme.includes(`href="${url}"`))).toEqual([]);
  });

  test('should print a catalogue entry without a site as plain text', () => {
    expect(readme).toContain('<b>MCP servers</b> · ');
  });

  test('should never link to nothing', () => {
    expect(readme).not.toMatch(/href="(null|undefined)?"/);
  });

  test('should give every image the words it shows', () => {
    expect(readme.match(/<img [^>]*>/g).filter((img) => !/alt="[^"]+"/.test(img))).toEqual([]);
  });

  test('should show one card per featured work', () => {
    expect(readme.match(/readme\/img\/work-[a-z0-9-]+\.svg/g)).toHaveLength(model.works.length);
  });

  test('should escape a name in the Markdown', () => {
    const odd = { ...model, groups: [{ name: 'Tools', items: [{ name: 'R&D', line: 'x', url: null }] }] };
    expect(renderReadme(odd)).toContain('<b>R&amp;D</b>');
  });
});

describe('the pictures', () => {
  test('should set a work card title escaped', () => {
    expect(workCard(card, '', '')).toContain('R&amp;D');
  });

  test('should refuse a card line too long for the card', () => {
    expect(() => workCard({ ...card, line: 'word '.repeat(60) }, '', '')).toThrow('"R&D" needs more than');
  });

  test('should name the work a demo card offers', () => {
    expect(workCard({ ...card, url: 'mailto:bb@cocode.dk?subject=R%26D' }, '', '')).toContain('Ask for a demo');
  });

  test('should set a heading', () => {
    expect(heading('Selected works', '')).toContain('>Selected works<');
  });

  test('should put the title in the hero', () => {
    loadPage();
    expect(hero(buildModel(document, copy), '', '')).toContain('And I build what I');
  });
});

describe('a work card title', () => {
  test('should refuse a name too long for one line', () => {
    expect(() => workCard({ ...card, name: 'Klinik for Manuel Terapi' }, '', '')).toThrow('"Klinik for Manuel Terapi" needs more than 1 lines');
  });
});
