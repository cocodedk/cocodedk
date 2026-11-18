# Sikkerhedstjek Campaign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** cocode.dk shows the one-client security check until its closing date and then hides it by itself.

**Architecture:** One new partial, hidden in the markup, carries the offer and its closing date in a `<time>` element. One small script shows it while the visitor's date is on or before that date.

**Tech Stack:** Static HTML, CSS, one ES module, Jest (jsdom). No new dependency.

**Spec:** `docs/superpowers/specs/2026-11-18-sikkerhedstjek-campaign-design.md`

## Global Constraints

- Branch `feat/sikkerhedstjek-campaign`. Conventional Commits, never `--no-verify`. No push, no PR: Babak launches.
- Sonnet builds at medium effort, Opus reviews at medium effort.
- Files under 200 lines. Copy is the spec's, word for word, through `humanizer-da`. Nothing looks technical.
- No third-party request, no menu entry, no change to README, `llms.txt`, JSON-LD or the share picture.
- Test first, one assertion per test. Before starting: `npm ci && npm run build && npm test`, note the test count N.

## Review Focus

1. CSS giving `.campaign` a `display`, which beats `hidden` → an expired offer stays visible. Task 1, step 3; the reviewer checks it.
2. A missing or mistyped date → the section stays hidden. Task 1 test.
3. The readable date drifting from the machine date when it is changed at launch. Task 1 test.

---

### Task 1: The section and its switch

**Files:**
- Create: `templates/partials/campaign.html`, `js/campaign.js`, `tests/campaign.test.js`
- Modify: `templates/template.html` (`<%= partials.campaign %>` between hero and works), `js/main.js` (call `initCampaign()`), `css/page.css`, `tests/helpers/page.js` (`'campaign'` after `'hero'` in `MAIN`)

**Interfaces:**
- `initCampaign({ now = new Date() } = {}): void` finds `#sikkerhedstjek`, reads its `time[datetime]` and sets `section.hidden = false` when that is a `YYYY-MM-DD` day and `now.toLocaleDateString('sv-SE')` (the visitor's date, same shape) is on or before it; otherwise `true`.
- Markup: `<section class="section section--ruled campaign" id="sikkerhedstjek" aria-labelledby="h-sikkerhedstjek" hidden>`, `<time datetime="2026-11-30">30. november</time>`, `<a class="btn campaign__mail">`; the rest of the markup is the builder's.

- [ ] **Step 1: Write the failing tests** in `tests/campaign.test.js`

```js
import { initCampaign } from '../js/campaign';
import { loadPage } from './helpers/page';

const at = (iso) => ({ now: new Date(iso) });

describe('the sikkerhedstjek campaign', () => {
  let section;
  beforeEach(() => { loadPage(); section = document.getElementById('sikkerhedstjek'); section.querySelector('time').dateTime = '2026-11-30'; });

  test('should be hidden until the script shows it', () => { expect(section.hidden).toBe(true); });
  test('should show on the closing date', () => { initCampaign(at('2026-11-30T12:00:00Z')); expect(section.hidden).toBe(false); });
  test('should hide the day after the closing date', () => { initCampaign(at('2026-12-01T12:00:00Z')); expect(section.hidden).toBe(true); });
  test('should stay hidden when the date is not a date', () => {
    section.querySelector('time').setAttribute('datetime', 'snart'); initCampaign(at('2026-11-20T12:00:00Z'));
    expect(section.hidden).toBe(true);
  });
  test('should write the closing date the way it is set', () => {
    loadPage();
    const time = document.querySelector('#sikkerhedstjek time');
    const readable = new Intl.DateTimeFormat('da-DK', { day: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(time.dateTime));
    expect(time.textContent.trim()).toBe(readable);
  });
  test('should start a mail with the subject filled in', () => {
    expect(decodeURIComponent(section.querySelector('.campaign__mail').getAttribute('href')))
      .toBe('mailto:bb@cocode.dk?subject=Sikkerhedstjek af min hjemmeside&body=Adressen på min hjemmeside: ');
  });
});
```

- [ ] **Step 2: Run** `npx jest tests/campaign.test.js` — expected: FAIL (no `../js/campaign`).
- [ ] **Step 3: Build it.** Load `frontend-design:frontend-design` and `humanizer-da` first. The section is a sheet (`--sheet` ground, `--rule` border, like `.mount`): heading and price in the serif, the steps as a numbered list, the reservation as `.note`, the `.btn` and the phone line. Layout goes on an inner element; `.campaign` itself gets no `display`. The mail link is percent-encoded.
- [ ] **Step 4: Run** `npm run build && npm test && npm run lint:length` — expected: N + 6 tests pass. `npx jest tests/campaign.test.js --coverage --collectCoverageFrom=js/campaign.js` — expected: 100 % lines.
- [ ] **Step 5: Look at it.** Print `dist/index.html` with headless Chrome at 390 and 1280 px wide into the scratchpad and read the pictures: the offer sits under the hero.
- [ ] **Step 6: Commit** `feat: sikkerhedstjek offer on the front page until its closing date`

### Task 2: Review

- [ ] **Step 1:** Opus reviews `git diff main...HEAD` against the spec and the Review Focus list, reads the screenshots and the Danish. Sonnet fixes what it finds; `npm ci && npm run build && npm test`, report the test count.

## Launch (Babak's)

1. Closing date = launch day + 10: change it in `campaign.html`, in the poster's `deadline` span and in the two posts in the spec; reprint the poster; `npm test`; commit the poster.
2. Merge the branch: the site deploys and shows the offer.
3. Post the launch text with the poster on LinkedIn; the reminder three days before the closing date.
