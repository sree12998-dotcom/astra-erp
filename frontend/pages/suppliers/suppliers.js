/* ===========================================================
   ASTRA — suppliers.js

   TODO: once backend/api/suppliers.py exists, replace
   MOCK_SUPPLIERS with: await AstraAPI.get('/suppliers')
   and wire the Add Supplier form to
   await AstraAPI.post('/suppliers', payload) on submit.
   =========================================================== */

AstraAuth.requireAuth();
AstraApp.highlightActiveNav('suppliers');
AstraApp.renderUserBadge();

document.getElementById('logout-btn').addEventListener('click', () => AstraAuth.logout());

const esc = AstraApp.escapeHTML;

// Header title is static markup on this page (see <header> in suppliers.html); AstraApp.renderUserBadge() above already fills the
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
  toast.className = `sup-toast ${type}`;
  toast.innerHTML = `<span class="sup-toast-icon">${toastIcons[type]}</span><span>${esc(message)}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

/* ---------- Astra Intelligence (dummy data) ---------- */

const SUPPLIER_INSIGHTS = [
  {
    priority: 'high', category: 'Supplier Risk',
    text: 'Saurashtra AgriPack has been inactive since March with \u20B99,600 outstanding \u2014 quality issues flagged twice.',
    action: 'Review before reactivating for future Moringa orders.',
    confidence: '89% confidence'
  },
  {
    priority: 'medium', category: 'Payment Forecast',
    text: 'Gujarat Organics Co. outstanding of \u20B918,500 is projected to clear within 12 days based on your payment pattern.',
    action: 'No action needed \u2014 within normal payment terms.',
    confidence: '84% confidence'
  },
  {
    priority: 'medium', category: 'Recommended Supplier',
    text: 'Kutch Herbal Suppliers has zero outstanding and a clean return history \u2014 strong candidate for increased Beetroot volume.',
    action: 'Consider shifting 20% more Beetroot orders here.',
    confidence: '78% confidence'
  },
  {
    priority: 'high', category: 'Purchase Recommendation',
    text: 'Moringa Powder stock will hit reorder level in 6 days at current packaging pace.',
    action: 'Place a 50kg order with Gujarat Organics Co. this week.',
    confidence: '92% confidence'
  }
];

function renderSupplierInsights(items) {
  const container = document.getElementById('supplier-insights');
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

renderSupplierInsights(SUPPLIER_INSIGHTS);

/* ---------- Supplier data ---------- */

let MOCK_SUPPLIERS = [
  {
    id: 'SUP-001', name: 'Gujarat Organics Co.', company: 'Gujarat Organics Pvt. Ltd.',
    contact: 'Rakesh Patel', phone: '+91 98250 11223', email: 'rakesh@gujaratorganics.in',
    address: 'Plot 14, GIDC Estate', city: 'Anand', state: 'Gujarat', pincode: '388001',
    gst: '24AAACG1234F1Z5', pan: 'AAACG1234F',
    bank: 'HDFC Bank', account: '50100234567890', ifsc: 'HDFC0001234',
    products: ['Amla Powder', 'Moringa Powder', 'Beetroot Powder'],
    outstanding: 18500, status: 'active', terms: 'Net 30', notes: 'Primary raw material supplier. Reliable on lead time.',
    purchases: [
      { date: '2026-06-24', desc: '100 kg Amla Powder', amount: 42000 },
      { date: '2026-06-10', desc: '50 kg Moringa Powder', amount: 21500 }
    ],
    returns: []
  },
  {
    id: 'SUP-002', name: 'Kutch Herbal Suppliers', company: 'Kutch Herbal Suppliers',
    contact: 'Meena Shah', phone: '+91 99250 44556', email: 'meena@kutchherbal.in',
    address: 'Industrial Area, Sector 3', city: 'Bhuj', state: 'Gujarat', pincode: '370001',
    gst: '24AAACK5678F1Z2', pan: 'AAACK5678F',
    bank: 'ICICI Bank', account: '60200987654321', ifsc: 'ICIC0002345',
    products: ['Beetroot Powder'],
    outstanding: 0, status: 'active', terms: 'Net 15', notes: 'Secondary supplier for beetroot during peak season.',
    purchases: [{ date: '2026-05-28', desc: '50 kg Beetroot Powder', amount: 18000 }],
    returns: [{ date: '2026-05-30', desc: '2 kg damaged in transit', amount: 720 }]
  },
  {
    id: 'SUP-003', name: 'Saurashtra AgriPack', company: 'Saurashtra AgriPack LLP',
    contact: 'Jignesh Vora', phone: '+91 97250 77889', email: 'jignesh@saurashtraagri.in',
    address: 'Nr. APMC Yard', city: 'Rajkot', state: 'Gujarat', pincode: '360001',
    gst: '24AAACS9012F1Z8', pan: 'AAACS9012F',
    bank: 'Axis Bank', account: '91020012345678', ifsc: 'UTIB0003456',
    products: ['Moringa Powder'],
    outstanding: 9600, status: 'inactive', terms: 'Net 30', notes: 'On hold since March — inconsistent quality.',
    purchases: [{ date: '2026-03-12', desc: '30 kg Moringa Powder', amount: 12600 }],
    returns: []
  }
];

const tbody = document.getElementById('suppliers-tbody');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search-input');
const filterCity = document.getElementById('filter-city');
const filterStatus = document.getElementById('filter-status');
const outstandingChip = document.getElementById('filter-outstanding');
let outstandingOnly = false;

function populateCityFilter() {
  const cities = [...new Set(MOCK_SUPPLIERS.map((s) => s.city))].sort();
  filterCity.innerHTML = '<option value="">All Cities</option>' +
    cities.map((city) => `<option value="${esc(city)}">${esc(city)}</option>`).join('');
}

function renderKpis() {
  const total = MOCK_SUPPLIERS.length;
  const active = MOCK_SUPPLIERS.filter((s) => s.status === 'active').length;
  const pending = MOCK_SUPPLIERS.filter((s) => s.outstanding > 0).length;
  const totalPurchaseValue = MOCK_SUPPLIERS.reduce(
    (sum, s) => sum + s.purchases.reduce((pSum, p) => pSum + p.amount, 0), 0
  );
  document.getElementById('kpi-total-suppliers').textContent = total;
  document.getElementById('kpi-active-suppliers').textContent = active;
  document.getElementById('kpi-pending-payments').textContent = pending;
  document.getElementById('kpi-total-purchase').textContent = AstraApp.formatCurrency(totalPurchaseValue);
}

function getFilteredSuppliers() {
  const query = searchInput.value.trim().toLowerCase();
  const city = filterCity.value;
  const status = filterStatus.value;

  return MOCK_SUPPLIERS.filter((s) => {
    const matchesQuery = !query ||
      s.name.toLowerCase().includes(query) ||
      s.id.toLowerCase().includes(query) ||
      s.contact.toLowerCase().includes(query) ||
      s.gst.toLowerCase().includes(query);
    const matchesCity = !city || s.city === city;
    const matchesStatus = !status || s.status === status;
    const matchesOutstanding = !outstandingOnly || s.outstanding > 0;
    return matchesQuery && matchesCity && matchesStatus && matchesOutstanding;
  });
}

function renderTable() {
  const suppliers = getFilteredSuppliers();
  emptyState.classList.toggle('hidden', suppliers.length > 0);

  tbody.innerHTML = suppliers.map((s) => `
    <tr data-id="${esc(s.id)}">
      <td>${esc(s.name)}</td>
      <td class="mono text-dim">${esc(s.id)}</td>
      <td>${esc(s.contact)}</td>
      <td class="mono">${esc(s.phone)}</td>
      <td>${esc(s.city)}</td>
      <td class="mono">${esc(s.gst)}</td>
      <td>${s.products.map((p) => `<span class="sup-product-tag">${esc(p)}</span>`).join('')}</td>
      <td class="mono ${s.outstanding > 0 ? 'text-amber' : 'text-dim'}">${s.outstanding > 0 ? AstraApp.formatCurrency(s.outstanding) : '—'}</td>
      <td><span class="sup-status-badge ${s.status}">${s.status === 'active' ? 'Active' : 'Inactive'}</span></td>
      <td>
        <div class="sup-row-actions">
          <button class="sup-icon-btn" data-view="${esc(s.id)}" aria-label="View supplier" title="View">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('tr').forEach((row) => {
    row.addEventListener('click', () => openDrawer(row.dataset.id));
  });
}

/* ---------- Drawer ---------- */

const drawer = document.getElementById('supplier-drawer');
const drawerOverlay = document.getElementById('drawer-overlay');

function openDrawer(id) {
  const s = MOCK_SUPPLIERS.find((sup) => sup.id === id);
  if (!s) return;

  document.getElementById('drawer-name').textContent = s.name;
  document.getElementById('drawer-code').textContent = s.id;
  document.getElementById('drawer-company').textContent = s.company || '—';
  document.getElementById('drawer-contact').textContent = s.contact;
  document.getElementById('drawer-phone').textContent = s.phone;
  document.getElementById('drawer-email').textContent = s.email || '—';
  document.getElementById('drawer-status').textContent = s.status === 'active' ? 'Active' : 'Inactive';
  document.getElementById('drawer-address').textContent = s.address || '—';
  document.getElementById('drawer-city').textContent = s.city;
  document.getElementById('drawer-state').textContent = s.state || '—';
  document.getElementById('drawer-pincode').textContent = s.pincode || '—';
  document.getElementById('drawer-gst').textContent = s.gst || '—';
  document.getElementById('drawer-pan').textContent = s.pan || '—';
  document.getElementById('drawer-bank').textContent = s.bank || '—';
  document.getElementById('drawer-account').textContent = s.account || '—';
  document.getElementById('drawer-ifsc').textContent = s.ifsc || '—';
  document.getElementById('drawer-products').innerHTML =
    s.products.map((p) => `<span class="sup-product-tag">${esc(p)}</span>`).join('');
  document.getElementById('drawer-purchases').innerHTML = s.purchases.length
    ? s.purchases.map((p) => `<div class="sup-drawer-list-item"><span>${esc(p.date)} — ${esc(p.desc)}</span><span class="mono">${AstraApp.formatCurrency(p.amount)}</span></div>`).join('')
    : '<div class="sup-drawer-list-empty">No purchases recorded yet.</div>';
  document.getElementById('drawer-returns').innerHTML = s.returns.length
    ? s.returns.map((r) => `<div class="sup-drawer-list-item"><span>${esc(r.date)} — ${esc(r.desc)}</span><span class="mono">${AstraApp.formatCurrency(r.amount)}</span></div>`).join('')
    : '<div class="sup-drawer-list-empty">No returns recorded.</div>';
  document.getElementById('drawer-outstanding').textContent =
    s.outstanding > 0 ? AstraApp.formatCurrency(s.outstanding) : '\u20B90 — settled';
  document.getElementById('drawer-notes').textContent = s.notes || 'No notes yet.';

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

/* ---------- Add Supplier modal ---------- */

const modal = document.getElementById('add-supplier-modal');
const modalOverlay = document.getElementById('modal-overlay');
const addForm = document.getElementById('add-supplier-form');

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

document.getElementById('btn-add-supplier').addEventListener('click', openModal);
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-cancel').addEventListener('click', closeModal);

document.getElementById('btn-record-purchase').addEventListener('click', () => {
  showToast('Record Purchase opens once the Purchase module (Module 04) is built.', 'info');
});
document.getElementById('btn-purchase-history').addEventListener('click', () => {
  showToast('Purchase History view opens once the Purchase module (Module 04) is built.', 'info');
});

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(addForm);
  const newSupplier = {
    id: `SUP-${String(MOCK_SUPPLIERS.length + 1).padStart(3, '0')}`,
    name: data.get('name'),
    company: data.get('company'),
    contact: data.get('name'),
    phone: data.get('phone'),
    email: data.get('email'),
    address: data.get('address'),
    city: data.get('city'),
    state: data.get('state'),
    pincode: data.get('pincode'),
    gst: data.get('gst'),
    pan: data.get('pan'),
    bank: data.get('bank'),
    account: data.get('account'),
    ifsc: data.get('ifsc'),
    products: (data.get('products') || '').split(',').map((p) => p.trim()).filter(Boolean),
    outstanding: Number(data.get('opening')) || 0,
    status: 'active',
    terms: data.get('terms'),
    notes: data.get('notes'),
    purchases: [],
    returns: []
  };
  MOCK_SUPPLIERS.push(newSupplier);
  populateCityFilter();
  renderKpis();
  renderTable();
  closeModal();
  showToast(`${newSupplier.name} added successfully.`, 'success');
});

/* ---------- Search / filter listeners ---------- */

searchInput.addEventListener('input', renderTable);
filterCity.addEventListener('change', renderTable);
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

/* ---------- Init ---------- */

populateCityFilter();
renderKpis();
renderTable();
