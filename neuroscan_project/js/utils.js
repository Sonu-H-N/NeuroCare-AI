/* ═══════════════════════════════════════════
   NeuroScan AI — Utility Functions
═══════════════════════════════════════════ */

const Utils = {

  /* ── DOM Helpers ── */
  $: (sel) => document.querySelector(sel),
  $$: (sel) => document.querySelectorAll(sel),

  getRadio(name) {
    const el = document.querySelector(`input[name="${name}"]:checked`);
    return el ? el.value : null;
  },

  getChecks(containerId) {
    return Array.from(
      document.querySelectorAll(`#${containerId} input[type=checkbox]:checked`)
    ).map(c => c.value).filter(v => v !== 'None');
  },

  setRangeVal(rangeId, displayId, suffix = '') {
    const el = document.getElementById(rangeId);
    const disp = document.getElementById(displayId);
    if (el && disp) disp.textContent = el.value + suffix;
  },

  /* ── Score Formatting ── */
  fmtScore(v) {
    const c = v < CONFIG.RISK_LOW
      ? 'var(--success)'
      : v < CONFIG.RISK_MODERATE
        ? 'var(--warn)'
        : 'var(--danger)';
    return `<span style="color:${c};font-weight:600">${Math.round(v)}/100</span>`;
  },

  tierLabel(score) {
    if (score < CONFIG.RISK_LOW) return 'Low Risk';
    if (score < CONFIG.RISK_MODERATE) return 'Moderate Risk';
    return 'High Risk';
  },

  tierClass(score) {
    if (score < CONFIG.RISK_LOW) return 'tier-low';
    if (score < CONFIG.RISK_MODERATE) return 'tier-mod';
    return 'tier-high';
  },

  tierColor(score) {
    if (score < CONFIG.RISK_LOW) return 'var(--success)';
    if (score < CONFIG.RISK_MODERATE) return 'var(--warn)';
    return 'var(--danger)';
  },

  factorColor(v) {
    if (v < 30) return CONFIG.COLORS.success;
    if (v < 60) return CONFIG.COLORS.warn;
    return CONFIG.COLORS.danger;
  },

  /* ── Toast Notification ── */
  toast(msg, duration = 3000) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), duration);
  },

  /* ── Loading Overlay ── */
  showLoading(messages = []) {
    const overlay = document.getElementById('loadingOverlay');
    const bar = document.getElementById('loadingBar');
    const msgEl = document.getElementById('loadingMsg');
    if (!overlay) return;
    overlay.style.display = 'flex';
    let progress = 0;
    let msgIdx = 0;
    const interval = setInterval(() => {
      progress = Math.min(progress + Math.random() * 12, 90);
      if (bar) bar.style.width = progress + '%';
      if (messages.length && msgEl) {
        msgEl.textContent = messages[msgIdx % messages.length];
        msgIdx++;
      }
    }, 600);
    overlay._interval = interval;
  },

  hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    const bar = document.getElementById('loadingBar');
    if (!overlay) return;
    if (overlay._interval) clearInterval(overlay._interval);
    if (bar) bar.style.width = '100%';
    setTimeout(() => {
      overlay.style.display = 'none';
      if (bar) bar.style.width = '0%';
    }, 400);
  },

  /* ── Date Formatting ── */
  fmtDate(isoStr) {
    return new Date(isoStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  },

  fmtDateTime() {
    return new Date().toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  },

  /* ── API Call ── */
  async callClaude(prompt, systemPrompt = '') {
    const messages = [{ role: 'user', content: prompt }];
    const body = {
      model: CONFIG.MODEL,
      max_tokens: CONFIG.MAX_TOKENS,
      messages
    };
    if (systemPrompt) {
      body.system = systemPrompt;
    }

    const headers = { 'Content-Type': 'application/json' };
    if (CONFIG.API_KEY) {
      headers['x-api-key'] = CONFIG.API_KEY;
      headers['anthropic-version'] = '2023-06-01';
    }

    const resp = await fetch(CONFIG.API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    const data = await resp.json();
    if (data.error) throw new Error(data.error.message || 'API error');
    return data.content.map(i => i.text || '').join('');
  },

  /* ── Safe JSON Parse ── */
  parseJSON(raw) {
    try {
      const clean = raw.replace(/```json|```/g, '').trim();
      return JSON.parse(clean);
    } catch {
      return null;
    }
  },

  /* ── Scroll to top ── */
  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  /* ── Generate Patient ID ── */
  genPID() {
    return 'NS-' + Date.now().toString(36).toUpperCase();
  },

  /* ── Clamp ── */
  clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }
};
