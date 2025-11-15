// main.js – D³ (MVP estático + topbar + carrossel infinito)

document.addEventListener("DOMContentLoaded", () => {
  const btnFakeLogin = document.getElementById("btnFakeLogin");
  const btnVerMatriz = document.getElementById("btnVerMatriz");
  const topbar = document.querySelector(".topbar");

  if (btnFakeLogin) {
    btnFakeLogin.addEventListener("click", () => {
      alert(
        "No futuro, este botão abrirá a área do usuário com a matriz de habilidades.\n\nPor enquanto, este é só um protótipo estático para a Global Solution. 🙂"
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

  console.log("D³ – Projeto inicial carregado. Vamos evoluir isso juntos. 🚀");
});

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
  const speed = 0.3; // px por frame
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
