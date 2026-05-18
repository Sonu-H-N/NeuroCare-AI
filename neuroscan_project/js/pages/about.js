/* ═══════════════════════════════════════════
   NeuroScan AI — About Page
═══════════════════════════════════════════ */

function renderAboutPage() {
  const el = document.getElementById('page-about');
  if (!el) return;

  el.innerHTML = `
  <div class="page-inner">
    <h2 style="font-family:var(--serif);font-size:2rem;margin-bottom:.4rem">About NeuroScan AI</h2>
    <p style="color:var(--muted);font-size:14px;margin-bottom:2rem">Final Year Project — Computer Science / Biomedical Informatics</p>

    <div class="card" style="margin-bottom:1.5rem">
      <div class="card-title"><div class="card-num">📋</div>Project Overview</div>
      <div class="ai-content">
        <p><strong>NeuroScan AI</strong> is a comprehensive Alzheimer's disease early detection and risk stratification system developed as a Final Year Computer Science / Biomedical Informatics project. It combines clinical research-based scoring algorithms, validated cognitive screening instruments, and large language model AI to deliver evidence-based dementia risk assessment with personalised preventive recommendations.</p>
        <p>The system integrates 25+ clinical biomarkers across 7 weighted risk domains, implements a 5-question mini cognitive screening tool adapted from validated instruments (MMSE, MoCA, Clock Drawing Test), and uses Claude AI (Anthropic) to generate context-aware clinical summaries, staging assessments, scientific explanations, and personalised action plans.</p>
        <p>Additional features include a real-time What-If lifestyle simulator, an AI-powered multi-turn chatbot with full patient context injection, longitudinal assessment history tracking, multi-format export (PDF, CSV, JSON), and a comprehensive educational module covering Alzheimer's aetiology, biomarkers, prevention strategies, and the latest clinical trials.</p>
      </div>
    </div>

    <div class="two-col" style="margin-bottom:1.5rem">
      <div class="card">
        <div class="card-title"><div class="card-num">⚙️</div>Technical Stack</div>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Component</th><th>Technology</th></tr></thead>
            <tbody>
              <tr><td>Frontend Framework</td><td>Vanilla HTML5 / CSS3 / ES6+ JavaScript</td></tr>
              <tr><td>Data Visualisation</td><td>Chart.js 4.4.1</td></tr>
              <tr><td>PDF Generation</td><td>jsPDF 2.5.1</td></tr>
              <tr><td>AI / LLM Backend</td><td>Claude AI — claude-sonnet-4-20250514 (Anthropic)</td></tr>
              <tr><td>Data Persistence</td><td>Browser localStorage (no server required)</td></tr>
              <tr><td>Typography</td><td>DM Sans + DM Serif Display + JetBrains Mono</td></tr>
              <tr><td>Architecture</td><td>Modular JS — 12 separate module files</td></tr>
              <tr><td>Deployment</td><td>Static HTML — runs in any modern browser</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <div class="card-title"><div class="card-num">📚</div>Clinical References</div>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Study / Source</th><th>Relevance</th></tr></thead>
            <tbody>
              <tr><td>Livingston et al. Lancet 2024</td><td>14 modifiable risk factors, PAR weights</td></tr>
              <tr><td>Jack et al. Lancet Neurol. 2013</td><td>Dynamic biomarker model / trajectory</td></tr>
              <tr><td>FINGER Trial 2015</td><td>Multi-domain lifestyle intervention evidence</td></tr>
              <tr><td>Morris et al. 2015 (MIND diet)</td><td>Dietary risk reduction (35–53%)</td></tr>
              <tr><td>NIA-AA Diagnostic Guidelines 2018</td><td>ATN framework, staging criteria</td></tr>
              <tr><td>APOE4 Meta-analyses (Farrer 1997)</td><td>APOE4 risk multipliers (3× / 12×)</td></tr>
              <tr><td>CLARITY-AD (van Dyck 2023)</td><td>Lecanemab efficacy data</td></tr>
              <tr><td>SPRINT-MIND Trial 2019</td><td>BP control and white matter lesions</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="card" style="margin-bottom:1.5rem">
      <div class="card-title"><div class="card-num">🧮</div>Scoring Methodology</div>
      <p style="font-size:14px;color:var(--muted);margin-bottom:1rem">The overall risk score (0–100) is computed using a weighted multi-domain model calibrated to published epidemiological effect sizes and population attributable risks:</p>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Domain</th><th>Weight</th><th>Factors Included</th><th>Evidence Basis</th></tr></thead>
          <tbody>
            <tr><td><strong>Genetic &amp; Hereditary</strong></td><td><span class="pill pill-purple">22%</span></td><td>APOE4 genotype, family history, TBI, stroke, rare mutations (PSEN1/2, APP)</td><td>APOE4 meta-analyses; familial AD genetics</td></tr>
            <tr><td><strong>Cognitive Symptoms</strong></td><td><span class="pill pill-red">22%</span></td><td>10 symptom domains (memory, language, orientation, executive, mood, repetition, tasks, visuospatial, apathy, hallucinations), symptom duration</td><td>NIA-AA diagnostic criteria; DSM-5</td></tr>
            <tr><td><strong>Biomarkers &amp; Imaging</strong></td><td><span class="pill pill-blue">18%</span></td><td>CSF Aβ42, CSF Tau/pTau, MRI findings, PET results, MMSE, MoCA, NfL, neuropsychological testing</td><td>ATN framework; Jack 2013 dynamic model</td></tr>
            <tr><td><strong>Medical Comorbidities</strong></td><td><span class="pill pill-yellow">16%</span></td><td>13 conditions, blood pressure, BMI, cholesterol, glucose, polypharmacy, depression severity, Vitamin D, inflammatory markers, homocysteine</td><td>Lancet Commission 2024; vascular dementia literature</td></tr>
            <tr><td><strong>Lifestyle Factors</strong></td><td><span class="pill pill-green">14%</span></td><td>Exercise, diet, sleep duration &amp; quality, smoking, alcohol, social engagement, cognitive stimulation, stress, air pollution</td><td>FINGER trial; MIND diet study; Lancet 2024 PAR data</td></tr>
            <tr><td><strong>Age Factor</strong></td><td><span class="pill pill-blue">5%</span></td><td>Exponential age-related risk increase (doubles every 5 years after 65)</td><td>Alzheimer's Association 2024 Facts &amp; Figures</td></tr>
            <tr><td><strong>Screening Score</strong></td><td><span class="pill pill-green">3%</span></td><td>5-item mini cognitive screening (orientation, recall, attention, language, visuospatial)</td><td>Adapted from MMSE, MoCA, Clock Drawing Test</td></tr>
          </tbody>
        </table>
      </div>
      <div style="margin-top:1rem;padding:1rem;background:var(--accent-l);border-radius:8px;font-size:13px;color:var(--muted)">
        <strong style="color:var(--accent)">Risk Tiers:</strong> Low Risk (0–34) — lifestyle monitoring advised · Moderate Risk (35–64) — clinical consultation recommended · High Risk (65–100) — prompt neurological evaluation advised
      </div>
    </div>

    <div class="card" style="margin-bottom:1.5rem">
      <div class="card-title"><div class="card-num">🚀</div>How to Run the Project</div>
      <div class="ai-content">
        <p><strong>Option 1 — Instant (No Setup Required):</strong></p>
        <ul>
          <li>Download the project ZIP and extract it</li>
          <li>Open <code style="background:var(--bg);padding:2px 6px;border-radius:4px;font-family:var(--mono);font-size:12px">index.html</code> directly in any modern browser (Chrome, Firefox, Edge, Safari)</li>
          <li>All form inputs, local scoring, charts, and export features work immediately — no server needed</li>
          <li>AI features (clinical summary, chatbot, recommendations) require API configuration (see Option 2)</li>
        </ul>
        <p><strong>Option 2 — With Full AI Features:</strong></p>
        <ul>
          <li>Open <code style="background:var(--bg);padding:2px 6px;border-radius:4px;font-family:var(--mono);font-size:12px">js/config.js</code> in a text editor</li>
          <li>Replace the empty <code style="background:var(--bg);padding:2px 6px;border-radius:4px;font-family:var(--mono);font-size:12px">API_KEY: ''</code> value with your Anthropic API key: <code style="background:var(--bg);padding:2px 6px;border-radius:4px;font-family:var(--mono);font-size:12px">API_KEY: 'sk-ant-api03-...'</code></li>
          <li>Open <code style="background:var(--bg);padding:2px 6px;border-radius:4px;font-family:var(--mono);font-size:12px">index.html</code> — all AI features will now work</li>
        </ul>
        <p><strong>Option 3 — Local Web Server (Recommended for Development):</strong></p>
        <ul>
          <li>Python: <code style="background:var(--bg);padding:2px 6px;border-radius:4px;font-family:var(--mono);font-size:12px">python -m http.server 8080</code> then open <code style="background:var(--bg);padding:2px 6px;border-radius:4px;font-family:var(--mono);font-size:12px">http://localhost:8080</code></li>
          <li>Node.js: <code style="background:var(--bg);padding:2px 6px;border-radius:4px;font-family:var(--mono);font-size:12px">npx serve .</code></li>
          <li>VS Code: Install the "Live Server" extension and click "Go Live"</li>
        </ul>
        <p><strong>Option 4 — Deploy Online (Free):</strong></p>
        <ul>
          <li>GitHub Pages: Push to a GitHub repo → Settings → Pages → Deploy from main branch</li>
          <li>Netlify: Drag-and-drop the project folder at <code style="background:var(--bg);padding:2px 6px;border-radius:4px;font-family:var(--mono);font-size:12px">netlify.com/drop</code></li>
          <li>Vercel: <code style="background:var(--bg);padding:2px 6px;border-radius:4px;font-family:var(--mono);font-size:12px">npx vercel --prod</code></li>
        </ul>
      </div>
    </div>

    <div class="card" style="margin-bottom:1.5rem">
      <div class="card-title"><div class="card-num">📁</div>Project File Structure</div>
      <pre style="font-family:var(--mono);font-size:12px;color:var(--muted);line-height:1.8;background:var(--bg);padding:1.25rem;border-radius:8px;overflow-x:auto">neuroscan_project/
├── index.html              ← Main entry point
├── README.md               ← Project documentation
├── css/
│   ├── main.css            ← Layout, variables, base styles
│   └── components.css      ← UI components (cards, charts, chatbot)
├── js/
│   ├── config.js           ← API key &amp; app configuration
│   ├── utils.js            ← Shared utility functions
│   ├── scoring.js          ← Multi-domain risk scoring engine
│   ├── charts.js           ← Chart.js visualisation manager
│   ├── chatbot.js          ← AI chatbot module
│   ├── export.js           ← PDF / CSV / JSON export
│   ├── history.js          ← localStorage history tracking
│   ├── app.js              ← Main app controller &amp; routing
│   └── pages/
│       ├── home.js         ← 8-step assessment wizard
│       ├── results.js      ← Results dashboard (8 tabs)
│       ├── education.js    ← Learn page content
│       └── about.js        ← About &amp; methodology
└── assets/
    └── favicon.svg         ← App icon</pre>
    </div>

    <div class="card" style="margin-bottom:1.5rem">
      <div class="card-title"><div class="card-num">⚠️</div>Important Limitations &amp; Disclaimers</div>
      <div class="ai-content">
        <ul>
          <li><strong>Not a medical diagnostic tool:</strong> This system is designed for educational and research purposes only. It does not constitute medical advice, diagnosis, or treatment.</li>
          <li><strong>Screening only:</strong> Risk scores are estimates based on epidemiological population data, not individual clinical examination or validated diagnostic algorithms.</li>
          <li><strong>No server-side processing:</strong> All scoring is performed client-side in the browser. No patient data is transmitted to any server except during AI analysis calls to the Anthropic API.</li>
          <li><strong>Self-reported data:</strong> The accuracy of results depends entirely on accurate, honest self-reporting by the patient or caregiver.</li>
          <li><strong>Always consult professionals:</strong> Any concerns arising from this assessment should be discussed with a licensed neurologist, geriatric psychiatrist, or primary care physician.</li>
          <li><strong>AI limitations:</strong> The AI-generated clinical summaries are generated by a large language model and may contain inaccuracies. They should not be used as a substitute for professional medical opinion.</li>
        </ul>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><div class="card-num">🙏</div>Acknowledgements</div>
      <div class="ai-content">
        <p>This project was developed with reference to the following clinical guidelines, research publications, and organisations:</p>
        <ul>
          <li>Alzheimer's Association (alz.org) — clinical guidelines and epidemiological data</li>
          <li>National Institute on Aging (NIA) / National Institutes of Health (NIH)</li>
          <li>Lancet Commission on Dementia Prevention, Intervention, and Care (2020, 2024)</li>
          <li>Alzheimer's Research UK — biomarker and genetic risk data</li>
          <li>The FINGER Study Group — lifestyle intervention evidence base</li>
          <li>Anthropic — Claude AI API for AI-powered clinical analysis</li>
          <li>Chart.js contributors — open source data visualisation library</li>
          <li>jsPDF contributors — open source PDF generation library</li>
        </ul>
      </div>
    </div>
  </div>`;
}
