/* ===========================================================
   ASTRA — settings.js

   TODO: once backend/api/settings.py exists, replace the
   MOCK_* constants below with calls to AstraAPI.get(...) and
   wire Save Changes / Invite User to real POST/PUT calls.
   =========================================================== */

AstraAuth.requireAuth();
AstraApp.highlightActiveNav('settings');
AstraApp.renderUserBadge();

document.getElementById('logout-btn').addEventListener('click', () => AstraAuth.logout());

const esc = AstraApp.escapeHTML;

// Header title is static markup on this page (see <header> in settings.html); AstraApp.renderUserBadge() above already fills the
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
  toast.className = `set-toast ${type}`;
  toast.innerHTML = `<span class="set-toast-icon">${toastIcons[type]}</span><span>${esc(message)}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

document.getElementById('btn-save-profile').addEventListener('click', () => {
  showToast('Company profile saved locally. Backend sync pending.', 'success');
});
document.getElementById('btn-invite-user').addEventListener('click', () => {
  showToast('Invite User form opens once user management is wired to the backend.', 'info');
});
document.getElementById('btn-manage-roles').addEventListener('click', () => {
  showToast('Role management opens once permissions are wired to the backend.', 'info');
});
document.getElementById('btn-configure-integration').addEventListener('click', () => {
  showToast('Integration setup opens once connectors are wired to the backend.', 'info');
});
document.getElementById('btn-change-password').addEventListener('click', () => {
  showToast('Password change opens once auth is wired to the backend.', 'info');
});
document.getElementById('btn-manage-sessions').addEventListener('click', () => {
  showToast('Session management opens once auth is wired to the backend.', 'info');
});

/* ---------- Mock data ---------- */

const USERS = [
  { name: 'Sree Hari', email: 'sree@gujaratorganics.in', role: 'Company Admin', status: 'active', lastLogin: 'Just now' },
  { name: 'Anita Rao', email: 'anita@gujaratorganics.in', role: 'Production Manager', status: 'active', lastLogin: 'Today, 8:02 AM' },
  { name: 'Vikram Nair', email: 'vikram@gujaratorganics.in', role: 'Production Manager', status: 'active', lastLogin: 'Yesterday, 6:40 PM' },
  { name: 'Suresh Malhotra', email: 'suresh@gujaratorganics.in', role: 'Packaging Operator', status: 'active', lastLogin: '2 days ago' },
  { name: 'Neha Kulkarni', email: 'neha@gujaratorganics.in', role: 'Quality Inspector', status: 'inactive', lastLogin: '18 days ago' }
];

const ROLES = [
  { role: 'Super Admin', scope: 'Full access — all companies (SaaS operator).' },
  { role: 'Company Admin', scope: 'Full access — this business only.' },
  { role: 'Production Manager', scope: 'Inventory, Production, Packaging, Batch Trace.' },
  { role: 'Sales Executive', scope: 'Sales, Customers.' },
  { role: 'Finance User', scope: 'Reports, Purchase invoices.' },
  { role: 'Viewer', scope: 'Read-only dashboard access.' }
];

const NOTIFICATIONS = [
  { label: 'Low stock alerts', sub: 'Notify when raw material falls below reorder level', checked: true },
  { label: 'Order confirmations', sub: 'Email a confirmation on every new sales order', checked: true },
  { label: 'Payment reminders', sub: 'Auto-remind customers with overdue payments', checked: false },
  { label: 'Quality inspection flags', sub: 'Notify supervisors when a batch fails inspection', checked: true },
  { label: 'Weekly summary email', sub: 'Send a weekly performance digest every Monday', checked: false }
];

const INTEGRATIONS = [
  { name: 'Barcode Scanner', desc: 'Scan batch codes for traceability and complaint lookup.', status: 'connected' },
  { name: 'Payment Gateway', desc: 'Accept online payments for e-commerce orders.', status: 'disconnected' },
  { name: 'SMS Notifications', desc: 'Send dispatch and payment SMS alerts to customers.', status: 'disconnected' }
];

/* ---------- Render: Users table ---------- */

function renderUsers(users) {
  const tbody = document.getElementById('users-tbody');
  tbody.innerHTML = users.map((u) => `
    <tr>
      <td>${esc(u.name)}</td>
      <td class="text-dim">${esc(u.email)}</td>
      <td><span class="set-role-badge">${esc(u.role)}</span></td>
      <td><span class="set-status-badge ${u.status}">${u.status === 'active' ? 'Active' : 'Inactive'}</span></td>
      <td class="text-dim">${esc(u.lastLogin)}</td>
      <td>
        <button class="set-icon-btn" title="Edit" aria-label="Edit user">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('.set-icon-btn').forEach((btn) => {
    btn.addEventListener('click', () => showToast('User editing opens once user management is wired to the backend.', 'info'));
  });
}

/* ---------- Render: Roles ---------- */

function renderRoles(roles) {
  const container = document.getElementById('roles-grid');
  container.innerHTML = roles.map((r) => `
    <div class="set-role-card">
      <span class="set-role-name">${esc(r.role)}</span>
      <span class="set-role-scope">${esc(r.scope)}</span>
    </div>
  `).join('');
}

/* ---------- Render: Notification toggles ---------- */

function renderNotifications(items) {
  const container = document.getElementById('notification-toggles');
  container.innerHTML = items.map((n, i) => `
    <div class="set-toggle-row">
      <div>
        <div class="set-toggle-label">${esc(n.label)}</div>
        <div class="set-toggle-sub">${esc(n.sub)}</div>
      </div>
      <label class="set-switch">
        <input type="checkbox" data-index="${i}" ${n.checked ? 'checked' : ''} />
        <span class="set-switch-track"></span>
      </label>
    </div>
  `).join('');

  container.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.addEventListener('change', () => {
      const item = items[Number(input.dataset.index)];
      showToast(`${item.label} ${input.checked ? 'enabled' : 'disabled'}.`, 'success');
    });
  });
}

/* ---------- Render: Integrations ---------- */

function renderIntegrations(items) {
  const container = document.getElementById('integration-grid');
  container.innerHTML = items.map((i) => `
    <div class="set-integration-card">
      <div class="set-integration-head">
        <span class="set-integration-name">${esc(i.name)}</span>
        <span class="set-integration-status ${i.status}">${i.status === 'connected' ? 'Connected' : 'Not Connected'}</span>
      </div>
      <span class="set-integration-desc">${esc(i.desc)}</span>
      <button class="btn btn-ghost set-integration-btn" data-name="${esc(i.name)}">
        ${i.status === 'connected' ? 'Manage' : 'Connect'}
      </button>
    </div>
  `).join('');

  container.querySelectorAll('.set-integration-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      showToast(`${btn.dataset.name} setup opens once connectors are wired to the backend.`, 'info');
    });
  });
}

/* ---------- Init ---------- */

renderUsers(USERS);
renderRoles(ROLES);
renderNotifications(NOTIFICATIONS);
renderIntegrations(INTEGRATIONS);
