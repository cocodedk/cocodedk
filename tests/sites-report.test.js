/** @jest-environment node */
import { report } from '../scripts/sites/report';

const rec = { url: 'https://tanks.cocode.dk/', repo: 'tanks', status: 200, image: null, versions: {} };
const titled = (title, lang = 'en') => ({ ...rec, versions: { [lang]: { url: rec.url, title, description: null } } });
const run = (over) => report({ before: {}, after: {}, problems: [], notes: [], ...over });

describe('the report of a run', () => {
  test('should list a new site', () => {
    expect(run({ after: { tanks: rec } })).toMatch(/## New sites[\s\S]*tanks/);
  });

  test('should list a gone site', () => {
    expect(run({ before: { tanks: rec } })).toMatch(/## Gone[\s\S]*tanks/);
  });

  test('should list problems under Needs words or fixes', () => {
    expect(run({ problems: ['x: needs a name, a Danish line and a group'] }))
      .toMatch(/## Needs words or fixes[\s\S]*x: needs a name/);
  });

  test('should say Nothing changed when nothing did', () => {
    expect(run({ before: { tanks: rec }, after: { tanks: rec } })).toBe('Nothing changed.');
  });

  test('should list a site that renamed itself under Changed titles', () => {
    expect(run({ before: { tanks: titled('Tanks') }, after: { tanks: titled('Tank Wars') } }))
      .toMatch(/## Changed titles[\s\S]*tanks[\s\S]*Tanks[\s\S]*Tank Wars/);
  });

  test('should compare the English title before the root one', () => {
    const both = (en, da) => ({ ...rec, versions: { da: { url: rec.url, title: da }, en: { url: 'https://tanks.cocode.dk/en/', title: en } } });
    expect(run({ before: { tanks: both('Tanks', 'Kampvogne') }, after: { tanks: both('Tanks', 'Tanks i krig') } })).toBe('Nothing changed.');
  });

  test('should list a site that kept its last known record under Could not reach', () => {
    expect(run({ before: { tanks: rec }, after: { tanks: { ...rec, stale: true } } }))
      .toMatch(/## Could not reach \(kept last known\)[\s\S]*tanks/);
  });

  test('should list the notes of the run under Pictures', () => {
    expect(run({ notes: ['tanks: the picture changed'] })).toMatch(/## Pictures[\s\S]*tanks: the picture changed/);
  });

  test('should leave out a section with nothing in it', () => {
    expect(run({ after: { tanks: rec } })).not.toMatch(/## Gone|## Pictures|## Needs words or fixes/);
  });
});
