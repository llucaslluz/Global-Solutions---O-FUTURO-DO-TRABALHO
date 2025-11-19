/* =====================================================
   MOCK DE DADOS DO D³ – Decisões, Dados e Destinos
   Usado enquanto não conectamos em back-end real
   ===================================================== */

window.d3mock = window.d3mock || {};

/* =====================================================
   USUÁRIO DEMO (opcional, mais conceitual)
   ===================================================== */
window.d3mock.currentUser = {
  id: 1,
  nome: "Lucas Morais",
  type: "user"
};

/* =====================================================
   MATRIZ DE HABILIDADES MOCKADA
   (usada para montar perfil e gaps)
   ===================================================== */

window.d3mock.matrix = [
  {
    id: 1,
    nome: "Lógica de Programação",
    axis: "tech",
    current: 3,
    desired: 5
  },
  {
    id: 2,
    nome: "SQL",
    axis: "tech",
    current: 2,
    desired: 5
  },
  {
    id: 3,
    nome: "Dashboards / BI",
    axis: "tech",
    current: 1,
    desired: 4
  },
  {
    id: 4,
    nome: "Comunicação",
    axis: "soft",
    current: 3,
    desired: 5
  },
  {
    id: 5,
    nome: "Trabalho em equipe",
    axis: "soft",
    current: 2,
    desired: 4
  },
  {
    id: 6,
    nome: "Fundamentos de IA",
    axis: "ai",
    current: 1.5,
    desired: 4
  }
];

/* =====================================================
   TRILHAS RECOMENDADAS
   - usadas em:
     • usuario-trilhas
     • trilha-detalhe
     • comparador
     • ia-engine (boosts)
   ===================================================== */

window.d3mock.trilhas = [
  {
    id: 1,
    nome: "Transição para área de Dados",
    tipo: "requalificacao",
    tipoLabel: "Requalificação",

    resumo:
      "Trilha para quem vem de áreas técnicas/industriais e quer migrar para dados.",
    descricaoCurta:
      "Foco em fundamentos de programação, SQL, tratamento de dados e dashboards.",

    descricaoLonga:
      "Nesta trilha você aprende os principais fundamentos para migrar para a área de dados, passando por lógica de programação, SQL, tratamento de dados e criação de dashboards profissionais. A proposta é aproveitar sua experiência atual na indústria para trabalhar com dados de forma aplicada.",

    duracao: "3–6 meses",
    duracaoEstimativa: "3–6 meses",
    nivelAlvo: "Intermediário",
    nivel: "Intermediário",
    formato: "Online + projetos práticos",
    instituicao: "FIAP / Parceiros",
    instituicaoParceira: "FIAP / Parceiros",

    passos: [
      {
        titulo: "Fundamentos de lógica e programação",
        detalhe: "Estruturas básicas, controle de fluxo e boas práticas iniciais."
      },
      {
        titulo: "SQL aplicado",
        detalhe: "Consultas, joins, agregações e relatórios com banco de dados."
      },
      {
        titulo: "Tratamento de dados",
        detalhe: "Limpeza, transformação e organização de dados para análise."
      },
      {
        titulo: "Dashboards / BI",
        detalhe:
          "Criação de painéis em Power BI ou similar com foco em indicadores."
      }
    ],

    beneficios: [
      "Reduz gaps em habilidades técnicas (programação, SQL e BI).",
      "Gera um projeto de dashboard para portfólio.",
      "Aumenta a aderência a vagas de Analista de Dados Júnior."
    ],

    eixoPrincipal: "habilidades técnicas (dados)",
    focoPrincipal: "habilidades técnicas em dados",

    // usado pela IA / comparador
    extraMatch: 12,
    boosts: {
      tech: 2.0,
      comm: 0.5,
      process: 0.5,
      ai: 1.0
    }
  },

  {
    id: 2,
    nome: "Fundamentos de IA aplicada ao trabalho",
    tipo: "upskilling",
    tipoLabel: "Upskilling",

    resumo:
      "Trilha para aplicar IA generativa e automação no dia a dia profissional.",
    descricaoCurta:
      "Aprenda a usar IA generativa, automações e assistentes inteligentes em tarefas reais.",

    descricaoLonga:
      "Aqui você aprende, na prática, como usar modelos de IA generativa, ferramentas de automação e fluxos inteligentes para aumentar sua produtividade no trabalho. A trilha passa por conceitos básicos, criação de prompts eficientes e construção de rotinas automatizadas.",

    duracao: "1–3 meses",
    duracaoEstimativa: "1–3 meses",
    nivelAlvo: "Iniciante / Intermediário",
    nivel: "Iniciante / Intermediário",
    formato: "Online + desafios práticos",
    instituicao: "Escola Parceira",
    instituicaoParceira: "Escola Parceira",

    passos: [
      {
        titulo: "Fundamentos de IA generativa",
        detalhe: "O que é, como funciona e onde aplicar com segurança."
      },
      {
        titulo: "Ferramentas de IA no dia a dia",
        detalhe:
          "Uso de assistentes e automações para tarefas administrativas e técnicas."
      },
      {
        titulo: "Criação de fluxos automatizados",
        detalhe: "Integração de ferramentas para eliminar tarefas repetitivas."
      },
      {
        titulo: "Projeto prático com IA",
        detalhe:
          "Criação de um fluxo automatizado ou assistente para um problema real seu."
      }
    ],

    beneficios: [
      "Reduz gaps em fundamentos de IA aplicada.",
      "Aumenta produtividade no trabalho atual.",
      "Ajuda a se posicionar em vagas que exigem fluência em IA."
    ],

    eixoPrincipal: "fundamentos de IA aplicada",
    focoPrincipal: "IA aplicada ao trabalho",

    extraMatch: 10,
    boosts: {
      tech: 0.5,
      comm: 0.7,
      process: 0.3,
      ai: 2.0
    }
  },

  {
    id: 3,
    nome: "Liderança e comunicação em times digitais",
    tipo: "upskilling",
    tipoLabel: "Soft skills",

    resumo:
      "Trilha focada em colaboração, feedback, gestão de conflitos e facilitação.",
    descricaoCurta:
      "Desenvolva habilidades de liderança, comunicação e gestão de times híbridos/remotos.",

    descricaoLonga:
      "Essa trilha prepara você para atuar como uma referência em times digitais, fortalecendo comunicação, feedback, organização, gestão de conflitos e influência em ambientes híbridos ou remotos.",

    duracao: "2–4 meses",
    duracaoEstimativa: "2–4 meses",
    nivelAlvo: "Intermediário",
    nivel: "Intermediário",
    formato: "Online ao vivo + práticas guiadas",
    instituicao: "Instituição Parceira",
    instituicaoParceira: "Instituição Parceira",

    passos: [
      {
        titulo: "Fundamentos de comunicação não violenta",
        detalhe: "Condução de conversas difíceis e feedback construtivo."
      },
      {
        titulo: "Gestão de conflitos em times",
        detalhe: "Abordagens práticas para conflitos do dia a dia."
      },
      {
        titulo: "Liderança em ambientes híbridos",
        detalhe:
          "Boas práticas para coordenar times remotos e presenciais ao mesmo tempo."
      },
      {
        titulo: "Projeto de liderança aplicada",
        detalhe:
          "Definição e condução de uma iniciativa real de melhoria em um time."
      }
    ],

    beneficios: [
      "Reduz gaps em habilidades de liderança e comunicação.",
      "Ajuda a se posicionar para cargos de liderança técnica ou coordenação.",
      "Melhora a atuação em reuniões, feedbacks e alinhamentos."
    ],

    eixoPrincipal: "habilidades de comunicação e liderança",
    focoPrincipal: "comunicação e liderança em times digitais",

    extraMatch: 8,
    boosts: {
      tech: 0.0,
      comm: 2.2,
      process: 1.0,
      ai: 0.3
    }
  }
];

/* =====================================================
   VAGAS / OPORTUNIDADES
   - usadas em:
     • usuario-oportunidades
     • comparador
     • ia-engine (matchForJob / calculateGaps)
   ===================================================== */

window.d3mock.vagas = [
  {
    id: 101,
    empresa: "Indústria XYZ",
    titulo: "Analista de Dados Júnior – Indústria",
    descricaoCurta:
      "Responsável por indicadores de produção e manutenção, usando dados para apoiar decisões.",
    local: "São Paulo – SP",
    modalidade: "Híbrido",
    senioridade: "Júnior",
    requiredLevels: {
      tech: 4,
      comm: 3,
      process: 3,
      ai: 2
    }
  },
  {
    id: 102,
    empresa: "Grupo TecnoMaq",
    titulo: "Especialista em Manutenção 4.0",
    descricaoCurta:
      "Integra sensores, dados e IA em plantas industriais para aumentar disponibilidade.",
    local: "Sorocaba – SP",
    modalidade: "Presencial",
    senioridade: "Pleno",
    requiredLevels: {
      tech: 3,
      comm: 3,
      process: 4,
      ai: 2
    }
  },
  {
    id: 103,
    empresa: "Escola Delta",
    titulo: "Instrutor de IA aplicada",
    descricaoCurta:
      "Ensina IA generativa, automação e boas práticas de uso em contexto profissional.",
    local: "Online",
    modalidade: "Remoto",
    senioridade: "Instrutor",
    requiredLevels: {
      tech: 3,
      comm: 4,
      process: 2,
      ai: 4
    }
  },
  {
    id: 104,
    empresa: "TechVision",
    titulo: "Assistente de Dados",
    descricaoCurta:
      "Auxilia equipes de dados em análises simples, relatórios e atualização de painéis.",
    local: "São Paulo – SP",
    modalidade: "Híbrido",
    senioridade: "Júnior",
    requiredLevels: {
      tech: 3,
      comm: 3,
      process: 2,
      ai: 1
    }
  }
];

console.log("D3 MOCK: carregado com matriz, trilhas, vagas.");
