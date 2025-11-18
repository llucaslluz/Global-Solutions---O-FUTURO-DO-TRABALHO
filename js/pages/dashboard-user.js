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

  // nome do usuário
  const nameEl = document.querySelector('[data-user-name]');
  if (nameEl) {
    nameEl.textContent = current.name || 'Usuário';
  }

  // tipo/perfil
  const roleEl = document.querySelector('[data-user-type]');
  if (roleEl) {
    roleEl.textContent = 'Perfil: Usuário';
  }

  // botão de sair
  const logoutBtn = document.querySelector('[data-logout]');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      window.d3db.clearCurrentUser();
      window.location.href = 'login.html';
    });
  }

  // preenchemos a mini-matriz com valores de exemplo.
  // Se você tiver algo no current (ex: current.skills), pode adaptar aqui.
  const skills = {
    tech: 65,
    comm: 50,
    lead: 35,
    ai: 45,
  };

  Object.entries(skills).forEach(([key, value]) => {
    const bar = document.querySelector(`.summary-row [data-skill-bar="${key}"]`);
    const label = document.querySelector(`.summary-value[data-skill-value="${key}"]`);

    if (bar) {
      // timeout para dar uma animadinha depois do load
      setTimeout(() => {
        bar.style.width = `${value}%`;
      }, 200);
    }

    if (label) {
      label.textContent = `${value}%`;
    }
  });

  console.log('Dashboard carregado para:', current);
});
