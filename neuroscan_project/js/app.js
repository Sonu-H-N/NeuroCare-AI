/* ═══════════════════════════════════════════
   NeuroScan AI — Main App Controller
   Entry point, page routing, analysis runner
═══════════════════════════════════════════ */

const App = {

  currentPage: 'home',

  init() {
    renderHomePage();
    renderEducationPage();
    renderAboutPage();
    this.renderHistoryPage();
    showPage('home');
    console.log(`%c NeuroScan AI v${CONFIG.APP_VERSION} initialised`, 'color:#2b567f;font-weight:bold;font-size:14px');
  },

  renderHistoryPage() {
    const el = document.getElementById('page-history');
    if (!el) return;
    el.innerHTML = `
      <div class="page-inner">
        <h2 style="font-family:var(--serif);font-size:2rem;margin-bottom:.4rem">Assessment History</h2>
        <p style="color:var(--muted);font-size:14px;margin-bottom:2rem">Longitudinal tracking of risk assessments over time.</p>
        <div id="historyTableWrap"></div>
        <div class="chart-card" id="trendChartWrap" style="display:none;margin-top:1.5rem">
          <div class="chart-title">Risk Score Trend Over Time</div>
          <div style="position:relative;height:240px"><canvas id="trendChart"></canvas></div>
        </div>
      </div>`;
    History.render('historyTableWrap');
  },

  reset() {
    window._pd = null;
    window._sc = null;
    Charts.destroyAll();
    showPage('home');
    renderHomePage();
    Utils.scrollTop();
  }
};

/* ── Page Navigation ── */
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

  const pageEl = document.getElementById(`page-${name}`);
  if (pageEl) pageEl.classList.add('active');

  document.querySelectorAll('.nav-tab').forEach(t => {
    const fn = t.getAttribute('onclick') || '';
    if (fn.includes(`'${name}'`)) t.classList.add('active');
  });

  App.currentPage = name;

  if (name === 'history') {
    App.renderHistoryPage();
  }

  Utils.scrollTop();
}

/* ── Dark Mode ── */
function toggleDark() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  const btn = document.getElementById('darkBtn');
  if (btn) btn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
  localStorage.setItem('neuroscan_dark', isDark ? '1' : '0');
}

/* ── Main Analysis Runner ── */
async function runAnalysis() {
  const d = collectFormData();
  const errEl = document.getElementById('formErr');

  // Basic validation
  if (!d.sex || !d.apoe4 || !d.fhist) {
    if (errEl) { errEl.textContent = 'Please complete all required fields (marked with *) before submitting.'; errEl.style.display = 'block'; }
    return;
  }
  if (errEl) errEl.style.display = 'none';

  // Show loading overlay
  Utils.showLoading([
    'Analysing genetic risk factors...',
    'Computing lifestyle risk scores...',
    'Processing biomarker data...',
    'Evaluating cognitive symptom profile...',
    'Generating AI clinical summary...',
    'Building personalised recommendations...',
    'Preparing results dashboard...'
  ]);

  // Disable button
  const btn = document.getElementById('analyzeBtn');
  if (btn) { btn.disabled = true; btn.classList.add('loading'); }

  // Compute scores
  const scores = Scoring.compute(d);
  scores.screenScore = ['q1','q2','q3','q4','q5']
    .map(k => parseInt(d[k] || 3)).reduce((a,b) => a+b, 0);

  // Store globally for export functions
  window._pd = d;
  window._sc = scores;

  // Switch to results page and render
  renderResultsPage(d, scores);
  showPage('results');

  // Hide loading
  Utils.hideLoading();

  // Re-enable button
  if (btn) { btn.disabled = false; btn.classList.remove('loading'); }

  // Fire AI requests in parallel (non-blocking)
  Promise.allSettled([
    loadAISummary(d, scores),
    loadAIStaging(d, scores),
    loadAIScience(d, scores),
    loadAIRecommendations(d, scores)
  ]).then(results => {
    const failed = results.filter(r => r.status === 'rejected').length;
    if (failed > 0) {
      console.warn(`${failed} AI request(s) failed. Check API key in js/config.js`);
    }
  });
}

/* ── Apply saved dark mode preference on load ── */
(function applyDarkPreference() {
  if (localStorage.getItem('neuroscan_dark') === '1') {
    document.body.classList.add('dark');
    const btn = document.getElementById('darkBtn');
    if (btn) btn.textContent = '☀️ Light';
  }
})();

/* ── Initialise App on DOM ready ── */
document.addEventListener('DOMContentLoaded', () => App.init());
