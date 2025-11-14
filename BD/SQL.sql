-- =========================================================
-- TABELA: GS_USUARIO
-- =========================================================
CREATE TABLE GS_USUARIO (
    id_usuario       INTEGER       PRIMARY KEY,
    ds_nome          VARCHAR(150)  NOT NULL,
    ds_email         VARCHAR(150)  NOT NULL,
    senha_hash       VARCHAR(255)  NOT NULL,
    ds_tipo_perfil   VARCHAR(20)   NOT NULL,  -- PESSOA, ESCOLA, EMPRESA
    dt_data_cadastro DATETIME      NOT NULL,
    st_ativo         BOOLEAN       NOT NULL,
    CONSTRAINT uq_gs_usuario_email UNIQUE (ds_email)
);

-- =========================================================
-- TABELA: GS_PESSOA_PERFIL
-- =========================================================
CREATE TABLE GS_PESSOA_PERFIL (
    id_pessoa        INTEGER      PRIMARY KEY,
    ds_fase_carreira VARCHAR(50)  NOT NULL,
    ds_objetivo_geral VARCHAR(255),
    ds_resumo_perfil TEXT,
    id_usuario       INTEGER      NOT NULL,
    CONSTRAINT fk_pessoa_usuario
        FOREIGN KEY (id_usuario) REFERENCES GS_USUARIO (id_usuario)
);

-- =========================================================
-- TABELA: GS_ESCOLA
-- =========================================================
CREATE TABLE GS_ESCOLA (
    id_escola       INTEGER       PRIMARY KEY,
    ds_nome_fantasia VARCHAR(150) NOT NULL,
    ds_tipo_escola  VARCHAR(50)   NOT NULL,
    web_site        VARCHAR(200),
    id_usuario      INTEGER       NOT NULL,
    CONSTRAINT fk_escola_usuario
        FOREIGN KEY (id_usuario) REFERENCES GS_USUARIO (id_usuario)
);

-- =========================================================
-- TABELA: GS_EMPRESA
-- =========================================================
CREATE TABLE GS_EMPRESA (
    id_empresa      INTEGER       PRIMARY KEY,
    ds_razao_social VARCHAR(150)  NOT NULL,
    nm_cnpj         VARCHAR(20),
    ds_setor        VARCHAR(100),
    ds_porte        VARCHAR(50),
    id_usuario      INTEGER       NOT NULL,
    CONSTRAINT fk_empresa_usuario
        FOREIGN KEY (id_usuario) REFERENCES GS_USUARIO (id_usuario)
);

-- =========================================================
-- TABELA: GS_HABILIDADE
-- =========================================================
CREATE TABLE GS_HABILIDADE (
    id_habilidade INTEGER       PRIMARY KEY,
    nm_nome       VARCHAR(150)  NOT NULL,
    ds_categoria  VARCHAR(150)  NOT NULL,
    ds_descricao  TEXT
);

-- =========================================================
-- TABELA: GS_CURSO
-- =========================================================
CREATE TABLE GS_CURSO (
    id_curso       INTEGER       PRIMARY KEY,
    nm_nome        VARCHAR(150)  NOT NULL,
    ds_descricao   TEXT,
    vl_carga_horaria INTEGER     NOT NULL,
    ds_nivel       VARCHAR(50),
    id_escola      INTEGER       NOT NULL,
    CONSTRAINT fk_curso_escola
        FOREIGN KEY (id_escola) REFERENCES GS_ESCOLA (id_escola)
);

-- =========================================================
-- TABELA: GS_VAGA
-- =========================================================
CREATE TABLE GS_VAGA (
    id_vaga      INTEGER       PRIMARY KEY,
    ds_titulo    VARCHAR(150)  NOT NULL,
    ds_senioridade VARCHAR(50),
    ds_tipo_vaga VARCHAR(50),
    ds_descricao TEXT,
    id_empresa   INTEGER       NOT NULL,
    CONSTRAINT fk_vaga_empresa
        FOREIGN KEY (id_empresa) REFERENCES GS_EMPRESA (id_empresa)
);

-- =========================================================
-- TABELA: GS_OBJETIVO_USUARIO
-- =========================================================
CREATE TABLE GS_OBJETIVO_USUARIO (
    id_objetivo          INTEGER       PRIMARY KEY,
    ds_tipo_objetivo     VARCHAR(30)   NOT NULL,  -- PROMOCAO, TRANSICAO, PRIMEIRO_EMP etc.
    ds_descricao_objetivo TEXT,
    dt_data_criacao      DATETIME      NOT NULL,
    id_usuario           INTEGER       NOT NULL,
    id_vaga              INTEGER,
    CONSTRAINT fk_objetivo_usuario
        FOREIGN KEY (id_usuario) REFERENCES GS_USUARIO (id_usuario),
    CONSTRAINT fk_objetivo_vaga
        FOREIGN KEY (id_vaga) REFERENCES GS_VAGA (id_vaga)
);

-- =========================================================
-- TABELA: GS_CANDIDATURA_VAGA
-- =========================================================
CREATE TABLE GS_CANDIDATURA_VAGA (
    id_candidatura        INTEGER      PRIMARY KEY,
    dt_data_candidatura   DATETIME     NOT NULL,
    ds_status_candidatura VARCHAR(30)  NOT NULL, -- ENVIADA, EM_ANALISE, APROVADO, REPROVADO, CANCELADO
    ds_origem_candidatura VARCHAR(20),           -- INTERNA, EXTERNA, D3
    ds_observacao_candidatura TEXT,
    id_usuario            INTEGER      NOT NULL,
    id_vaga               INTEGER      NOT NULL,
    CONSTRAINT fk_candidatura_usuario
        FOREIGN KEY (id_usuario) REFERENCES GS_USUARIO (id_usuario),
    CONSTRAINT fk_candidatura_vaga
        FOREIGN KEY (id_vaga) REFERENCES GS_VAGA (id_vaga)
);

-- =========================================================
-- TABELA: GS_MATRIZ_HABILIDADE
-- =========================================================
CREATE TABLE GS_MATRIZ_HABILIDADE (
    id_matriz        INTEGER       PRIMARY KEY,
    sds_tipo_matriz  VARCHAR(20)   NOT NULL, -- USUARIO, CURSO, VAGA, OBJETIVO, TRILHA
    id_referencia    INTEGER       NOT NULL,
    dt_data_criacao  DATETIME      NOT NULL,
    dt_data_atualizacao DATETIME   NOT NULL,
    st_status        VARCHAR(20)   NOT NULL  -- ATIVA, HISTORICA
    -- associação lógica com USUARIO / CURSO / VAGA / OBJETIVO / TRILHA por sds_tipo_matriz + id_referencia
);

-- =========================================================
-- TABELA: GS_ITEM_MATRIZ_HABILIDADE
-- =========================================================
CREATE TABLE GS_ITEM_MATRIZ_HABILIDADE (
    id_matriz       INTEGER      NOT NULL,
    id_habilidade   INTEGER      NOT NULL,
    vl_nivel_atual  INTEGER,
    vl_nivel_minimo INTEGER,
    vl_nivel_desejado INTEGER,
    CONSTRAINT pk_item_matriz_habilidade
        PRIMARY KEY (id_matriz, id_habilidade),
    CONSTRAINT fk_item_matriz_matriz
        FOREIGN KEY (id_matriz) REFERENCES GS_MATRIZ_HABILIDADE (id_matriz),
    CONSTRAINT fk_item_matriz_habilidade
        FOREIGN KEY (id_habilidade) REFERENCES GS_HABILIDADE (id_habilidade)
);

-- =========================================================
-- TABELA: GS_TENDENCIA_MERCADO
-- =========================================================
CREATE TABLE GS_TENDENCIA_MERCADO (
    id_tendencia                    INTEGER      PRIMARY KEY,
    ds_escopo_tendencia_mercado     VARCHAR(20)  NOT NULL, -- GLOBAL, SETORIAL, EMPRESA
    ds_horizonte_tendencia_mercado  VARCHAR(20)  NOT NULL, -- Curto, Médio, Longo
    vl_indice_demanda_tendencia     INTEGER      NOT NULL,
    ds_fonte_tendencia_mercado      VARCHAR(150),
    ds_observacao_tendencia_mercado TEXT,
    dt_data_atualizacao_tendencia   DATETIME     NOT NULL,
    id_empresa                      INTEGER,
    id_habilidade                   INTEGER      NOT NULL,
    CONSTRAINT fk_tendencia_empresa
        FOREIGN KEY (id_empresa) REFERENCES GS_EMPRESA (id_empresa),
    CONSTRAINT fk_tendencia_habilidade
        FOREIGN KEY (id_habilidade) REFERENCES GS_HABILIDADE (id_habilidade)
);

-- =========================================================
-- TABELA: GS_RECOMENDACAO_IA
-- =========================================================
CREATE TABLE GS_RECOMENDACAO_IA (
    id_recomendacao_ia          INTEGER      PRIMARY KEY,
    ds_tipo_recomendacao_ia     VARCHAR(20)  NOT NULL, -- CURSO, VAGA, TRILHA, OBJETIVO
    id_referencia_recomendacao  INTEGER      NOT NULL,
    ds_texto_resumo_recomendacao TEXT,
    st_prioridade_recomendacao  INTEGER      NOT NULL, -- 1=alta, 2=média, 3=baixa
    dt_data_geracao_recomendacao DATETIME    NOT NULL,
    id_usuario                  INTEGER      NOT NULL,
    CONSTRAINT fk_recomendacao_usuario
        FOREIGN KEY (id_usuario) REFERENCES GS_USUARIO (id_usuario)
    -- associação lógica de id_referencia_recomendacao com CURSO/VAGA/TRILHA/OBJETIVO
);

-- =========================================================
-- TABELA: GS_TRILHA
-- =========================================================
CREATE TABLE GS_TRILHA (
    id_trilha           INTEGER       PRIMARY KEY,
    nm_nome_trilha      VARCHAR(150)  NOT NULL,
    ds_descricao_trilha TEXT,
    ds_tipo_trilha      VARCHAR(30)   NOT NULL, -- CARREIRA, CURSOS, INTERNA_EMPRESA
    ds_foco             VARCHAR(100),
    dt_data_criacao_trilha DATETIME   NOT NULL
);

-- =========================================================
-- TABELA: GS_TRILHA_ITEM
-- =========================================================
CREATE TABLE GS_TRILHA_ITEM (
    id_trilha   INTEGER      NOT NULL,
    id_item     INTEGER      NOT NULL,
    ds_tipo_item VARCHAR(20) NOT NULL,  -- CURSO, VAGA, HABILIDADE, OBJETIVO
    id_ordem    INTEGER,
    CONSTRAINT pk_trilha_item
        PRIMARY KEY (id_trilha, id_item, ds_tipo_item),
    CONSTRAINT fk_trilha_item_trilha
        FOREIGN KEY (id_trilha) REFERENCES GS_TRILHA (id_trilha)
    -- associação lógica de id_item com outras tabelas conforme ds_tipo_item
);

-- =========================================================
-- TABELA: GS_HISTORICO_MATRIZ_USUARIO
-- =========================================================
CREATE TABLE GS_HISTORICO_MATRIZ_USUARIO (
    id_historico_matriz_usuario      INTEGER      PRIMARY KEY,
    id_matriz                        INTEGER      NOT NULL,
    dt_data_registro_historico_matriz_usuario DATETIME NOT NULL,
    ds_origem                        VARCHAR(30), -- CURSO, EXPERIENCIA, AJUSTE_MANUAL
    ds_descricao_evento              TEXT,
    CONSTRAINT fk_hist_matriz_usuario_matriz
        FOREIGN KEY (id_matriz) REFERENCES GS_MATRIZ_HABILIDADE (id_matriz)
);

-- =========================================================
-- TABELA: GS_FONTE_PERFIL_USUARIO
-- =========================================================
CREATE TABLE GS_FONTE_PERFIL_USUARIO (
    id_fonte_perfil_usuario    INTEGER      PRIMARY KEY,
    ds_tipo_fonte_perfil_usuario VARCHAR(30) NOT NULL, -- CURRICULO, EXPERIENCIA, FORMACAO, CERTIFICACAO
    ds_descricao_perfil_usuario  TEXT,
    dt_data_registro_perfil_usuario DATETIME NOT NULL,
    id_usuario                 INTEGER      NOT NULL,
    CONSTRAINT fk_fonte_perfil_usuario
        FOREIGN KEY (id_usuario) REFERENCES GS_USUARIO (id_usuario)
);
git add .
git commit -m " inclusao do SQL.sql"
git push
