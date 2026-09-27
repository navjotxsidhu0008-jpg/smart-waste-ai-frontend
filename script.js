const CATEGORY_COLORS = {
  Plastic: '#3b82f6',
  Paper: '#0ea5e9',
  Metal: '#f59e0b',
  Glass: '#06b6d4',
  Organic: '#10b981',
  'General Waste': '#64748b'
};

const SAMPLE_RULES = [
  { category: 'Plastic', icon: '♻️', bin: 'Plastic Bin', note: 'Recycling bin' },
  { category: 'Paper', icon: '📄', bin: 'Paper Bin', note: 'Paper recycling' },
  { category: 'Metal', icon: '🥫', bin: 'Metal Bin', note: 'Metal recovery' },
  { category: 'Glass', icon: '🍾', bin: 'Glass Bin', note: 'Glass sorting' },
  { category: 'Organic', icon: '🌱', bin: 'Organic Bin', note: 'Compost stream' },
  { category: 'General Waste', icon: '🗑️', bin: 'General Waste', note: 'Residual waste' }
];

const state = {
  total: 128,
  today: 43,
  detections: [
    { category: 'Plastic', confidence: 94.2, bin: 'Plastic Bin' },
    { category: 'Paper', confidence: 89.6, bin: 'Paper Bin' },
    { category: 'Metal', confidence: 91.4, bin: 'Metal Bin' },
    { category: 'Organic', confidence: 92.1, bin: 'Organic Bin' }
  ]
};

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function renderRules() {
  const container = document.getElementById('bin-rules');
  if (!container) return;

  container.innerHTML = SAMPLE_RULES.map((rule) => `
    <article class="rule-card">
      <div class="rule-header">
        <div class="rule-title">
          <span class="rule-icon">${rule.icon}</span>
          <span>${rule.category}</span>
        </div>
        <span class="rule-badge" style="background:${hexToSoft(rule.category)}; color:${CATEGORY_COLORS[rule.category] || '#0f172a'};">${rule.note}</span>
      </div>
      <p><strong>Recommended bin:</strong> ${rule.bin}</p>
    </article>
  `).join('');
}

function hexToSoft(category) {
  const color = CATEGORY_COLORS[category] || '#64748b';
  return color + '20';
}

function renderHistory() {
  const body = document.getElementById('history-body');
  if (!body) return;

  body.innerHTML = state.detections.map((item) => `
    <tr>
      <td>${item.category}</td>
      <td>${item.confidence.toFixed(1)}%</td>
      <td>${item.bin}</td>
    </tr>
  `).join('');
}

async function loadStats() {
  try {
    const response = await fetch('/api/stats');
    if (!response.ok) throw new Error('Stats API unavailable');
    const data = await response.json();

    const total = Number(data.total_detections ?? state.total);
    const today = Number(data.today_detections ?? state.today);
    const keys = Object.keys(data.category_counts || {});
    const topCategory = keys.length ? keys.reduce((a, b) => (data.category_counts[a] > data.category_counts[b] ? a : b)) : 'None yet';

    setText('stat-total', String(total));
    setText('stat-today', String(today));
    setText('stat-top', topCategory === 'None yet' ? 'None yet' : topCategory);
    setText('stat-recyclable', `${Number(data.recyclable_share_pct ?? 0).toFixed(1)}%`);

    state.total = total;
    state.today = today;
  } catch (error) {
    console.warn('Using demo stats fallback', error);
    setText('stat-total', String(state.total));
    setText('stat-today', String(state.today));
    setText('stat-top', 'Plastic');
    setText('stat-recyclable', '84.6%');
  }
}

async function runPrediction() {
  try {
    const response = await fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: SAMPLE_RULES[Math.floor(Math.random() * SAMPLE_RULES.length)].category,
        confidence: (78 + Math.random() * 22).toFixed(1)
      })
    });

    if (!response.ok) throw new Error('Prediction failed');
    const data = await response.json();

    setText('result-category', data.waste_type || 'Plastic');
    setText('result-confidence', `${Number(data.confidence || 0).toFixed(1)}%`);
    setText('result-bin', data.recommended_bin || 'Plastic Bin');

    state.detections.unshift({
      category: data.waste_type || 'Plastic',
      confidence: Number(data.confidence || 0),
      bin: data.recommended_bin || 'Plastic Bin'
    });
    state.detections = state.detections.slice(0, 6);
    renderHistory();
  } catch (error) {
    const category = SAMPLE_RULES[Math.floor(Math.random() * SAMPLE_RULES.length)];
    const confidence = (80 + Math.random() * 18).toFixed(1);

    setText('result-category', category.category);
    setText('result-confidence', `${confidence}%`);
    setText('result-bin', category.bin);

    state.detections.unshift({
      category: category.category,
      confidence: Number(confidence),
      bin: category.bin
    });
    state.detections = state.detections.slice(0, 6);
    renderHistory();
  }
}

async function resetStats() {
  state.detections = [];
  setText('result-category', 'Waiting...');
  setText('result-confidence', '0%');
  setText('result-bin', '-');
  renderHistory();
}

document.addEventListener('DOMContentLoaded', () => {
  renderRules();
  renderHistory();
  loadStats();

  const predictButton = document.getElementById('predict-button');
  if (predictButton) predictButton.addEventListener('click', runPrediction);

  const resetButton = document.getElementById('reset-button');
  if (resetButton) resetButton.addEventListener('click', resetStats);
});
