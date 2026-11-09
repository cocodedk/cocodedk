/** @jest-environment node */
// The gate on the catalogue data: every site has words and a picture, the committed partial is what the
// data renders to, and the menu sheet links exactly the groups on the page. A new site fails it until
// someone writes its line and picks its group.
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import { renderCatalogue, keptBlocks } from '../scripts/sites/render';
import { findProblems } from '../scripts/sites/check';
import { DATA } from '../scripts/sites/paths';

const root = path.join(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const catalogue = JSON.parse(read(DATA.catalogue));
const sites = JSON.parse(read(DATA.sites));
const page = (file) => new JSDOM(read(file)).window.document;

describe('the catalogue data', () => {
  test('should have words and a picture for every site', () => {
    expect(findProblems({ catalogue, sites, hasFile: (p) => fs.existsSync(path.join(root, p)) })).toEqual([]);
  });

  test('should keep the catalogue partial in step with its data', () => {
    const current = read(DATA.partial);
    expect(renderCatalogue({ catalogue, sites, kept: keptBlocks(current) })).toBe(current);
  });

  test('should link every catalogue group from the menu sheet, and nothing else', () => {
    const groups = [...page(DATA.partial).querySelectorAll('.index__group h3')].map((h) => `#${h.id}`);
    const links = [...page('templates/partials/dock.html').querySelectorAll('.toc__groups a')].map((a) => a.getAttribute('href'));
    expect(new Set(links)).toEqual(new Set(groups));
  });
});
