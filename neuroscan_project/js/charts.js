/* ═══════════════════════════════════════════
   NeuroScan AI — Chart Manager
═══════════════════════════════════════════ */

const Charts = {
  instances: {},

  destroy(id) {
    if (this.instances[id]) {
      this.instances[id].destroy();
      delete this.instances[id];
    }
  },

  destroyAll() {
    Object.keys(this.instances).forEach(id => this.destroy(id));
  },

  /* ── Gauge (Semicircle) ── */
  drawGauge(canvasId, score) {
    this.destroy(canvasId);
    const color = Utils.tierColor(score).replace('var(--success)', '#167040')
      .replace('var(--warn)', '#b06c08').replace('var(--danger)', '#b02e2e');
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    this.instances[canvasId] = new Chart(ctx.getContext('2d'), {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [score, 100 - score, 100],
          backgroundColor: [color, getComputedStyle(document.documentElement).getPropertyValue('--border') || '#e0dbd3', 'transparent'],
          borderWidth: 0,
          circumference: 180,
          rotation: 270,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '72%',
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        animation: { duration: 1200, easing: 'easeOutQuart' }
      }
    });
  },

  /* ── Radar ── */
  drawRadar(canvasId, scores, d) {
    this.destroy(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    this.instances[canvasId] = new Chart(ctx.getContext('2d'), {
      type: 'radar',
      data: {
        labels: ['Genetic', 'Lifestyle', 'Medical', 'Cognitive', 'Biomarkers', 'Screening'],
        datasets: [{
          label: 'Risk Level',
          data: [scores.genetic, scores.lifestyle, scores.medical, scores.cognitive, scores.biomarker, scores.screening],
          backgroundColor: 'rgba(43,86,127,.18)',
          borderColor: '#2b567f',
          borderWidth: 2,
          pointBackgroundColor: '#2b567f',
          pointRadius: 5,
          pointHoverRadius: 7,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          r: {
            min: 0, max: 100,
            ticks: { display: false, stepSize: 25 },
            grid: { color: 'rgba(0,0,0,.07)' },
            pointLabels: { font: { size: 11, family: 'DM Sans' }, color: '#6a6560' }
          }
        },
        animation: { duration: 1000 }
      }
    });
  },

  /* ── Donut (Modifiable vs Non-Modifiable) ── */
  drawDonut(canvasId, modifiable, nonModifiable) {
    this.destroy(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    this.instances[canvasId] = new Chart(ctx.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Modifiable Risk', 'Non-Modifiable Risk'],
        datasets: [{
          data: [modifiable, nonModifiable],
          backgroundColor: ['#2b567f', '#d97706'],
          borderWidth: 0,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '68%',
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${Math.round(ctx.raw)}%` } }
        },
        animation: { duration: 1000 }
      }
    });
  },

  /* ── Domain Bar Chart ── */
  drawDomainBar(canvasId, scores) {
    this.destroy(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    this.instances[canvasId] = new Chart(ctx.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Genetic', 'Lifestyle', 'Medical', 'Cognitive', 'Biomarkers', 'Age Factor'],
        datasets: [{
          label: 'Risk Score',
          data: [scores.genetic, scores.lifestyle, scores.medical, scores.cognitive, scores.biomarker, scores.ageFactor],
          backgroundColor: ['#7c3aed', '#2b567f', '#d97706', '#b02e2e', '#0f7070', '#6a6560'],
          borderRadius: 6,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false, indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: {
          x: { min: 0, max: 100, ticks: { color: '#9a9490', font: { size: 11 } }, grid: { color: 'rgba(0,0,0,.05)' } },
          y: { ticks: { color: '#9a9490', font: { size: 11 } }, grid: { display: false } }
        },
        animation: { duration: 1200, easing: 'easeOutQuart' }
      }
    });
  },

  /* ── Population Comparison ── */
  drawPopulation(canvasId, patientScore, patientAge) {
    this.destroy(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    const brackets = ['55–60', '60–65', '65–70', '70–75', '75–80', '80–85', '85+'];
    const popAvg   = [5, 9, 17, 28, 42, 58, 72];
    const age = parseInt(patientAge || 65);
    const idx = Math.min(6, Math.max(0, Math.floor((age - 55) / 5)));
    const patData = brackets.map((_, i) => i === idx ? patientScore : null);

    this.instances[canvasId] = new Chart(ctx.getContext('2d'), {
      type: 'bar',
      data: {
        labels: brackets,
        datasets: [
          { label: 'Population Average', data: popAvg, backgroundColor: 'rgba(43,86,127,.25)', borderRadius: 4 },
          { label: 'Your Score', data: patData, backgroundColor: '#b02e2e', borderRadius: 4 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { font: { size: 11 }, color: '#6a6560' } } },
        scales: {
          y: { min: 0, max: 100, ticks: { color: '#9a9490', font: { size: 11 } } },
          x: { ticks: { color: '#9a9490', font: { size: 11 } } }
        }
      }
    });
  },

  /* ── Biomarker Trajectory (Jack 2013 model) ── */
  drawTrajectory(canvasId, scores) {
    this.destroy(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    const yrs = Array.from({ length: 21 }, (_, i) => i);
    const b = scores.biomarker || 20;
    const c = scores.cognitive || 20;

    this.instances[canvasId] = new Chart(ctx.getContext('2d'), {
      type: 'line',
      data: {
        labels: yrs.map(y => `Y+${y}`),
        datasets: [
          { label: 'Amyloid-β', data: yrs.map(y => Utils.clamp(b * 0.3 + y * 3.8, 0, 100)), borderColor: '#b02e2e', borderWidth: 2, tension: .4, pointRadius: 0, fill: false },
          { label: 'Tau Pathology', data: yrs.map(y => Utils.clamp(b * 0.2 + Math.max(0, y - 4) * 5, 0, 100)), borderColor: '#d97706', borderWidth: 2, tension: .4, pointRadius: 0, fill: false },
          { label: 'Neurodegeneration', data: yrs.map(y => Utils.clamp(c * 0.25 + Math.max(0, y - 7) * 4.5, 0, 100)), borderColor: '#7c3aed', borderWidth: 2, tension: .4, pointRadius: 0, fill: false },
          { label: 'Cognition', data: yrs.map(y => Utils.clamp(100 - scores.overall * 0.18 - Math.max(0, y - 5) * 3.5, 0, 100)), borderColor: '#167040', borderWidth: 2, borderDash: [6, 3], tension: .4, pointRadius: 0, fill: false }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { font: { size: 11 }, color: '#6a6560' } } },
        scales: {
          y: { min: 0, max: 100, ticks: { color: '#9a9490', font: { size: 11 } } },
          x: { ticks: { maxTicksLimit: 8, color: '#9a9490', font: { size: 11 } } }
        }
      }
    });
  },

  /* ── What-If Comparison ── */
  drawWhatIf(canvasId, current, simulated) {
    this.destroy(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    this.instances[canvasId] = new Chart(ctx.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Current Score', 'Simulated Score'],
        datasets: [{
          data: [current, simulated],
          backgroundColor: ['rgba(176,46,46,.75)', 'rgba(22,112,64,.75)'],
          borderRadius: 8,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { min: 0, max: 100, ticks: { color: '#9a9490' } },
          x: { ticks: { color: '#9a9490' } }
        },
        animation: { duration: 600 }
      }
    });
  },

  /* ── History Trend ── */
  drawTrend(canvasId, entries) {
    this.destroy(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    this.instances[canvasId] = new Chart(ctx.getContext('2d'), {
      type: 'line',
      data: {
        labels: entries.map(e => Utils.fmtDate(e.date)),
        datasets: [{
          label: 'Overall Risk Score',
          data: entries.map(e => e.overall),
          borderColor: '#2b567f',
          backgroundColor: 'rgba(43,86,127,.1)',
          borderWidth: 2.5,
          tension: .35,
          fill: true,
          pointBackgroundColor: '#2b567f',
          pointRadius: 5,
          pointHoverRadius: 7,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { min: 0, max: 100, ticks: { color: '#9a9490' }, grid: { color: 'rgba(0,0,0,.05)' } },
          x: { ticks: { color: '#9a9490' } }
        }
      }
    });
  }
};
