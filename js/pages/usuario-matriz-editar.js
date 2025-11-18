// js/pages/usuario-matriz-editar.js
// Edição fictícia da matriz de habilidades, salvando no localStorage.

document.addEventListener('DOMContentLoaded', () => {
  let currentUser = null;

  // Valida login igual outras telas (se d3db existir)
  if (window.d3db) {
    try {
      window.d3db.seedDbIfEmpty();
      currentUser = window.d3db.getCurrentUser();

      if (!currentUser || currentUser.type !== 'user') {
        window.location.href = 'login.html';
        return;
      }
    } catch (err) {
      console.warn('Erro ao acessar d3db na matriz editar:', err);
    }
  }

  const matrixKey = currentUser && currentUser.id
    ? `d3_matrix_${currentUser.id}`
    : 'd3_matrix_demo';

  const rows = document.querySelectorAll('.matrix-edit-row');
  const btnSalvar = document.getElementById('btnSalvarMatriz') || document.querySelector('.btn.btn--primary');

  if (!rows.length || !btnSalvar) {
    console.warn('Matriz editar: linhas ou botão de salvar não encontrados.');
    return;
  }

  // Garante que botão e sliders não fiquem travados, mesmo se HTML tiver "disabled"
  btnSalvar.disabled = false;

  // Estrutura em memória da matriz
  let matrixData = [];

  // --------- Carrega matriz salva (se existir) ---------
  try {
    const saved = localStorage.getItem(matrixKey);
    if (saved) {
      matrixData = JSON.parse(saved);
    }
  } catch (err) {
    console.warn('Erro ao ler matriz do localStorage:', err);
  }

  // Se não existir nada salvo, criamos com base no que está no HTML
  if (!matrixData.length) {
    matrixData = Array.from(rows).map((row, index) => {
      const nameInput = row.querySelector('input[type="text"]');
      const axisSelect = row.querySelector('select');
      const ranges = row.querySelectorAll('input[type="range"]');

      const current = ranges[0] ? Number(ranges[0].value) || 0 : 0;
      const desired = ranges[1] ? Number(ranges[1].value) || 0 : 0;

      return {
        id: `skill_${index + 1}`,
        name: nameInput ? nameInput.value : '',
        axis: axisSelect ? axisSelect.value : 'tech',
        current,
        desired
      };
    });
  }

  // --------- Aplica dados na tela e configura eventos ---------
  rows.forEach((row, index) => {
    const data = matrixData[index] || {};
    const nameInput = row.querySelector('input[type="text"]');
    const axisSelect = row.querySelector('select');
    const levelBlocks = row.querySelectorAll('.matrix-level');
    const ranges = row.querySelectorAll('input[type="range"]');

    const currentBlock = levelBlocks[0];
    const desiredBlock = levelBlocks[1];

    const currentLabel = currentBlock
      ? currentBlock.querySelector('.matrix-level__label strong')
      : null;
    const desiredLabel = desiredBlock
      ? desiredBlock.querySelector('.matrix-level__label strong')
      : null;

    const currentRange = ranges[0] || null;
    const desiredRange = ranges[1] || null;

    // Habilita sliders caso venham com disabled no HTML
    if (currentRange) currentRange.disabled = false;
    if (desiredRange) desiredRange.disabled = false;

    // Preenche valores com o que temos em matrixData
    if (nameInput && data.name) nameInput.value = data.name;
    if (axisSelect && data.axis) axisSelect.value = data.axis;

    if (currentRange && typeof data.current === 'number') {
      currentRange.value = data.current;
      if (currentLabel) currentLabel.textContent = String(data.current);
    }

    if (desiredRange && typeof data.desired === 'number') {
      desiredRange.value = data.desired;
      if (desiredLabel) desiredLabel.textContent = String(data.desired);
    }

    // Eventos de alteração
    if (currentRange && currentLabel) {
      currentRange.addEventListener('input', () => {
        currentLabel.textContent = currentRange.value;
        if (matrixData[index]) {
          matrixData[index].current = Number(currentRange.value);
        }
      });
    }

    if (desiredRange && desiredLabel) {
      desiredRange.addEventListener('input', () => {
        desiredLabel.textContent = desiredRange.value;
        if (matrixData[index]) {
          matrixData[index].desired = Number(desiredRange.value);
        }
      });
    }

    if (nameInput) {
      nameInput.addEventListener('input', () => {
        if (matrixData[index]) {
          matrixData[index].name = nameInput.value;
        }
      });
    }

    if (axisSelect) {
      axisSelect.addEventListener('change', () => {
        if (matrixData[index]) {
          matrixData[index].axis = axisSelect.value;
        }
      });
    }
  });

  // --------- Salvar matriz (protótipo) ---------
  btnSalvar.addEventListener('click', (event) => {
    event.preventDefault();

    try {
      localStorage.setItem(matrixKey, JSON.stringify(matrixData));
      showFeedback('Matriz salva (somente neste navegador, para fins de protótipo).');
      console.log('Matriz salva:', matrixData);
    } catch (err) {
      console.error('Erro ao salvar matriz:', err);
      showFeedback('Não foi possível salvar a matriz (erro no navegador).');
    }
  });

  // --------- Feedback simples ---------
  function showFeedback(message) {
    let toast = document.querySelector('.matrix-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'matrix-toast';
      toast.style.position = 'fixed';
      toast.style.right = '1rem';
      toast.style.bottom = '1rem';
      toast.style.padding = '0.6rem 0.9rem';
      toast.style.borderRadius = '999px';
      toast.style.background = 'rgba(59, 130, 246, 0.9)';
      toast.style.color = '#eff6ff';
      toast.style.fontSize = '0.85rem';
      toast.style.zIndex = '9999';
      toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.35)';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = '1';

    setTimeout(() => {
      toast.style.opacity = '0';
    }, 2500);
  }
});
