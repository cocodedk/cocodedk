---
name: catalogue-cards-build-state
description: Where the catalogue-cards build stands, and why the staged Task 6 work and the .superpowers/sdd/ ledger must not be deleted
metadata:
  type: state
  updated: 2026-11-09
---
Branch `feat/catalogue-cards`: the catalogue rebuilt as poster cards from Babak's public *.cocode.dk sites
(spec `docs/superpowers/specs/2026-11-09-catalogue-cards-design.md`, plan `docs/superpowers/plans/2026-11-09-catalogue-cards.md`).
Tasks 1–5 are committed and reviewed. Task 1's share-picture PRs (7kasif#73, codescan#86, job-jagger#5) were merged on 2026-11-09.

**Kept on purpose, do not delete:**
- **The staged, uncommitted Task 6 work** is the new catalogue itself: `data/catalogue.json` with the groups,
  names and Danish lines, the 13 house-made pictures in `images/works/`, audio-soccer, the
  "Til blinde og svagtseende" group, and the regenerated README. It could not be committed while the
  three share pictures were missing, because `.githooks/pre-commit` runs `npm test` and the picture gate failed.
  Deleting it means writing all of that again.
- **`.superpowers/sdd/2026-11-09-catalogue-cards/`** holds the progress ledger, the rulings and the task briefs and
  reports. It records which tasks are done, the decisions taken, and the review findings still to fix (among them:
  a GitHub 5xx/429 during discovery can make a site look gone and delete its picture). It is git-ignored, and is
  deleted after the final review.

**Task 6 committed** (3ef5b68, 2026-11-09) after the three og.png files answered 200; 211 tests pass. The staged-work
warning above no longer applies.

**Next:** review Task 6. Then Task 7 (poster CSS), Task 8 (weekly Action; the repo setting that lets Actions open PRs needs
Babak's OK), and the final review with one fix wave. Nothing is merged until Babak has reviewed it.

Links: [[MEMORY]].
