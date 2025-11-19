// Dashboard Escola – mock + render

document.addEventListener('DOMContentLoaded', () => {
  // Mock básico da escola
  const escola = {
    nome: 'Escola Técnica Futuro+',
    descricao:
      'Formação técnica focada em tecnologia, indústria 4.0 e habilidades digitais para o futuro do trabalho.',
    trilhasAtivas: 4,
    alunosMapeados: 320,
    parcerias: 7,
    tags: ['Tecnologia', 'Indústria 4.0', 'Cursos Técnicos', 'Programação'],
  };

  const trilhas = [
    {
      nome: 'Tecnologia e Programação Web',
      cargaHoraria: '240h',
      alunos: 110,
      taxaConclusao: 82,
      alinhamentoMercado: 'Alto',
      skillsChave: ['HTML', 'CSS', 'JavaScript', 'Git'],
      vagasConectadas: 5,
    },
    {
      nome: 'Automação Industrial & IoT',
      cargaHoraria: '280h',
      alunos: 80,
      taxaConclusao: 76,
      alinhamentoMercado: 'Muito alto',
      skillsChave: ['CLP', 'Redes Industriais', 'Sensores', 'IoT'],
      vagasConectadas: 3,
    },
    {
      nome: 'Dados & IA para Iniciantes',
      cargaHoraria: '200h',
      alunos: 65,
      taxaConclusao: 69,
      alinhamentoMercado: 'Médio',
      skillsChave: ['Lógica', 'Python básico', 'Noções de IA'],
      vagasConectadas: 2,
    },
    {
      nome: 'Soft Skills & Carreira',
      cargaHoraria: '60h',
      alunos: 65,
      taxaConclusao: 91,
      alinhamentoMercado: 'Transversal',
      skillsChave: ['Comunicação', 'Trabalho em Equipe', 'Planejamento'],
      vagasConectadas: 0,
    },
  ];

  const insightsIA = [
    {
      tipo: 'Ajuste de trilha',
      descricao:
        'Aumentar o foco em “IA generativa” e “Chatbots” na trilha de Dados & IA: 68% das vagas conectadas mencionam esses termos.',
    },
    {
      tipo: 'Oportunidade',
      descricao:
        'Criar um módulo curto sobre “Segurança em redes industriais” na trilha de Automação: 3 empresas parceiras já reportaram essa lacuna.',
    },
    {
      tipo: 'Requalificação',
      descricao:
        'Sugerir a trilha “Tecnologia e Programação Web” para alunos de cursos administrativos que demonstram interesse em migração de carreira.',
    },
  ];

  const conexoes = [
    {
      empresa: 'Voith Hydro Brasil',
      vagasRelacionadas: 2,
      trilhas: ['Automação Industrial & IoT', 'Soft Skills & Carreira'],
      status: 'Parceria ativa',
    },
    {
      empresa: 'TechNow Solutions',
      vagasRelacionadas: 3,
      trilhas: ['Tecnologia e Programação Web', 'Dados & IA para Iniciantes'],
      status: 'Nova parceria',
    },
    {
      empresa: 'Indústria 4.0 Global',
      vagasRelacionadas: 1,
      trilhas: ['Automação Industrial & IoT'],
      status: 'Mapeando trilhas',
    },
  ];

  // --------- Preenche Resumo ---------
  document.querySelector('[data-escola-nome]').textContent = escola.nome;
  document.querySelector('[data-escola-descricao]').textContent =
    escola.descricao;

  document.querySelector('[data-escola-trilhas-ativas]').textContent =
    escola.trilhasAtivas;
  document.querySelector('[data-escola-alunos]').textContent =
    escola.alunosMapeados;
  document.querySelector('[data-escola-parcerias]').textContent =
    escola.parcerias;

  const tagsContainer = document.querySelector('[data-escola-tags]');
  tagsContainer.innerHTML = '';
  escola.tags.forEach((tag) => {
    const span = document.createElement('span');
    span.className = 'resumo__tag';
    span.textContent = tag;
    tagsContainer.appendChild(span);
  });

  // --------- Lista de trilhas ---------
  const trilhasContainer = document.querySelector('[data-trilhas-lista]');
  trilhasContainer.innerHTML = '';

  trilhas.forEach((t) => {
    const card = document.createElement('article');
    card.className = 'trilha-card';

    card.innerHTML = `
      <div>
        <h3 class="trilha-card__titulo">${t.nome}</h3>
        <p class="trilha-card__meta">
          Carga horária: <strong>${t.cargaHoraria}</strong> · 
          Skills-chave: ${t.skillsChave.join(', ')}
        </p>
        <span class="trilha-card__pill">
          Alinhamento ao mercado: <strong>${t.alinhamentoMercado}</strong>
        </span>
      </div>
      <div class="trilha-card__stats">
        <span>Alunos mapeados: <strong>${t.alunos}</strong></span>
        <span>Taxa de conclusão: <strong>${t.taxaConclusao}%</strong></span>
        <span>Vagas conectadas: <strong>${t.vagasConectadas}</strong></span>
      </div>
      <div class="trilha-card__actions">
        <button class="btn btn--ghost" type="button">
          Ver detalhes da trilha
        </button>
        <button class="btn btn--primary" type="button">
          Conectar a nova vaga
        </button>
      </div>
    `;

    trilhasContainer.appendChild(card);
  });

  // --------- IA – insights ---------
  const alertaIA = document.querySelector('[data-ia-alerta]');
  const listaIA = document.querySelector('[data-ia-lista]');

  if (!insightsIA.length) {
    alertaIA.textContent =
      'Nenhum insight disponível no momento. Assim que tivermos dados suficientes, a IA começa a sugerir ajustes.';
  } else {
    alertaIA.textContent =
      'A IA analisou suas trilhas, vagas parceiras e matrizes de habilidades para sugerir os próximos ajustes.';
  }

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

  // --------- Conexões com o mercado ---------
  const conexoesGrid = document.querySelector('[data-conexoes-grid]');
  conexoesGrid.innerHTML = '';

  conexoes.forEach((c) => {
    const card = document.createElement('article');
    card.className = 'conexoes-card';

    card.innerHTML = `
      <h3 class="conexoes-card__empresa">${c.empresa}</h3>
      <p class="conexoes-card__info">
        Vagas conectadas: <strong>${c.vagasRelacionadas}</strong><br>
        Trilhas relacionadas: ${c.trilhas.join(', ')}
      </p>
      <span class="conexoes-card__badge">${c.status}</span>
    `;

    conexoesGrid.appendChild(card);
  });
});
