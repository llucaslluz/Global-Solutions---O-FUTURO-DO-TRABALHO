// js/pages/dashboard-user.js

document.addEventListener('DOMContentLoaded', () => {
  if (!window.d3db) return;

  window.d3db.seedDbIfEmpty();

  const current = window.d3db.getCurrentUser();

  // se não tiver logado ou não for "user", manda pro login
  if (!current || current.type !== 'user') {
    window.location.href = 'login.html';
    return;
  }

  // coloca nome do usuário na página
  const nameEl = document.querySelector('[data-user-name]');
  if (nameEl) {
    nameEl.textContent = current.name;
  }

  // exemplo de mostrar tipo em algum lugar
  const roleEl = document.querySelector('[data-user-type]');
  if (roleEl) {
    roleEl.textContent = 'Usuário';
  }

  // botão de sair (se você quiser)
  const logoutBtn = document.querySelector('[data-logout]');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      window.d3db.clearCurrentUser();
      window.location.href = 'login.html';
    });
  }

  console.log('Dashboard carregado para:', current);
});
