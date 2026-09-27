# Atelier README Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The GitHub profile README (github.com/cocodedk) becomes an English, illustrated version of cocode.dk that rebuilds itself from the page.

**Architecture:** `npm run readme` reads `templates/partials/` into a jsdom document and uses the page's own readers (`js/page-facts.js`) for what's on the page and in which order. It takes the English text from `readme/copy.en.json` and writes `README.md` plus SVG images to `readme/img/`. Display type goes into SVGs with fonts subset and embedded. Body text stays native Markdown. A PR workflow reruns the script and commits the result to the PR branch.

**Tech Stack:** Node 22 (ESM in `.js`, detected), jsdom 26 (already installed via Jest, now direct), subset-font, Jest.

**Spec:** the design agreed in chat on 2026-09-27: option B, level 2 (bot commit on the PR branch), English from the start.

## Global Constraints

- GitHub strips CSS/JS from READMEs: all styling lives inside SVG files. Links only work on `<a>` around `<img>`.
- SVGs load no external resources: fonts embedded as subset woff2 data URIs, plates copied from `sprite.html`.
- Palette from `css/base.css`: paper `#ECE2CF`, sheet `#F6EFE0`, ink `#1D2130`, ink-2 `#4A4639`, rule `#C8BCA4`, lapis `#233E8B`, saffron `#D8982C`.
- Fonts: Ibarra Real Nova (display), Ysabeau Office (text), Ysabeau SC (labels) from `fonts/`.
- Images get a fixed display width, so on narrow screens they wrap instead of shrinking. Hero 100%, headings 520, work cards 400, contact card 400. viewBoxes are 2× those widths.
- One version of every image works in both GitHub themes. Paper objects (hero, cards, contact) read as prints. Headings are transparent, set in ochre `#A8741A` (≥3:1 on white and on `#0d1117`, which is enough for large text).
- Services, catalogue and about are native Markdown, so GitHub's theme and screen readers handle them.
- Motion: hero plates rise in once, and there's none under `prefers-reduced-motion`.
- The catalogue stays hand-picked: the README lists exactly what the page lists, nothing discovered.
- Code files ≤ 200 lines. Generated SVGs and README are output, not code.
- English copy goes through the `humanizer` skill before it ships.

## Review Focus

1. A catalogue entry without a URL (MCP-servere, Klinik for Manuel Terapi) → plain text, no dead link. (Task 4 test)
2. A featured work without a site (claude-email) → card links to a demo mail, not `null`. (Task 2 test)
3. A new page entry with no English copy → the build fails and names the entry, so the bot job goes red instead of shipping Danish. (Task 2 test)
4. `&`, `<` or quotes in any text → escaped in SVG and HTML. (Task 3 test)
5. A description too long for its card → the build fails and names the work instead of overflowing. (Task 3 test)

---

### Task 1: page-facts reads any document

**Files:** Modify `js/page-facts.js`; Test `tests/page-facts.test.js` (add a case).

**Interfaces:** Produces `readWorks(doc = document)`, `readServices(doc = document)`, `readContact(doc = document)`. The browser behaviour stays the same.

- [ ] Failing test: build a `document.implementation.createHTMLDocument()` holding one `.scene` and pass it in. Expect `readWorks(doc)` to return that work while the global document is empty.
- [ ] Thread `doc` through `all(selector, doc)` and replace `document.querySelector` in `readContact`.
- [ ] `npm test` green; commit `refactor: let the page readers take any document`.

### Task 2: English model

**Files:** Create `readme/copy.en.json`, `scripts/readme/model.js`; Test `tests/readme-model.test.js`.

**Interfaces:** `buildModel(doc, copy) → { intro, headings, works:[{no,name,kind,line,url,plate}], groups:[{name,items:[{name,line,url}]}], services:[{name,line}], about, contact:{email,phone,linkedin,heading,lead} }`

- Works and catalogue come from `readWorks(doc)`, and each plate from the scene's `use[href]`. Services come from `readServices(doc)` and contact details from `readContact(doc)`.
- English is looked up by the Danish name (`copy.works[name]`, `copy.groups[heading]`, `copy.kinds[kind]`, `copy.services[name]`). A missing entry throws `No English copy for <what> "<name>" in readme/copy.en.json`.
- A work with no URL links to `mailto:<email>?subject=<name>`.

- [ ] Failing tests: pinned against the real partials. Every page work appears once, in page order. A missing entry throws with the name. claude-email gets the mailto link.
- [ ] Implement; tests green; commit `feat: an English model of the page for the README`.

### Task 3: SVG primitives

**Files:** Create `scripts/readme/svg.js`; Test `tests/readme-svg.test.js`.

**Interfaces:** `esc(s)`, `wrap(text, maxChars, maxLines, label)` (throws `"<label>" needs more than N lines`), `svg({w,h,css,defs,body,title})`, `async fontCss(families, text)`, `PALETTE`, `plates(spriteHtml)` returning the sprite's inner `<defs>`/`<symbol>` markup.

- [ ] Failing tests: esc handles `& < > "`. wrap breaks on spaces within the budget and throws past maxLines naming the label.
- [ ] Implement; green; commit with Task 4.

### Task 4: Renderers and README

**Files:** Create `scripts/readme/hero.js` (hero), `scripts/readme/cards.js` (work card, contact card, heading), `scripts/readme/markdown.js`; Test `tests/readme-render.test.js`.

**Interfaces:** each renderer is `(data, fontCss, platesMarkup?) → string`, pure. `renderReadme(model) → string` using image paths `readme/img/<name>.svg`.

- [ ] Failing tests: the README links every work with a URL, prints URL-less entries as plain text, and gives every image alt text that carries its words. The card holds its title escaped.
- [ ] Implement; layout values are tuned visually in Task 5; commit `feat: draw the README's plates, cards and headings`.

### Task 5: Build command, first output, visual check

**Files:** Create `scripts/readme/build.js`; Modify `package.json` (`"readme": "node scripts/readme/build.js"`); Generate `README.md`, `readme/img/*`.

- `build.js` loads the partials into jsdom, then runs buildModel and every renderer with subset fonts. It empties `readme/img/` and writes it fresh, so a work that was dropped loses its image. It writes README.md last.
- [ ] Run it twice; `git status` shows no change the second time (deterministic).
- [ ] Render README via `gh api markdown` into a local page, then screenshot it light and dark at desktop and 390px wide. Tune the layout until it's right.
- [ ] Humanizer pass on `copy.en.json`; commit `feat: generate the profile README from the page`.

### Task 6: Bot keeps it current

**Files:** Create `.github/workflows/readme.yml`; Modify `CLAUDE.md` (architecture + build command lines).

- On `pull_request` to main (same-repo head only): checkout head ref, Node 22, `npm ci`, `npm run readme`. If `README.md` or `readme/` changed, commit `chore: regenerate the README from the page` as github-actions[bot] and push.
- [ ] Commit `ci: regenerate the README on every PR`; push; open a PR and confirm the job runs green with nothing to commit.
