# Catalogue Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A script (`npm run sites`) that gathers what every public `*.cocode.dk` site says about itself
and renders the catalogue on cocode.dk as poster cards, plus a weekly Action that proposes the result as
a PR.

**Architecture:** Pure modules in `scripts/sites/` (read metadata, discover sites, gather, render,
check, pictures, report) and one IO entry point, `scripts/sites/run.js`. Gathered facts go to
`data/sites.json` (generated). Groups, names and Danish lines live in `data/catalogue.json` (hand-kept).
The script writes `templates/partials/catalogue.html` (generated, committed) with the same `.index__*`
classes as today, so `js/page-facts.js`, the README generator, WebMCP and the cocode-apps markers keep
working unchanged. A Jest test is the gate: it fails when a site lacks words or a picture, or when the
partial is out of date.

**Tech Stack:** Node ≥ 20.19 ESM scripts (as `scripts/readme/`), `jsdom` (already a dev dependency), `sharp`
(new dev dependency) for WebP, Jest (jsdom env; `@jest-environment node` where sharp is used),
GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-11-09-catalogue-cards-design.md`. Mockup:
`design/mockups/catalogue-cards.html` (option A, poster).

## Global Constraints

- Max 200 lines per code file (js, css, html), the generated partial included; `npm run lint:length`.
- Conventional Commits, one feature per commit; never `--no-verify`.
- No third-party requests from the page: pictures are served from cocode.dk (`images/works/`).
- Danish copy goes through the `humanizer-da` skill; Babak reviews it in the PR. Never copy a site's text onto the page.
- `README.md` is generated (`npm run readme`); never edit it. Every catalogue name needs an English line in `readme/copy.en.json`.
- Generated files carry no timestamps and sort their keys, so a run with nothing new produces no diff.
- Card picture: 640×336 (the 1200:630 share ratio), WebP from the site's `og:image`, or a house-made SVG.
- Keep the class names `.index__group`, `.index__list > li`, `.index__name`, `.index__desc`, `a.index__link`, `.index__get`, and the `<!-- cocode-apps:get-<id>:start/end -->` markers.
- Hidden from the catalogue: `linkedin-extension`, `brand`, `d7`, and the featured sites `weather`, `measure`, `swanready`, `parvaz`, `claude-email`.
- GitHub calls are unauthenticated unless `GITHUB_TOKEN` is set. The site list comes from the API, not from `~/.claude-personal/state/tools/cocode-subdomains.txt`.

## Review Focus

1. A site that times out or answers 5xx during a run keeps its last known record and picture, and the report says so. Its card must not vanish (Task 2 `settle`, Task 5).
2. Relative `og:image` and `hreflang` URLs (`og.png`, `/img/share.png`, `../fa/`) resolve against the page URL (Task 2).
3. An `og:image` that is not an image (an HTML 404 page served with 200) causes no crash. The previous picture is kept and reported (Task 3 `shrink` rejects, Task 5).
4. A site that disappears (repo deleted or made private) gets flagged, and its orphaned picture is removed (Task 4 check, Task 5).
5. `&`, `<` and quotes in names and lines are escaped in the partial and in the house SVG (Tasks 3 and 4).

---

### Task 1: Fix the three broken share pictures (other repos)

**Files:** in `cocodedk/7kasif`, `cocodedk/codescan`, `cocodedk/job-jagger` (clone into `~/0-projects/<repo>` if absent).

- [ ] **Step 1:** For codescan and job-jagger, read the `og:image` URL the live page names (`curl -s https://<id>.cocode.dk/ | grep -o 'og:image[^>]*'`) and find why it 404s: wrong path, or a file missing from the folder the deploy workflow uploads.
- [ ] **Step 2:** For 7kasif, add `og:image` (1200×630) the way a sibling site does it. Look at how `Danish-Persian-Lessons` produced its `og.png` and follow the same method.
- [ ] **Step 3:** One PR per repo (`fix: share picture`). Ask Babak before merging each one.
- [ ] **Step 4:** After deploy: `curl -s -o /dev/null -w '%{http_code}' <og:image URL>` gives `200` for all three.

### Task 2: Collect: read metadata, discover sites, gather each site

**Files:**
- Create: `scripts/sites/meta.js`, `scripts/sites/discover.js`, `scripts/sites/gather.js`
- Test: `tests/sites-meta.test.js`, `tests/sites-discover.test.js`, `tests/sites-gather.test.js`

**Interfaces:**
- Produces:
  - `readMeta(html: string, pageUrl: string) -> { lang: string|null, title: string|null, description: string|null, siteName: string|null, image: string|null, alternates: Record<string,string> }`. `title` = `og:title` else `<title>`; `description` = `og:description` else `meta[name=description]`; `image` and `alternates` are absolute; `x-default` is dropped. Parse with `new JSDOM(html)`.
  - `discoverSites({ fetch, token? }) -> Promise<Array<{ id: string, url: string, repo: string }>>`, sorted by `id`.
  - `gatherSite(site: {id,url,repo}, fetchText: (url) => Promise<{status:number,text:string}>) -> Promise<SiteRecord>`
  - `settle(site, result: SiteRecord|Error, previous?: SiteRecord) -> SiteRecord`
  - `SiteRecord = { url: string, repo: string|null, status: number, image: string|null, versions: Record<lang, { url, title, description }>, stale?: true }`

- [ ] **Step 1: Write failing tests**

```js
// tests/sites-meta.test.js
test('should prefer og:title over <title>', () => {
  expect(readMeta('<title>T</title><meta property="og:title" content="OG">', 'https://a.cocode.dk/').title).toBe('OG');
});
test('should resolve a relative og:image against the page', () => {
  expect(readMeta('<meta property="og:image" content="og.png">', 'https://a.cocode.dk/da/').image).toBe('https://a.cocode.dk/da/og.png');
});
test('should list alternates by language without x-default', () => {
  const html = '<link rel="alternate" hreflang="fa" href="/fa/"><link rel="alternate" hreflang="x-default" href="/">';
  expect(readMeta(html, 'https://a.cocode.dk/').alternates).toEqual({ fa: 'https://a.cocode.dk/fa/' });
});
test('should decode entities in the description', () => {
  expect(readMeta('<meta name="description" content="Tom &amp; Jerry">', 'https://a.cocode.dk/').description).toBe('Tom & Jerry');
});

// tests/sites-discover.test.js: fake fetch. API page 1 lists repos, page 2 is []; github.io HEAD answers 301 + location.
test('should name a site by its cocode.dk host', async () => {
  // repo "chess-puzzles", has_pages true -> location https://chess.cocode.dk/
  expect(await discoverSites({ fetch: fake })).toContainEqual({ id: 'chess', url: 'https://chess.cocode.dk/', repo: 'chess-puzzles' });
});
test('should keep a two-level host whole', async () => { /* guard-android -> id 'android.guard' */ });
test('should skip a repo without Pages', async () => { /* has_pages false -> absent */ });
test('should skip a site that stays on github.io', async () => { /* HEAD answers 200 -> absent */ });
test('should skip cocode.dk itself', async () => { /* location https://cocode.dk/ -> absent */ });

// tests/sites-gather.test.js
test('should gather each language version', async () => {
  // root lang en with alternate da -> versions has keys ['da','en'] with their titles
});
test('should keep a site that answers 404 with no versions', async () => {
  expect(await gatherSite(site, async () => ({ status: 404, text: '' }))).toMatchObject({ status: 404, versions: {}, image: null });
});
test('should keep the last known record when a site cannot be reached', () => {
  expect(settle(site, new Error('timeout'), previous)).toEqual({ ...previous, stale: true });
});
test('should record status 0 for an unreachable site never seen before', () => {
  expect(settle(site, new Error('timeout'))).toMatchObject({ status: 0, versions: {} });
});
```

- [ ] **Step 2:** `npx jest tests/sites-` gives FAIL (modules missing).
- [ ] **Step 3: Implement.** `discoverSites` pages through `https://api.github.com/users/cocodedk/repos?per_page=100&page=N` until an empty page (header `Authorization: Bearer <token>` when given). It keeps `has_pages` repos, then calls `fetch('https://cocodedk.github.io/<repo>/', { method: 'HEAD', redirect: 'manual' })`. A 301/302 whose `location` host ends in `.cocode.dk` gives `id` = the host minus `.cocode.dk`. `gatherSite` uses the root's `lang` (or `'und'`) as its version key. It fetches each alternate whose language differs from the root's, and skips an alternate that fails.
- [ ] **Step 4:** `npx jest tests/sites-` gives PASS.
- [ ] **Step 5:** Live check: `curl -sI https://cocodedk.github.io/chess-puzzles/ | grep -i location` gives `https://chess.cocode.dk/`.
- [ ] **Step 6:** Commit `feat: gather what each cocode.dk site says about itself`.

### Task 3: Pictures: shrink share pictures, draw house-made ones

**Files:**
- Create: `scripts/sites/paths.js`, `scripts/sites/pictures.js`
- Modify: `package.json` (devDependency `sharp`)
- Test: `tests/sites-pictures.test.js` (first line `/** @jest-environment node */`)

**Interfaces:**
- Produces:
  - `paths.js`: `PICTURE = { width: 640, height: 336 }`; `picturePath(entry) -> string`, which gives `images/works/<id>.svg` when `entry.picture === 'house'` and `images/works/<id>.webp` otherwise. Also `DATA = { catalogue: 'data/catalogue.json', sites: 'data/sites.json', partial: 'templates/partials/catalogue.html', dir: 'images/works' }`.
  - `pictures.js`: `shrink(buffer: Buffer) -> Promise<Buffer>` (sharp: `resize(640, 336, { fit: 'cover', position: 'top' })`, `.webp({ quality: 80 })`; throws on input that is not an image). `housePicture({ name, ink }, css: string) -> string` (SVG built with `svg()`, `esc`, `wrap` and `PALETTE` from `scripts/readme/svg.js`; viewBox 1200×630; paper background; the name in the serif, colour `PALETTE[ink]`).

- [ ] **Step 1: Write failing tests**

```js
test('should shrink a share picture to 640x336 WebP', async () => {
  const png = await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#fff' } }).png().toBuffer();
  expect(await sharp(await shrink(png)).metadata()).toMatchObject({ format: 'webp', width: 640, height: 336 });
});
test('should refuse something that is not a picture', async () => {
  await expect(shrink(Buffer.from('<html>404</html>'))).rejects.toThrow();
});
test('should escape the name in a house-made picture', () => {
  expect(housePicture({ name: 'Tom & <Jerry>', ink: 'lapis' }, '')).toContain('Tom &amp; &lt;Jerry&gt;');
});
test('should draw a house-made picture as valid SVG', () => {
  expect(() => new JSDOM(housePicture({ name: 'MCP-servere', ink: 'saffron' }, ''), { contentType: 'image/svg+xml' })).not.toThrow();
});
test('should name a house-made picture .svg', () => {
  expect(picturePath({ id: 'unity', picture: 'house' })).toBe('images/works/unity.svg');
});
```

- [ ] **Step 2:** `npm i -D sharp`, then `npx jest tests/sites-pictures` gives FAIL.
- [ ] **Step 3:** Implement as in Interfaces.
- [ ] **Step 4:** `npx jest tests/sites-pictures` gives PASS.
- [ ] **Step 5:** `rm -rf node_modules && npm ci --ignore-scripts && node -e "require('sharp')"` exits 0. The weekly job installs this way.
- [ ] **Step 6:** Commit `feat: shrink share pictures and draw house-made ones`.

### Task 4: Render the catalogue and check its data

**Files:**
- Create: `scripts/sites/render.js`, `scripts/sites/check.js`
- Test: `tests/sites-render.test.js`, `tests/sites-check.test.js`

**Interfaces:**
- Consumes: `picturePath`, `PICTURE` (Task 3); `SiteRecord` (Task 2).
- Produces:
  - `Catalogue = { groups: Array<{ id, title, ink }>, entries: Array<Entry> }`, with `Entry = { id, group?, name?, line?, url?, get?, picture?: 'house', hidden?: string }`. `hidden` holds the reason as a string.
  - `keptBlocks(html: string) -> Map<string, string>`: the inner text between each `cocode-apps:get-<id>` start/end marker pair.
  - `renderCatalogue({ catalogue, sites, kept }) -> string`: the whole partial.
  - `shownEntries({ catalogue, sites }) -> Entry[]`: entries that are not hidden and have a name, a line, a known group, and a picture (house, or `sites[id].image`).
  - `findProblems({ catalogue, sites, hasFile: (path) => boolean }) -> string[]`.

The partial keeps today's section wrapper and heading verbatim (`id="katalog"`, "Resten af kataloget", the note line). There is one `<section class="index__group" aria-labelledby="g-<id>">` per group that has cards, in `groups` order. Each card sits on one line:

```html
<li><img class="index__pic" src="images/works/<id>.webp" width="640" height="336" loading="lazy" decoding="async" alt=""><span class="index__name">Name</span><span class="index__desc">Line</span><a class="index__link" href="URL">host/path</a>{get block}</li>
```

The URL is `entry.url`, falling back to `sites[id].url`. The shown address drops the scheme and any trailing `/`. An entry with no URL gets no `index__link`. When `entry.get` is set, the get block is the marker pair holding `kept.get(entry.get)`, or empty.

Problem messages (exact):
- `<id>: on cocode.dk but not in data/catalogue.json`
- `<id>: listed twice`
- `<id>: needs a name, a Danish line and a group`
- `<id>: group "<g>" is not in the group list`
- `<id>: the site shares no picture`
- `<id>: picture file <path> is missing`
- `<id>: no site with this name any more` (no `url`, not `house`, not in `sites`)
- `<id>: the site answers <status>` (status not 200, not stale)

- [ ] **Step 1: Write failing tests**

```js
test('should render one card per shown entry in group order', () => { /* 2 groups, 3 entries, one hidden -> 2 <li> */ });
test('should keep a cocode-apps download block inside its card', () => {
  const kept = new Map([['chess-puzzles', '\n<a class="index__get" href="https://f-droid.org/x">Hent på F-Droid</a>\n']]);
  expect(renderCatalogue({ catalogue, sites, kept })).toContain('<!-- cocode-apps:get-chess-puzzles:start -->\n<a class="index__get"');
});
test('should read back the blocks it wrote', () => { expect(keptBlocks(renderCatalogue(args)).get('chess-puzzles')).toBe(block); });
test('should leave an entry without a site unlinked', () => { /* house entry, no url -> no index__link */ });
test('should escape names and lines', () => { /* 'A & B' -> 'A &amp; B' */ });
test('should show the address without scheme or trailing slash', () => { /* https://chess.cocode.dk/ -> chess.cocode.dk */ });
test('should skip a group with no cards', () => {});
// check
test('should flag a site missing from the catalogue', () => {
  expect(findProblems({ catalogue: { groups: [], entries: [] }, sites: { tanks: rec }, hasFile: () => true })).toEqual(['tanks: on cocode.dk but not in data/catalogue.json']);
});
test('should accept a hidden site without words', () => {});
test('should flag a shown entry without a Danish line', () => {});
test('should flag a site that shares no picture', () => {});
test('should flag a missing picture file', () => {});
test('should flag an entry whose site is gone', () => {});
test('should not flag a stale site', () => {});
```

- [ ] **Step 2:** `npx jest tests/sites-render tests/sites-check` gives FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Both PASS.
- [ ] **Step 5:** Commit `feat: render the catalogue as cards from its data`.

### Task 5: The run: `npm run sites` and the report

**Files:**
- Create: `scripts/sites/report.js`, `scripts/sites/run.js`
- Modify: `package.json` scripts: `"sites": "node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON scripts/sites/run.js"`, `"sites:render": "<same> --offline"`
- Test: `tests/sites-report.test.js`

**Interfaces:**
- Consumes: everything above; `fontCss`, `FACES` from `scripts/readme/fonts.js`.
- Produces: `report({ before, after, problems, notes }) -> string` (Markdown). `before`/`after` are `Record<id, SiteRecord>`; `notes` is a string list from the run (pictures changed, kept last known). Sections appear only when non-empty: **New sites**, **Gone**, **Changed titles** (comparing `versions.en`, else the root version), **Pictures**, **Could not reach (kept last known)**, **Needs words or fixes**. With nothing to say it returns `Nothing changed.`

- [ ] **Step 1: Write failing tests**

```js
const rec = { url: 'https://tanks.cocode.dk/', repo: 'tanks', status: 200, image: null, versions: {} };
test('should list a new site', () => {
  expect(report({ before: {}, after: { tanks: rec }, problems: [], notes: [] })).toMatch(/## New sites[\s\S]*tanks/);
});
test('should list a gone site', () => {
  expect(report({ before: { tanks: rec }, after: {}, problems: [], notes: [] })).toMatch(/## Gone[\s\S]*tanks/);
});
test('should list problems under Needs words or fixes', () => {
  expect(report({ before: {}, after: {}, problems: ['x: needs a name, a Danish line and a group'], notes: [] }))
    .toMatch(/## Needs words or fixes[\s\S]*x: needs a name/);
});
test('should say Nothing changed when nothing did', () => {
  expect(report({ before: { tanks: rec }, after: { tanks: rec }, problems: [], notes: [] })).toBe('Nothing changed.');
});
```
- [ ] **Step 2:** FAIL; **Step 3:** implement `report.js`; **Step 4:** PASS.
- [ ] **Step 5: Implement `run.js`** (IO, not unit-tested):
  - Online steps, in order:
    1. Read the previous `data/sites.json` (or `{}`).
    2. Run `discoverSites` with `process.env.GITHUB_TOKEN`.
    3. Add the extra sites: catalogue entries with a `url` not on `.cocode.dk`, not `house`, not hidden, with `repo: null`.
    4. Gather 8 at a time, each request limited by `AbortSignal.timeout(20000)`, and pass every result through `settle`.
    5. Download each `image` and `shrink` it. Write `picturePath` only when the bytes differ. On failure, keep the old file and add a note.
  - Both modes:
    1. Write each house picture (`fontCss([FACES.serif], name)`).
    2. Delete files in `images/works/` that no entry or site refers to.
    3. Write `data/sites.json` (keys sorted, 2-space JSON, trailing newline).
    4. Write the partial from `renderCatalogue` with `kept = keptBlocks(current partial)`.
    5. Print `findProblems`.
    6. Write `report` to the `--report <file>` path when given.
  - Always exit 0. The Jest test (Task 6) is the gate.
- [ ] **Step 6: Live smoke run:** `npm run sites`. Expected: `data/sites.json` lists about 58 cocode.dk sites plus the extras, and `images/works/` holds about 55 `.webp` files, roughly 2 MB in total (`du -sh images/works`). Problems are printed for sites that have no entry yet (expected until Task 6). A second `npm run sites` leaves `git status` unchanged apart from real site changes.
- [ ] **Step 7:** Commit `feat: npm run sites gathers the sites and proposes the catalogue` (code, `data/sites.json`, `images/works/`).

### Task 6: The catalogue data, the words, and the gate

**Files:**
- Create: `data/catalogue.json`, `tests/catalogue-data.test.js`
- Modify: `templates/partials/catalogue.html` (generated), `templates/partials/dock.html:17` (group links), `readme/copy.en.json`, `tests/page-facts.test.js` / `tests/readme-model.test.js` only where they pin names that moved, `CLAUDE.md`

**Interfaces:**
- Consumes: `renderCatalogue`, `keptBlocks`, `findProblems`, `picturePath`, `DATA`.

- [ ] **Step 1: Write the failing gate test** `tests/catalogue-data.test.js`:

```js
test('should have words and a picture for every site', () => {
  expect(findProblems({ catalogue, sites, hasFile: (p) => fs.existsSync(path.join(root, p)) })).toEqual([]);
});
test('should keep the catalogue partial in step with its data', () => {
  const current = read(DATA.partial);
  expect(renderCatalogue({ catalogue, sites, kept: keptBlocks(current) })).toBe(current);
});
test('should link every catalogue group from the menu sheet, and nothing else', () => {
  // ids of .index__group headings == hrefs in dock.html .toc__groups (both as sets)
});
```

- [ ] **Step 2:** `npx jest tests/catalogue-data` gives FAIL.
- [ ] **Step 3: Seed `data/catalogue.json`** from today's partial: every entry with its name, Danish line, URL and `get` id, in today's order. Use these groups, in this order:

| id | title | ink | members |
|---|---|---|---|
| apps | Apps til Android | lapis | today's g-apps entries |
| tv | Til tv'et i stuen | ink | today's g-tv entries |
| spil | Spil i browseren | saffron | 7kasif, Dune, TIE Fighter, Tetris, Zombie Panic in Wonderland, Sten, saks, papir, + barrage, invaders, persia, glasswing |
| sprog | Lær et sprog | lapis | Dansk-Persisk, Dansk-Japansk, Hej, Prøveklar, + transliterate |
| ai | AI-værktøjer | ink | today's g-ai entries + advisor, job-jagger, linkedin-editor |
| tools | Små værktøjer | saffron | today's g-tools entries + Reverse Prime Plot, portguard, xlook, x-cleaner, in-optimizer, cv |
| kunder | Kundeprojekter | ink | today's g-kunder entries |

  An entry's `id` is its cocode.dk subdomain label where it has one (`android.guard`, `chess`); otherwise a short slug. Entries with no site of their own get `"picture": "house"`: Klinik for Manuel Terapi, Unity Foundation, MCP-servere, AI Video Edit, tmux-zipper, Overlay Killer, img2vid, YouTube Audio Extractor. Persian Transliterator merges into `transliterate` only if both describe the same tool; otherwise it stays as a house entry. Hidden entries: `linkedin-extension` ("Babak hid it"), `brand` ("the shared frame, not a product"), `d7` ("mentioned on the 7kasif card"), and `weather`, `measure`, `swanready`, `parvaz`, `claude-email` ("featured").
- [ ] **Step 4: Words for the new sites.** For each shown entry without a line, write the Danish name and line with the `humanizer-da` skill, in the voice of today's lines (short and non-technical, e.g. "Rigtige skakopgaver, også når du er uden net."). Add the English line to `readme/copy.en.json` under the same name. The 7kasif line mentions its tournament tracker.
- [ ] **Step 5:** Update the group links in `dock.html` to the seven groups (short labels, in group order).
- [ ] **Step 6:** `npm run sites:render`, then `npm test` gives PASS, including the gate and the README model tests.
- [ ] **Step 7:** `cd ~/0-projects/cocode-apps && python3 -m tools.render --catalogue --dry-run` reports no changes to `catalogue.html`.
- [ ] **Step 8:** In `CLAUDE.md`: in Architecture, add `scripts/sites/` and `data/`. Under Layer Rules, add: "`templates/partials/catalogue.html` is generated: change `data/catalogue.json` and run `npm run sites:render`, never the partial". Under Build Commands, add `npm run sites`.
- [ ] **Step 9:** Commit `feat: the whole catalogue from the sites, grouped, with Danish and English lines`.

### Task 7: Poster cards on the page

**Files:**
- Modify: `css/page.css:69-79` (index block), `css/wide.css:12-13,55-61`

- [ ] **Step 1:** Restyle `.index__list` as a grid of posters, as in option A of `design/mockups/catalogue-cards.html`:
  - On mobile: one column, or two once there is room for 250 px cards.
  - On wide screens: the group heading in the left 3 of 12 columns (as today), the cards in a grid in the other 9.
  - Each card: picture, `index__name` (serif), `index__desc` (ink-2), `index__link` (lapis), `index__get` below.
  - The whole card opens the site through a stretched `.index__link::after`. `.index__get` sits above it and stays clickable on its own. Focus outlines stay visible.
- [ ] **Step 2:** `npm run build && npx serve dist` (or `npm run dev`). Screenshot at 390 px and 1280 px wide with Playwright. Check that every picture loads, nothing scrolls sideways, and the download links work.
- [ ] **Step 3:** `npm run lint:length && npm test` gives PASS.
- [ ] **Step 4:** Commit `feat: catalogue entries as poster cards`.

### Task 8: Weekly proposal

**Files:**
- Create: `.github/workflows/sites.yml`

- [ ] **Step 1:** Workflow:
  - Triggers: `schedule: cron '17 5 * * 1'` and `workflow_dispatch`, with `permissions: contents: write, pull-requests: write` and `concurrency: sites`.
  - Steps:
    1. Checkout, pinned to the same SHA as `readme.yml`.
    2. `setup-node`, same version as `readme.yml`.
    3. `npm ci --ignore-scripts`.
    4. `npm run sites -- --report "$RUNNER_TEMP/report.md"`, with `GITHUB_TOKEN: ${{ github.token }}`.
    5. If `git status --porcelain` is empty, stop.
    6. Otherwise: `git switch -C bot/sites`, commit `chore: update the catalogue from the sites`, `git push --force origin bot/sites`. This is a bot branch, never main.
    7. `gh pr edit bot/sites --body-file …` if a PR is open, else `gh pr create --base main --head bot/sites --title 'chore: update the catalogue from the sites' --body-file …`.
- [ ] **Step 2:** Actions may not open PRs here today (`can_approve_pull_request_reviews: false`). **Ask Babak**, then `gh api -X PUT repos/cocodedk/cocodedk/actions/permissions/workflow -f default_workflow_permissions=read -F can_approve_pull_request_reviews=true`.
- [ ] **Step 3:** After merge, run it by hand (`gh workflow run sites.yml`). Expected: either no changes, or a PR whose body is the report. Runs on the bot's PR wait for approval ("action required"), as the README bot's do.
- [ ] **Step 4:** Commit `ci: weekly proposal of the catalogue from the sites`.
