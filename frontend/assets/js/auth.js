/* ===========================================================
   ASTRA — auth.js
   Shared by login.js (to log in) and every protected page's
   own <page>.js (to guard the route). Until backend/api/auth.py
   exists, there is no real authentication — login attempts the
   real API first, and falls back to an explicit, deterministic
   demo account (not "any credentials"). Remove the DEMO_USER
   block once the real backend is running.
   =========================================================== */

const DEMO_CREDENTIALS = { email: 'demo@astra.app', password: 'demo1234' };
const DEMO_USER = { name: 'Demo Admin', role: 'company_admin', company: "Friend's Powder Co." };

const AstraAuth = {
  async login(email, password) {
    try {
      const data = await AstraAPI.post('/auth/login', { email, password });
      AstraStorage.setToken(data.token);
      AstraStorage.setUser(data.user);
      return { success: true };
    } catch (err) {
      // ---- DEMO FALLBACK (remove once backend/api/auth.py is live) ----
      // Only the exact documented demo credentials succeed here —
      // this is not "any non-empty value logs in".
      if (email.trim().toLowerCase() === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
        AstraStorage.setToken('demo-token');
        AstraStorage.setUser(DEMO_USER);
        return { success: true, demo: true };
      }
      return { success: false, error: 'Invalid email or password. Use the demo credentials shown below, or Continue in Demo Mode.' };
    }
  },

  // Explicit, one-click demo path — no backend call attempted.
  loginDemo() {
    AstraStorage.setToken('demo-token');
    AstraStorage.setUser(DEMO_USER);
    return { success: true, demo: true };
  },

  logout() {
    AstraStorage.clearAll();
    window.location.href = '../login/login.html';
  },

  currentUser() {
    return AstraStorage.getUser();
  },

  // Call at the top of every protected page's JS file.
  // Throws after issuing the redirect so the rest of that page's
  // script never executes (prevents a flash of protected content
  // and prevents renderers from running against a missing user).
  requireAuth() {
    if (!AstraStorage.getToken()) {
      window.location.replace('../login/login.html');
      throw new Error('ASTRA_AUTH_REDIRECT');
    }
    return true;
  }
};
