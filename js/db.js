// js/db.js
// Banco fake em localStorage + controle de usuário logado

(function () {
  const STORAGE_KEY = 'd3_db_v1';
  const CURRENT_USER_KEY = 'd3_current_user_v1';

  function loadDb() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.error('Erro ao carregar DB fake:', e);
      return null;
    }
  }

  function saveDb(db) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch (e) {
      console.error('Erro ao salvar DB fake:', e);
    }
  }

  // popula com alguns dados iniciais, se estiver vazio
  function seedDbIfEmpty() {
    let db = loadDb();
    if (db) return;

    db = {
      users: [
        {
          id: 'u1',
          type: 'user',                // usuário pessoa física
          name: 'Ana Usuária',
          email: 'ana@exemplo.com',
          password: '123456'
        },
        {
          id: 'u2',
          type: 'user',
          name: 'Lucas Usuário',
          email: 'lucas@exemplo.com',
          password: '123456'
        },
        {
          id: 'e1',
          type: 'school',              // escola
          name: 'Escola Tech Futuro',
          email: 'contato@techfuturo.com',
          password: '123456'
        },
        {
          id: 'c1',
          type: 'company',             // empresa
          name: 'Empresa IA Talentos',
          email: 'rh@iatalentos.com',
          password: '123456'
        }
      ],
      // aqui depois dá pra crescer com cursos, vagas etc.
      createdAt: new Date().toISOString()
    };

    saveDb(db);
  }

  function getDb() {
    let db = loadDb();
    if (!db) {
      seedDbIfEmpty();
      db = loadDb();
    }
    return db;
  }

  function setDb(db) {
    saveDb(db);
  }

  // ---- usuário logado ----

  function setCurrentUser(user) {
    if (!user) {
      localStorage.removeItem(CURRENT_USER_KEY);
      return;
    }
    const slim = {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type   // 'user' | 'school' | 'company'
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(slim));
  }

  function getCurrentUser() {
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.error('Erro ao ler usuário logado:', e);
      return null;
    }
  }

  function clearCurrentUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
  }

  // expõe no window
  window.d3db = {
    seedDbIfEmpty,
    getDb,
    setDb,
    setCurrentUser,
    getCurrentUser,
    clearCurrentUser
  };
})();
