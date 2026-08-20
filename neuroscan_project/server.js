/* ═══════════════════════════════════════════════════════════════
   NeuroScan AI — Server

   Two jobs:
     1. Serve the static frontend (index.html, css/, js/, assets/).
     2. Proxy Claude API calls so the Anthropic API key never has to
        live in browser-shipped code. The old approach (pasting the
        key into js/config.js) sends it to every visitor's browser,
        where it's trivially readable via view-source or devtools.

   The frontend now POSTs to /api/claude with just { system, messages }.
   This server attaches the real API key, the model, and a max_tokens
   cap, then forwards the request — and forwards Anthropic's response
   back unchanged, so existing frontend response-parsing code doesn't
   need to change.
═══════════════════════════════════════════════════════════════ */

require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.ANTHROPIC_API_KEY || '';
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6';
const MAX_TOKENS = Number(process.env.ANTHROPIC_MAX_TOKENS || 1000);
// Optional shared "site password" — if set, callers must send it as the
// x-app-key header. Protects your Anthropic bill if you deploy this
// somewhere public without wiring up real user accounts.
const APP_ACCESS_CODE = process.env.APP_ACCESS_CODE || '';
// Comma-separated list of origins allowed to call /api/claude from a
// *different* origin than this server (e.g. testing the frontend via
// VS Code Live Server while this runs on :3000). Same-origin requests
// (the normal case: this server serves the frontend too) don't need this.
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',').map((s) => s.trim()).filter(Boolean);

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '256kb' }));

if (ALLOWED_ORIGINS.length) {
  app.use('/api', cors({ origin: ALLOWED_ORIGINS }));
}

// Serve the static app itself
app.use(express.static(path.join(__dirname), {
  index: 'index.html',
  extensions: ['html'],
}));

// ---------------------------------------------------------------- limits --
// Generous enough for normal use (one assessment fires ~4 AI calls at
// once, plus chatbot messages), tight enough to blunt casual abuse.
const claudeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 40,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many AI requests from this address. Please wait a few minutes and try again.' },
});

function checkAccessCode(req, res, next) {
  if (!APP_ACCESS_CODE) return next(); // gate disabled
  if (req.get('x-app-key') === APP_ACCESS_CODE) return next();
  return res.status(401).json({ error: 'Missing or incorrect access code.' });
}

// ------------------------------------------------------------- /api/claude --
app.post('/api/claude', claudeLimiter, checkAccessCode, async (req, res) => {
  if (!API_KEY) {
    return res.status(503).json({
      error: 'Server has no ANTHROPIC_API_KEY configured. Copy .env.example to .env and add one.',
    });
  }

  const { system, messages } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: '"messages" must be a non-empty array.' });
  }
  if (messages.length > 40) {
    return res.status(400).json({ error: 'Conversation too long.' });
  }
  for (const m of messages) {
    if (!m || typeof m.content !== 'string' || !['user', 'assistant'].includes(m.role)) {
      return res.status(400).json({ error: 'Each message needs a valid role and string content.' });
    }
    if (m.content.length > 12000) {
      return res.status(400).json({ error: 'A message is too long.' });
    }
  }

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        // Only forward well-formed, size-checked messages/system — never
        // trust the client for model or max_tokens (that's how you get an
        // unexpectedly large bill).
        ...(typeof system === 'string' && system.length <= 6000 ? { system } : {}),
        messages,
      }),
    });

    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    console.error('Claude proxy error:', err);
    res.status(502).json({ error: 'Could not reach the Claude API.' });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, aiConfigured: Boolean(API_KEY) });
});

app.listen(PORT, () => {
  console.log(`NeuroScan AI running at http://localhost:${PORT}`);
  if (!API_KEY) {
    console.warn('⚠ ANTHROPIC_API_KEY not set — AI features will return a 503. See .env.example.');
  }
  if (!APP_ACCESS_CODE) {
    console.warn('⚠ APP_ACCESS_CODE not set — /api/claude is open to anyone who can reach this server.');
  }
});
