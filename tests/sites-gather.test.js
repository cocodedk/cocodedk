/** @jest-environment node */
// The collector runs in Node: jsdom is a library here, not the test environment.
import { gatherSite, settle } from '../scripts/sites/gather';

const site = { id: 'chess', url: 'https://chess.cocode.dk/', repo: 'chess-puzzles' };

const page = ({ lang, title, description, image, alternates = {} }) => [
  `<html${lang ? ` lang="${lang}"` : ''}><head>`,
  title ? `<meta property="og:title" content="${title}">` : '',
  description ? `<meta property="og:description" content="${description}">` : '',
  image ? `<meta property="og:image" content="${image}">` : '',
  ...Object.entries(alternates).map(([l, href]) => `<link rel="alternate" hreflang="${l}" href="${href}">`),
  '</head></html>',
].join('');

// A site as chess.cocode.dk has it: English at the root, Danish below /da/, both listed.
const ROOT = 'https://chess.cocode.dk/';
const DA = 'https://chess.cocode.dk/da/';
const pages = () => ({
  [ROOT]: page({ lang: 'en', title: 'Chess', description: 'Puzzles', image: '/og.png', alternates: { en: ROOT, da: DA, 'x-default': ROOT } }),
  [DA]: page({ lang: 'da', title: 'Skak', description: 'Opgaver' }),
});
const serve = (map, calls = []) => async (url) => {
  calls.push(url);
  if (!(url in map)) return { status: 404, text: '' };
  if (map[url] instanceof Error) throw map[url];
  return { status: 200, text: map[url] };
};

describe('gathering one site', () => {
  test('should gather each language version', async () => {
    const record = await gatherSite(site, serve(pages()));
    expect(record.versions).toEqual({
      da: { url: DA, title: 'Skak', description: 'Opgaver' },
      en: { url: ROOT, title: 'Chess', description: 'Puzzles' },
    });
  });

  test('should list the language versions in sorted order', async () => {
    const record = await gatherSite(site, serve(pages()));
    expect(Object.keys(record.versions)).toEqual(['da', 'en']);
  });

  test('should record the status, the repo and the picture of the root', async () => {
    const record = await gatherSite(site, serve(pages()));
    expect(record).toMatchObject({ url: ROOT, repo: 'chess-puzzles', status: 200, image: 'https://chess.cocode.dk/og.png' });
  });

  test('should not fetch the root again for its own language', async () => {
    const calls = [];
    await gatherSite(site, serve(pages(), calls));
    expect(calls.filter((u) => u === ROOT)).toHaveLength(1);
  });

  test('should file a root that names no language under und', async () => {
    const record = await gatherSite(site, serve({ [ROOT]: page({ title: 'Chess' }) }));
    expect(Object.keys(record.versions)).toEqual(['und']);
  });

  test('should skip an alternate that cannot be reached', async () => {
    const map = { ...pages(), [DA]: new Error('timeout') };
    expect(Object.keys((await gatherSite(site, serve(map))).versions)).toEqual(['en']);
  });

  test('should skip an alternate that answers 404', async () => {
    const { [DA]: gone, ...map } = pages();
    expect(Object.keys((await gatherSite(site, serve(map))).versions)).toEqual(['en']);
  });

  test('should keep a site that answers 404 with no versions', async () => {
    expect(await gatherSite(site, async () => ({ status: 404, text: '' }))).toMatchObject({ status: 404, versions: {}, image: null });
  });

  test('should let an unreachable root fail', async () => {
    await expect(gatherSite(site, serve({ [ROOT]: new Error('timeout') }))).rejects.toThrow('timeout');
  });
});

describe('settling what a gather brought back', () => {
  const previous = { url: ROOT, repo: 'chess-puzzles', status: 200, image: 'https://chess.cocode.dk/og.png', versions: { en: { url: ROOT, title: 'Chess', description: 'Puzzles' } } };

  test('should keep the last known record when a site cannot be reached', () => {
    expect(settle(site, new Error('timeout'), previous)).toEqual({ ...previous, stale: true });
  });

  test('should record status 0 for an unreachable site never seen before', () => {
    expect(settle(site, new Error('timeout'))).toEqual({ url: ROOT, repo: 'chess-puzzles', status: 0, image: null, versions: {} });
  });

  test('should take a fresh record as it is', () => {
    const fresh = { ...previous, status: 404, image: null, versions: {} };
    expect(settle(site, fresh, previous)).toBe(fresh);
  });
});
