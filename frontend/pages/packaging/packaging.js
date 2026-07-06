/* ===========================================================
   ASTRA — packaging.js

   TODO: once backend/api/packaging.py exists, replace the
   MOCK_* constants below with calls to AstraAPI.get(...).
   Render functions operate on plain arrays/objects, so that
   swap is the only change needed.
   =========================================================== */

AstraAuth.requireAuth();
AstraApp.highlightActiveNav('packaging');
AstraApp.renderUserBadge();

document.getElementById('logout-btn').addEventListener('click', () => AstraAuth.logout());

const esc = AstraApp.escapeHTML;

// Header title is static markup on this page (see <header> in packaging.html); AstraApp.renderUserBadge() above already fills the
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
  toast.className = `pkg-toast ${type}`;
  toast.innerHTML = `<span class="pkg-toast-icon">${toastIcons[type]}</span><span>${esc(message)}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

document.getElementById('btn-start-packaging').addEventListener('click', () => {
  showToast('Start Packaging will move the selected order into Running status.', 'info');
});
document.getElementById('btn-print-labels').addEventListener('click', () => {
  showToast('Print Labels sends the selected batch to the label printer queue.', 'info');
});
document.getElementById('btn-complete-packaging').addEventListener('click', () => {
  showToast('Complete Packaging will move the selected order into Completed status.', 'info');
});
document.getElementById('btn-generate-report').addEventListener('click', () => {
  showToast('Packaging Report will be generated once reporting is wired to the backend.', 'info');
});

/* ---------- Mock data ---------- */

const PRODUCTS = ['Amla Powder', 'Moringa Powder', 'Beetroot Powder', 'Turmeric Powder', 'Ashwagandha Powder'];
const PACKAGE_SIZES = ['100g', '250g', '500g', '1kg'];
const PACKAGING_LINES = ['Line-01', 'Line-02', 'Line-03'];

const KPI_DATA = {
  completedToday: '2,140 units',
  activeJobs: 5,
  pendingOrders: 7,
  efficiency: '88%'
};

const PACKAGING_INSIGHTS = [
  {
    priority: 'high', category: 'Packaging Material Running Low',
    text: '250g pouch film stock will run out in 2 days at current Line-01 and Line-02 consumption.',
    action: 'Reorder pouch film from packaging materials supplier this week.',
    confidence: '91% confidence'
  },
  {
    priority: 'high', category: 'Label Mismatch Detected',
    text: 'Batch BEET-0628-A labels printed with the previous GST rate — 40 units affected.',
    action: 'Reprint labels for the affected batch before dispatch.',
    confidence: '95% confidence'
  },
  {
    priority: 'medium', category: 'Packaging Delay Alert',
    text: 'PKG-2041 on Line-02 is running 25 minutes behind its planned completion time.',
    action: 'Check operator assignment and machine speed on Line-02.',
    confidence: '83% confidence'
  },
  {
    priority: 'low', category: 'Machine Utilization Recommendation',
    text: 'Line-03 utilization has averaged 58% over the past week, below its 75% target.',
    action: 'Shift one additional packaging order per day onto Line-03.',
    confidence: '77% confidence'
  },
  {
    priority: 'medium', category: 'Dispatch Readiness',
    text: '3 packaging orders are quality-approved and ready to move into the dispatch queue.',
    action: 'Confirm vehicle assignment for PKG-2038, PKG-2039, PKG-2040.',
    confidence: '89% confidence'
  },
  {
    priority: 'low', category: 'Packaging Optimization',
    text: 'Switching Turmeric Powder from 100g to 250g batches on Line-01 could cut changeover time by ~12%.',
    action: 'Trial 250g-first sequencing on Line-01 next week.',
    confidence: '72% confidence'
  }
];

const PACKAGING_ORDERS = [
  {
    id: 'PKG-2038', batch: 'AML-0714-A', product: 'Amla Powder', size: '250g', units: 168,
    line: 'Line-01', operator: 'Suresh Malhotra', start: '2026-06-24 14:30', end: '2026-06-24 16:10',
    quality: 'pass', dispatch: 'ready'
  },
  {
    id: 'PKG-2039', batch: 'BEET-0628-A', product: 'Beetroot Powder', size: '250g', units: 96,
    line: 'Line-02', operator: 'Farida Sheikh', start: '2026-06-29 10:00', end: '—',
    quality: 'hold', dispatch: 'qc-hold'
  },
  {
    id: 'PKG-2040', batch: 'TUR-0701-B', product: 'Turmeric Powder', size: '100g', units: 300,
    line: 'Line-01', operator: 'Suresh Malhotra', start: '2026-07-01 09:15', end: '2026-07-01 11:40',
    quality: 'pass', dispatch: 'ready'
  },
  {
    id: 'PKG-2041', batch: 'ASH-0702-A', product: 'Ashwagandha Powder', size: '500g', units: 60,
    line: 'Line-02', operator: 'Farida Sheikh', start: '2026-07-02 08:30', end: '—',
    quality: 'pending', dispatch: 'running'
  },
  {
    id: 'PKG-2042', batch: 'MOR-0630-A', product: 'Moringa Powder', size: '250g', units: 140,
    line: 'Line-03', operator: 'Ramesh Gowda', start: '—', end: '—',
    quality: 'pending', dispatch: 'queued'
  },
  {
    id: 'PKG-2035', batch: 'BEET-0621-A', product: 'Beetroot Powder', size: '1kg', units: 25,
    line: 'Line-03', operator: 'Ramesh Gowda', start: '2026-06-21 09:00', end: '—',
    quality: 'pending', dispatch: 'paused'
  },
  {
    id: 'PKG-2030', batch: 'AML-0610-A', product: 'Amla Powder', size: '250g', units: 150,
    line: 'Line-01', operator: 'Suresh Malhotra', start: '2026-06-10 08:00', end: '2026-06-10 12:00',
    quality: 'pass', dispatch: 'completed'
  }
];

const qualityLabel = { pass: 'Passed', hold: 'QC Hold', pending: 'Pending' };
const dispatchLabel = {
  queued: 'Queued', running: 'Running', paused: 'Paused',
  completed: 'Completed', 'qc-hold': 'QC Hold', ready: 'Ready for Dispatch'
};

const LINE_STATUS = [
  { name: 'Line-01', product: 'Turmeric Powder (100g)', operator: 'Suresh Malhotra', efficiency: 92, runningTime: '5h 10m', status: 'running' },
  { name: 'Line-02', product: 'Ashwagandha Powder (500g)', operator: 'Farida Sheikh', efficiency: 74, runningTime: '3h 40m', status: 'running' },
  { name: 'Line-03', product: 'Moringa Powder (250g)', operator: 'Ramesh Gowda', efficiency: 0, runningTime: '0h 00m', status: 'idle' }
];

const LABEL_PRINTING = {
  printedToday: 618,
  pending: 84,
  barcodes: 618,
  qrcodes: 618,
  lastJob: 'PKG-2040 · 11:42 AM'
};

const INSPECTIONS = [
  { batch: 'AML-0714-A', product: 'Amla Powder', inspector: 'Neha Kulkarni', date: '2026-06-24', passed: 166, rejected: 2, remarks: 'Minor seal defects on 2 units.' },
  { batch: 'BEET-0628-A', product: 'Beetroot Powder', inspector: 'Neha Kulkarni', date: '2026-06-29', passed: 0, rejected: 0, remarks: 'On hold — label GST mismatch.' },
  { batch: 'TUR-0701-B', product: 'Turmeric Powder', inspector: 'Rohit Menon', date: '2026-07-01', passed: 296, rejected: 4, remarks: 'Weight variance within tolerance.' },
  { batch: 'AML-0610-A', product: 'Amla Powder', inspector: 'Neha Kulkarni', date: '2026-06-10', passed: 148, rejected: 2, remarks: 'Approved for dispatch.' }
];

const ANALYTICS = {
  dailyOutput: '2,140 units',
  efficiency: '88%',
  rejected: '8 units',
  cost: '\u20B942,600',
  utilization: '73%',
  trend: '+6.8%'
};

const DISPATCH_READY = {
  readyOrders: 3,
  awaitingTransport: 2,
  packedWeight: '612 kg',
  priority: 'High — PKG-2039',
  vehicle: 'KA-22-B 4417'
};

const ACTIVITY = [
  { time: '11:42 AM', action: 'Labels Printed for PKG-2040 (300 units)', user: 'Suresh Malhotra', status: 'completed' },
  { time: '10:55 AM', action: 'Quality Approved for PKG-2040', user: 'Rohit Menon', status: 'completed' },
  { time: '9:15 AM', action: 'Packaging Started for PKG-2041 on Line-02', user: 'Farida Sheikh', status: 'in-progress' },
  { time: '8:30 AM', action: 'Ready for Dispatch — PKG-2038 and PKG-2040', user: 'Neha Kulkarni', status: 'completed' },
  { time: 'Yesterday', action: 'Dispatch Queue Updated — vehicle KA-22-B 4417 assigned', user: 'You', status: 'completed' },
  { time: 'Yesterday', action: 'Packaging Completed — PKG-2035 paused for QC review', user: 'Ramesh Gowda', status: 'in-progress' }
];

/* ---------- Render: KPIs ---------- */

function renderKpis() {
  document.getElementById('kpi-completed-today').textContent = KPI_DATA.completedToday;
  document.getElementById('kpi-active-jobs').textContent = KPI_DATA.activeJobs;
  document.getElementById('kpi-pending-orders').textContent = KPI_DATA.pendingOrders;
  document.getElementById('kpi-efficiency').textContent = KPI_DATA.efficiency;
}

/* ---------- Render: Intelligence ---------- */

function renderInsights(items) {
  const container = document.getElementById('packaging-insights');
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

/* ---------- Render: Packaging Orders table ---------- */

const ordersTbody = document.getElementById('orders-tbody');
const ordersEmptyState = document.getElementById('orders-empty-state');
const orderSearch = document.getElementById('order-search');
const filterProduct = document.getElementById('filter-product');
const filterLine = document.getElementById('filter-line');
const filterOrderStatus = document.getElementById('filter-order-status');

function populateFilters() {
  filterProduct.innerHTML = '<option value="">All Products</option>' +
    PRODUCTS.map((p) => `<option value="${esc(p)}">${esc(p)}</option>`).join('');
  filterLine.innerHTML = '<option value="">All Lines</option>' +
    PACKAGING_LINES.map((l) => `<option value="${esc(l)}">${esc(l)}</option>`).join('');
}

function getFilteredOrders() {
  const query = orderSearch.value.trim().toLowerCase();
  const product = filterProduct.value;
  const line = filterLine.value;
  const status = filterOrderStatus.value;

  return PACKAGING_ORDERS.filter((o) => {
    const matchesQuery = !query ||
      o.id.toLowerCase().includes(query) ||
      o.batch.toLowerCase().includes(query) ||
      o.product.toLowerCase().includes(query) ||
      o.operator.toLowerCase().includes(query);
    const matchesProduct = !product || o.product === product;
    const matchesLine = !line || o.line === line;
    const matchesStatus = !status || o.dispatch === status;
    return matchesQuery && matchesProduct && matchesLine && matchesStatus;
  });
}

function renderOrdersTable() {
  const orders = getFilteredOrders();
  ordersEmptyState.classList.toggle('hidden', orders.length > 0);

  ordersTbody.innerHTML = orders.map((o) => `
    <tr>
      <td class="mono text-dim">${esc(o.id)}</td>
      <td class="mono text-dim">${esc(o.batch)}</td>
      <td>${esc(o.product)}</td>
      <td class="mono">${esc(o.size)}</td>
      <td class="mono">${esc(o.units)}</td>
      <td>${esc(o.line)}</td>
      <td>${esc(o.operator)}</td>
      <td class="mono text-dim">${esc(o.start)}</td>
      <td class="mono text-dim">${esc(o.end)}</td>
      <td><span class="pkg-status-pill ${o.quality === 'pass' ? 'completed' : o.quality === 'hold' ? 'qc-hold' : 'queued'}">${esc(qualityLabel[o.quality])}</span></td>
      <td><span class="pkg-status-pill ${o.dispatch}">${esc(dispatchLabel[o.dispatch])}</span></td>
      <td>
        <div class="pkg-row-actions">
          <button class="pkg-icon-btn" title="View" aria-label="View order">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
          <button class="pkg-icon-btn" title="Edit" aria-label="Edit order">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="pkg-icon-btn" title="Pause" aria-label="Pause order">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          </button>
          <button class="pkg-icon-btn" title="Complete" aria-label="Complete order">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
          </button>
          <button class="pkg-icon-btn" title="Print Labels" aria-label="Print labels">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

orderSearch.addEventListener('input', renderOrdersTable);
filterProduct.addEventListener('change', renderOrdersTable);
filterLine.addEventListener('change', renderOrdersTable);
filterOrderStatus.addEventListener('change', renderOrdersTable);

/* ---------- Render: Packaging Line Status ---------- */

function renderLineStatus(lines) {
  const container = document.getElementById('line-status-grid');
  const statusText = { running: 'Running', idle: 'Idle', paused: 'Paused' };
  container.innerHTML = lines.map((l) => `
    <div class="pkg-line-card">
      <div class="pkg-line-head">
        <span class="pkg-line-name">${esc(l.name)}</span>
        <span class="pkg-line-status ${l.status}">${esc(statusText[l.status])}</span>
      </div>
      <div class="pkg-line-row"><span>Current Product</span><span>${esc(l.product)}</span></div>
      <div class="pkg-line-row"><span>Operator</span><span>${esc(l.operator)}</span></div>
      <div class="pkg-line-row"><span>Efficiency</span><span class="mono">${esc(l.efficiency)}%</span></div>
      <div class="pkg-line-row"><span>Running Time</span><span class="mono">${esc(l.runningTime)}</span></div>
      <div class="mc-progress-track"><div class="mc-progress-fill" style="width:${l.efficiency}%"></div></div>
    </div>
  `).join('');
}

/* ---------- Render: Label Printing ---------- */

function renderLabelPrinting(data) {
  document.getElementById('label-printed-today').textContent = data.printedToday;
  document.getElementById('label-pending').textContent = data.pending;
  document.getElementById('label-barcodes').textContent = data.barcodes;
  document.getElementById('label-qrcodes').textContent = data.qrcodes;
  document.getElementById('label-last-job').textContent = data.lastJob;
}

/* ---------- Render: Quality Inspection table ---------- */

function renderInspectionTable(rows) {
  const tbody = document.getElementById('inspection-tbody');
  tbody.innerHTML = rows.map((r) => `
    <tr>
      <td class="mono text-dim">${esc(r.batch)}</td>
      <td>${esc(r.product)}</td>
      <td>${esc(r.inspector)}</td>
      <td class="mono text-dim">${esc(r.date)}</td>
      <td class="mono text-green">${esc(r.passed)}</td>
      <td class="mono ${r.rejected > 0 ? 'text-amber' : 'text-dim'}">${esc(r.rejected)}</td>
      <td>${esc(r.remarks)}</td>
      <td>
        <div class="pkg-row-actions">
          <button class="pkg-icon-btn" title="View" aria-label="View inspection">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

/* ---------- Render: Analytics ---------- */

function renderAnalytics(data) {
  document.getElementById('analytics-daily-output').textContent = data.dailyOutput;
  document.getElementById('analytics-efficiency').textContent = data.efficiency;
  document.getElementById('analytics-rejected').textContent = data.rejected;
  document.getElementById('analytics-cost').textContent = data.cost;
  document.getElementById('analytics-utilization').textContent = data.utilization;
  document.getElementById('analytics-trend').textContent = data.trend;
}

/* ---------- Render: Dispatch Ready ---------- */

function renderDispatchReady(data) {
  document.getElementById('dispatch-ready-orders').textContent = data.readyOrders;
  document.getElementById('dispatch-awaiting').textContent = data.awaitingTransport;
  document.getElementById('dispatch-weight').textContent = data.packedWeight;
  document.getElementById('dispatch-priority').textContent = data.priority;
  document.getElementById('dispatch-vehicle').textContent = data.vehicle;
}

/* ---------- Render: Recent Activity timeline ---------- */

function renderActivity(events) {
  const icons = {
    completed: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>',
    'in-progress': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>'
  };
  const container = document.getElementById('packaging-activity');
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
renderInsights(PACKAGING_INSIGHTS);
populateFilters();
renderOrdersTable();
renderLineStatus(LINE_STATUS);
renderLabelPrinting(LABEL_PRINTING);
renderInspectionTable(INSPECTIONS);
renderAnalytics(ANALYTICS);
renderDispatchReady(DISPATCH_READY);
renderActivity(ACTIVITY);
