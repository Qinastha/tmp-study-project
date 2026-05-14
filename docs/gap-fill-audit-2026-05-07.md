# Gap-fill source audit - 2026-05-07

Verdict: PASS WITH WARNINGS.

Scope: first controlled pass over `Пробелы к заполнению` in `content/source.md`. This pass prioritizes high-risk clinical material where the missing content affects dosing, antidotes, transfusion reactions, pediatric airway/fluids, and malignant-hyperthermia response. Local workflow items remain `blocked-local` until an OOKB SOP or responsible local owner confirms the operational detail.

Policy: MOH/DEC first, then Shlapak, then narrow trusted sources. Drug-dose and threshold material is only inserted when the source is current enough for study use or explicitly marked historical/international/local.

## Source registry

| Source | Status | Use |
| --- | --- | --- |
| DEC registry page for `ГС 2025-536` newborn initial/resuscitation/post-resuscitation care | active МОЗ/ДЭЦ | Neonatal equipment, ventilation, intubation, compressions, and post-resuscitation observation. |
| DEC registry page for `ГС 2024-1259-1` pediatric CPR and `ГС 2024-1259-2` adult CPR | active МОЗ/ДЭЦ | Adult/child CPR values, post-ROSC oxygenation/ventilation/hemodynamic/temperature/glucose targets, PCI timing, seizure framing and local route gap. |
| МОЗ order `№540` from 2026-04-23 and standard `Парентеральна периопераційна антибіотикопрофілактика` / `ГС 2026-540` | active МОЗ | Perioperative antimicrobial prophylaxis timing, common doses, redosing, and procedure-specific stewardship. The DEC registry page may lag behind the MOH decree publication; source status should be rechecked before the next reseed. |
| `Алгоритм_дій_дитячого_анестезіолога_2020_1.pdf` | educational source / not local SOP | Pediatric anesthesia teaching manual. Used for LMA/ETT size anchors and `4-2-1` maintenance-fluid rule in `theme-19`; drug tables are not treated as local prescribing instructions without label/formulary verification. |
| AAP Clinical Practice Guideline: Maintenance Intravenous Fluids in Children, 2018 | international pediatric guideline | Cross-check for pediatric maintenance-fluid composition: isotonic fluids with appropriate KCl/dextrose for most children aged 28 days to 18 years; no fake universal rate or local solution is created. |
| `Контроль_периопераційного_болю_1.pdf` | adapted guideline project / not final active MOH order | Pain assessment and perioperative pain-service support source for future `theme-07` and pediatric-pain checks; dose regimens require current label/local protocol verification. |
| `Невідкладні стани в педіатрії 2020.pdf` | educational source / older excerpt | Bibliographic pediatric-emergency context; practical use is limited because the 2023 manual and active МОЗ/ДЭЦ CPR standards are better anchors. |
| `Невідкладні стани в педіатрії 2023.pdf` | educational source | Pediatric emergency self-study manual. Useful for future cross-checks of CPR, respiratory failure, shock, anaphylaxis, dehydration, seizures, burns and poisonings, but not a normative МОЗ standard. |
| OOKB clinical protocol `Моніторинг під час анестезіологічного забезпечення`, planned review August 2028 | local | BIS ranges, monitoring, LAST checklist, operating-room safety checklist, local monitoring equipment layer. |
| OOKB clinical protocol `Седація при ЕФГДС`, 2025 | local | Procedural sedation recovery, `PADSS`, `Aldrete`, discharge documentation, 24-hour post-sedation restrictions, and local monitoring/equipment expectations. |
| Association of Anaesthetists 2021 monitoring guideline | international professional | External monitoring-guideline layer for processed EEG/depth monitoring, capnography, neuromuscular monitoring and recovery monitoring where local OOKB protocol is used as the practical implementation source. |
| ASA Standards for Postanesthesia Care 2024 | international professional | PACU/equivalent-area admission, handover, continuous evaluation, oxygenation/ventilation/circulation/consciousness/temperature focus, written recovery record, and physician/discharge-criteria responsibility. |
| DailyMed sevoflurane and desflurane labels | label | Age-related MAC changes, N2O/opioid/benzodiazepine MAC reduction, pediatric desflurane cautions and sevoflurane uterine-relaxation caution. |
| NICE CG174 intravenous fluid therapy in adults in hospital, last updated 2017 | international guideline | Adult inpatient `5R`, routine maintenance, resuscitation bolus and chloride-monitoring frame. Excludes pregnancy, severe renal/liver disease, diabetes and burns. |
| POQI 2024 perioperative fluid management recommendations and POQI 2020 fluid responsiveness consensus | international professional consensus | Perioperative `GDFT`, fluid responsiveness concepts, and warning that fluid responsiveness is not the same as an indication for repeated fluid boluses. |
| OOKB clinical protocol `Періопераційні невідкладні стани`, planned review August 2028 | local | Perioperative anaphylaxis, high spinal block, MH checklist, dantrolene dose/continuation, transfusion reaction checklist. |
| OOKB clinical protocol `Сепсис і септичний шок`, planned review December 2026 | local | Adult sepsis source-control/de-escalation and local empiric antibiotic tables. |
| UKP/DEC local file `Контроль періопераційного болю`, 2016 | partial / status needs DEC recheck | Pain assessment frequency, PCA/PCEA observation fields, acute pain service organization. |
| ASA 2022 difficult airway guideline | international professional | Multifeature airway assessment, awake airway decision points, attempt limitation, emergency invasive airway preparation and difficult-airway follow-up. |
| DAS 2025 unanticipated difficult intubation guideline | international professional | Adult hospital `Plan A/B/C/D`, oxygenation-first crisis framing, waveform capnography, team communication and `eFONA` escalation. |
| OAA/DAS 2015 obstetric failed intubation guideline | international professional | Obstetric failed-intubation master algorithm, maternal oxygenation priority, second-generation `SAD`, and `wake/proceed` decision framing. |
| ASRA LAST checklist 2020 | international professional | Lipid rescue dosing and modified resuscitation in LAST. |
| ASRA antithrombotic/regional guideline, fifth edition 2025 | international professional | Neuraxial, deep plexus, and deep peripheral block antithrombotic intervals where no Ukrainian anesthesia-specific table is represented. |
| ASRA 2025 deep plexus/deep peripheral block safety application | international professional | Peripheral-block anticoagulation decision frame: deep plexus/deep peripheral blocks follow neuraxial guidance; other blocks depend on site compressibility, vascularity, and consequences of bleeding. |
| ASRA Practice Advisory on Neurologic Complications in Regional Anesthesia and Pain Medicine | international professional | Urgent recognition, imaging and neurosurgical consultation for suspected neuraxial compressive lesions; used only where Ukrainian anesthesia-specific guidance is not represented. |
| ASA 2021 PDPH statement | international professional | Post-dural puncture headache follow-up, differential diagnosis, conservative management and epidural blood patch decision framing. |
| Supplemental LP antithrombotic table from user-provided image `антикоагулянты.jpg` | user-provided study aid / partial cross-check | Single uncomplicated lumbar puncture hold/restart intervals; included as study supplement only, not as replacement for ASRA 2025 neuraxial/deep-block guidance or local SOP. |
| Fifth Consensus Guidelines for PONV 2025 executive summary and Fourth Consensus Guidelines for PONV 2020 | international professional | `PONV` risk reduction, multimodal prophylaxis, and rescue from another class. |
| DailyMed ondansetron, droperidol, metoclopramide, and scopolamine labels | label | Adult antiemetic doses and contraindication anchors where Ukrainian perioperative drug-label summaries are not represented in local files. |
| ERAS Society cesarean intraoperative care 2025 update | international obstetric ERAC guideline | Cesarean intraoperative antiemetic prophylaxis as a strong ERAC intervention category; specific local drug scheme still requires local obstetric/anesthesia formulary. |
| LactMed ondansetron, dexamethasone and metoclopramide | lactation reference | Breastfeeding/lactation cautions for postpartum/cesarean antiemetic use: ondansetron commonly `4-8 mg IV` with no special precautions, dexamethasone data-limited with possible lactation reduction at medium/high doses, metoclopramide variable transfer and depression/galactagogue cautions. |
| DailyMed lidocaine, bupivacaine, ropivacaine, articaine labels | label | Maximum local-anesthetic dosing where label states a maximum or table dose; unspecified rows remain conservative and source-marked. |
| DailyMed propofol, ketamine, etomidate, rocuronium, succinylcholine, sugammadex labels | label | Anesthesia pharmacology dose table and contraindication anchors. |
| DailyMed fentanyl, morphine, and nalbuphine labels | label | Perioperative opioid dose anchors, respiratory-depression cautions, chest-wall rigidity warning and local-formulary limits in `theme-22`. |
| DailyMed vecuronium bromide injection label | label | Adult intubating bolus, maintenance dose and monitoring/reversal cautions for `theme-22`. |
| DailyMed cisatracurium besylate injection label | label | Adult intubating bolus, maintenance bolus, infusion-start/range and neuromuscular-disease limitation for `theme-22`. |
| DailyMed neostigmine methylsulfate injection label | label | Reversal dose, maximum dose, peripheral nerve stimulator use and anticholinergic coadministration for `theme-22`. |
| MHAUS/EMHG and local OOKB emergency checklist | international/local | MH triggers, non-triggering agents, dantrolene starting dose, continuation and monitoring. |
| EXTRIP Workgroup recommendations | international expert consensus | ECTR indications for lithium, methanol, ethylene glycol, salicylates, and valproate. |
| J Med Toxicol 2016 sodium bicarbonate QRS review | international toxicology review / ACMT journal | Sodium bicarbonate for toxin-induced sodium-channel blockade and QRS widening: common bolus/infusion patterns, pH targets, evidence limits by toxin, and bupropion/propranolol/taxine uncertainty. |
| NCBI Bookshelf StatPearls Sodium Channel Blocker Toxicity, last updated 2024-03-02 | international clinical reference | Practical sodium-channel blocker toxicity approach: `QRS >100 ms` trigger, `1-2 mEq/kg` bolus, infusion pH ceiling, electrolyte monitoring, refractory options and avoidance of phenytoin/fosphenytoin for seizures in this context. |
| NICE NG24 Blood transfusion, last updated 2026-02-26 | international guideline | RBC thresholds/single-unit strategy, platelet thresholds/dose reassessment, FFP indications and reassessment, cryoprecipitate adult/child dose and fibrinogen thresholds. Excludes pregnancy/labour and does not replace local blood-bank component volumes. |
| AABB 2023 RBC transfusion guideline | international professional guideline | Restrictive RBC thresholds in hemodynamically stable adults and subgroups such as cardiac/orthopedic/pre-existing cardiovascular disease. |
| AABB/ICTMG 2025 platelet transfusion guideline | international professional guideline | Restrictive platelet thresholds for lumbar puncture, major nonneuraxial surgery and other common settings. |
| AABB hemovigilance/transfusion reaction material | international reference | Transfusion reaction recognition and first steps. |
| МОЗ №2225/2022 traceability and hemovigilance order | active МОЗ / Rada current text | Ukrainian requirements for transfusion traceability, component/patient identification, 30-year data retention, hospital blood bank verification, informed-consent/justification framing, investigation and reporting of serious adverse transfusion reactions. |
| МОЗ №818/2023 blood component safety and quality order | active МОЗ / Rada current text | Ukrainian component quality and storage frame: component names/quality indicators, RBC `2-6 °C`, platelets `20-24 °C` up to `5 days`, plasma storage by temperature, and label/storage caveats. |
| Український центр трансплант-координації transfusion forms | national working forms / 2026 page | Names current practical forms: transfusion request, adverse reaction/adverse incident reports, unique blood-system subject identifiers, memos and order logs. Local adoption still requires the hospital transfusion committee/SOP. |
| ATS 2024 ARDS guideline update | international guideline | Adult `ARDS` escalation: corticosteroids, VV-ECMO in selected severe cases, early severe `ARDS` neuromuscular blockade, higher PEEP without prolonged recruitment maneuvers, and retained strong recommendations for lung-protective ventilation/prone positioning. |
| ARDSNet protocol / EOLIA criteria | international trial/protocol layer | Practical `PEEP/FiO2` oxygenation ladder and ECMO-referral trigger language for refractory severe `ARDS`; used as study/referral framing, not a local ECMO acceptance rule. |
| SSC 2026 adult sepsis guideline | international guideline | Adult hospital sepsis source control timing, antimicrobial stewardship, beta-lactam prolonged infusion, de-escalation, and updated respiratory-support statements in sepsis-associated `ARDS`. |
| OOKB clinical protocol `Клінічний протокол ТЕЛА 2025.docx` | local | Acute pulmonary embolism operational layer: risk stratification, respiratory support, RV support, thrombolysis, anticoagulation, cava filter and embolectomy indications. The local file cites a 2023 ESC PE guideline that was not verified as a current ESC/ERS PE guideline; the externally verified ESC/ERS source remains 2019/2020. |
| ESC/ERS 2019 pulmonary embolism guideline | international professional guideline | Cross-check for PE high-risk definition, RV support, thrombolytic regimens including accelerated rtPA caveat, reperfusion strategy, and IVC filter/embolectomy framing. |
| UKKA 2023 Hyperkalaemia Guideline | international professional | Adult hospital hyperkalaemia: severity, ECG protection with calcium salts, insulin-glucose, salbutamol, glucose monitoring, potassium monitoring, and urgent dialysis in haemodialysis patients with severe hyperkalaemia. |
| European hyponatraemia guideline 2014 | international joint guideline | Adult symptomatic hypotonic hyponatraemia: `3% NaCl` bolus strategy, correction limits, and overcorrection response where no Ukrainian electrolyte standard is represented. |
| KDIGO AKI 2012 guideline | international kidney guideline | RRT timing principle: urgent RRT for life-threatening fluid, electrolyte, and acid-base changes, using clinical context and trends rather than single urea/creatinine thresholds. |
| KDIGO 2024 CKD Guideline | international kidney guideline | CKD medication stewardship: GFR-aware dosing for kidney-cleared drugs, eGFR/electrolyte/drug-level monitoring, nephrotoxic-medication caution, polypharmacy review and restart planning after temporary medication holds. |
| МОЗ 2024-1734 / `№1734` cirrhosis protocols | active МОЗ/ДЭЦ | Ukrainian normative cirrhosis layer for preoperative risk framing: ascites, encephalopathy, kidney function, coagulation and decompensation risk. |
| AASLD 2022 decompensated cirrhosis practice guidance and VA liver medication-safety material | international professional / federal reference | Cirrhosis medication-safety layer for `НПВП`, acetaminophen/paracetamol, opioids, sedatives and encephalopathy risk where Ukrainian perioperative dosing tables are not represented. |
| NICE CG32 Nutrition support for adults | international guideline | Adult refeeding-risk criteria, cautious caloric start, thiamine and likely K/phosphate/Mg requirements where no current Ukrainian ICU nutrition SOP is represented. |
| Merck Manual Professional hypocalcemia, hypomagnesemia and hypophosphatemia chapters | international reference | Adult Ca/Mg/P recognition and replacement guardrails, used only as a study layer until local pharmacy/nephrology concentrations are confirmed. |
| Endocrine Society 2022 hypercalcemia of malignancy guideline | international professional guideline | Severe hypercalcemia of malignancy threshold and initial antiresorptive/calcitonin framing. |
| WSES Bologna guidelines 2017/2018 | international surgical guideline | Adhesive small bowel obstruction: non-operative trial boundaries, CT triggers, `NPO`, decompression, fluids/electrolytes, aspiration prevention, and urgent surgery red flags. |
| Surgical Infection Society 2024 intra-abdominal infection guideline | international surgical infection guideline | Adult complicated intra-abdominal infection: source control, empiric therapy stewardship, short-course antibiotics after adequate source control, and peri-procedural antibiotic timing. |
| IDSA 2024 complicated intra-abdominal infection guideline | international infectious-disease guideline | Risk assessment, imaging and microbiological evaluation for complicated intra-abdominal infection; used to support culture/de-escalation framing, not local antibiotic selection. |
| `ГС 2024-1237-3` / МОЗ `№1237` severe head injury combat-trauma protocol | active МОЗ/ДЭЦ | Hospital-stage severe head injury: GCS classification, neuro-resuscitation targets, osmotherapy options, seizure prophylaxis/treatment, ICP/CPP goals, and transport/aeromedical cautions. |
| Brain Trauma Foundation severe TBI 4th edition | international guideline | Severe TBI cross-check for SBP, ICP, CPP, steroids, seizure prophylaxis and ventilation cautions. |
| Brain Trauma Foundation pediatric severe TBI 3rd edition | international guideline | Pediatric severe TBI cross-check for ICP/CPP thresholds, hypertonic saline bolus/infusion/23.4% bolus, severe-hyperventilation cautions, early seizure prophylaxis, steroid avoidance and prolonged-propofol caution. |
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

## Wave 10 - depth monitoring and perioperative fluids

Scope: `theme-02`, `theme-08` and `theme-09`. Existing procedural-sedation, monitoring, antibiotic and nutrition material was preserved. This pass closed source-verifiable gaps around MAC/TIVA choice, BIS/depth monitoring and adult perioperative fluid/GDFT framing. Local pump presets, processed-EEG policy and GDFT monitor ownership remain blocked-local.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-02` | Factors affecting MAC, emergence and choice of TIVA versus inhalational anesthesia | verified / partial | DailyMed sevoflurane/desflurane labels; OOKB monitoring; Shlapak explanatory layer | Added a practical MAC/TIVA table: age lowers MAC, N2O/opioids/benzodiazepines reduce volatile requirement, pregnancy/uterine atony cautions, pediatric desflurane caution and delayed-emergence factors. Exact TIVA infusion presets remain local/formulary dependent. |
| `theme-08` | Depth monitoring source review | verified / local plus international | OOKB monitoring protocol 2025; OOKB EFGDS sedation protocol; Association of Anaesthetists 2021 | Added BIS/MAC section with local BIS ranges, MAC/end-tidal monitoring and cautions against treating BIS as a standalone anesthetic-depth truth. Local awareness documentation and sensor policy remain open. |
| `theme-09` | Adult fluid table and goal-directed fluid therapy algorithm | verified / international | NICE CG174; POQI 2024; POQI 2020 | Added adult `5R`, maintenance, resuscitation bolus, chloride-monitoring and GDFT cycle. Marked exclusions and local SOP needs for pregnancy, severe CKD/liver disease, diabetes, burns, pediatric patients and local monitor targets. |

## Wave 11 - neuraxial complication recognition and observation

Scope: `theme-04`. Existing neuraxial contraindication, anticoagulant and LP-material were preserved. This pass converted two open gaps into a source-marked complication-recognition table and a bedside observation sheet, while keeping the final local route/form as blocked-local.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-04` | High/total spinal block recognition and first response | verified / local | OOKB emergency checklist `Высокий спинальный блок`, planned review August 2028 | Added recognition signs, `100% O2`, ventilation/intubation readiness, crystalloid bolus and local adrenaline `10-100 мкг в/в` titration language. |
| `theme-04` | Epidural hematoma/abscess and urgent neurologic escalation | verified / international | ASRA Practice Advisory on Neurologic Complications; ASRA antithrombotic/regional guideline context | Added red flags, urgent neurologic exam, `MRI`/`CT` if MRI would delay diagnosis, and immediate neurosurgical consultation for suspected compressive lesions. |
| `theme-04` | `PDPH` and neuraxial-catheter observation sheet | verified / partial | ASA 2021 PDPH; UKP/DEC pain protocol; OOKB monitoring/LAST checklist | Added `PDPH` 24-hour anesthesia review, differential diagnosis, conservative/EBP framing, and a minimum observation table for pain, motor/sensory block, catheter site, infection, bladder, `LAST`, and anticoagulants. |

## Wave 12 - peripheral block and catheter safety observation

Scope: `theme-05`. Existing material already covered limb/truncal block selection, `CPNB` indications, local infusion examples and `LAST` recognition. This pass checked that content against the local pain protocol and ASRA 2025 safety framing, then added a practical anticoagulation decision table and a peripheral catheter observation sheet.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-05` | Applying ASRA logic to peripheral and fascial blocks | verified / international plus local classification needed | ASRA 2025 deep plexus/deep peripheral guidance; Shlapak regional-anesthesia anatomy layer | Added a decision table separating deep plexus/deep peripheral blocks from superficial compressible blocks and emphasizing documentation of vascularity, compressibility and bleeding consequence. |
| `theme-05` | Peripheral catheter observation sheet | verified / partial | Protokol-peryoperatsijnogo-znebolennya.docx; ASRA LAST checklist 2020; existing OOKB monitoring/LAST source layer | Added observation fields for pain, motor protection, sensory change, catheter site, infection, cumulative LA dose, `LAST`, anticoagulants and handover. Local pump concentrations and observation frequency remain SOP/formulary dependent. |

## Wave 13 - PACU recovery and failed-discharge escalation

Scope: `theme-10`. Existing `Aldrete`, `PADSS`, `PONV` and thromboprophylaxis material was preserved. This pass added a practical `PACU` escalation table so failed discharge criteria become an active diagnostic route rather than a passive delay.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-10` | PACU handover, monitoring and failed-discharge escalation | verified / local plus international | ASA Standards for Postanesthesia Care 2024; OOKB monitoring protocol 2025; `Новий_клінічний_протокол_Седація_при_ЕФГДС_2025.docx` | Added handover requirements, oxygenation/ventilation/circulation/consciousness/temperature focus, `Aldrete <8` and respiratory-failure escalation, resedation risk after naloxone/flumazenil, pain/PONV failure response and ambulatory discharge restrictions. |
| `theme-10` | Home discharge after sedation | verified / local | OOKB sedation protocol 2025 | Added `PADSS >9`, escort requirement, written instructions/phone contact, and `24 h` driving/decision restriction. |

## Wave 14 - CPR and post-ROSC source refresh

Scope: `theme-11`. Existing adult/child CPR numbers were checked against the active DEC registry and the 2024 MOH standards. The values already present were directionally correct; the weak spot was the post-ROSC section, which was too generic for a study document.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-11` | Adult CPR and post-ROSC ICU targets | verified / active МОЗ/ДЭЦ | DEC registry; `ГС 2024-1259-2`; MOH order `№1259` 2024-07-18 | Preserved adult CPR values and added post-ROSC targets for oxygenation, PaO2, PaCO2, protective ventilation, MAP, diuresis, lactate, PCI timing, normothermia, glycaemia, seizure treatment and avoidance of routine steroid/antiepileptic prophylaxis. |
| `theme-11` | Pediatric CPR and post-ROSC alignment | verified / active МОЗ/ДЭЦ | DEC registry; `ГС 2024-1259-1`; MOH order `№1259` 2024-07-18 | Preserved pediatric adrenaline, amiodarone, ventilation-rate and defibrillation values; added child post-ROSC targets for `ABCDE`, SpO2 `94-97%`, normocapnia and hypotension avoidance. |
| `theme-11` | Local post-ROSC destination route | blocked-local | no OOKB post-ROSC routing SOP in available sources | Kept local route as a residual SOP gap: ICU owner, CT/cath lab/ECMO access, transfer criteria and accepting contacts. |

## Wave 15 - pulmonary embolism reperfusion and RV support

Scope: `theme-13`. Existing PE text already contained the key local doses, but the section lacked an explicit risk-to-action table. This pass preserved the OOKB 2025 protocol values, checked them against ESC/ERS 2019, and made the text safer for study by separating high-risk PE from intermediate-risk PE.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-13` | High-risk PE definition and reperfusion decision | verified / local plus international | `Клінічний протокол ТЕЛА 2025.docx`; ESC/ERS 2019 pulmonary embolism guideline | Added high-risk criteria, intermediate-high monitoring language, rescue reperfusion logic, and a warning not to use primary full-dose thrombolysis routinely in stable intermediate-risk PE. |
| `theme-13` | Thrombolysis, anticoagulation and RV-support doses | verified / local plus international | OOKB 2025; ESC/ERS 2019 Table 9/10 | Added alteplase `100 mg/2 h`, accelerated rtPA `0.6 mg/kg/15 min max 50 mg` with the not-officially-approved caveat, enoxaparin/fondaparinux/UFH anchors, norepinephrine/dobutamine ranges, and respiratory-support cautions. |
| `theme-13` | Local PE team/ECMO/catheter route | blocked-local | no receiving-center/PERT SOP in available files | Kept ECMO/PE-team route as local SOP gap; text does not invent accepting centers, phone order, or catheter-team availability. |

## Wave 16 - blood component dose guardrails

Scope: `theme-24`. Existing transfusion-reaction and threshold text was preserved. This pass focused on source-verified component-dose guardrails while avoiding false local precision: the actual component volume and ordering workflow still belong to the OOKB blood-bank SOP.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-24` | RBC, platelet, FFP and cryoprecipitate dose/reassessment guardrails | verified / international | NICE NG24 Blood transfusion; AABB 2023 RBC transfusion guideline; AABB/ICTMG 2025 platelet transfusion guideline | Added practical table for single-unit RBC strategy, adult/child/low-body-weight caveat, platelet one-dose reassessment, platelet thresholds, FFP indication without inventing a universal dose, and cryoprecipitate adult/child dosing. |
| `theme-24` | Local component volume and blood-bank documentation | blocked-local | no OOKB blood-bank SOP in available files | Kept a local gap for actual OOKB component volumes, ml/kg policy, request form, consent/hemovigilance pathway, release process and pediatric/obstetric component handling. |

## Wave 17 - anesthesia pharmacology label-dose anchors

Scope: `theme-22`. Existing induction, rocuronium/sugammadex and MH material was preserved. This pass checked the open pharmacology gap against current label sources and added only source-verifiable dose anchors. The rows are not a local OOKB anesthetic chart: available concentration, dilution, pump preset and special-population adjustment remain local-formulary work.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-22` | Fentanyl, morphine and nalbuphine dose anchors | verified / label plus local-formulary caveat | DailyMed fentanyl, morphine, and nalbuphine labels | Added adult starting/range anchors with respiratory-depression, CNS-depressant, CYP3A4, chest-wall rigidity, renal and mixed agonist-antagonist cautions. Tramadol remains in pain/formulary review rather than general-anesthesia pharmacology. |
| `theme-22` | Vecuronium and cisatracurium dose anchors | verified / label | DailyMed vecuronium bromide injection label; DailyMed cisatracurium besylate injection label | Added intubating bolus, maintenance and infusion anchors; emphasized TOF/nerve-stimulator monitoring, no analgesia/hypnosis and special caution in neuromuscular disease, older/renal patients, ICU and pregnancy with magnesium. |
| `theme-22` | Neostigmine reversal dose and anticholinergic pairing | verified / label | DailyMed neostigmine methylsulfate injection label | Added `0.03-0.07 mg/kg IV`, maximum `0.07 mg/kg` or `5 mg`, atropine/glycopyrrolate coadministration and warning not to reverse deep block by clock time alone. |
| `theme-22` | Local pharmacology chart | blocked-local | no OOKB anesthesia formulary/drug card in available files | Kept residual gap for available Ukrainian forms, concentrations, dilution, pump presets, maximum local doses and renal/hepatic/pregnancy/obesity adjustments. |

## Wave 18 - calcium magnesium phosphate and refeeding

Scope: `theme-18`. Existing DKA, bowel obstruction, hyperkalaemia, hyponatraemia, RRT and acid-base material was preserved. This pass closed the remaining source-verifiable Ca/Mg/P and refeeding gap without inventing local OOKB electrolyte concentrations or pharmacy preparations.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-18` | Refeeding risk criteria and first prescription guardrails | verified / international | NICE CG32 Nutrition support for adults | Added high-risk criteria, `10 kcal/kg/day` start, `5 kcal/kg/day` extreme-risk start, thiamine `200-300 mg/day`, and likely K/phosphate/Mg supplementation requirements. |
| `theme-18` | Symptomatic hypocalcemia and severe hypomagnesemia | verified / international reference | Merck Manual Professional hypocalcemia and hypomagnesemia chapters | Added calcium gluconate `10% 10 mL IV over 10 min`, magnesium sulfate `2-4 g IV over 5-10 min`, and monitoring cautions for ECG, digoxin, renal function and concurrent K/Ca abnormalities. |
| `theme-18` | Severe/symptomatic hypophosphatemia | partial / international reference plus local pharmacy dependency | Merck Manual Professional hypophosphatemia chapter | Added severe threshold `<1 mg/dL` (`<0.32 mmol/L`), indications for IV phosphate and monitoring hazards; left exact local phosphate salt, concentration and rate as SOP-dependent. |
| `theme-18` | Severe hypercalcemia of malignancy | verified / international professional | Endocrine Society 2022 hypercalcemia of malignancy guideline; Merck Manual Professional hypercalcemia chapter | Added severe threshold `>14 mg/dL` (`>3.5 mmol/L`) and initial antiresorptive/calcitonin framing; oncology/endocrine route remains local. |
| `theme-18` | Local electrolyte/refeeding order set | blocked-local | no OOKB nephrology/pharmacy/nutrition SOP in available files | Kept residual gap for local calcium/Mg/phosphate/3% NaCl storage, concentrations, call pathway and nutrition-team refeeding bundle form. |

## Wave 19 - postoperative thromboprophylaxis guardrails

Scope: `theme-10`. Existing text already framed thromboprophylaxis as a balance between `ВТЭ` and bleeding risk and correctly linked neuraxial-catheter timing to the regional-anesthesia module. The open problem was that the reader had no operation/discharge-oriented table. No OOKB operation-specific prophylaxis card was found in the available files, so this pass adds an international guardrail table and keeps exact local prescriptions as blocked-local.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-10` | Postoperative thromboprophylaxis by surgical situation, duration and discharge planning | verified / international, local SOP still required | ASH 2019 VTE prevention guideline for hospitalized surgical patients; NICE NG89 `Venous thromboembolism in over 16s` | Added a table for all surgical/trauma admissions, high bleeding risk, major surgery, abdominal cancer surgery, abdominal surgery, elective hip/knee replacement, cranial/spinal surgery, serious trauma, neuraxial-catheter handling and routine `IVC filter` avoidance. |
| `theme-10` | Exact OOKB postoperative prophylaxis card | blocked-local | no OOKB operation-specific thromboprophylaxis SOP in available files | Left as residual SOP gap: operation, mechanical method, `НМГ/НФГ/DOAC/aspirin`, dose, start time, duration, renal/weight adjustment, discharge prescription and neuraxial intervals. |

## Wave 20 - bowel obstruction source-control and antibiotic guardrails

Scope: `theme-18`. Existing intestinal-obstruction text already had a correct AIT frame: aspiration risk, hypovolemia, electrolytes, `КТ`, urgent-surgery red flags and antibiotics only for ischemia/perforation/sepsis. This pass source-checked that frame against WSES and added a practical source-control/antibiotic table without inventing OOKB operation routing or local antibiotic choices.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-18` | Bowel obstruction source-control and antibiotic decision table | verified / international, local SOP still required | WSES Bologna guidelines 2017/2018; Surgical Infection Society 2024 intra-abdominal infection guideline; IDSA 2024 complicated intra-abdominal infection guideline | Added a table separating stable simple suspected `ASBO`, uncertain/complicated obstruction, closed-loop/ischemia/perforation/peritonitis/sepsis, peri-source-control antibiotic timing, short-course therapy after adequate source control and damage-control situations. |
| `theme-18` | Local obstruction route and empiric antibiotic card | blocked-local | no OOKB bowel-obstruction/source-control SOP in available files | Replaced the generic gap with a local SOP gap: surgeon/CT/OR/ICU call path, empiric regimens by source and MDR risk, culture process, source-control time documentation and 24/48-hour de-escalation owner. |

## Wave 21 - pediatric neurocritical TBI and status guardrails

Scope: `theme-17`. Existing adult stroke, adult TBI, osmotherapy, status epilepticus and transport material was preserved. This pass filled the explicit pediatric neuro-ICU source gap with pediatric severe TBI guardrails and kept local route, drug stock and `EEG/cEEG` access as SOP-dependent.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-17` | Pediatric severe TBI ICP/CPP/hyperosmolar/seizure guardrails | verified / international, local SOP still required | Brain Trauma Foundation pediatric severe TBI 3rd edition; AES 2016 convulsive status epilepticus guideline | Added pediatric table for `ICP <20`, `CPP` minimum `40` and range `40-50`, `3% NaCl` bolus/infusion, `23.4% NaCl` bolus ceiling, severe-hyperventilation caution, early seizure prophylaxis, and refractory status ICU requirements. |
| `theme-17` | Local pediatric neurocritical route, stock and monitoring | blocked-local | no OOKB pediatric neurocritical SOP in available files | Replaced the generic pediatric gap with a local SOP gap: pediatric severe TBI/status receiving team, CT/neurosurgery/ICU access, local `3%/23.4% NaCl`, mannitol, fosphenytoin/phenytoin, levetiracetam, `EEG/cEEG`, and transfer to a pediatric center. |

## Wave 22 - sodium bicarbonate for sodium-channel cardiotoxicity

Scope: `theme-23`. Existing toxicology material and the practical antidote table were preserved. This pass closed the explicit source gap on sodium bicarbonate for wide `QRS`/sodium-channel cardiotoxicity and kept local stock, toxicologist route, pediatrics and pregnancy as residual local/specialist issues.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-23` | Sodium bicarbonate indications and dosing for sodium-channel blocker cardiotoxicity | verified / international toxicology, local SOP still required | J Med Toxicol 2016 sodium bicarbonate QRS review; NCBI Bookshelf StatPearls Sodium Channel Blocker Toxicity | Replaced the old `Требует сверки` row with `QRS >100 мс`/wide-complex dysrhythmia/hypotension context, `1-2 мЭкв/кг` bolus, repeated boluses until QRS/hemodynamics improve, infusion target pH `7,45-7,55` and ceiling `7,55`, plus Na/K/Ca/volume/ventilation monitoring. |
| `theme-23` | Evidence limits and seizure caveat in sodium-channel blocker poisoning | verified / warning | J Med Toxicol 2016 sodium bicarbonate QRS review; StatPearls 2024 | Added caveat that bicarbonate is best supported for TCA-induced QRS widening, less certain for several other agents, weak/unpredictable for bupropion/propranolol/taxine, and that phenytoin/fosphenytoin should not be chosen for seizures in sodium-channel blocker toxicity. |

## Wave 23 - pediatric and obstetric PONV guardrails

Scope: `theme-10`. Existing adult `PONV`, `PACU`, `Aldrete/PADSS` and thromboprophylaxis content was preserved. This pass filled the source-verifiable pediatric and obstetric layer while keeping the final OOKB formulary card as local SOP work.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-10` | Pediatric `POV/PONV` risk factors and weight-based antiemetic doses | verified / international, local formulary still required | Fourth Consensus Guidelines for PONV 2020 | Added `POVOC` factors, pediatric baseline-risk reduction, and doses for ondansetron, dexamethasone, droperidol and aprepitant with maximums and monitoring caveats. |
| `theme-10` | Cesarean/postpartum antiemetic layer and breastfeeding cautions | verified / international plus lactation reference, local SOP still required | ERAS Society cesarean intraoperative care 2025 update; LactMed ondansetron, dexamethasone and metoclopramide | Added cesarean/ERAC antiemetic prophylaxis framing, ondansetron `4-8 mg IV` postpartum/cesarean lactation note, dexamethasone lactation caution, and metoclopramide galactagogue/depression caution. |
| `theme-10` | Local pediatric/obstetric PONV card | blocked-local | no OOKB pediatric/obstetric PONV formulary in available files | Replaced generic `Требует сверки` gap with local SOP gap for available agents, age limits, QT route, breastfeeding prompts, cesarean/gynecology scheme, rescue after failed prophylaxis and approval owner. |

## Wave 24 - renal hepatic medication-safety guardrails

Scope: `theme-01` and `theme-18`. Existing renal/hepatic risk text was preserved. This pass does not create a fake universal dose-adjustment table; it adds source-verified medication-safety checks that must precede any local dose decision, then leaves exact dose charts as formulary/SOP work.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-01` | Preoperative CKD/dialysis/cirrhosis medication-safety checklist | verified / MOH plus international, local formulary still required | KDIGO 2024 CKD Guideline; МОЗ 2024-1734; AASLD 2022 decompensated cirrhosis practice guidance; VA liver medication-safety material | Added table requiring `eGFR/CrCl`, electrolytes, trend, dialysis plan, nephrotoxic-stack review, cirrhosis/ascites/encephalopathy review, `НПВП` avoidance framing, acetaminophen/paracetamol duplicate-dose caution and written stop/restart plan. |
| `theme-18` | ICU medication stewardship in renal/hepatic dysfunction | verified / international, local formulary still required | KDIGO 2024; AASLD/VA medication-safety layer; ASRA 2025 for anticoagulant cross-link | Added ICU-focused checklist for antibiotics/TDM, analgesics/sedatives, anticoagulants and electrolytes/concentrates; emphasized that exact dosing must come from the local formulary/label and pharmacy/nephrology/hepatology route. |
| `theme-01`, `theme-18` | Exact OOKB renal/hepatic dose table | blocked-local | no OOKB medication-adjustment formulary in available files | Replaced generic “нужна таблица” gaps with local-formulary gaps for available drugs, concentrations, TDM, dialysis handling and medication restart rules. |

## Wave 25 - final rapid review refresh

Scope: `theme-25`. Existing rapid-repeat text was preserved. This pass refreshes the final review from already filled high-risk modules and adds no new clinical facts; source status remains inherited from the profile modules and their ledger entries.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-25` | Final rapid review outdated after previous gap-fill waves | verified / internal synthesis, no new clinical facts | Existing source-verified modules `theme-10`, `theme-13`, `theme-17`, `theme-18`, `theme-21`, `theme-24`, plus wave 24 | Added an updated rapid-review table for `LAST`, `ARDS`, high-risk `ТЭЛА`, hyperkalaemia, pediatric TBI, CKD/cirrhosis medication safety and blood components. |
| `theme-25` | Future local SOP refresh | blocked-local | local SOP/formulary not represented in available files | Replaced the old generic update gap with a periodic-update gap for `MTP`, crisis-cart, pediatric airway, transport, renal/hepatic formulary and local routes. |

## Wave 26 - Ukrainian transfusion traceability and hemovigilance guardrails

Scope: `theme-24`. Existing transfusion thresholds, component-dose guardrails and reaction-recognition text were preserved. This pass closes the national Ukrainian documentation/traceability part of the gap using current Rada/UTCC sources, while keeping actual OOKB blood-bank forms, release/return route and component volumes as local SOP work.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-24` | Ukrainian transfusion traceability, consent/justification, labeling, storage and hemovigilance frame | verified / active МОЗ plus national forms | МОЗ №2225/2022; МОЗ №818/2023; Український центр трансплант-координації transfusion forms | Added a national guardrail table covering order/consent, component and recipient identification, if-not-transfused location confirmation, label fields, storage temperatures/time, serious reaction investigation and available national forms. |
| `theme-24` | Actual OOKB blood-bank route, local request/consent form and component volumes | blocked-local | no OOKB blood-bank SOP or local component-volume table in available files | Replaced the old national-rule gap with a narrower local SOP gap: adapt traceability/hemovigilance to OOKB consent, request, issue/return log, storage site, responsible role and adverse-reaction reporting route. |

## Wave 27 - local PDF packet evaluation and pediatric airway/fluid anchors

Scope: source evaluation plus `theme-19`. Four new PDF files were extracted and reviewed as study-support material. Only the pediatric anesthesia manual produced direct reader-facing content in this wave, because it closes part of the existing pediatric equipment/fluid gap without changing active МОЗ/ДЭЦ resuscitation, diabetes, or pediatric CPR framing.

| Theme | Gap | Status | Source | Action in `source.md` |
| --- | --- | --- | --- | --- |
| `theme-19` | Pediatric LMA/ETT equipment anchors and maintenance-fluid rule | verified / educational, not local SOP | `Алгоритм_дій_дитячого_анестезіолога_2020_1.pdf`; AAP maintenance-IV-fluid guideline 2018; МОЗ/ДЭЦ newborn standard remains primary for neonatal resuscitation | Added `Педиатрическое оборудование: учебные размеры и инфузионный минимум` with LMA sizes, neonatal ETT size anchors, `4-2-1` maintenance fluid, and an isotonic-fluid composition caution. Kept local SOP gap for device-specific cards, cuff-pressure policy, fasting and premedication. |
| `theme-07`, `theme-19` | Pain assessment and pediatric pain-control material from new PDF packet | partial / future wave | `Контроль_периопераційного_болю_1.pdf`; `Невідкладні стани в педіатрії 2023.pdf` | Recorded source status only. Future edits should use these documents for pain scales and service organization after checking current МОЗ/ДЭЦ and labels. |
| `theme-19` | Pediatric emergency cross-check packet | partial / future wave | `Невідкладні стани в педіатрії 2020.pdf`; `Невідкладні стани в педіатрії 2023.pdf` | Recorded source status only. Existing МОЗ/ДЭЦ CPR and newborn-care values were not overridden. |

## Remaining blocked-local items

- Exact OOKB medication storage and night-access map: antidotes, dantrolene, lipid emulsion, crisis cart contents.
- Local difficult-airway SOP: airway trolley, `VL/SAD/ЭТТ` sizes, bougie/stylet availability, `eFONA` kit location, who is called for `CICO`, and team-drill frequency.
- Local MTP activation card: blood bank contacts, runner role, component delivery time, fibrinogen/cryo/calcium location, neonatal call.
- Local burn/warming SOP: burn-center transfer criteria, `TBSA` chart, blood/fluid warmer availability, temperature measurement site, and warming ownership during `ED -> CT/OR/ICU` transfers.
- Local cardiogenic-shock route: shock team, PCI/cardiac surgery/MCS contacts, transfer criteria, accepting centers, transport responsibility, and minimum data packet.
- Local post-ROSC route: ICU bed ownership, cath lab, CT, ECMO/cardiac surgery transfer availability.
- Local antithrombotic/peripheral-block SOP: department-approved list of deep/noncompressible versus superficial/compressible blocks, exact handling of urgent surgery, available anti-Xa/drug-level testing, catheter removal timing and observation frequency.
- Local neuraxial complication route and observation form: approved frequency of observations, responsible role, MRI/neurosurgery call route, catheter-infusion stop policy, and electronic/paper chart location.
- Local PONV formulary for pediatrics, pregnancy, breastfeeding and QT-risk substitution.
- Local postoperative thromboprophylaxis card: operation-specific mechanical method, `НМГ/НФГ/DOAC/aspirin`, dose, start time, duration, renal/weight adjustment, discharge prescription and neuraxial intervals.
- Local PACU escalation route: who accepts delayed recovery, when to call ICU/surgeon/consultants, exact OOKB PACU observation frequency, and criteria for bypassing PACU to ICU.
- Local PCA/PCEA and acute-pain service order sheets: concentrations, pump defaults, nursing observation intervals, rescue medication policy and escalation contacts.
- Local antibiotic prophylaxis appendices after `ГС 2026-540`: procedure-specific choices, allergy alternatives, renal adjustment and stock availability.
- Local renal/hepatic medication-adjustment formulary: available anesthetics, opioids, antibiotics, anticoagulants, antiemetics, electrolyte salts, TDM access, dialysis handling and restart rules.
- Local ECMO escalation pathway: accepting centers, call order, minimum data packet, transport responsibility, and exclusion criteria.
- Local sepsis huddle/source-control workflow: who activates it, who calls procedural teams, and how 24/48-hour de-escalation is documented.
- Local bowel-obstruction/source-control route: surgeon, CT, OR, ICU, empiric antibiotics by focus/MDR risk, cultures, source-control time and de-escalation owner.
- Local nephrology/RRT escalation workflow: who is called first, night/weekend access, available modality, and local thresholds for bicarbonate, hypertonic sodium and electrolyte replacement concentrations.
- Local neurocritical route: CT/neurosurgery/OR/ICU ownership, ICP monitor availability, 3%/23.4% saline stock, continuous EEG access, pediatric neurocritical receiving route, and transport team requirements.
- Local blood-bank component volumes and pediatric/obstetric ml/kg policy.
- Local depth-monitoring policy: when `BIS/processed EEG` is mandatory, sensor stock/location, documentation of suspected awareness or excessive depth, and who reviews the event.
- Local perioperative fluid/GDFT SOP: available balanced crystalloids, monitors for `SV/CO/PPV/SVV`, target variables, stop rules for boluses and how fluid decisions are charted.
- Visual atlas assets for ultrasound blocks, LUS, and FoCUS; these belong to a future UI/media iteration, not a text-only source fill.

## Residual risk

This pass improves the high-risk reader content but does not certify the whole `source.md` as a clinical protocol. Where Ukrainian current documents are absent, international guidance is marked as international. Where operational details depend on OOKB practice, the text deliberately stays blocked-local.
