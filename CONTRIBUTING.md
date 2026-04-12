# Contributing to cocodedk

## Local Setup

1. Install Node.js 20+ from [nodejs.org](https://nodejs.org)
2. Clone the repository: `git clone https://github.com/cocodedk/cocodedk.git`
3. Install dependencies: `npm ci`

## Install Git Hooks

```
./scripts/install-hooks.sh
```

## Local Git Setup

Run these once after cloning:

```bash
git config pull.rebase true
git config core.autocrlf input
git config push.autoSetupRemote true
git config init.defaultBranch main
```

## Build and Test Commands

```bash
npm run dev           # Dev server localhost:8080
npm run build         # Production build → /dist
npm test              # Jest (jsdom)
npm run lint:length   # Check 200-line file limit
```

## Coding Style

- Max 200 lines per file — enforced by pre-commit hook and CI
- New code in TypeScript (`src/ts/`)
- One feature per commit
- Components are self-contained in `js/components/`, attached to `window.*`
- No hardcoded strings — use `js/data/section-translations.js` for i18n

## Branch Naming

| Prefix | Use for |
|--------|---------|
| `feature/` | New features (`feat:` commits) |
| `fix/` | Bug fixes (`fix:` commits) |
| `chore/` | Maintenance (`chore:` commits) |
| `docs/` | Documentation (`docs:` commits) |
| `refactor/` | Code cleanup (`refactor:` commits) |
| `ci/` | CI changes (`ci:` commits) |

## PR Checklist

- [ ] Smoke check passes: `npm ci && npm run build && npm test`
- [ ] 200-line limit check passes: `npm run lint:length`
- [ ] Manual test completed for changed functionality
- [ ] Updated docs if behavior changed
- [ ] Commit messages follow Conventional Commits format
