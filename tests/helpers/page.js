// The real page, not a copy of it: a tool that reads the page breaks the day someone renames a class,
// and only the real markup can notice.
import fs from 'fs';
import path from 'path';

const dir = path.join(__dirname, '../../templates/partials');
const read = (name) => fs.readFileSync(path.join(dir, `${name}.html`), 'utf8');
const MAIN = ['hero', 'works', 'catalogue', 'services', 'about', 'contact'];

// Assembled the way templates/template.html assembles it.
export function loadPage() {
  document.body.innerHTML = `${read('header')}${read('dock')}<main id="indhold">${MAIN.map(read).join('')}</main>${read('footer')}`;
}
