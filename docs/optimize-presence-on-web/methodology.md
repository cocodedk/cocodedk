# Methodology

How this audit was performed. Re-run any section by following the steps below.

## 1. Discover competitors (DK + EN)

Search queries used (incognito Google + WebSearch tool):

- `AI agent development consultant Denmark Copenhagen GRC compliance`
- `AI integration consultant Denmark LLM workflow automation Danish SME`
- `AI rådgivning København GDPR NIS2 compliance konsulent Danmark`
- `MCP server development EU AI Act DORA compliance consulting Denmark`

Pick the top 5–8 distinct results that appear across multiple queries and span the target keyword space. Prefer competitors that explicitly position around the same triple: development + GRC + LLM/AI.

## 2. Estimate traffic

Primary tool: SimilarWeb free tier (`similarweb.com/website/<domain>/`).

For sites below the SimilarWeb threshold (~5K visits/month), use proxy signals:

- Google SERP position for the target queries (1–3 = substantial organic)
- `site:<domain>` indexed-page count
- Backlink count (e.g. Ahrefs Webmaster Tools or Moz Link Explorer)
- Social signals (LinkedIn followers, post engagement)

## 3. Audit each competitor's site

Fetch the homepage and any service pages:

```bash
# WebFetch for static HTML / sites with SSR
# Chromium headless for SPAs returning empty shells
chromium --headless --no-sandbox --disable-gpu --virtual-time-budget=8000 --dump-dom <URL> 2>/dev/null
```

Evaluate three dimensions per site (see individual competitor files for the actual data):

### SEO factors

- Title contains primary keyword + city/country
- Meta description informative and click-worthy
- H1 matches search intent
- Content depth — dedicated service pages, FAQ, blog
- Local SEO — address, geo coordinates, neighborhood pages
- Schema markup (JSON-LD `ProfessionalService` / `ConsultingBusiness`)
- Internal linking between service pages and CTAs

### Trust signals

- Years in business
- Number of staff / named experts with photos and credentials
- Client logos / case studies with named clients
- Third-party review badges (Trustpilot, G2, Clutch)
- Certifications prominently displayed (ISO 27001, ISO 42001, etc.)
- Public sector access (SKI Framework for DK)

### Conversion UX

- Visible CTA above the fold
- Phone number in header
- Languages — DA + EN parity
- Online booking or contact form
- Pricing transparency (or stated approach to scoping)

## 4. Check directory presence

For DK B2B IT/AI consulting, the relevant directories are:

- LinkedIn Company Page (presence + follower count + post frequency)
- Clutch.co (`clutch.co/dk/consulting/ai/copenhagen`)
- Sortlist (`sortlist.com/s/artificial-intelligence/denmark-dk`)
- TechBehemoths (`techbehemoths.com/companies/artificial-intelligence/denmark`)
- ensun.io (`ensun.io/search/ai-consulting/denmark`)
- Trustpilot (`trustpilot.com/review/<domain>`)
- Google Business Profile (only if there's a physical office)

For each, search `site:<directory> "<company name>"` and note rating, review count, profile completeness.

## 5. Check paid advertising

Search the primary keyword from an incognito browser. Note who's running ads, ad copy, landing page URL.

SimilarWeb's paid-vs-organic split is a useful proxy when live ad detection is inconclusive.

## 6. Off-site signals

- LinkedIn: company page activity + employees' personal profile activity
- Press mentions (search `"<company name>" site:version2.dk` or `site:computerworld.dk` for DK tech press)
- Backlinks: Ahrefs / Moz on the target domain
- GitHub: repos owned, stars, contribution graph (relevant for dev consultancies)

## 7. Output

For each competitor: one file `NN-<slug>.md` following the template in the skill.

For the comparison: `comparison.md` with side-by-side tables and prioritized recommendations ordered by impact × effort.

For the target site: a baseline file (`00-<target>-baseline.md`) capturing the "before" state — essential for the next progress check (Mode B re-audit in ~6 months).
