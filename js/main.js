// main.js – D³ (MVP estático)

// Simulação simples pra "dar vida" aos botões sem precisar de backend ainda.

document.addEventListener("DOMContentLoaded", () => {
  const btnFakeLogin = document.getElementById("btnFakeLogin");
  const btnVerMatriz = document.getElementById("btnVerMatriz");

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

  console.log("D³ – Projeto inicial carregado. Vamos evoluir isso juntos. 🚀");
});
