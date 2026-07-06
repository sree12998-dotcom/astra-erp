/* ===========================================================
   ASTRA — app.js
   Small shared utilities used across pages. Include after
   storage.js, api.js, auth.js on every protected page.
   =========================================================== */

const AstraApp = {
  formatCurrency(amount) {
    return '\u20B9' + Number(amount).toLocaleString('en-IN');
  },

  // Escapes text before it's interpolated into an innerHTML template
  // string. Use this for ANY dynamic value (mock data today, API data
  // later) that isn't already-trusted static markup (like an inline
  // SVG icon constant). Never skip this for user/API-controlled text.
  escapeHTML(value) {
    if (value === null || value === undefined) return '';
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  // Call once per page load, passing the current page's key
  // (must match a data-page attribute on a .sidebar-link).
  highlightActiveNav(pageKey) {
    document.querySelectorAll('.sidebar-link').forEach((link) => {
      link.classList.toggle('active', link.dataset.page === pageKey);
    });
  },

  // Renders the logged-in user's name/role into any element
  // with [data-user-name] / [data-user-role], and fills the
  // header avatar (#user-avatar) and sidebar footer avatar
  // (#sidebar-user-avatar) with initials, if present on the page.
  renderUserBadge() {
    const user = AstraAuth.currentUser();
    if (!user) return;
    document.querySelectorAll('[data-user-name]').forEach((el) => (el.textContent = user.name));
    document.querySelectorAll('[data-user-role]').forEach((el) => (el.textContent = user.role));

    const initials = user.name
      ? user.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
      : '??';
    const headerAvatar = document.getElementById('user-avatar');
    if (headerAvatar) headerAvatar.textContent = initials;
    const sidebarAvatar = document.getElementById('sidebar-user-avatar');
    if (sidebarAvatar) sidebarAvatar.textContent = initials;
  }
};
