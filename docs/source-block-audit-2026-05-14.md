# Living Source Block Audit - 2026-05-14

Verdict: PASS WITH WARNINGS.

Completed modules: `25/25`.

This is the living audit for sequential review of `content/source.md`. Continue appending future passes here when modules are reorganized, edited, source-checked, or prepared for Supabase reseed.

## Rules Fixed For This Audit

- Canonical reader source: `content/source.md`.
- Source priority: active МОЗ/ДЭЦ -> Шлапак -> local ООКБ documents -> narrow trusted international sources.
- Preserve clinical information unless there is a documented reason to remove or move it.
- Mark uncertain clinical facts as `Требует сверки` instead of converting them into final guidance.
- Keep technical MCP/Supabase/PDF-flow details stay out of reader-source; those details belong in project documentation.
- `Источники и спорные места` must immediately precede `Пробелы к заполнению`.
- `Пробелы к заполнению` must be the final subsection of each numbered reader module.
- Do not add new doses, thresholds, contraindications, formula constants, or algorithms unless the source is current enough and recorded in documentation.
- Markdown pipe tables must remain row-level table blocks so the reader UI and Supabase export render them correctly.

## Global Checks

- Structural frame: all `25` numbered modules have the required frame headings in the agreed order.
- Source/gap ordering: `Источники и спорные места` is the penultimate subsection and `Пробелы к заполнению` is the final subsection in every numbered module.
- Abbreviation review: no exact duplicate abbreviations after normalization.
- Reader-source technical hygiene: no MCP commands, Supabase workflow, revalidation URL, local filesystem source paths, raw Krok code lists, or `Покрывает коды Крок 3` sections in `content/source.md`.
- Editorial pass: removed the remaining colloquial `думать о` formulations from reader-facing clinical text.
- Detailed Pass 1 - service sections and themes 1-5 completed.
- Reworded colloquial decision language in themes `1-5` without changing clinical numbers, thresholds, routes, or source hierarchy.
- Detailed Pass 2 - themes 6-10 completed.
- Reworded obstetric, pain, monitoring, infusion, nutrition, antibiotic and postoperative language in themes `6-10` without changing clinical numbers, thresholds, routes, or source hierarchy.
- Detailed Pass 3 - themes 11-15 completed.
- Reworded CPR, crisis, respiratory ICU, sepsis and cardiac ICU language in themes `11-15` without changing clinical numbers, thresholds, routes, or source hierarchy.
- Detailed Pass 4 - themes 16-20 completed.
- Reworded trauma, neuro-ICU, metabolic, pediatric and operating-room safety language in themes `16-20` without changing clinical numbers, thresholds, routes, or source hierarchy.
- Detailed Pass 5 - themes 21-25 completed.
- Reworded local-anesthetic, pharmacology, toxicology, transfusion and final-review language in themes `21-25` without changing clinical numbers, thresholds, routes, or source hierarchy.
- Detailed Pass 6 - cross-cutting editorial sweep completed.
- Reworded remaining cross-module conversational markers without changing clinical numbers, thresholds, routes, or source hierarchy.
- Clinical-risk handling: this pass did not intentionally change dose values, thresholds, route-of-administration facts, or source hierarchy.

## Service Sections

| Section | Status | Distribution/name review | Structure/editorial review | Abbreviation decision | Residual issue |
| --- | --- | --- | --- | --- | --- |
| `guide` | done | The guide remains a reader-facing orientation section and correctly states the hospital-stage focus. | Copy is stable and aligned with the UI workflow. | Not applicable. | None. |
| `abbreviations` | done | Grouping by clinical domain is appropriate for tooltip extraction and reader scanning. | Exact duplicate check passed after normalization. | Keep English abbreviations that are actively used in reader text; avoid adding rare abbreviations without text usage. | Future passes should re-run duplicate and usage checks after large content imports. |

## Numbered Module Audit

| Module | Status | Distribution/name review | Structure/editorial review | Clinical/source review | Abbreviation decision | Residual issue |
| --- | --- | --- | --- | --- | --- | --- |
| `theme-01` | done | Title matches preoperative risk, comorbidity, renal/hepatic and VTE/PONV preop material. | Required frame present; source/gap order correct. | No dose/threshold changes in this pass. | Uses standard `VTE`, `PONV`, `ХБП`; glossary entries are unique. | Local renal/hepatic dose-adjustment table remains a formulary/SOP gap. |
| `theme-02` | done | General anesthesia, TIVA and procedural sedation are grouped appropriately. | Required frame present; one sevoflurane pregnancy row was reworded into professional clinical language. | Sevoflurane/MAC statements remain source-marked; no clinical number changed. | Keep `TIVA`, `MAC`, `BIS`, `ЭФГДС`. | Local drug-card/pump presets remain unresolved. |
| `theme-03` | done | Airway, RSI and difficult airway are correctly separated from obstetric and pediatric detail while cross-linking those themes. | Required frame present; headings are reader-facing and no legacy numbering remains. | No airway algorithm facts changed. | Keep `RSI`, `SAD`, `CICO`, `FONA/eFONA`, `VL`. | Local airway trolley/eFONA drill remains a local SOP gap. |
| `theme-04` | done | Regional/neuraxial material and LP antithrombotic supplement are appropriately located. | Required frame present; Markdown tables remain table-compatible. | ASRA/LP study supplement status remains explicit. | Keep `LP`, `PDPH`, `Bromage`. | Local urgent-surgery/neuraxial complication route remains unresolved. |
| `theme-05` | done | Peripheral and fascial blocks are correctly separated from neuraxial and LAST pharmacology. | Required frame present; catheter observation material belongs here. | No block dose or anticoagulation facts changed. | Keep `PNB`, `USGRA`, block-name abbreviations used in text. | Local compressibility classification and pump order sheet remain unresolved. |
| `theme-06` | done | Obstetric anesthesia, hemorrhage, hypertensive disorders and failed intubation are correctly grouped. | Required frame present; title is clinically clear. | No obstetric dose/threshold changes in this pass. | Keep `HELLP`, obstetric airway terms already in glossary. | Local MTP and component route remain unresolved. |
| `theme-07` | done | Acute pain, PCA/PCEA, special groups and monitoring are correctly grouped. | Required frame present; assessment and monitoring structure is coherent. | No analgesic dose or contraindication changes in this pass. | Keep `PCA`, `PCEA`, `APS`, pain scales used in text. | Local acute-pain service order sheets remain unresolved. |
| `theme-08` | done | Monitoring, ventilation, hemodynamics and neuromuscular relaxation are appropriately combined. | Required frame present; source/gap order correct. | No monitoring thresholds changed. | Keep `BIS`, `MAC`, `TOF`, `FoCUS/TTE/FICE`. | Visual atlas/depth-monitoring SOP remains unresolved. |
| `theme-09` | done | Infusion, antibiotics and nutrition remain a coherent perioperative support module. | Required frame present; tables remain export-safe. | No antibiotic dose/timing facts changed. | Keep `GDFT`, `5R`, antibiotic abbreviations already present. | Local antibiotic appendices and GDFT charting remain unresolved. |
| `theme-10` | done | PACU, recovery, PONV and VTE prophylaxis are correctly grouped as postoperative care. | Required frame present; source/gap order correct. | No PONV/VTE dose changes in this pass. | Keep `PACU`, `PONV`, `PDNV`, `POVOC`, `PADSS`, `Aldrete`. | Local pediatric/obstetric PONV formulary and thromboprophylaxis card remain unresolved. |
| `theme-11` | done | CPR, ALS/PALS and post-ROSC are correctly grouped. | Required frame present; route and roles are distinct from drug/energy facts. | No CPR number changes in this pass. | Keep `ALS`, `PALS`, `ROSC`, `ЭАБП`. | Local post-ROSC destination route remains unresolved. |
| `theme-12` | done | Perioperative crises, anaphylaxis and malignant hyperthermia are appropriately grouped. | Required frame present; crisis-checklist style remains concise. | No adrenaline/dantrolene dose changes in this pass. | Keep `MH`, `LAST` cross-link where needed. | Local crisis-cart concentrations and stock map remain unresolved. |
| `theme-13` | done | Adult respiratory ICU, ARDS, COPD and PE are correctly grouped. | Required frame present; ARDSNet table remains compatible with export. | No respiratory thresholds or anticoagulation facts changed. | Keep `ARDS`, `COPD/ХОЗЛ`, `PE/ТЭЛА`, `P/F`, `PEEP`. | Local ECMO/transport route remains unresolved. |
| `theme-14` | done | Sepsis, septic shock and infection control remain coherent. | Required frame present; duplicate `Практический алгоритм` is a clinical subheading inside material and acceptable. | No sepsis timing or antibiotic facts changed. | Keep `SSC`, `MDR`, source-control terms. | Local sepsis huddle and empiric antibiotic table remain unresolved. |
| `theme-15` | done | Cardiac ICU, ACS, shock and transplant ICU are correctly grouped. | Required frame present; hemodynamic escalation material belongs here. | No vasoactive/MCS facts changed. | Keep `ОКС`, `STEMI/NSTEMI`, `SCAI`, `MCS`, `MINS`. | Local shock-team/PCI/MCS/transplant route remains unresolved. |
| `theme-16` | done | Trauma, massive bleeding, burns and damage control are correctly grouped. | Required frame present; Parkland remains marked as additional study option in existing source docs. | No TXA, burn-fluid or hypothermia facts changed. | Keep `DCR`, `DCS`, `MTP`, `TBSA`. | Local MTP, burn-center and warming ownership route remain unresolved. |
| `theme-17` | done | Neuro-ICU, stroke, TBI, coma and transport are correctly grouped. | Required frame present; adult and pediatric neurocritical layers are separated. | No ICP/CPP/osmotherapy facts changed. | Keep `ЧМТ`, `ICP`, `CPP`, `GCS`, `EEG`. | Local CT/neurosurgery/EEG/pediatric route remains unresolved. |
| `theme-18` | done | Metabolic, renal/hepatic, GI, electrolyte and acid-base disorders are correctly grouped. | Required frame present; RRT table header was reworded into professional language. | No electrolyte, DKA, RRT or KOS numbers changed. | Keep `КОС`, `AG`, `RRT`, `ДКА`, `ХБП`. | Local nephrology/RRT and electrolyte-concentrate SOP remains unresolved. |
| `theme-19` | done | Pediatric anesthesia, resuscitation, sepsis and respiratory support are correctly grouped. | Required frame present; recent equipment/fluid anchors remain marked as educational and not local SOP. | No pediatric CPR/newborn/diabetes numbers changed. | Keep pediatric scales and `ETT/LMA/IO`. | Local pediatric airway, fasting, premedication and antibiotic card remain unresolved. |
| `theme-20` | done | OR safety and anesthesia checklist are appropriately isolated. | Required frame present; checklist language is clear. | No form/order facts changed. | Keep `008/о` and safety-checklist terms. | Local storage/signature/document route remains unresolved. |
| `theme-21` | done | Local anesthetics and LAST are correctly isolated from general pharmacology. | Required frame present; maximum-dose table remains export-safe. | No LA maximum or lipid-rescue dose changed. | Keep `ЛА`, `LAST`, `ASRA`. | Local LAST kit and agent availability remain unresolved. |
| `theme-22` | done | Anesthesia pharmacology, opioids and neuromuscular blockers are correctly grouped. | Required frame present; label-dose anchors are clearly marked. | No induction/NMBA/opioid dose changed. | Keep drug-class abbreviations already used in text. | Local pump/formulary chart and MH stock remain unresolved. |
| `theme-23` | done | Toxicology and acute poisonings are correctly grouped. | Required frame present; practical antidote table remains source-status based. | No antidote/ECTR/bicarbonate facts changed. | Keep `ECTR`, `ФОС`, `LAST` cross-link. | Local antidote storage/poison-center route remains unresolved. |
| `theme-24` | done | Transfusion medicine and blood components are correctly grouped. | Required frame present; Ukrainian traceability table remains export-safe. | No component threshold/storage facts changed. | Keep `ЭМ`, `СЗП`, `КПК`, `MTP`. | Local blood-bank forms, component volumes and ml/kg policy remain unresolved. |
| `theme-25` | done | Final rapid review correctly summarizes high-risk prior modules without becoming a source inventory. | Required frame present; final review remains concise and reader-facing. | No summary numbers changed. | Keep only abbreviations already defined in the glossary. | Must be refreshed after future source-verified additions. |

## Detailed Pass 1 - Service Sections And Themes 1-5

Scope: guide, glossary, and modules `theme-01` through `theme-05`.

| Area | Finding | Action |
| --- | --- | --- |
| Service guide | Reader instructions are UI-facing and do not contain technical workflow details. | Kept as-is. |
| Abbreviation glossary | No exact duplicate abbreviation entries after normalization; English abbreviations are justified by reader usage. | Kept structure; future content imports must re-run duplicate and tooltip checks. |
| `theme-01` | Distribution is correct: preoperative risk, renal/hepatic medication safety, VTE and PONV screening belong together. | Reworded `по привычке` language into a neutral medication-safety formulation; no clinical values changed. |
| `theme-02` | Distribution is correct: general anesthesia, TIVA and procedural sedation are a shared decision module, while pharmacology stays in `theme-22`. | Reworded sedation-airway, ambulatory-staffing and MAC/TIVA rows into professional wording; no dose, frequency, FiO2 or flumazenil values changed. |
| `theme-03` | Distribution is correct: general adult airway logic belongs here; obstetric and pediatric details remain cross-linked. | Reworded automatic-RSI and table-header language; no airway algorithm changed. |
| `theme-04` | Distribution is correct: neuraxial/deep-block anticoagulation and neuraxial complications belong here. | Reworded the neurologic-complication escalation paragraph; table rows and intervals unchanged. |
| `theme-05` | Distribution is correct: peripheral/fascial blocks and catheter observation belong here, not in the neuraxial module. | Reworded peripheral-block purpose, ISB respiratory risk and obturator-block indication; no block indications, monitoring items or LAST facts changed. |

Residual result: `theme-01` through `theme-05` are editorially cleaner and still source-compatible. Remaining work is source/formulary/SOP completion, not structural relocation.

## Detailed Pass 2 - Themes 6-10

Scope: modules `theme-06` through `theme-10`.

| Area | Finding | Action |
| --- | --- | --- |
| `theme-06` | Distribution is correct: obstetric urgency, cesarean anesthesia, hypertensive disorders, hemorrhage and obstetric failed-intubation logic belong together. | Reworded urgency category, neuraxial-prep, severe-hypertension, fluid and clinical-goal phrases into professional clinical language; no magnesium, blood-loss, component, ventilation or vasoactive values changed. |
| `theme-07` | Distribution is correct: postoperative pain assessment, multimodal analgesia, `PCA/PCEA`, special groups and monitoring belong in one pain module. | Reworded pain goals, unexpected-pain escalation and cognitive-impairment assessment language; no analgesic contraindication, monitoring item or dose row changed. |
| `theme-08` | Distribution is correct: perioperative monitoring, depth monitoring, ventilation/hemodynamics and focused ultrasound are grouped as monitoring-supported decisions. | Reworded `IVC` and limited-study language so focused ultrasound limitations read as documentation guidance rather than informal commentary; no monitoring thresholds changed. |
| `theme-09` | Distribution is correct: fluids, `GDFT`, antibiotics and nutrition are perioperative support topics, with transfusion kept in dedicated modules. | Reworded fluid-overload, nutrition-timing and antimicrobial-stewardship phrases; no fluid, antibiotic, nutrition or refeeding values changed. |
| `theme-10` | Distribution is correct: PACU recovery, PONV and VTE prophylaxis remain a postoperative-care module. | Reviewed for required frame and table compatibility; no PONV/VTE dose, timing or threshold changed in this pass. |

Residual result: `theme-06` through `theme-10` have cleaner reader-facing language while preserving the existing verified/source-marked clinical content. Remaining work is local SOP/formulary completion and targeted source verification, not structural relocation.

## Detailed Pass 3 - Themes 11-15

Scope: modules `theme-11` through `theme-15`.

| Area | Finding | Action |
| --- | --- | --- |
| `theme-11` | Distribution is correct: adult CPR, pediatric differences, reversible causes, post-ROSC targets and in-hospital roles belong together. | Reworded pediatric bradycardia and post-ROSC observation language into active clinical management language; no CPR compression, ventilation, adrenaline, amiodarone, EtCO2, oxygenation, MAP, temperature or glucose targets changed. |
| `theme-12` | Distribution is correct: perioperative crises, anaphylaxis, LAST cross-link and malignant hyperthermia remain a dedicated crisis module. | Reviewed crisis phrasing and table compatibility; no adrenaline, propofol, succinylcholine, atropine, lipid emulsion, tryptase or dantrolene values changed. |
| `theme-13` | Distribution is correct: adult respiratory ICU, `ARDS`, `LUS`, transport, `COPD` and `PE` are appropriately grouped by respiratory failure and right-heart risk. | Reworded `PEEP`, prone positioning, transport-ventilator, `COPD` oxygen and `PE` right-ventricle phrases into professional clinical language; no ventilator, thrombolysis, anticoagulation, oxygen or transport monitoring thresholds changed. |
| `theme-14` | Distribution is correct: sepsis recognition, shock, fluids, vasopressors, source control and antibiotic de-escalation remain one ICU infection module. | Reworded antimicrobial overuse language; no sepsis shock definition, lactate, fluid, vasopressor, hydrocortisone, source-control or de-escalation timing changed. |
| `theme-15` | Distribution is correct: `ACS`, perioperative myocardial injury, shock staging/support, `FoCUS/TTE` and transplant ICU belong in the cardiac ICU module. | Reworded `SCAI` early-stage action and transplant postoperative language; no reperfusion, troponin, vasoactive, `MCS`, `MINS` or transplant timing values changed. |

Residual result: `theme-11` through `theme-15` have cleaner clinical prose and remain source-compatible. One duplicated pediatric bradycardia phrase in `theme-19` was reworded at the same time to keep global terminology consistent; no pediatric resuscitation values changed.

## Detailed Pass 4 - Themes 16-20

Scope: modules `theme-16` through `theme-20`.

| Area | Finding | Action |
| --- | --- | --- |
| `theme-16` | Distribution is correct: trauma, massive bleeding, burns and damage control belong together. | Reworded permissive-hypotension, trauma-induction, damage-control and hypothermia language into professional clinical wording; no TXA, MTP, calcium, burn-fluid, TBSA, diuresis or hypothermia values changed. |
| `theme-17` | Distribution is correct: stroke, adult TBI, pediatric neurocritical care, status epilepticus, coma and transport belong in a neuro-ICU module. | Reworded stroke-priority, BP-control, neuroprotection, seizure and pediatric TBI language; no stroke BP, GCS, ICP/CPP, osmotherapy or seizure medication values changed. |
| `theme-18` | Distribution is correct: renal/hepatic medication safety, diabetes, bowel obstruction, electrolytes, KOS and RRT remain a metabolic/GI/renal module. | Reworded medication-stewardship, RRT, KOS and refeeding phrases; no insulin, electrolyte, sodium-correction, RRT or acid-base values changed. |
| `theme-19` | Distribution is correct: pediatric anesthesia, neonatal resuscitation, pediatric CPR, sepsis and respiratory support belong together. | Reworded pediatric scaling, pre-arrest assessment, neonatal ventilation and pediatric induction language; no CPR, neonatal ventilation, sepsis bolus/antibiotic or device-size values changed. |
| `theme-20` | Distribution is correct: anesthesia safety checklist and form `008/о` belong in a dedicated OR-safety module. | Reworded checklist language into operating-room safety terminology; no form `008/о`, threshold or signature requirements changed. |

Residual result: `theme-16` through `theme-20` have cleaner professional prose and remain source-compatible. Remaining items are local SOP/formulary/route gaps, not editorial blockers.

## Detailed Pass 5 - Themes 21-25

Scope: modules `theme-21` through `theme-25`.

| Area | Finding | Action |
| --- | --- | --- |
| `theme-21` | Distribution is correct: local anesthetic pharmacology, LAST prevention, recognition and lipid rescue belong in a dedicated module. | Reworded local-anesthetic opening, differential diagnosis and bupivacaine cardiotoxicity language; no LA maximum dose, lipid-emulsion dose or observation interval changed. |
| `theme-22` | Distribution is correct: anesthetic drugs, opioids, neuromuscular blockers and malignant hyperthermia belong together as pharmacology. | Reworded hypnosis/analgesia/relaxation distinctions, non-triggering anesthesia and MH circuit language; no induction, opioid, NMBA, reversal or dantrolene values changed. |
| `theme-23` | Distribution is correct: acute toxicology, antidotes, sodium bicarbonate and extracorporeal elimination belong together. | Reworded toxicology triage, sedative-hypnotic toxidrome and repeated-bicarbonate language; no antidote, ECTR, bicarbonate or pH target changed. |
| `theme-24` | Distribution is correct: transfusion indications, component therapy, reactions, traceability and component dosing belong together. | Reworded transfusion-component language, FFP misuse warnings, storage wording and final-review RBC phrasing; no RBC, platelet, FFP, cryoprecipitate, storage or obstetric hemorrhage thresholds changed. |
| `theme-25` | Distribution is correct: this module summarizes high-risk values from prior modules without becoming a source inventory. | Reworded the final-review table header and blood-component summary; no repeated clinical value changed. |

Residual result: `theme-21` through `theme-25` now use more professional reader-facing language while preserving source-marked dose/threshold content. Remaining issues are local formulary/SOP validation and future source-verified completion, not editorial blockers.

## Detailed Pass 6 - Cross-Cutting Editorial Sweep

Scope: residual wording across all numbered modules after the module-by-module audit.

| Area | Finding | Action |
| --- | --- | --- |
| Anticoagulation and neuraxial wording | A few lines still used conversational markers such as `на глаз` and `как минимум помнить`. | Reworded into documented-interval and minimum-safety language; no anticoagulant interval changed. |
| Recovery and pediatric wording | Several lines used informal `разбудить`, `импровизация`, `обычному уровню` phrasing. | Reworded into пробуждение/исходный возрастной уровень/локальный протокол language; no recovery criterion or pediatric dose changed. |
| Antibiotic, GI and diabetes wording | Residual phrases such as `держать в памяти`, `бездумно`, and quoted informal GI wording were still present. | Reworded into professional antimicrobial, potassium-before-insulin and source-control wording; no antibiotic duration, potassium or insulin value changed. |
| Pediatric sepsis and toxicology wording | Residual phrases such as `не драматично`, `главные решения`, and `поводом к ранней консультации` were too conversational. | Reworded into under-recognized severity, key decisions and consultation-indication language; no sepsis or antidote values changed. |

Residual result: the remaining global wording markers now read as clinical documentation rather than informal study prompts. Future source-verified additions should use the same standard before export or Supabase reseed.

## Follow-up Rules For Future Iterations

- Update this audit whenever a module is edited after source verification or UI-driven formatting changes.
- If a module is deeply restructured, record moved material and whether comments/block keys were preserved.
- Re-run `source:verify`, `content:export`, tests, lint and build before any Supabase update.
- Supabase reseed/update remains a separate user-approved step after the revised Markdown is reviewed.
