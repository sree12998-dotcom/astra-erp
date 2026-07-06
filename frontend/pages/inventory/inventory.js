/* ===========================================================
   ASTRA — inventory.js (Inventory Management)

   TODO: once backend/api/inventory.py exists, replace MOCK_DATA
   with: const data = await AstraAPI.get('/inventory/overview').
   Render functions are written to accept any object shaped like
   MOCK_DATA, so that's the only line that needs to change.
   =========================================================== */

AstraAuth.requireAuth();
AstraApp.highlightActiveNav('inventory');
AstraApp.renderUserBadge();

document.getElementById('logout-btn').addEventListener('click', () => AstraAuth.logout());

const esc = AstraApp.escapeHTML;

const MOCK_DATA = {
  overview: {
    stockValue: 842600,
    stockValueSub: '↑ 6.4% vs last month',
    rawMaterials: '312 kg',
    rawMaterialsSub: 'across 6 SKUs',
    finishedGoods: 4820,
    finishedGoodsSub: '↑ 9.1% packets',
    lowStock: 5,
    lowStockSub: 'need reorder'
  },
  intelligence: [
    {
      priority: 'high', category: 'Low Stock',
      text: 'Moringa Powder at Belgaum Central will breach reorder level in 4 days.',
      action: 'Raise a purchase order for 50 kg from Gujarat Organics Co.',
      confidence: '94% confidence'
    },
    {
      priority: 'high', category: 'Expiry Warning',
      text: '212 packets of Beetroot Powder (batch BEET-0628-A) cross 60-day shelf life on 12 Aug.',
      action: 'Prioritise this batch in outbound dispatch this week.',
      confidence: '89% confidence'
    },
    {
      priority: 'medium', category: 'Fast Moving',
      text: 'Ashwagandha Powder has sold through 3.1x faster than its 90-day average.',
      action: 'Increase next production run by 30%.',
      confidence: '85% confidence'
    },
    {
      priority: 'low', category: 'Slow Moving',
      text: 'Neem Powder at Pune Distribution has had no outbound movement in 45 days.',
      action: 'Bundle with a promotional offer or transfer to a higher-demand warehouse.',
      confidence: '77% confidence'
    },
    {
      priority: 'medium', category: 'Reorder Suggestion',
      text: 'Turmeric Powder is projected to hit reorder level on 18 Jul based on current velocity.',
      action: 'Schedule a purchase of 80 kg for 14 Jul.',
      confidence: '90% confidence'
    }
  ],
  products: [
    { name: 'Amla Powder', sku: 'AML-PWD-001', category: 'Raw Material', warehouse: 'Belgaum Central', stock: 312, unit: 'kg', reserved: 40, reorder: 100, status: 'healthy' },
    { name: 'Moringa Powder', sku: 'MOR-PWD-002', category: 'Raw Material', warehouse: 'Belgaum Central', stock: 18, unit: 'kg', reserved: 6, reorder: 40, status: 'critical' },
    { name: 'Beetroot Powder', sku: 'BEE-PWD-003', category: 'Finished Good', warehouse: 'Bangalore Hub', stock: 212, unit: 'pkts', reserved: 30, reorder: 150, status: 'low' },
    { name: 'Ashwagandha Powder', sku: 'ASH-PWD-004', category: 'Finished Good', warehouse: 'Bangalore Hub', stock: 640, unit: 'pkts', reserved: 120, reorder: 200, status: 'healthy' },
    { name: 'Turmeric Powder', sku: 'TUR-PWD-005', category: 'Raw Material', warehouse: 'Belgaum Central', stock: 96, unit: 'kg', reserved: 20, reorder: 90, status: 'low' },
    { name: 'Spirulina Powder', sku: 'SPI-PWD-006', category: 'Finished Good', warehouse: 'Pune Distribution', stock: 0, unit: 'pkts', reserved: 0, reorder: 100, status: 'out' },
    { name: 'Neem Powder', sku: 'NEE-PWD-007', category: 'Finished Good', warehouse: 'Pune Distribution', stock: 410, unit: 'pkts', reserved: 15, reorder: 120, status: 'healthy' },
    { name: 'Wheatgrass Powder', sku: 'WHT-PWD-008', category: 'Raw Material', warehouse: 'Bangalore Hub', stock: 54, unit: 'kg', reserved: 10, reorder: 60, status: 'low' }
  ],
  warehouses: [
    { name: 'Belgaum Central', capacity: '5,000 kg', utilization: 78, available: '1,100 kg', items: 6 },
    { name: 'Bangalore Hub', capacity: '3,200 kg', utilization: 91, available: '288 kg', items: 4 },
    { name: 'Pune Distribution', capacity: '2,400 kg', utilization: 46, available: '1,296 kg', items: 3 }
  ],
  movements: [
    { type: 'in', product: 'Amla Powder', qty: '+50 kg', user: 'Warehouse Manager', time: 'Today, 9:20 AM' },
    { type: 'out', product: 'Beetroot Powder', qty: '-40 pkts', user: 'Sales Executive', time: 'Today, 8:05 AM' },
    { type: 'transfer', product: 'Wheatgrass Powder', qty: '15 kg → Bangalore Hub', user: 'You', time: 'Yesterday, 6:40 PM' },
    { type: 'adjust', product: 'Neem Powder', qty: '-6 pkts (damaged)', user: 'Warehouse Manager', time: 'Yesterday, 2:15 PM' },
    { type: 'in', product: 'Turmeric Powder', qty: '+30 kg', user: 'You', time: '2 days ago' }
  ],
  topProducts: {
    mostConsumed: [
      { name: 'Beetroot Powder', value: '640 pkts/mo' },
      { name: 'Amla Powder', value: '512 pkts/mo' },
      { name: 'Ashwagandha Powder', value: '410 pkts/mo' }
    ],
    fastMoving: [
      { name: 'Ashwagandha Powder', value: '3.1x avg' },
      { name: 'Spirulina Powder', value: '2.4x avg' },
      { name: 'Beetroot Powder', value: '1.8x avg' }
    ],
    highestValue: [
      { name: 'Spirulina Powder', value: '₹1,84,000' },
      { name: 'Ashwagandha Powder', value: '₹1,52,300' },
      { name: 'Amla Powder', value: '₹98,600' }
    ],
    recentlyAdded: [
      { name: 'Wheatgrass Powder', value: '5 days ago' },
      { name: 'Neem Powder', value: '12 days ago' },
      { name: 'Spirulina Powder', value: '19 days ago' }
    ]
  }
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
  animateCount(document.getElementById('inv-kpi-value'), overview.stockValue, {
    duration: 1000, format: (n) => AstraApp.formatCurrency(Math.round(n))
  });
  document.getElementById('inv-kpi-value-sub').textContent = overview.stockValueSub;

  document.getElementById('inv-kpi-raw').textContent = overview.rawMaterials;
  document.getElementById('inv-kpi-raw-sub').textContent = overview.rawMaterialsSub;

  animateCount(document.getElementById('inv-kpi-finished'), overview.finishedGoods, {
    duration: 1000, delay: 60, format: (n) => Math.round(n).toLocaleString('en-IN')
  });
  document.getElementById('inv-kpi-finished-sub').textContent = overview.finishedGoodsSub;

  document.getElementById('inv-kpi-lowstock').textContent = overview.lowStock;
  document.getElementById('inv-kpi-lowstock-sub').textContent = overview.lowStockSub;
}

function renderIntelligence(items) {
  const container = document.getElementById('inv-insights');
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

const STATUS_LABEL = { healthy: 'Healthy', low: 'Low', critical: 'Critical', out: 'Out of Stock' };

function renderTable(products) {
  const tbody = document.querySelector('#inventory-table tbody');
  tbody.innerHTML = products.map((p) => {
    const available = Math.max(p.stock - p.reserved, 0);
    const initial = p.name.charAt(0);
    return `
    <tr>
      <td>
        <div class="inv-product-cell">
          <span class="inv-product-thumb">${esc(initial)}</span>
          <span class="inv-product-name">${esc(p.name)}</span>
        </div>
      </td>
      <td class="mono text-dim">${esc(p.sku)}</td>
      <td>${esc(p.category)}</td>
      <td>${esc(p.warehouse)}</td>
      <td class="mono">${p.stock}</td>
      <td>${p.unit}</td>
      <td class="mono">${p.reserved}</td>
      <td class="mono">${available}</td>
      <td class="mono">${p.reorder}</td>
      <td><span class="pill pill-${p.status}">${esc(STATUS_LABEL[p.status])}</span></td>
      <td>
        <div class="inv-row-actions">
          <button class="inv-icon-btn-sm" title="View" aria-label="View"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
          <button class="inv-icon-btn-sm" title="Edit" aria-label="Edit"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4z"/></svg></button>
          <button class="inv-icon-btn-sm" title="History" aria-label="History"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg></button>
        </div>
      </td>
    </tr>
  `;
  }).join('');
}

function renderWarehouses(warehouses) {
  const container = document.getElementById('warehouse-summary');
  container.innerHTML = warehouses.map((w) => `
    <div class="inv-warehouse-card">
      <div class="inv-warehouse-head">
        <div style="display:flex;align-items:center;gap:12px;">
          <span class="inv-warehouse-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21V9l9-6 9 6v12"/><path d="M9 21V12h6v9"/></svg>
          </span>
          <span class="inv-warehouse-name">${esc(w.name)}</span>
        </div>
        <span class="inv-warehouse-items">${esc(w.items)} SKUs</span>
      </div>
      <div class="inv-warehouse-stats"><span>Capacity</span><strong>${esc(w.capacity)}</strong></div>
      <div class="inv-warehouse-stats"><span>Available Space</span><strong>${esc(w.available)}</strong></div>
      <div class="mc-progress-track"><div class="mc-progress-fill ${w.utilization >= 85 ? 'warn' : ''}" style="width:0%" data-target="${w.utilization}"></div></div>
      <div class="inv-warehouse-percent">${w.utilization}% utilized</div>
    </div>
  `).join('');

  requestAnimationFrame(() => {
    container.querySelectorAll('.mc-progress-fill').forEach((fill) => {
      fill.style.width = `${fill.dataset.target}%`;
    });
  });
}

const MOVEMENT_ICON = {
  in: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>',
  out: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14"/><path d="M19 12l-7 7-7-7"/></svg>',
  transfer: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3l4 4-4 4"/><path d="M21 7H9"/><path d="M7 21l-4-4 4-4"/><path d="M3 17h12"/></svg>',
  adjust: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82"/><path d="M4.6 9a1.65 1.65 0 01-.33-1.82"/></svg>'
};
const MOVEMENT_LABEL = { in: 'Stock In', out: 'Stock Out', transfer: 'Transfer', adjust: 'Adjustment' };

function renderMovements(movements) {
  const container = document.getElementById('stock-movement');
  container.innerHTML = movements.map((m) => `
    <div class="mc-timeline-item">
      <div class="mc-timeline-icon ${m.type === 'in' ? '' : m.type}">${MOVEMENT_ICON[m.type]}</div>
      <div class="mc-timeline-body">
        <div class="mc-timeline-top">
          <span class="mc-timeline-action">${esc(MOVEMENT_LABEL[m.type])} — ${esc(m.product)}</span>
          <span class="inv-movement-qty ${m.type}">${esc(m.qty)}</span>
        </div>
        <span class="mc-timeline-meta"><span>${esc(m.time)}</span><span>·</span><span>${esc(m.user)}</span></span>
      </div>
    </div>
  `).join('');
}

const TOP_SECTIONS = [
  { key: 'mostConsumed', title: 'Most Consumed', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6"/><rect x="12" y="8" width="3" height="10"/><rect x="17" y="5" width="3" height="13"/></svg>' },
  { key: 'fastMoving', title: 'Fast Moving', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>' },
  { key: 'highestValue', title: 'Highest Value', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v10"/><path d="M9 9.5c0-1.4 1.3-2.5 3-2.5s3 1 3 2.3-1 1.9-3 2.2-3 1-3 2.3 1.3 2.2 3 2.2 3-1 3-2.2"/></svg>' },
  { key: 'recentlyAdded', title: 'Recently Added', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>' }
];

function renderTopProducts(topProducts) {
  const container = document.getElementById('top-products');
  container.innerHTML = TOP_SECTIONS.map((section) => `
    <div class="inv-top-card">
      <div class="inv-top-head">
        <span class="inv-top-icon">${section.icon}</span>
        <span class="inv-top-title">${esc(section.title)}</span>
      </div>
      <div class="inv-top-list">
        ${topProducts[section.key].map((item, i) => `
          <div class="inv-top-row">
            <div class="inv-top-row-name">
              <span class="inv-top-rank">${i + 1}</span>
              <span>${esc(item.name)}</span>
            </div>
            <span class="inv-top-row-value">${esc(item.value)}</span>
          </div>
        `).join('')}
      </div>
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
  toast.className = `inv-toast ${type}`;
  toast.innerHTML = `<span class="inv-toast-icon">${toastIcons[type]}</span><span>${esc(message)}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

function bindQuickActions() {
  const actions = {
    'qa-add-stock': 'Add Stock form opens once inventory writes are wired to the backend.',
    'qa-stock-out': 'Stock Out form opens once inventory writes are wired to the backend.',
    'qa-transfer': 'Transfer Stock form opens once warehouse transfers are wired to the backend.',
    'qa-report': 'Inventory report will be generated once reporting is wired to the backend.'
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
renderTable(MOCK_DATA.products);
renderWarehouses(MOCK_DATA.warehouses);
renderMovements(MOCK_DATA.movements);
renderTopProducts(MOCK_DATA.topProducts);
bindQuickActions();
