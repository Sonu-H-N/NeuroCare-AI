/* ═══════════════════════════════════════════
   NeuroScan AI — Configuration
   AI calls go through this app's own /api/claude endpoint (see server.js)
   so the real Anthropic API key stays server-side. Run `npm start` and
   set ANTHROPIC_API_KEY in .env — see .env.example.
═══════════════════════════════════════════ */

const CONFIG = {
  // ── API Settings ──
  // Relative path to this app's own backend proxy — NOT api.anthropic.com
  // directly. See server.js. If you're serving the frontend from a
  // different origin than the backend, set an absolute URL here instead.
  API_URL: '/api/claude',
  // Optional: only needed if you set APP_ACCESS_CODE in the server's .env.
  // Prompted for once and cached in localStorage (see Utils.getAccessCode).
  ACCESS_CODE_STORAGE_KEY: 'neuroscan_access_code',

  // ── App Settings ──
  APP_NAME: 'NeuroScan AI',
  APP_VERSION: '2.1',
  MAX_HISTORY_ENTRIES: 20,
  HISTORY_KEY: 'neuroscan_history_v2',

  // ── Risk Tier Thresholds ──
  RISK_LOW: 35,
  RISK_MODERATE: 65,

  // ── Domain Weights (must sum to 1.00) ──
  WEIGHTS: {
    genetic:   0.22,
    cognitive: 0.22,
    biomarker: 0.18,
    medical:   0.16,
    lifestyle: 0.14,
    age:       0.05,
    screening: 0.03,
  },

  // ── Chart Colours ──
  COLORS: {
    accent:  '#2b567f',
    danger:  '#b02e2e',
    warn:    '#d97706',
    success: '#167040',
    purple:  '#5b3f9a',
    teal:    '#0f7070',
    grey:    '#9a9490',
  }
};
