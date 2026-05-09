# Krok 3 Curriculum Coverage Map

Primary blueprint: `/Users/qinastha/Downloads/Програма_Крок_3_Анестезiологiя_та_iнтенсивна_терапiя.pdf`, TestCentr, 2026-04-20.

This document is technical project documentation. Do not copy MCP commands, cache rules, local paths, or source inventories into `content/source.md`; that file is reader-facing seed content only.

Scope note: active study content is hospital-stage AIT, starting when the patient reaches the admitting/emergency department, OR, ICU, ward, diagnostic unit, or hospital transfer point. Prehospital triage, field sorting, evacuation logistics, and broad emergency-medicine workflows are intentionally deferred unless the user explicitly requests them.

## Krok 3 Weights

- Preoperative consultation, preparation, and risk assessment - `20%`.
- Anesthetic management and acute postoperative pain treatment - `20%`.
- Postoperative care and acute pain treatment - `10%`.
- Emergency states and perioperative complications - `10%`.
- Intensive care of critically ill adult patients - `10%`.
- Pediatric anesthetic management and intensive care - `30%`.

## Source Priority

- `1. Current МОЗ/ДЭЦ and unified clinical protocols`: normative source for final thresholds, doses, contraindications, and required clinical framing.
- `2. Шлапак`: second-priority explanatory textbook layer for physiology, pharmacology, perioperative reasoning, and learning structure without long copying.
- `3. Trusted narrow sources when МОЗ/ДЭЦ and Шлапак do not cover the point`: OOKB local protocols for practical implementation, SSC/Stanford, professional-society guidelines, regulator labels, and peer-reviewed consensus documents. Always name the source explicitly.

## Reader Modules

- `theme-01` - Preoperative assessment, comorbidity, and individual risk.
- `theme-02` - General anesthesia, TIVA, and procedural sedation.
- `theme-03` - airway management, RSI, and difficult airway algorithms.
- `theme-04` - Regional and neuraxial anesthesia.
- `theme-05` - Peripheral and fascial blocks.
- `theme-06` - Obstetric anesthesia and obstetric critical states.
- `theme-07` - Perioperative and postoperative pain.
- `theme-08` - Monitoring, ventilation, hemodynamics, and neuromuscular relaxation.
- `theme-09` - Infusion therapy, antibiotics, and nutrition.
- `theme-10` - Postoperative care, recovery, PONV, and thromboprophylaxis.
- `theme-11` - CPR, ALS/PALS, and post-ROSC care.
- `theme-12` - Perioperative critical incidents and anaphylaxis.
- `theme-13` - Adult respiratory ICU: ARDS, COPD, PE.
- `theme-14` - Sepsis, septic shock, and ICU infection control.
- `theme-15` - Cardiac ICU, ACS, and hemodynamic shock.
- `theme-16` - Trauma, massive bleeding, burns, and damage control.
- `theme-17` - Neurocritical care, stroke, TBI, coma, and transport.
- `theme-18` - Metabolic, renal/hepatic, GI, electrolyte, and acid-base disorders.
- `theme-19` - Pediatric anesthesia, resuscitation, sepsis, and respiratory support.
- `theme-20` - Operating-room safety and anesthesia safety checklist.
- `theme-21` - Local anesthetics and local anesthetic systemic toxicity.
- `theme-22` - Anesthesia pharmacology: anesthetics, opioids, and neuromuscular blockers.
- `theme-23` - Toxicology and acute poisonings.
- `theme-24` - Transfusion medicine and blood components.
- `theme-25` - Rapid final review and clinical accents.

## Verification Gaps By Reader Module

This section tracks what remains incomplete after the 2026-04-26 risk-first source verification pass and the 2026-05-07 gap-fill pass. Detailed source-by-source decisions live in `docs/source-verification-audit-2026-04-26.md` and `docs/gap-fill-audit-2026-05-07.md`.

| Module | Current status | Dose/threshold gaps | Contraindication gaps | Monitoring/escalation gaps | Population gaps |
| --- | --- | --- | --- | --- | --- |
| `theme-01` | Partial, improved 2026-05-07 wave 2 | renal/hepatic dose-adjustment table | perioperative drug restrictions in CKD/cirrhosis | escalation when preop risk is unstable | obesity, frailty, pregnancy |
| `theme-02` | Partial, improved 2026-05-09 wave 10 | procedural-sedation drug table and exact `TIVA` infusion presets remain local/formulary dependent | asthma/porphyria/drug-label restrictions | MAC/TIVA choice factors added; rescue pathway after oversedation remains local | children, elderly, OSA |
| `theme-03` | Partial, improved 2026-05-08 wave 9 | RSI drug doses remain in the pharmacology module and need a local RSI drug card | awake-airway / failed-airway scenario logic improved; local contraindication card still needed | difficult-airway predictors, adult failed-airway algorithm and obstetric cross-link added; local trolley/eFONA drill remains | pediatric airway detailed in `theme-19`; obstetric detail in `theme-06` |
| `theme-04` | Partial, improved 2026-05-09 wave 11 | neuraxial local-anesthetic dosing remains local/formulary dependent | ASRA antithrombotic intervals added; local urgent-surgery policy still needed | high/total spinal, compressive neuraxial lesion and `PDPH` recognition added; local MRI/neurosurgery route and observation form remain | obstetric neuraxial |
| `theme-05` | Partial, improved 2026-05-09 wave 12 | block-specific LA maximums remain local/formulary dependent; theme 21 has common-agent maximum anchors | deep/compressible-site anticoagulation decision frame added; department classification still local | peripheral catheter observation sheet added; local pump form and observation frequency remain | pregnancy, low body weight and hepatic dysfunction |
| `theme-06` | Partial, improved 2026-05-07 | local component/MTP card, drug concentrations | old protocol items needing current confirmation | local massive obstetric hemorrhage escalation | fetal/neonatal handoff and preeclampsia variants |
| `theme-07` | Partial, improved 2026-05-08 wave 8 | exact systemic-analgesic dose regimens remain local-formulary dependent | analgesic safety limits and PCA/PCEA red flags added | PCA/PCEA checklist added; acute-pain service contact/escalation still local | children, elderly, CKD/cirrhosis |
| `theme-08` | Partial, improved 2026-05-09 wave 10 | vasoactive and neuromuscular monitoring thresholds | device/probe limitations | BIS/MAC depth-monitoring frame added; FoCUS visual atlas and local awareness workflow remain | pediatric equipment |
| `theme-09` | Partial, improved 2026-05-09 wave 10 | adult maintenance/resuscitation/GDFT frame added; renal antibiotic adjustment remains | renal antibiotic dosing | stewardship stop/de-escalation; local GDFT monitor/target documentation remains | obesity, CKD, sepsis |
| `theme-10` | Partial, improved 2026-05-09 wave 13 | operation-specific thromboprophylaxis table | pregnancy/pediatric PONV formulary and neuraxial restriction policy | PACU recovery monitoring and failed-discharge escalation added; local ICU/surgeon acceptance route remains | pediatrics, OSA |
| `theme-11` | Covered for existing source material, refreshed 2026-05-09 wave 14 | CPR drug/energy values checked against MOH/DEC `ГС 2024-1259-1/-2`; periodic refresh still required | none identified in current pass | post-ROSC oxygenation/ventilation/hemodynamic/temperature/glucose targets added; local destination/CT/cath/ECMO route still needs map | neonatal details remain in `theme-19` |
| `theme-12` | Partial, improved 2026-05-07 | perioperative adrenaline and dantrolene inserted; crisis-cart concentrations local | MH triggers/dantrolene covered, drug availability local | local crisis-cart drug map | pregnancy, children |
| `theme-13` | Partial, improved 2026-05-09 wave 15 | PE reperfusion/RV-support table added; exact catheter/ECMO route remains local | NIV/intubation cautions improved for PE; COPD detail still source-refreshable | local transport team/equipment checklist and ECMO-call workflow | COPD hypercapnia, pregnancy |
| `theme-14` | Covered for existing source material, improved 2026-05-07 wave 3 | antimicrobial dosing and renal adjustment | source-control limitation table added; local empiric schemas remain | local sepsis bundle timing and huddle workflow | pediatric sepsis separated |
| `theme-15` | Partial, improved 2026-05-07 wave 7 | exact vasoactive concentrations/rates and transplant ICU doses remain local | post-transplant drug interactions | `SCAI` staging and `MINS` monitoring added; local shock-team/PCI/MCS/transplant-center routes remain | renal failure, pregnancy |
| `theme-16` | Partial, improved 2026-05-07 wave 6 | burn resuscitation formulas, urine-output targets and hypothermia thresholds added; local component dosing remains | TXA/anticoagulant reversal limits | MTP activation, burn-center transfer and warming ownership remain local | children, pregnancy, TBI |
| `theme-17` | Partial, improved 2026-05-07 wave 5 | TBI osmotherapy/BP/ventilation/status tables added; anticoagulant reversal doses still need source pass | thrombolysis/anticoagulation exclusions | local ICU/CT/neurosurgery route and continuous EEG access remain open | pediatric neurocritical care |
| `theme-18` | Partial, improved 2026-05-09 wave 18 | DKA already МОЗ-framed; urgent `K`, symptomatic `Na`, Ca/Mg/P and refeeding guardrails added | renal/hepatic medication cautions | dialysis/RRT triggers added; local nephrology/pharmacy/nutrition pathway remains open | pediatric DKA, pregnancy |
| `theme-19` | Partial, improved 2026-05-07 | pediatric airway/fluid frame added; antibiotic and ventilator settings local | airway/drug age restrictions need local card | transport and post-resuscitation route | neonates vs infants vs older children |
| `theme-20` | Covered for existing source material | none for checklist itself | none for checklist itself | local storage/signature workflow | none identified |
| `theme-21` | Partial, improved 2026-05-07 | LA maximum-dose table added for common agents; mепивакаин/прилокаин local | pregnancy/cardiac/hepatic cautions added but need local max-dose card | local LAST kit algorithm | children and low body weight |
| `theme-22` | Partial, improved 2026-05-09 wave 17 | opioid/NMBA label-dose anchors added; local pump/formulary chart still required | thiopental/MH/drug-label restrictions improved | MH cart, dantrolene stock and exact local drug concentrations remain local | children, pregnancy, obesity, shock |
| `theme-23` | Partial, improved 2026-05-07 | ECTR criteria added; local antidote availability unresolved | mixed-poisoning cautions remain | toxicologist/poison-center escalation local | children and pregnancy |
| `theme-24` | Partial, improved 2026-05-09 wave 16 | component-dose guardrails added; actual OOKB component volume and ml/kg policy remain local | reaction recognition added, contraindication nuance local | hemovigilance/local blood-bank route | pediatrics, obstetrics, massive bleeding |
| `theme-25` | Partial | summary must be refreshed after dose tables | inherits unresolved source gaps | inherits unresolved escalation gaps | inherits pediatric/pregnancy gaps |

## Detailed Krok Mapping

| Code | Krok item | Reader module | Coverage status |
| --- | --- | --- | --- |
| `1.0.0.0` | Preoperative consultation, preparation, and risk assessment | `theme-01` | Partial |
| `1.1.0.0` | Preoperative exam and individual risk | `theme-01` | Partial |
| `1.1.1.0` | Airway assessment | `theme-01`, `theme-03` | Partial |
| `1.2.0.0` | Cardiovascular disease risk | `theme-01`, `theme-15` | Partial |
| `1.3.0.0` | Diabetes assessment and preparation | `theme-01`, `theme-18` | Covered for existing source material |
| `1.4.0.0` | Chronic respiratory disease anesthesia planning | `theme-01`, `theme-13` | Partial |
| `1.5.0.0` | Renal and hepatic dysfunction | `theme-01`, `theme-18` | Partial |
| `1.6.0.0` | Thrombosis risk | `theme-01`, `theme-10` | Partial |
| `1.7.0.0` | PONV management | `theme-01`, `theme-10` | Partial |
| `2.0.0.0` | Anesthetic management and acute postoperative pain | `theme-02`, `theme-07` | Partial |
| `2.1.0.0` | Low-flow inhalational anesthesia | `theme-02`, `theme-22` | Partial |
| `2.1.1.0` | Inhalational anesthetic PK/PD | `theme-02`, `theme-22` | Partial |
| `2.2.0.0` | TIVA | `theme-02`, `theme-22` | Partial |
| `2.2.1.0` | IV anesthetic PK/PD | `theme-02`, `theme-22` | Partial |
| `2.2.2.0` | Rapid sequence induction | `theme-03` | Partial |
| `2.3.0.0` | Systemic perioperative analgesia | `theme-02`, `theme-07` | Partial |
| `2.3.1.0` | NSAIDs, paracetamol, metamizole | `theme-07` | Partial |
| `2.3.2.0` | Opioids | `theme-07`, `theme-22` | Partial |
| `2.3.3.0` | Opioid-sparing strategy and adjuvants | `theme-07`, `theme-22` | Partial |
| `2.4.0.0` | Neuraxial and regional anesthesia | `theme-04`, `theme-05`, `theme-21` | Partial |
| `2.4.1.0` | Epidural, spinal, and CSE anesthesia | `theme-04`, `theme-21` | Partial |
| `2.4.2.0` | Labor analgesia and C-section | `theme-06`, `theme-04`, `theme-21` | Covered for existing source material |
| `2.4.3.0` | Upper-limb peripheral nerve blocks | `theme-05`, `theme-21` | Partial |
| `2.4.4.0` | Lower-limb peripheral nerve blocks | `theme-05`, `theme-21` | Partial |
| `2.4.5.0` | Trunk, chest, and abdominal blocks | `theme-05`, `theme-21` | Partial |
| `2.5.0.0` | Respiratory, hemodynamic, depth, and relaxation monitoring | `theme-08`, `theme-20` | Partial |
| `2.5.1.0` | Respiratory-complication risk management | `theme-08`, `theme-13` | Partial |
| `2.5.1.1` | Perioperative respiratory support | `theme-08`, `theme-13` | Partial |
| `2.5.2.0` | Advanced hemodynamic monitoring | `theme-08`, `theme-15` | Partial |
| `2.5.2.1` | Perioperative cardiac/hemodynamic ultrasound | `theme-08`, `theme-15` | Partial |
| `2.5.3.0` | Depth and neuromuscular relaxation monitoring | `theme-08`, `theme-22` | Partial |
| `2.6.0.0` | Perioperative infusion therapy | `theme-09` | Partial |
| `2.6.1.0` | GDFT, fluid responsiveness, hypothermia prevention | `theme-09`, `theme-16` | Partial |
| `2.6.2.0` | Blood management, bleeding, transfusion, coagulopathy | `theme-16`, `theme-24`, `theme-06` | Covered |
| `2.7.0.0` | Perioperative antibiotic prophylaxis | `theme-09`, `theme-14` | Partial |
| `3.0.0.0` | Postoperative care and acute pain | `theme-10`, `theme-07` | Partial |
| `3.1.0.0` | Pain assessment and multimodal analgesia | `theme-07` | Partial |
| `3.1.1.0` | Pain exam and analgesia effectiveness | `theme-07` | Partial |
| `3.1.2.0` | Systemic analgesia and PCA | `theme-07` | Partial |
| `3.2.0.0` | Prolonged neuraxial/regional techniques | `theme-04`, `theme-05`, `theme-07` | Partial |
| `3.2.1.0` | Catheter analgesia safety | `theme-04`, `theme-05`, `theme-07`, `theme-10` | Partial |
| `3.2.2.0` | Regional/neuraxial complications and LAST | `theme-04`, `theme-05`, `theme-12`, `theme-21` | Partial |
| `3.3.0.0` | Perioperative thromboprophylaxis | `theme-10` | Partial |
| `3.4.0.0` | Perioperative nutritional support | `theme-09` | Covered |
| `4.0.0.0` | Emergency states and perioperative complications | `theme-11`, `theme-12` | Partial |
| `4.1.0.0` | Perioperative anaphylaxis | `theme-12` | Covered for existing source material |
| `4.2.0.0` | Difficult airway management | `theme-03`, `theme-12` | Partial |
| `4.3.0.0` | Massive bleeding | `theme-06`, `theme-16`, `theme-24` | Covered |
| `4.4.0.0` | Perioperative myocardial injury and ACS | `theme-12`, `theme-15` | Partial |
| `4.5.0.0` | Other critical incidents | `theme-12`, `theme-20`, `theme-21`, `theme-22`, `theme-23` | Partial |
| `4.6.0.0` | Adult ALS and CPR | `theme-11` | Covered |
| `5.0.0.0` | Adult ICU | `theme-13` through `theme-18`, `theme-23`, `theme-24` | Partial |
| `5.1.0.0` | Respiratory failure | `theme-13` | Partial |
| `5.1.1.0` | ARDS | `theme-13` | Partial |
| `5.1.2.0` | COPD respiratory support | `theme-13` | Covered for existing source material |
| `5.1.3.0` | Pulmonary embolism | `theme-13` | Covered for existing source material |
| `5.1.4.0` | Lung ultrasound for respiratory failure | `theme-13` | Partial |
| `5.2.0.0` | Sepsis and septic shock | `theme-14` | Covered for existing source material |
| `5.3.0.0` | Acute bowel obstruction | `theme-18` | Partial |
| `5.3.1.0` | Electrolyte and acid-base disorders | `theme-18` | Partial |
| `5.4.0.0` | ACS, AMI, cardiogenic shock | `theme-15` | Partial |
| `5.4.1.0` | TTE cardiac protocols | `theme-15` | Partial |
| `5.5.0.0` | Polytrauma and neurologic disorders | `theme-16`, `theme-17` | Partial |
| `5.5.1.0` | Mass-casualty triage | `theme-16` | Out of current scope except hospital intake framing |
| `5.5.2.0` | Stroke, TBI, coma | `theme-17` | Partial |
| `5.5.3.0` | Transport of ventilated ICU patients | `theme-13`, `theme-17` | Partial |
| `5.6.0.0` | ICU after heart/lung transplantation | `theme-15` | Partial |
| `6.0.0.0` | Pediatric anesthesia and ICU | `theme-19` | Partial |
| `6.1.0.0` | Initial critical pediatric assessment | `theme-19` | Partial |
| `6.1.1.0` | Newborn resuscitation | `theme-19` | Covered |
| `6.2.0.0` | Pediatric anesthesia | `theme-19` | Partial |
| `6.3.0.0` | Acute pediatric pain | `theme-07`, `theme-19` | Partial |
| `6.4.0.0` | Pediatric sepsis | `theme-19` | Partial |
| `6.5.0.0` | Pediatric respiratory support | `theme-19` | Partial |

## Source Inventory Moved Out Of `source.md`

Official МОЗ/ДЭЦ sources currently represented in the study content:

- CKD V with hemodialysis/peritoneal dialysis - `ГС 2016-89`, current in DEC registry.
- Cirrhosis and cirrhosis complications - `МОЗ 2024-1734`, `ГС 2024-1734-1`, `ГС 2024-1734-2`, `КН 2024-1734`, current in DEC registry.
- MOH/DEC `ГС 2024-1259-1/-2` CPR standards for children and adults, 2024-07-18.
- ICU nutritional support - `ГС 2025-1262`, 2025-08-09.
- Adult cachexia nutritional support - `ГС 2024-1601`, 2024-09-17.
- Pregnancy nausea/vomiting and hyperemesis gravidarum - `ГС 2025-667`, 2025-04-17.
- Cesarean section - `ГС 2022-8`, 2022-01-05.
- Hypertensive disorders in pregnancy - `ГС 2022-151`, 2022-01-24.
- Obstetric hemorrhage - order `205/2014`, 2014-03-24.
- Operating-room anesthesia safety checklist - Order `110/2012`, updated by `1614/2021`, form `008/о`, point `11`.
- Toxicology - order `435/2006`, 2006-07-03; the Rada record marks it as no longer valid from 2023-09-01, so it is historical study context unless replaced by a current source.
- Combat trauma packages - orders `714/2024`, `1237/2024`, `253/2025`, `856/2025`, `1555/2025`.
- Burns - `ГС 2024-1869`, order `МОЗ №1869` from 2024-11-06; active standard for noncombat burn care, including fluid calculation, airway, infection prevention and nutrition.
- Combat trauma hypothermia - `ГС 2025-1555-1`, order `МОЗ №1555` from 2025-10-13; active protocol based on JTS CPG 2023, including stage 2/3 warming and warmed blood/fluids.
- Combat trauma burns - `ГС 2025-1555-4`, order `МОЗ №1555` from 2025-10-13; active protocol based on JTS Burn Care CPG, used as combat-trauma supplement to `ГС 2024-1869`.
- WHO 2024 burn mass-casualty standards and Merck Manual Professional burns chapter - Parkland/Baxter formula as an additional study option only; primary Ukrainian-standard calculation remains `ГС 2024-1869`.
- Traumatic hemorrhagic shock - `ГС 2022-1192`, 2022-07-11.
- Ischemic stroke - `ГС 2024-1070`, 2024-06-20.
- Hemorrhagic stroke / spontaneous intracerebral hemorrhage - `ГС 2022-09`, 2022-01-05; older `ГС 2014-275`, 2014-04-17.
- Arterial hypertension - `ГС 2024-1581`, 2024-09-12.
- Ambulatory dental anesthesia - `ГС 2025-555`, 2025-03-27.
- Drug allergy including anaphylaxis - `ГС 2015-916`, 2015-12-30.
- Rational antibacterial and antifungal use - `ГС 2023-1513`, 2023-08-23.
- Parenteral perioperative antibiotic prophylaxis - `ГС 2026-540`, 2026-04-23.
- Adult type 2 diabetes - `ГС 2024-1300`, 2024-07-24, with 2024 updates.
- Adult type 1 diabetes - `ГС 2023-151`, 2023-01-26.
- Pediatric diabetes - `ГС 2023-413`, 2023-02-28.
- Initial, resuscitation, and post-resuscitation care for newborns - `ГС 2025-536`, 2025-03-26.
- COPD - `ГС 2024-1610`, 2024-09-20.
- STEMI - `ГС 2021-1936`, 2021-09-14.
- NSTEMI/ACS without ST elevation - `ГС 2021-1957`, 2021-09-15.

International/reference sources:

- Surviving Sepsis Campaign 2021.
- Surviving Sepsis Campaign 2026.
- JAMA synopsis `Caring for Adult Patients With Sepsis`, 2026-03-26.
- Stanford Emergency Manual, version `4.4`, 2022.
- OOKB perioperative emergency checklists, planned review August 2028, based on Stanford Emergency Manual `4.4`; used for local crisis-role framing, perioperative anaphylaxis, malignant hyperthermia, high spinal block, and transfusion-reaction first steps.
- ASRA LAST checklist, 2020, for lipid rescue and modified resuscitation in local anesthetic systemic toxicity.
- DailyMed lidocaine, bupivacaine, ropivacaine, and articaine labels, used for maximum-dose anchors in `theme-21`; local formulary limits remain required before bedside use.
- DailyMed propofol, ketamine, etomidate, thiopental, succinylcholine, rocuronium, sugammadex, naloxone, fentanyl, morphine, nalbuphine, vecuronium, cisatracurium, and neostigmine labels, used for source-marked pharmacology dose rows in `theme-22`.
- MHAUS and European Malignant Hyperthermia Group for malignant-hyperthermia trigger lists and non-triggering anesthetic framing.
- ASA 2022 difficult airway guideline, used for multifeature airway assessment, awake airway decision points, attempt limitation and emergency invasive airway preparation in `theme-03`.
- DAS 2025 unanticipated difficult intubation guideline, used for adult hospital `Plan A/B/C/D`, oxygenation-first crisis framing, waveform capnography and `eFONA` escalation in `theme-03`.
- OAA/DAS 2015 obstetric failed-intubation guideline, used narrowly for the hospital algorithm in `theme-06` and the airway cross-link in `theme-03` where current local/MOH text is not enough.
- Order `435/2006` remains historical toxicology context in `theme-23`; the Rada record marks it invalid from `2023-09-01`.
- The `theme-23` antidote table is now practical rather than `435/2006`-only. Naloxone, flumazenil, N-acetylcysteine, methylene blue, hydroxocobalamin, fomepizole, and pralidoxime use current DailyMed labels where no active Ukrainian source is represented; lipid emulsion uses ASRA LAST 2020.
- In `theme-23`, hydroxocobalamin, fomepizole, pralidoxime, and lipid emulsion require separate current sources and are not attributed to order `435/2006`.
- EXTRIP Workgroup recommendations, used for extracorporeal elimination triggers in lithium, methanol, ethylene glycol, salicylate, and valproate poisoning.
- AABB 2023 RBC transfusion guideline; AABB/ICTMG 2025 platelet transfusion guideline; NICE NG24 blood transfusion guidance for FFP and cryoprecipitate thresholds.
- NICE NG24 and AABB transfusion-reaction/hemovigilance reference material, used as an international safety layer for transfusion reaction recognition and first response in `theme-24`.
- Surviving Sepsis Campaign Pediatric Guidelines 2026, used for pediatric sepsis where no current Ukrainian pediatric-sepsis standard is available in the DEC registry.
- KDIGO 2024 CKD Guideline, used for renal-risk framing and medication stewardship where Ukrainian material is not perioperative-specific.
- American Society of Hematology 2019 VTE prevention guideline for hospitalized surgical patients, used for perioperative thromboprophylaxis where no direct МОЗ perioperative prophylaxis standard is represented yet.
- ASRA Pain Medicine 2025 antithrombotic/neuraxial guideline, used for the safety link between thromboprophylaxis and regional/neuraxial techniques.
- ASRA Pain Medicine 2025 antithrombotic/regional guideline, used specifically for neuraxial, deep plexus, and deep peripheral block safety framing.
- ASRA 2025 deep plexus/deep peripheral block safety application, used in `theme-05` to separate deep/noncompressible techniques from superficial compressible peripheral blocks.
- ASRA Practice Advisory on Neurologic Complications in Regional Anesthesia and Pain Medicine, used for urgent recognition, imaging and neurosurgical consultation when neuraxial compressive lesions are suspected.
- ASA 2021 statement on post-dural puncture headache management, used for `PDPH` follow-up within 24 hours, differential diagnosis, conservative therapy and epidural blood patch decision framing.
- Supplemental LP antithrombotic table from user-provided image `антикоагулянты.jpg`, added as an English study table for single uncomplicated lumbar puncture only; it does not replace ASRA 2025 or local SOP for epidural/spinal anesthesia, catheters, traumatic puncture, or deep blocks.
- Fifth Consensus Guidelines for PONV 2025 executive summary, Fourth Consensus Guidelines for PONV 2020, and the original Apfel simplified risk score for `PONV` risk stratification and rescue/prophylaxis framing.
- DailyMed antiemetic labels for ondansetron, droperidol, metoclopramide, and scopolamine, used for practical adult `PONV` doses and contraindication anchors.
- ESICM 2023 ARDS guideline, ATS/ESICM/SCCM ARDS mechanical-ventilation guidance, and the ATS 2024 ARDS guideline update, used for adult hospital ICU `ARDS` respiratory-support framing where no direct adult МОЗ ARDS standard is represented.
- ARDSNet and EOLIA criteria, used as a practical study layer for `PEEP/FiO2` orientation and early `VV-ECMO` referral triggers in severe refractory `ARDS`; not treated as a local ECMO acceptance SOP.
- Surviving Sepsis Campaign Adult Guidelines 2026, used for adult hospital sepsis source-control timing, antimicrobial stewardship, de-escalation, beta-lactam prolonged infusion, and respiratory-support statements in sepsis-associated `ARDS`.
- OOKB 2025 pulmonary embolism protocol and ESC/ERS 2019 PE guideline, used for `theme-13` high-risk PE, reperfusion, anticoagulation, RV-support and respiratory-support framing. The local protocol's 2023 ESC bibliographic line needs future correction, so ESC/ERS 2019 is the verified external source.
- Volpicelli et al. 2012 international evidence-based recommendations for point-of-care lung ultrasound and BLUE-protocol literature, used for hospital ED/ICU respiratory-failure ultrasound framing.
- ICS/FICM 2019 guidance on transfer of the critically ill adult and BJA Education transfer review, used for hospital-stage transport of ventilated critically ill patients.
- Via et al. 2014 international evidence-based recommendations for focused cardiac ultrasound, used for `FoCUS` as a limited clinician-performed cardiac ultrasound framework in emergency, ICU, and perioperative instability.
- Focused Intensive Care Echo (`FICE`) literature, including Hall et al. 2017, used for ICU shock-oriented echo windows, clinical usefulness, and the limitation that many patients still need expert echocardiography.
- Perioperative `FoCUS` literature, used for pre-induction screening of high-risk patients and post-induction/PACU hemodynamic instability framing.
- Association of Anaesthetists 2021 monitoring guideline and OOKB monitoring protocol 2025, used for processed EEG/BIS, MAC, capnography, neuromuscular and basic monitoring framing in `theme-08`.
- ASA Standards for Postanesthesia Care 2024, used for `PACU`/equivalent-area admission, handover, continuous recovery evaluation, written record and discharge-responsibility framing in `theme-10`.
- OOKB sedation protocol 2025 (`Новий_клінічний_протокол_Седація_при_ЕФГДС_2025.docx`), used for local `PADSS`, `Aldrete`, recovery monitoring and 24-hour post-sedation restrictions in `theme-10`.
- DailyMed sevoflurane and desflurane labels, used for age-related MAC changes, N2O/opioid/benzodiazepine MAC reduction, pediatric desflurane cautions and sevoflurane uterine-relaxation caution in `theme-02`.
- NICE CG174 intravenous fluid therapy in adults in hospital, last updated 2017, used for the adult `5R`, maintenance, resuscitation bolus and chloride-monitoring frame in `theme-09`. It does not cover pregnant patients, severe renal/liver disease, diabetes or burns.
- POQI 2024 perioperative fluid management recommendations and POQI 2020 fluid responsiveness consensus, used for perioperative `GDFT`, fluid responsiveness and the warning that response to fluid is not the same as indication for fluid.
- SCAI SHOCK Stage Classification Expert Consensus Update 2022 and SCAI bedside checklist, used for cardiogenic-shock A-E staging and escalation language.
- ESC 2022 non-cardiac surgery guideline, used for high-risk postoperative `hs-cTnT/hs-cTnI` monitoring at `24` and `48` hours and preoperative `BNP/NT-proBNP` risk framing.
- Canadian Cardiovascular Society 2017 perioperative cardiac risk guideline, used for daily postoperative troponin surveillance for `48-72` hours in defined high-risk patients.
- ISHLT Guidelines for the Care of Heart Transplant Recipients, published 2022 / JHLT 2023, used for early postoperative heart-transplant ICU framing, monitoring, perioperative care, immunosuppression/rejection, and prophylaxis categories where no current МОЗ/Шлапак transplant ICU material is represented.
- ISHLT Summary of the Consensus Conference on Graft Dysfunction within the First 72 hours after Heart Transplantation, 2026, used for updated first-72-hour heart `PGD` framing and the note that practice remains center-specific.
- ISHLT Working Group on Primary Lung Graft Dysfunction, 2016 consensus published 2017, used for lung-transplant `PGD` definition/grading context and early `24/48/72 h` surveillance framing.
- ISHLT-endorsed consensus recommendations for maintenance immunosuppression in solid organ transplantation, 2022, used for the principle that immunosuppression continuity and drug-interaction stewardship must be handled with transplant-team involvement.
- Local/UKP source `Protokol-peryoperatsijnogo-znebolennya.docx` (`Контроль періопераційного болю`, 2016), used for hospital postoperative-pain organization, pain-score targets, reassessment frequency, multimodal analgesia, `PCA/PCEA`, and catheter-analgesia monitoring. The file has an incomplete order number in the local copy; active legal status and drug-dose details require DEC/local-formulary verification before being treated as current clinical instructions.
- Local/UKP source `Protokol-peryoperatsijnogo-znebolennya.docx` table material, used for `CPNB` catheter locations, wound infiltration, and peripheral-catheter analgesia examples. Doses are treated as study/reference material until local formulary verification.
- ASA 2012 acute pain guideline, used as an international professional layer for multimodal perioperative acute-pain management, institutional policies, patient education and PCA/neuraxial monitoring principles.
- FDA acetaminophen safety page and current DailyMed analgesic labels, used for adult acetaminophen ceiling and safety limits for morphine, fentanyl, tramadol, ketorolac, ketamine and dexmedetomidine.
- FDA 2019 gabapentinoid safety communication, used for respiratory-depression risk with gabapentin/pregabalin in older adults, respiratory disease and co-prescription with opioids/CNS depressants.
- EMA 2024 metamizole safety measures, used for agranulocytosis warning, symptom-triggered CBC and high-risk contraindication framing.
- МОЗ/ДЭЦ `ГС 2024-1237-3` / order `№1237` severe head injury combat-trauma protocol, used for hospital-stage TBI GCS classification, neuro-resuscitation targets, osmotherapy doses, seizure prophylaxis/treatment options, and transport/aeromedical cautions. It is an active Ukrainian protocol translated from JTS and should be adapted to civilian OIT resources.
- Brain Trauma Foundation Guidelines for the Management of Severe TBI, 4th edition, used as cross-check for SBP, ICP, CPP, steroid, seizure-prophylaxis and ventilation cautions.
- American Epilepsy Society 2016 convulsive status epilepticus guideline and algorithm, used for time-based status phases and adult/general first-/second-line dosing where no current Ukrainian status-epilepticus dosing standard is represented.
- WSES Bologna guidelines for adhesive small bowel obstruction, 2017 update published in 2018, used for hospital-stage acute bowel obstruction framing: non-operative trial boundaries, `NPO`, gastric/intestinal decompression, fluids/electrolytes, CT triggers, and urgent surgery signals. It is not a Ukrainian МОЗ standard.
- UK Kidney Association Hyperkalaemia Guideline, October 2023, used for adult hospital hyperkalaemia severity, ECG/monitoring, myocardial protection, potassium shifting/removal, and post-insulin glucose safety framing where no current МОЗ electrolyte standard is represented.
- European Clinical Practice Guideline on Hyponatraemia, 2014, used for symptom-oriented sodium correction and safe correction-rate limits where no current МОЗ hyponatraemia standard is represented.
- KDIGO Clinical Practice Guideline for Acute Kidney Injury, 2012, used for urgent RRT escalation principles in AKI: life-threatening fluid/electrolyte/acid-base changes and clinical trends rather than isolated urea/creatinine thresholds. The 2026 KDIGO AKI/AKD update is still public-review draft material and is not treated as final guidance in `source.md`.
- NICE CG32 Nutrition support for adults, published 2006 / last updated 2017, used for adult refeeding-risk criteria, cautious caloric start, thiamine and likely K/phosphate/Mg requirements in `theme-18`; it is not a Ukrainian МОЗ standard and local nutrition-team orders remain required.
- Merck Manual Professional hypocalcemia, hypomagnesemia and hypophosphatemia chapters, reviewed/modified in 2025, used for narrow adult Ca/Mg/P replacement guardrails in `theme-18` where no current Ukrainian electrolyte SOP is represented.
- Endocrine Society 2022 Hypercalcemia of Malignancy guideline, used for severe hypercalcemia of malignancy threshold and initial antiresorptive/calcitonin framing in `theme-18`.
- Шлапак, `Анестезіологія та інтенсивна терапія`, volumes 1-2. Tome 1 is used for regional-anesthesia principles, ultrasound/neurostimulation nerve localization, infiltration anesthesia, examples of upper/lower-limb peripheral blocks, water-electrolyte disorders, sodium/potassium abnormalities, acid-base interpretation, and perioperative electrolyte testing indications.
- MSD/Merck Manual Professional acid-base disorder chapters, reviewed/revised in 2025, used as a narrow trusted source for acid-base classification, compensation checks, Winter formula, anion gap, delta gap, and mixed-disorder framing when local МОЗ/ДЭЦ materials do not provide a dedicated ICU interpretation algorithm.

Local source files:

- `/Users/qinastha/Downloads/Учеба/Анест/Клінічний_протокол_Моніторинг_2025.docx`
- `/Users/qinastha/Downloads/Учеба/Анест/Новий_клінічний_протокол_Седація_при_ЕФГДС_2025.docx`
- `/Users/qinastha/Downloads/Учеба/Анест/Чек_листи_Невідкладні_стани_в_анестезіології_2025.docx`
- `/Users/qinastha/Downloads/Учеба/Анест/Клінічний протокол Сепсис СШ 2024.docx`
- `/Users/qinastha/Downloads/Учеба/Анест/Клінічний протокол ТЕЛА 2025.docx`
- `/Users/qinastha/Downloads/Учеба/Анест/Protokol-peryoperatsijnogo-znebolennya.docx`
- `/Users/qinastha/Downloads/Учеба/Анест/Шлапак - анестезіологія. Том 1.pdf`
- `/Users/qinastha/Downloads/Учеба/Анест/Шлапак - анестезіологія. Том 2.pdf`

## Update Rule

`content/source.md` should contain only reader-facing study content. Keep technical workflow notes, source inventories, local paths, cache/revalidation details, and MCP instructions in documentation. After user review, generate the Markdown payload and apply it with Supabase MCP according to `docs/mcp-content-update-guide.md`.
