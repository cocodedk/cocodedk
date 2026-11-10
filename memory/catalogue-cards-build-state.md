---
name: catalogue-cards-build-state
description: Where the catalogue-cards build stands: all eight tasks built, what still waits for Babak
metadata:
  type: state
  updated: 2026-11-10
---
The catalogue rebuilt as poster cards from Babak's public *.cocode.dk sites
(spec `docs/superpowers/specs/2026-11-09-catalogue-cards-design.md`, plan `docs/superpowers/plans/2026-11-09-catalogue-cards.md`).

- Tasks 1–6 were merged on 2026-11-09 (PR #97). The pictures then showed out of proportion on the live page,
  because `.index__pic` had no CSS rule yet.
- Tasks 7 (poster CSS) and 8 (weekly `sites.yml`) and the final review's fix wave are on branch `feat/poster-cards`
  (2026-11-10), reviewed, 228 tests. A github.io 5xx/429 now stops the gathering run instead of dropping the site.

**Waits for Babak:**
- The repo setting that lets Actions open PRs (plan Task 8 Step 2). Without it the weekly run pushes `bot/sites`
  and then fails at `gh pr create`.
- Two changes a worker made beyond the plan: house-made pictures are coloured plates with the name's initial,
  and `shrink()` paints over a plain bottom band in a share picture (LifeMeter's). The cleaner fix for the second is
  LifeMeter's own og.png.

`.superpowers/sdd/2026-11-09-catalogue-cards/` (git-ignored ledger with every ruling and deferred minor) is deleted
once the branch is merged.

Links: [[MEMORY]].
