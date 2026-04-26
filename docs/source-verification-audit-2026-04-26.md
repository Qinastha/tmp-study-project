# Risk-first source verification ledger

Date: 2026-04-26.

Verdict: PASS WITH WARNINGS. This audit starts the high-risk verification cycle for `content/source.md`; it does not claim that every statement in the reader is fully source-locked.

Policy: MOH-first. Current Ukrainian МОЗ/ДЭЦ documents and official drug labels are preferred for final doses, thresholds, contraindications, and algorithms. Шлапак remains the second-priority explanatory source. Local ООКБ protocols, professional-society guidance, and international labels/guidelines are used when Ukrainian sources are absent, historical, or non-specific.

## Source registry

| Source | Date/status | Use in this pass |
| --- | --- | --- |
| [Rada: МОЗ №435/2006 toxicology](https://zakon.rada.gov.ua/go/v0435282-06) | historical; invalid from 2023-09-01 | Historical comparison only for toxicology rows actually present in the order. |
| [DailyMed naloxone injection label](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=21d20dff-6efe-481e-a5a0-9c80ded73ca9) | label; current archive shows 2025 update | Naloxone adult/pediatric dosing and postoperative titration. |
| [DailyMed flumazenil injection label](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=28f31b54-ff30-fd0d-e063-6394a90afc18) | label; 2024+ label version | Flumazenil adult sedation/overdose and pediatric sedation dosing. |
| [DailyMed acetylcysteine injection label](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5ae53725-1abb-4122-9c85-f26c2c31566c) | label; recent label | Modern IV NAC regimen for acetaminophen toxicity. |
| [DailyMed methylene blue label](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fe47491d-810e-466a-aab2-aa92756492ba) | label; recent label | Acquired methemoglobinemia dosing and contraindications. |
| [DailyMed Cyanokit label](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d56fcc8d-bd64-46ab-b0c0-2124bd745a6b) | label; updated 2023 | Hydroxocobalamin dosing and monitoring risks. |
| [DailyMed fomepizole label](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=911312e2-3a7c-4c97-88a8-b8d92cd12923) | label | Fomepizole dosing for methanol/ethylene glycol and dialysis interval. |
| [DailyMed Protopam pralidoxime label](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?audience=consumer&setid=2741d8fd-51c2-46be-880b-99f2b20a6137) | label; current 2026 crawl | Pralidoxime adult/pediatric IV dosing for organophosphates. |
| [ASRA LAST checklist 2020](https://asra.com/news-publications/asra-updates/blog-landing/guidelines/2020/11/01/checklist-for-treatment-of-local-anesthetic-systemic-toxicity) | international professional guidance | Lipid emulsion dosing and modified resuscitation in LAST. |
| [MHAUS dantrolene FAQ](https://www.mhaus.org/faqs/how-much-dantrolene-should-be-kept-on-hand/) | international professional guidance | Malignant hyperthermia dantrolene starting dose and stock planning. |
| Current МОЗ/ДЭЦ orders already listed in `docs/curriculum-coverage-map.md` | active unless separately marked | Kept as first-line source registry for obstetrics, CPR, nutrition, antibiotics, diabetes, COPD, ACS, stroke, etc. |
| Local ООКБ DOCX protocols in `/Users/qinastha/Downloads/Учеба/Анест` | local | Kept as practical implementation layer; not used to overrule active МОЗ/ДЭЦ or official labels. |

## Clinical claim ledger

| Theme | Topic | Fact / dose / threshold | Status | Source | Action |
| --- | --- | --- | --- | --- | --- |
| `theme-23` | Naloxone | Adult overdose `0.4-2 mg IV`, repeat every `2-3 min`, reassess diagnosis after `10 mg`; postoperative titration `0.1-0.2 mg IV` | Verified | DailyMed naloxone label; №435 historical agrees for adult opioid row | Corrected practical table. |
| `theme-23` | Naloxone pediatric | `0.01 mg/kg IV`, then `0.1 mg/kg` if no response; neonate `0.01 mg/kg IV/IM/SC` | Verified | DailyMed naloxone label | Added population-specific row detail. |
| `theme-23` | Flumazenil | Sedation reversal adult `0.2 mg IV`, repeats to `1 mg`; overdose cumulative to `3 mg`; pediatric sedation `0.01 mg/kg` | Verified with caution | DailyMed flumazenil label | Corrected table and emphasized seizure/resedation risk. |
| `theme-23` | Organophosphates | Atropine from №435 is historical; pralidoxime adult `1-2 g IV over 15-30 min` with repeats if weakness persists | Partially verified | №435 historical for atropine; DailyMed Protopam label for pralidoxime | Replaced `диэтиксим` practical row with `атропин + пралидоксим`; local availability remains unresolved. |
| `theme-23` | Sodium bicarbonate | №435 lists `1-2 mEq/kg` for beta-blocker poisoning; modern broad-QRS indications are not source-locked in this pass | Verified as historical only | №435 historical | Kept but explicitly downgraded modern QRS use to `Требует сверки`. |
| `theme-23` | N-acetylcysteine | IV `150 mg/kg` then `50 mg/kg` then `100 mg/kg` over `21 h`; old oral №435 scheme remains historical | Verified | DailyMed acetylcysteine injection label; №435 historical | Corrected practical table from oral-only historical scheme. |
| `theme-23` | Methylene blue | `1 mg/kg IV over 5-30 min`, repeat once after `1 h`; avoid in G6PD deficiency, caution serotonin syndrome | Verified | DailyMed methylene blue label | Corrected from historical `1-2 mg/kg` to modern label wording. |
| `theme-23` | Hydroxocobalamin | Adult `5 g IV over 15 min`, repeat `5 g`, max `10 g` | Verified | DailyMed Cyanokit label | Added as modern source, not №435. |
| `theme-23` | Fomepizole / ethanol | Fomepizole `15 mg/kg`, then `10 mg/kg q12h x4`, then `15 mg/kg q12h`; q4h during hemodialysis | Verified | DailyMed fomepizole label; ethanol only historical №435 | Replaced confusing ethanol toxicant/dilution wording with antidote dosing focus. |
| `theme-21` / `theme-23` | LAST lipid emulsion | `20%` lipid, `<70 kg` bolus `1.5 mL/kg`, infusion `0.25 mL/kg/min`; `>70 kg` bolus `100 mL`, infusion `250 mL`; max `12 mL/kg` | Verified | ASRA LAST checklist 2020 | Kept dose and added as practical antidote row. |
| `theme-22` | Malignant hyperthermia | Triggers are volatile anesthetics and succinylcholine; dantrolene dose not yet in reader | Partially verified | MHAUS/EMHG/MHAUS dantrolene FAQ | Keep MH trigger warning; add dantrolene dose only after local availability/stock is reviewed. |
| `theme-06` | Obstetric hemorrhage | Hb, platelet, fibrinogen, Ca, pH, lactate, MAP, diuresis targets from МОЗ №205 | Needs periodic recheck | МОЗ №205/2014; historical age of protocol noted | Keep current text but preserve `requires current local protocol` caveats. |
| `theme-11` | CPR | Adult/pediatric CPR values and drugs | Covered for represented source | МОЗ/ДЭЦ `ГС 2024-1259` | No source change in this pass. |
| `theme-12` | Anaphylaxis | IM adrenaline adult/child dosing | Covered for represented source; IV perioperative titration unresolved | МОЗ `№916/2015` | Keep gap for perioperative IV titration. |
| `theme-14` | Sepsis | `30 mL/kg`, MAP `65`, norepinephrine first-line | Covered for represented source | SSC/local ООКБ protocol already documented | No change in this pass; antibiotic dosing remains a gap. |
| `theme-24` | Transfusion | RBC restrictive threshold and platelet/plasma/cryo targets | Partially covered | AABB/NICE plus МОЗ №205 for obstetrics | Keep module and gaps for ml/kg/component dosing and reactions. |

## Unresolved gaps

- Local antidote availability: actual forms, concentrations, storage locations, night access, and who authorizes issue.
- Sodium bicarbonate for broad `QRS`/sodium-channel blockade needs a current toxicology guideline before becoming a final reader fact.
- Dantrolene dose, stock, reconstitution, and MH cart workflow need local availability and current label/protocol review before insertion into `theme-22`.
- Pediatric and pregnancy toxicology rows remain incomplete except where the cited label provides clear population wording.
- Extracorporeal elimination criteria for lithium, methanol, ethylene glycol, salicylates, and valproate remain unfilled.
- Dose tables for anesthetic pharmacology, local anesthetic maximums, PONV antiemetics, thromboprophylaxis, antibiotics, and blood components remain future high-risk work.

## Implementation notes

- Supabase was not updated during this audit.
- `content/source.md` now uses a practical antidote table with source/status in the table itself.
- Future edits should continue the same ledger pattern: update this audit or create a dated successor, then update `docs/curriculum-coverage-map.md`, then update `content/source.md`.
