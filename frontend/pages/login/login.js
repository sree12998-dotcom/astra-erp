/* ASTRA — login.js */

const form = document.getElementById('login-form');
const errorBox = document.getElementById('login-error');
const submitBtn = document.getElementById('login-submit');
const demoBtn = document.getElementById('demo-mode-btn');

// If already authenticated, skip straight to the dashboard.
if (AstraStorage.getToken()) {
  window.location.replace('../dashboard/dashboard.html');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorBox.textContent = '';
  submitBtn.disabled = true;
  submitBtn.textContent = 'Signing in...';

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  const result = await AstraAuth.login(email, password);

  if (result.success) {
    window.location.href = '../dashboard/dashboard.html';
  } else {
    errorBox.textContent = result.error || 'Unable to sign in.';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Sign in';
  }
});

demoBtn.addEventListener('click', () => {
  AstraAuth.loginDemo();
  window.location.href = '../dashboard/dashboard.html';
});
