/* ═══════════════════════════════════════════
   NeuroScan AI — Home Page (Assessment Wizard)
═══════════════════════════════════════════ */

function renderHomePage() {
  const el = document.getElementById('page-home');
  if (!el) return;

  el.innerHTML = `
  <!-- HERO -->
  <section class="hero-section">
    <div class="hero-tag">🎓 Final Year Project · AI-Powered Clinical Research Tool</div>
    <h1 class="hero-h1">Early Detection of<br/><em>Alzheimer's Disease</em><br/>Using Artificial Intelligence</h1>
    <p class="hero-p">A clinically-informed multi-modal AI screening system integrating 25+ biomarkers, validated cognitive tests, and APOE4 genetic analysis to produce evidence-based dementia risk stratification with personalised action plans.</p>
    <div class="hero-stats">
      <div class="hstat"><div class="hstat-num">25+</div><div class="hstat-lbl">Biomarkers</div></div>
      <div class="hstat"><div class="hstat-num">8</div><div class="hstat-lbl">Assessment Steps</div></div>
      <div class="hstat"><div class="hstat-num">7</div><div class="hstat-lbl">Risk Domains</div></div>
      <div class="hstat"><div class="hstat-num">AI</div><div class="hstat-lbl">Powered Analysis</div></div>
    </div>
    <div class="disclaimer-banner">
      <span style="font-size:16px;flex-shrink:0">⚠️</span>
      <span><strong>Medical Disclaimer:</strong> This tool is for educational and research purposes only. It does not constitute medical advice, diagnosis, or treatment. Always consult a licensed neurologist or healthcare professional for clinical evaluation.</span>
    </div>
  </section>

  <!-- WIZARD -->
  <div class="wizard-container">
    <div class="wizard-progress-wrap">
      <div class="progress-bar-outer"><div class="progress-bar-inner" id="progressBar" style="width:12%"></div></div>
      <div class="wizard-steps" id="wizardSteps">
        ${['Demographics','Genetics','Lifestyle','Medical','Symptoms','Screening','Biomarkers','Review'].map((label,i)=>`
          <div class="wstep ${i===0?'active':''}" id="ws${i}" onclick="goStep(${i})">
            <div class="wstep-dot">${i+1}</div>
            <div class="wstep-lbl">${label}</div>
          </div>`).join('')}
      </div>
    </div>

    <!-- STEP 0: DEMOGRAPHICS -->
    <div class="wizard-panel active" id="wp0">
      <div class="card">
        <div class="card-title"><div class="card-num">1</div>Patient Demographics &amp; Background</div>
        <div class="form-grid">
          <div class="field"><label class="field-label">Patient Name <span style="font-size:12px;color:var(--subtle)">(optional)</span></label><input type="text" id="pname" placeholder="For report personalisation"/></div>
          <div class="field"><label class="field-label">Patient ID</label><input type="text" id="pid" placeholder="Auto-generated if blank"/></div>
          <div class="field"><label class="field-label">Age <span class="req">*</span></label>
            <div class="range-row"><input type="range" id="age" min="40" max="100" value="65" oninput="Utils.setRangeVal('age','ageV')"/><div class="range-val" id="ageV">65</div></div>
            <div class="field-hint">Risk increases sharply after age 65</div>
          </div>
          <div class="field"><label class="field-label">Biological Sex <span class="req">*</span></label>
            <div class="radio-group">
              <label><input type="radio" name="sex" value="Male" checked/> Male</label>
              <label><input type="radio" name="sex" value="Female"/> Female</label>
              <label><input type="radio" name="sex" value="Other"/> Other</label>
            </div>
            <div class="field-hint">Females have ~1.5× lifetime risk due to longer lifespan</div>
          </div>
          <div class="field"><label class="field-label">Education Level <span class="req">*</span></label>
            <select id="education">
              <option value="Less than high school">Less than high school</option>
              <option value="High school/GED">High school / GED</option>
              <option value="Some college">Some college</option>
              <option value="Bachelor's degree" selected>Bachelor's degree</option>
              <option value="Graduate/Professional degree">Graduate / Professional degree</option>
            </select>
            <div class="field-hint">Higher education builds cognitive reserve</div>
          </div>
          <div class="field"><label class="field-label">Ethnicity</label>
            <select id="ethnicity">
              <option value="White/Caucasian">White / Caucasian</option>
              <option value="African American">African American</option>
              <option value="Hispanic/Latino">Hispanic / Latino</option>
              <option value="South Asian">South Asian</option>
              <option value="East Asian">East Asian</option>
              <option value="Other/Mixed">Other / Mixed</option>
            </select>
          </div>
          <div class="field"><label class="field-label">Occupation Type</label>
            <select id="occupation">
              <option value="Manual/Physical">Manual / Physical labour</option>
              <option value="Clerical">Clerical / Administrative</option>
              <option value="Professional/Technical" selected>Professional / Technical</option>
              <option value="Academic/Research">Academic / Research</option>
              <option value="Retired">Retired</option>
            </select>
          </div>
          <div class="field"><label class="field-label">Years Retired (if applicable)</label>
            <div class="range-row"><input type="range" id="retiredYrs" min="0" max="40" value="0" oninput="Utils.setRangeVal('retiredYrs','retiredV')"/><div class="range-val" id="retiredV">0</div></div>
          </div>
        </div>
      </div>
      <div class="wizard-nav"><button class="btn btn-primary btn-ml" onclick="goStep(1)">Next: Genetics →</button></div>
    </div>

    <!-- STEP 1: GENETICS -->
    <div class="wizard-panel" id="wp1">
      <div class="card">
        <div class="card-title"><div class="card-num">2</div>Genetics &amp; Family History</div>
        <div class="form-grid">
          <div class="field span-2"><label class="field-label">APOE4 Genotype <span class="req">*</span></label>
            <div class="radio-group">
              <label><input type="radio" name="apoe4" value="None" checked/> ε3/ε3 — No risk allele</label>
              <label><input type="radio" name="apoe4" value="Heterozygous"/> ε3/ε4 — One allele (3× risk)</label>
              <label><input type="radio" name="apoe4" value="Homozygous"/> ε4/ε4 — Two alleles (12× risk)</label>
              <label><input type="radio" name="apoe4" value="Unknown"/> Unknown</label>
            </div>
            <div class="field-hint">APOE4 is the strongest known genetic risk factor for late-onset Alzheimer's</div>
          </div>
          <div class="field"><label class="field-label">Family History of Alzheimer's <span class="req">*</span></label>
            <div class="radio-group">
              <label><input type="radio" name="fhist" value="None" checked/> None</label>
              <label><input type="radio" name="fhist" value="1 parent"/> 1 parent</label>
              <label><input type="radio" name="fhist" value="2 parents"/> Both parents</label>
              <label><input type="radio" name="fhist" value="Sibling"/> Sibling</label>
              <label><input type="radio" name="fhist" value="Multiple"/> Multiple relatives</label>
            </div>
          </div>
          <div class="field"><label class="field-label">Early-Onset (&lt;65) in Family?</label>
            <div class="radio-group">
              <label><input type="radio" name="earlyOnset" value="No" checked/> No</label>
              <label><input type="radio" name="earlyOnset" value="Yes"/> Yes</label>
              <label><input type="radio" name="earlyOnset" value="Unknown"/> Unknown</label>
            </div>
          </div>
          <div class="field"><label class="field-label">Known Genetic Mutations (if tested)</label>
            <div class="check-group" id="mutations">
              <label><input type="checkbox" value="APP mutation"/> APP</label>
              <label><input type="checkbox" value="PSEN1 mutation"/> PSEN1</label>
              <label><input type="checkbox" value="PSEN2 mutation"/> PSEN2</label>
            </div>
          </div>
          <div class="field"><label class="field-label">History of Traumatic Brain Injury</label>
            <div class="radio-group">
              <label><input type="radio" name="tbi" value="None" checked/> None</label>
              <label><input type="radio" name="tbi" value="Mild"/> Mild (1 event)</label>
              <label><input type="radio" name="tbi" value="Moderate"/> Moderate</label>
              <label><input type="radio" name="tbi" value="Severe/Repeated"/> Severe / Repeated</label>
            </div>
          </div>
          <div class="field"><label class="field-label">History of Stroke or TIA</label>
            <div class="radio-group">
              <label><input type="radio" name="stroke" value="None" checked/> None</label>
              <label><input type="radio" name="stroke" value="TIA"/> TIA (mini-stroke)</label>
              <label><input type="radio" name="stroke" value="Stroke"/> Stroke</label>
              <label><input type="radio" name="stroke" value="Multiple"/> Multiple events</label>
            </div>
          </div>
        </div>
      </div>
      <div class="wizard-nav">
        <button class="btn btn-secondary" onclick="goStep(0)">← Back</button>
        <button class="btn btn-primary btn-ml" onclick="goStep(2)">Next: Lifestyle →</button>
      </div>
    </div>

    <!-- STEP 2: LIFESTYLE -->
    <div class="wizard-panel" id="wp2">
      <div class="card">
        <div class="card-title"><div class="card-num">3</div>Lifestyle &amp; Habits</div>
        <div class="form-grid">
          <div class="field"><label class="field-label">Physical Activity Level</label>
            <select id="exercise">
              <option value="Sedentary">Sedentary (none)</option>
              <option value="Light">Light (1–2x / week)</option>
              <option value="Moderate" selected>Moderate (3–4x / week)</option>
              <option value="Vigorous">Vigorous (5+ / week)</option>
            </select>
            <div class="field-hint">Exercise reduces risk by up to 45% — FINGER trial</div>
          </div>
          <div class="field"><label class="field-label">Predominant Diet Pattern</label>
            <select id="diet">
              <option value="Unhealthy">Unhealthy (processed / high-fat)</option>
              <option value="Average Western" selected>Average Western diet</option>
              <option value="Mediterranean">Mediterranean diet</option>
              <option value="MIND">MIND diet (optimal for brain)</option>
              <option value="Plant-based">Plant-based / Vegan</option>
            </select>
          </div>
          <div class="field"><label class="field-label">Average Sleep Duration</label>
            <div class="range-row"><input type="range" id="sleep" min="3" max="12" value="7" step=".5" oninput="Utils.setRangeVal('sleep','sleepV','h')"/><div class="range-val" id="sleepV">7h</div></div>
            <div class="field-hint">Both &lt;6h and &gt;9h increase Alzheimer's risk</div>
          </div>
          <div class="field"><label class="field-label">Sleep Quality</label>
            <div class="radio-group">
              <label><input type="radio" name="sleepQ" value="Poor"/> Poor</label>
              <label><input type="radio" name="sleepQ" value="Fair" checked/> Fair</label>
              <label><input type="radio" name="sleepQ" value="Good"/> Good</label>
              <label><input type="radio" name="sleepQ" value="Excellent"/> Excellent</label>
            </div>
          </div>
          <div class="field"><label class="field-label">Smoking Status</label>
            <div class="radio-group">
              <label><input type="radio" name="smoking" value="Never" checked/> Never</label>
              <label><input type="radio" name="smoking" value="Former"/> Former</label>
              <label><input type="radio" name="smoking" value="Current (<20/day)"/> Current &lt;20/day</label>
              <label><input type="radio" name="smoking" value="Current (20+/day)"/> Current 20+/day</label>
            </div>
          </div>
          <div class="field"><label class="field-label">Alcohol Consumption</label>
            <div class="radio-group">
              <label><input type="radio" name="alcohol" value="None"/> None</label>
              <label><input type="radio" name="alcohol" value="Light" checked/> Light (1–7 units/wk)</label>
              <label><input type="radio" name="alcohol" value="Moderate"/> Moderate (8–14)</label>
              <label><input type="radio" name="alcohol" value="Heavy"/> Heavy (15+)</label>
            </div>
          </div>
          <div class="field"><label class="field-label">Social Engagement Level</label>
            <div class="radio-group">
              <label><input type="radio" name="social" value="Isolated"/> Isolated</label>
              <label><input type="radio" name="social" value="Limited"/> Limited</label>
              <label><input type="radio" name="social" value="Moderate" checked/> Moderate</label>
              <label><input type="radio" name="social" value="Active"/> Very Active</label>
            </div>
          </div>
          <div class="field"><label class="field-label">Cognitive Stimulation (reading, puzzles, learning)</label>
            <div class="radio-group">
              <label><input type="radio" name="cogstim" value="Low"/> Low</label>
              <label><input type="radio" name="cogstim" value="Moderate" checked/> Moderate</label>
              <label><input type="radio" name="cogstim" value="High"/> High</label>
            </div>
          </div>
          <div class="field"><label class="field-label">Chronic Stress Level (0 = none, 10 = severe)</label>
            <div class="range-row"><input type="range" id="stress" min="0" max="10" value="4" oninput="Utils.setRangeVal('stress','stressV')"/><div class="range-val" id="stressV">4</div></div>
            <div class="field-hint">Chronic stress raises cortisol → hippocampal atrophy</div>
          </div>
          <div class="field"><label class="field-label">Air Pollution Exposure (residential)</label>
            <div class="radio-group">
              <label><input type="radio" name="pollution" value="Low" checked/> Low (rural)</label>
              <label><input type="radio" name="pollution" value="Moderate"/> Moderate (town)</label>
              <label><input type="radio" name="pollution" value="High"/> High (urban/industrial)</label>
            </div>
          </div>
        </div>
      </div>
      <div class="wizard-nav">
        <button class="btn btn-secondary" onclick="goStep(1)">← Back</button>
        <button class="btn btn-primary btn-ml" onclick="goStep(3)">Next: Medical →</button>
      </div>
    </div>

    <!-- STEP 3: MEDICAL -->
    <div class="wizard-panel" id="wp3">
      <div class="card">
        <div class="card-title"><div class="card-num">4</div>Medical History &amp; Conditions</div>
        <div class="form-grid">
          <div class="field span-2"><label class="field-label">Diagnosed Comorbidities (select all that apply)</label>
            <div class="check-group" id="conds">
              <label><input type="checkbox" value="Hypertension"/> Hypertension</label>
              <label><input type="checkbox" value="Type 2 Diabetes"/> Type 2 Diabetes</label>
              <label><input type="checkbox" value="High Cholesterol"/> High Cholesterol</label>
              <label><input type="checkbox" value="Cardiovascular Disease"/> Cardiovascular Disease</label>
              <label><input type="checkbox" value="Obesity"/> Obesity (BMI &gt;30)</label>
              <label><input type="checkbox" value="Depression"/> Depression</label>
              <label><input type="checkbox" value="Anxiety Disorder"/> Anxiety Disorder</label>
              <label><input type="checkbox" value="Sleep Apnea"/> Sleep Apnea / OSA</label>
              <label><input type="checkbox" value="Hearing Loss"/> Hearing Loss</label>
              <label><input type="checkbox" value="Hypothyroidism"/> Hypothyroidism</label>
              <label><input type="checkbox" value="Atrial Fibrillation"/> Atrial Fibrillation</label>
              <label><input type="checkbox" value="Chronic Kidney Disease"/> Chronic Kidney Disease</label>
              <label><input type="checkbox" value="Rheumatoid Arthritis"/> Rheumatoid Arthritis</label>
            </div>
          </div>
          <div class="field"><label class="field-label">Blood Pressure Category</label>
            <select id="bp">
              <option value="Normal">Normal (&lt;120/80)</option>
              <option value="Elevated">Elevated (120–129)</option>
              <option value="Stage 1 HTN" selected>Stage 1 HTN (130–139)</option>
              <option value="Stage 2 HTN">Stage 2 HTN (≥140)</option>
            </select>
          </div>
          <div class="field"><label class="field-label">BMI Category</label>
            <select id="bmi">
              <option value="Underweight">Underweight (&lt;18.5)</option>
              <option value="Normal" selected>Normal (18.5–24.9)</option>
              <option value="Overweight">Overweight (25–29.9)</option>
              <option value="Obese">Obese (30–34.9)</option>
              <option value="Severely Obese">Severely Obese (35+)</option>
            </select>
          </div>
          <div class="field"><label class="field-label">Total Cholesterol</label>
            <select id="cholesterol">
              <option value="Optimal" selected>Optimal (&lt;200 mg/dL)</option>
              <option value="Borderline">Borderline (200–239)</option>
              <option value="High">High (≥240 mg/dL)</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>
          <div class="field"><label class="field-label">Blood Glucose / Diabetes Status</label>
            <select id="glucose">
              <option value="Normal" selected>Normal</option>
              <option value="Prediabetes">Prediabetes</option>
              <option value="Type 2 Diabetes">Type 2 Diabetes (controlled)</option>
              <option value="Uncontrolled Diabetes">Uncontrolled Diabetes</option>
            </select>
          </div>
          <div class="field"><label class="field-label">Number of Regular Medications</label>
            <div class="range-row"><input type="range" id="meds" min="0" max="15" value="2" oninput="Utils.setRangeVal('meds','medsV')"/><div class="range-val" id="medsV">2</div></div>
            <div class="field-hint">Polypharmacy (5+) can impair cognition</div>
          </div>
          <div class="field"><label class="field-label">Depression Severity</label>
            <div class="radio-group">
              <label><input type="radio" name="depression" value="None" checked/> None</label>
              <label><input type="radio" name="depression" value="Mild"/> Mild</label>
              <label><input type="radio" name="depression" value="Moderate"/> Moderate</label>
              <label><input type="radio" name="depression" value="Severe"/> Severe</label>
            </div>
          </div>
          <div class="field"><label class="field-label">Vitamin D Status</label>
            <div class="radio-group">
              <label><input type="radio" name="vitd" value="Sufficient" checked/> Sufficient</label>
              <label><input type="radio" name="vitd" value="Insufficient"/> Insufficient</label>
              <label><input type="radio" name="vitd" value="Deficient"/> Deficient</label>
              <label><input type="radio" name="vitd" value="Unknown"/> Unknown</label>
            </div>
          </div>
          <div class="field"><label class="field-label">Inflammatory Markers (CRP / IL-6)</label>
            <div class="radio-group">
              <label><input type="radio" name="inflam" value="Normal" checked/> Normal</label>
              <label><input type="radio" name="inflam" value="Elevated"/> Elevated</label>
              <label><input type="radio" name="inflam" value="Unknown"/> Unknown</label>
            </div>
          </div>
          <div class="field"><label class="field-label">Homocysteine Level</label>
            <div class="radio-group">
              <label><input type="radio" name="homocys" value="Normal" checked/> Normal (&lt;15 µmol/L)</label>
              <label><input type="radio" name="homocys" value="Elevated"/> Elevated (≥15)</label>
              <label><input type="radio" name="homocys" value="Unknown"/> Unknown</label>
            </div>
          </div>
          <div class="field"><label class="field-label">Hearing Aid Usage (if hearing loss)</label>
            <div class="radio-group">
              <label><input type="radio" name="hearing" value="N/A" checked/> N/A (no hearing loss)</label>
              <label><input type="radio" name="hearing" value="No (untreated)"/> Untreated hearing loss</label>
              <label><input type="radio" name="hearing" value="Yes (treated)"/> Using hearing aid</label>
            </div>
          </div>
        </div>
      </div>
      <div class="wizard-nav">
        <button class="btn btn-secondary" onclick="goStep(2)">← Back</button>
        <button class="btn btn-primary btn-ml" onclick="goStep(4)">Next: Symptoms →</button>
      </div>
    </div>

    <!-- STEP 4: COGNITIVE SYMPTOMS -->
    <div class="wizard-panel" id="wp4">
      <div class="card">
        <div class="card-title"><div class="card-num">5</div>Cognitive Symptom Self-Report</div>
        <p style="font-size:13px;color:var(--muted);margin-bottom:1.5rem">Rate each symptom from 0 (none / never) to 10 (severe / daily). Rate based on changes noticed in the past 6–12 months.</p>
        <div class="form-grid">
          ${[
            ['s_memory','Recent memory lapses (forgetting events, appointments, names)'],
            ['s_lang','Difficulty with word-finding or language'],
            ['s_orient','Disorientation (time, place, or person)'],
            ['s_exec','Executive dysfunction (planning, problem-solving, decisions)'],
            ['s_mood','Personality or mood changes (irritability, anxiety, apathy)'],
            ['s_repeat','Repetitive questioning or repeating same stories'],
            ['s_tasks','Difficulty with familiar tasks (cooking, driving, finances)'],
            ['s_visual','Visuospatial problems (depth perception, navigation, reading)'],
            ['s_apathy','Loss of initiative or increased apathy'],
            ['s_halluc','Hallucinations or paranoid ideation'],
          ].map(([id,label]) => `
            <div class="field">
              <label class="field-label">${label}</label>
              <div class="range-row"><input type="range" id="${id}" min="0" max="10" value="${id==='s_memory'||id==='s_exec'?2:id==='s_lang'||id==='s_orient'||id==='s_mood'||id==='s_tasks'?1:0}" oninput="Utils.setRangeVal('${id}','${id}V')"/><div class="range-val" id="${id}V">${id==='s_memory'||id==='s_exec'?2:id==='s_lang'||id==='s_orient'||id==='s_mood'||id==='s_tasks'?1:0}</div></div>
            </div>`).join('')}
          <div class="field span-2"><label class="field-label">Duration of symptoms (if any)</label>
            <div class="radio-group">
              <label><input type="radio" name="symdur" value="None" checked/> No symptoms</label>
              <label><input type="radio" name="symdur" value="&lt;6 months"/> &lt;6 months</label>
              <label><input type="radio" name="symdur" value="6-12 months"/> 6–12 months</label>
              <label><input type="radio" name="symdur" value="1-2 years"/> 1–2 years</label>
              <label><input type="radio" name="symdur" value="&gt;2 years"/> &gt;2 years</label>
            </div>
          </div>
          <div class="field span-2"><label class="field-label">Additional notes (family observations, specific incidents)</label>
            <textarea id="notes" placeholder="Describe any specific cognitive incidents or behavioural changes noticed by patient or family members..."></textarea>
          </div>
        </div>
      </div>
      <div class="wizard-nav">
        <button class="btn btn-secondary" onclick="goStep(3)">← Back</button>
        <button class="btn btn-primary btn-ml" onclick="goStep(5)">Next: Screening Tests →</button>
      </div>
    </div>

    <!-- STEP 5: MINI SCREENING -->
    <div class="wizard-panel" id="wp5">
      <div class="card">
        <div class="card-title"><div class="card-num">6</div>Mini Cognitive Screening Assessment</div>
        <p style="font-size:13px;color:var(--muted);margin-bottom:1.5rem">5 simplified screening questions adapted from validated cognitive instruments (MMSE, MoCA, Clock Drawing). <strong>This is NOT a formal diagnostic test.</strong></p>
        ${[
          ['q1','Orientation: What is today\'s approximate date?',[
            ['3','I know the exact date and day of the week'],
            ['2','I know roughly the date but not the day'],
            ['1','I know the month but not the date'],
            ['0','I struggle to remember even the month']
          ],'2'],
          ['q2','Memory (Recall): Could you recall 3 words (apple, table, penny) after 5 minutes?',[
            ['3','Yes — all 3 easily, without prompting'],
            ['2','2 words with some effort'],
            ['1','1 word, needed a hint'],
            ['0','Unlikely to recall any']
          ],'3'],
          ['q3','Attention (Serial 7s): Count backwards from 100 by 7. How many correct steps?',[
            ['3','5 or more correct (100, 93, 86, 79, 72…)'],
            ['2','3–4 correct steps'],
            ['1','1–2 correct steps'],
            ['0','Could not attempt']
          ],'3'],
          ['q4','Language: If asked to "take a paper, fold it in half, and put it on the floor" how well could you follow this?',[
            ['3','Easily — no problems with multi-step instructions'],
            ['2','Some difficulty but manageable'],
            ['1','Would need instruction repeated'],
            ['0','Significant difficulty with instructions']
          ],'3'],
          ['q5','Visuospatial (Clock Drawing): Could you draw a clock showing 11:10 with hands in correct positions?',[
            ['3','Yes — clearly and correctly'],
            ['2','Yes — with minor errors'],
            ['1','With significant errors'],
            ['0','Could not do this']
          ],'3'],
        ].map(([name, q, opts, def]) => `
          <div class="test-card">
            <div class="test-q">${q}</div>
            <div class="test-options">
              ${opts.map(([val, label]) => `<label class="test-opt"><input type="radio" name="${name}" value="${val}" ${val===def?'checked':''} onchange="updateScreenScore()"/> ${label}</label>`).join('')}
            </div>
          </div>`).join('')}
        <div class="score-bar-section">
          <div class="score-bar-labels"><span>Screening Score</span><span id="screenScore" style="font-weight:600;color:var(--accent)">15/15</span></div>
          <div class="score-bar-track"><div class="score-bar-fill" id="screenFill" style="width:100%;background:var(--success)"></div></div>
          <div class="score-interp" id="screenInterp">Optimal performance — no screening concerns</div>
        </div>
      </div>
      <div class="wizard-nav">
        <button class="btn btn-secondary" onclick="goStep(4)">← Back</button>
        <button class="btn btn-primary btn-ml" onclick="goStep(6)">Next: Biomarkers →</button>
      </div>
    </div>

    <!-- STEP 6: BIOMARKERS -->
    <div class="wizard-panel" id="wp6">
      <div class="card">
        <div class="card-title"><div class="card-num">7</div>Advanced Biomarkers &amp; Imaging</div>
        <p style="font-size:13px;color:var(--muted);margin-bottom:1.25rem">Leave as "Normal / Not tested" if results unavailable. These inputs significantly improve prediction accuracy.</p>
        <div class="form-grid">
          <div class="field"><label class="field-label">CSF Amyloid-β42 Level</label>
            <select id="amyloid">
              <option value="Normal" selected>Normal / Not tested</option>
              <option value="Borderline low">Borderline low</option>
              <option value="Low (abnormal)">Low — Abnormal (&lt;192 pg/mL)</option>
            </select>
            <div class="field-hint">Low CSF Aβ42 = amyloid deposition in brain</div>
          </div>
          <div class="field"><label class="field-label">CSF Tau / Phospho-Tau 181</label>
            <select id="tau">
              <option value="Normal" selected>Normal / Not tested</option>
              <option value="Elevated">Elevated</option>
              <option value="Highly elevated">Highly elevated</option>
            </select>
            <div class="field-hint">Elevated tau = neurofibrillary tangle pathology</div>
          </div>
          <div class="field"><label class="field-label">Brain MRI Finding</label>
            <select id="mri">
              <option value="Normal" selected>Normal / Not done</option>
              <option value="Mild atrophy">Mild cortical atrophy</option>
              <option value="Hippocampal atrophy">Hippocampal atrophy</option>
              <option value="Significant atrophy">Significant global atrophy</option>
              <option value="White matter lesions">White matter lesions</option>
            </select>
          </div>
          <div class="field"><label class="field-label">PET Scan Result</label>
            <select id="pet">
              <option value="Normal/Not done" selected>Normal / Not done</option>
              <option value="Amyloid positive">Amyloid-PET positive</option>
              <option value="FDG hypometabolism">FDG-PET hypometabolism</option>
              <option value="Both positive">Both positive</option>
            </select>
          </div>
          <div class="field"><label class="field-label">MMSE Score (if formally tested)</label>
            <div class="range-row"><input type="range" id="mmse" min="0" max="30" value="28" oninput="Utils.setRangeVal('mmse','mmseV')"/><div class="range-val" id="mmseV">28</div></div>
            <div class="field-hint">30 = perfect · ≤23 = cognitive impairment concern</div>
          </div>
          <div class="field"><label class="field-label">MoCA Score (if formally tested)</label>
            <div class="range-row"><input type="range" id="moca" min="0" max="30" value="27" oninput="Utils.setRangeVal('moca','mocaV')"/><div class="range-val" id="mocaV">27</div></div>
            <div class="field-hint">≥26 = normal · &lt;26 = mild cognitive impairment</div>
          </div>
          <div class="field"><label class="field-label">Plasma NfL (Neurofilament Light)</label>
            <select id="nfl">
              <option value="Normal" selected>Normal / Not tested</option>
              <option value="Elevated">Elevated for age</option>
            </select>
          </div>
          <div class="field"><label class="field-label">Neuropsychological Testing</label>
            <div class="radio-group">
              <label><input type="radio" name="neuropsych" value="None" checked/> Not done</label>
              <label><input type="radio" name="neuropsych" value="Normal"/> Normal</label>
              <label><input type="radio" name="neuropsych" value="MCI"/> MCI pattern</label>
              <label><input type="radio" name="neuropsych" value="Dementia"/> Dementia pattern</label>
            </div>
          </div>
        </div>
      </div>
      <div class="wizard-nav">
        <button class="btn btn-secondary" onclick="goStep(5)">← Back</button>
        <button class="btn btn-primary btn-ml" onclick="goStep(7)">Next: Review →</button>
      </div>
    </div>

    <!-- STEP 7: REVIEW -->
    <div class="wizard-panel" id="wp7">
      <div class="card">
        <div class="card-title"><div class="card-num">8</div>Review &amp; Submit</div>
        <div id="reviewContent"></div>
      </div>
      <div id="formErr" class="err-box" style="display:none"></div>
      <button class="btn btn-primary btn-analyze" id="analyzeBtn" onclick="runAnalysis()">
        <svg class="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        🧠 Run AI Analysis
      </button>
      <div class="wizard-nav" style="margin-top:.75rem">
        <button class="btn btn-secondary" onclick="goStep(6)">← Back</button>
      </div>
    </div>

  </div><!-- end wizard-container -->
  `;
}

/* ── Wizard Step Navigation ── */
let currentStep = 0;

function goStep(n) {
  if (n === 7) buildReview();
  document.querySelectorAll('.wizard-panel').forEach((p, i) => p.classList.toggle('active', i === n));
  document.querySelectorAll('.wstep').forEach((s, i) => {
    s.classList.remove('active', 'done');
    if (i === n) s.classList.add('active');
    else if (i < n) s.classList.add('done');
  });
  currentStep = n;
  const pct = ((n + 1) / 8) * 100;
  const pb = document.getElementById('progressBar');
  if (pb) pb.style.width = pct + '%';
  updateScreenScore();
  Utils.scrollTop();
}

/* ── Live screening score update ── */
function updateScreenScore() {
  const qs = ['q1', 'q2', 'q3', 'q4', 'q5'];
  const total = qs.map(q => {
    const el = document.querySelector(`input[name="${q}"]:checked`);
    return el ? parseInt(el.value) : 3;
  }).reduce((a, b) => a + b, 0);

  const pct = Math.round((total / 15) * 100);
  const scoreEl = document.getElementById('screenScore');
  const fillEl = document.getElementById('screenFill');
  const interpEl = document.getElementById('screenInterp');
  if (scoreEl) scoreEl.textContent = total + '/15';
  if (fillEl) {
    fillEl.style.width = pct + '%';
    fillEl.style.background = pct >= 80 ? 'var(--success)' : pct >= 53 ? 'var(--warn)' : 'var(--danger)';
  }
  if (interpEl) {
    interpEl.textContent = pct >= 80
      ? 'Optimal — no screening concerns'
      : pct >= 53
        ? 'Moderate — some areas to monitor'
        : 'Below average — clinical evaluation advised';
  }
}

/* ── Build review summary ── */
function buildReview() {
  const d = collectFormData();
  const el = document.getElementById('reviewContent');
  if (!el) return;
  el.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:.4rem 1.5rem;font-size:13px">
      <div><span style="color:var(--muted);font-weight:500">Name:</span> ${d.pname || 'Anonymous'}</div>
      <div><span style="color:var(--muted);font-weight:500">Age / Sex:</span> ${d.age} / ${d.sex}</div>
      <div><span style="color:var(--muted);font-weight:500">Education:</span> ${d.education}</div>
      <div><span style="color:var(--muted);font-weight:500">APOE4:</span> ${d.apoe4}</div>
      <div><span style="color:var(--muted);font-weight:500">Family Hx:</span> ${d.fhist}</div>
      <div><span style="color:var(--muted);font-weight:500">Exercise:</span> ${d.exercise}</div>
      <div><span style="color:var(--muted);font-weight:500">Diet:</span> ${d.diet}</div>
      <div><span style="color:var(--muted);font-weight:500">Sleep:</span> ${d.sleep}h (${d.sleepQ})</div>
      <div><span style="color:var(--muted);font-weight:500">Smoking:</span> ${d.smoking}</div>
      <div><span style="color:var(--muted);font-weight:500">Conditions:</span> ${(d.conditions || []).join(', ') || 'None'}</div>
      <div><span style="color:var(--muted);font-weight:500">MMSE / MoCA:</span> ${d.mmse}/30 · ${d.moca}/30</div>
      <div><span style="color:var(--muted);font-weight:500">Biomarkers:</span> Amyloid ${d.amyloid} · Tau ${d.tau}</div>
      <div><span style="color:var(--muted);font-weight:500">MRI:</span> ${d.mri}</div>
      <div><span style="color:var(--muted);font-weight:500">PET:</span> ${d.pet}</div>
    </div>`;
}

/* ── Collect all form data ── */
function collectFormData() {
  return {
    pname: (document.getElementById('pname') || {}).value || '',
    pid: (document.getElementById('pid') || {}).value || Utils.genPID(),
    age: (document.getElementById('age') || {}).value || 65,
    sex: Utils.getRadio('sex') || 'Male',
    education: (document.getElementById('education') || {}).value || "Bachelor's degree",
    ethnicity: (document.getElementById('ethnicity') || {}).value || '',
    occupation: (document.getElementById('occupation') || {}).value || '',
    apoe4: Utils.getRadio('apoe4') || 'None',
    fhist: Utils.getRadio('fhist') || 'None',
    earlyOnset: Utils.getRadio('earlyOnset') || 'No',
    tbi: Utils.getRadio('tbi') || 'None',
    stroke: Utils.getRadio('stroke') || 'None',
    mutations: Utils.getChecks('mutations'),
    exercise: (document.getElementById('exercise') || {}).value || 'Moderate',
    diet: (document.getElementById('diet') || {}).value || 'Average Western',
    sleep: (document.getElementById('sleep') || {}).value || 7,
    sleepQ: Utils.getRadio('sleepQ') || 'Fair',
    smoking: Utils.getRadio('smoking') || 'Never',
    alcohol: Utils.getRadio('alcohol') || 'Light',
    social: Utils.getRadio('social') || 'Moderate',
    cogstim: Utils.getRadio('cogstim') || 'Moderate',
    stress: (document.getElementById('stress') || {}).value || 4,
    pollution: Utils.getRadio('pollution') || 'Low',
    conditions: Utils.getChecks('conds'),
    bp: (document.getElementById('bp') || {}).value || 'Normal',
    bmi: (document.getElementById('bmi') || {}).value || 'Normal',
    cholesterol: (document.getElementById('cholesterol') || {}).value || 'Optimal',
    glucose: (document.getElementById('glucose') || {}).value || 'Normal',
    meds: (document.getElementById('meds') || {}).value || 0,
    depression: Utils.getRadio('depression') || 'None',
    vitd: Utils.getRadio('vitd') || 'Sufficient',
    inflam: Utils.getRadio('inflam') || 'Normal',
    homocys: Utils.getRadio('homocys') || 'Normal',
    hearing: Utils.getRadio('hearing') || 'N/A',
    s_memory: (document.getElementById('s_memory') || {}).value || 0,
    s_lang: (document.getElementById('s_lang') || {}).value || 0,
    s_orient: (document.getElementById('s_orient') || {}).value || 0,
    s_exec: (document.getElementById('s_exec') || {}).value || 0,
    s_mood: (document.getElementById('s_mood') || {}).value || 0,
    s_repeat: (document.getElementById('s_repeat') || {}).value || 0,
    s_tasks: (document.getElementById('s_tasks') || {}).value || 0,
    s_visual: (document.getElementById('s_visual') || {}).value || 0,
    s_apathy: (document.getElementById('s_apathy') || {}).value || 0,
    s_halluc: (document.getElementById('s_halluc') || {}).value || 0,
    symdur: Utils.getRadio('symdur') || 'None',
    notes: (document.getElementById('notes') || {}).value || '',
    q1: Utils.getRadio('q1') || '3',
    q2: Utils.getRadio('q2') || '3',
    q3: Utils.getRadio('q3') || '3',
    q4: Utils.getRadio('q4') || '3',
    q5: Utils.getRadio('q5') || '3',
    amyloid: (document.getElementById('amyloid') || {}).value || 'Normal',
    tau: (document.getElementById('tau') || {}).value || 'Normal',
    mri: (document.getElementById('mri') || {}).value || 'Normal',
    pet: (document.getElementById('pet') || {}).value || 'Normal/Not done',
    mmse: (document.getElementById('mmse') || {}).value || 30,
    moca: (document.getElementById('moca') || {}).value || 30,
    neuropsych: Utils.getRadio('neuropsych') || 'None',
    nfl: (document.getElementById('nfl') || {}).value || 'Normal',
  };
}
