---
name: catalogue-cards-owner-calls
description: Three decisions on the catalogue cards that still wait for the owner (one of four is settled)
metadata:
  type: task
  updated: 2026-11-11
---
The owner asked on the morning of 2026-11-10 to be reminded of these **later that afternoon**. They concern
the catalogue work merged in PR #99 on 2026-11-11 (see [[catalogue-cards-build-state]]). Items 1, 3, 4 and 5 are still
open. On 2026-11-11 the owner asked to have the questions kept ("maybe I answer them"): raise them again, without pressing.

1. **Repo setting.** Actions still may not open PRs. Until the owner allows it, a weekly run with changes pushes
   `bot/sites` and then fails at `gh pr create`.
2. **House-made pictures.** A worker redrew the 11 of them as coloured plates with the name's initial, because the
   old ones were paper-coloured on paper and read as missing images. This was not in the plan.
   *Settled 2026-11-10:* the owner asked for Opus models to improve them. Of three prototypes the illustrated
   plate was built (commit 4400401): each picture is a small drawing of the work, chosen by the optional
   `motif` field in `data/catalogue.json`. The owner approved the illustrated plate
   ("go with C") the same day.
3. **LifeMeter's picture.** Its share picture has a white band along the bottom. A worker made the shrink step
   (`scripts/sites/pictures.js`) paint over such bands; the cleaner fix is LifeMeter's own `og.png`. The owner
   decides whether the heuristic is reverted.
4. **Phone length.** With one card per row the catalogue is about 28 screens tall on a phone. Two columns would
   halve it.
5. **roitankerne.dk.** The owner wants it as a catalogue card, but the address does not resolve (nor `www.` or
   `ro-i-tankerne.dk`). Needed: the correct address, or word that the site is not live yet, and one Danish line
   on what it is.

Delete this note once all five are settled.

Links: [[catalogue-cards-build-state]], [[MEMORY]].
