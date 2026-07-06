/* ===========================================================
   ASTRA — sales.js

   TODO: once backend/api/sales.py exists, replace the MOCK_*
   constants below with calls to AstraAPI.get(...). Render
   functions operate on plain arrays/objects, so that swap is
   the only change needed.
   =========================================================== */

AstraAuth.requireAuth();
AstraApp.highlightActiveNav('sales');
AstraApp.renderUserBadge();

document.getElementById('logout-btn').addEventListener('click', () => AstraAuth.logout());

const esc = AstraApp.escapeHTML;

// Header title is static markup on this page (see <header> in sales.html); AstraApp.renderUserBadge() above already fills the
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
  toast.className = `sal-toast ${type}`;
  toast.innerHTML = `<span class="sal-toast-icon">${toastIcons[type]}</span><span>${esc(message)}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

document.getElementById('btn-new-order').addEventListener('click', () => {
  showToast('New Sales Order form opens once order writes are wired to the backend.', 'info');
});
document.getElementById('btn-record-payment').addEventListener('click', () => {
  showToast('Record Payment opens once finance is wired to the backend.', 'info');
});
document.getElementById('btn-generate-invoice').addEventListener('click', () => {
  showToast('Invoice generation will be available once billing is wired to the backend.', 'info');
});
document.getElementById('btn-export-report').addEventListener('click', () => {
  showToast('Sales report export will be available once reporting is wired to the backend.', 'info');
});

/* ---------- Mock data ---------- */

const KPI_DATA = {
  todaySales: '\u20B918,400',
  ordersMonth: 368,
  aov: '\u20B9556',
  conversion: '3.2%'
};

const SALES_INSIGHTS = [
  {
    priority: 'high', category: 'Revenue Opportunity',
    text: 'E-commerce channel margin is running 11% above retail this month.',
    action: 'Shift ad spend toward e-commerce for Amla and Moringa SKUs.',
    confidence: '86% confidence'
  },
  {
    priority: 'medium', category: 'Customer Risk',
    text: 'GreenLeaf Retail, Belgaum has not placed an order in 21 days versus their usual 10-day cycle.',
    action: 'Have the sales exec check in before they switch suppliers.',
    confidence: '79% confidence'
  },
  {
    priority: 'medium', category: 'Upsell Opportunity',
    text: 'NatureCart Store consistently orders Beetroot Powder only — never Amla or Moringa.',
    action: 'Offer a bundled discount to introduce the other two SKUs.',
    confidence: '74% confidence'
  },
  {
    priority: 'low', category: 'Payment Follow-up',
    text: '3 orders remain unpaid more than 15 days past their due date.',
    action: 'Send payment reminders to Suresh K. and 2 other direct consumers.',
    confidence: '90% confidence'
  }
];

const SALES_ORDERS = [
  { id: 'SO-3081', customer: 'Meera Rao', channel: 'direct', product: 'Amla Powder', qty: 3, amount: 750, payment: 'paid', status: 'delivered', date: '2026-06-24' },
  { id: 'SO-3082', customer: 'GreenLeaf Retail, Belgaum', channel: 'retailer', product: 'Amla Powder', qty: 40, amount: 10000, payment: 'paid', status: 'delivered', date: '2026-06-24' },
  { id: 'SO-3083', customer: 'Suresh K.', channel: 'direct', product: 'Beetroot Powder', qty: 2, amount: 500, payment: 'unpaid', status: 'shipped', date: '2026-06-29' },
  { id: 'SO-3084', customer: 'NatureCart Store', channel: 'ecommerce', product: 'Beetroot Powder', qty: 25, amount: 6250, payment: 'paid', status: 'delivered', date: '2026-06-29' },
  { id: 'SO-3085', customer: 'Anita Verma', channel: 'ecommerce', product: 'Turmeric Powder', qty: 4, amount: 1000, payment: 'paid', status: 'confirmed', date: '2026-07-01' },
  { id: 'SO-3086', customer: 'Wellness Basket Retail', channel: 'retailer', product: 'Ashwagandha Powder', qty: 30, amount: 7500, payment: 'unpaid', status: 'pending', date: '2026-07-02' },
  { id: 'SO-3087', customer: 'Rohan Kapoor', channel: 'direct', product: 'Moringa Powder', qty: 1, amount: 250, payment: 'unpaid', status: 'cancelled', date: '2026-06-20' }
];

const statusLabel = { pending: 'Pending', confirmed: 'Confirmed', shipped: 'Shipped', delivered: 'Delivered', cancelled: 'Cancelled' };
const paymentLabel = { paid: 'Paid', unpaid: 'Unpaid' };
const channelLabel = { ecommerce: 'E-commerce', retailer: 'Retailer', direct: 'Direct Consumer' };

const CHANNELS = [
  { key: 'ecommerce', name: 'E-commerce', orders: 214, revenue: 53500, aov: 250 },
  { key: 'retailer', name: 'Retailer', orders: 96, revenue: 24000, aov: 250 },
  { key: 'direct', name: 'Direct Consumer', orders: 58, revenue: 14500, aov: 250 }
];

const TOP_CUSTOMERS = [
  { name: 'GreenLeaf Retail, Belgaum', channel: 'Retailer', value: '\u20B91,84,000' },
  { name: 'NatureCart Store', channel: 'E-commerce', value: '\u20B91,26,500' },
  { name: 'Wellness Basket Retail', channel: 'Retailer', value: '\u20B991,200' },
  { name: 'Meera Rao', channel: 'Direct Consumer', value: '\u20B98,750' },
  { name: 'Anita Verma', channel: 'E-commerce', value: '\u20B96,400' }
];

const ACTIVITY = [
  { time: '10:20 AM', action: 'Invoice generated for SO-3085', user: 'You', status: 'completed' },
  { time: '9:05 AM', action: 'Payment received for SO-3082 (\u20B910,000)', user: 'Sales Executive', status: 'completed' },
  { time: 'Yesterday', action: 'New order SO-3086 placed by Wellness Basket Retail', user: 'Sales Executive', status: 'in-progress' },
  { time: 'Yesterday', action: 'SO-3087 cancelled by customer request', user: 'You', status: 'completed' }
];

/* ---------- Render: KPIs ---------- */

function renderKpis() {
  document.getElementById('kpi-today-sales').textContent = KPI_DATA.todaySales;
  document.getElementById('kpi-orders-month').textContent = KPI_DATA.ordersMonth;
  document.getElementById('kpi-aov').textContent = KPI_DATA.aov;
  document.getElementById('kpi-conversion').textContent = KPI_DATA.conversion;
}

/* ---------- Render: Intelligence ---------- */

function renderInsights(items) {
  const container = document.getElementById('sales-insights');
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

/* ---------- Render: Sales Orders table ---------- */

const ordersTbody = document.getElementById('orders-tbody');
const ordersEmptyState = document.getElementById('orders-empty-state');
const orderSearch = document.getElementById('order-search');
const filterChannel = document.getElementById('filter-channel');
const filterOrderStatus = document.getElementById('filter-order-status');

function getFilteredOrders() {
  const query = orderSearch.value.trim().toLowerCase();
  const channel = filterChannel.value;
  const status = filterOrderStatus.value;

  return SALES_ORDERS.filter((o) => {
    const matchesQuery = !query ||
      o.id.toLowerCase().includes(query) ||
      o.customer.toLowerCase().includes(query) ||
      o.product.toLowerCase().includes(query);
    const matchesChannel = !channel || o.channel === channel;
    const matchesStatus = !status || o.status === status;
    return matchesQuery && matchesChannel && matchesStatus;
  });
}

function renderOrdersTable() {
  const orders = getFilteredOrders();
  ordersEmptyState.classList.toggle('hidden', orders.length > 0);

  ordersTbody.innerHTML = orders.map((o) => `
    <tr>
      <td class="mono text-dim">${esc(o.id)}</td>
      <td>${esc(o.customer)}</td>
      <td>${esc(channelLabel[o.channel])}</td>
      <td>${esc(o.product)}</td>
      <td class="mono">${esc(o.qty)}</td>
      <td class="mono">${AstraApp.formatCurrency(o.amount)}</td>
      <td><span class="sal-status-pill ${o.payment}">${esc(paymentLabel[o.payment])}</span></td>
      <td><span class="sal-status-pill ${o.status}">${esc(statusLabel[o.status])}</span></td>
      <td class="mono text-dim">${esc(o.date)}</td>
      <td>
        <div class="sal-row-actions">
          <button class="sal-icon-btn" title="View" aria-label="View order">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
          <button class="sal-icon-btn" title="Invoice" aria-label="Generate invoice">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

orderSearch.addEventListener('input', renderOrdersTable);
filterChannel.addEventListener('change', renderOrdersTable);
filterOrderStatus.addEventListener('change', renderOrdersTable);

/* ---------- Render: Channel Performance ---------- */

function renderChannels(channels) {
  const container = document.getElementById('channel-grid');
  container.innerHTML = channels.map((c) => `
    <div class="sal-channel-card">
      <div class="sal-channel-head">
        <span class="sal-channel-name">${esc(c.name)}</span>
      </div>
      <div class="sal-channel-row"><span>Orders</span><span class="mono">${esc(c.orders)}</span></div>
      <div class="sal-channel-row"><span>Revenue</span><span class="mono">${AstraApp.formatCurrency(c.revenue)}</span></div>
      <div class="sal-channel-row"><span>Avg Order Value</span><span class="mono">${AstraApp.formatCurrency(c.aov)}</span></div>
    </div>
  `).join('');
}

/* ---------- Render: Top Customers ---------- */

function renderTopCustomers(customers) {
  const container = document.getElementById('top-customers');
  container.innerHTML = customers.map((c, i) => `
    <div class="sal-top-row">
      <div class="sal-top-name">
        <span class="sal-top-rank">${i + 1}</span>
        <span>${esc(c.name)}</span>
        <span class="sal-top-meta">${esc(c.channel)}</span>
      </div>
      <span class="mono">${esc(c.value)}</span>
    </div>
  `).join('');
}

/* ---------- Render: Recent Activity ---------- */

function renderActivity(events) {
  const icons = {
    completed: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>',
    'in-progress': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>'
  };
  const container = document.getElementById('sales-activity');
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
renderInsights(SALES_INSIGHTS);
renderOrdersTable();
renderChannels(CHANNELS);
renderTopCustomers(TOP_CUSTOMERS);
renderActivity(ACTIVITY);
