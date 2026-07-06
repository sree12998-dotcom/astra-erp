/* ===========================================================
   ASTRA — production.js

   TODO: once backend/api/production.py exists, replace the
   MOCK_* constants below with calls to AstraAPI.get(...).
   Render functions operate on plain arrays/objects, so that
   swap is the only change needed.
   =========================================================== */

AstraAuth.requireAuth();
AstraApp.highlightActiveNav('production');
AstraApp.renderUserBadge();

document.getElementById('logout-btn').addEventListener('click', () => AstraAuth.logout());

const esc = AstraApp.escapeHTML;

// Header title is static markup on this page (see <header> in production.html); AstraApp.renderUserBadge() above already fills the
// header avatar and sidebar footer avatar with initials.


/* ---------- Toast notifications ---------- */

const toastIcons = {
  success: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>',
  info: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/></svg>',
  warning: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>'
};

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `prod-toast ${type}`;
  toast.innerHTML = `<span class="prod-toast-icon">${toastIcons[type]}</span><span>${esc(message)}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

document.getElementById('btn-create-order').addEventListener('click', () => {
  showToast('Create Production Order form opens once the order builder is wired to the backend.', 'info');
});
document.getElementById('btn-start-batch').addEventListener('click', () => {
  showToast('Start Batch will move the selected order into Running status.', 'info');
});
document.getElementById('btn-complete-batch').addEventListener('click', () => {
  showToast('Complete Batch will move the selected order into Completed status.', 'info');
});
document.getElementById('btn-record-production').addEventListener('click', () => {
  showToast('Record Production opens a quick-entry form for packets produced.', 'info');
});

/* ---------- Mock data ---------- */

const PRODUCTS = ['Amla Powder', 'Moringa Powder', 'Beetroot Powder', 'Turmeric Powder', 'Ashwagandha Powder'];
const MACHINES = ['Mixer-01', 'Dryer-02', 'Pulverizer-03', 'Packaging Line-01'];

const KPI_DATA = {
  todayProduction: '1,860 pkts',
  activeBatches: 4,
  efficiency: '91%',
  pendingOrders: 6
};

const PRODUCTION_INSIGHTS = [
  {
    priority: 'high', category: 'Machine Idle Alert',
    text: 'Pulverizer-03 has been idle for 2 hours 40 minutes during a scheduled production window.',
    action: 'Reassign Batch PB-0705-C or investigate downtime cause.',
    confidence: '90% confidence'
  },
  {
    priority: 'high', category: 'Material Shortage',
    text: 'Moringa Powder raw stock will be insufficient to complete PO-1042 by its planned end time.',
    action: 'Expedite pending Moringa purchase from Gujarat Organics Co.',
    confidence: '87% confidence'
  },
  {
    priority: 'medium', category: 'Yield Improvement',
    text: 'Batch AML-0714-A yielded 96.4%, above the 92% average for Amla Powder runs on Mixer-01.',
    action: 'Review Mixer-01 settings as the new baseline for Amla batches.',
    confidence: '82% confidence'
  },
  {
    priority: 'medium', category: 'Production Delay',
    text: 'PO-1039 (Beetroot Powder) is running 45 minutes behind its planned end time.',
    action: 'Notify supervisor Anita Rao and adjust downstream dispatch schedule.',
    confidence: '85% confidence'
  },
  {
    priority: 'low', category: 'Capacity Optimization',
    text: 'Packaging Line-01 is running at 64% utilization this week, below its 80% target.',
    action: 'Shift one more batch per day onto Packaging Line-01.',
    confidence: '76% confidence'
  },
  {
    priority: 'medium', category: 'Batch Completion Prediction',
    text: 'Batch TUR-0701-B is projected to complete 30 minutes ahead of schedule at current pace.',
    action: 'Pre-book dispatch slot for early completion.',
    confidence: '79% confidence'
  }
];

const PRODUCTION_ORDERS = [
  {
    po: 'PO-1042', batch: 'AML-0714-A', product: 'Amla Powder', recipe: 'BOM-AML-01',
    qtyPlanned: 168, qtyProduced: 168, machine: 'Mixer-01', supervisor: 'Anita Rao',
    start: '2026-06-24 08:00', end: '2026-06-24 14:20', status: 'completed'
  },
  {
    po: 'PO-1043', batch: 'BEET-0628-A', product: 'Beetroot Powder', recipe: 'BOM-BEET-01',
    qtyPlanned: 120, qtyProduced: 96, machine: 'Dryer-02', supervisor: 'Anita Rao',
    start: '2026-06-29 09:00', end: '—', status: 'running'
  },
  {
    po: 'PO-1044', batch: 'MOR-0630-A', product: 'Moringa Powder', recipe: 'BOM-MOR-01',
    qtyPlanned: 140, qtyProduced: 0, machine: 'Pulverizer-03', supervisor: 'Vikram Nair',
    start: '—', end: '—', status: 'planned'
  },
  {
    po: 'PO-1045', batch: 'TUR-0701-B', product: 'Turmeric Powder', recipe: 'BOM-TUR-01',
    qtyPlanned: 200, qtyProduced: 142, machine: 'Packaging Line-01', supervisor: 'Vikram Nair',
    start: '2026-07-01 07:30', end: '—', status: 'running'
  },
  {
    po: 'PO-1046', batch: 'ASH-0702-A', product: 'Ashwagandha Powder', recipe: 'BOM-ASH-01',
    qtyPlanned: 90, qtyProduced: 0, machine: 'Mixer-01', supervisor: 'Anita Rao',
    start: '—', end: '—', status: 'draft'
  },
  {
    po: 'PO-1039', batch: 'BEET-0621-A', product: 'Beetroot Powder', recipe: 'BOM-BEET-01',
    qtyPlanned: 110, qtyProduced: 40, machine: 'Dryer-02', supervisor: 'Vikram Nair',
    start: '2026-06-21 08:00', end: '—', status: 'paused'
  },
  {
    po: 'PO-1030', batch: 'AML-0610-A', product: 'Amla Powder', recipe: 'BOM-AML-01',
    qtyPlanned: 150, qtyProduced: 0, machine: 'Mixer-01', supervisor: 'Anita Rao',
    start: '2026-06-10 08:00', end: '—', status: 'cancelled'
  }
];

const BATCH_TRACKING = [
  {
    batch: 'AML-0714-A', stage: 'Dispatch Ready', rawUsedKg: 44, finishedPackets: 168,
    yield: 96.4, quality: 'pass', progress: 100
  },
  {
    batch: 'BEET-0628-A', stage: 'Drying', rawUsedKg: 26, finishedPackets: 96,
    yield: 88.1, quality: 'pending', progress: 68
  },
  {
    batch: 'TUR-0701-B', stage: 'Packaging', rawUsedKg: 52, finishedPackets: 142,
    yield: 93.7, quality: 'pass', progress: 74
  },
  {
    batch: 'MOR-0630-A', stage: 'Queued', rawUsedKg: 0, finishedPackets: 0,
    yield: 0, quality: 'pending', progress: 0
  },
  {
    batch: 'BEET-0621-A', stage: 'Paused — Mixing', rawUsedKg: 12, finishedPackets: 40,
    yield: 74.2, quality: 'fail', progress: 32
  },
  {
    batch: 'ASH-0702-A', stage: 'Not Started', rawUsedKg: 0, finishedPackets: 0,
    yield: 0, quality: 'pending', progress: 0
  }
];

const MACHINE_STATUS = [
  { name: 'Mixer-01', status: 'running', runningTime: '4h 20m', utilization: 82, temperature: '38°C', operator: 'Anita Rao' },
  { name: 'Dryer-02', status: 'running', runningTime: '6h 05m', utilization: 76, temperature: '62°C', operator: 'Anita Rao' },
  { name: 'Pulverizer-03', status: 'idle', runningTime: '0h 00m', utilization: 12, temperature: '29°C', operator: 'Vikram Nair' },
  { name: 'Packaging Line-01', status: 'running', runningTime: '3h 45m', utilization: 64, temperature: '27°C', operator: 'Vikram Nair' }
];

const RECIPES = [
  { recipe: 'BOM-AML-01', ingredient: 'Amla Powder (raw)', qty: 0.26, unit: 'kg', cost: 108, yield: '96%', version: 'v2.1' },
  { recipe: 'BOM-AML-01', ingredient: 'Packaging Film 250g', qty: 1, unit: 'pc', cost: 4, yield: '—', version: 'v2.1' },
  { recipe: 'BOM-BEET-01', ingredient: 'Beetroot Powder (raw)', qty: 0.27, unit: 'kg', cost: 95, yield: '88%', version: 'v1.4' },
  { recipe: 'BOM-BEET-01', ingredient: 'Packaging Film 250g', qty: 1, unit: 'pc', cost: 4, yield: '—', version: 'v1.4' },
  { recipe: 'BOM-MOR-01', ingredient: 'Moringa Powder (raw)', qty: 0.28, unit: 'kg', cost: 120, yield: '90%', version: 'v1.2' },
  { recipe: 'BOM-TUR-01', ingredient: 'Turmeric Powder (raw)', qty: 0.26, unit: 'kg', cost: 88, yield: '94%', version: 'v1.0' },
  { recipe: 'BOM-ASH-01', ingredient: 'Ashwagandha Powder (raw)', qty: 0.27, unit: 'kg', cost: 140, yield: '91%', version: 'v1.0' }
];

const ANALYTICS = {
  dailyOutput: '1,860 pkts',
  weeklyOutput: '11,240 pkts',
  monthlyOutput: '42,680 pkts',
  utilization: '69%',
  yield: '90.8%',
  downtime: '3h 12m',
  cost: '\u20B91,84,300'
};

const QUALITY_CONTROL = {
  passed: 312,
  rejected: 14,
  pending: 26,
  avgScore: '94.2',
  defectRate: '2.1%'
};

const ACTIVITY = [
  { time: '10:12 AM', action: 'Batch TUR-0701-B moved to Packaging stage', user: 'Vikram Nair', status: 'in-progress' },
  { time: '9:40 AM', action: 'Quality Approved for batch AML-0714-A', user: 'Anita Rao', status: 'completed' },
  { time: '8:55 AM', action: 'Machine Assigned — Dryer-02 to Batch BEET-0628-A', user: 'Anita Rao', status: 'completed' },
  { time: '8:00 AM', action: 'Production Started for Batch TUR-0701-B', user: 'Vikram Nair', status: 'completed' },
  { time: 'Yesterday', action: 'Finished Goods Added — 168 packets Amla Powder', user: 'Anita Rao', status: 'completed' },
  { time: 'Yesterday', action: 'Batch Created — MOR-0630-A queued for Pulverizer-03', user: 'Vikram Nair', status: 'completed' }
];

/* ---------- Render: KPIs ---------- */

function renderKpis() {
  document.getElementById('kpi-today-production').textContent = KPI_DATA.todayProduction;
  document.getElementById('kpi-active-batches').textContent = KPI_DATA.activeBatches;
  document.getElementById('kpi-efficiency').textContent = KPI_DATA.efficiency;
  document.getElementById('kpi-pending-orders').textContent = KPI_DATA.pendingOrders;
}

/* ---------- Render: Intelligence ---------- */

function renderInsights(items) {
  const container = document.getElementById('production-insights');
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

/* ---------- Render: Production Orders table ---------- */

const ordersTbody = document.getElementById('orders-tbody');
const ordersEmptyState = document.getElementById('orders-empty-state');
const orderSearch = document.getElementById('order-search');
const filterProduct = document.getElementById('filter-product');
const filterOrderStatus = document.getElementById('filter-order-status');

function populateProductFilter() {
  filterProduct.innerHTML = '<option value="">All Products</option>' +
    PRODUCTS.map((p) => `<option value="${esc(p)}">${esc(p)}</option>`).join('');
}

function getFilteredOrders() {
  const query = orderSearch.value.trim().toLowerCase();
  const product = filterProduct.value;
  const status = filterOrderStatus.value;

  return PRODUCTION_ORDERS.filter((o) => {
    const matchesQuery = !query ||
      o.po.toLowerCase().includes(query) ||
      o.batch.toLowerCase().includes(query) ||
      o.product.toLowerCase().includes(query) ||
      o.supervisor.toLowerCase().includes(query);
    const matchesProduct = !product || o.product === product;
    const matchesStatus = !status || o.status === status;
    return matchesQuery && matchesProduct && matchesStatus;
  });
}

const statusLabel = {
  draft: 'Draft', planned: 'Planned', running: 'Running',
  paused: 'Paused', completed: 'Completed', cancelled: 'Cancelled'
};

function renderOrdersTable() {
  const orders = getFilteredOrders();
  ordersEmptyState.classList.toggle('hidden', orders.length > 0);

  ordersTbody.innerHTML = orders.map((o) => `
    <tr>
      <td class="mono text-dim">${esc(o.po)}</td>
      <td class="mono text-dim">${esc(o.batch)}</td>
      <td>${esc(o.product)}</td>
      <td class="mono">${esc(o.recipe)}</td>
      <td class="mono">${esc(o.qtyPlanned)}</td>
      <td class="mono">${esc(o.qtyProduced)}</td>
      <td>${esc(o.machine)}</td>
      <td>${esc(o.supervisor)}</td>
      <td class="mono text-dim">${esc(o.start)}</td>
      <td class="mono text-dim">${esc(o.end)}</td>
      <td><span class="prod-status-pill ${o.status}">${esc(statusLabel[o.status])}</span></td>
      <td>
        <div class="prod-row-actions">
          <button class="prod-icon-btn" title="View" aria-label="View order">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
          <button class="prod-icon-btn" title="Edit" aria-label="Edit order">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="prod-icon-btn" title="Pause" aria-label="Pause order">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          </button>
          <button class="prod-icon-btn" title="Complete" aria-label="Complete order">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
          </button>
          <button class="prod-icon-btn" title="Print" aria-label="Print order">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

orderSearch.addEventListener('input', renderOrdersTable);
filterProduct.addEventListener('change', renderOrdersTable);
filterOrderStatus.addEventListener('change', renderOrdersTable);

/* ---------- Render: Batch Tracking cards ---------- */

function renderBatchTracking(batches) {
  const container = document.getElementById('batch-tracking-grid');
  const qualityLabel = { pass: 'Pass', pending: 'Pending', fail: 'Fail' };
  container.innerHTML = batches.map((b) => `
    <div class="prod-batch-card">
      <div class="prod-batch-head">
        <span class="prod-batch-id mono">${esc(b.batch)}</span>
        <span class="prod-quality-badge ${b.quality}">${esc(qualityLabel[b.quality])}</span>
      </div>
      <div class="prod-batch-stage">${esc(b.stage)}</div>
      <div class="prod-batch-row"><span>Raw Material Consumed</span><span class="mono">${esc(b.rawUsedKg)} kg</span></div>
      <div class="prod-batch-row"><span>Finished Goods Produced</span><span class="mono">${esc(b.finishedPackets)} pkts</span></div>
      <div class="prod-batch-row"><span>Yield</span><span class="mono">${esc(b.yield)}%</span></div>
      <div class="mc-progress-track"><div class="mc-progress-fill" style="width:${b.progress}%"></div></div>
      <div class="mc-op-percent">${esc(b.progress)}%</div>
    </div>
  `).join('');
}

/* ---------- Render: Machine Status cards ---------- */

function renderMachineStatus(machines) {
  const container = document.getElementById('machine-status-grid');
  const statusText = { running: 'Running', idle: 'Idle', maintenance: 'Maintenance', offline: 'Offline' };
  container.innerHTML = machines.map((m) => `
    <div class="prod-machine-card">
      <div class="prod-machine-head">
        <span class="prod-machine-name">${esc(m.name)}</span>
        <span class="prod-machine-status ${m.status}">${esc(statusText[m.status])}</span>
      </div>
      <div class="prod-machine-row"><span>Running Time</span><span class="mono">${esc(m.runningTime)}</span></div>
      <div class="prod-machine-row"><span>Utilization</span><span class="mono">${esc(m.utilization)}%</span></div>
      <div class="prod-machine-row"><span>Temperature</span><span class="mono">${esc(m.temperature)}</span></div>
      <div class="prod-machine-row"><span>Operator</span><span>${esc(m.operator)}</span></div>
      <div class="mc-progress-track"><div class="mc-progress-fill" style="width:${m.utilization}%"></div></div>
    </div>
  `).join('');
}

/* ---------- Render: Recipe (BOM) table ---------- */

function renderRecipeTable(rows) {
  const tbody = document.getElementById('recipe-tbody');
  tbody.innerHTML = rows.map((r) => `
    <tr>
      <td class="mono text-dim">${esc(r.recipe)}</td>
      <td>${esc(r.ingredient)}</td>
      <td class="mono">${esc(r.qty)}</td>
      <td>${esc(r.unit)}</td>
      <td class="mono">\u20B9${esc(r.cost)}</td>
      <td class="mono">${esc(r.yield)}</td>
      <td class="mono text-dim">${esc(r.version)}</td>
    </tr>
  `).join('');
}

/* ---------- Render: Analytics + Quality Control ---------- */

function renderAnalytics(data) {
  document.getElementById('analytics-daily-output').textContent = data.dailyOutput;
  document.getElementById('analytics-weekly-output').textContent = data.weeklyOutput;
  document.getElementById('analytics-monthly-output').textContent = data.monthlyOutput;
  document.getElementById('analytics-utilization').textContent = data.utilization;
  document.getElementById('analytics-yield').textContent = data.yield;
  document.getElementById('analytics-downtime').textContent = data.downtime;
  document.getElementById('analytics-cost').textContent = data.cost;
}

function renderQualityControl(data) {
  document.getElementById('qc-passed').textContent = data.passed;
  document.getElementById('qc-rejected').textContent = data.rejected;
  document.getElementById('qc-pending').textContent = data.pending;
  document.getElementById('qc-avg-score').textContent = data.avgScore;
  document.getElementById('qc-defect-rate').textContent = data.defectRate;
}

/* ---------- Render: Recent Activity timeline ---------- */

function renderActivity(events) {
  const icons = {
    completed: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>',
    'in-progress': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>'
  };
  const container = document.getElementById('production-activity');
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

/* ---------- Init ---------- */

renderKpis();
renderInsights(PRODUCTION_INSIGHTS);
populateProductFilter();
renderOrdersTable();
renderBatchTracking(BATCH_TRACKING);
renderMachineStatus(MACHINE_STATUS);
renderRecipeTable(RECIPES);
renderAnalytics(ANALYTICS);
renderQualityControl(QUALITY_CONTROL);
renderActivity(ACTIVITY);
