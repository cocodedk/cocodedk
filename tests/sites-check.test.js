/** @jest-environment node */
import { findProblems } from '../scripts/sites/check';

const groups = [{ id: 'ai', title: 'AI-værktøjer', ink: 'lapis' }];
const rec = { url: 'https://tanks.cocode.dk/', repo: 'tanks', status: 200, image: 'https://tanks.cocode.dk/og.png', versions: {} };
const words = { id: 'tanks', group: 'ai', name: 'Tanks', line: 'Kampvogne i browseren.' };
const problems = ({ entries, sites = { tanks: rec }, hasFile = () => true }) =>
  findProblems({ catalogue: { groups, entries }, sites, hasFile });

describe('checking the catalogue data', () => {
  test('should accept a site that is complete', () => {
    expect(problems({ entries: [words] })).toEqual([]);
  });

  test('should flag a site missing from the catalogue', () => {
    expect(findProblems({ catalogue: { groups: [], entries: [] }, sites: { tanks: rec }, hasFile: () => true }))
      .toEqual(['tanks: on cocode.dk but not in data/catalogue.json']);
  });

  test('should accept a hidden site without words', () => {
    expect(problems({ entries: [{ id: 'tanks', hidden: 'not a product' }] })).toEqual([]);
  });

  test('should flag an entry listed twice', () => {
    expect(problems({ entries: [words, words] })).toEqual(['tanks: listed twice']);
  });

  test('should flag a hidden entry listed twice', () => {
    expect(problems({ entries: [{ id: 'tanks', hidden: 'x' }, words] })).toEqual(['tanks: listed twice']);
  });

  test('should flag an entry listed twice only once', () => {
    expect(problems({ entries: [words, words, words] })).toEqual(['tanks: listed twice']);
  });

  test('should flag a shown entry without a Danish line', () => {
    expect(problems({ entries: [{ ...words, line: undefined }] })).toEqual(['tanks: needs a name, a Danish line and a group']);
  });

  test('should flag a shown entry without a name', () => {
    expect(problems({ entries: [{ ...words, name: '' }] })).toEqual(['tanks: needs a name, a Danish line and a group']);
  });

  test('should flag a shown entry without a group', () => {
    expect(problems({ entries: [{ ...words, group: undefined }] })).toEqual(['tanks: needs a name, a Danish line and a group']);
  });

  test('should flag a group that is not in the group list', () => {
    expect(problems({ entries: [{ ...words, group: 'games' }] })).toEqual(['tanks: group "games" is not in the group list']);
  });

  test('should flag a site that shares no picture', () => {
    expect(problems({ entries: [words], sites: { tanks: { ...rec, image: null } } })).toEqual(['tanks: the site shares no picture']);
  });

  test('should flag a missing picture file', () => {
    expect(problems({ entries: [words], hasFile: () => false })).toEqual(['tanks: picture file images/works/tanks.webp is missing']);
  });

  test('should ask for the file the card will show', () => {
    const asked = [];
    problems({ entries: [words], hasFile: (path) => asked.push(path) > 0 });
    expect(asked).toEqual(['images/works/tanks.webp']);
  });

  test('should flag a missing house-made picture file', () => {
    const house = { ...words, picture: 'house', url: 'https://example.org' };
    expect(problems({ entries: [house], sites: {}, hasFile: () => false })).toEqual(['tanks: picture file images/works/tanks.svg is missing']);
  });

  test('should accept a house-made entry without a site', () => {
    expect(problems({ entries: [{ ...words, picture: 'house' }], sites: {} })).toEqual([]);
  });

  test('should flag a motif the library does not have', () => {
    expect(problems({ entries: [{ ...words, picture: 'house', motif: 'kite' }], sites: {} }))
      .toEqual(['tanks: motif "kite" is not in the motif library']);
  });

  test('should accept a motif the library has', () => {
    expect(problems({ entries: [{ ...words, picture: 'house', motif: 'dove' }], sites: {} })).toEqual([]);
  });

  test('should flag an entry whose site is gone', () => {
    expect(problems({ entries: [words], sites: {} })).toEqual(['tanks: no site with this name any more']);
  });

  test('should flag an entry with an address of its own whose site was never gathered', () => {
    expect(problems({ entries: [{ ...words, url: 'https://example.org' }], sites: {} }))
      .toEqual(['tanks: the site shares no picture']);
  });

  test('should flag a site that answers badly', () => {
    expect(problems({ entries: [words], sites: { tanks: { ...rec, status: 503, image: null } } })).toEqual(['tanks: the site answers 503']);
  });

  test('should not flag a stale site', () => {
    expect(problems({ entries: [words], sites: { tanks: { ...rec, status: 0, stale: true } } })).toEqual([]);
  });

  test('should not flag status or picture of a hidden entry', () => {
    const hidden = { id: 'tanks', hidden: 'x' };
    expect(problems({ entries: [hidden], sites: { tanks: { ...rec, status: 503, image: null } }, hasFile: () => false })).toEqual([]);
  });

  test('should list every problem of an entry', () => {
    const bad = { id: 'tanks', group: 'games', name: 'Tanks' };
    expect(problems({ entries: [bad], sites: { tanks: { ...rec, image: null } } })).toEqual([
      'tanks: needs a name, a Danish line and a group',
      'tanks: group "games" is not in the group list',
      'tanks: the site shares no picture',
    ]);
  });
});
