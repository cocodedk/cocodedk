# Comparison + Prioritized Recommendations

**Audit date:** 2026-05-04
**Target:** cocode.dk (Babak Bandpey)
**Pool:** NNIT, Ansvar Systems, AI Wave, Leave a Mark Group

## 1. SEO checklist (one column per site)

| Factor | cocode.dk | NNIT | Ansvar | AI Wave | Leave a Mark |
|--------|:---------:|:----:|:------:|:-------:|:------------:|
| Keyword-targeted `<title>` | ✓ | △ brand-led | ✓ via README | ✓ | ✓ DA-first |
| Meta description w/ regulation keywords | ✓ | ✗ | ✓ | ✗ | ✓ |
| Strong JSON-LD schema | ✓✓ rich | ✓ Org | n/a (GitHub) | △ basic | ✓ |
| Hreflang DA + EN | ✓ (fragment) | ✓ proper URLs | n/a | ✗ EN only | ✓ proper URLs |
| Per-service URLs | ✗ single page | ✓ per vertical | ✓ per regulation | △ few | ✓ per regulation |
| Indexed page count | ~1 | 1000s | 4 registries + repo | ~10–20 | dozens |
| External backlinks (registries / press) | △ via GitHub feed | ✓ press releases | ✓ MCP registries × 4 + dev.to | ✗ | △ DK GRC press |

## 2. Trust signals

| Signal | cocode.dk | NNIT | Ansvar | AI Wave | Leave a Mark |
|--------|:---------:|:----:|:------:|:-------:|:------------:|
| Named clients / logos | ✗ | ✓ blue-chip | n/a | ✗ | ✓✓ Energinet, Danfoss, Fujifilm, Norlys, ITU |
| Years experience stated | ✓ 25+ | ✓ 30+ | ✗ | ✗ | △ |
| Project / engagement count | ✓ 50+ | n/a | ✓ via repos | ✗ | △ via case studies |
| Named team / founder photo | ✓ Babak | ✓ leadership | △ | ✗ | △ |
| ISO certifications **visible** | ✗ JSON-LD only | △ | n/a | ✗ | ✓✓ ISO 27001 + 27701 + 42001 |
| Public sector access (SKI) | ✗ | ✓ | n/a | ✗ | ✓ 02.14 |
| Open-source artefacts | ✓ 27+ repos | ✗ | ✓✓ MCP family | ✗ | ✗ |
| Productized differentiator | △ FITS | ✓ Alera AI | ✓ EU compliance MCP | △ | △ as-a-service models |
| Phone visible on page | ✗ JSON-LD only | ✓ footer | n/a | ✗ | ✓ |
| Third-party reviews (Trustpilot/Clutch) | ✗ | ✗ | ✗ | ✗ | ✗ |

## 3. Conversion UX

| Element | cocode.dk | NNIT | Ansvar | AI Wave | Leave a Mark |
|---------|:---------:|:----:|:------:|:-------:|:------------:|
| Above-fold CTA | ✓ × 2 | ✓ | n/a (GitHub) | ✓ | ✓ |
| Phone in header | ✗ | ✓ footer | n/a | ✗ | ✓ |
| Email visible | ✗ modal | ✓ | ✓ via GitHub | ✓ | ✓ |
| Booking calendar / scheduler | ✗ | ✗ | ✗ | ✗ | △ "book samtale" |
| Languages DA/EN parity | ✓ | ✓ | ✗ EN only | ✗ EN only | ✓ |

## 4. Where cocode.dk wins, draws, and loses

| Vector | Verdict | Note |
|--------|---------|------|
| Technical SEO (schema, hreflang) | **Wins** | Richer JSON-LD than any other competitor; only NNIT and Leave a Mark are comparable |
| Personal brand / named individual | **Wins** | Babak is named, photographed, has unique signals (Top 2% Cursor AI). Beats AI Wave's anonymity |
| Polyglot stack breadth | **Wins** | 27 repos × 6+ languages. Few DK consultancies show Python + Kotlin + TypeScript + Go in one place |
| Bilingual DA/EN | **Wins or draws** | Versus DA-only Leave a Mark and EN-only AI Wave / Ansvar |
| Productized open-source play | **Loses** | Ansvar Systems has 4+ MCP servers indexed across registries — cocode.dk has the repos but they aren't published to MCP registries |
| Per-service / per-regulation pages | **Loses badly** | Single-page architecture costs cocode.dk dozens of long-tail keyword entry points |
| Named client logos | **Loses badly** | Leave a Mark's logo bar is the strongest trust artefact in the pool |
| Visible certifications | **Loses** | JSON-LD `knowsAbout` is invisible to humans; visual badges win |
| Public sector access | **Loses** | No SKI Framework — closes off DK government contract pipeline |
| Press / backlinks | **Draws low** | Both cocode.dk and small competitors are weak here; opportunity for outreach |

---

## Prioritized recommendations

Order = impact × inverse-effort. Do the top ones first.

### P1 — Productize **one** MCP server and publish to every registry

**Why:** Ansvar Systems' single most leveraged play is having an open-source MCP that ranks across mcpservers.org / lobehub / pulsemcp / mcp.aibase. Babak already has the raw materials (`codescan`, `mem0-mcp`, `calendar-consolidator-mcp`) — what's missing is the *publishing playbook*. A DK-specific equivalent (e.g. `cocode-dk/dk-grc-mcp` covering NIS2 transposition + D-mærket + Datatilsynet rulings + ISO 42001 control mappings) is a niche too small for Ansvar to chase but lands cocode.dk on every registry overnight.
**How:**
1. Pick one existing repo or build a focused new one (`dk-grc-mcp` recommended)
2. Polish the README using Ansvar's playbook — *lead with the problem* (`DK regulators publish guidance as PDFs scattered across Datatilsynet, Erhvervsstyrelsen, Digitaliseringsstyrelsen…`)
3. Bake example queries into the README that match real search intent
4. Publish to npm with the `cocode-dk/` org prefix, list on mcpservers.org / lobehub / pulsemcp / mcp.aibase / smithery.ai (~30 minutes per registry)
5. Add a `/mcp-servers/` section to cocode.dk linking to it
**Effort:** Medium (1–2 weeks if reusing existing code)
**Impact:** Highest — instantly unlocks the same SEO surface Ansvar has + creates a sales lead-gen funnel

### P2 — Add a named-client logo bar to the homepage

**Why:** Leave a Mark's logo bar (Energinet, Danfoss, Norlys…) is the single strongest trust artefact in the pool. cocode.dk has zero visible client logos, which costs more credibility than any other gap.
**How:** Reach out to past clients (or to FITS deployments) for permission to display their logos. Even **3–5 logos** changes the perception from "freelancer" to "consultancy with a client base." If client confidentiality blocks logos, name the *industries* and *project outcomes* instead ("delivered MCP integration for a Copenhagen-based fintech, 2025").
**Effort:** Medium (asking, designing, deploying — but technically simple in the existing component system)
**Impact:** Very high

### P3 — Split the homepage into per-service / per-regulation pages

**Why:** Single-page architecture caps SEO at ~1 indexable URL. Competitors with dedicated `/nis2-radgivning/`, `/dora-compliance/`, `/ai-act-implementation/` pages capture each long-tail query. NNIT does this per vertical; Leave a Mark per regulation. Both rank.
**How:** Create 5–7 DA-first pages with EN equivalents:
  - `/ydelser/ai-compliance/` (+ EN)
  - `/ydelser/mcp-server-udvikling/` (+ EN)
  - `/ydelser/llm-integration/` (+ EN)
  - `/ydelser/eu-ai-act-radgivning/` (+ EN)
  - `/ydelser/nis2-implementering/` (+ EN)
  - `/ydelser/dora-compliance/` (+ EN)
  - `/ydelser/iso-42001-ai-styring/` (+ EN)
  Each page: 600–1200 words, FAQs, internal link to contact CTA. Use proper `hreflang` URL pairs (not `#en` fragments).
**Effort:** Medium-high (content writing is the bottleneck)
**Impact:** High — multiplies SEO entry points 7×

### P4 — Make claimed trust signals visible on the page

**Why:** JSON-LD `knowsAbout` is invisible to human visitors; only crawlers see it. Leave a Mark wins because their certifications are *visual badges*. cocode.dk needs the same surface.
**How:** Add to the existing component system:
  - A "Compliance & Standards" badge row: ISO 27001 (trained), ISO 42001 (familiar), GDPR DPO-grade, NIS2, DORA, EU AI Act, FITS author
  - Phone (`+45 53 73 75 14`) visible in the header (currently only in JSON-LD)
  - Address line in footer (currently only in JSON-LD)
  - **Be honest about claim level** — "trained in" / "familiar with" / "implemented for X clients" — buyers respect specificity, not inflated badges
**Effort:** Low (CSS/HTML in existing component system)
**Impact:** High

### P5 — Expand the skills section to match the real stack

**Why:** Current skills-data.js misses ~10 technologies that show up in cocode.dk's own GitHub repos and project history (Go, Playwright, Webpack, Jest, Babel, Qdrant, IMAP/SMTP automation, MCP server *development* (vs. MCP integration), DORA, EU AI Act, ISO 42001). Each is a keyword-entry point and a credibility signal.
**How:** See `recommended-stack.md` — drop-in replacement for `js/data/skills-data.js`.
**Effort:** Low (15 minutes)
**Impact:** Medium

### P6 — List on DK B2B IT directories

**Why:** Clutch.co / Sortlist / TechBehemoths / ensun all generate backlinks + directory traffic + a "where do I look up Danish AI consultancies" buyer surface. Free or cheap profiles. Most of cocode.dk's competitors are listed; cocode.dk is not.
**How:** Create profiles on:
  - `clutch.co/dk` — paid tier optional, free profile fine
  - `sortlist.com/s/artificial-intelligence/denmark-dk`
  - `techbehemoths.com/companies/artificial-intelligence/denmark`
  - `ensun.io` (DK + AI tags)
  - Trustpilot business profile (free) — for future review collection
**Effort:** Low (~30 min per profile)
**Impact:** Medium — backlinks + secondary buyer paths

### P7 — Add a content/blog surface

**Why:** Compounds over time. Compliance topics ("How EU AI Act applies to chatbots in Danish SMEs," "MCP servers for GDPR audits," "Choosing between LangChain and Anthropic SDK for compliance use cases") are evergreen and rank for long tails. Leave a Mark has "Nyheder"; NNIT has press releases. cocode.dk has neither.
**How:** Start with 3 articles. Mirror them to LinkedIn (DA + EN). Schema: `Article` JSON-LD on each.
**Effort:** High (ongoing — 1–2 articles/month sustainable)
**Impact:** Medium — compounds; doesn't pay back fast

### P8 — Pursue SKI Framework eligibility (only if DK public sector is on the roadmap)

**Why:** Leave a Mark is on SKI 02.14 — that's how they get into ITU and Copenhagen Economics. Solo consultants *can* be on SKI for some agreements, but it requires CVR, financial reporting, references.
**How:** Investigate SKI agreement requirements at `ski.dk`. Honest assessment: this is a 3–6 month project and only worth it if government work is desired.
**Effort:** High
**Impact:** Transformative for public-sector reach; zero for everything else

---

## What NOT to chase

- **Beating NNIT on enterprise scale** — it's not a winnable position from a 1-person setup. Cede that ground; intercept the long-tail keywords NNIT doesn't pursue.
- **Pure AI agency framing** — AI Wave already does this with weaker trust signals than cocode.dk has. Babak's GRC + AI bridge is a better moat than competing on "Danish AI agency."
- **Generic LinkedIn/Trustpilot review farming** — none of the competitors do this in the DK B2B AI space. Real client quotes embedded in case studies will outperform aggregate review counts.
