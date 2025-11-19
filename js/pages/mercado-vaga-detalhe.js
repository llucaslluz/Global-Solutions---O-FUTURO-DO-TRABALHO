// Tela Detalhe da Vaga – Mercado (mock simples)

document.addEventListener('DOMContentLoaded', () => {
  const vagasMock = [
    {
      id: 'tec-automacao',
      titulo: 'Técnico em Automação Industrial',
      meta: 'Pleno · Presencial · Turno comercial',
      descricao:
        'Responsável por atuar na manutenção, programação e ajuste de sistemas de automação industrial, com foco em CLP, redes industriais e integração com sistemas de supervisão.',
      matriz: [
        { skill: 'CLP (Siemens/Allen-Bradley)', importancia: 'Alta', nivel: 'Intermediário / Pleno' },
        { skill: 'Redes industriais (Profinet, Profibus)', importancia: 'Alta', nivel: 'Intermediário' },
        { skill: 'Leitura e interpretação de diagramas elétricos', importancia: 'Média', nivel: 'Intermediário' },
        { skill: 'Soft skills (comunicação, trabalho em equipe)', importancia: 'Média', nivel: 'Básico+' },
      ],
      talentos: [
        {
          nome: 'Lucas M.',
          match: 88,
          origem: 'Trilha Automação Industrial & IoT · Escola Técnica Futuro+',
          skillsMatch: ['CLP', 'Redes industriais', 'Soft skills'],
        },
        {
          nome: 'Ana B.',
          match: 82,
          origem: 'Trilha Programação & Automação · Escola TechNow',
          skillsMatch: ['CLP', 'Diagramas elétricos'],
        },
      ],
      ia: [
        {
          tipo: 'Sugestão',
          texto:
            'Considerar um módulo interno de capacitação em “Segurança em redes industriais” para elevar o match médio dos talentos.',
        },
        {
          tipo: 'Insight',
          texto:
            'Talentos com boa base em programação web têm se adaptado bem à parte lógica dos CLPs. Pode ser interessante ampliar o funil para essas trilhas.',
        },
      ],
    },
  ];

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || 'tec-automacao';
  const vaga = vagasMock.find((v) => v.id === id) || vagasMock[0];

  // Cabeçalho
  document.querySelector('[data-vaga-titulo]').textContent = vaga.titulo;
  document.querySelector('[data-vaga-meta]').textContent = vaga.meta;
  document.querySelector('[data-vaga-descricao]').textContent = vaga.descricao;

  // Matriz
  const matrizBody = document.querySelector('[data-vaga-matriz]');
  matrizBody.innerHTML = '';
  vaga.matriz.forEach((linha) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${linha.skill}</td>
      <td>${linha.importancia}</td>
      <td>${linha.nivel}</td>
    `;
    matrizBody.appendChild(tr);
  });

  // Talentos
  const talentosContainer = document.querySelector('[data-vaga-talentos]');
  talentosContainer.innerHTML = '';
  vaga.talentos.forEach((talento) => {
    const card = document.createElement('article');
    card.className = 'talento-card';
    card.innerHTML = `
      <div class="talento-header">
        <span class="talento-nome">${talento.nome}</span>
        <span class="talento-match">${talento.match}% de match</span>
      </div>
      <p class="talento-info">${talento.origem}</p>
      <p class="talento-skills">
        Principais skills em comum: ${talento.skillsMatch.join(', ')}
      </p>
    `;
    talentosContainer.appendChild(card);
  });

  // IA
  const iaLista = document.querySelector('[data-vaga-ia]');
  iaLista.innerHTML = '';
  vaga.ia.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'ia-item';
    li.innerHTML = `
      <span class="ia-item-tipo">${item.tipo}</span>
      <p>${item.texto}</p>
    `;
    iaLista.appendChild(li);
  });
});
