/* ═══════════════════════════════════════════
   NeuroScan AI — History & Longitudinal Tracking
═══════════════════════════════════════════ */

const History = {

  load() {
    try {
      return JSON.parse(localStorage.getItem(CONFIG.HISTORY_KEY) || '[]');
    } catch { return []; }
  },

  save(patientData, scores) {
    const entries = this.load();
    entries.push({
      id: patientData.pid || Utils.genPID(),
      date: new Date().toISOString(),
      name: patientData.pname || patientData.pid || 'Anonymous',
      age: patientData.age,
      sex: patientData.sex,
      overall: scores.overall,
      genetic: Math.round(scores.genetic),
      lifestyle: Math.round(scores.lifestyle),
      medical: Math.round(scores.medical),
      cognitive: Math.round(scores.cognitive),
      biomarker: Math.round(scores.biomarker),
      tier: Utils.tierLabel(scores.overall)
    });
    // Keep last N entries
    const trimmed = entries.slice(-CONFIG.MAX_HISTORY_ENTRIES);
    localStorage.setItem(CONFIG.HISTORY_KEY, JSON.stringify(trimmed));
    Utils.toast('✅ Assessment saved to history');
  },

  clear() {
    if (confirm('Clear all saved assessments? This cannot be undone.')) {
      localStorage.removeItem(CONFIG.HISTORY_KEY);
      renderHistoryPage();
      Utils.toast('History cleared');
    }
  },

  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const entries = this.load();

    if (!entries.length) {
      el.innerHTML = `
        <div class="hist-empty">
          <div class="hist-empty-icon">📋</div>
          <div>No saved assessments yet.</div>
          <div style="font-size:13px;margin-top:6px;color:var(--subtle)">Complete an analysis and click "Save to History" in the Export tab.</div>
        </div>`;
      return;
    }

    const reversed = [...entries].reverse();
    el.innerHTML = `
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Date</th><th>Patient</th><th>Age</th>
              <th>Overall</th><th>Genetic</th><th>Lifestyle</th>
              <th>Medical</th><th>Cognitive</th><th>Tier</th>
            </tr>
          </thead>
          <tbody>
            ${reversed.map((e, i) => {
              // entries is chronological; reversed[i]'s predecessor is the
              // next-older entry, i.e. reversed[i + 1]
              const prev = reversed[i + 1];
              const delta = prev ? e.overall - prev.overall : null;
              const deltaHtml = delta === null ? ''
                : delta === 0 ? ' <span style="color:var(--muted);font-size:11px">(no change)</span>'
                : delta > 0
                  ? ` <span style="color:var(--danger);font-size:11px">▲${delta}</span>`
                  : ` <span style="color:var(--success);font-size:11px">▼${Math.abs(delta)}</span>`;
              return `
              <tr>
                <td class="mono">${Utils.fmtDate(e.date)}</td>
                <td>${Utils.escapeHtml(e.name)}</td>
                <td>${Utils.escapeHtml(e.age)}</td>
                <td>${Utils.fmtScore(e.overall)}${deltaHtml}</td>
                <td>${Utils.fmtScore(e.genetic)}</td>
                <td>${Utils.fmtScore(e.lifestyle)}</td>
                <td>${Utils.fmtScore(e.medical)}</td>
                <td>${Utils.fmtScore(e.cognitive)}</td>
                <td><span class="pill ${e.overall < 35 ? 'pill-green' : e.overall < 65 ? 'pill-yellow' : 'pill-red'}">${e.tier}</span></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
      <div style="margin-top:1rem;display:flex;gap:.75rem">
        <button class="btn btn-secondary" style="font-size:13px" onclick="History.clear()">🗑 Clear History</button>
        <button class="btn btn-secondary" style="font-size:13px" onclick="History.exportAll()">📤 Export All</button>
      </div>`;

    // Trend chart
    if (entries.length >= 2) {
      const chartWrap = document.getElementById('trendChartWrap');
      if (chartWrap) {
        chartWrap.style.display = 'block';
        setTimeout(() => Charts.drawTrend('trendChart', [...entries]), 100);
      }
    }
  },

  exportAll() {
    const entries = this.load();
    if (!entries.length) { Utils.toast('No history to export'); return; }
    const csv = [
      ['Date','Patient','Age','Overall','Genetic','Lifestyle','Medical','Cognitive','Tier'],
      ...entries.map(e => [Utils.fmtDate(e.date), e.name, e.age, e.overall, e.genetic, e.lifestyle, e.medical, e.cognitive, e.tier])
    ].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    Export.download(csv, 'neuroscan_history.csv', 'text/csv');
    Utils.toast('✅ History exported');
  }
};
