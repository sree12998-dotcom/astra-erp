/* ===========================================================
   ASTRA — api.js
   Thin fetch wrapper. When the Python backend exists, this is
   the ONLY file that needs the real base URL — every page calls
   AstraAPI.get()/post() and never touches fetch() directly.

   TODO: once backend/main.py is running, change API_BASE_URL
   below to wherever it's hosted (e.g. http://localhost:8000/api).
   =========================================================== */

const API_BASE_URL = 'http://localhost:8000/api';

async function astraRequest(path, options = {}) {
  const token = AstraStorage.getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `Request failed (${response.status})`);
  }

  if (response.status === 204) return null;
  return response.json();
}

const AstraAPI = {
  get(path) {
    return astraRequest(path, { method: 'GET' });
  },
  post(path, body) {
    return astraRequest(path, { method: 'POST', body: JSON.stringify(body) });
  },
  put(path, body) {
    return astraRequest(path, { method: 'PUT', body: JSON.stringify(body) });
  },
  delete(path) {
    return astraRequest(path, { method: 'DELETE' });
  }
};
