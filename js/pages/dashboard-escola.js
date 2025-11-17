// js/pages/dashboard-escola.js

document.addEventListener('DOMContentLoaded', () => {
  if (!window.d3db) return;

  window.d3db.seedDbIfEmpty();

  const current = window.d3db.getCurrentUser();

  // só entra aqui se for escola
  if (!current || current.type !== 'school') {
    window.location.href = 'login.html';
    return;
  }

  // nome da escola
  const nameEl = document.querySelector('[data-user-name]');
  if (nameEl) {
    nameEl.textContent = current.name;
  }

  // label do tipo
  const roleEl = document.querySelector('[data-user-type]');
  if (roleEl) {
    roleEl.textContent = 'Instituição de ensino';
  }

  // botão sair
  const logoutBtn = document.querySelector('[data-logout]');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      window.d3db.clearCurrentUser();
      window.location.href = 'login.html';
    });
  }

  console.log('Dashboard ESCOLA carregado para:', current);
});
