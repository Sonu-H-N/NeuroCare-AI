/* ═══════════════════════════════════════════
   NeuroScan AI — AI Chatbot Module
═══════════════════════════════════════════ */

const Chatbot = {
  history: [],
  patientContext: '',

  init(patientData, scores) {
    const d = patientData;
    const s = scores;
    this.patientContext = `You are NeuroScan AI — a specialist neurologist assistant embedded in a clinical risk tool. You have full context of this patient's assessment. Be empathetic, clear, and evidence-based.

PATIENT PROFILE:
- Age: ${d.age}, Sex: ${d.sex}, Education: ${d.education}
- Overall Risk: ${s.overall}/100 (${Utils.tierLabel(s.overall)})
- Genetic: ${Math.round(s.genetic)}/100 | Lifestyle: ${Math.round(s.lifestyle)}/100 | Medical: ${Math.round(s.medical)}/100
- Cognitive: ${Math.round(s.cognitive)}/100 | Biomarker: ${Math.round(s.biomarker)}/100
- APOE4: ${d.apoe4} | Family History: ${d.fhist}
- Exercise: ${d.exercise} | Diet: ${d.diet} | Sleep: ${d.sleep}h (${d.sleepQ})
- Stress: ${d.stress}/10 | Smoking: ${d.smoking} | Social: ${d.social}
- Conditions: ${(d.conditions||[]).join(', ') || 'None reported'}
- MMSE: ${d.mmse}/30 | MoCA: ${d.moca}/30
- MRI: ${d.mri} | PET: ${d.pet} | Amyloid CSF: ${d.amyloid} | Tau: ${d.tau}
- Cognitive symptoms: Memory ${d.s_memory}/10, Executive ${d.s_exec}/10, Language ${d.s_lang}/10
- Notes: ${d.notes || 'None'}

Answer questions specifically about this patient's results. Keep responses concise (3–5 sentences unless more detail is clearly needed). Never diagnose — explain, educate, and advise on next steps.`;

    this.history = [];
    this.renderInitialMessage();
  },

  renderInitialMessage() {
    const msgs = document.getElementById('chatMessages');
    if (!msgs) return;
    msgs.innerHTML = `
      <div class="msg">
        <div class="msg-avatar ai">N</div>
        <div>
          <div class="msg-bubble">Hello! I'm your NeuroScan AI assistant. I have full context of your assessment results. You can ask me about your risk factors, what specific biomarker results mean, treatment options, or anything about Alzheimer's disease and prevention strategies.</div>
          <div class="msg-time">${new Date().toLocaleTimeString()}</div>
        </div>
      </div>`;
  },

  async send(message) {
    if (!message.trim()) return;
    const msgs = document.getElementById('chatMessages');
    if (!msgs) return;

    // User bubble
    msgs.innerHTML += `
      <div class="msg user">
        <div class="msg-avatar user">You</div>
        <div>
          <div class="msg-bubble">${this.escapeHtml(message)}</div>
          <div class="msg-time">${new Date().toLocaleTimeString()}</div>
        </div>
      </div>`;

    // Typing indicator
    const typingId = 'typing-' + Date.now();
    msgs.innerHTML += `
      <div class="msg" id="${typingId}">
        <div class="msg-avatar ai">N</div>
        <div><div class="msg-bubble"><div class="typing"><span></span><span></span><span></span></div></div></div>
      </div>`;
    msgs.scrollTop = msgs.scrollHeight;

    // Add to history
    this.history.push({ role: 'user', content: message });

    try {
      const allMessages = [
        { role: 'user', content: this.patientContext },
        { role: 'assistant', content: 'Understood. I have your full patient profile and assessment results. How can I help you?' },
        ...this.history
      ];

      const headers = { 'Content-Type': 'application/json' };
      if (CONFIG.API_KEY) {
        headers['x-api-key'] = CONFIG.API_KEY;
        headers['anthropic-version'] = '2023-06-01';
      }

      const resp = await fetch(CONFIG.API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ model: CONFIG.MODEL, max_tokens: CONFIG.MAX_TOKENS, messages: allMessages })
      });
      const data = await resp.json();
      const reply = data.content ? data.content.map(i => i.text || '').join('') : 'I apologise — I could not process that. Please check your API configuration.';
      this.history.push({ role: 'assistant', content: reply });

      document.getElementById(typingId)?.remove();
      msgs.innerHTML += `
        <div class="msg">
          <div class="msg-avatar ai">N</div>
          <div>
            <div class="msg-bubble">${reply.replace(/\n/g, '<br/>')}</div>
            <div class="msg-time">${new Date().toLocaleTimeString()}</div>
          </div>
        </div>`;
    } catch (e) {
      document.getElementById(typingId)?.remove();
      msgs.innerHTML += `
        <div class="msg">
          <div class="msg-avatar ai">N</div>
          <div><div class="msg-bubble" style="color:var(--danger)">Connection error. Please check API configuration.<br/><small>${e.message}</small></div></div>
        </div>`;
    }
    msgs.scrollTop = msgs.scrollHeight;
  },

  escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
};

// Global handlers
function sendChat() {
  const inp = document.getElementById('chatInput');
  if (!inp) return;
  const msg = inp.value.trim();
  if (!msg) return;
  inp.value = '';
  Chatbot.send(msg);
}

function sendQuick(msg) {
  Chatbot.send(msg);
}
