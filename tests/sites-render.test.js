/** @jest-environment node */
import { JSDOM } from 'jsdom';
import { renderCatalogue, keptBlocks, shownEntries } from '../scripts/sites/render';

const groups = [
  { id: 'apps', title: 'Apps til Android', ink: 'lapis' },
  { id: 'web', title: 'Web og spil', ink: 'saffron' },
  { id: 'empty', title: 'Ingen kort', ink: 'ochre' },
];
const site = (id) => ({ url: `https://${id}.cocode.dk/`, repo: id, status: 200, image: `https://${id}.cocode.dk/og.png`, versions: {} });
const sites = { chess: site('chess'), tetris: site('tetris'), brand: site('brand') };
const entries = [
  { id: 'tetris', group: 'web', name: 'Tetris', line: 'Klodsspil i browseren.' },
  { id: 'chess', group: 'apps', name: 'Chess Puzzles', line: 'Skakopgaver.', get: 'chess-puzzles' },
  { id: 'brand', hidden: 'the shared frame, not a product' },
];
const catalogue = { groups, entries };
const block = '\n<a class="index__get" href="https://f-droid.org/x">Hent på F-Droid</a>\n';
const kept = new Map([['chess-puzzles', block]]);

const render = (over = {}) => renderCatalogue({ catalogue, sites, kept, ...over });
const page = (html) => new JSDOM(html).window.document;
const withEntries = (list) => ({ catalogue: { groups, entries: list }, sites });
// The card of one entry; the cards come out in group order, so the first one on the page is not Tetris.
const cardOf = (html, name) => [...page(html).querySelectorAll('.index__list > li')]
  .find((li) => li.querySelector('.index__name').textContent === name);

describe('rendering the catalogue', () => {
  test('should render one card per shown entry', () => {
    expect(page(render()).querySelectorAll('.index__list > li')).toHaveLength(2);
  });

  test('should render the groups in the order of the group list', () => {
    const titles = [...page(render()).querySelectorAll('.index__group h3')].map((h) => h.textContent);
    expect(titles).toEqual(['Apps til Android', 'Web og spil']);
  });

  test('should skip a group with no cards', () => {
    expect(render()).not.toContain('g-empty');
  });

  test('should point each group heading at its section', () => {
    const section = page(render()).querySelector('.index__group');
    expect(section.getAttribute('aria-labelledby')).toBe(section.querySelector('h3').id);
  });

  test('should keep the section wrapper, heading and note of the page', () => {
    const doc = page(render());
    expect([doc.querySelector('#katalog h2').textContent, doc.querySelector('#katalog .note').textContent])
      .toEqual(['Resten af kataloget', 'Små ting, sjove ting og et par meget store.']);
  });

  test('should show the card picture at its size, lazy-loaded', () => {
    const img = cardOf(render(), 'Tetris').querySelector('img.index__pic');
    expect(img.outerHTML).toBe('<img class="index__pic" src="images/works/tetris.webp" width="640" height="336" loading="lazy" decoding="async" alt="">');
  });

  test('should show a house-made picture from its .svg file', () => {
    const house = { id: 'unity', group: 'web', name: 'Unity Foundation', line: 'Kunde.', picture: 'house' };
    expect(renderCatalogue({ ...withEntries([house]), kept })).toContain('src="images/works/unity.svg"');
  });

  test('should put the name, line and address on the card', () => {
    const li = cardOf(render(), 'Tetris');
    expect([li.querySelector('.index__name').textContent, li.querySelector('.index__desc').textContent])
      .toEqual(['Tetris', 'Klodsspil i browseren.']);
  });

  test('should link to the site address from the site record', () => {
    expect(cardOf(render(), 'Tetris').querySelector('a.index__link').getAttribute('href')).toBe('https://tetris.cocode.dk/');
  });

  test('should prefer the address of the entry over the one of the site', () => {
    const own = { ...entries[0], url: 'https://example.org/tetris' };
    expect(page(renderCatalogue({ ...withEntries([own]), kept })).querySelector('a.index__link').getAttribute('href')).toBe('https://example.org/tetris');
  });

  test('should show the address without scheme or trailing slash', () => {
    expect(cardOf(render(), 'Tetris').querySelector('a.index__link').textContent).toBe('tetris.cocode.dk');
  });

  test('should keep the path of an address', () => {
    const own = { ...entries[0], url: 'https://github.com/cocodedk/tmux-zipper/' };
    expect(page(renderCatalogue({ ...withEntries([own]), kept })).querySelector('a.index__link').textContent).toBe('github.com/cocodedk/tmux-zipper');
  });

  test('should leave an entry without a site unlinked', () => {
    const house = { id: 'unity', group: 'web', name: 'Unity Foundation', line: 'Kunde.', picture: 'house' };
    expect(page(renderCatalogue({ ...withEntries([house]), kept })).querySelector('a.index__link')).toBeNull();
  });

  test('should escape names and lines', () => {
    const rough = { id: 'tetris', group: 'web', name: 'A & B', line: 'Små <ting> "her"' };
    const html = renderCatalogue({ ...withEntries([rough]), kept });
    expect(html).toContain('<span class="index__name">A &amp; B</span><span class="index__desc">Små &lt;ting&gt; &quot;her&quot;</span>');
  });

  test('should keep a cocode-apps download block inside its card', () => {
    expect(render()).toContain('<!-- cocode-apps:get-chess-puzzles:start -->\n<a class="index__get"');
  });

  test('should close the download block before the end of its card', () => {
    expect(render()).toContain('Hent på F-Droid</a>\n<!-- cocode-apps:get-chess-puzzles:end --></li>');
  });

  test('should leave an empty marker pair when no download block was kept', () => {
    expect(render({ kept: new Map() })).toContain('<!-- cocode-apps:get-chess-puzzles:start --><!-- cocode-apps:get-chess-puzzles:end --></li>');
  });

  test('should give a card without a get no markers', () => {
    expect(cardOf(render(), 'Tetris').innerHTML).not.toContain('cocode-apps');
  });
});

describe('reading the download blocks back', () => {
  test('should read back the blocks it wrote', () => {
    expect(keptBlocks(render()).get('chess-puzzles')).toBe(block);
  });

  test('should read an empty pair as empty text', () => {
    expect(keptBlocks(render({ kept: new Map() })).get('chess-puzzles')).toBe('');
  });

  test('should read every pair in the html', () => {
    const html = '<!-- cocode-apps:get-a:start -->one<!-- cocode-apps:get-a:end --> x <!-- cocode-apps:get-b-c:start -->two<!-- cocode-apps:get-b-c:end -->';
    expect([...keptBlocks(html)]).toEqual([['a', 'one'], ['b-c', 'two']]);
  });

  test('should find nothing in html without markers', () => {
    expect(keptBlocks('<p>nothing</p>').size).toBe(0);
  });
});

describe('which entries are shown', () => {
  const ids = (list) => shownEntries(withEntries(list)).map((entry) => entry.id);
  const good = { id: 'tetris', group: 'web', name: 'Tetris', line: 'Klodsspil.' };

  test('should show an entry with words, a group and a share picture', () => {
    expect(ids([good])).toEqual(['tetris']);
  });

  test('should not show a hidden entry', () => {
    expect(ids([{ ...good, hidden: 'frame' }])).toEqual([]);
  });

  test('should not show an entry without a name', () => {
    expect(ids([{ ...good, name: undefined }])).toEqual([]);
  });

  test('should not show an entry without a line', () => {
    expect(ids([{ ...good, line: undefined }])).toEqual([]);
  });

  test('should not show an entry in an unknown group', () => {
    expect(ids([{ ...good, group: 'nowhere' }])).toEqual([]);
  });

  test('should not show an entry whose site shares no picture', () => {
    const bare = { catalogue: { groups, entries: [good] }, sites: { tetris: { ...site('tetris'), image: null } } };
    expect(shownEntries(bare)).toEqual([]);
  });

  test('should show a house-made entry without a site', () => {
    expect(ids([{ ...good, id: 'unity', picture: 'house' }])).toEqual(['unity']);
  });
});
