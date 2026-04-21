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
- `theme-03` - Airway, RSI, and difficult airway.
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
- `theme-25` - Rapid final review and oral-answer template.

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
- CPR in adults and children - `ГС 2024-1259`, 2024-07-18.
- ICU nutritional support - `ГС 2025-1262`, 2025-08-09.
- Adult cachexia nutritional support - `ГС 2024-1601`, 2024-09-17.
- Pregnancy nausea/vomiting and hyperemesis gravidarum - `ГС 2025-667`, 2025-04-17.
- Cesarean section - `ГС 2022-8`, 2022-01-05.
- Hypertensive disorders in pregnancy - `ГС 2022-151`, 2022-01-24.
- Obstetric hemorrhage - order `205/2014`, 2014-03-24.
- Operating-room anesthesia safety checklist - Order `110/2012`, updated by `1614/2021`, form `008/о`, point `11`.
- Toxicology - order `435/2006`, 2006-07-03; the Rada record marks it as no longer valid from 2023-09-01, so it is historical study context unless replaced by a current source.
- Combat trauma packages - orders `714/2024`, `1237/2024`, `253/2025`, `856/2025`, `1555/2025`.
- Traumatic hemorrhagic shock - `ГС 2022-1192`, 2022-07-11.
- Ischemic stroke - `ГС 2024-1070`, 2024-06-20.
- Hemorrhagic stroke / spontaneous intracerebral hemorrhage - `ГС 2022-09`, 2022-01-05; older `ГС 2014-275`, 2014-04-17.
- Arterial hypertension - `ГС 2024-1581`, 2024-09-12.
- Ambulatory dental anesthesia - `ГС 2025-555`, 2025-03-27.
- Drug allergy including anaphylaxis - `ГС 2015-916`, 2015-12-30.
- Rational antibacterial and antifungal use - `ГС 2023-1513`, 2023-08-23.
- Parenteral perioperative antibiotic prophylaxis - `ГС 2022-822`, 2022-05-17.
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
- ASRA LAST checklist, 2020, for lipid rescue and modified resuscitation in local anesthetic systemic toxicity.
- MHAUS and European Malignant Hyperthermia Group for malignant-hyperthermia trigger lists and non-triggering anesthetic framing.
- Order `435/2006` is the source for the toxicology antidote table in `theme-20`; it is historical because the Rada record marks it invalid from `2023-09-01`, but it remains useful for study comparison.
- In `theme-20`, hydroxocobalamin, fomepizole, pralidoxime, and lipid emulsion are not treated as order `435/2006` antidotes; if restored later, each needs a separate current source and local availability check.
- AABB 2023 RBC transfusion guideline; AABB/ICTMG 2025 platelet transfusion guideline; NICE NG24 blood transfusion guidance for FFP and cryoprecipitate thresholds.
- Surviving Sepsis Campaign Pediatric Guidelines 2026, used for pediatric sepsis where no current Ukrainian pediatric-sepsis standard is available in the DEC registry.
- KDIGO 2024 CKD Guideline, used for renal-risk framing and medication stewardship where Ukrainian material is not perioperative-specific.
- American Society of Hematology 2019 VTE prevention guideline for hospitalized surgical patients, used for perioperative thromboprophylaxis where no direct МОЗ perioperative prophylaxis standard is represented yet.
- ASRA Pain Medicine 2025 antithrombotic/neuraxial guideline, used for the safety link between thromboprophylaxis and regional/neuraxial techniques.
- ASRA Pain Medicine 2025 antithrombotic/regional guideline, used specifically for neuraxial, deep plexus, and deep peripheral block safety framing.
- Fifth Consensus Guidelines for PONV 2025 executive summary, Fourth Consensus Guidelines for PONV 2020, and the original Apfel simplified risk score for `PONV` risk stratification and rescue/prophylaxis framing.
- ESICM 2023 ARDS guideline and ATS/ESICM/SCCM ARDS mechanical-ventilation guidance, used for adult hospital ICU `ARDS` respiratory-support framing where no direct adult МОЗ ARDS standard is represented.
- Volpicelli et al. 2012 international evidence-based recommendations for point-of-care lung ultrasound and BLUE-protocol literature, used for hospital ED/ICU respiratory-failure ultrasound framing.
- ICS/FICM 2019 guidance on transfer of the critically ill adult and BJA Education transfer review, used for hospital-stage transport of ventilated critically ill patients.
- Via et al. 2014 international evidence-based recommendations for focused cardiac ultrasound, used for `FoCUS` as a limited clinician-performed cardiac ultrasound framework in emergency, ICU, and perioperative instability.
- Focused Intensive Care Echo (`FICE`) literature, including Hall et al. 2017, used for ICU shock-oriented echo windows, clinical usefulness, and the limitation that many patients still need expert echocardiography.
- Perioperative `FoCUS` literature, used for pre-induction screening of high-risk patients and post-induction/PACU hemodynamic instability framing.
- ISHLT Guidelines for the Care of Heart Transplant Recipients, published 2022 / JHLT 2023, used for early postoperative heart-transplant ICU framing, monitoring, perioperative care, immunosuppression/rejection, and prophylaxis categories where no current МОЗ/Шлапак transplant ICU material is represented.
- ISHLT Summary of the Consensus Conference on Graft Dysfunction within the First 72 hours after Heart Transplantation, 2026, used for updated first-72-hour heart `PGD` framing and the note that practice remains center-specific.
- ISHLT Working Group on Primary Lung Graft Dysfunction, 2016 consensus published 2017, used for lung-transplant `PGD` definition/grading context and early `24/48/72 h` surveillance framing.
- ISHLT-endorsed consensus recommendations for maintenance immunosuppression in solid organ transplantation, 2022, used for the principle that immunosuppression continuity and drug-interaction stewardship must be handled with transplant-team involvement.
- Local/UKP source `Protokol-peryoperatsijnogo-znebolennya.docx` (`Контроль періопераційного болю`, 2016), used for hospital postoperative-pain organization, pain-score targets, reassessment frequency, multimodal analgesia, `PCA/PCEA`, and catheter-analgesia monitoring. The file has an incomplete order number in the local copy; active legal status and drug-dose details require DEC/local-formulary verification before being treated as current clinical instructions.
- Local/UKP source `Protokol-peryoperatsijnogo-znebolennya.docx` table material, used for `CPNB` catheter locations, wound infiltration, and peripheral-catheter analgesia examples. Doses are treated as study/reference material until local formulary verification.
- WSES Bologna guidelines for adhesive small bowel obstruction, 2017 update published in 2018, used for hospital-stage acute bowel obstruction framing: non-operative trial boundaries, `NPO`, gastric/intestinal decompression, fluids/electrolytes, CT triggers, and urgent surgery signals. It is not a Ukrainian МОЗ standard.
- UK Kidney Association Hyperkalaemia Guideline, October 2023, used for adult hospital hyperkalaemia severity, ECG/monitoring, myocardial protection, potassium shifting/removal, and post-insulin glucose safety framing where no current МОЗ electrolyte standard is represented.
- European Clinical Practice Guideline on Hyponatraemia, 2014, used for symptom-oriented sodium correction and safe correction-rate limits where no current МОЗ hyponatraemia standard is represented.
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
