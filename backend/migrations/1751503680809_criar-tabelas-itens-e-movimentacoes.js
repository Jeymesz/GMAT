// migrations/XXXXXXXXXXXXX_criar_tabelas_itens_e_movimentacoes.js

exports.shorthands = undefined;

// A função 'up' é executada quando aplicamos a migration
exports.up = (pgm) => {
  console.log("Criando as tabelas 'itens' e 'movimentacoes'...");

  // Tabela 'itens' - Nosso inventário centralizado
  pgm.createTable('itens', {
    id: 'id', // Atalho para SERIAL PRIMARY KEY
    tipo_item: { type: 'varchar(50)', notNull: true }, // Ex: 'chip', 'ferramenta'
    identificador_unico: { type: 'varchar(255)', notNull: true }, // Ex: SSN do chip, código da ferramenta
    descricao: { type: 'text' },
    status: { type: 'varchar(50)', default: 'Disponível' },
    id_responsavel: {
      type: 'integer',
      references: '"users"(id)', // Chave estrangeira para a tabela de usuários
      onDelete: 'SET NULL', // Se o usuário for deletado, o item fica sem responsável
    },
    propriedades: { type: 'jsonb' }, // Campo flexível para dados específicos (operadora, etc)
    created_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('now()'),
    },
    updated_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('now()'),
    },
  });

  // Criando um índice único para garantir que não haja dois itens do mesmo tipo com o mesmo identificador
  // Ex: não podem existir dois chips com o mesmo SSN.
  pgm.addConstraint('itens', 'itens_tipo_identificador_unico', {
    unique: ['tipo_item', 'identificador_unico'],
  });

  // Tabela 'movimentacoes' - O histórico de cada item
  pgm.createTable('movimentacoes', {
    id: 'id',
    id_item: {
      type: 'integer',
      notNull: true,
      references: '"itens"(id)',
      onDelete: 'CASCADE', // Se um item for deletado, todo seu histórico também será.
    },
    tipo_movimentacao: { type: 'varchar(50)', notNull: true }, // Ex: 'ENTREGA', 'DEVOLUCAO'
    data_movimentacao: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('now()'),
    },
    id_usuario_logado: {
      type: 'integer',
      references: '"users"(id)',
      onDelete: 'SET NULL',
    },
    observacoes: { type: 'text' },
  });
};

// A função 'down' é executada quando revertemos a migration
exports.down = (pgm) => {
    console.log("Revertendo a migration: removendo as tabelas 'movimentacoes' e 'itens'...");
    
    // A ordem de remoção é a inversa da criação para respeitar as chaves estrangeiras
    pgm.dropTable('movimentacoes');
    pgm.dropTable('itens');
};