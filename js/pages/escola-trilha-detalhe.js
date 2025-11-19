// Tela Detalhe da Trilha – Escola (mock simples)

document.addEventListener('DOMContentLoaded', () => {
  const trilhasMock = [
    {
      id: 'tec-web',
      nome: 'Tecnologia e Programação Web',
      modalidade: 'Formação • Presencial / Online',
      descricao:
        'Trilha focada em desenvolvimento web moderno, com HTML, CSS, JavaScript e fundamentos de versionamento com Git.',
      cargaHoraria: '240h',
      alunosMapeados: 110,
      taxaConclusao: '82%',
      vagasConectadas: 5,
      skills: ['HTML', 'CSS', 'JavaScript', 'Git', 'Versionamento', 'Lógica'],
      turmas: [
        { nome: '2025.1 – Noite', alunos: 38, conclusao: '80%' },
        { nome: '2025.1 – Tarde', alunos: 32, conclusao: '83%' },
        { nome: '2024.2 – Noite', alunos: 40, conclusao: '84%' },
      ],
      vagas: [
        {
          titulo: 'Desenvolvedor Web Júnior',
          empresa: 'TechNow Solutions',
          modelo: 'Híbrido · SP',
        },
        {
          titulo: 'Estagiário Front-end',
          empresa: 'StartupX',
          modelo: 'Remoto',
        },
      ],
      ia: [
        {
          tipo: 'Ajuste de trilha',
          texto:
            'Adicionar um módulo introdutório sobre “Acessibilidade Web”, já presente em 42% das descrições de vagas conectadas.',
        },
        {
          tipo: 'Oportunidade',
          texto:
            'Criar projeto integrador com deploy em nuvem: 3 empresas parceiras apontaram essa habilidade como diferencial.',
        },
      ],
    },
  ];

  // pega id= da URL, se não tiver usa primeira
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || 'tec-web';
  const trilha = trilhasMock.find((t) => t.id === id) || trilhasMock[0];

  // Preenche cabeçalho
  document.querySelector('[data-trilha-nome]').textContent = trilha.nome;
  document.querySelector('[data-trilha-modalidade]').textContent =
    trilha.modalidade;
  document.querySelector('[data-trilha-descricao]').textContent =
    trilha.descricao;

  document.querySelector('[data-trilha-carga]').textContent =
    trilha.cargaHoraria;
  document.querySelector('[data-trilha-alunos]').textContent =
    trilha.alunosMapeados;
  document.querySelector('[data-trilha-conclusao]').textContent =
    trilha.taxaConclusao;
  document.querySelector('[data-trilha-vagas]').textContent =
    trilha.vagasConectadas;

  // Skills
  const skillsContainer = document.querySelector('[data-trilha-skills]');
  skillsContainer.innerHTML = '';
  trilha.skills.forEach((skill) => {
    const span = document.createElement('span');
    span.className = 'chip';
    span.textContent = skill;
    skillsContainer.appendChild(span);
  });

  // Turmas
  const tbody = document.querySelector('[data-trilha-turmas]');
  tbody.innerHTML = '';
  trilha.turmas.forEach((turma) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${turma.nome}</td>
      <td>${turma.alunos}</td>
      <td>${turma.conclusao}</td>
    `;
    tbody.appendChild(tr);
  });

  // IA
  const iaLista = document.querySelector('[data-ia-lista]');
  iaLista.innerHTML = '';
  trilha.ia.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'ia-item';
    li.innerHTML = `
      <span class="ia-item-tipo">${item.tipo}</span>
      <p>${item.texto}</p>
    `;
    iaLista.appendChild(li);
  });

  // Vagas conectadas
  const vagasContainer = document.querySelector('[data-trilha-vagas-lista]');
  vagasContainer.innerHTML = '';
  trilha.vagas.forEach((vaga) => {
    const card = document.createElement('article');
    card.className = 'vaga-card';
    card.innerHTML = `
      <div class="vaga-card-titulo">${vaga.titulo}</div>
      <div class="vaga-card-meta">
        ${vaga.empresa} · ${vaga.modelo}
      </div>
    `;
    vagasContainer.appendChild(card);
  });
});
