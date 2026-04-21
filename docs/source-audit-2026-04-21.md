# Source Audit - 2026-04-21

This document audits `content/source.md` before the next Supabase content update. It is technical project documentation; do not copy it into the reader source.

## Scope

- Canonical content source: `content/source.md`.
- Data flow: Markdown-only export, then Supabase MCP wipe/reseed after user review.
- Clinical scope: hospital-stage anesthesia and intensive care.
- No Supabase push was performed during this audit.

## Structural Result

- `npm run source:verify` passed after the structural split, antidote/readability, and acid-base update.
- Website sections: `27`.
- Krok modules: `25`.
- Parsed blocks: `1874`.
- `docs/curriculum-coverage-map.md` no longer has rows marked `Gap`.
- `content/source.md` does not contain MCP/Supabase/revalidation/local-path workflow terms.
- The unused normative-map theme is not present in the reader source.

## Clinical Framing Result

- The source remains suitable as a study-reader seed, not as a standalone hospital clinical protocol.
- High-risk doses and thresholds are now either tied to named sources or explicitly marked for local verification.
- The toxicology block now includes an antidote table tied specifically to order `МОЗ №435/2006`:
  - naloxone;
  - flumazenil;
  - atropine/diethixime, with pralidoxime marked as not found in order `435/2006`;
  - sodium bicarbonate;
  - N-acetylcysteine;
  - methylene blue;
  - sodium thiosulfate;
  - ethanol;
  - glucose 40%;
  - pyridoxine;
  - deferoxamine;
  - unithiol.
- Toxicology order `МОЗ №435/2006` is clearly labeled as historical because it lost force on `2023-09-01`.
- Hydroxocobalamin, fomepizole as a drug, pralidoxime, and 20% lipid emulsion are explicitly marked as not found in order `435/2006`; if added as modern practice later, they require separate current sources and local availability checks.
- The reader UI now recognizes consecutive pipe-delimited bullet rows, including the antidote block, and renders them as a responsive table while keeping each row commentable.
- The acid-base block now has separate reader-facing sections for metabolic acidosis, metabolic alkalosis, respiratory acidosis, respiratory alkalosis, and mixed disorders. Шлапак remains the local educational source; MSD/Merck Manual Professional is listed in the coverage map as the narrow fallback for compensation formulas and mixed-disorder framing.
- The top-level reader structure was split into cleaner modules: regional/neuraxial anesthesia, peripheral/fascial blocks, obstetric anesthesia, CPR/post-ROSC, perioperative critical incidents/anaphylaxis, and standalone pharmacology/toxicology/transfusion themes.
- This split intentionally changes many `theme_key` and `block_key` values. Per user approval, the next Supabase stage should be a full wipe/reseed and old comments may be discarded for this reset.
- A readability pass removed informal placeholders and made the most colloquial reader-facing formulations more formal.

## Readiness Verdict

`PASS WITH WARNINGS` for preparing the next Supabase review/reseed.

There are no blocking P0 issues found in the Markdown structure or parser/export readiness. Remaining warnings are content-governance items: they should be visible to the reviewer before MCP reseed, but they do not prevent loading the content into Supabase if the user accepts the current study-oriented status.

## Remaining P1 Local-Verification Items

- Local medication availability and concentrations for antidotes, emergency drugs, sedatives, analgesics, neuromuscular blockers, antiemetics, and vasopressors.
- Local PONV table: drugs, doses, QT restrictions, pregnancy/pediatric limits, and rescue therapy.
- Anticoagulant timing table for neuraxial, deep plexus, and deep peripheral blocks.
- Local airway and difficult-airway SOP, including equipment names actually used in the department.
- ARDS ventilation escalation table: local `PEEP/FiO2`, prone positioning, neuromuscular blockade, ECMO/referral criteria.
- Electrolyte correction tables for `K`, `Na`, `Ca`, `Mg`, `P`, hypertonic saline, insulin-glucose for hyperkalemia, and dialysis triggers.
- Pediatric anesthesia/ICU tables: airway sizes, fluids, sedatives/analgesics, ventilation starts, sepsis antibiotics.
- Transplant ICU route: transplant-center protocol for immunosuppression, infection prophylaxis, biopsy/echo, extracorporeal support, and transfer.
- Transfusion documentation and hemovigilance rules under Ukrainian/local workflow.

## P2 Editorial Items

- Some source names and abbreviations remain in English because the study app uses tooltip definitions and the source names are more recognizable in their original form.
- Several modules intentionally keep "requires local verification" language. This is preferable to turning uncertain local practice into a final clinical instruction.
- The final rapid-review theme should be refreshed after the next major content batch so its red-number list tracks the expanded modules.

## Next Supabase Stage

Before MCP reseed:

1. User reviews the current `content/source.md`.
2. Run `npm run source:verify`, `npm run content:export`, `npm run test`, `npm run lint`, `npm run build`, and `E2E_SUPABASE_READY=1 npm run test:e2e`.
3. For this structural reset only, truncate old content/comments before reseeding because the user approved ignoring old comments.
4. Apply the Markdown-only payload via Supabase MCP according to `docs/mcp-content-update-guide.md`.
5. Call the protected Vercel revalidation endpoint described in `docs/mcp-content-update-guide.md`.
