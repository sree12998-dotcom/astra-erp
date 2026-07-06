/* ===========================================================
   ASTRA — storage.js
   Single place that touches localStorage. If we ever change
   how sessions are persisted, this is the only file that changes.
   =========================================================== */

const AstraStorage = {
  setToken(token) {
    localStorage.setItem('astra_token', token);
  },
  getToken() {
    return localStorage.getItem('astra_token');
  },
  clearToken() {
    localStorage.removeItem('astra_token');
  },
  setUser(user) {
    localStorage.setItem('astra_user', JSON.stringify(user));
  },
  getUser() {
    const raw = localStorage.getItem('astra_user');
    return raw ? JSON.parse(raw) : null;
  },
  clearAll() {
    localStorage.removeItem('astra_token');
    localStorage.removeItem('astra_user');
  }
};
