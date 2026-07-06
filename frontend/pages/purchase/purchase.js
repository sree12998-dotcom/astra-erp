/* ===========================================================
   ASTRA — purchase.js (Purchase Management)

   TODO: once backend/api/purchase.py exists, replace MOCK_DATA
   with: const data = await AstraAPI.get('/purchase/overview').
   Render functions are written to accept any object shaped like
   MOCK_DATA, so that's the only line that needs to change.
   =========================================================== */

AstraAuth.requireAuth();
AstraApp.highlightActiveNav('purchase');
AstraApp.renderUserBadge();

document.getElementById('logout-btn').addEventListener('click', () => AstraAuth.logout());

const esc = AstraApp.escapeHTML;

const MOCK_DATA = {
  overview: {
    totalValue: 1284600,
    totalValueSub: '↑ 11.3% vs last month',
    openPOs: 14,
    openPOsSub: '5 pending approval',
    grnToday: 6,
    grnTodaySub: '↑ 2 vs yesterday',
    pendingDeliveries: 9,
    pendingDeliveriesSub: '3 overdue'
  },
  intelligence: [
    {
      priority: 'high', category: 'Delivery Delay',
      text: 'Gujarat Organics Co. delivery for PO-2026-114 is running 3 days behind schedule.',
      action: 'Contact supplier and notify production planning.',
      confidence: '91% confidence'
    },
    {
      priority: 'high', category: 'Price Increase',
      text: 'Moringa Powder raw material pricing from Nilgiri Farms has risen 8.5% since last order.',
      action: 'Negotiate rate or evaluate alternate supplier.',
      confidence: '88% confidence'
    },
    {
      priority: 'medium', category: 'Reorder Suggestion',
      text: 'Kraft Pouches (250g) usage suggests a reorder of 40,000 units by 15 Jul.',
      action: 'Raise a purchase order with Shree Packaging Industries.',
      confidence: '86% confidence'
    },
    {
      priority: 'medium', category: 'Best Supplier',
      text: 'Karnataka Agro Traders has the best on-time delivery rate (97%) for Beetroot Powder.',
      action: 'Route the next Beetroot Powder order to this supplier.',
      confidence: '90% confidence'
    },
    {
      priority: 'low', category: 'Bulk Opportunity',
      text: 'Combining the next two Label & Carton orders qualifies for a 6% volume discount.',
      action: 'Merge PO-2026-118 and PO-2026-121 before approval.',
      confidence: '82% confidence'
    },
    {
      priority: 'low', category: 'Purchase Trend',
      text: 'Packaging material spend has grown 18% quarter-over-quarter, faster than raw materials.',
      action: 'Review packaging vendor contracts this quarter.',
      confidence: '79% confidence'
    }
  ],
  purchaseOrders: [
    { po: 'PO-2026-114', supplier: 'Gujarat Organics Co.', date: '28 Jun 2026', dateISO: '2026-06-28', expected: '05 Jul 2026', items: 3, amount: 186400, payment: 'partial', delivery: 'pending', approval: 'ordered', createdBy: 'Production Manager' },
    { po: 'PO-2026-115', supplier: 'Nilgiri Farms', date: '27 Jun 2026', dateISO: '2026-06-27', expected: '03 Jul 2026', items: 2, amount: 94200, payment: 'unpaid', delivery: 'pending', approval: 'approved', createdBy: 'You' },
    { po: 'PO-2026-116', supplier: 'Karnataka Agro Traders', date: '25 Jun 2026', dateISO: '2026-06-25', expected: '01 Jul 2026', items: 4, amount: 214800, payment: 'paid', delivery: 'received', approval: 'completed', createdBy: 'Purchase Executive' },
    { po: 'PO-2026-117', supplier: 'Shree Packaging Industries', date: '24 Jun 2026', dateISO: '2026-06-24', expected: '30 Jun 2026', items: 1, amount: 58200, payment: 'paid', delivery: 'partial', approval: 'partial', createdBy: 'You' },
    { po: 'PO-2026-118', supplier: 'Bright Label Works', date: '23 Jun 2026', dateISO: '2026-06-23', expected: '29 Jun 2026', items: 2, amount: 32400, payment: 'unpaid', delivery: 'pending', approval: 'pending', createdBy: 'Purchase Executive' },
    { po: 'PO-2026-119', supplier: 'Anand Carton Co.', date: '20 Jun 2026', dateISO: '2026-06-20', expected: '26 Jun 2026', items: 1, amount: 41600, payment: 'paid', delivery: 'received', approval: 'completed', createdBy: 'Production Manager' },
    { po: 'PO-2026-120', supplier: 'Nilgiri Farms', date: '18 Jun 2026', dateISO: '2026-06-18', expected: '24 Jun 2026', items: 2, amount: 78900, payment: 'paid', delivery: 'received', approval: 'completed', createdBy: 'You' },
    { po: 'PO-2026-121', supplier: 'Bright Label Works', date: '16 Jun 2026', dateISO: '2026-06-16', expected: '22 Jun 2026', items: 3, amount: 27300, payment: 'unpaid', delivery: 'pending', approval: 'draft', createdBy: 'Purchase Executive' },
    { po: 'PO-2026-122', supplier: 'Gujarat Organics Co.', date: '14 Jun 2026', dateISO: '2026-06-14', expected: '20 Jun 2026', items: 2, amount: 132500, payment: 'paid', delivery: 'received', approval: 'cancelled', createdBy: 'You' }
  ],
  grnSummary: [
    { label: 'Received Today', value: '6 GRNs', accent: 'cyan', icon: 'box' },
    { label: 'Pending GRNs', value: '9', accent: 'amber', icon: 'clock' },
    { label: 'Quality Inspection Pending', value: '4', accent: 'violet', icon: 'search' },
    { label: 'Rejected Materials', value: '1', accent: 'red', icon: 'x' },
    { label: 'Average Receiving Time', value: '1.4 days', accent: 'green', icon: 'gauge' }
  ],
  suppliers: [
    { name: 'Gujarat Organics Co.', ordersCompleted: 42, onTime: 94, leadTime: '4.2 days', quality: '4.8 / 5', value: 842000, status: 'active' },
    { name: 'Nilgiri Farms', ordersCompleted: 28, onTime: 88, leadTime: '5.1 days', quality: '4.5 / 5', value: 412600, status: 'active' },
    { name: 'Karnataka Agro Traders', ordersCompleted: 35, onTime: 97, leadTime: '3.6 days', quality: '4.9 / 5', value: 598200, status: 'preferred' },
    { name: 'Shree Packaging Industries', ordersCompleted: 19, onTime: 82, leadTime: '6.3 days', quality: '4.1 / 5', value: 218400, status: 'active' },
    { name: 'Bright Label Works', ordersCompleted: 12, onTime: 75, leadTime: '7.0 days', quality: '3.8 / 5', value: 96800, status: 'review' },
    { name: 'Anand Carton Co.', ordersCompleted: 16, onTime: 90, leadTime: '4.8 days', quality: '4.4 / 5', value: 154200, status: 'active' }
  ],
  analytics: {
    monthlyTrend: [
      { label: 'Feb', value: 780000 },
      { label: 'Mar', value: 892000 },
      { label: 'Apr', value: 845000 },
      { label: 'May', value: 968000 },
      { label: 'Jun', value: 1042000 },
      { label: 'Jul', value: 1284600 }
    ],
    byCategory: [
      { label: 'Raw Materials', percent: 58 },
      { label: 'Packaging Material', percent: 27 },
      { label: 'Logistics', percent: 9 },
      { label: 'Other', percent: 6 }
    ],
    topSuppliers: [
      { name: 'Gujarat Organics Co.', value: '₹8,42,000' },
      { name: 'Karnataka Agro Traders', value: '₹5,98,200' },
      { name: 'Nilgiri Farms', value: '₹4,12,600' }
    ],
    costDistribution: [
      { label: 'Raw Materials', percent: 58, color: 'var(--mc-cyan)' },
      { label: 'Packaging Material', percent: 27, color: 'var(--mc-green)' },
      { label: 'Logistics', percent: 9, color: 'var(--mc-amber)' },
      { label: 'Other', percent: 6, color: 'var(--mc-violet)' }
    ],
    topMaterials: [
      { name: 'Amla Powder', value: '312 kg' },
      { name: 'Kraft Pouches (250g)', value: '38,400 pcs' },
      { name: 'Moringa Powder', value: '210 kg' }
    ]
  },
  activity: [
    { type: 'created',  text: 'Purchase Order PO-2026-118 created for Bright Label Works', user: 'Purchase Executive', time: 'Today, 10:12 AM' },
    { type: 'approved', text: 'Purchase Order PO-2026-115 approved for Nilgiri Farms', user: 'You', time: 'Today, 9:05 AM' },
    { type: 'received', text: 'Goods received against PO-2026-116 from Karnataka Agro Traders', user: 'Warehouse Manager', time: 'Today, 8:40 AM' },
    { type: 'invoice',  text: 'Supplier invoice uploaded for PO-2026-119', user: 'You', time: 'Yesterday, 5:20 PM' },
    { type: 'payment',  text: 'Payment processed for PO-2026-120 — ₹78,900', user: 'Finance Team', time: 'Yesterday, 3:10 PM' },
    { type: 'closed',   text: 'Purchase Order PO-2026-122 closed and archived', user: 'You', time: '2 days ago' }
  ],
  deliveries: [
    { supplier: 'Gujarat Organics Co.', expected: '05 Jul 2026', material: 'Amla Powder', quantity: '150 kg', priority: 'high', status: 'in-transit' },
    { supplier: 'Nilgiri Farms', expected: '03 Jul 2026', material: 'Moringa Powder', quantity: '80 kg', priority: 'high', status: 'pending' },
    { supplier: 'Karnataka Agro Traders', expected: '06 Jul 2026', material: 'Beetroot Powder', quantity: '120 kg', priority: 'medium', status: 'pending' },
    { supplier: 'Shree Packaging Industries', expected: '08 Jul 2026', material: 'Pouches (250g)', quantity: '40,000 pcs', priority: 'medium', status: 'pending' },
    { supplier: 'Bright Label Works', expected: '10 Jul 2026', material: 'Product Labels', quantity: '25,000 pcs', priority: 'low', status: 'pending' },
    { supplier: 'Anand Carton Co.', expected: '11 Jul 2026', material: 'Shipping Boxes', quantity: '3,000 pcs', priority: 'low', status: 'in-transit' }
  ]
};

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

function renderOverview(overview) {
  animateCount(document.getElementById('pur-kpi-value'), overview.totalValue, {
    duration: 1000, format: (n) => AstraApp.formatCurrency(Math.round(n))
  });
  document.getElementById('pur-kpi-value-sub').textContent = overview.totalValueSub;

  document.getElementById('pur-kpi-openpo').textContent = overview.openPOs;
  document.getElementById('pur-kpi-openpo-sub').textContent = overview.openPOsSub;

  document.getElementById('pur-kpi-grn').textContent = overview.grnToday;
  document.getElementById('pur-kpi-grn-sub').textContent = overview.grnTodaySub;

  document.getElementById('pur-kpi-pending').textContent = overview.pendingDeliveries;
  document.getElementById('pur-kpi-pending-sub').textContent = overview.pendingDeliveriesSub;
}

function renderIntelligence(items) {
  const container = document.getElementById('pur-insights');
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

const PAYMENT_LABEL  = { paid: 'Paid', partial: 'Partial', unpaid: 'Unpaid' };
const DELIVERY_LABEL = { received: 'Received', partial: 'Partially Received', pending: 'Pending' };
const APPROVAL_LABEL = {
  draft: 'Draft', pending: 'Pending Approval', approved: 'Approved', ordered: 'Ordered',
  partial: 'Partially Received', completed: 'Completed', cancelled: 'Cancelled'
};

let currentOrders = MOCK_DATA.purchaseOrders.slice();

function renderTable(orders) {
  const tbody = document.querySelector('#purchase-orders-table tbody');
  const empty = document.getElementById('pur-table-empty');

  if (orders.length === 0) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  tbody.innerHTML = orders.map((o) => `
    <tr>
      <td class="pur-po-number">${esc(o.po)}</td>
      <td>${esc(o.supplier)}</td>
      <td>${esc(o.date)}</td>
      <td>${esc(o.expected)}</td>
      <td class="mono">${esc(o.items)}</td>
      <td class="mono">${AstraApp.formatCurrency(o.amount)}</td>
      <td><span class="pill pill-${o.payment}">${esc(PAYMENT_LABEL[o.payment])}</span></td>
      <td><span class="pill pill-${o.delivery}">${esc(DELIVERY_LABEL[o.delivery])}</span></td>
      <td><span class="pill pill-${o.approval}">${esc(APPROVAL_LABEL[o.approval])}</span></td>
      <td>${esc(o.createdBy)}</td>
      <td>
        <div class="inv-row-actions">
          <button class="inv-icon-btn-sm" title="View" aria-label="View"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
          <button class="inv-icon-btn-sm" title="Edit" aria-label="Edit"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4z"/></svg></button>
          <button class="inv-icon-btn-sm" title="Approve" aria-label="Approve"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg></button>
          <button class="inv-icon-btn-sm" title="Print" aria-label="Print"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><path d="M6 14h12v8H6z"/></svg></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function populateSupplierFilter(orders) {
  const select = document.getElementById('pur-filter-supplier');
  const suppliers = Array.from(new Set(orders.map((o) => o.supplier))).sort();
  suppliers.forEach((s) => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = s;
    select.appendChild(opt);
  });
}

function daysSince(isoDate) {
  const msPerDay = 24 * 60 * 60 * 1000;
  const orderDate = new Date(`${isoDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((today - orderDate) / msPerDay);
}

function applyFilters() {
  const query = document.getElementById('pur-search').value.trim().toLowerCase();
  const dateFilter = document.getElementById('pur-filter-date').value;
  const supplierFilter = document.getElementById('pur-filter-supplier').value;
  const statusFilter = document.getElementById('pur-filter-status').value;

  currentOrders = MOCK_DATA.purchaseOrders.filter((o) => {
    const matchesQuery = !query || o.po.toLowerCase().includes(query) || o.supplier.toLowerCase().includes(query);
    const matchesSupplier = supplierFilter === 'all' || o.supplier === supplierFilter;
    const matchesStatus = statusFilter === 'all' || o.approval === statusFilter;
    const matchesDate = dateFilter === 'all' || daysSince(o.dateISO) <= Number(dateFilter);
    return matchesQuery && matchesSupplier && matchesStatus && matchesDate;
  });

  renderTable(currentOrders);
}

function bindTableControls() {
  document.getElementById('pur-search').addEventListener('input', applyFilters);
  document.getElementById('pur-filter-date').addEventListener('change', applyFilters);
  document.getElementById('pur-filter-supplier').addEventListener('change', applyFilters);
  document.getElementById('pur-filter-status').addEventListener('change', applyFilters);
}

const GRN_ICONS = {
  box: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>',
  clock: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
  search: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>',
  x: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>',
  gauge: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 14l3-3"/><circle cx="12" cy="14" r="8"/><path d="M9 4.5A8 8 0 0119.5 9"/></svg>'
};

function renderGRN(items) {
  const container = document.getElementById('pur-grn-summary');
  container.innerHTML = items.map((g) => `
    <div class="pur-grn-card">
      <span class="pur-grn-icon" style="background:var(--mc-${g.accent}-10, rgba(255,255,255,0.06));color:var(--mc-${g.accent})">${GRN_ICONS[g.icon]}</span>
      <span class="pur-grn-value">${esc(g.value)}</span>
      <span class="pur-grn-label">${esc(g.label)}</span>
    </div>
  `).join('');
}

function renderSupplierPerformance(suppliers) {
  const statusLabel = { active: 'Active', preferred: 'Preferred', review: 'Under Review' };
  const statusPillClass = { active: 'pill-approved', preferred: 'pill-completed', review: 'pill-pending' };
  const container = document.getElementById('pur-supplier-performance');
  container.innerHTML = suppliers.map((s) => {
    const initials = s.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
    return `
    <div class="pur-supplier-card">
      <div class="pur-supplier-head">
        <div class="pur-supplier-name-wrap">
          <span class="pur-supplier-avatar">${esc(initials)}</span>
          <span class="pur-supplier-name">${esc(s.name)}</span>
        </div>
        <span class="pill ${statusPillClass[s.status]}">${esc(statusLabel[s.status])}</span>
      </div>
      <div class="pur-supplier-stats">
        <div class="pur-supplier-stat">
          <span class="pur-supplier-stat-label">Orders Completed</span>
          <span class="pur-supplier-stat-value">${esc(s.ordersCompleted)}</span>
        </div>
        <div class="pur-supplier-stat">
          <span class="pur-supplier-stat-label">Avg Lead Time</span>
          <span class="pur-supplier-stat-value">${esc(s.leadTime)}</span>
        </div>
        <div class="pur-supplier-stat">
          <span class="pur-supplier-stat-label">Quality Rating</span>
          <span class="pur-supplier-stat-value">${esc(s.quality)}</span>
        </div>
        <div class="pur-supplier-stat">
          <span class="pur-supplier-stat-label">Purchase Value</span>
          <span class="pur-supplier-stat-value">${AstraApp.formatCurrency(s.value)}</span>
        </div>
      </div>
      <div class="pur-supplier-otd">
        <div class="pur-supplier-otd-label"><span>On-time Delivery</span><span>${s.onTime}%</span></div>
        <div class="mc-progress-track"><div class="mc-progress-fill" style="width:0%" data-target="${s.onTime}"></div></div>
      </div>
    </div>
  `;
  }).join('');

  requestAnimationFrame(() => {
    container.querySelectorAll('.mc-progress-fill').forEach((fill) => {
      fill.style.width = `${fill.dataset.target}%`;
    });
  });
}

function renderTrendChart(trend) {
  const container = document.getElementById('pur-trend-chart');
  const max = Math.max(...trend.map((t) => t.value));
  container.innerHTML = trend.map((t) => `
    <div class="pur-trend-bar-wrap">
      <span class="pur-trend-value">${esc((t.value / 1000).toFixed(0))}k</span>
      <div class="pur-trend-bar" style="height:0%" data-target="${Math.round((t.value / max) * 100)}"></div>
      <span class="pur-trend-label">${esc(t.label)}</span>
    </div>
  `).join('');
  requestAnimationFrame(() => {
    container.querySelectorAll('.pur-trend-bar').forEach((bar) => {
      bar.style.height = `${bar.dataset.target}%`;
    });
  });
}

function renderCategoryList(categories) {
  const container = document.getElementById('pur-category-list');
  container.innerHTML = categories.map((c) => `
    <div>
      <div class="pur-bar-row-top"><span>${esc(c.label)}</span><strong>${esc(c.percent)}%</strong></div>
      <div class="mc-progress-track"><div class="mc-progress-fill" style="width:0%" data-target="${c.percent}"></div></div>
    </div>
  `).join('');
  requestAnimationFrame(() => {
    container.querySelectorAll('.mc-progress-fill').forEach((fill) => {
      fill.style.width = `${fill.dataset.target}%`;
    });
  });
}

function renderRankedList(elementId, items) {
  const container = document.getElementById(elementId);
  container.innerHTML = items.map((item, i) => `
    <div class="inv-top-row">
      <div class="inv-top-row-name">
        <span class="inv-top-rank">${i + 1}</span>
        <span>${esc(item.name)}</span>
      </div>
      <span class="inv-top-row-value">${esc(item.value)}</span>
    </div>
  `).join('');
}

const DONUT_CIRCUMFERENCE = 314.2;

function renderDonut(distribution) {
  const svg = document.getElementById('pur-donut-svg');
  const legend = document.getElementById('pur-donut-legend');

  let offsetAccum = 0;
  svg.querySelectorAll('.pur-donut-segment').forEach((el) => el.remove());

  distribution.forEach((seg) => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('class', 'pur-donut-segment');
    circle.setAttribute('cx', '60');
    circle.setAttribute('cy', '60');
    circle.setAttribute('r', '50');
    circle.setAttribute('stroke', seg.color);
    const segLength = (seg.percent / 100) * DONUT_CIRCUMFERENCE;
    circle.style.strokeDasharray = `${segLength} ${DONUT_CIRCUMFERENCE - segLength}`;
    circle.style.strokeDashoffset = `${DONUT_CIRCUMFERENCE}`;
    circle.dataset.targetOffset = `${DONUT_CIRCUMFERENCE - offsetAccum}`;
    svg.appendChild(circle);
    offsetAccum += segLength;
  });

  requestAnimationFrame(() => {
    svg.querySelectorAll('.pur-donut-segment').forEach((el) => {
      el.style.strokeDashoffset = el.dataset.targetOffset;
    });
  });

  legend.innerHTML = distribution.map((seg) => `
    <div class="pur-legend-row">
      <div class="pur-legend-dot-wrap">
        <span class="pur-legend-dot" style="background:${seg.color}"></span>
        <span>${esc(seg.label)}</span>
      </div>
      <strong>${esc(seg.percent)}%</strong>
    </div>
  `).join('');
}

function renderAnalytics(analytics) {
  renderTrendChart(analytics.monthlyTrend);
  renderCategoryList(analytics.byCategory);
  renderRankedList('pur-top-suppliers', analytics.topSuppliers);
  renderRankedList('pur-top-materials', analytics.topMaterials);
  renderDonut(analytics.costDistribution);
}

const ACTIVITY_ICON = {
  created:  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
  approved: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>',
  received: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>',
  invoice:  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M9 15h6"/><path d="M9 11h6"/></svg>',
  payment:  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
  closed:   '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg>'
};

function renderActivity(events) {
  const container = document.getElementById('pur-activity');
  container.innerHTML = events.map((ev) => `
    <div class="mc-timeline-item">
      <div class="mc-timeline-icon ${ev.type === 'created' ? '' : ev.type}">${ACTIVITY_ICON[ev.type]}</div>
      <div class="mc-timeline-body">
        <span class="mc-timeline-action">${esc(ev.text)}</span>
        <span class="mc-timeline-meta"><span>${esc(ev.time)}</span><span>·</span><span>${esc(ev.user)}</span></span>
      </div>
    </div>
  `).join('');
}

function renderDeliveries(deliveries) {
  const deliveryStatusLabel = { 'in-transit': 'In Transit', pending: 'Pending' };
  const deliveryStatusPill = { 'in-transit': 'pill-approved', pending: 'pill-pending' };
  const container = document.getElementById('pur-deliveries');
  container.innerHTML = deliveries.map((d) => `
    <div class="pur-delivery-card">
      <div class="pur-delivery-head">
        <span class="pur-delivery-supplier">${esc(d.supplier)}</span>
        <span class="mc-intel-priority ${d.priority}">${esc(d.priority.toUpperCase())}</span>
      </div>
      <span class="pur-delivery-material">${esc(d.material)}</span>
      <div class="pur-delivery-row"><span class="text-faint">Expected Date</span><span>${esc(d.expected)}</span></div>
      <div class="pur-delivery-row"><span class="text-faint">Quantity</span><span class="mono">${esc(d.quantity)}</span></div>
      <div class="pur-delivery-row"><span class="text-faint">Delivery Status</span><span class="pill ${deliveryStatusPill[d.status]}">${esc(deliveryStatusLabel[d.status])}</span></div>
    </div>
  `).join('');
}

const toastIcons = {
  success: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>',
  info: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/></svg>',
  warning: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>'
};

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `pur-toast ${type}`;
  toast.innerHTML = `<span class="pur-toast-icon">${toastIcons[type]}</span><span>${esc(message)}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

function bindQuickActions() {
  const actions = {
    'qa-create-po': 'Create Purchase Order form opens once purchase writes are wired to the backend.',
    'qa-receive-goods': 'Receive Goods (GRN) form opens once inventory writes are wired to the backend.',
    'qa-record-invoice': 'Record Supplier Invoice opens once finance is wired to the backend.',
    'qa-export-report': 'Purchase report export will be available once reporting is wired to the backend.'
  };
  Object.keys(actions).forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', () => {
        showToast(actions[id], 'info');
      });
    }
  });
}

renderOverview(MOCK_DATA.overview);
renderIntelligence(MOCK_DATA.intelligence);
populateSupplierFilter(MOCK_DATA.purchaseOrders);
renderTable(currentOrders);
bindTableControls();
renderGRN(MOCK_DATA.grnSummary);
renderSupplierPerformance(MOCK_DATA.suppliers);
renderAnalytics(MOCK_DATA.analytics);
renderActivity(MOCK_DATA.activity);
renderDeliveries(MOCK_DATA.deliveries);
bindQuickActions();
