// js/pages/usuario-trilhas.js
// Monta a lista de trilhas com base no window.d3mock.trilhas

document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.querySelector('[data-trilhas-list]');
  if (!listEl) {
    console.warn('usuario-trilhas: container [data-trilhas-list] não encontrado.');
    return;
  }

  const trilhas = (window.d3mock && window.d3mock.trilhas) ? window.d3mock.trilhas : [];
  if (!trilhas.length) {
    listEl.innerHTML = '<p class="section__subtitle">Nenhuma trilha disponível no momento.</p>';
    return;
  }

  function statusLabel(status) {
    if (status === 'em_andamento') return 'Em andamento';
    if (status === 'concluida') return 'Concluída';
    return 'Ainda não iniciada';
  }

  function statusClass(status) {
    if (status === 'em_andamento') return 'badge--trilha';
    if (status === 'concluida') return 'badge--upskilling';
    return 'badge--trilha';
  }

  listEl.innerHTML = '';

  trilhas.forEach(trilha => {
    const card = document.createElement('article');
    card.className = 'card trilha-card';
    card.dataset.trilhaId = trilha.id;

    const progresso = trilha.progresso ?? 0;

    card.innerHTML = `
      <span class="card__badge ${statusClass(trilha.status)}">
        ${statusLabel(trilha.status)}
      </span>
      <h3>${trilha.nome}</h3>
      <p>${trilha.resumo}</p>

      <ul class="list">
        <li><strong>Tipo:</strong> ${trilha.tipo}</li>
        <li><strong>Duração estimada:</strong> ${trilha.duracao}</li>
        <li><strong>Nível:</strong> ${trilha.nivel}</li>
        <li><strong>Instituição:</strong> ${trilha.instituicao || 'A definir'}</li>
      </ul>

      <div class="trilha-progress">
        <span>Progresso:</span>
        <div class="progress">
          <div class="progress__fill" style="width: ${progresso}%;"></div>
          <span class="progress__value">${progresso}%</span>
        </div>
      </div>

      <div class="trilha-actions">
        <button class="btn btn--ghost" data-ver-detalhes>Ver detalhes</button>
        <button class="btn btn--primary" data-ir-comparador>Comparar oportunidades</button>
      </div>
    `;

    // Botão "Ver detalhes" -> salva trilha e abre página de detalhe
    card.querySelector('[data-ver-detalhes]').addEventListener('click', () => {
      localStorage.setItem('d3_trilha_selecionada', trilha.id);
      window.location.href = 'trilha-detalhe.html';
    });

    // Botão "Comparar com oportunidades" -> salva trilha e abre comparador
    card.querySelector('[data-ir-comparador]').addEventListener('click', () => {
      localStorage.setItem('d3_trilha_selecionada', trilha.id);
      window.location.href = 'comparador.html';
    });

    listEl.appendChild(card);
  });
});
