// migrations/XXXXXXXXXXXXX_criacao_schema_inicial.js

exports.shorthands = undefined;

exports.up = (pgm) => {
  console.log("Executando a migration inicial para criar o schema base...");

  pgm.sql(`
    -- Tabela de Usuários
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );

    -- Tabela de Logs de Atividade
    CREATE TABLE IF NOT EXISTS activity_logs (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      user_name VARCHAR(255),
      action_type VARCHAR(100) NOT NULL,
      details JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
    
    -- Tabela de Equipamentos
    CREATE TABLE IF NOT EXISTS acompanhamento_equipamento (
      id SERIAL PRIMARY KEY,
      cod_equip VARCHAR(255) NOT NULL,
      cod_sap VARCHAR(255),
      descricao TEXT,
      relacao_programacao TEXT,
      tipo VARCHAR(255),
      tecnico VARCHAR(255),
      uc VARCHAR(255),
      status VARCHAR(100),
      base VARCHAR(255),
      obs TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );

    -- Tabela de Chips
    CREATE TABLE IF NOT EXISTS chips (
      id SERIAL PRIMARY KEY,
      data_aquisicao DATE,
      ssn VARCHAR(255) NOT NULL,
      operadora VARCHAR(100) NOT NULL,
      entregue_para VARCHAR(255),
      data_entrega DATE,
      ssn_uc VARCHAR(255),
      protocolo_gauss VARCHAR(255),
      status VARCHAR(100),
      obs TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );

    -- Tabela de Ferramentas
    CREATE TABLE IF NOT EXISTS ferramentas (
      id SERIAL PRIMARY KEY,
      codigo VARCHAR(255) NOT NULL,
      equipamentos TEXT,
      pedido VARCHAR(255),
      entregue BOOLEAN DEFAULT false,
      estoque INTEGER,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );

    -- Tabela de Entrega de Ferramentas
    CREATE TABLE IF NOT EXISTS entrega_ferramentas (
      id SERIAL PRIMARY KEY,
      equipe VARCHAR(255),
      codigo VARCHAR(255),
      equipamento TEXT,
      quantidade_entregue INTEGER,
      responsaveis TEXT,
      data_entrega DATE,
      entregue_por VARCHAR(255),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );

    -- Tabela de Cadeados
    CREATE TABLE IF NOT EXISTS cadeados (
      id SERIAL PRIMARY KEY,
      codigo_cadeado VARCHAR(255) NOT NULL,
      status VARCHAR(100),
      tecnico_responsavel VARCHAR(255),
      observacao TEXT,
      data_entrega DATE,
      data_instalacao DATE,
      uc VARCHAR(255),
      cliente VARCHAR(255),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );

    -- Tabelas de Materiais (simplificadas)
    CREATE TABLE IF NOT EXISTS materiais_antena_ganho (
      id SERIAL PRIMARY KEY,
      material VARCHAR(255),
      descricao TEXT
    );

    CREATE TABLE IF NOT EXISTS descricao_materiais (
        id SERIAL PRIMARY KEY,
        material VARCHAR(255),
        centro VARCHAR(255),
        tipo_avaliacao VARCHAR(255),
        texto_breve_material TEXT,
        ultima_modificacao DATE,
        tipo_material VARCHAR(255),
        grupo_mercadorias VARCHAR(255),
        unid_medida_basica VARCHAR(50),
        grupo_compradores VARCHAR(255),
        codigo_abc VARCHAR(50),
        tipo_mrp VARCHAR(255),
        classe_avaliacao VARCHAR(255),
        controle_preco VARCHAR(50),
        preco NUMERIC(10, 2),
        moeda VARCHAR(10),
        unidade_preco INTEGER,
        criado_por VARCHAR(255)
    );
  `);
};

exports.down = (pgm) => {
  console.log("Revertendo a migration inicial...");

  // A ordem de 'DROP' é a inversa da de 'CREATE' para evitar problemas com chaves estrangeiras
  pgm.sql(`
    DROP TABLE IF EXISTS descricao_materiais;
    DROP TABLE IF EXISTS materiais_antena_ganho;
    DROP TABLE IF EXISTS cadeados;
    DROP TABLE IF EXISTS entrega_ferramentas;
    DROP TABLE IF EXISTS ferramentas;
    DROP TABLE IF EXISTS chips;
    DROP TABLE IF EXISTS acompanhamento_equipamento;
    DROP TABLE IF EXISTS activity_logs;
    DROP TABLE IF EXISTS users;
  `);
};