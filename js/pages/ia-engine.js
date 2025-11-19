/* =====================================================
   D³ – IA baseada em gaps (motor de recomendação)
   Arquivo: js/core/ia-engine.js
   Expõe o objeto global: window.d3ia
   ===================================================== */

(function (global) {
  const d3ia = {};

  // -------------------------------
  // Configuração base
  // -------------------------------
  const AXES = ["tech", "comm", "process", "ai"];

  const DEFAULT_REQUIRED = {
    tech: 4,
    comm: 4,
    process: 4,
    ai: 4
  };

  // -------------------------------
  // 1. Perfil do usuário a partir da matriz
  // -------------------------------
  /**
   * Recebe array de itens da matriz:
   * [{ id, nome, axis: 'tech'|'soft'|'ai', current, desired }, ...]
   * Retorna um perfil agregando em cada eixo:
   * { tech, comm, process, ai } (0–5 aprox.)
   */
  d3ia.getUserProfileFromMatrix = function (matrixData) {
    const byAxis = { tech: [], soft: [], ai: [] };

    (matrixData || []).forEach(item => {
      if (!item || typeof item.current !== "number") return;
      if (item.axis === "tech") byAxis.tech.push(item.current);
      if (item.axis === "soft") byAxis.soft.push(item.current);
      if (item.axis === "ai") byAxis.ai.push(item.current);
    });

    const avg = arr =>
      arr && arr.length ? arr.reduce((s, v) => s + v, 0) / arr.length : null;

    const techAvg = avg(byAxis.tech);
    const softAvg = avg(byAxis.soft);
    const aiAvg = avg(byAxis.ai);

    return {
      tech: techAvg ?? 2,     // habilidades técnicas
      comm: softAvg ?? 3,     // comunicação (vem do eixo soft)
      process: 4,             // por enquanto fixo; poderia virar eixo dedicado
      ai: aiAvg ?? 1.5        // fundamentos de IA
    };
  };

  // -------------------------------
  // 2. Cálculo de gaps por eixo
  // -------------------------------
  /**
   * Calcula gaps entre perfil do usuário e requisitos.
   * userProfile: { tech, comm, process, ai }
   * requiredLevels: { tech, comm, process, ai }
   *
   * Retorna objeto:
   * {
   *   tech: { axis, user, required, gap },
   *   comm: { ... },
   *   ...
   * }
   */
  d3ia.calculateGaps = function (userProfile, requiredLevels) {
    const required = { ...DEFAULT_REQUIRED, ...(requiredLevels || {}) };
    const result = {};

    AXES.forEach(axis => {
      const user = typeof userProfile[axis] === "number" ? userProfile[axis] : 0;
      const req = typeof required[axis] === "number" ? required[axis] : 0;
      const gap = Math.max(0, req - user);

      result[axis] = {
        axis,
        user,
        required: req,
        gap
      };
    });

    return result;
  };

  // -------------------------------
  // 3. Compatibilidade (match) com vaga
  // -------------------------------
  /**
   * Calcula compatibilidade percentual (0–100)
   * com base em:
   *   score = soma( min(user, required) ) / soma(required)
   */
  d3ia.calcMatchForJob = function (userProfile, requiredLevels) {
    const required = { ...DEFAULT_REQUIRED, ...(requiredLevels || {}) };

    let totalScore = 0;
    let totalMax = 0;

    AXES.forEach(axis => {
      const userLevel =
        typeof userProfile[axis] === "number" ? userProfile[axis] : 0;
      const reqLevel =
        typeof required[axis] === "number" ? required[axis] : 0;

      const contribution = Math.min(userLevel, reqLevel);
      totalScore += contribution;
      totalMax += reqLevel || 5;
    });

    if (!totalMax) return 0;

    const pct = Math.round((totalScore / totalMax) * 100);
    return Math.max(0, Math.min(100, pct));
  };

  // -------------------------------
  // 4. Boosts de trilha (quanto ela ajuda cada eixo)
  // -------------------------------
  /**
   * Estima quanto uma trilha "empurra" cada eixo.
   * Se a trilha tiver .boosts já definidos, usa eles.
   * Senão, infere com base no nome/tipo/eixoPrincipal.
   *
   * Retorna:
   * { tech, comm, process, ai } (pontos de 0–5)
   */
  d3ia.estimateTrailBoosts = function (trilha) {
    // Se o mock já tiver boosts específicos, usamos direto
    if (trilha && trilha.boosts) {
      return {
        tech: trilha.boosts.tech ?? 0,
        comm: trilha.boosts.comm ?? 0,
        process: trilha.boosts.process ?? 0,
        ai: trilha.boosts.ai ?? 0
      };
    }

    const name = (trilha?.nome || "").toLowerCase();
    const eixo = (trilha?.eixoPrincipal || "").toLowerCase();
    const tipo = (trilha?.tipo || "").toLowerCase();

    // defaults bem simples
    let boosts = { tech: 0, comm: 0, process: 0, ai: 0 };

    // Heurísticas:
    // 1) Trilhas de dados
    if (name.includes("dados") || name.includes("data")) {
      boosts.tech += 1.5;
      boosts.process += 0.5;
    }

    // 2) Trilhas de IA
    if (name.includes("ia") || name.includes("inteligência artificial")) {
      boosts.ai += 1.8;
      boosts.tech += 0.5;
    }

    // 3) Trilhas de liderança / comunicação
    if (name.includes("liderança") || name.includes("comunicação")) {
      boosts.comm += 1.8;
      boosts.process += 0.5;
    }

    // 4) Eixo principal declarado
    if (eixo.includes("técnic") || eixo.includes("tech")) {
      boosts.tech += 1.0;
    }
    if (eixo.includes("comunicação") || eixo.includes("soft")) {
      boosts.comm += 1.0;
    }
    if (eixo.includes("ia")) {
      boosts.ai += 1.0;
    }

    // 5) Tipo requalificação costuma dar mais boost técnico
    if (tipo.includes("requal")) {
      boosts.tech += 0.8;
    }

    // Limita para não explodir
    AXES.forEach(axis => {
      boosts[axis] = Math.min(boosts[axis], 3);
    });

    return boosts;
  };

  // -------------------------------
  // 5. Simulação "após trilha"
  // -------------------------------
  /**
   * Simula o perfil do usuário depois de completar uma trilha.
   * Retorna:
   * {
   *   afterProfile: { tech, comm, process, ai },
   *   gapsAfter: { ... },
   *   matchAfter: number (se tiver requiredLevels),
   *   boosts: { tech, comm, process, ai }
   * }
   */
  d3ia.simulateAfterTrail = function (userProfile, trilha, requiredLevels) {
    const boosts = d3ia.estimateTrailBoosts(trilha);

    const afterProfile = {};
    AXES.forEach(axis => {
      const base = typeof userProfile[axis] === "number" ? userProfile[axis] : 0;
      const boosted = base + (boosts[axis] || 0);
      // Limita máximo a 5
      afterProfile[axis] = Math.min(5, boosted);
    });

    const gapsAfter = d3ia.calculateGaps(afterProfile, requiredLevels);
    const matchAfter = requiredLevels
      ? d3ia.calcMatchForJob(afterProfile, requiredLevels)
      : null;

    return {
      afterProfile,
      gapsAfter,
      matchAfter,
      boosts
    };
  };

  // -------------------------------
  // 6. Sugestão de melhor trilha
  // -------------------------------
  /**
   * Retorna a "melhor" trilha para reduzir gaps do usuário.
   *
   * userProfile: { tech, comm, process, ai }
   * trilhas: array de trilhas do d3mock
   * options: { requiredLevels?: {...} } -> opcional, se quiser focar numa vaga
   *
   * Saída:
   * {
   *   trilha: {...},
   *   impactoTotal,
   *   impactoPorEixo: { tech, comm, process, ai },
   *   matchBefore?: number,
   *   matchAfter?: number
   * }
   */
  d3ia.suggestBestTrail = function (userProfile, trilhas, options) {
    const list = Array.isArray(trilhas) ? trilhas : [];
    if (!list.length) return null;

    const requiredLevels = options?.requiredLevels || null;
    const matchBefore = requiredLevels
      ? d3ia.calcMatchForJob(userProfile, requiredLevels)
      : null;

    let best = null;

    list.forEach(trilha => {
      const sim = d3ia.simulateAfterTrail(userProfile, trilha, requiredLevels);

      // impacto total = soma da redução de gap em cada eixo
      const gapsBefore = d3ia.calculateGaps(userProfile, requiredLevels);
      let impactoTotal = 0;
      const impactoPorEixo = {};

      AXES.forEach(axis => {
        const beforeGap = gapsBefore[axis]?.gap ?? 0;
        const afterGap = sim.gapsAfter[axis]?.gap ?? 0;
        const delta = beforeGap - afterGap; // quanto o gap reduziu
        impactoPorEixo[axis] = delta;
        impactoTotal += delta;
      });

      const record = {
        trilha,
        impactoTotal,
        impactoPorEixo,
        matchBefore,
        matchAfter: sim.matchAfter
      };

      if (!best || record.impactoTotal > best.impactoTotal) {
        best = record;
      }
    });

    return best;
  };

  // -------------------------------
  // 7. Descobrir maior gap
  // -------------------------------
  /**
   * Recebe resultado de calculateGaps e retorna
   * o eixo com maior gap:
   * { axis, gap, user, required }
   */
  d3ia.getBiggestGap = function (gapsObj) {
    if (!gapsObj) return null;

    let best = null;

    AXES.forEach(axis => {
      const info = gapsObj[axis];
      if (!info) return;
      if (!best || info.gap > best.gap) {
        best = info;
      }
    });

    return best;
  };

  // Expor no escopo global
  global.d3ia = d3ia;
  console.log("D3 IA Engine: carregado com funções de gaps e recomendação.");
})(window);
