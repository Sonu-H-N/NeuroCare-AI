/* ═══════════════════════════════════════════
   NeuroScan AI — Configuration
   ⚠️  Replace ANTHROPIC_API_KEY with your key
       or use via Claude.ai where it auto-injects
═══════════════════════════════════════════ */

const CONFIG = {
  // ── API Settings ──
  // When running via Claude.ai artifact, the key is handled automatically.
  // For standalone use: replace with your actual Anthropic API key.
  API_KEY: '',  // e.g. 'sk-ant-api03-...'
  API_URL: 'https://api.anthropic.com/v1/messages',
  MODEL: 'claude-sonnet-4-20250514',
  MAX_TOKENS: 1000,

  // ── App Settings ──
  APP_NAME: 'NeuroScan AI',
  APP_VERSION: '2.0',
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
