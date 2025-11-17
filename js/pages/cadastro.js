// js/cadastro.js

document.addEventListener('DOMContentLoaded', () => {
  if (window.d3db) {
    window.d3db.seedDbIfEmpty();
  }
  initCadastroPage();
});

function initCadastroPage() {
  const tabsContainer = document.getElementById('accountTypeTabs');
  const roleInput = document.getElementById('roleInput');
  const form = document.getElementById('signupForm');
  const messageEl = document.getElementById('signupMessage');

  if (!form || !roleInput) return;

  // troca de tipo de conta (Usuário / Escola / Empresa)
  if (tabsContainer) {
    tabsContainer.addEventListener('click', (evt) => {
      const btn = evt.target.closest('.auth-tab');
      if (!btn) return;

      const role = btn.dataset.role;
      if (!role) return;

      roleInput.value = role;

tabsContainer
  .querySelectorAll('.auth-tab')
  .forEach((t) => t.classList.remove('auth-tab--active'));

      btn.classList.add('auth-tab--active');
    });
  }

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (!window.d3db) return;

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim().toLowerCase();
    const password = form.querySelector('#password').value;
    const confirmPassword = form.querySelector('#confirmPassword').value;
    const role = roleInput.value || 'user';

    messageEl.textContent = '';
    messageEl.className = 'auth-message';

    if (!name || !email || !password || !confirmPassword) {
      showSignupError('Preencha todos os campos.');
      return;
    }

    if (password.length < 6) {
      showSignupError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      showSignupError('As senhas não conferem.');
      return;
    }

    const db = window.d3db.getDb();
    const emailExists = db.users.some(
      (u) => u.email.toLowerCase() === email
    );

    if (emailExists) {
      showSignupError('Já existe uma conta cadastrada com esse e-mail.');
      return;
    }

    const newId =
      db.users.length > 0
        ? Math.max(...db.users.map((u) => u.id || 0)) + 1
        : 1;

    const newUser = {
      id: newId,
      name,
      email,
      password,
      role // 'user' | 'school' | 'company'
    };

    db.users.push(newUser);
    window.d3db.saveDb(db);

    showSignupSuccess('Conta criada com sucesso! Redirecionando para o login...');

    // salva como logado opcionalmente e redireciona
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1200);
  });

  function showSignupError(text) {
    messageEl.textContent = text;
    messageEl.className = 'auth-message auth-message--error';
  }

  function showSignupSuccess(text) {
    messageEl.textContent = text;
    messageEl.className = 'auth-message auth-message--success';
  }
}
