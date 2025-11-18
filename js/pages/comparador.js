// js/pages/comparador.js
// Comparador do D³ usando:
// - matriz do usuário (salva em localStorage)
// - trilhas e vagas do window.d3mock

document.addEventListener('DOMContentLoaded', () => {
  const comparadorItems = document.querySelectorAll('.comparador-item');
  const tableContainer = document.querySelector('.comparador-table');
  const valuePerfilVagaEl = document.querySelector('.comparador-value--main');
  const valueAfterTrilhaEl = document.querySelector('.comparador-value--after');

  if (!comparadorItems.length || !tableContainer || !valuePerfilVagaEl || !valueAfterTrilhaEl) {
    console.warn('Comparador: elementos principais não encontrados.');
    return;
  }

  // -------------------- Login / chave da matriz --------------------
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
      console.warn('Erro ao acessar d3db no comparador:', err);
    }
  }

  const matrixKey = currentUser && currentUser.id
    ? `d3_matrix_${currentUser.id}`
    : 'd3_matrix_demo';

  // -------------------- Helpers de agregação da matriz --------------------

  function loadMatrix() {
    try {
      const saved = localStorage.getItem(matrixKey);
      if (!saved) return [];
      const data = JSON.parse(saved);
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.warn('Erro ao ler matriz no comparador:', err);
      return [];
    }
  }

  // Calcula o "perfil" do usuário (0–5) por eixo
  function getUserProfileFromMatrix(matrixData) {
    const byAxis = { tech: [], soft: [], ai: [] };

    matrixData.forEach(item => {
      if (!item || typeof item.current !== 'number') return;
      if (item.axis === 'tech') byAxis.tech.push(item.current);
      if (item.axis === 'soft') byAxis.soft.push(item.current);
      if (item.axis === 'ai') byAxis.ai.push(item.current);
    });

    const avg = arr =>
      arr.length ? arr.reduce((s, v) => s + v, 0) / arr.length : null;

    const techAvg = avg(byAxis.tech);
    const softAvg = avg(byAxis.soft);
    const aiAvg = avg(byAxis.ai);

    // Fallbacks caso não tenha nada na matriz ainda
    return {
      tech: techAvg ?? 2,      // Habilidades técnicas
      comm: softAvg ?? 3,      // Comunicação (vem do eixo soft)
      process: 4,              // Por enquanto fixo; poderia vir de outro eixo no futuro
      ai: aiAvg ?? 1.5         // Fundamentos de IA
    };
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function formatGapClass(gap) {
    if (gap <= 0.5) return 'gap--small';
    if (gap <= 2) return 'gap--medium';
    return 'gap--high';
  }

  function formatGapText(gap) {
    if (gap <= 0.5) return '0–1';
    if (gap <= 2) return '1–2';
    return '> 2';
  }

  function buildProgressHtml(level) {
    const pct = clamp((level / 5) * 100, 0, 100);
    const label = `${level.toFixed(1).replace('.0', '')} / 5`;

    return `
      <div class="progress">
        <div class="progress__fill" style="width: ${pct}%;"></div>
        <span class="progress__value">${label}</span>
      </div>
    `;
  }

  // -------------------- Dados (vagas + trilhas) --------------------

  const axesMeta = {
    tech: { label: 'Habilidades técnicas (dados)' },
    comm: { label: 'Comunicação com times multidisciplinares' },
    process: { label: 'Visão de processos industriais' },
    ai: { label: 'Fundamentos de IA aplicada' }
  };

  const vagas = (window.d3mock && window.d3mock.vagas) ? window.d3mock.vagas : [];
  const trilhasMock = (window.d3mock && window.d3mock.trilhas) ? window.d3mock.trilhas : [];

  // Garante pelo menos 2 trilhas com os campos que o comparador espera
  const trilhas = trilhasMock.map(t => ({
    id: t.id,
    nome: t.nome,
    extraMatch: t.extraMatch ?? 10,
    boosts: t.boosts ?? { tech: 1, comm: 1, ai: 1 }
  }));

  if (!vagas.length || !trilhas.length) {
    console.warn('Comparador: sem dados de vagas ou trilhas no d3mock.');
  }

  // Estado do comparador
  const state = {
    vagaIndex: 0,
    trilhaIndex: 0
  };

  // Assumindo primeiros 2 .comparador-item = vagas, últimos 2 = trilhas
  const vagaButtons = Array.from(comparadorItems).slice(0, 2);
  const trilhaButtons = Array.from(comparadorItems).slice(2);

  // -------------------- Renderização --------------------

  function renderComparador() {
    const matrixData = loadMatrix();
    const userProfile = getUserProfileFromMatrix(matrixData);

    const vaga = vagas[state.vagaIndex] || vagas[0];
    const trilha = trilhas[state.trilhaIndex] || trilhas[0];

    if (!vaga || !trilha) return;

    // Ativa botões visuais
    vagaButtons.forEach((btn, idx) => {
      btn.classList.toggle('comparador-item--active', idx === state.vagaIndex);
    });
    trilhaButtons.forEach((btn, idx) => {
      btn.classList.toggle('comparador-item--active', idx === state.trilhaIndex);
    });

    // Calcula match base (perfil x vaga) de forma simples
    const required = vaga.requiredLevels || { tech: 4, comm: 4, process: 4, ai: 4 };

    const axes = ['tech', 'comm', 'process', 'ai'];
    let totalScore = 0;
    let totalMax = 0;

    axes.forEach(axis => {
      const userLevel = userProfile[axis] ?? 0;
      const reqLevel = required[axis] ?? 0;
      // quanto mais perto ou acima do requisito, melhor (limitado ao requisito)
      const contribution = Math.min(userLevel, reqLevel);
      totalScore += contribution;
      totalMax += reqLevel || 5;
    });

    let baseMatch = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;
    baseMatch = clamp(baseMatch, 0, 100);

    const afterMatch = clamp(baseMatch + (trilha.extraMatch ?? 10), 0, 100);

    valuePerfilVagaEl.textContent = `${baseMatch}%`;
    valueAfterTrilhaEl.textContent = `${afterMatch}%`;

    // Monta tabela
    const headerHtml = `
      <div class="comparador-table__header">
        <span>Eixo de habilidade</span>
        <span>Seu nível atual</span>
        <span>Nível exigido pela vaga</span>
        <span>Quanto a trilha ajuda</span>
        <span>Gap restante</span>
      </div>
    `;

    const rowsHtml = axes.map(axisKey => {
      const axis = axesMeta[axisKey];
      const userLevel = userProfile[axisKey] ?? 0;
      const requiredLevel = required[axisKey] ?? userLevel;
      const boost = (trilha.boosts && trilha.boosts[axisKey]) ? trilha.boosts[axisKey] : 0;

      const afterTrilhaLevel = userLevel + boost;
      const gapRemaining = clamp(requiredLevel - afterTrilhaLevel, 0, 5);

      const gapCls = formatGapClass(gapRemaining);
      const gapText = formatGapText(gapRemaining);

      const helpText = boost > 0
        ? `+${boost.toFixed(1).replace('.0', '')} ponto(s) com a trilha`
        : 'Impacto indireto';

      return `
        <div class="comparador-table__row">
          <span>${axis.label}</span>
          <span>${buildProgressHtml(userLevel)}</span>
          <span>${requiredLevel.toFixed(1).replace('.0', '')} / 5</span>
          <span>${helpText}</span>
          <span class="gap ${gapCls}">${gapText}</span>
        </div>
      `;
    }).join('');

    tableContainer.innerHTML = headerHtml + rowsHtml;
  }

  // Eventos
  vagaButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      if (state.vagaIndex !== idx) {
        state.vagaIndex = idx;
        renderComparador();
      }
    });
  });

  trilhaButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      if (state.trilhaIndex !== idx) {
        state.trilhaIndex = idx;
        renderComparador();
      }
    });
  });

  // Render inicial
  renderComparador();
});
