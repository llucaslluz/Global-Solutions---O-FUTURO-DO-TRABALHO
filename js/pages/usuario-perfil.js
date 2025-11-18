// js/pages/usuario-perfil.js
// Tela "Meu perfil" usando dados fictícios e salvando no localStorage (protótipo).

document.addEventListener('DOMContentLoaded', () => {
  let currentUser = null;

  // Tenta usar o d3db para validar login (igual dashboard)
  if (window.d3db) {
    try {
      window.d3db.seedDbIfEmpty();
      currentUser = window.d3db.getCurrentUser();

      if (!currentUser || currentUser.type !== 'user') {
        window.location.href = 'login.html';
        return;
      }
    } catch (err) {
      console.warn('Erro ao acessar d3db no perfil:', err);
    }
  }

  // --------- Seleção de campos ---------
  const nomeEl = document.getElementById('nome');
  const emailEl = document.getElementById('email');
  const cidadeEl = document.getElementById('cidade');
  const tempoExpEl = document.getElementById('tempo-exp');
  const formacaoEl = document.getElementById('formacao');

  const areaInteresseEl = document.getElementById('area-interesse');
  const objetivoEl = document.getElementById('objetivo');
  const descObjetivoEl = document.getElementById('descricao-objetivo');

  const modeloTrabalhoEl = document.getElementById('modelo-trabalho');
  const disponibilidadeEl = document.getElementById('disponibilidade');
  const prefFormacaoEl = document.getElementById('preferencia-formacao');
  const obsPerfilEl = document.getElementById('obs-perfil');

  const btnSalvar = document.getElementById('btnSalvarPerfil') || document.querySelector('.btn.btn--primary');

  if (!btnSalvar) {
    console.warn('Botão de salvar perfil não encontrado.');
    return;
  }

  // Garante que o botão não fique travado (se no HTML tiver "disabled")
  btnSalvar.disabled = false;

  // --------- Chave para salvar no localStorage ---------
  const profileKey = currentUser && currentUser.id
    ? `d3_profile_${currentUser.id}`
    : 'd3_profile_demo';

  // --------- Preenchimento inicial ---------
  // 1) Nome / e-mail vindos do usuário logado, se existirem
  if (currentUser) {
    if (nomeEl && !nomeEl.value) nomeEl.value = currentUser.name || '';
    if (emailEl && !emailEl.value && currentUser.email) emailEl.value = currentUser.email;
  }

  // 2) Dados salvos anteriormente no localStorage (se houver)
  try {
    const saved = localStorage.getItem(profileKey);
    if (saved) {
      const data = JSON.parse(saved);

      if (nomeEl && data.nome) nomeEl.value = data.nome;
      if (emailEl && data.email) emailEl.value = data.email;
      if (cidadeEl && data.cidade) cidadeEl.value = data.cidade;
      if (tempoExpEl && data.tempoExperiencia) tempoExpEl.value = data.tempoExperiencia;
      if (formacaoEl && data.formacao) formacaoEl.value = data.formacao;

      if (areaInteresseEl && data.areaInteresse) areaInteresseEl.value = data.areaInteresse;
      if (objetivoEl && data.objetivo) objetivoEl.value = data.objetivo;
      if (descObjetivoEl && data.descricaoObjetivo) descObjetivoEl.value = data.descricaoObjetivo;

      if (modeloTrabalhoEl && data.modeloTrabalho) modeloTrabalhoEl.value = data.modeloTrabalho;
      if (disponibilidadeEl && data.disponibilidade) disponibilidadeEl.value = data.disponibilidade;
      if (prefFormacaoEl && data.preferenciaFormacao) prefFormacaoEl.value = data.preferenciaFormacao;
      if (obsPerfilEl && data.observacoes) obsPerfilEl.value = data.observacoes;
    }
  } catch (err) {
    console.warn('Erro ao ler perfil do localStorage:', err);
  }

  // --------- Salvar perfil (protótipo) ---------
  btnSalvar.addEventListener('click', (event) => {
    event.preventDefault();

    const data = {
      nome: nomeEl ? nomeEl.value.trim() : '',
      email: emailEl ? emailEl.value.trim() : '',
      cidade: cidadeEl ? cidadeEl.value.trim() : '',
      tempoExperiencia: tempoExpEl ? tempoExpEl.value : '',
      formacao: formacaoEl ? formacaoEl.value : '',

      areaInteresse: areaInteresseEl ? areaInteresseEl.value : '',
      objetivo: objetivoEl ? objetivoEl.value : '',
      descricaoObjetivo: descObjetivoEl ? descObjetivoEl.value.trim() : '',

      modeloTrabalho: modeloTrabalhoEl ? modeloTrabalhoEl.value : '',
      disponibilidade: disponibilidadeEl ? disponibilidadeEl.value : '',
      preferenciaFormacao: prefFormacaoEl ? prefFormacaoEl.value : '',
      observacoes: obsPerfilEl ? obsPerfilEl.value.trim() : ''
    };

    try {
      localStorage.setItem(profileKey, JSON.stringify(data));
      showFeedback('Perfil salvo (somente neste navegador, para fins de protótipo).');
      console.log('Perfil salvo:', data);
    } catch (err) {
      console.error('Erro ao salvar perfil:', err);
      showFeedback('Não foi possível salvar o perfil (erro no navegador).');
    }
  });

  // --------- Feedback simples ---------
  function showFeedback(message) {
    let toast = document.querySelector('.perfil-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'perfil-toast';
      toast.style.position = 'fixed';
      toast.style.right = '1rem';
      toast.style.bottom = '1rem';
      toast.style.padding = '0.6rem 0.9rem';
      toast.style.borderRadius = '999px';
      toast.style.background = 'rgba(22, 163, 74, 0.9)';
      toast.style.color = '#ecfdf5';
      toast.style.fontSize = '0.85rem';
      toast.style.zIndex = '9999';
      toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.35)';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = '1';

    setTimeout(() => {
      toast.style.opacity = '0';
    }, 2500);
  }
});
