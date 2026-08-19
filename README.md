# 🧠 NeuroScan AI — Alzheimer's Disease Risk Prediction System

### Final Year Project | Computer Science / Biomedical Informatics

---

## 📌 Project Overview

NeuroScan AI is an Alzheimer's disease early-detection and risk-stratification
web app. It runs a 25+ factor evidence-based scoring engine entirely in the
browser, and optionally calls Claude (Anthropic) for a clinical-style
narrative summary, staging, scientific references, and a personalised action
plan.

**Tech Stack:** HTML5 · CSS3 · Vanilla JavaScript · Chart.js · jsPDF ·
Node/Express (Claude API proxy)

---

## ⚠️ Disclaimer

This tool is for **educational and research purposes only**. It does not
constitute medical advice, diagnosis, or treatment. The risk scores are
population-based estimates and should not be used as a substitute for
clinical evaluation by a licensed neurologist or healthcare professional.

---

## ✨ Features

### 📋 8-Step Assessment Wizard
Demographics · Genetics (APOE4, family history, TBI, stroke) · Lifestyle ·
Medical comorbidities · Cognitive symptoms · Mini cognitive screening ·
Biomarkers (CSF, MRI, PET, MMSE, MoCA) · Review & submit

### 📊 8-Tab Results Dashboard
Overview (gauge/radar/donut/bar/population charts) · AI Analysis · Risk
Factors (25-factor breakdown + comparison table) · Action Plan · What-If
Simulator · Timeline · Ask AI (contextual chatbot) · Export (PDF/CSV/JSON/
print/clipboard/save-to-history)

### 🧮 Multi-Domain Scoring Engine
Weighted across genetic/hereditary (22%), cognitive symptoms (22%),
biomarkers & imaging (18%), medical comorbidities (16%), lifestyle (14%),
age (5%), and screening (3%) — see `js/scoring.js` and the About page for
the full clinical evidence base.

### Other Features
Dark mode · assessment history with a longitudinal trend chart (now shows a
▲/▼ delta against your previous assessment) · education page with FAQs and
clinical study tables.

---

## 🚀 How to Run

### Option 1 — Full app with AI features (recommended)

```bash
npm install
cp .env.example .env
# edit .env and set ANTHROPIC_API_KEY

npm start
# open http://localhost:3000
```

The API key lives in `.env` on the server and is never sent to the browser
— see [Security](#-security-architecture) below for why that matters.

### Option 2 — Scoring only, zero setup

Just open `index.html` directly in a browser. The assessment wizard, every
chart, PDF/CSV/JSON export, and history all work with no server. The AI
Analysis / Action Plan / Ask AI tabs will show a friendly "unavailable"
message instead of AI content, since there's no proxy to call.

### Option 3 — Docker

```bash
docker build -t neuroscan-ai .
docker run -p 3000:3000 -e ANTHROPIC_API_KEY=sk-ant-api03-... neuroscan-ai
```

---

## 🔐 Security architecture

The original design pasted a real Anthropic API key straight into
`js/config.js` — a static file served to every visitor's browser. Anyone
who opened dev tools or view-source could copy that key and run up your
Anthropic bill. (In practice, Anthropic's API also blocks unproxied
browser calls by default for exactly this reason, so this approach didn't
actually work even before the security problem.)

This version adds a small Node/Express server (`server.js`) that:

- Serves the static frontend, and
- Exposes `POST /api/claude`, which validates the request, attaches the
  real API key server-side, forwards it to Anthropic, and returns the
  response unchanged.

The browser never sees the key. If you deploy this somewhere public, also
set `APP_ACCESS_CODE` in `.env` — the frontend will prompt for it via the
🔑 button in the nav bar and remember it in `localStorage`, and the server
will reject `/api/claude` calls that don't include it. `/api/claude` is
also rate-limited (40 requests / 15 min per IP by default) to blunt casual
abuse even without an access code.

**Still not fully production-hardened**: there's no per-user auth, so
anyone with your access code (or an open deployment with no code set)
shares one Anthropic budget. Fine for a personal/demo deployment; add real
accounts before putting this in front of the general public.

---

## 📁 Project Structure

```
./
├── index.html          ← Main entry point
├── server.js            ← Node/Express static server + Claude API proxy
├── package.json / .env.example
├── Dockerfile
├── css/
│   ├── main.css
│   └── components.css
├── js/
│   ├── config.js        ← App configuration (no API key here anymore)
│   ├── utils.js          ← Shared utilities, incl. the /api/claude client
│   ├── scoring.js        ← Multi-domain risk scoring engine
│   ├── charts.js
│   ├── chatbot.js
│   ├── export.js
│   ├── history.js
│   ├── app.js
│   └── pages/
│       ├── home.js       ← 8-step assessment wizard
│       ├── results.js    ← Results dashboard (8 tabs)
│       ├── education.js
│       └── about.js
└── assets/
    └── favicon.svg
```

> Earlier versions of this repo nested everything under a
> `neuroscan_project/` subfolder while `index.html` sat one level up at the
> repo root — so opening `index.html` directly loaded no CSS/JS at all, and
> two script filenames (`export,js` with a comma, `result.js` singular vs.
> the `results.js` the page actually requested) didn't match what
> `index.html` loads. Both are fixed: everything now lives flat next to
> `index.html`, and the filenames match.

---

## 🔬 Clinical Evidence Base

See the **About** page in-app for the full reference table (Lancet
Commission 2024, Jack et al. 2013, FINGER Trial, MIND diet study, NIA-AA
ATN framework, APOE4 risk multipliers, lecanemab trial, SPRINT-MIND).

## 📊 Scoring Risk Tiers

| Score | Tier | Recommendation |
|-------|------|---------------|
| 0–34 | 🟢 Low Risk | Maintain healthy lifestyle, routine check-ups |
| 35–64 | 🟡 Moderate Risk | Clinical consultation recommended, lifestyle changes |
| 65–100 | 🔴 High Risk | Prompt neurological evaluation strongly advised |

---

*NeuroScan AI v2.1 · Chart.js · jsPDF · Claude (Anthropic)*
