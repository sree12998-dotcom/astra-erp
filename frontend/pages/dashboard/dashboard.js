/* ===========================================================
   ASTRA — dashboard.js (Mission Control)

   TODO: once backend/api/reports.py exists, replace MOCK_DATA
   with: const data = await AstraAPI.get('/reports/dashboard');
   Render functions are written to accept any object shaped like
   MOCK_DATA, so that's the only line that needs to change.
   =========================================================== */

AstraAuth.requireAuth();
AstraApp.highlightActiveNav('dashboard');
AstraApp.renderUserBadge();

document.getElementById('logout-btn').addEventListener('click', () => AstraAuth.logout());

const esc = AstraApp.escapeHTML;

const RING_CIRCUMFERENCE = 326.7;

const MOCK_DATA = {
  health: {
    score: 82,
    status: 'Strong',
    revenueTrend: '+14.2%',
    productionEfficiency: '91%',
    orderFulfilment: '96%'
  },
  kpis: {
    revenue: 203400,
    packetsSold: 1142,
    activeBatches: 3,
    expiringPackets: 18
  },
  factoryOps: {
    rawMaterial: { status: 'Stock healthy', percent: 78 },
    production:  { status: '2 batches running', percent: 64 },
    packaging:   { status: 'On schedule', percent: 55 },
    dispatch:    { status: '12 orders pending', percent: 40 }
  },
  inventory: {
    amla:     { stock: '42 kg', packets: 168, reorder: '25 kg', risk: 'Low',    riskLevel: 'ok' },
    moringa:  { stock: '9 kg',  packets: 36,  reorder: '20 kg', risk: 'High',   riskLevel: 'risk' },
    beetroot: { stock: '18 kg', packets: 96,  reorder: '20 kg', risk: 'Watch',  riskLevel: 'warn' }
  },
  intelligence: [
    {
      priority: 'high', category: 'Inventory',
      text: 'Moringa stock will reach reorder level in 6 days.',
      action: 'Purchase 50 KG from Gujarat Organics Co.',
      confidence: '92% confidence'
    },
    {
      priority: 'medium', category: 'Sales',
      text: 'E-commerce channel margin is running 11% above retail this month.',
      action: 'Shift ad spend toward e-commerce.',
      confidence: '81% confidence'
    },
    {
      priority: 'medium', category: 'Production',
      text: '18 packets from batch BEET-0628-A cross 60-day shelf life on 12 Aug.',
      action: 'Prioritise this batch in outbound dispatch.',
      confidence: '88% confidence'
    }
  ],
  activity: [
    { time: '9:42 AM', action: 'Batch AML-0714-A marked completed', user: 'Production Manager', status: 'completed' },
    { time: '8:15 AM', action: '40 packets dispatched to GreenLeaf Retail, Belgaum', user: 'Sales Executive', status: 'completed' },
    { time: 'Yesterday', action: 'Stock receipt logged — 50kg Moringa Powder', user: 'You', status: 'completed' },
    { time: 'Yesterday', action: 'Batch BEET-0628-A packaging started', user: 'Production Manager', status: 'in-progress' }
  ],
  batches: [
    { id: 'AML-0714-A',  product: 'Amla Powder',     packed: 168, planned: 168, status: 'completed' },
    { id: 'BEET-0628-A', product: 'Beetroot Powder', packed: 96,  planned: 120, status: 'in-progress' },
    { id: 'MOR-0630-A',  product: 'Moringa Powder',  packed: 0,   planned: 140, status: 'queued' }
  ]
};

/* Small, dependency-free count-up used for numeric KPI/health values.
   Purely cosmetic — the final text always matches the exact target
   string the original render functions would have set. */
function animateCount(el, target, { duration = 900, format = (n) => Math.round(n).toString(), delay = 0 } = {}) {
  if (!el) return;
  const start = 0;
  const startTime = performance.now() + delay;
  function tick(now) {
    const elapsed = now - startTime;
    if (elapsed < 0) { requestAnimationFrame(tick); return; }
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = format(start + (target - start) * eased);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function renderHeader() {
  const user = AstraAuth.currentUser();
  const firstName = user && user.name ? user.name.split(' ')[0] : 'there';
  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
  document.getElementById('greeting-text').textContent = `Good ${timeOfDay}, ${firstName} \u{1F44B}`;

  const now = new Date();
  document.getElementById('current-date').textContent = now.toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long'
  });
  document.getElementById('current-time').textContent = now.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit'
  });

  const initials = (user && user.name ? user.name : '??').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

  const avatar = document.getElementById('user-avatar');
  if (avatar) avatar.textContent = initials;

  // Sidebar footer avatar mirrors the header avatar; app.js owns the
  // name/role text via [data-user-name] / [data-user-role].
  const sidebarAvatar = document.getElementById('sidebar-user-avatar');
  if (sidebarAvatar) sidebarAvatar.textContent = initials;
}

function renderHealth(health) {
  document.getElementById('health-status').textContent = health.status;
  document.getElementById('revenue-trend-value').textContent = health.revenueTrend;
  document.getElementById('production-efficiency-value').textContent = health.productionEfficiency;
  document.getElementById('order-fulfilment-value').textContent = health.orderFulfilment;

  const scoreEl = document.getElementById('health-score');
  animateCount(scoreEl, health.score, { duration: 1100, format: (n) => `${Math.round(n)}%` });

  const offset = RING_CIRCUMFERENCE * (1 - health.score / 100);
  const ring = document.getElementById('health-ring-progress');
  requestAnimationFrame(() => { ring.style.strokeDashoffset = offset; });
}

function renderKpis(kpis) {
  animateCount(document.getElementById('kpi-revenue'), kpis.revenue, {
    duration: 1000, format: (n) => AstraApp.formatCurrency(Math.round(n))
  });
  animateCount(document.getElementById('kpi-packets'), kpis.packetsSold, {
    duration: 1000, delay: 60, format: (n) => Math.round(n).toLocaleString('en-IN')
  });
  document.getElementById('kpi-batches').textContent = kpis.activeBatches;
  document.getElementById('kpi-expiring').textContent = `${kpis.expiringPackets} packets`;
}

function renderFactoryOps(ops) {
  const map = {
    rawMaterial: 'op-raw',
    production: 'op-production',
    packaging: 'op-packaging',
    dispatch: 'op-dispatch'
  };
  Object.keys(map).forEach((key) => {
    const prefix = map[key];
    const data = ops[key];
    document.getElementById(`${prefix}-status`).textContent = data.status;
    document.getElementById(`${prefix}-percent`).textContent = `${data.percent}%`;
    const fill = document.getElementById(`${prefix}-progress`);
    requestAnimationFrame(() => { fill.style.width = `${data.percent}%`; });
  });
}

function renderInventory(inventory) {
  const riskDotClass = { ok: '', warn: 'warn', risk: 'risk' };
  Object.keys(inventory).forEach((key) => {
    const item = inventory[key];
    document.getElementById(`inv-${key}-stock`).textContent = item.stock;
    document.getElementById(`inv-${key}-packets`).textContent = item.packets;
    document.getElementById(`inv-${key}-reorder`).textContent = item.reorder;
    document.getElementById(`inv-${key}-expiry`).textContent = item.risk;
    document.getElementById(`inv-${key}-dot`).className = `mc-inventory-dot ${riskDotClass[item.riskLevel]}`;
  });
}

function renderIntelligence(items) {
  const container = document.getElementById('ai-insights');
  container.innerHTML = items.map((item) => `
    <div class="mc-intel-item">
      <div class="mc-intel-top">
        <span class="mc-intel-priority ${item.priority}">${esc(item.priority.toUpperCase())} PRIORITY</span>
        <span class="mc-intel-category">${esc(item.category)}</span>
      </div>
      <div class="mc-intel-text">${esc(item.text)}</div>
      <div class="mc-intel-action">Suggested action: <strong>${esc(item.action)}</strong></div>
      <div class="mc-intel-confidence">${esc(item.confidence)}</div>
    </div>
  `).join('');
}

function renderActivity(events) {
  const icons = {
    completed: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>',
    'in-progress': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>'
  };
  const container = document.getElementById('recent-activity');
  container.innerHTML = events.map((ev) => `
    <div class="mc-timeline-item">
      <div class="mc-timeline-icon">${icons[ev.status]}</div>
      <div class="mc-timeline-body">
        <span class="mc-timeline-action">${esc(ev.action)}</span>
        <span class="mc-timeline-meta"><span>${esc(ev.time)}</span><span>·</span><span>${esc(ev.user)}</span></span>
      </div>
    </div>
  `).join('');
}

function renderBatches(batches) {
  const statusLabel = { completed: 'Completed', 'in-progress': 'In Progress', queued: 'Queued' };
  const tbody = document.querySelector('#batches-table tbody');
  tbody.innerHTML = batches.map((b) => `
    <tr>
      <td class="mono text-dim">${esc(b.id)}</td>
      <td>${esc(b.product)}</td>
      <td class="mono">${esc(b.packed)} / ${esc(b.planned)} pkts</td>
      <td><span class="pill pill-${b.status}">${esc(statusLabel[b.status])}</span></td>
    </tr>
  `).join('');
}

renderHeader();
renderHealth(MOCK_DATA.health);
renderKpis(MOCK_DATA.kpis);
renderFactoryOps(MOCK_DATA.factoryOps);
renderInventory(MOCK_DATA.inventory);
renderIntelligence(MOCK_DATA.intelligence);
renderActivity(MOCK_DATA.activity);
renderBatches(MOCK_DATA.batches);

setInterval(() => {
  document.getElementById('current-time').textContent = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit'
  });
}, 30000);
