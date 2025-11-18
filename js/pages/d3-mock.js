// js/mock/d3-mock.js
// Mock global de trilhas e vagas do D³

window.d3mock = window.d3mock || {};

if (!window.d3mock.trilhas) {
  window.d3mock.trilhas = [
    {
      id: 'trilha-dados',
      nome: 'Transição para área de Dados',
      tipo: 'Requalificação',
      duracao: '3–6 meses',
      nivel: 'Intermediário',
      focoEixos: ['tech', 'soft'],
      progresso: 40,
      status: 'em_andamento', // em_andamento | nao_iniciada | concluida
      resumo: 'Fundamentos de programação, SQL e criação de dashboards para migrar para área de dados.',
      instituicao: 'FIAP / Parceiros',
      extraMatch: 14, // usado no comparador
      boosts: {
        tech: 2,
        comm: 0.5,
        ai: 1
      },
      conteudo: [
        'Introdução a Python para dados',
        'SQL aplicado a dados de produção',
        'Dashboards e visualização (Power BI / similares)',
        'Mini-projeto integrando dados industriais'
      ]
    },
    {
      id: 'trilha-ia',
      nome: 'Fundamentos de IA aplicada ao trabalho',
      tipo: 'Upskilling',
      duracao: '1–3 meses',
      nivel: 'Iniciante / Intermediário',
      focoEixos: ['ai', 'soft'],
      progresso: 20,
      status: 'nao_iniciada',
      resumo: 'Uso prático de IA generativa e automação no dia a dia de trabalho.',
      instituicao: 'Escola Parceira',
      extraMatch: 18,
      boosts: {
        tech: 0.5,
        comm: 0.5,
        ai: 2
      },
      conteudo: [
        'Fundamentos de IA generativa',
        'Ferramentas de IA no dia a dia (texto, planilhas, código)',
        'Automação de tarefas repetitivas',
        'Boas práticas e limitações da IA'
      ]
    },
    {
      id: 'trilha-lideranca',
      nome: 'Liderança técnica em ambientes industriais',
      tipo: 'Upskilling',
      duracao: '3–4 meses',
      nivel: 'Intermediário / Avançado',
      focoEixos: ['soft', 'tech'],
      progresso: 0,
      status: 'nao_iniciada',
      resumo: 'Desenvolve habilidades de comunicação, tomada de decisão e liderança de equipes técnicas.',
      instituicao: 'Instituição Parceira',
      extraMatch: 10,
      boosts: {
        tech: 0.5,
        comm: 1.5,
        ai: 0
      },
      conteudo: [
        'Comunicação com times multidisciplinares',
        'Gestão de conflitos',
        'Planejamento e priorização',
        'Liderança em projetos de melhoria contínua'
      ]
    }
  ];
}

if (!window.d3mock.vagas) {
  window.d3mock.vagas = [
    {
      id: 'vaga-analista-dados-jr',
      titulo: 'Analista de Dados Júnior – Indústria',
      empresa: 'Indústria XYZ',
      local: 'São Paulo – SP',
      modalidade: 'Híbrido',
      senioridade: 'Júnior',
      eixoPrincipal: 'tech',
      descricaoCurta: 'Foco em indicadores de produção, manutenção e melhoria contínua.',
      requiredLevels: {
        tech: 4,
        comm: 4,
        process: 4,
        ai: 4
      }
    },
    {
      id: 'vaga-manutencao-40',
      titulo: 'Especialista em Manutenção 4.0',
      empresa: 'Grupo TecnoMaq',
      local: 'Campinas – SP',
      modalidade: 'Presencial',
      senioridade: 'Pleno',
      eixoPrincipal: 'process',
      descricaoCurta: 'Integração de sensores, dados e IA em plantas industriais.',
      requiredLevels: {
        tech: 3.5,
        comm: 3,
        process: 5,
        ai: 3
      }
    }
  ];
}

