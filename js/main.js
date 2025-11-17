// main.js – D³ (MVP estático + topbar + carrossel infinito)

document.addEventListener("DOMContentLoaded", () => {
  const btnFakeLogin = document.getElementById("btnFakeLogin");
  const btnVerMatriz = document.getElementById("btnVerMatriz");
  const topbar = document.querySelector(".topbar");

if (window.d3db) {
  window.d3db.seedDbIfEmpty();
}

if (btnFakeLogin) {
  btnFakeLogin.addEventListener("click", () => {
    alert(
      "No futuro, este botão abrirá a área do usuário com a matriz de habilidades.\n\nPor enquanto, esta é uma versão de demonstração da interface do D³. 🙂"
    );
  });
}


  if (btnVerMatriz) {
    btnVerMatriz.addEventListener("click", () => {
      alert(
        "Aqui você poderia visualizar uma comparação entre:\n\n• Perfil atual do usuário\n• Vaga desejada\n• Curso sugerido pela IA\n\nTudo em cima de matrizes de habilidades."
      );
    });
  }

  // Topbar reagindo ao scroll
  if (topbar) {
    const onScroll = () => {
      if (window.scrollY > 10) {
        topbar.classList.add("topbar--scrolled");
      } else {
        topbar.classList.remove("topbar--scrolled");
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
  }

  // Carrossel "Como funciona" – loop infinito sem pulo
  initHowCarousel();

    // 🔥 NOVO – anima as barras da área “Comece a sua jornada agora”
  initCtaHoverBars();

  console.log("D³ – Projeto inicial carregado. Vamos evoluir isso juntos. 🚀");
});


function initCtaHoverBars() {
  const ctaSection = document.querySelector("#cta");
  if (!ctaSection) return;

  const fills  = Array.from(ctaSection.querySelectorAll(".cta-step__fill"));
  const values = Array.from(ctaSection.querySelectorAll(".cta-step__value"));

  // estados que queremos para cada interação
  const states = {
    base:   [0, 0, 0],       // estado neutro (sem interação)
    create: [35, 70, 50],   // hover em "Criar conta"
    login:  [100, 90, 95], // hover em "Fazer login"
  };

  function applyState(name) {
    const arr = states[name];
    if (!arr) return;

    arr.forEach((pct, index) => {
      if (fills[index]) {
        fills[index].style.width = pct + "%";
      }
      if (values[index]) {
        values[index].textContent = pct + "%";
      }
    });
  }

  // estado inicial: tudo zerado
  applyState("base");

  const btnCreate = ctaSection.querySelector("[data-cta-state='create']");
  const btnLogin  = ctaSection.querySelector("[data-cta-state='login']");
  const actions   = ctaSection.querySelector(".section--cta__actions");

  if (btnCreate) {
    btnCreate.addEventListener("mouseenter", () => applyState("create"));
    btnCreate.addEventListener("focus",      () => applyState("create"));
  }

  if (btnLogin) {
    btnLogin.addEventListener("mouseenter", () => applyState("login"));
    btnLogin.addEventListener("focus",      () => applyState("login"));
  }

  // quando sai da área dos botões, volta para o neutro (0/0/0)
  if (actions) {
    actions.addEventListener("mouseleave", () => applyState("base"));
  }
}


function initHowCarousel() {
  const track = document.querySelector(".how-carousel__track");
  if (!track) return;

  const wrapper = track.parentElement;
  const originalCards = Array.from(track.children);
  if (originalCards.length === 0) return;

  // Duplica os cards para permitir scroll infinito
  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
  });

  // Medidas básicas
  const totalWidth = track.scrollWidth / 2; // largura do conjunto original
  let position = 0;
  const speed = 0.25; // px por frame
  let paused = false;

  // Pausa quando o mouse passa em cima (desktop)
  wrapper.addEventListener("mouseenter", () => {
    paused = true;
  });

  wrapper.addEventListener("mouseleave", () => {
    paused = false;
  });

  function step() {
    const isMobile = window.innerWidth <= 768;

    if (!isMobile && !paused) {
      position -= speed;

      // Quando passamos da largura do conjunto original, reseta para 0
if (-position >= totalWidth) {
  position += totalWidth; // reaproveita o movimento em vez de resetar seco
}


      track.style.transform = `translateX(${position}px)`;
    }

    if (isMobile) {
      // Garantir que no mobile não fique "torto"
      position = 0;
      track.style.transform = "translateX(0)";
    }

    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

