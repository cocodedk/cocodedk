/** @jest-environment node */
// The collector runs in Node: jsdom is a library here, not the test environment.
import { discoverSites } from '../scripts/sites/discover';

const reply = (status, { body, headers = {} } = {}) => ({
  status,
  ok: status >= 200 && status < 300,
  headers: { get: (name) => headers[name.toLowerCase()] ?? null },
  json: async () => body,
});

// GitHub answers the repo list one page at a time (an empty page ends it); github.io answers
// a HEAD with the custom domain as a 301, or with a plain 200 when there is none.
function fakeGitHub({ pages, redirects = {}, apiStatus = 200, calls = [] }) {
  const fetch = async (url, init = {}) => {
    calls.push({ url, init });
    const api = url.match(/^https:\/\/api\.github\.com\/users\/cocodedk\/repos\?per_page=100&page=(\d+)$/);
    if (api) return apiStatus === 200 ? reply(200, { body: pages[Number(api[1]) - 1] ?? [] }) : reply(apiStatus);
    const pagesSite = url.match(/^https:\/\/cocodedk\.github\.io\/([^/]+)\/$/);
    if (pagesSite && init.method === 'HEAD' && init.redirect === 'manual') {
      const location = redirects[pagesSite[1]];
      return location ? reply(301, { headers: { location } }) : reply(200);
    }
    throw new Error(`unexpected request: ${url}`);
  };
  return fetch;
}

const repo = (name, has_pages = true) => ({ name, has_pages });

describe('finding the public cocode.dk sites', () => {
  test('should name a site by its cocode.dk host', async () => {
    const fake = fakeGitHub({ pages: [[repo('chess-puzzles')]], redirects: { 'chess-puzzles': 'https://chess.cocode.dk/' } });
    expect(await discoverSites({ fetch: fake })).toContainEqual({ id: 'chess', url: 'https://chess.cocode.dk/', repo: 'chess-puzzles' });
  });

  test('should keep a two-level host whole', async () => {
    const fake = fakeGitHub({ pages: [[repo('guard-android')]], redirects: { 'guard-android': 'https://android.guard.cocode.dk/' } });
    expect((await discoverSites({ fetch: fake })).map((s) => s.id)).toEqual(['android.guard']);
  });

  test('should skip a repo without Pages', async () => {
    const fake = fakeGitHub({ pages: [[repo('notes', false)]], redirects: { notes: 'https://notes.cocode.dk/' } });
    expect(await discoverSites({ fetch: fake })).toEqual([]);
  });

  test('should not ask github.io about a repo without Pages', async () => {
    const calls = [];
    await discoverSites({ fetch: fakeGitHub({ pages: [[repo('notes', false)]], calls }) });
    expect(calls.filter((c) => c.url.includes('github.io'))).toEqual([]);
  });

  test('should skip a site that stays on github.io', async () => {
    const fake = fakeGitHub({ pages: [[repo('tool')]] });
    expect(await discoverSites({ fetch: fake })).toEqual([]);
  });

  test('should skip cocode.dk itself', async () => {
    const fake = fakeGitHub({ pages: [[repo('cocodedk')]], redirects: { cocodedk: 'https://cocode.dk/' } });
    expect(await discoverSites({ fetch: fake })).toEqual([]);
  });

  test('should skip a site on another domain', async () => {
    const fake = fakeGitHub({ pages: [[repo('klinik')]], redirects: { klinik: 'https://klinikvenus.dk/' } });
    expect(await discoverSites({ fetch: fake })).toEqual([]);
  });

  test('should skip a host that only ends in the letters of cocode.dk', async () => {
    const fake = fakeGitHub({ pages: [[repo('fake')]], redirects: { fake: 'https://notcocode.dk/' } });
    expect(await discoverSites({ fetch: fake })).toEqual([]);
  });

  test('should read repos page after page until an empty one', async () => {
    const fake = fakeGitHub({
      pages: [[repo('a')], [repo('b')]],
      redirects: { a: 'https://a.cocode.dk/', b: 'https://b.cocode.dk/' },
    });
    expect((await discoverSites({ fetch: fake })).map((s) => s.id)).toEqual(['a', 'b']);
  });

  test('should sort the sites by id', async () => {
    const fake = fakeGitHub({
      pages: [[repo('zebra'), repo('apple')]],
      redirects: { zebra: 'https://z.cocode.dk/', apple: 'https://a.cocode.dk/' },
    });
    expect((await discoverSites({ fetch: fake })).map((s) => s.id)).toEqual(['a', 'z']);
  });

  test('should send the token to the GitHub API when there is one', async () => {
    const calls = [];
    await discoverSites({ fetch: fakeGitHub({ pages: [], calls }), token: 'abc' });
    expect(calls[0].init.headers.Authorization).toBe('Bearer abc');
  });

  test('should call the GitHub API without credentials when there is no token', async () => {
    const calls = [];
    await discoverSites({ fetch: fakeGitHub({ pages: [], calls }) });
    expect(calls[0].init.headers).not.toHaveProperty('Authorization');
  });

  test('should stop when the GitHub API refuses', async () => {
    await expect(discoverSites({ fetch: fakeGitHub({ pages: [], apiStatus: 403 }) })).rejects.toThrow('403');
  });
});
