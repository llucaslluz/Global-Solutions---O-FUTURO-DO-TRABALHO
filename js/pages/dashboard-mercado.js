// Dashboard Mercado – mock + render

document.addEventListener('DOMContentLoaded', () => {
  const empresa = {
    nome: 'TechNow Solutions',
    descricao:
      'Empresa de tecnologia focada em soluções para indústria, dados e automação com IA.',
    vagasAbertas: 4,
    talentosMapeados: 58,
    escolasParceiras: 3,
    tags: ['Tecnologia', 'Indústria 4.0', 'Dados', 'Automação'],
  };

  const vagas = [
    {
      titulo: 'Técnico em Automação Industrial',
      senioridade: 'Pleno',
      modelo: 'Presencial · Turno comercial',
      trilhasConectadas: ['Automação Industrial & IoT'],
      candidatos: 12,
      matchMedio: 78,
      status: 'Analisando candidatos',
    },
    {
      titulo: 'Desenvolvedor Web Júnior',
      senioridade: 'Júnior',
      modelo: 'Híbrido · SP',
      trilhasConectadas: ['Tecnologia e Programação Web'],
      candidatos: 25,
      matchMedio: 83,
      status: 'Recebendo currículos',
    },
    {
      titulo: 'Analista de Dados Iniciante',
      senioridade: 'Estágio',
      modelo: 'Remoto',
      trilhasConectadas: ['Dados & IA para Iniciantes'],
      candidatos: 9,
      matchMedio: 71,
      status: 'Entrevistas agendadas',
    },
    {
      titulo: 'Operador de Produção 4.0',
      senioridade: 'Operacional',
      modelo: 'Presencial · 3 turnos',
      trilhasConectadas: ['Soft Skills & Carreira', 'Automação Industrial & IoT'],
      candidatos: 12,
      matchMedio: 69,
      status: 'Mapeando talentos internos',
    },
  ];

  const insightsIA = [
    {
      tipo: 'Tendência',
      descricao:
        'Aumento de 32% na procura por “IA generativa” entre talentos das trilhas de programação e dados nas últimas 4 semanas.',
    },
    {
      tipo: 'Alerta',
      descricao:
        'Baixa oferta de profissionais com “Segurança em redes industriais”. Considere abrir trilha interna de capacitação.',
    },
    {
      tipo: 'Sugestão',
      descricao:
        'Conectar a vaga de Desenvolvedor Web Júnior com trilhas de escolas que enfatizam “Git” e “Deploy em nuvem”.',
    },
  ];

  const skillsRadar = [
    {
      nome: 'Programação Web',
      presentes: 78,
      exigidas: 90,
    },
    {
      nome: 'Automação Industrial',
      presentes: 64,
      exigidas: 88,
    },
    {
      nome: 'Dados & Analytics',
      presentes: 52,
      exigidas: 80,
    },
    {
      nome: 'Soft Skills (comunicação)',
      presentes: 70,
      exigidas: 75,
    },
  ];

  // --------- Resumo empresa ---------
  document.querySelector('[data-mercado-nome]').textContent = empresa.nome;
  document.querySelector('[data-mercado-descricao]').textContent =
    empresa.descricao;

  document.querySelector('[data-mercado-vagas]').textContent =
    empresa.vagasAbertas;
  document.querySelector('[data-mercado-talentos]').textContent =
    empresa.talentosMapeados;
  document.querySelector('[data-mercado-escolas]').textContent =
    empresa.escolasParceiras;

  const tagsContainer = document.querySelector('[data-mercado-tags]');
  tagsContainer.innerHTML = '';
  empresa.tags.forEach((tag) => {
    const span = document.createElement('span');
    span.className = 'resumo__tag';
    span.textContent = tag;
    tagsContainer.appendChild(span);
  });

  // --------- Vagas & Talentos ---------
  const vagasContainer = document.querySelector('[data-vagas-lista]');
  vagasContainer.innerHTML = '';

  vagas.forEach((vaga) => {
    const card = document.createElement('article');
    card.className = 'vaga-card';

    card.innerHTML = `
      <div>
        <h3 class="vaga-card__titulo">${vaga.titulo}</h3>
        <p class="vaga-card__meta">
          ${vaga.senioridade} · ${vaga.modelo}
        </p>
        <span class="vaga-card__pill">
          Trilhas conectadas: ${vaga.trilhasConectadas.join(', ')}
        </span>
      </div>
      <div class="vaga-card__stats">
        <span>Talentos candidatos: <strong>${vaga.candidatos}</strong></span>
        <span>Match médio de habilidades: <strong>${vaga.matchMedio}%</strong></span>
      </div>
      <div class="vaga-card__actions">
        <button class="btn btn--ghost" type="button">
          Ver matriz de habilidades
        </button>
        <button class="btn btn--primary" type="button">
          Ver talentos recomendados
        </button>
        <span class="vaga-card__status">${vaga.status}</span>
      </div>
    `;

    vagasContainer.appendChild(card);
  });

  // --------- IA – tendências ---------
  const alertaIA = document.querySelector('[data-ia-alerta]');
  const listaIA = document.querySelector('[data-ia-lista]');

  alertaIA.textContent =
    'A IA analisou suas vagas, trilhas conectadas e o perfil dos talentos mapeados. Veja os destaques:';

  listaIA.innerHTML = '';
  insightsIA.forEach((insight) => {
    const li = document.createElement('li');
    li.className = 'ia__item';

    li.innerHTML = `
      <span class="ia__item-tipo">${insight.tipo}</span>
      <span class="ia__item-descricao">${insight.descricao}</span>
    `;
    listaIA.appendChild(li);
  });

  // --------- Radar de habilidades ---------
  const skillsGrid = document.querySelector('[data-skills-grid]');
  skillsGrid.innerHTML = '';

  skillsRadar.forEach((skill) => {
    const card = document.createElement('article');
    card.className = 'skills-card';

    const gap = skill.exigidas - skill.presentes;

    card.innerHTML = `
      <h3 class="skills-card__nome">${skill.nome}</h3>
      <div class="skills-card__linha">
        <span>Presente nos talentos: ${skill.presentes}%</span>
        <span>Exigido nas vagas: ${skill.exigidas}%</span>
      </div>
      <div class="skills-card__linha">
        <span>Gap aproximado:</span>
        <span><strong>${gap > 0 ? gap + '%' : 'OK'}</strong></span>
      </div>
      <div class="skills-card__barra">
        <div class="skills-card__barra-inner" style="width: ${
          skill.presentes
        }%;"></div>
      </div>
    `;

    skillsGrid.appendChild(card);
  });
});
