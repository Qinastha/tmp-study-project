# Gap-fill source audit - 2026-05-07

Verdict: PASS WITH WARNINGS.

Scope: first controlled pass over `Пробелы к заполнению` in `content/source.md`. This pass prioritizes high-risk clinical material where the missing content affects dosing, antidotes, transfusion reactions, pediatric airway/fluids, and malignant-hyperthermia response. Local workflow items remain `blocked-local` until an OOKB SOP or responsible local owner confirms the operational detail.

Policy: MOH/DEC first, then Shlapak, then narrow trusted sources. Drug-dose and threshold material is only inserted when the source is current enough for study use or explicitly marked historical/international/local.

## Source registry

| Source | Status | Use |
| --- | --- | --- |
| DEC registry page for `ГС 2025-536` newborn initial/resuscitation/post-resuscitation care | active МОЗ/ДЭЦ | Neonatal equipment, ventilation, intubation, compressions, and post-resuscitation observation. |
| DEC registry page for `ГС 2024-1259` CPR in adults and children | active МОЗ/ДЭЦ | Adult/child CPR values and post-ROSC framing already represented; local role map remains blocked-local. |
| МОЗ order `№540` from 2026-04-23 and standard `Парентеральна периопераційна антибіотикопрофілактика` / `ГС 2026-540` | active МОЗ | Perioperative antimicrobial prophylaxis timing, common doses, redosing, and procedure-specific stewardship. The DEC registry page may lag behind the MOH decree publication; source status should be rechecked before the next reseed. |
| OOKB clinical protocol `Моніторинг під час анестезіологічного забезпечення`, planned review August 2028 | local | BIS ranges, monitoring, LAST checklist, operating-room safety checklist, local monitoring equipment layer. |
| OOKB clinical protocol `Періопераційні невідкладні стани`, planned review August 2028 | local | Perioperative anaphylaxis, high spinal block, MH checklist, dantrolene dose/continuation, transfusion reaction checklist. |
| OOKB clinical protocol `Сепсис і септичний шок`, planned review December 2026 | local | Adult sepsis source-control/de-escalation and local empiric antibiotic tables. |
| UKP/DEC local file `Контроль періопераційного болю`, 2016 | partial / status needs DEC recheck | Pain assessment frequency, PCA/PCEA observation fields, acute pain service organization. |
| ASA 2022 difficult airway guideline | international professional | Multifeature airway assessment, awake airway decision points, attempt limitation, emergency invasive airway preparation and difficult-airway follow-up. |
| DAS 2025 unanticipated difficult intubation guideline | international professional | Adult hospital `Plan A/B/C/D`, oxygenation-first crisis framing, waveform capnography, team communication and `eFONA` escalation. |
| OAA/DAS 2015 obstetric failed intubation guideline | international professional | Obstetric failed-intubation master algorithm, maternal oxygenation priority, second-generation `SAD`, and `wake/proceed` decision framing. |
| ASRA LAST checklist 2020 | international professional | Lipid rescue dosing and modified resuscitation in LAST. |
| ASRA antithrombotic/regional guideline, fifth edition 2025 | international professional | Neuraxial, deep plexus, and deep peripheral block antithrombotic intervals where no Ukrainian anesthesia-specific table is represented. |
| Supplemental LP antithrombotic table from user-provided image `антикоагулянты.jpg` | user-provided study aid / partial cross-check | Single uncomplicated lumbar puncture hold/restart intervals; included as study supplement only, not as replacement for ASRA 2025 neuraxial/deep-block guidance or local SOP. |
| Fifth Consensus Guidelines for PONV 2025 executive summary and Fourth Consensus Guidelines for PONV 2020 | international professional | `PONV` risk reduction, multimodal prophylaxis, and rescue from another class. |
| DailyMed ondansetron, droperidol, metoclopramide, and scopolamine labels | label | Adult antiemetic doses and contraindication anchors where Ukrainian perioperative drug-label summaries are not represented in local files. |
| DailyMed lidocaine, bupivacaine, ropivacaine, articaine labels | label | Maximum local-anesthetic dosing where label states a maximum or table dose; unspecified rows remain conservative and source-marked. |
| DailyMed propofol, ketamine, etomidate, rocuronium, succinylcholine, sugammadex labels | label | Anesthesia pharmacology dose table and contraindication anchors. |
| MHAUS/EMHG and local OOKB emergency checklist | international/local | MH triggers, non-triggering agents, dantrolene starting dose, continuation and monitoring. |
| EXTRIP Workgroup recommendations | international expert consensus | ECTR indications for lithium, methanol, ethylene glycol, salicylates, and valproate. |
| NICE NG24 and AABB hemovigilance/transfusion reaction material | international guideline/reference | Transfusion component thresholds and reaction recognition/first steps. |
| ATS 2024 ARDS guideline update | international guideline | Adult `ARDS` escalation: corticosteroids, VV-ECMO in selected severe cases, early severe `ARDS` neuromuscular blockade, higher PEEP without prolonged recruitment maneuvers, and retained strong recommendations for lung-protective ventilation/prone positioning. |
| ARDSNet protocol / EOLIA criteria | international trial/protocol layer | Practical `PEEP/FiO2` oxygenation ladder and ECMO-referral trigger language for refractory severe `ARDS`; used as study/referral framing, not a local ECMO acceptance rule. |
| SSC 2026 adult sepsis guideline | international guideline | Adult hospital sepsis source control timing, antimicrobial stewardship, beta-lactam prolonged infusion, de-escalation, and updated respiratory-support statements in sepsis-associated `ARDS`. |
| UKKA 2023 Hyperkalaemia Guideline | international professional | Adult hospital hyperkalaemia: severity, ECG protection with calcium salts, insulin-glucose, salbutamol, glucose monitoring, potassium monitoring, and urgent dialysis in haemodialysis patients with severe hyperkalaemia. |
| European hyponatraemia guideline 2014 | international joint guideline | Adult symptomatic hypotonic hyponatraemia: `3% NaCl` bolus strategy, correction limits, and overcorrection response where no Ukrainian electrolyte standard is represented. |
| KDIGO AKI 2012 guideline | international kidney guideline | RRT timing principle: urgent RRT for life-threatening fluid, electrolyte, and acid-base changes, using clinical context and trends rather than single urea/creatinine thresholds. |
| `ГС 2024-1237-3` / МОЗ `№1237` severe head injury combat-trauma protocol | active МОЗ/ДЭЦ | Hospital-stage severe head injury: GCS classification, neuro-resuscitation targets, osmotherapy options, seizure prophylaxis/treatment, ICP/CPP goals, and transport/aeromedical cautions. |
| Brain Trauma Foundation severe TBI 4th edition | international guideline | Severe TBI cross-check for SBP, ICP, CPP, steroids, seizure prophylaxis and ventilation cautions. |
| AES 2016 convulsive status epilepticus guideline | international professional | Adult/child convulsive status epilepticus phases and first-/second-line doses where no current Ukrainian status-epilepticus dosing standard is represented. |
| ICS/FICM 2019 transfer guideline | international professional | Critical-care transfer preparation, personnel, equipment, monitoring and checklist framing for ventilated adults; local route remains OOKB-dependent. |
| `ГС 2024-1869` / МОЗ `№1869` burn standard | active МОЗ/ДЭЦ | Hospital burn care: TBSA-based resuscitation formulas, urine-output targets, lactated Ringer preference, airway/COHb criteria, infection prevention, tetanus and early nutrition. |
| `ГС 2025-1555-1` / МОЗ `№1555` hypothermia combat-trauma protocol | active МОЗ/ДЭЦ | Trauma-induced hypothermia staging, warmed blood/fluids, stage 2/3 warming priorities, temperature documentation and quality targets. |
| `ГС 2025-1555-4` / МОЗ `№1555` burn combat-trauma protocol | active МОЗ/ДЭЦ | Combat-trauma burn supplement: burn resuscitation worksheet, urine-output titration and warming/nursing checks. |
| WHO 2024 burn mass-casualty standards and Merck Manual Professional burns chapter | international reference | Parkland/Baxter formula kept only as an additional study option, not as the primary Ukrainian-standard calculation. |
| DEC registry pages for `ГС 2021-1936` STEMI and `ГС 2021-1957` NSTEMI | active МОЗ/ДЭЦ | Ukrainian normative ACS layer already represented in `theme-15`; used to keep cardiogenic-shock text tied to reperfusion and risk stratification. |
| SCAI SHOCK Stage Classification Expert Consensus Update 2022 and SCAI bedside checklist | international professional consensus | Cardiogenic shock severity language, A-E stages, cardiac-arrest modifier, and escalation framing for shock-team communication. |
| ESC 2022 non-cardiac surgery guideline | international professional guideline | Postoperative troponin surveillance at 24 and 48 hours in high-risk/intermediate-high-risk noncardiac surgery patients. |
| Canadian Cardiovascular Society 2017 perioperative cardiac risk guideline | international professional guideline | Daily postoperative troponin surveillance for 48-72 hours in defined high-risk noncardiac surgery patients. |
| ASA 2012 acute pain guideline | international professional guideline | Multimodal perioperative acute-pain management, institutional policies, patient-specific planning, and PCA/neuraxial monitoring principles. |
| FDA acetaminophen safety page and current DailyMed analgesic labels | regulator / label | Acetaminophen total daily ceiling, opioid respiratory-risk warnings, ketorolac contraindications, tramadol pediatric contraindications, ketamine and dexmedetomidine monitoring cautions. |
| FDA 2019 gabapentinoid safety communication | regulator safety communication | Respiratory depression risk with gabapentin/pregabalin in patients receiving opioids/CNS depressants, with underlying respiratory disease, or in older adults. |
| EMA 2024 metamizole safety measures | regulator safety communication | Agranulocytosis risk, symptom-triggered CBC, stop-treatment instruction, and high-risk patients in whom metamizole should not be used. |

## Clinical claim ledger

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-21` | Maximum LA doses and pregnancy cautions | verified / partial | DailyMed labels; ASRA LAST 2020; OOKB LAST checklist | Added a practical LA dose table with source/status and kept local protocol availability as residual. |
| `theme-21` | Obstetric epidural test dose | verified / partial | DailyMed bupivacaine label; OOKB monitoring/LAST checklist | Added test-dose and incremental-dose framing; final catheter regimen remains local-formulary dependent. |
| `theme-22` | Induction/NMBA/reversal dose table | verified / partial | DailyMed labels; Shlapak for explanatory pediatric physiology | Added concise table for propofol, ketamine, etomidate, thiopental, succinylcholine, rocuronium, sugammadex, naloxone; opioids/adjuvants still need local formulary details. |
| `theme-22` | MH algorithm with dantrolene | verified | OOKB emergency checklist; MHAUS/EMHG | Added dantrolene start/repeat/continuation and monitoring table. |
| `theme-23` | ECTR criteria for selected poisonings | verified | EXTRIP Workgroup | Added dialysis/ECTR table for lithium, methanol, ethylene glycol, salicylates, valproate. |
| `theme-23` | Local antidote storage/availability | blocked-local | none in available documents | Left as residual local SOP gap. |
| `theme-24` | Transfusion reactions | verified / local | OOKB transfusion reaction checklist; NICE/AABB reference layer | Added reaction table and immediate-response algorithm. |
| `theme-24` | Component ml/kg dosing in adults/children/obstetrics | partial | NICE/AABB/MOH obstetric hemorrhage | Added practical component-dose caveat; exact local component volume/concentration remains local blood-bank SOP. |
| `theme-19` | Pediatric airway equipment, fasting, fluid table | verified / partial | МОЗ/ДЭЦ `ГС 2025-536`; Shlapak; DailyMed propofol label; SSC 2026 pediatric sepsis | Added pediatric airway/fluid table; local stock and route after neonatal resuscitation remain blocked-local. |
| `theme-12` | Perioperative IV adrenaline and MH | verified / local | OOKB emergency checklist; Stanford basis; MHAUS/EMHG | Added OOKB perioperative anaphylaxis titration and MH drug table. |
| `theme-06` | Obstetric failed intubation and antihypertensive table | partial | OAA/DAS 2015; МОЗ hypertensive pregnancy standard already represented | Added hospital algorithm and drug table; local MTP card remains blocked-local. |
| `theme-11` | IHCAR roles and post-ROSC route | partial / blocked-local | МОЗ/ДЭЦ CPR; OOKB emergency checklist | Added generic role map; destination timing remains local SOP. |

## Wave 2 - perioperative tables

Scope: perioperative table gaps that repeatedly touched several modules: antithrombotic timing for neuraxial/deep regional techniques, antiemetic doses and restrictions for `PONV`, and parenteral perioperative antibiotic prophylaxis after the 2026 MOH update.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-01` | Preoperative checklist referenced anticoagulant/PONV tables but still listed them as missing | partial | ASRA 2025; PONV consensus; DailyMed labels | Added cross-references to the profile tables and left only the local renal/hepatic dose-adjustment/SOP gap. |
| `theme-04` | Neuraxial and deep plexus/deep peripheral anticoagulant intervals | verified / international plus LP study supplement | ASRA Pain Medicine fifth edition 2025; supplemental LP image table | Added a practical interval table for prophylactic/high-dose LMWH, UFH, warfarin, aspirin/NSAID, high-dose DOAC and low-dose apixaban/rivaroxaban. Added a separate English LP-only supplemental table from the image; local SOP adaptation remains open. |
| `theme-09` | Perioperative antibiotic prophylaxis still cited the old 2022 standard and had no compact dose/redose table | verified / active МОЗ, pending DEC registry recheck | MOH order `№540` 2026-04-23 / `ГС 2026-540`; available standard text and professional reposts | Updated the source reference to `№540`, added timing/dose/redose table, and removed the generic redosing-table gap. |
| `theme-10` | `PONV` antiemetic doses and QT/renal/anticholinergic restrictions | verified / partial | Fifth Consensus PONV 2025; Fourth Consensus PONV 2020; DailyMed labels | Added adult antiemetic table for ondansetron, dexamethasone, droperidol, metoclopramide and scopolamine. Pediatric/obstetric local formulary remains open. |

## Wave 3 - adult ICU respiratory and sepsis source control

Scope: adult ICU gaps in `theme-13` and `theme-14`: `ARDS` ventilation/escalation and sepsis source-control/de-escalation. Existing text was already directionally correct, so this pass added practical tables and tightened source status rather than rewriting the whole modules.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-13` | ARDS ventilator escalation table: `PEEP/FiO2`, prone, NMBA, ECMO referral criteria | verified / international | ATS 2024 ARDS; SSC 2026 adult sepsis respiratory-support recommendations; ARDSNet; EOLIA criteria | Added `ARDS: вентиляция и эскалация` and `PEEP/FiO2` tables. Local ECMO-call and transport SOP remains open. |
| `theme-14` | Source control and antimicrobial de-escalation table | verified / international plus local alignment | SSC 2026 adult sepsis; OOKB sepsis protocol | Added source-control scenarios and `0-1h / 6h / 24h / 48-72h` de-escalation checkpoints. Local empiric antibiotic table and sepsis huddle workflow remain open. |

## Wave 4 - metabolic electrolytes and renal escalation

Scope: `theme-18` electrolyte/RRT gap. Existing DKA and bowel-obstruction material was preserved because it already had Ukrainian/DEC and WSES framing. This pass focused on adult hospital hyperkalaemia, symptomatic hyponatraemia, and practical triggers for urgent renal replacement therapy.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-18` | Practical `K` emergency correction table and insulin-glucose safety | verified / international | UKKA 2023 Hyperkalaemia Guideline | Added calcium salt choice/doses, insulin-glucose, post-insulin glucose monitoring, salbutamol adjunct, non-routine bicarbonate wording, and potassium reassessment schedule. |
| `theme-18` | Hypertonic saline dosing and sodium correction limits | verified / international | European hyponatraemia guideline 2014 | Added `3% NaCl` adult bolus approach for severe symptoms, moderate-symptom option, correction limits, and overcorrection expert-response framing. |
| `theme-18` | Dialysis/RRT escalation criteria | verified / international plus local dependency | KDIGO AKI 2012; UKKA 2023; EXTRIP as already represented in `theme-23` | Added urgent RRT indications: refractory hyperkalaemia, severe acidosis without universal pH threshold, volume overload, uremic complications, and dialyzable toxins. Local call pathway remains blocked-local. |

## Wave 5 - neurocritical TBI seizures and transport

Scope: `theme-17` neurocritical gap. Existing stroke and intracerebral-hemorrhage material was preserved. This pass added a hospital-stage TBI framework, osmotherapy table, seizure/status epilepticus table, and ventilated-patient transport checklist framing.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-17` | Standalone hospital TBI block with targets and secondary-injury prevention | verified / active МОЗ plus international cross-check | `ГС 2024-1237-3`; Brain Trauma Foundation severe TBI 4th edition | Added GCS classification, airway/neurosurgery triggers, oxygenation/BP/PaCO2/ICP/CPP targets, positioning, steroid avoidance and secondary-insult framing. |
| `theme-17` | Osmotherapy doses and stop-points | verified / active МОЗ | `ГС 2024-1237-3`; Brain Trauma Foundation context | Added 3% NaCl bolus/infusion, mannitol dosing, 23.4% NaCl availability note, and Na/osmolality stop-points; local availability remains open. |
| `theme-17` | Seizures/status epilepticus | verified / active МОЗ plus international | `ГС 2024-1237-3`; AES 2016 convulsive status epilepticus guideline | Added first 7-day seizure prophylaxis framing after moderate/severe TBI and a time-based adult/general convulsive SE dose table. |
| `theme-17` | Transport of ventilated neurocritical patients | verified / international plus local dependency | ICS/FICM 2019 transfer guideline; `ГС 2024-1237-3` aeromedical/transport cautions | Added coma checklist and transport monitoring/equipment requirements, including mandatory `EtCO2` for intubated transfer. Local route and team ownership remain blocked-local. |

## Wave 6 - trauma burns hypothermia and damage-control warming

Scope: `theme-16` trauma gap. Existing hemorrhagic shock, DCR/DCS, TXA, calcium and MTP material was preserved. This pass source-checked burns and hypothermia against current DEC/MOH documents and added hospital-stage tables without expanding prehospital triage.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-16` | Burn resuscitation formula, urine-output targets and over-resuscitation cautions | verified / active МОЗ plus international reference | `ГС 2024-1869`; `ГС 2025-1555-4`; WHO 2024 burn mass-casualty standards; Merck Manual | Added TBSA formula table: adults/children `>=14` at `2 ml x kg x %TBSA`, children `<=13` at `3 ml x kg x %TBSA`, electric burns at `4 ml x kg x %TBSA`, half in the first 8 hours, urine targets and LR preference. Added Parkland/Baxter `4 ml x kg x %TBSA` only as an additional option, not the primary Ukrainian-standard calculation. |
| `theme-16` | Inhalational injury/CO and early airway criteria | verified / active МОЗ | `ГС 2024-1869` | Added closed-space/flame/facial/airway/soot/stridor/lactate red flags, 100% oxygen until COHb normalizes, early intubation criteria and burn-area airway thresholds. |
| `theme-16` | Trauma-induced hypothermia prevention and rewarming | verified / active МОЗ | `ГС 2025-1555-1` | Added staging, warmed blood/fluids at `38-42 C`, temperature documentation, target `>35.5 C`, and transport/forced-air warming principles. |
| `theme-16` | Burn-center transfer, warming ownership and local equipment | blocked-local | no OOKB SOP in available files | Left as residual local SOP gap: burn center route, TBSA chart, blood/fluid warmer availability, temperature measurement site and route ownership. |

## Wave 7 - cardiogenic shock and perioperative myocardial injury

Scope: `theme-15` cardiac ICU gap. Existing Ukrainian ACS content and transplant-ICU material were preserved. This pass added a practical cardiogenic-shock severity language and postoperative myocardial-injury monitoring without inventing a local PCI/MCS route.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-15` | Cardiogenic shock staging and escalation language | verified / international plus Ukrainian ACS layer | DEC `ГС 2021-1936`; DEC `ГС 2021-1957`; SCAI SHOCK Stage Classification Expert Consensus Update 2022; SCAI bedside checklist | Added `SCAI` A-E staging, reassessment logic, and practical escalation language for OIT/cardiology/PCI/MCS communication. |
| `theme-15` | Vasoactive and mechanical-support bridge logic | verified / partial | SCAI consensus/checklist; existing ACS sources; local dose sheets still required | Added a non-dose table for norepinephrine, dobutamine, milrinone, vasopressin, IABP and advanced MCS; exact concentrations/rates remain local SOP-dependent. |
| `theme-15` | Perioperative myocardial injury and troponin surveillance | verified / international | ESC 2022 non-cardiac surgery guideline; Canadian Cardiovascular Society 2017 perioperative cardiac risk guideline | Added `MINS` framing, ESC 24/48-hour troponin monitoring, CCS 48-72-hour daily troponin monitoring, and first response to troponin rise. |
| `theme-15` | Local cardiogenic-shock route and transplant-center route | blocked-local | no OOKB/receiving-center SOP in available files | Kept as residual local SOP gap: shock team, PCI/cardiac surgery/MCS accepting centers, transfer criteria, and data packet. |

## Wave 8 - postoperative pain safety and PCA/PCEA monitoring

Scope: `theme-07` postoperative pain gap. Existing pain-scale, multimodal-analgesia, PCA/PCEA and special-population text was preserved. This pass added safety limits and bedside monitoring logic without converting old 2016 examples into final local drug orders.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-07` | Contraindication/limitation table for systemic analgesics | verified / partial | UKP/DEC `Контроль періопераційного болю` 2016; ASA 2012; FDA acetaminophen; DailyMed morphine/fentanyl/tramadol/ketorolac/ketamine/dexmedetomidine; EMA metamizole | Added a practical safety table for paracetamol, NSAID/ketorolac, metamizole, opioids, tramadol, gabapentinoids, ketamine and dexmedetomidine. Exact dose regimens remain local-formulary dependent. |
| `theme-07` | PCA/PCEA monitoring checklist | verified / partial | UKP/DEC 2016 pain protocol; ASA 2012; ASRA 2025 safety framing for neuraxial/deep-block anticoagulation | Added bedside checklist: pre-start checks, order completeness, routine monitoring, pain `>6/10` reassessment, opioid oversedation response, PCEA neurologic red flags, peripheral catheter/LAST checks and handover. |
| `theme-07` | Local PCA/PCEA forms and drug concentrations | blocked-local | no OOKB PCA/PCEA order sheet in available files | Kept as residual local SOP gap: local concentration, nursing interval, call criteria, catheter removal and anticoagulant coordination. |

## Wave 9 - difficult airway prediction and failed intubation

Scope: `theme-03` difficult-airway gap. Existing trauma airway text was preserved. This pass added a practical prediction table and aligned the adult and obstetric failed-intubation logic with current international airway guidance, while leaving OOKB-specific trolley, kit location and team drill as local SOP requirements.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-03` | Predictors of difficult mask ventilation, laryngoscopy/intubation, `SAD` rescue and `eFONA` | verified / international | ASA 2022 difficult airway guideline; DAS 2025 unanticipated difficult intubation guideline | Added a four-domain predictor table and emphasized that no single bedside sign is reliable enough by itself. |
| `theme-03` | Adult unexpected difficult intubation and `CICO` response | verified / international | DAS 2025; ASA 2022 | Added oxygenation-first `Plan A/B/C/D`, attempt limitation, rescue `SAD`, `wake/proceed/alternative airway` decision and immediate `eFONA` for `CICO`. |
| `theme-03` | Obstetric failed intubation cross-link | verified / international | OAA/DAS 2015 obstetric failed intubation guideline | Added an airway-theme summary that points to the detailed obstetric module and preserves maternal oxygenation and `wake/proceed` decision logic. |
| `theme-03` | Airway trolley, `VL/SAD/ЭТТ` sizes, `eFONA` kit location and CICO drill | blocked-local | no OOKB airway trolley/SOP file in available sources | Kept as residual local SOP gap; this must be supplied by the department rather than inferred from international algorithms. |

## Remaining blocked-local items

- Exact OOKB medication storage and night-access map: antidotes, dantrolene, lipid emulsion, crisis cart contents.
- Local difficult-airway SOP: airway trolley, `VL/SAD/ЭТТ` sizes, bougie/stylet availability, `eFONA` kit location, who is called for `CICO`, and team-drill frequency.
- Local MTP activation card: blood bank contacts, runner role, component delivery time, fibrinogen/cryo/calcium location, neonatal call.
- Local burn/warming SOP: burn-center transfer criteria, `TBSA` chart, blood/fluid warmer availability, temperature measurement site, and warming ownership during `ED -> CT/OR/ICU` transfers.
- Local cardiogenic-shock route: shock team, PCI/cardiac surgery/MCS contacts, transfer criteria, accepting centers, transport responsibility, and minimum data packet.
- Local post-ROSC route: ICU bed ownership, cath lab, CT, ECMO/cardiac surgery transfer availability.
- Local antithrombotic/peripheral-block SOP: exact handling of urgent surgery, available anti-Xa/drug-level testing, and compressible superficial blocks.
- Local PONV formulary for pediatrics, pregnancy, breastfeeding and QT-risk substitution.
- Local PCA/PCEA and acute-pain service order sheets: concentrations, pump defaults, nursing observation intervals, rescue medication policy and escalation contacts.
- Local antibiotic prophylaxis appendices after `ГС 2026-540`: procedure-specific choices, allergy alternatives, renal adjustment and stock availability.
- Local ECMO escalation pathway: accepting centers, call order, minimum data packet, transport responsibility, and exclusion criteria.
- Local sepsis huddle/source-control workflow: who activates it, who calls procedural teams, and how 24/48-hour de-escalation is documented.
- Local nephrology/RRT escalation workflow: who is called first, night/weekend access, available modality, and local thresholds for bicarbonate, hypertonic sodium and electrolyte replacement concentrations.
- Local neurocritical route: CT/neurosurgery/OR/ICU ownership, ICP monitor availability, 3%/23.4% saline stock, continuous EEG access, and transport team requirements.
- Local blood-bank component volumes and pediatric/obstetric ml/kg policy.
- Visual atlas assets for ultrasound blocks, LUS, and FoCUS; these belong to a future UI/media iteration, not a text-only source fill.

## Residual risk

This pass improves the high-risk reader content but does not certify the whole `source.md` as a clinical protocol. Where Ukrainian current documents are absent, international guidance is marked as international. Where operational details depend on OOKB practice, the text deliberately stays blocked-local.
