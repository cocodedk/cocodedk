# CLAUDE.md — cocodedk

## Project Overview

GitHub profile repository and the cocode.dk homepage for Babak Bandpey, AI consultant. One static Danish page built with Webpack 5: warm paper, serif type, illustrated plates, and featured works that slide over each other. The audience is potential clients, not developers, so nothing on the page should look technical. The design brief is `design/mockups/BRIEF.md`., and live API integrations with GitHub, YouTube, and LinkedIn.

- **Language / Runtime**: JavaScript (ES modules) / Node.js 20
- **Framework**: none. Static HTML and CSS, three small scripts, Webpack 5
- **Language of the page**: Danish. English is phase two; until it exists there is no language switch
- **Package / Namespace**: `cocodedk`

---

## Required Skills — ALWAYS Invoke These

These skills **must** be invoked when the relevant situation arises. Never skip them.

| Situation | Skill |
|-----------|-------|
| Before any new feature or screen | `superpowers:brainstorming` |
| Planning multi-step changes | `superpowers:writing-plans` |
| Writing or fixing core logic | `superpowers:test-driven-development` |
| First sign of a bug or failure | `superpowers:systematic-debugging` |
| Before completing a feature branch | `superpowers:requesting-code-review` |
| Before claiming any task done | `superpowers:verification-before-completion` |
| Working on UI / frontend | `frontend-design:frontend-design` |
| After implementing — reviewing quality | `simplify` |

---

## Architecture

```
cocodedk/
├── templates/
│   ├── template.html    ← the head and the order of the page
│   ├── partials/        ← the page in pieces, placed with <%= partials.name %>
│   └── og-card.html     ← source of the share picture (OG_CARD=1 npm run build)
├── css/                 ← fonts, base, dock, page, wide, slide — linked in that order; the order is the cascade
├── js/                  ← menu.js, place-marker.js, scenes.js, webmcp.js (+ page-facts.js), wired up in main.js
├── fonts/               ← self-hosted woff2 (no font CDN: visitors' addresses stay here)
├── images/              ← favicons and the share picture
├── tests/               ← Jest (jsdom)
├── design/mockups/      ← the brief and the single-file mockups (atelier-slide.html is the approved one); not built, not deployed,
│                          exempt from the 200-line check
├── dist/                ← build output (gitignored)
└── webpack.config.js    ← one entry; reads templates/partials/ into the template
```

### Layer Rules
- The mobile menu never repeats itself: the bottom bar owns the four section jumps, the "Indhold" sheet holds only what the bar cannot (the works, the catalogue groups, the mail button)
- `js/scenes.js` and the media query in `css/slide.css` must name the same conditions; change one, change the other
- The plates live once, in `templates/partials/sprite.html`; everything else points at them with `<use>`
- No third-party requests from the page: fonts, scripts and styles are all served from cocode.dk
- WebMCP (`js/webmcp.js`) offers six tools to an AI agent in the visitor's browser: `list_works`, `get_services`,
  `get_about`, `get_contact`, `go_to_section`, `draft_inquiry`. They answer from the page itself through `js/page-facts.js`, so the
  copy lives once. The API is a draft and has already moved (`navigator` → `document.modelContext`, the old alias is gone since Chrome 153); check
  https://webmachinelearning.github.io/webmcp/ before changing it. To try it:
  `google-chrome-stable --enable-features=WebMCP` (or `~/.claude-shared/skills/webmcp/scripts/probe.py https://cocode.dk/`),
  then `await document.modelContext.getTools()` in the console. Real visitors get it through the origin-trial token in
  `templates/template.html` (registered 2026-09-20 for https://cocode.dk, expires 2026-11-17: renew it at
  developer.chrome.com/origintrials or remove the tag then), or without it once Chrome ships WebMCP by default

---

## Coding Conventions

- [ ] All models are **immutable** — use spread for mutations
- [ ] Functions are **pure** where possible — no hidden side effects
- [ ] Danish copy goes through the `humanizer-da` skill before it ships
- [ ] **Max 200 lines per file** — enforced by pre-commit hook and CI
- [ ] **One feature per commit**

---

## Engineering Principles

### File Size
- **200-line maximum per file** — extract a class, function, or module when approaching the limit

### DRY · SOLID · KISS · YAGNI
- Extract shared logic into named utilities; never copy-paste
- Single Responsibility: one class/function does one thing
- Don't add features not yet needed
- Delete dead code immediately

### TDD
- Write the failing test first, make it pass, then refactor
- Test names describe behaviour: `"should render hero section"`
- One assertion per test — keep tests focused and readable

### Commit hygiene
- Follow Conventional Commits: `feat: ...` / `fix: ...` / `chore: ...`
- The `commit-msg` hook enforces this automatically

---

## Build Commands

```bash
npm run dev           # Dev server localhost:8080
npm run build         # Production build → /dist
npm test              # Jest (jsdom)
npm run lint:length   # Check 200-line file limit
npm ci && npm run build && npm test  # Full smoke check — used in CI and pre-commit
```

---

## Key Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | This file — project conventions and session startup |
| `version.txt` | Semantic version (MAJOR.MINOR.PATCH) |
| `.github/workflows/ci.yml` | CI on PRs and non-main branches |
| `.github/workflows/deploy-pages.yml` | GitHub Pages deployment on push to main |
| `.githooks/pre-commit` | File length check on staged files |
| `.githooks/commit-msg` | Conventional Commits enforcement |
| `scripts/install-hooks.sh` | One-time hook installer |
| `scripts/check-file-length.sh` | 200-line limit checker |

---

## Starting a New Session

1. Read this file
2. Run `npm ci && npm run build && npm test` to confirm everything passes
3. Invoke `superpowers:brainstorming` before touching any feature
4. Follow the Required Skills table — every skill is mandatory, not optional
