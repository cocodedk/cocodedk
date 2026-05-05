# Web Presence Audit — cocode.dk

**Target site:** https://cocode.dk
**Research date:** 2026-05-04
**Auditor:** Claude (web-presence-audit skill, Mode A — fresh audit)

## Scope

Benchmark cocode.dk against established Danish/European competitors for the keyword footprint:

- **Development + GRC + LLM/AI integration** (positioning sought)
- **Languages:** Danish + English (both primary)
- **Goals (all three):**
  1. Recruiters / employers find Babak for full-time roles
  2. Clients find Babak for freelance / consulting contracts
  3. Discovery of specific products (FITS, MCP servers, AI agent tooling)

## Competitor pool

Selected from live SERP results for the target keywords (DK + EN), spanning enterprise to boutique scale:

| # | Competitor | Why included |
|---|------------|--------------|
| 01 | NNIT | Largest DK enterprise IT consulting; owns regulated-AI keyword space |
| 02 | Ansvar Systems | **Closest direct competitor** — builds an MCP server for EU compliance regulations |
| 03 | AI Wave (aiwave.dk) | DK AI agency with MCP + n8n + LangChain stack — same SME automation angle |
| 04 | Leave a Mark Group | DK cybersecurity + GRC firm with ISO27001/NIS2/DORA/AI Act certifications and SKI Framework access |

A 5th candidate (Visible Agency) was dropped — homepage returned no content (heavy JS shell, no public copy).

## Files

- `README.md` — this file
- `methodology.md` — how to repeat or update this audit
- `00-cocode-dk-baseline.md` — current state of cocode.dk
- `01-nnit.md` — NNIT
- `02-ansvar-systems.md` — Ansvar Systems (most direct competitor)
- `03-ai-wave.md` — AI Wave
- `04-leave-a-mark-group.md` — Leave a Mark Group
- `comparison.md` — side-by-side tables + prioritized recommendations
- `recommended-stack.md` — complete tech stack inventory (Babak's full skillset compiled from repos + projects)
- `design-audit.md` — Design for Hackers checker review of the live site (typography, color, hierarchy, AI-tells)

## Headline finding (TL;DR)

cocode.dk has **stronger SEO foundations** than most boutique DK competitors (full JSON-LD `ProfessionalService` + `ConsultingBusiness`, hreflang DA/EN, OG cards, geo coordinates). Where it loses ground is in **trust signals (no named client logos), content depth (single-page only — no dedicated service pages), and a productized differentiator** that competitors like Ansvar Systems demonstrate (an open-source MCP server gets them direct keyword traffic from a niche where Babak has comparable expertise).

## Recovery / data freshness

- Traffic data via SimilarWeb: most competitors are below the ~5K visits/month threshold, so SERP position and indexed-page count served as proxy signals.
- Re-audit recommended in 6 months (2026-11-04) to measure impact of changes and catch new entrants.
