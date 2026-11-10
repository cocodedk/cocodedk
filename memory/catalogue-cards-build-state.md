---
name: catalogue-cards-build-state
description: Catalogue-cards build is merged and live (PR #97 and #99); the small leftovers nobody has fixed yet
metadata:
  type: state
  updated: 2026-11-11
---
The catalogue as poster cards from the public *.cocode.dk sites is merged and live: Tasks 1–6 in PR #97
(2026-11-09), Tasks 7–8, the drawn house pictures and the LP Terapi card in PR #99 (2026-11-11). What still
waits for the owner is in [[catalogue-cards-owner-calls]].

The weekly `sites.yml` has never run. After the repo setting is allowed, run it once by hand
(`gh workflow run sites.yml`).

**Small leftovers, deferred during the build:**
- `discoverSites` rejects the whole run on one failed HEAD and never retries; a failed alternate language
  silently drops that version.
- WebP bytes may differ between machines or sharp versions, so the weekly run may rewrite every picture.
- `.index{grid-template-columns}` in `css/wide.css` does nothing; the group heading sits 14px below the picture
  tops on desktop.
- Motifs `gear` and `browser` are drawn and unused.
- The `talk` drawing (LP Terapi) is close to a stock "user" icon; its Danish line has not been through `humanizer-da`.
- jsdom prints CSS parse errors in the tests; a silent VirtualConsole would quiet them.

Links: [[catalogue-cards-owner-calls]], [[MEMORY]].
