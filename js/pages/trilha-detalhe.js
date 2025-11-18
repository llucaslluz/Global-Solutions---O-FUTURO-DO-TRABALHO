// js/pages/trilha-detalhe.js
// Tela de detalhe da trilha:
// - Lê o ?id= na URL
// - Busca a trilha em window.d3mock.trilhas
// - Preenche o HTML com os dados
// - Usa a matriz do usuário só para futura integração (por enquanto, texto demo)

document.addEventListener('DOMContentLoaded', () => {
  // ------------------ Login / usuário atual ------------------
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
      console.warn('trilha-detalhe: erro ao acessar d3db:', err);
    }
  }

  // ------------------ Pega ID da trilha na URL ------------------
  const params = new URLSearchParams(window.location.search);
  const idParam = params.get('id');

  const trilhas = (window.d3mock && window.d3mock.trilhas) ? window.d3mock.trilhas : [];

  let trilha = null;

  if (idParam) {
    trilha = trilhas.find(t => String(t.id) === String(idParam));
  }

  if (!trilha && trilhas.length) {
    trilha = trilhas[0]; // fallback se id não existir
  }

  if (!trilha) {
    console.warn('trilha-detalhe: nenhuma trilha encontrada no d3-mock.');
    return;
  }

  // ------------------ Helpers ------------------
  function $(selector) {
    return document.querySelector(selector);
  }

  function setText(selector, value, fallback = '') {
    const el = $(selector);
    if (el) el.textContent = value || fallback;
  }

  // ------------------ Preenche cabeçalho ------------------
  setText('[data-trilha-tipo]', trilha.tipoLabel || trilha.tipo || 'Trilha');
  setText('[data-trilha-nome]', trilha.nome || 'Trilha sem nome');

  const resumo =
    trilha.resumo ||
    trilha.descricaoCurta ||
    'Trilha pensada para apoiar sua evolução profissional de forma guiada, conectando habilidades com oportunidades reais.';
  setText('[data-trilha-resumo]', resumo);

  // ------------------ Resumo principal ------------------
  const descricaoLonga =
    trilha.descricaoLonga ||
    trilha.descricao ||
    'Esta trilha combina fundamentos técnicos e habilidades comportamentais para que você consiga aplicar, na prática, o que está aprendendo e se aproximar das vagas desejadas.';

  setText('[data-trilha-descricao]', descricaoLonga);

  setText('[data-trilha-duracao]', trilha.duracao || trilha.duracaoEstimativa || '—');
  setText('[data-trilha-nivel]', trilha.nivelAlvo || trilha.nivel || '—');
  setText('[data-trilha-formato]', trilha.formato || 'Cursos online + projetos práticos');
  setText('[data-trilha-instituicao]', trilha.instituicao || trilha.instituicaoParceira || 'Parceiros D³');

  // ------------------ Etapas principais ------------------
  const stepsContainer = document.querySelector('[data-trilha-steps]');
  if (stepsContainer) {
    const passos = Array.isArray(trilha.passos) && trilha.passos.length
      ? trilha.passos
      : [
          {
            titulo: 'Fundamentos e base teórica',
            detalhe: 'Conceitos essenciais para entender o tema da trilha e criar uma base sólida.'
          },
          {
            titulo: 'Prática guiada',
            detalhe: 'Atividades e exercícios aplicados em cenários próximos da sua realidade.'
          },
          {
            titulo: 'Projeto prático',
            detalhe: 'Desenvolvimento de um projeto que conecte teoria, prática e sua área de atuação.'
          },
          {
            titulo: 'Preparação para oportunidades',
            detalhe: 'Orientações de como traduzir a trilha em currículo, portfólio e entrevistas.'
          }
        ];

    stepsContainer.innerHTML = passos
      .map(pass => {
        const titulo = typeof pass === 'string' ? pass : pass.titulo;
        const detalhe = typeof pass === 'string' ? '' : (pass.detalhe || '');
        return `
          <li>
            <strong>${titulo}</strong>
            ${detalhe ? `<span>${detalhe}</span>` : ''}
          </li>
        `;
      })
      .join('');
  }

  // ------------------ Conexão com a matriz ------------------
  const matrizTextEl = document.querySelector('[data-trilha-matriz-text]');
  if (matrizTextEl) {
    const foco = trilha.focoPrincipal || trilha.eixoPrincipal || 'habilidades técnicas e soft skills relacionadas';
    matrizTextEl.textContent =
      trilha.textoMatriz ||
      `Com base nos gaps identificados na sua matriz, esta trilha foi recomendada para fortalecer ${foco}, aumentando sua aderência às vagas relacionadas.`;
  }

  const beneficiosEl = document.querySelector('[data-trilha-beneficios]');
  if (beneficiosEl) {
    const beneficios = Array.isArray(trilha.beneficios) && trilha.beneficios.length
      ? trilha.beneficios
      : [
          'Reduz gaps nas habilidades mais críticas para as vagas alvo.',
          'Gera projetos e experiências que podem ser usados no seu portfólio.',
          'Ajuda a traduzir sua experiência atual para a nova área de atuação.'
        ];

    beneficiosEl.innerHTML = beneficios
      .map(txt => `<li>${txt}</li>`)
      .join('');
  }

  // ------------------ Ação: adicionar à jornada ------------------
  const btnAdd = document.getElementById('btnAddTrilha');
  if (btnAdd) {
    btnAdd.addEventListener('click', () => {
      // Nesta versão demo, só mostramos um alerta amigável.
      // Em uma versão com banco, aqui você marcaria a trilha como "em andamento" para o usuário.
      alert(
        `Trilha “${trilha.nome || 'Trilha'}” adicionada à sua jornada (demo).\n\n` +
        'Em uma versão conectada ao banco de dados, isso marcaria a trilha como "em andamento" ' +
        'e atualizaria o painel principal.'
      );
    });
  }

  console.log('trilha-detalhe: renderizada para trilha', trilha);
});
