# 🧠 NeuroScan AI — Alzheimer's Disease Risk Prediction System
### Final Year Project | Computer Science / Biomedical Informatics

---

## 📌 Project Overview

NeuroScan AI is a comprehensive, AI-powered Alzheimer's disease early detection and risk stratification web application. It integrates 25+ clinical biomarkers, validated cognitive screening instruments, and Claude AI (Anthropic) to deliver evidence-based dementia risk assessment with personalised preventive action plans.

**Type:** Final Year Project (FYP) — Single-page Web Application  
**Tech Stack:** HTML5 · CSS3 · Vanilla JavaScript · Chart.js · jsPDF · Claude AI API  
**No backend required** — runs entirely in the browser

---

## ✨ Features

### 📋 8-Step Assessment Wizard
| Step | Section | Inputs |
|------|---------|--------|
| 1 | Demographics | Age, sex, education, ethnicity, occupation |
| 2 | Genetics | APOE4 genotype, family history, TBI, stroke, mutations |
| 3 | Lifestyle | Exercise, diet, sleep, smoking, alcohol, stress, pollution |
| 4 | Medical | 13 comorbidities, BP, BMI, cholesterol, glucose, medications |
| 5 | Cognitive Symptoms | 10 symptom domains rated 0–10 |
| 6 | Mini Screening | 5-question adapted cognitive screening test |
| 7 | Biomarkers | CSF amyloid/tau, MRI, PET, MMSE, MoCA, NfL |
| 8 | Review & Submit | Summary + AI analysis trigger |

### 📊 8-Tab Results Dashboard
- **Overview** — Gauge, radar, donut, bar, and population comparison charts
- **AI Analysis** — Clinical summary, ATN staging, scientific references
- **Risk Factors** — 25 individual factor bars + comparison table + protective factors
- **Action Plan** — 8 personalised AI recommendations + 12-week roadmap
- **What-If Simulator** — Real-time risk score simulation with 5 lifestyle sliders
- **Timeline** — Disease progression stages + Jack 2013 biomarker trajectory chart
- **Ask AI** — Multi-turn chatbot with full patient context awareness
- **Export** — PDF, CSV, JSON, print, clipboard, save to history

### 🧮 Multi-Domain Scoring Engine
| Domain | Weight | Key Factors |
|--------|--------|-------------|
| Genetic & Hereditary | 22% | APOE4, family history, mutations, TBI |
| Cognitive Symptoms | 22% | 10 symptom domains, duration |
| Biomarkers & Imaging | 18% | CSF, PET, MRI, MMSE, MoCA, NfL |
| Medical Comorbidities | 16% | 13 conditions, BP, BMI, labs |
| Lifestyle Factors | 14% | Exercise, diet, sleep, stress |
| Age Factor | 5% | Exponential risk post-65 |
| Screening Score | 3% | Mini-cognitive test |

### Other Features
- 🌙 Dark mode (persisted in localStorage)
- 📋 Assessment history with longitudinal trend chart
- 📚 Education page with 8 FAQs + clinical study table + Lancet 2024 risk factor table
- ℹ️ About page with full methodology, file structure, references

---

## 🚀 How to Run

### Option 1 — Instant (No Setup)
```bash
# Simply open index.html in any browser
# Double-click index.html OR drag it into Chrome/Firefox
```
> All local scoring, charts, and export features work immediately.  
> AI features require an API key (see Option 2).

### Option 2 — With Full AI Features
1. Get your Anthropic API key from [console.anthropic.com](https://console.anthropic.com)
2. Open `js/config.js` in any text editor
3. Replace:
   ```javascript
   API_KEY: '',
   ```
   With:
   ```javascript
   API_KEY: 'sk-ant-api03-your-key-here',
   ```
4. Save and open `index.html` — all AI features are now enabled

### Option 3 — Local Web Server
```bash
# Python 3
python -m http.server 8080
# Open: http://localhost:8080

# Node.js
npx serve .
# Open: http://localhost:3000

# VS Code — Install "Live Server" extension → Right-click index.html → "Open with Live Server"
```

### Option 4 — Deploy Online (Free)
```bash
# GitHub Pages
git init && git add . && git commit -m "NeuroScan AI FYP"
git remote add origin https://github.com/yourusername/neuroscan.git
git push -u origin main
# → GitHub repo Settings → Pages → Deploy from main

# Netlify (fastest)
# Visit netlify.com/drop → drag-and-drop the project folder

# Vercel
npx vercel --prod
```

---

## 📁 Project Structure
```
neuroscan_project/
├── index.html              ← Main entry point
├── README.md               ← This file
├── css/
│   ├── main.css            ← Layout, CSS variables, base styles
│   └── components.css      ← UI components (cards, charts, chatbot, tables)
├── js/
│   ├── config.js           ← API key & app configuration ⚠️ Edit this
│   ├── utils.js            ← Shared utilities (DOM, API, toast, loading)
│   ├── scoring.js          ← Multi-domain risk scoring engine
│   ├── charts.js           ← Chart.js visualisation manager
│   ├── chatbot.js          ← AI chatbot with patient context injection
│   ├── export.js           ← PDF / CSV / JSON export module
│   ├── history.js          ← localStorage assessment history
│   ├── app.js              ← Main controller, routing, analysis runner
│   └── pages/
│       ├── home.js         ← 8-step wizard form + data collection
│       ├── results.js      ← Results dashboard (8 tabs, charts, AI)
│       ├── education.js    ← Learn page (FAQs, tables, evidence)
│       └── about.js        ← About, methodology, how to run
└── assets/
    └── favicon.svg         ← App icon
```

---

## 🔬 Clinical Evidence Base

| Reference | Finding | Used For |
|-----------|---------|----------|
| Livingston et al. Lancet 2024 | 14 modifiable risk factors, ~45% PAR | Lifestyle domain weights |
| Jack et al. Lancet Neurol. 2013 | Dynamic biomarker model | Trajectory chart model |
| FINGER Trial 2015 | Multi-domain lifestyle intervention | Exercise/diet weight basis |
| Morris et al. 2015 | MIND diet reduces AD risk 35–53% | Diet scoring |
| NIA-AA Guidelines 2018 | ATN framework for diagnosis | Biomarker staging |
| Farrer et al. JAMA 1997 | APOE4: 3× / 12× risk multipliers | Genetic scoring |
| van Dyck et al. NEJM 2023 | Lecanemab 27% slowing | Treatment info |
| SPRINT-MIND 2019 | BP control → less white matter damage | Medical domain |

---

## ⚠️ Disclaimer

This tool is for **educational and research purposes only**. It does not constitute medical advice, diagnosis, or treatment. The risk scores are population-based estimates and should not be used as a substitute for clinical evaluation by a licensed neurologist or healthcare professional.

---

## 🛠️ Requirements

| Requirement | Details |
|-------------|---------|
| Browser | Chrome 90+, Firefox 88+, Edge 90+, Safari 14+ |
| Internet | Required only for: Google Fonts, Chart.js CDN, jsPDF CDN, Claude AI API |
| API Key | Optional — local scoring works without it |
| Server | Not required — static files only |
| Node.js | Not required — no build step |

---

## 📊 Scoring Risk Tiers

| Score | Tier | Recommendation |
|-------|------|---------------|
| 0–34 | 🟢 Low Risk | Maintain healthy lifestyle, routine check-ups |
| 35–64 | 🟡 Moderate Risk | Clinical consultation recommended, lifestyle changes |
| 65–100 | 🔴 High Risk | Prompt neurological evaluation strongly advised |

---

*NeuroScan AI v2.0 — Powered by Claude AI (Anthropic) · Chart.js · jsPDF*
