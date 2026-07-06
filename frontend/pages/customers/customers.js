/* ===========================================================
   ASTRA — customers.js

   TODO: once backend/api/customers.py exists, replace
   MOCK_CUSTOMERS with: await AstraAPI.get('/customers')
   and wire the Add Customer form to
   await AstraAPI.post('/customers', payload) on submit.
   =========================================================== */

AstraAuth.requireAuth();
AstraApp.highlightActiveNav('customers');
AstraApp.renderUserBadge();

document.getElementById('logout-btn').addEventListener('click', () => AstraAuth.logout());

const esc = AstraApp.escapeHTML;

// Header title is static markup on this page (see <header> in customers.html); AstraApp.renderUserBadge() above already fills the
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
  toast.className = `cust-toast ${type}`;
  toast.innerHTML = `<span class="cust-toast-icon">${toastIcons[type]}</span><span>${esc(message)}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

/* ---------- Mock data ---------- */

let MOCK_CUSTOMERS = [
  {
    id: 'CUST-001', name: 'GreenLeaf Retail, Belgaum', contact: 'Deepak Joshi', phone: '+91 98221 33445',
    email: 'deepak@greenleafretail.in', address: 'MG Road', city: 'Belgaum', channel: 'retailer',
    totalOrders: 42, outstanding: 0, status: 'active', notes: 'Long-standing retail partner, reliable payment cycle.',
    orders: [
      { date: '2026-06-24', desc: 'SO-3082 — 40 packets Amla Powder', amount: 10000 },
      { date: '2026-06-01', desc: 'SO-3050 — 35 packets Beetroot Powder', amount: 8750 }
    ]
  },
  {
    id: 'CUST-002', name: 'NatureCart Store', contact: 'Priya Nambiar', phone: '+91 99000 22110',
    email: 'priya@naturecart.in', address: 'Online — Bengaluru warehouse', city: 'Bengaluru', channel: 'ecommerce',
    totalOrders: 118, outstanding: 0, status: 'active', notes: 'High-frequency e-commerce buyer, mostly Beetroot Powder.',
    orders: [
      { date: '2026-06-29', desc: 'SO-3084 — 25 packets Beetroot Powder', amount: 6250 },
      { date: '2026-06-15', desc: 'SO-3070 — 20 packets Beetroot Powder', amount: 5000 }
    ]
  },
  {
    id: 'CUST-003', name: 'Wellness Basket Retail', contact: 'Farah Ali', phone: '+91 98450 66778',
    email: 'farah@wellnessbasket.in', address: 'Camp Road', city: 'Belgaum', channel: 'retailer',
    totalOrders: 26, outstanding: 7500, status: 'active', notes: 'New retail account, first Ashwagandha order pending payment.',
    orders: [{ date: '2026-07-02', desc: 'SO-3086 — 30 packets Ashwagandha Powder', amount: 7500 }]
  },
  {
    id: 'CUST-004', name: 'Meera Rao', contact: 'Meera Rao', phone: '+91 90080 12345',
    email: 'meera.rao@gmail.com', address: 'Tilakwadi', city: 'Belgaum', channel: 'direct',
    totalOrders: 6, outstanding: 0, status: 'active', notes: 'Repeat direct consumer, prefers Amla Powder.',
    orders: [{ date: '2026-06-24', desc: 'SO-3081 — 3 packets Amla Powder', amount: 750 }]
  },
  {
    id: 'CUST-005', name: 'Suresh K.', contact: 'Suresh K.', phone: '+91 97400 88990',
    email: 'suresh.k@gmail.com', address: 'Khanapur Road', city: 'Belgaum', channel: 'direct',
    totalOrders: 3, outstanding: 500, status: 'active', notes: 'Payment pending for last order — follow up needed.',
    orders: [{ date: '2026-06-29', desc: 'SO-3083 — 2 packets Beetroot Powder', amount: 500 }]
  },
  {
    id: 'CUST-006', name: 'Rohan Kapoor', contact: 'Rohan Kapoor', phone: '+91 96540 11223',
    email: 'rohan.kapoor@gmail.com', address: 'Online — Pune', city: 'Pune', channel: 'direct',
    totalOrders: 1, outstanding: 0, status: 'inactive', notes: 'Order cancelled — no repeat purchase since.',
    orders: []
  }
];

const channelLabel = { ecommerce: 'E-commerce', retailer: 'Retailer', direct: 'Direct Consumer' };

const CUSTOMER_INSIGHTS = [
  {
    priority: 'medium', category: 'Churn Risk',
    text: 'GreenLeaf Retail, Belgaum has not placed an order in 21 days versus their usual 10-day cycle.',
    action: 'Have the sales exec check in before they switch suppliers.',
    confidence: '79% confidence'
  },
  {
    priority: 'high', category: 'Payment Reminder',
    text: 'Suresh K. and Wellness Basket Retail together owe \u20B98,000 past their due dates.',
    action: 'Send payment reminders today.',
    confidence: '91% confidence'
  },
  {
    priority: 'low', category: 'High-Value Customer',
    text: 'NatureCart Store has placed 118 orders and never missed a payment.',
    action: 'Offer a loyalty discount on their next bulk order.',
    confidence: '85% confidence'
  }
];

const ACTIVITY = [
  { time: '9:40 AM', action: 'Payment received from GreenLeaf Retail, Belgaum (\u20B910,000)', user: 'You', status: 'completed' },
  { time: 'Yesterday', action: 'New customer added — Wellness Basket Retail', user: 'Sales Executive', status: 'completed' },
  { time: 'Yesterday', action: 'Order placed by NatureCart Store (SO-3084)', user: 'Sales Executive', status: 'completed' }
];

/* ---------- Render: KPIs ---------- */

function renderKpis() {
  const total = MOCK_CUSTOMERS.length;
  const active = MOCK_CUSTOMERS.filter((c) => c.status === 'active').length;
  const outstanding = MOCK_CUSTOMERS.reduce((sum, c) => sum + c.outstanding, 0);
  document.getElementById('kpi-total-customers').textContent = total;
  document.getElementById('kpi-active-customers').textContent = active;
  document.getElementById('kpi-new-customers').textContent = 2;
  document.getElementById('kpi-outstanding').textContent = AstraApp.formatCurrency(outstanding);
}

/* ---------- Render: Intelligence ---------- */

function renderInsights(items) {
  const container = document.getElementById('customer-insights');
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

/* ---------- Render: Segments ---------- */

function renderSegments() {
  const container = document.getElementById('segment-grid');
  const segments = ['ecommerce', 'retailer', 'direct'].map((key) => {
    const inSegment = MOCK_CUSTOMERS.filter((c) => c.channel === key);
    return {
      key,
      name: channelLabel[key],
      count: inSegment.length,
      orders: inSegment.reduce((sum, c) => sum + c.totalOrders, 0),
      outstanding: inSegment.reduce((sum, c) => sum + c.outstanding, 0)
    };
  });
  container.innerHTML = segments.map((s) => `
    <div class="cust-segment-card">
      <span class="cust-segment-name">${esc(s.name)}</span>
      <div class="cust-segment-row"><span>Customers</span><span class="mono">${esc(s.count)}</span></div>
      <div class="cust-segment-row"><span>Total Orders</span><span class="mono">${esc(s.orders)}</span></div>
      <div class="cust-segment-row"><span>Outstanding</span><span class="mono">${AstraApp.formatCurrency(s.outstanding)}</span></div>
    </div>
  `).join('');
}

/* ---------- Render: Customer Directory table ---------- */

const tbody = document.getElementById('customers-tbody');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search-input');
const filterChannel = document.getElementById('filter-channel');
const filterStatus = document.getElementById('filter-status');
const outstandingChip = document.getElementById('filter-outstanding');
let outstandingOnly = false;

function getFilteredCustomers() {
  const query = searchInput.value.trim().toLowerCase();
  const channel = filterChannel.value;
  const status = filterStatus.value;

  return MOCK_CUSTOMERS.filter((c) => {
    const matchesQuery = !query ||
      c.name.toLowerCase().includes(query) ||
      c.id.toLowerCase().includes(query) ||
      c.contact.toLowerCase().includes(query);
    const matchesChannel = !channel || c.channel === channel;
    const matchesStatus = !status || c.status === status;
    const matchesOutstanding = !outstandingOnly || c.outstanding > 0;
    return matchesQuery && matchesChannel && matchesStatus && matchesOutstanding;
  });
}

function renderTable() {
  const customers = getFilteredCustomers();
  emptyState.classList.toggle('hidden', customers.length > 0);

  tbody.innerHTML = customers.map((c) => `
    <tr data-id="${esc(c.id)}">
      <td>${esc(c.name)}</td>
      <td class="mono text-dim">${esc(c.id)}</td>
      <td>${esc(c.contact)}</td>
      <td>${esc(c.city)}</td>
      <td>${esc(channelLabel[c.channel])}</td>
      <td class="mono">${esc(c.totalOrders)}</td>
      <td class="mono ${c.outstanding > 0 ? 'text-amber' : 'text-dim'}">${c.outstanding > 0 ? AstraApp.formatCurrency(c.outstanding) : '—'}</td>
      <td><span class="cust-status-badge ${c.status}">${c.status === 'active' ? 'Active' : 'Inactive'}</span></td>
      <td>
        <button class="cust-icon-btn" aria-label="View customer" title="View">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('tr').forEach((row) => {
    row.addEventListener('click', () => openDrawer(row.dataset.id));
  });
}

/* ---------- Drawer ---------- */

const drawer = document.getElementById('customer-drawer');
const drawerOverlay = document.getElementById('drawer-overlay');

function openDrawer(id) {
  const c = MOCK_CUSTOMERS.find((cust) => cust.id === id);
  if (!c) return;

  document.getElementById('drawer-name').textContent = c.name;
  document.getElementById('drawer-code').textContent = c.id;
  document.getElementById('drawer-contact').textContent = c.contact;
  document.getElementById('drawer-phone').textContent = c.phone;
  document.getElementById('drawer-email').textContent = c.email || '—';
  document.getElementById('drawer-channel').textContent = channelLabel[c.channel];
  document.getElementById('drawer-status').textContent = c.status === 'active' ? 'Active' : 'Inactive';
  document.getElementById('drawer-address').textContent = c.address || '—';
  document.getElementById('drawer-city').textContent = c.city;
  document.getElementById('drawer-orders').innerHTML = c.orders.length
    ? c.orders.map((o) => `<div class="cust-drawer-list-item"><span>${esc(o.date)} — ${esc(o.desc)}</span><span class="mono">${AstraApp.formatCurrency(o.amount)}</span></div>`).join('')
    : '<div class="cust-drawer-list-empty">No orders recorded yet.</div>';
  document.getElementById('drawer-outstanding').textContent =
    c.outstanding > 0 ? AstraApp.formatCurrency(c.outstanding) : '\u20B90 — settled';
  document.getElementById('drawer-notes').textContent = c.notes || 'No notes yet.';

  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  drawerOverlay.classList.add('open');
}

function closeDrawer() {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  drawerOverlay.classList.remove('open');
}

document.getElementById('drawer-close').addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', () => {
  closeDrawer();
  closeModal();
});

/* ---------- Add Customer modal ---------- */

const modal = document.getElementById('add-customer-modal');
const modalOverlay = document.getElementById('modal-overlay');
const addForm = document.getElementById('add-customer-form');

function openModal() {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  modalOverlay.classList.add('open');
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modalOverlay.classList.remove('open');
  addForm.reset();
}

document.getElementById('btn-add-customer').addEventListener('click', openModal);
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-cancel').addEventListener('click', closeModal);

document.getElementById('btn-record-payment').addEventListener('click', () => {
  showToast('Record Payment opens once finance is wired to the backend.', 'info');
});
document.getElementById('btn-order-history').addEventListener('click', () => {
  showToast('Full order history view opens once linked to the Sales module data.', 'info');
});
document.getElementById('btn-export-list').addEventListener('click', () => {
  showToast('Customer list export will be available once reporting is wired to the backend.', 'info');
});

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(addForm);
  const newCustomer = {
    id: `CUST-${String(MOCK_CUSTOMERS.length + 1).padStart(3, '0')}`,
    name: data.get('name'),
    contact: data.get('contact') || data.get('name'),
    phone: data.get('phone'),
    email: data.get('email'),
    address: data.get('address'),
    city: data.get('city'),
    channel: data.get('channel'),
    totalOrders: 0,
    outstanding: 0,
    status: 'active',
    notes: data.get('notes'),
    orders: []
  };
  MOCK_CUSTOMERS.push(newCustomer);
  renderKpis();
  renderSegments();
  renderTable();
  closeModal();
  showToast(`${newCustomer.name} added successfully.`, 'success');
});

/* ---------- Search / filter listeners ---------- */

searchInput.addEventListener('input', renderTable);
filterChannel.addEventListener('change', renderTable);
filterStatus.addEventListener('change', renderTable);
outstandingChip.addEventListener('click', () => {
  outstandingOnly = !outstandingOnly;
  outstandingChip.classList.toggle('active', outstandingOnly);
  renderTable();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDrawer();
    closeModal();
  }
});

/* ---------- Render: Recent Activity ---------- */

function renderActivity(events) {
  const icons = {
    completed: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>',
    'in-progress': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>'
  };
  const container = document.getElementById('customer-activity');
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
renderInsights(CUSTOMER_INSIGHTS);
renderSegments();
renderTable();
renderActivity(ACTIVITY);
