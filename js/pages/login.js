// js/login.js

document.addEventListener('DOMContentLoaded', () => {
  if (window.d3db) {
    window.d3db.seedDbIfEmpty();
  }
  initLoginPage();
});

function initLoginPage() {
  const form = document.getElementById('loginForm');
  const messageEl = document.getElementById('loginMessage');

  if (!form) return;

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (!window.d3db) return;

    const email = form.querySelector('#loginEmail').value.trim().toLowerCase();
    const password = form.querySelector('#loginPassword').value;

    messageEl.textContent = '';
    messageEl.className = 'auth-message';

    if (!email || !password) {
      showLoginError('Preencha e-mail e senha.');
      return;
    }

    const db = window.d3db.getDb();
    const user = db.users.find(
      (u) =>
        u.email.toLowerCase() === email &&
        u.password === password
    );

    if (!user) {
      showLoginError('E-mail ou senha inválidos.');
      return;
    }

    window.d3db.setCurrentUser(user);
    showLoginSuccess('Login realizado com sucesso!');

    setTimeout(() => {
      // Por enquanto volta para a home. Depois você pode mandar para um dashboard.
      window.location.href = 'index.html';
    }, 900);
  });

  function showLoginError(text) {
    messageEl.textContent = text;
    messageEl.className = 'auth-message auth-message--error';
  }

  function showLoginSuccess(text) {
    messageEl.textContent = text;
    messageEl.className = 'auth-message auth-message--success';
  }
}
