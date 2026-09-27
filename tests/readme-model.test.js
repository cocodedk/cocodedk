import copy from '../readme/copy.en.json';
import { buildModel } from '../scripts/readme/model';
import { readWorks } from '../js/page-facts';
import { loadPage } from './helpers/page';

const without = (name) => {
  const works = { ...copy.works };
  delete works[name];
  return { ...copy, works };
};

describe('the English model of the page', () => {
  let model;
  beforeEach(() => {
    loadPage();
    model = buildModel(document, copy);
  });

  test('should hold the featured works in page order', () => {
    expect(model.works.map((w) => w.name)).toEqual(['Weather', 'Metrologist', 'SwanReady', 'Parvaz', 'claude-email', 'lpterapi.dk']);
  });

  test('should hold every catalogue entry exactly once', () => {
    expect(model.groups.flatMap((g) => g.items)).toHaveLength(readWorks().filter((w) => !w.featured).length);
  });

  test('should name the groups in English, in page order', () => {
    expect(model.groups.map((g) => g.name)).toEqual(['Android apps', 'Web and games', 'Client projects', 'For Samsung TV', 'AI tools']);
  });

  test('should give a featured work its kind in English', () => {
    expect(model.works[2].kind).toBe('My own product');
  });

  test('should give a featured work its plate from the page', () => {
    expect(model.works[2].plate).toBe('art-swan');
  });

  test('should number the featured works from one', () => {
    expect(model.works.map((w) => w.no)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('should use an English name where the copy gives one', () => {
    expect(model.groups[1].items.map((i) => i.name)).toContain('Danish-Persian');
  });

  test('should send a featured work without a site to a demo mail', () => {
    expect(model.works[4].url).toBe('mailto:bb@cocode.dk?subject=claude-email');
  });

  test('should leave a catalogue entry without a site unlinked', () => {
    expect(model.groups[4].items.find((i) => i.name === 'MCP servers').url).toBeNull();
  });

  test('should stop and name a work the English copy is missing', () => {
    expect(() => buildModel(document, without('Tetris'))).toThrow('No English copy for work "Tetris" in readme/copy.en.json');
  });

  test('should translate the services', () => {
    expect(model.services.map((s) => s.name)).toEqual(['Advice', 'AI agents', 'Automation']);
  });

  test('should carry the contact details from the page', () => {
    expect(model.contact.email).toBe('bb@cocode.dk');
  });
});

describe('the English model when the page is missing something', () => {
  test('should stop when the page has no contact email', () => {
    loadPage();
    document.querySelector('#kontakt a[href^="mailto:"]').remove();
    expect(() => buildModel(document, copy)).toThrow('The contact section on the page has no email');
  });
});
