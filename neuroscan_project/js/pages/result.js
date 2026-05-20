/* ═══════════════════════════════════════════
   NeuroScan AI — Results Page
═══════════════════════════════════════════ */

function renderResultsPage(patientData, scores) {
  const d = patientData;
  const s = scores;
  const el = document.getElementById('page-results');
  if (!el) return;

  el.innerHTML = `
  <div class="page-inner">
    <div style="text-align:center;margin-bottom:2rem">
      <h2 style="font-family:var(--serif);font-size:2.2rem;margin-bottom:.4rem">Alzheimer's Risk Assessment Report</h2>
      <p style="font-size:13px;color:var(--muted)" id="resMeta">Generated ${Utils.fmtDateTime()} · Patient: ${d.pname || d.pid} · Age ${d.age}</p>
    </div>

    <div class="res-tabs" id="resTabs">
      <button class="res-tab active" onclick="showResTab('overview')">📊 Overview</button>
      <button class="res-tab" onclick="showResTab('analysis')">🧠 AI Analysis</button>
      <button class="res-tab" onclick="showResTab('factors')">📈 Risk Factors</button>
      <button class="res-tab" onclick="showResTab('recommendations')">💊 Action Plan</button>
      <button class="res-tab" onclick="showResTab('whatif')">🔮 What-If</button>
      <button class="res-tab" onclick="showResTab('timeline')">📅 Timeline</button>
      <button class="res-tab" onclick="showResTab('chatbot')">💬 Ask AI</button>
      <button class="res-tab" onclick="showResTab('export')">📄 Export</button>
    </div>

    <!-- OVERVIEW -->
    <div class="res-panel active" id="rt-overview">
      <div class="risk-hero">
        <div class="risk-label">OVERALL ALZHEIMER'S RISK SCORE</div>
        <div class="risk-score" id="riskScore">${s.overall}</div>
        <div><span class="risk-tier ${Utils.tierClass(s.overall)}" id="riskTier">${Utils.tierLabel(s.overall)}</span></div>
        <div class="percentile-txt">Estimated ${s.overall}th percentile for age-matched population</div>
        <div class="gauge-wrap"><canvas id="gaugeChart"></canvas></div>
      </div>
      <div class="metrics-grid">
        <div class="mc"><div class="mc-lbl">Genetic Risk</div><div class="mc-val">${Utils.fmtScore(s.genetic)}</div><div class="mc-sub">APOE4 &amp; heredity</div></div>
        <div class="mc"><div class="mc-lbl">Lifestyle Score</div><div class="mc-val">${Utils.fmtScore(s.lifestyle)}</div><div class="mc-sub">Activity, diet, sleep</div></div>
        <div class="mc"><div class="mc-lbl">Medical Burden</div><div class="mc-val">${Utils.fmtScore(s.medical)}</div><div class="mc-sub">Comorbidities</div></div>
        <div class="mc"><div class="mc-lbl">Cognitive Signs</div><div class="mc-val">${Utils.fmtScore(s.cognitive)}</div><div class="mc-sub">Reported symptoms</div></div>
        <div class="mc"><div class="mc-lbl">Biomarker Index</div><div class="mc-val">${Utils.fmtScore(s.biomarker)}</div><div class="mc-sub">Lab &amp; imaging</div></div>
        <div class="mc"><div class="mc-lbl">Screening Score</div><div class="mc-val"><span style="color:var(--accent);font-weight:600">${s.screenScore}/15</span></div><div class="mc-sub">Mini-cognitive test</div></div>
      </div>
      <div class="two-col">
        <div class="chart-card"><div class="chart-title">Multi-Domain Risk Radar</div><div style="position:relative;height:240px"><canvas id="radarChart"></canvas></div></div>
        <div class="chart-card"><div class="chart-title">Modifiable vs Non-Modifiable Risk</div>
          <div style="position:relative;height:200px"><canvas id="donutChart"></canvas></div>
          <div id="donutLegend" style="display:flex;gap:16px;justify-content:center;margin-top:8px;font-size:12px;color:var(--muted)"></div>
        </div>
      </div>
      <div class="chart-card" style="margin-bottom:1.5rem"><div class="chart-title">Risk Score by Domain</div><div style="position:relative;height:220px"><canvas id="barChart"></canvas></div></div>
      <div class="chart-card" style="margin-bottom:1.5rem"><div class="chart-title">Your Score vs Population Average by Age Group</div><div style="position:relative;height:200px"><canvas id="popChart"></canvas></div></div>
    </div>

    <!-- AI ANALYSIS -->
    <div class="res-panel" id="rt-analysis">
      <div class="analysis-card"><div class="analysis-title"><div class="card-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>AI Clinical Summary</div><div class="ai-content" id="aiSummary"><div class="typing"><span></span><span></span><span></span></div></div></div>
      <div class="analysis-card"><div class="analysis-title"><div class="card-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>Staging &amp; Prognosis (ATN Framework)</div><div class="ai-content" id="stagingContent"><div class="typing"><span></span><span></span><span></span></div></div></div>
      <div class="analysis-card"><div class="analysis-title"><div class="card-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>Scientific Basis &amp; Clinical References</div><div class="ai-content" id="scienceContent"><div class="typing"><span></span><span></span><span></span></div></div></div>
    </div>

    <!-- FACTORS -->
    <div class="res-panel" id="rt-factors">
      <div class="analysis-card"><div class="analysis-title"><div class="card-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>Individual Risk Factor Analysis (25 Biomarkers)</div>
        <div class="factor-list" id="factorList"></div>
      </div>
      <div class="analysis-card"><div class="analysis-title"><div class="card-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg></div>Protective Factors Identified</div>
        <div id="protectiveContent" class="ai-content"></div>
      </div>
      <div class="analysis-card"><div class="analysis-title"><div class="card-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></div>Detailed Factor Comparison Table</div>
        <div class="table-wrap"><table class="data-table"><thead><tr><th>Risk Factor</th><th>Patient Value</th><th>Optimal</th><th>Impact</th><th>Modifiable?</th></tr></thead><tbody id="compareBody"></tbody></table></div>
      </div>
    </div>

    <!-- RECOMMENDATIONS -->
    <div class="res-panel" id="rt-recommendations">
      <div class="analysis-card"><div class="analysis-title"><div class="card-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg></div>Personalised Action Plan</div>
        <div class="reco-grid" id="recoGrid"><div class="typing"><span></span><span></span><span></span></div></div>
      </div>
      <div class="analysis-card"><div class="analysis-title"><div class="card-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>12-Week Action Roadmap</div>
        <div class="ai-content" id="roadmapContent"><div class="typing"><span></span><span></span><span></span></div></div>
      </div>
    </div>

    <!-- WHAT-IF -->
    <div class="res-panel" id="rt-whatif">
      <div class="analysis-card">
        <div class="analysis-title"><div class="card-icon">🔮</div>Lifestyle What-If Risk Simulator</div>
        <p style="font-size:13px;color:var(--muted);margin-bottom:1.5rem">Adjust the sliders to simulate how lifestyle changes could lower your risk score in real-time.</p>
        <div class="whatif-grid">
          <div>
            ${[['wi-ex','Exercise (days/week)','0','7','3',''],['wi-sl','Sleep Hours','3','12','7','.5'],['wi-st','Stress Level (0-10)','0','10','4',''],['wi-so','Social Activities (days/week)','0','7','3',''],['wi-ct','Cognitive Training (sessions/week)','0','7','2','']].map(([id,label,min,max,val,step])=>`
            <div class="wi-slider-row">
              <div class="wi-label-row"><span>${label}</span><span id="${id}-val">${val}${label.includes('Sleep')?'h':''}</span></div>
              <input class="wi-range" type="range" id="${id}" min="${min}" max="${max}" value="${val}" ${step?`step="${step}"`:''} oninput="updateWhatIf()"/>
            </div>`).join('')}
          </div>
          <div>
            <div class="mc" style="margin-bottom:1rem"><div class="mc-lbl">Current Score</div><div class="mc-val" id="wi-current" style="color:var(--danger)">${s.overall}/100</div></div>
            <div class="mc" style="margin-bottom:1rem"><div class="mc-lbl">Simulated Score</div><div class="mc-val" id="wi-simulated" style="color:var(--success)">${s.overall}/100</div></div>
            <div class="mc" style="margin-bottom:1rem"><div class="mc-lbl">Potential Reduction</div><div class="mc-val" id="wi-reduction" style="color:var(--accent)">0 pts</div></div>
            <div style="position:relative;height:200px;margin-top:1rem"><canvas id="wiChart"></canvas></div>
          </div>
        </div>
      </div>
    </div>

    <!-- TIMELINE -->
    <div class="res-panel" id="rt-timeline">
      <div class="analysis-card"><div class="analysis-title"><div class="card-icon">📅</div>Alzheimer's Disease Progression Timeline</div>
        <div id="timelineContent"></div>
      </div>
      <div class="analysis-card"><div class="analysis-title"><div class="card-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>Biomarker Trajectory Model (Jack 2013)</div>
        <div style="position:relative;height:260px"><canvas id="trajChart"></canvas></div>
        <p style="font-size:11px;color:var(--subtle);margin-top:.5rem">Hypothetical biomarker progression based on the Jack et al. (2013) dynamic model of Alzheimer's pathophysiology. Curve shape adjusted for this patient's biomarker profile.</p>
      </div>
    </div>

    <!-- CHATBOT -->
    <div class="res-panel" id="rt-chatbot">
      <div class="chatbot-wrap">
        <div class="chat-header">
          <div class="chat-avatar">N</div>
          <div><div class="chat-header-title">NeuroScan AI Assistant</div><div class="chat-header-sub">Ask about your results, risk factors, or Alzheimer's prevention</div></div>
        </div>
        <div class="chat-messages" id="chatMessages"></div>
        <div class="quick-questions">
          <button class="qbtn" onclick="sendQuick('What is my biggest modifiable risk factor?')">Biggest modifiable risk?</button>
          <button class="qbtn" onclick="sendQuick('What lifestyle changes should I prioritise first?')">Priority changes?</button>
          <button class="qbtn" onclick="sendQuick('Explain what APOE4 means for my risk in simple terms')">Explain APOE4</button>
          <button class="qbtn" onclick="sendQuick('What warning signs should I watch for going forward?')">Warning signs?</button>
          <button class="qbtn" onclick="sendQuick('Which specialists should I consult based on my profile?')">Who to consult?</button>
          <button class="qbtn" onclick="sendQuick('What are the newest Alzheimer\\'s treatments available in 2025?')">2025 treatments?</button>
        </div>
        <div class="chat-input-row">
          <input class="chat-input" id="chatInput" placeholder="Ask anything about your results or Alzheimer's disease..." onkeydown="if(event.key==='Enter')sendChat()"/>
          <button class="chat-send" onclick="sendChat()">Send ↵</button>
        </div>
      </div>
    </div>

    <!-- EXPORT -->
    <div class="res-panel" id="rt-export">
      <div class="analysis-card"><div class="analysis-title"><div class="card-icon">📄</div>Export &amp; Share Report</div>
        <div class="export-grid">
          <div class="export-card" onclick="Export.exportPDF(window._pd,window._sc)"><div class="export-icon">📄</div><div class="export-title">PDF Report</div><div class="export-desc">Full clinical report with scores and recommendations</div></div>
          <div class="export-card" onclick="Export.exportJSON(window._pd,window._sc)"><div class="export-icon">🗂️</div><div class="export-title">JSON Data</div><div class="export-desc">Raw assessment data for research or EHR integration</div></div>
          <div class="export-card" onclick="Export.exportCSV(window._pd,window._sc)"><div class="export-icon">📊</div><div class="export-title">CSV Summary</div><div class="export-desc">Spreadsheet-ready risk factor scores</div></div>
          <div class="export-card" onclick="Export.printReport()"><div class="export-icon">🖨️</div><div class="export-title">Print Report</div><div class="export-desc">Print-optimised clinical summary</div></div>
          <div class="export-card" onclick="Export.copySummary(window._pd,window._sc)"><div class="export-icon">📋</div><div class="export-title">Copy Summary</div><div class="export-desc">Copy full report text to clipboard</div></div>
          <div class="export-card" onclick="History.save(window._pd,window._sc)"><div class="export-icon">💾</div><div class="export-title">Save to History</div><div class="export-desc">Store for longitudinal risk tracking</div></div>
        </div>
      </div>
      <div class="analysis-card"><div class="analysis-title"><div class="card-icon">📝</div>Report Text</div>
        <textarea id="summaryText" style="width:100%;height:240px;font-family:var(--mono);font-size:11px;background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:1rem;color:var(--text);resize:vertical" readonly></textarea>
      </div>
    </div>

    <button class="reset-btn" onclick="App.reset()">← Start New Assessment</button>
  </div>`;

  // Set score colour
  const scoreEl = document.getElementById('riskScore');
  if (scoreEl) scoreEl.style.color = Utils.tierColor(s.overall).replace('var(--success)', '#167040').replace('var(--warn)', '#b06c08').replace('var(--danger)', '#b02e2e');

  // Summary text
  const st = document.getElementById('summaryText');
  if (st) st.value = Export.generateSummaryText(d, s);

  // Draw charts after DOM settles
  setTimeout(() => {
    Charts.drawGauge('gaugeChart', s.overall);
    Charts.drawRadar('radarChart', s, d);
    const mod = Utils.clamp(Math.round((s.lifestyle * 0.6 + s.medical * 0.5) / 1.1), 10, 85);
    const nonmod = 100 - mod;
    Charts.drawDonut('donutChart', mod, nonmod);
    const donutLeg = document.getElementById('donutLegend');
    if (donutLeg) donutLeg.innerHTML = `<span style="display:flex;align-items:center;gap:5px"><span style="width:10px;height:10px;border-radius:2px;background:#2b567f"></span>Modifiable ${mod}%</span><span style="display:flex;align-items:center;gap:5px"><span style="width:10px;height:10px;border-radius:2px;background:#d97706"></span>Non-Modifiable ${nonmod}%</span>`;
    Charts.drawDomainBar('barChart', s);
    Charts.drawPopulation('popChart', s.overall, d.age);
    Charts.drawTrajectory('trajChart', s);
  }, 100);

  // Render factors
  renderFactorBars(d, s);

  // Render timeline
  renderTimeline(d, s);

  // Init chatbot
  Chatbot.init(d, s);

  // Init what-if
  setTimeout(() => updateWhatIf(), 200);
}

/* ── Result Tab Switching ── */
function showResTab(name) {
  document.querySelectorAll('.res-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.res-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(`rt-${name}`);
  if (panel) panel.classList.add('active');
  document.querySelectorAll('.res-tab').forEach(t => {
    if (t.onclick && t.onclick.toString().includes(name)) t.classList.add('active');
  });
  if (name === 'whatif') setTimeout(updateWhatIf, 100);
}

/* ── Factor Bars Rendering ── */
function renderFactorBars(d, s) {
  const factors = Scoring.factorBreakdown(d);
  const fl = document.getElementById('factorList');
  if (fl) fl.innerHTML = factors.map(f => {
    const c = Utils.factorColor(f.v);
    return `<div class="factor-item">
      <div class="factor-info">
        <div class="factor-name">${f.n} <span style="font-size:10px;color:${f.mod?'var(--success)':'var(--subtle)'};">${f.mod ? '● Modifiable' : '○ Non-modifiable'}</span></div>
        <div class="factor-bar"><div class="factor-fill" style="width:${f.v}%;background:${c}"></div></div>
      </div>
      <div class="factor-score" style="color:${c}">${Math.round(f.v)}</div>
    </div>`;
  }).join('');

  // Compare table
  const cb = document.getElementById('compareBody');
  if (cb) cb.innerHTML = factors.slice(0, 15).map(f => {
    const impact = f.v > 60 ? `<span class="pill pill-red">High</span>` : f.v > 30 ? `<span class="pill pill-yellow">Moderate</span>` : `<span class="pill pill-green">Low</span>`;
    const mod = f.mod ? `<span class="pill pill-green">Yes</span>` : `<span class="pill" style="background:var(--bg);color:var(--muted)">No</span>`;
    return `<tr><td>${f.n}</td><td class="mono">${Math.round(f.v)}/100</td><td style="color:var(--success);font-size:12px">${f.opt}</td><td>${impact}</td><td>${mod}</td></tr>`;
  }).join('');

  // Protective factors
  const prot = Scoring.protectiveFactors(d);
  const pc = document.getElementById('protectiveContent');
  if (pc) pc.innerHTML = prot.length
    ? `<ul class="protective-list">${prot.map(p => `<li><span class="check">✓</span><span>${p}</span></li>`).join('')}</ul>`
    : '<p>No significant protective factors identified. Focus on the action plan to build cognitive reserve.</p>';
}

/* ── Timeline Rendering ── */
function renderTimeline(d, s) {
  const stages = [
    { label: 'Pre-clinical (10–20 yrs before symptoms)', title: 'Silent Amyloid Accumulation', desc: 'Amyloid-β plaques begin forming silently. No clinical symptoms. Detectable via PET or CSF biomarkers. This is the optimal intervention window.', status: s.biomarker > 30 ? 'past' : '' },
    { label: 'Stage MCI (~5–10 yrs before diagnosis)', title: 'Mild Cognitive Impairment (MCI)', desc: 'Subtle memory and cognitive changes detectable on neuropsychological testing. Daily function largely preserved. MMSE typically 24–27.', status: s.cognitive > 35 ? 'current' : '' },
    { label: 'Stage 4 (Early Alzheimer\'s)', title: 'Mild Alzheimer\'s Disease', desc: 'Memory lapses affecting daily life, word-finding difficulty, personality changes. Driving and finances become challenging.', status: '' },
    { label: 'Stages 5–6 (Mid-stage)', title: 'Moderate Alzheimer\'s Disease', desc: 'Significant memory loss, confusion, wandering. Cannot perform daily activities without assistance. May not recognise family.', status: '' },
    { label: 'Stage 7 (Late-stage)', title: 'Severe Alzheimer\'s Disease', desc: 'Loss of speech, mobility, swallowing. Full-time care required. This stage typically lasts 1–3 years.', status: '' },
  ];
  const tc = document.getElementById('timelineContent');
  if (tc) tc.innerHTML = `<div class="timeline">${stages.map(st => `
    <div class="tl-item ${st.status}">
      <div class="tl-dot"></div>
      <div class="tl-year">${st.label}</div>
      <div class="tl-title">${st.title}</div>
      <div class="tl-desc">${st.desc}</div>
    </div>`).join('')}</div>`;
}

/* ── What-If Simulator ── */
function updateWhatIf() {
  const ex = parseFloat((document.getElementById('wi-ex') || {}).value || 3);
  const sl = parseFloat((document.getElementById('wi-sl') || {}).value || 7);
  const st = parseFloat((document.getElementById('wi-st') || {}).value || 4);
  const so = parseFloat((document.getElementById('wi-so') || {}).value || 3);
  const ct = parseFloat((document.getElementById('wi-ct') || {}).value || 2);

  const setV = (id, val, suffix = '') => { const e = document.getElementById(id); if (e) e.textContent = val + suffix; };
  setV('wi-ex-val', ex);
  setV('wi-sl-val', sl.toFixed(1), 'h');
  setV('wi-st-val', st);
  setV('wi-so-val', so);
  setV('wi-ct-val', ct);

  let reduction = 0;
  if (ex >= 5) reduction += 12; else if (ex >= 3) reduction += 6; else reduction -= 7;
  if (sl >= 7 && sl <= 9) reduction += 6; else if (sl < 6 || sl > 9) reduction -= 7;
  if (st <= 3) reduction += 6; else if (st >= 7) reduction -= 6;
  if (so >= 5) reduction += 8; else if (so <= 1) reduction -= 4;
  if (ct >= 5) reduction += 6; else if (ct <= 0) reduction -= 2;

  const current = (window._sc || {}).overall || 50;
  const simulated = Utils.clamp(current - reduction, 5, 99);

  setV('wi-current', current + '/100');
  setV('wi-simulated', simulated + '/100');
  setV('wi-reduction', (reduction >= 0 ? '-' : '+') + Math.abs(reduction) + ' pts');
  const redEl = document.getElementById('wi-reduction');
  if (redEl) redEl.style.color = reduction > 0 ? 'var(--success)' : reduction < 0 ? 'var(--danger)' : 'var(--muted)';

  Charts.drawWhatIf('wiChart', current, simulated);
}

/* ── AI Content Loaders ── */
async function loadAISummary(d, s) {
  const tier = Utils.tierLabel(s.overall);
  const prompt = `You are a senior neurologist specialising in Alzheimer's disease. Provide a detailed clinical summary for this patient.

PATIENT: Age ${d.age}, ${d.sex}, Education: ${d.education}
RISK SCORES: Overall ${s.overall}/100 (${tier}), Genetic ${Math.round(s.genetic)}/100, Lifestyle ${Math.round(s.lifestyle)}/100, Medical ${Math.round(s.medical)}/100, Cognitive ${Math.round(s.cognitive)}/100, Biomarkers ${Math.round(s.biomarker)}/100
GENETICS: APOE4 ${d.apoe4}, Family Hx: ${d.fhist}, Early-onset: ${d.earlyOnset}, TBI: ${d.tbi}, Stroke: ${d.stroke}
LIFESTYLE: Exercise ${d.exercise}, Diet ${d.diet}, Sleep ${d.sleep}h (${d.sleepQ}), Smoking ${d.smoking}, Stress ${d.stress}/10, Social ${d.social}, Cognitive Stimulation ${d.cogstim}
MEDICAL: Conditions [${(d.conditions||[]).join(', ')||'None'}], BP ${d.bp}, BMI ${d.bmi}, Glucose ${d.glucose}, Depression ${d.depression}, Vitamin D ${d.vitd}
COGNITIVE (0-10): Memory ${d.s_memory}, Language ${d.s_lang}, Orientation ${d.s_orient}, Executive ${d.s_exec}, Mood ${d.s_mood}, Repetition ${d.s_repeat}
BIOMARKERS: MMSE ${d.mmse}/30, MoCA ${d.moca}/30, Amyloid ${d.amyloid}, Tau ${d.tau}, MRI ${d.mri}, PET ${d.pet}, Neuropsych ${d.neuropsych}
NOTES: ${d.notes||'None'}

Write 4 detailed paragraphs covering: (1) overall risk impression and tier justification, (2) most significant risk factors and their clinical interactions, (3) protective factors and cognitive reserve assessment, (4) clinical significance, urgency level, and recommended next steps. Be specific to this patient's profile.`;
  try {
    const r = await Utils.callClaude(prompt);
    const el = document.getElementById('aiSummary');
    if (el) el.innerHTML = r.split('\n\n').filter(Boolean).map(p => `<p>${p}</p>`).join('');
  } catch (e) {
    const el = document.getElementById('aiSummary');
    if (el) el.innerHTML = `<p style="color:var(--danger)">AI summary unavailable. The computed risk scores reflect evidence-based analysis. Configure your API key in js/config.js for AI analysis. Error: ${e.message}</p>`;
  }
}

async function loadAIStaging(d, s) {
  const prompt = `Clinical profile: MMSE ${d.mmse}/30, MoCA ${d.moca}/30, Cognitive symptoms (memory ${d.s_memory}/10, executive ${d.s_exec}/10, orientation ${d.s_orient}/10, language ${d.s_lang}/10), Biomarkers (Amyloid ${d.amyloid}, Tau ${d.tau}, MRI ${d.mri}, PET ${d.pet}), Neuropsych ${d.neuropsych}, Duration ${d.symdur}, Overall risk ${s.overall}/100.

In 3 paragraphs: (1) Current probable clinical stage using NIA-AA ATN framework and GDS/Reisberg stages, (2) Likely disease trajectory over next 5–10 years, (3) What this means practically for the patient's daily life and family planning. Be clinically precise but accessible.`;
  try {
    const r = await Utils.callClaude(prompt);
    const el = document.getElementById('stagingContent');
    if (el) el.innerHTML = r.split('\n\n').filter(Boolean).map(p => `<p>${p}</p>`).join('');
  } catch (e) {
    const el = document.getElementById('stagingContent');
    if (el) el.innerHTML = '<p>Staging analysis unavailable. Please configure API key in js/config.js.</p>';
  }
}

async function loadAIScience(d, s) {
  const prompt = `Write 2–3 paragraphs on the scientific evidence base for this patient's risk profile. Reference specific studies and biological mechanisms relevant to their key risk factors: APOE4 ${d.apoe4}, exercise ${d.exercise}, diet ${d.diet}, stress ${d.stress}/10, conditions [${(d.conditions||[]).join(', ')||'none'}]. Cite landmark studies (FINGER trial, Lancet Commission 2024, MIND diet study Morris 2015, Jack 2013 dynamic biomarker model). Explain the molecular mechanisms (amyloid cascade hypothesis, tau propagation, neuroinflammation, glymphatic clearance). Keep language accessible but evidence-grounded.`;
  try {
    const r = await Utils.callClaude(prompt);
    const el = document.getElementById('scienceContent');
    if (el) el.innerHTML = r.split('\n\n').filter(Boolean).map(p => `<p>${p}</p>`).join('');
  } catch (e) {
    const el = document.getElementById('scienceContent');
    if (el) el.innerHTML = '<p>Scientific reference content unavailable. Please configure API key in js/config.js.</p>';
  }
}

async function loadAIRecommendations(d, s) {
  const prompt = `Patient: Age ${d.age}, Risk ${s.overall}/100, APOE4 ${d.apoe4}, Exercise ${d.exercise}, Diet ${d.diet}, Sleep ${d.sleep}h (${d.sleepQ}), Stress ${d.stress}/10, Social ${d.social}, Conditions [${(d.conditions||[]).join(', ')||'None'}], Depression ${d.depression}, MMSE ${d.mmse}, MoCA ${d.moca}.

Respond ONLY with valid JSON (no markdown fences, no preamble):
{"recommendations":[{"icon":"🏃","title":"Short 4-word title","description":"2 specific, actionable sentences tailored to this patient.","priority":"high|medium|low","timeframe":"immediate|short-term|long-term"},...],"roadmap":"A 12-week structured plan with specific weekly milestones in 3 paragraphs."}

Include exactly 8 recommendations covering: aerobic exercise, dietary changes, sleep optimisation, stress management, social engagement, cognitive training, medical monitoring, and specialist referral.`;
  try {
    const r = await Utils.callClaude(prompt);
    const parsed = Utils.parseJSON(r);
    if (parsed && parsed.recommendations) {
      const colors = ['#e6eef7','#e5f5ec','#fdf3e3','#fdeaea','#ede8f7','#e3f4f4','#fdf3e3','#e5f5ec'];
      const rg = document.getElementById('recoGrid');
      if (rg) rg.innerHTML = parsed.recommendations.map((rc, i) => `
        <div class="reco-card">
          <div class="reco-icon" style="background:${colors[i%colors.length]}">${rc.icon}</div>
          <div class="reco-title">${rc.title}</div>
          <div class="reco-text">${rc.description}</div>
          <div class="reco-priority ${rc.priority==='high'?'pill-red':rc.priority==='medium'?'pill-yellow':'pill-green'} pill">${rc.priority.toUpperCase()} · ${rc.timeframe}</div>
        </div>`).join('');
    }
    if (parsed && parsed.roadmap) {
      const rm = document.getElementById('roadmapContent');
      if (rm) rm.innerHTML = parsed.roadmap.split('\n').filter(Boolean).map(p => `<p>${p}</p>`).join('');
    }
  } catch (e) {
    const rg = document.getElementById('recoGrid');
    if (rg) rg.innerHTML = `<p style="color:var(--muted)">Recommendations unavailable. Configure API key in js/config.js. Error: ${e.message}</p>`;
  }
}
