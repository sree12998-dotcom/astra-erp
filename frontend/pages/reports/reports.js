/* ===========================================================
   ASTRA — reports.js

   TODO: once backend/api/reports.py exists, replace the MOCK_*
   constants below with calls to AstraAPI.get(...).
   =========================================================== */

AstraAuth.requireAuth();
AstraApp.highlightActiveNav('reports');
AstraApp.renderUserBadge();

document.getElementById('logout-btn').addEventListener('click', () => AstraAuth.logout());

const esc = AstraApp.escapeHTML;

// Header title is static markup on this page (see <header> in reports.html); AstraApp.renderUserBadge() above already fills the
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
  toast.className = `rep-toast ${type}`;
  toast.innerHTML = `<span class="rep-toast-icon">${toastIcons[type]}</span><span>${esc(message)}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

document.getElementById('btn-generate-pnl').addEventListener('click', () => {
  showToast('P&L report generation will be available once reporting is wired to the backend.', 'info');
});
document.getElementById('btn-export-sales').addEventListener('click', () => {
  showToast('Sales report export will be available once reporting is wired to the backend.', 'info');
});
document.getElementById('btn-export-inventory').addEventListener('click', () => {
  showToast('Inventory report export will be available once reporting is wired to the backend.', 'info');
});
document.getElementById('btn-schedule-report').addEventListener('click', () => {
  showToast('Scheduled reports will be available once reporting is wired to the backend.', 'info');
});

/* ---------- Mock data ---------- */

const KPI_DATA = {
  revenue: '\u20B92,03,400',
  grossProfit: '\u20B984,500',
  totalOrders: 368,
  receivables: '\u20B912,300'
};

const REPORT_INSIGHTS = [
  {
    priority: 'medium', category: 'Cost Trend',
    text: 'Raw material cost as a share of revenue rose from 31% to 34% over the past two months.',
    action: 'Review Gujarat Organics Co. pricing against alternate suppliers.',
    confidence: '82% confidence'
  },
  {
    priority: 'high', category: 'Anomaly Detected',
    text: 'Packaging cost per unit spiked 18% in the last week compared to the monthly average.',
    action: 'Check for wastage or a rate change on 250g pouch film.',
    confidence: '88% confidence'
  },
  {
    priority: 'low', category: 'Forecast',
    text: 'At current growth rate, monthly revenue is projected to cross \u20B92,30,000 next month.',
    action: 'No action needed — on track for planned expansion.',
    confidence: '75% confidence'
  }
];

const CATEGORIES = [
  { key: 'sales', name: 'Sales Report', desc: 'Orders, channels, and revenue by product and customer.', meta: 'Last generated: 2 days ago' },
  { key: 'inventory', name: 'Inventory Report', desc: 'Stock levels, reorder alerts, and expiry risk by SKU.', meta: 'Last generated: 5 days ago' },
  { key: 'production', name: 'Production Report', desc: 'Batch output, yield, and machine utilization.', meta: 'Last generated: 1 day ago' },
  { key: 'purchase', name: 'Purchase Report', desc: 'Supplier spend, GRNs, and pending invoices.', meta: 'Last generated: 3 days ago' },
  { key: 'financial', name: 'Financial Report', desc: 'P&L, cost breakdown, and margin trends.', meta: 'Last generated: Today' },
  { key: 'customer', name: 'Customer Report', desc: 'Segment performance and outstanding receivables.', meta: 'Last generated: 4 days ago' }
];

const PNL_ROWS = [
  { month: 'July 2026 (MTD)', revenue: 203400, cogs: 118900, opex: 0, },
  { month: 'June 2026', revenue: 612800, cogs: 361200, opex: 84500 },
  { month: 'May 2026', revenue: 578200, cogs: 342100, opex: 79800 },
  { month: 'April 2026', revenue: 541900, cogs: 328400, opex: 76200 }
];

const ACTIVITY = [
  { time: 'Today, 9:10 AM', action: 'Financial Report generated for June 2026', user: 'You', status: 'completed' },
  { time: 'Yesterday', action: 'Production Report generated for the past 7 days', user: 'You', status: 'completed' },
  { time: '3 days ago', action: 'Purchase Report generated for Gujarat Organics Co.', user: 'You', status: 'completed' },
  { time: '5 days ago', action: 'Inventory Report generated — 3 low-stock SKUs flagged', user: 'You', status: 'completed' }
];

/* ---------- Render: KPIs ---------- */

function renderKpis() {
  document.getElementById('kpi-revenue').textContent = KPI_DATA.revenue;
  document.getElementById('kpi-gross-profit').textContent = KPI_DATA.grossProfit;
  document.getElementById('kpi-total-orders').textContent = KPI_DATA.totalOrders;
  document.getElementById('kpi-receivables').textContent = KPI_DATA.receivables;
}

/* ---------- Render: Intelligence ---------- */

function renderInsights(items) {
  const container = document.getElementById('report-insights');
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

/* ---------- Render: Report Categories ---------- */

function renderCategories(categories) {
  const container = document.getElementById('category-grid');
  container.innerHTML = categories.map((c) => `
    <div class="rep-category-card" data-key="${esc(c.key)}">
      <span class="rep-category-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
      </span>
      <span class="rep-category-name">${esc(c.name)}</span>
      <span class="rep-category-desc">${esc(c.desc)}</span>
      <span class="rep-category-meta">${esc(c.meta)}</span>
    </div>
  `).join('');

  container.querySelectorAll('.rep-category-card').forEach((card) => {
    card.addEventListener('click', () => {
      const cat = categories.find((c) => c.key === card.dataset.key);
      showToast(`${cat.name} generation will be available once reporting is wired to the backend.`, 'info');
    });
  });
}

/* ---------- Render: P&L table ---------- */

function renderPnl(rows) {
  const tbody = document.getElementById('pnl-tbody');
  tbody.innerHTML = rows.map((r) => {
    const grossProfit = r.revenue - r.cogs;
    const netProfit = grossProfit - r.opex;
    const margin = ((netProfit / r.revenue) * 100).toFixed(1);
    return `
      <tr>
        <td>${esc(r.month)}</td>
        <td class="mono">${AstraApp.formatCurrency(r.revenue)}</td>
        <td class="mono">${AstraApp.formatCurrency(r.cogs)}</td>
        <td class="mono text-green">${AstraApp.formatCurrency(grossProfit)}</td>
        <td class="mono">${AstraApp.formatCurrency(r.opex)}</td>
        <td class="mono text-green">${AstraApp.formatCurrency(netProfit)}</td>
        <td class="mono">${esc(margin)}%</td>
      </tr>
    `;
  }).join('');
}

/* ---------- Render: Recent Activity ---------- */

function renderActivity(events) {
  const icons = {
    completed: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>'
  };
  const container = document.getElementById('report-activity');
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
renderInsights(REPORT_INSIGHTS);
renderCategories(CATEGORIES);
renderPnl(PNL_ROWS);
renderActivity(ACTIVITY);
