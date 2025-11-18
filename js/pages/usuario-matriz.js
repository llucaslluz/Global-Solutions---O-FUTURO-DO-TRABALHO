// js/pages/usuario-matriz.js
// Tela "Minha matriz de habilidades" – monta a tabela dinamicamente
// usando os dados salvos em localStorage pela tela de edição.

document.addEventListener('DOMContentLoaded', () => {
  let currentUser = null;

  // Se existir d3db, valida login igual nas outras telas
  if (window.d3db) {
    try {
      window.d3db.seedDbIfEmpty();
      currentUser = window.d3db.getCurrentUser();

      if (!currentUser || currentUser.type !== 'user') {
        window.location.href = 'login.html';
        return;
      }
    } catch (err) {
      console.warn('Erro ao acessar d3db na matriz:', err);
    }
  }

  const matrixKey = currentUser && currentUser.id
    ? `d3_matrix_${currentUser.id}`
    : 'd3_matrix_demo';

  const matrixCard = document.querySelector('.matrix-card');
  const headerEl = matrixCard ? matrixCard.querySelector('.matrix-header') : null;

  if (!matrixCard || !headerEl) {
    console.warn('Matriz: elementos principais não encontrados.');
    return;
  }

  // --------- Funções auxiliares ---------

  const axisMeta = {
    tech: {
      label: 'Técnica',
      chipClass: 'matrix-chip--tech',
    },
    soft: {
      label: 'Comportamental',
      chipClass: 'matrix-chip--soft',
    },
    ai: {
      label: 'Inovação & IA',
      chipClass: 'matrix-chip--ai',
    },
  };

  function calcGap(current, desired) {
    const g = desired - current;
    return g < 0 ? 0 : g;
  }

  function gapClass(gap) {
    if (gap <= 1) return 'gap--small';
    if (gap <= 2) return 'gap--medium';
    return 'gap--high';
  }

  // Converte o HTML estático atual em dados (caso ainda não exista nada salvo)
  function readStaticRows() {
    const rows = matrixCard.querySelectorAll('.matrix-row');
    const data = [];

    rows.forEach((row, index) => {
      const spans = row.querySelectorAll('span');
      if (spans.length < 5) return;

      const name = spans[0].textContent.trim();
      const eixoText = spans[1].textContent.trim().toLowerCase();
      const current = Number(spans[2].textContent.trim()) || 0;
      const desired = Number(spans[3].textContent.trim()) || 0;

      let axis = 'tech';
      if (eixoText.includes('comport')) axis = 'soft';
      if (eixoText.includes('ia')) axis = 'ai';

      data.push({
        id: `skill_${index + 1}`,
        name,
        axis,
        current,
        desired,
      });
    });

    return data;
  }

  // Monta as linhas da matriz com base em um array de objetos
  function renderMatrix(matrixData) {
    // Remove linhas antigas
    const oldRows = matrixCard.querySelectorAll('.matrix-row');
    oldRows.forEach(row => row.remove());

    matrixData.forEach(item => {
      const row = document.createElement('div');
      row.className = 'matrix-row';

      const meta = axisMeta[item.axis] || axisMeta.tech;
      const gap = calcGap(item.current ?? 0, item.desired ?? 0);
      const gapCls = gapClass(gap);

      row.innerHTML = `
        <span>${item.name || ''}</span>
        <span class="matrix-chip ${meta.chipClass}">${meta.label}</span>
        <span>${item.current ?? 0}</span>
        <span>${item.desired ?? 0}</span>
        <span class="gap ${gapCls}">${gap}</span>
      `;

      matrixCard.appendChild(row);
    });
  }

  // --------- Carrega dados (localStorage ou HTML estático) ---------

  let matrixData = [];

  try {
    const saved = localStorage.getItem(matrixKey);
    if (saved) {
      matrixData = JSON.parse(saved);
    }
  } catch (err) {
    console.warn('Erro ao ler matriz do localStorage:', err);
  }

  if (!Array.isArray(matrixData) || !matrixData.length) {
    // Se não tiver nada salvo ainda, pega do HTML estático atual
    matrixData = readStaticRows();
    // opcional: já salvar isso como base
    try {
      localStorage.setItem(matrixKey, JSON.stringify(matrixData));
    } catch (err) {
      console.warn('Não foi possível salvar matriz base no localStorage:', err);
    }
  }

  // Renderiza a tabela dinâmica
  renderMatrix(matrixData);

  console.log('Matriz carregada:', matrixData);
});
