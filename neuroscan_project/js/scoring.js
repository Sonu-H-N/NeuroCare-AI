/* ═══════════════════════════════════════════
   NeuroScan AI — Multi-Domain Scoring Engine
   Evidence-based weighted risk model
═══════════════════════════════════════════ */

const Scoring = {

  compute(d) {
    const genetic   = this.genetic(d);
    const lifestyle = this.lifestyle(d);
    const medical   = this.medical(d);
    const cognitive = this.cognitive(d);
    const biomarker = this.biomarker(d);
    const screening = this.screening(d);
    const ageFactor = this.ageFactor(d);

    const W = CONFIG.WEIGHTS;
    const overall = Math.round(
      genetic   * W.genetic +
      cognitive * W.cognitive +
      biomarker * W.biomarker +
      medical   * W.medical +
      lifestyle * W.lifestyle +
      ageFactor * W.age +
      screening * W.screening
    );

    return {
      genetic, lifestyle, medical, cognitive,
      biomarker, screening, ageFactor,
      overall: Utils.clamp(overall, 1, 99)
    };
  },

  /* ── DOMAIN: Genetic & Hereditary ── */
  genetic(d) {
    let s = 0;
    // APOE4 — strongest genetic risk factor
    if (d.apoe4 === 'Homozygous')    s += 60;
    else if (d.apoe4 === 'Heterozygous') s += 32;
    else if (d.apoe4 === 'Unknown')  s += 14;

    // Family history
    if (d.fhist === 'Multiple')  s += 32;
    else if (d.fhist === '2 parents') s += 28;
    else if (d.fhist === '1 parent')  s += 16;
    else if (d.fhist === 'Sibling')   s += 13;

    // Early-onset in family (< 65)
    if (d.earlyOnset === 'Yes') s += 18;

    // Rare autosomal dominant mutations
    if (d.mutations && d.mutations.some(m =>
      m.includes('PSEN1') || m.includes('PSEN2') || m.includes('APP')
    )) s += 28;

    // TBI
    if (d.tbi === 'Severe/Repeated') s += 18;
    else if (d.tbi === 'Moderate')   s += 10;
    else if (d.tbi === 'Mild')       s += 5;

    // Stroke / TIA
    if (d.stroke === 'Multiple') s += 20;
    else if (d.stroke === 'Stroke')  s += 14;
    else if (d.stroke === 'TIA')     s += 7;

    return Utils.clamp(s, 0, 100);
  },

  /* ── DOMAIN: Lifestyle ── */
  lifestyle(d) {
    let s = 0;

    // Physical activity (Lancet 2024: 17% population attributable risk)
    if (d.exercise === 'Sedentary')  s += 26;
    else if (d.exercise === 'Light') s += 13;
    else if (d.exercise === 'Vigorous') s -= 8;

    // Diet pattern
    if (d.diet === 'Unhealthy')      s += 20;
    else if (d.diet === 'MIND' || d.diet === 'Mediterranean') s -= 12;
    else if (d.diet === 'Plant-based') s -= 7;
    else if (d.diet === 'Average Western') s += 8;

    // Sleep duration
    const sl = parseFloat(d.sleep || 7);
    if (sl < 5)       s += 20;
    else if (sl < 6)  s += 12;
    else if (sl > 9)  s += 10;

    // Sleep quality
    if (d.sleepQ === 'Poor')      s += 12;
    else if (d.sleepQ === 'Fair') s += 5;
    else if (d.sleepQ === 'Excellent') s -= 4;

    // Smoking
    if (d.smoking === 'Current (20+/day)') s += 26;
    else if (d.smoking === 'Current (<20/day)') s += 16;
    else if (d.smoking === 'Former') s += 8;

    // Alcohol
    if (d.alcohol === 'Heavy')    s += 18;
    else if (d.alcohol === 'None') s += 2; // slight increased risk (J-curve)

    // Social isolation (Lancet 2024: 5% PAR)
    if (d.social === 'Isolated') s += 18;
    else if (d.social === 'Limited') s += 9;
    else if (d.social === 'Active') s -= 7;

    // Cognitive stimulation
    if (d.cogstim === 'Low')  s += 12;
    else if (d.cogstim === 'High') s -= 7;

    // Chronic stress (cortisol → hippocampal atrophy)
    const st = parseInt(d.stress || 0);
    if (st >= 8)      s += 14;
    else if (st >= 6) s += 8;
    else if (st <= 2) s -= 4;

    // Air pollution (PM2.5 neurotoxicity)
    if (d.pollution === 'High')    s += 10;
    else if (d.pollution === 'Moderate') s += 5;

    // Education (cognitive reserve)
    if (d.education && d.education.includes('Graduate')) s -= 10;
    else if (d.education && d.education.includes('Bachelor')) s -= 6;
    else if (d.education && d.education.includes('Less than')) s += 8;

    return Utils.clamp(s, 0, 100);
  },

  /* ── DOMAIN: Medical Comorbidities ── */
  medical(d) {
    let s = 0;
    const conds = d.conditions || [];

    // Individual conditions
    if (conds.includes('Hypertension'))          s += 12;
    if (conds.includes('Type 2 Diabetes'))       s += 14;
    if (conds.includes('High Cholesterol'))      s += 7;
    if (conds.includes('Cardiovascular Disease')) s += 12;
    if (conds.includes('Obesity'))               s += 8;
    if (conds.includes('Depression'))            s += 12;
    if (conds.includes('Anxiety Disorder'))      s += 6;
    if (conds.includes('Sleep Apnea'))           s += 9;
    if (conds.includes('Hearing Loss'))          s += 10;
    if (conds.includes('Hypothyroidism'))        s += 5;
    if (conds.includes('Atrial Fibrillation'))   s += 11;
    if (conds.includes('Chronic Kidney Disease')) s += 7;
    if (conds.includes('Rheumatoid Arthritis'))  s += 4;

    // Blood pressure
    if (d.bp === 'Stage 2 HTN')   s += 16;
    else if (d.bp === 'Stage 1 HTN') s += 9;
    else if (d.bp === 'Elevated') s += 4;

    // BMI
    if (d.bmi === 'Severely Obese') s += 18;
    else if (d.bmi === 'Obese')     s += 11;
    else if (d.bmi === 'Overweight') s += 5;
    else if (d.bmi === 'Underweight') s += 6;

    // Cholesterol
    if (d.cholesterol === 'High')       s += 8;
    else if (d.cholesterol === 'Borderline') s += 4;

    // Glucose / Diabetes
    if (d.glucose === 'Uncontrolled Diabetes') s += 18;
    else if (d.glucose === 'Type 2 Diabetes') s += 10;
    else if (d.glucose === 'Prediabetes')     s += 5;

    // Polypharmacy
    const meds = parseInt(d.meds || 0);
    if (meds >= 10)     s += 12;
    else if (meds >= 5) s += 7;

    // Depression severity
    if (d.depression === 'Severe')   s += 16;
    else if (d.depression === 'Moderate') s += 10;
    else if (d.depression === 'Mild')     s += 5;

    // Vitamin D
    if (d.vitd === 'Deficient')    s += 8;
    else if (d.vitd === 'Insufficient') s += 4;

    // Inflammatory markers
    if (d.inflam === 'Elevated') s += 8;

    // Homocysteine
    if (d.homocys === 'Elevated') s += 8;

    // Untreated hearing loss
    if (conds.includes('Hearing Loss') && d.hearing === 'No (untreated)') s += 8;

    return Utils.clamp(s, 0, 100);
  },

  /* ── DOMAIN: Cognitive Symptoms ── */
  cognitive(d) {
    const symFields = [
      's_memory', 's_lang', 's_orient', 's_exec',
      's_mood', 's_repeat', 's_tasks', 's_visual', 's_apathy', 's_halluc'
    ];
    // Weighted — memory and executive function matter more
    const weights = [1.5, 1.0, 1.2, 1.3, 0.8, 1.0, 1.0, 0.9, 0.8, 1.5];
    let total = 0, maxTotal = 0;
    symFields.forEach((f, i) => {
      total += (parseInt(d[f] || 0)) * weights[i];
      maxTotal += 10 * weights[i];
    });
    let s = Math.round((total / maxTotal) * 100);

    // Duration bonus
    if (d.symdur === '>2 years')    s = Utils.clamp(s + 15, 0, 100);
    else if (d.symdur === '1-2 years') s = Utils.clamp(s + 8, 0, 100);
    else if (d.symdur === '6-12 months') s = Utils.clamp(s + 4, 0, 100);

    return Utils.clamp(s, 0, 100);
  },

  /* ── DOMAIN: Biomarkers & Imaging ── */
  biomarker(d) {
    let s = 0;

    // CSF Amyloid (core AD biomarker)
    if (d.amyloid === 'Low (abnormal)') s += 30;
    else if (d.amyloid === 'Borderline low') s += 15;

    // CSF Tau
    if (d.tau === 'Highly elevated') s += 30;
    else if (d.tau === 'Elevated')   s += 18;

    // MRI findings
    if (d.mri === 'Significant atrophy')    s += 32;
    else if (d.mri === 'Hippocampal atrophy') s += 25;
    else if (d.mri === 'White matter lesions') s += 14;
    else if (d.mri === 'Mild atrophy')      s += 10;

    // PET
    if (d.pet === 'Both positive')         s += 40;
    else if (d.pet === 'Amyloid positive') s += 26;
    else if (d.pet === 'FDG hypometabolism') s += 20;

    // MMSE (validated cognitive screen 0-30)
    const mmse = parseInt(d.mmse || 30);
    if (mmse <= 10)      s += 40;
    else if (mmse <= 17) s += 30;
    else if (mmse <= 23) s += 20;
    else if (mmse <= 27) s += 8;

    // MoCA (0-30, ≥26 = normal)
    const moca = parseInt(d.moca || 30);
    if (moca <= 10)      s += 35;
    else if (moca <= 17) s += 25;
    else if (moca <= 21) s += 15;
    else if (moca <= 25) s += 8;

    // Neuropsychological testing
    if (d.neuropsych === 'Dementia') s += 35;
    else if (d.neuropsych === 'MCI') s += 20;
    else if (d.neuropsych === 'Normal') s -= 5;

    // Plasma NfL
    if (d.nfl === 'Elevated') s += 15;

    return Utils.clamp(s, 0, 100);
  },

  /* ── DOMAIN: Mini Screening (inverted — higher = more impaired) ── */
  screening(d) {
    const total = ['q1','q2','q3','q4','q5']
      .map(k => parseInt(d[k] || 3))
      .reduce((a, b) => a + b, 0);
    // 15 = perfect, 0 = fully impaired → invert for risk
    return Utils.clamp(Math.round((1 - total / 15) * 100), 0, 100);
  },

  /* ── Age factor (exponential after 65) ── */
  ageFactor(d) {
    const age = parseInt(d.age || 65);
    if (age < 60)      return 6;
    if (age < 65)      return 14;
    if (age < 70)      return 26;
    if (age < 75)      return 40;
    if (age < 80)      return 56;
    if (age < 85)      return 70;
    return 84;
  },

  /* ── Individual Factor List (for bar display) ── */
  factorBreakdown(d) {
    return [
      { n: 'APOE4 Genetic Status',         v: d.apoe4==='Homozygous'?90:d.apoe4==='Heterozygous'?55:d.apoe4==='Unknown'?20:5,                        mod: false, opt: 'No APOE4 alleles' },
      { n: 'Family History of AD',          v: d.fhist==='Multiple'?72:d.fhist==='2 parents'?62:d.fhist==='1 parent'?34:d.fhist==='Sibling'?28:5,    mod: false, opt: 'No family history' },
      { n: 'Memory Symptoms',               v: parseInt(d.s_memory||0)*10,                                                                              mod: true,  opt: '0/10 — none' },
      { n: 'Physical Activity',             v: d.exercise==='Sedentary'?80:d.exercise==='Light'?50:d.exercise==='Moderate'?22:5,                       mod: true,  opt: 'Vigorous 5+/week' },
      { n: 'MRI / Brain Imaging',           v: d.mri==='Significant atrophy'?90:d.mri==='Hippocampal atrophy'?75:d.mri==='Mild atrophy'?38:d.mri==='White matter lesions'?34:5, mod: false, opt: 'Normal' },
      { n: 'Blood Pressure',                v: d.bp==='Stage 2 HTN'?74:d.bp==='Stage 1 HTN'?44:d.bp==='Elevated'?22:8,                               mod: true,  opt: 'Normal (<120/80)' },
      { n: 'CSF Amyloid-β42',               v: d.amyloid==='Low (abnormal)'?84:d.amyloid==='Borderline low'?44:5,                                     mod: false, opt: 'Normal' },
      { n: 'MMSE Score',                    v: parseInt(d.mmse||30)<=17?88:parseInt(d.mmse||30)<=23?58:parseInt(d.mmse||30)<=27?24:5,                  mod: false, opt: '30/30 perfect' },
      { n: 'Depression',                    v: d.depression==='Severe'?68:d.depression==='Moderate'?44:d.depression==='Mild'?20:5,                     mod: true,  opt: 'No depression' },
      { n: 'Sleep Quality & Duration',      v: (d.sleepQ==='Poor'?38:d.sleepQ==='Fair'?18:4)+(parseFloat(d.sleep||7)<6||parseFloat(d.sleep||7)>9?32:0), mod: true, opt: '7-8h good quality' },
      { n: 'Type 2 Diabetes',               v: d.conditions?.includes('Type 2 Diabetes')?54:d.glucose==='Prediabetes'?24:4,                            mod: true,  opt: 'Normal glucose' },
      { n: 'Smoking Status',                v: d.smoking==='Current (20+/day)'?68:d.smoking==='Current (<20/day)'?48:d.smoking==='Former'?24:4,        mod: true,  opt: 'Never smoked' },
      { n: 'Social Isolation',              v: d.social==='Isolated'?64:d.social==='Limited'?38:d.social==='Moderate'?18:4,                            mod: true,  opt: 'Very active social life' },
      { n: 'Executive Function',            v: parseInt(d.s_exec||0)*10,                                                                                mod: true,  opt: '0/10 — none' },
      { n: 'Age Risk',                      v: this.ageFactor(d),                                                                                       mod: false, opt: 'Younger age' },
      { n: 'PET Scan Result',               v: d.pet==='Both positive'?90:d.pet==='Amyloid positive'?68:d.pet==='FDG hypometabolism'?58:4,              mod: false, opt: 'Normal / Not done' },
      { n: 'CSF Tau Level',                 v: d.tau==='Highly elevated'?84:d.tau==='Elevated'?54:4,                                                    mod: false, opt: 'Normal' },
      { n: 'BMI / Obesity',                 v: d.bmi==='Severely Obese'?58:d.bmi==='Obese'?44:d.bmi==='Overweight'?24:4,                              mod: true,  opt: 'Normal BMI 18.5–24.9' },
      { n: 'Chronic Stress',                v: parseInt(d.stress||0)*8,                                                                                 mod: true,  opt: 'Stress level ≤ 2' },
      { n: 'Diet Pattern',                  v: d.diet==='Unhealthy'?64:d.diet==='Average Western'?34:d.diet==='Mediterranean'||d.diet==='MIND'?4:8,    mod: true,  opt: 'MIND or Mediterranean' },
      { n: 'Untreated Hearing Loss',        v: d.conditions?.includes('Hearing Loss')&&d.hearing==='No (untreated)'?54:d.conditions?.includes('Hearing Loss')?24:4, mod: true, opt: 'No hearing loss / treated' },
      { n: 'Air Pollution Exposure',        v: d.pollution==='High'?38:d.pollution==='Moderate'?18:4,                                                   mod: true,  opt: 'Low pollution area' },
      { n: 'Vitamin D Status',              v: d.vitd==='Deficient'?44:d.vitd==='Insufficient'?24:4,                                                    mod: true,  opt: 'Sufficient Vitamin D' },
      { n: 'Inflammatory Markers (CRP)',    v: d.inflam==='Elevated'?38:4,                                                                              mod: true,  opt: 'Normal CRP/IL-6' },
      { n: 'Neuropsych Testing Result',     v: d.neuropsych==='Dementia'?90:d.neuropsych==='MCI'?58:d.neuropsych==='Normal'?4:8,                        mod: false, opt: 'Normal result' },
    ].sort((a, b) => b.v - a.v);
  },

  /* ── Protective Factors ── */
  protectiveFactors(d) {
    const factors = [];
    if (d.exercise === 'Vigorous' || d.exercise === 'Moderate')
      factors.push('Regular physical activity — reduces risk by up to 45%');
    if (d.diet === 'Mediterranean' || d.diet === 'MIND')
      factors.push('Neuroprotective diet (MIND/Mediterranean) — reduces risk by 35–53%');
    if (d.social === 'Active')
      factors.push('Strong social engagement — builds cognitive reserve');
    if (d.cogstim === 'High')
      factors.push('High cognitive stimulation — promotes neuroplasticity');
    if (d.education && (d.education.includes('Graduate') || d.education.includes('Bachelor')))
      factors.push('Higher educational attainment — increased cognitive reserve');
    if (d.smoking === 'Never')
      factors.push('Lifelong non-smoker — reduces vascular and oxidative risk');
    if (parseInt(d.mmse || 30) >= 28)
      factors.push('Strong MMSE performance (≥28) — intact global cognition');
    if (d.depression === 'None')
      factors.push('No depression history — preserved hippocampal volume');
    if (parseFloat(d.sleep || 7) >= 7 && parseFloat(d.sleep || 7) <= 9 && d.sleepQ !== 'Poor')
      factors.push('Adequate sleep duration & quality — effective glymphatic clearance');
    if (d.stress && parseInt(d.stress) <= 3)
      factors.push('Low chronic stress — reduced cortisol-mediated neurodegeneration');
    if (d.apoe4 === 'None')
      factors.push('No APOE4 alleles — baseline genetic risk');
    if (d.fhist === 'None')
      factors.push('No family history of Alzheimer\'s');
    return factors;
  }
};
