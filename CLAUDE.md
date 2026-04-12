# CLAUDE.md — cocodedk

## Project Overview

GitHub profile repository and personal portfolio SPA for Babak Bandpey. Vanilla JS single-page application built with Webpack 5, featuring warm glassmorphism design, bilingual support (English/Danish), and live API integrations with GitHub, YouTube, and LinkedIn.

- **Language / Runtime**: JavaScript / Node.js 20, TypeScript (new code in `src/ts/`)
- **Framework**: Vanilla JS SPA (no framework), Webpack 5
- **Architecture**: Component-based, hash navigation for i18n
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
├── js/                  ← Component logic (Vanilla JS), exposes via window.*
│   ├── components/      ← Self-contained UI components
│   ├── api/             ← GitHub, YouTube, LinkedIn integrations (5-min cache)
│   └── data/            ← i18n strings (section-translations.js)
├── css/                 ← Component stylesheets + color tokens (colors.css)
├── src/ts/              ← New TypeScript code
├── templates/           ← template.html (single page, Webpack-injected)
├── tests/               ← Jest (jsdom) tests
├── scripts/             ← check-file-length.sh, deploy-onecom.sh
├── dist/                ← Production build output (gitignored)
└── webpack.config.js    ← Multiple entry points per component
```

### Layer Rules
- Components in `js/components/` must be self-contained and attach to `window.*`
- API calls go in `js/api/` with 5-minute localStorage caching
- New code in TypeScript (`src/ts/`), not plain JS

---

## Coding Conventions

- [ ] All models are **immutable** — use spread for mutations
- [ ] Functions are **pure** where possible — no hidden side effects
- [ ] No hardcoded strings — use `js/data/section-translations.js` for i18n
- [ ] **Max 200 lines per file** — enforced by pre-commit hook and CI
- [ ] **New code in TypeScript** (`src/ts/`)
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
