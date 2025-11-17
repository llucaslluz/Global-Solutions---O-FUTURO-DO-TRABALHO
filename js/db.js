// js/db.js
// "Banco" simples do D³ usando localStorage

const D3_DB_KEY = 'd3_database_v1';
const D3_CURRENT_USER_KEY = 'd3_current_user';

function getDb() {
  const raw = localStorage.getItem(D3_DB_KEY);
  if (!raw) {
    return {
      users: [],
      schools: [],
      companies: []
    };
  }

  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error('Erro ao ler DB do localStorage:', e);
    return {
      users: [],
      schools: [],
      companies: []
    };
  }
}

function saveDb(db) {
  localStorage.setItem(D3_DB_KEY, JSON.stringify(db));
}

// cria dados iniciais se ainda não existir nada
function seedDbIfEmpty() {
  const raw = localStorage.getItem(D3_DB_KEY);
  if (raw) return;

  const db = {
    users: [
      {
        id: 1,
        name: 'Ana Silva',
        email: 'ana@exemplo.com',
        password: '123456',
        role: 'user'
      },
      {
        id: 2,
        name: 'Lucas Morais',
        email: 'lucas@exemplo.com',
        password: '123456',
        role: 'user'
      }
    ],
    schools: [
      { id: 1, name: 'FIAP', area: 'Tecnologia', city: 'São Paulo' },
      { id: 2, name: 'Escola Tech Future', area: 'TI & Dados', city: 'Online' },
      { id: 3, name: 'Instituto Profissões do Amanhã', area: 'Carreiras Digitais', city: 'São Paulo' }
    ],
    companies: [
      { id: 1, name: 'TechCorp IA', sector: 'Tecnologia', size: 'Grande' },
      { id: 2, name: 'EduLab', sector: 'EdTech', size: 'Média' },
      { id: 3, name: 'FutureWorks', sector: 'Consultoria de Futuro do Trabalho', size: 'Pequena' }
    ]
  };

  saveDb(db);
  console.log('DB inicial do D³ criado no localStorage.');
}

// helpers para usuário logado
function setCurrentUser(user) {
  localStorage.setItem(
    D3_CURRENT_USER_KEY,
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    })
  );
}

function getCurrentUser() {
  const raw = localStorage.getItem(D3_CURRENT_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function clearCurrentUser() {
  localStorage.removeItem(D3_CURRENT_USER_KEY);
}

// expõe tudo em window para outros scripts
window.d3db = {
  getDb,
  saveDb,
  seedDbIfEmpty,
  setCurrentUser,
  getCurrentUser,
  clearCurrentUser
};
