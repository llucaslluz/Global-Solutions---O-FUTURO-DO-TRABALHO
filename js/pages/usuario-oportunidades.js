// js/pages/usuario-oportunidades.js
// Lista de vagas + compatibilidade simplificada baseada na matriz

document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.querySelector('[data-oportunidades-list]');
  if (!listEl) {
    console.warn('usuario-oportunidades: container [data-oportunidades-list] não encontrado.');
    return;
  }

  // ---- carrega usuário / matriz ----
  let currentUser = null;
  if (window.d3db) {
    try {
      window.d3db.seedDbIfEmpty();
      currentUser = window.d3db.getCurrentUser();
      if (!currentUser || currentUser.type !== 'user') {
        window.location.href = 'login.html';
        return;
      }
    } catch (err) {
      console.warn('Erro ao acessar d3db em oportunidades:', err);
    }
  }

  const matrixKey = currentUser && currentUser.id
    ? `d3_matrix_${currentUser.id}`
    : 'd3_matrix_demo';

  function loadMatrix() {
    try {
      const saved = localStorage.getItem(matrixKey);
      if (!saved) return [];
      const data = JSON.parse(saved);
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.warn('Erro ao ler matriz em oportunidades:', err);
      return [];
    }
  }

  function getUserProfileFromMatrix(matrixData) {
    const byAxis = { tech: [], soft: [], ai: [] };
    matrixData.forEach(item => {
      if (!item || typeof item.current !== 'number') return;
      if (item.axis === 'tech') byAxis.tech.push(item.current);
      if (item.axis === 'soft') byAxis.soft.push(item.current);
      if (item.axis === 'ai') byAxis.ai.push(item.current);
    });

    const avg = arr => (arr.length ? arr.reduce((s, v) => s + v, 0) / arr.length : null);

    const techAvg = avg(byAxis.tech);
    const softAvg = avg(byAxis.soft);
    const aiAvg = avg(byAxis.ai);

    return {
      tech: techAvg ?? 2,
      comm: softAvg ?? 3,
      process: 4,
      ai: aiAvg ?? 1.5
    };
  }

  function calcCompatibilidade(userProfile, vaga) {
    const required = vaga.requiredLevels || { tech: 4, comm: 4, process: 4, ai: 4 };
    const axes = ['tech', 'comm', 'process', 'ai'];

    let totalScore = 0;
    let totalMax = 0;

    axes.forEach(axis => {
      const userLevel = userProfile[axis] ?? 0;
      const reqLevel = required[axis] ?? 0;
      const contribution = Math.min(userLevel, reqLevel);
      totalScore += contribution;
      totalMax += reqLevel || 5;
    });

    if (!totalMax) return 0;
    return Math.round((totalScore / totalMax) * 100);
  }

  // ---- dados e render ----
  const vagas = (window.d3mock && window.d3mock.vagas) ? window.d3mock.vagas : [];
  const matrix = loadMatrix();
  const userProfile = getUserProfileFromMatrix(matrix);

  if (!vagas.length) {
    listEl.innerHTML = '<p class="section__subtitle">Ainda não há oportunidades cadastradas.</p>';
    return;
  }

  listEl.innerHTML = '';

  vagas.forEach(vaga => {
    const compat = calcCompatibilidade(userProfile, vaga);

    const card = document.createElement('article');
    card.className = 'card oportunidade-card';

    card.innerHTML = `
      <span class="card__badge badge--company">${vaga.empresa}</span>
      <h3>${vaga.titulo}</h3>
      <p>${vaga.descricaoCurta}</p>

      <ul class="list">
        <li><strong>Local:</strong> ${vaga.local}</li>
        <li><strong>Modalidade:</strong> ${vaga.modalidade}</li>
        <li><strong>Senioridade:</strong> ${vaga.senioridade}</li>
      </ul>

      <div class="oportunidade-match">
        <span>Compatibilidade estimada com seu perfil:</span>
        <div class="progress">
          <div class="progress__fill" style="width: ${compat}%;"></div>
          <span class="progress__value">${compat}%</span>
        </div>
      </div>

      <div class="oportunidade-actions">
        <button class="btn btn--ghost" disabled>Ver detalhes da vaga (demo)</button>
        <button class="btn btn--primary" onclick="location.href='comparador.html'">
          Comparar em detalhes
        </button>
      </div>
    `;

    listEl.appendChild(card);
  });
});
