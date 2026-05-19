/* ═══════════════════════════════════════════
   NeuroScan AI — Education Page
═══════════════════════════════════════════ */

function renderEducationPage() {
  const el = document.getElementById('page-education');
  if (!el) return;

  el.innerHTML = `
  <div class="page-inner">
    <h2 style="font-family:var(--serif);font-size:2rem;margin-bottom:.4rem">Learn About Alzheimer's</h2>
    <p style="color:var(--muted);font-size:14px;margin-bottom:2rem">Evidence-based information on Alzheimer's disease, risk factors, biomarkers, and prevention strategies.</p>

    <div class="divider">Overview Cards</div>
    <div class="auto-col" style="margin-bottom:2rem">
      ${[
        ['WHAT IS IT','#e6eef7','#2b567f','Understanding Alzheimer\'s Disease','Alzheimer\'s is a progressive neurodegenerative disorder characterised by extracellular amyloid-β plaques and intracellular tau neurofibrillary tangles, leading to synaptic loss, neuroinflammation, and ultimately neuronal death. It is the most common cause of dementia, accounting for 60–70% of cases worldwide.'],
        ['GLOBAL IMPACT','#fdf3e3','#b06c08','Worldwide Prevalence','55 million people worldwide currently live with dementia. Alzheimer\'s is the 7th leading cause of death globally. By 2050, cases are projected to reach 139 million. Annual global cost exceeds US$1.3 trillion, making it one of the most economically burdensome diseases.'],
        ['PREVENTION','#e5f5ec','#167040','Up to 40% Preventable','The Lancet Commission 2024 identified 14 modifiable risk factors — including physical inactivity, hearing loss, depression, social isolation, smoking, air pollution, and untreated hypertension — collectively accounting for ~45% of dementia cases worldwide.'],
        ['GENETICS','#ede8f7','#5b3f9a','The APOE4 Gene','The APOE ε4 allele is the strongest genetic risk factor for late-onset AD. One copy raises risk 2–3×; two copies raise it 8–12×. Approximately 25% of the population carries at least one APOE4 allele. It accelerates amyloid accumulation and reduces amyloid clearance.'],
        ['BIOMARKERS','#e3f4f4','#0f7070','The ATN Framework','Modern AD diagnosis uses the ATN framework: Amyloid biomarkers (A) via CSF Aβ42 or amyloid-PET, Tau pathology (T) via CSF pTau-181, and Neurodegeneration (N) via FDG-PET or hippocampal MRI volume. Biomarker changes precede symptoms by 15–20 years.'],
        ['TREATMENT','#fdeaea','#b02e2e','Current & Emerging Treatments','FDA-approved treatments include cholinesterase inhibitors (donepezil, rivastigmine), memantine (NMDA antagonist), and newer anti-amyloid monoclonal antibodies: lecanemab (Leqembi, 2023) and donanemab (Kisunla, 2024). These slow progression by 27–35% in early-stage patients.'],
      ].map(([tag,bg,color,title,text]) => `
        <div class="edu-card">
          <span class="edu-tag" style="background:${bg};color:${color}">${tag}</span>
          <div class="edu-title">${title}</div>
          <div class="edu-text">${text}</div>
        </div>`).join('')}
    </div>

    <div class="divider">Modifiable Risk Factors (Lancet 2024)</div>
    <div class="card" style="margin-bottom:2rem">
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>#</th><th>Risk Factor</th><th>Population Attributable Risk</th><th>Key Mechanism</th><th>Intervention</th></tr></thead>
          <tbody>
            ${[
              ['1','Education (low)','5%','Reduced cognitive reserve','Higher education, lifelong learning'],
              ['2','Hearing loss (untreated)','7%','Social isolation, cognitive load','Hearing aids, early treatment'],
              ['3','LDL cholesterol (high)','7%','Vascular damage, amyloid production','Statins, dietary changes'],
              ['4','Depression','3%','Neuroinflammation, HPA dysregulation','Antidepressants, therapy, exercise'],
              ['5','Physical inactivity','4%','Reduced BDNF, vascular risk','150 min/week moderate aerobic exercise'],
              ['6','Diabetes','2%','AGE products, insulin resistance, amyloid','Blood glucose control, metformin'],
              ['7','Smoking','5%','Oxidative stress, cerebrovascular damage','Cessation programs'],
              ['8','Hypertension (midlife)','2%','Cerebrovascular disease, white matter damage','Antihypertensives, DASH diet'],
              ['9','Obesity (midlife)','1%','Metabolic syndrome, neuroinflammation','Weight management, exercise'],
              ['10','Alcohol (heavy)','1%','Direct neurotoxicity, thiamine deficiency','Reduction to low/moderate levels'],
              ['11','Traumatic brain injury','3%','Axonal injury, amyloid release','Helmet use, fall prevention'],
              ['12','Air pollution','2%','Neuroinflammation, oxidative stress','Relocation, air purifiers, masks'],
              ['13','Social isolation','5%','Cognitive disuse, stress, depression','Community activities, volunteering'],
              ['14','Vision loss (untreated)','2%','Social isolation, cognitive input reduction','Glasses, cataract surgery'],
            ].map(([n,f,par,mech,int]) => `<tr><td>${n}</td><td><strong>${f}</strong></td><td><span class="pill pill-red">${par}</span></td><td style="font-size:12px;color:var(--muted)">${mech}</td><td style="font-size:12px">${int}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <p style="font-size:12px;color:var(--subtle);margin-top:.75rem">Source: Livingston G et al. Lancet Commission on Dementia Prevention, Intervention, and Care. Lancet 2024.</p>
    </div>

    <div class="divider">Frequently Asked Questions</div>
    <div style="margin-bottom:2rem">
      ${[
        ['What is the difference between normal ageing and Alzheimer\'s?',
         'Normal ageing may cause some slowing in thinking and occasional forgetfulness — like forgetting where you put your keys, but remembering later. Alzheimer\'s causes memory loss that progressively disrupts daily life — forgetting a close family member\'s name entirely, getting lost in familiar places, or being unable to manage finances. The key distinction is progressive interference with daily functioning and the ability to live independently. Normal ageing does NOT cause dementia.'],
        ['How is Alzheimer\'s diagnosed clinically?',
         'Diagnosis uses the NIA-AA criteria and ATN biomarker framework. Clinicians assess: (1) Cognitive testing — MMSE (≤23 = impairment), MoCA (≤25 = concern), full neuropsychological battery; (2) Biomarkers — CSF Aβ42/pTau-181 ratio, amyloid-PET, FDG-PET; (3) Neuroimaging — MRI for hippocampal atrophy and white matter lesions; (4) Blood biomarkers — Plasma NfL, pTau-217 (emerging). Early diagnosis is critical as disease-modifying treatments (lecanemab, donanemab) are most effective before significant neuronal loss.'],
        ['Is Alzheimer\'s hereditary? Will I definitely get it if a parent had it?',
         'Having a first-degree relative with Alzheimer\'s increases your risk by 10–30%, but does NOT mean you will definitely develop it. Most cases (95%+) are sporadic late-onset, influenced by multiple genes and environment. Only rare early-onset familial AD (caused by PSEN1, PSEN2, or APP mutations) follows strict autosomal dominant inheritance. The APOE4 gene increases risk but is not deterministic — approximately 50% of APOE4 homozygotes never develop Alzheimer\'s. Modifiable lifestyle factors remain critically important regardless of genetic status.'],
        ['Can Alzheimer\'s be prevented or reversed?',
         'There is currently no cure, and significant neuronal loss cannot be reversed. However, up to 40% of dementia cases may be preventable through lifestyle modification (Lancet 2024). The FINGER trial (2015) demonstrated that a multi-domain intervention — diet, exercise, cognitive training, and vascular risk monitoring — maintained cognitive function in at-risk older adults. The SPRINT MIND trial showed intensive blood pressure control reduced white matter lesions. New anti-amyloid therapies can slow progression by 27–35% when started in pre-symptomatic or early stages.'],
        ['What are the 7 stages of Alzheimer\'s disease (GDS)?',
         'Stage 1: No impairment (normal). Stage 2: Very mild decline (subjective memory complaints only). Stage 3: Mild cognitive decline — MCI (noticeable to close family). Stage 4: Moderate decline — Early AD (difficulty with finances, travel; diagnosis typically made here). Stage 5: Moderately severe — Mid-stage (needs help with daily activities, clothing; MMSE 10–19). Stage 6: Severe — Late-stage (needs help with basic ADLs, incontinence; MMSE 3–9). Stage 7: Very severe — End-stage (loss of speech, movement, swallowing; MMSE 0–2).'],
        ['How does the MIND diet reduce Alzheimer\'s risk?',
         'The MIND diet (Mediterranean-DASH Intervention for Neurodegenerative Delay), developed by Dr Martha Clare Morris, was specifically designed for brain health. It prioritises: green leafy vegetables (6+ servings/week), other vegetables (1+/day), nuts (5+/week), berries (2+/week), beans (4+/week), whole grains (3+/day), fish (1+/week), poultry (2+/week), olive oil as primary fat, and wine (≤1 glass/day). It restricts red meat, butter, cheese, pastries, and fried food. Studies show it reduces Alzheimer\'s risk by 35–53% and can slow cognitive ageing by 7.5 years compared to an unhealthy diet.'],
        ['What are the latest Alzheimer\'s treatments in 2024–2025?',
         'The landmark anti-amyloid era began with FDA approvals: (1) Lecanemab (Leqembi, Eisai/Biogen, 2023) — shown to slow decline by 27% in 18 months in early AD; (2) Donanemab (Kisunla, Eli Lilly, 2024) — 35% slowing in amyloid-positive MCI/early AD; both carry risk of ARIA (amyloid-related imaging abnormalities requiring MRI monitoring). Traditional treatments remain: cholinesterase inhibitors (donepezil, rivastigmine, galantamine) and memantine. Emerging: tau-targeting therapies (semorinemab), GLP-1 agonists (semaglutide — trials ongoing), and multiplex prevention programs. AHEAD 3-45 trial is testing lecanemab in cognitively normal APOE4 carriers.'],
        ['What is the glymphatic system and why does sleep matter?',
         'The glymphatic system is the brain\'s waste clearance mechanism — a network of perivascular channels through which cerebrospinal fluid flushes out metabolic waste, including amyloid-β and tau proteins. Critically, glymphatic clearance is 60–70% more active during deep slow-wave sleep (NREM stage 3). Chronic sleep deprivation (&lt;6h/night) leads to amyloid accumulation in the brain within just one night of poor sleep, detectable via PET. This creates a vicious cycle — amyloid itself disrupts sleep architecture, worsening clearance. Prioritising 7–9h quality sleep is one of the most evidence-based Alzheimer\'s prevention strategies.'],
      ].map(([q, a]) => `
        <div class="accordion">
          <div class="acc-header" onclick="toggleAcc(this)">
            <span>${q}</span>
            <span class="acc-arrow">▾</span>
          </div>
          <div class="acc-body">${a}</div>
        </div>`).join('')}
    </div>

    <div class="divider">Key Clinical Studies</div>
    <div class="card" style="margin-bottom:2rem">
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Study</th><th>Year</th><th>Key Finding</th><th>Implication</th></tr></thead>
          <tbody>
            ${[
              ['FINGER Trial (Finland)','2015','Multi-domain lifestyle intervention preserved cognition in at-risk older adults over 2 years','Exercise + diet + cognitive training + vascular monitoring works together'],
              ['MIND Diet Study (Morris)','2015','MIND diet reduced AD risk by 35–53% vs unhealthy diet; 7.5-year cognitive age benefit','Dietary modification is a powerful, low-cost prevention tool'],
              ['Jack et al. Dynamic Model','2013','Biomarker changes (amyloid → tau → neurodegeneration → cognition) begin 15–20 years before symptoms','Early biomarker detection is key; treatment window is pre-symptomatic'],
              ['Lancet Commission','2024','14 modifiable risk factors account for ~45% of dementia cases globally','Population-level prevention can halve future dementia burden'],
              ['LECANEMAB CLARITY-AD','2022','Lecanemab slowed cognitive decline by 27% in early AD; cleared amyloid plaques','First confirmed disease-modifying therapy for Alzheimer\'s'],
              ['SPRINT-MIND Trial','2019','Intensive BP control (SBP &lt;120 mmHg) reduced white matter lesion volume','Treating hypertension aggressively protects the brain'],
              ['Xu et al. (Sleep & Amyloid)','2017','One night of sleep deprivation increased brain amyloid-β by 5% on PET imaging','Sleep is not optional — it\'s a nightly brain detox'],
              ['AHEAD 3-45 Trial','2020–','Testing lecanemab in cognitively normal APOE4 carriers (pre-symptomatic intervention)','Future of AD treatment: intervene before any symptoms appear'],
            ].map(([s,y,f,i]) => `<tr><td><strong>${s}</strong></td><td>${y}</td><td style="font-size:12px">${f}</td><td style="font-size:12px;color:var(--muted)">${i}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function toggleAcc(header) {
  const body = header.nextElementSibling;
  const arrow = header.querySelector('.acc-arrow');
  const isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  if (arrow) arrow.textContent = isOpen ? '▾' : '▴';
}
