    exports.shorthands = undefined;

    exports.up = (pgm) => {
      console.log("Adicionando a coluna 'nome_responsavel_texto' à tabela 'itens'...");
      pgm.addColumn('itens', {
        nome_responsavel_texto: { type: 'varchar(255)' }
      });
      console.log("Coluna adicionada com sucesso.");
    };

    exports.down = (pgm) => {
      console.log("Removendo a coluna 'nome_responsavel_texto' da tabela 'itens'...");
      pgm.dropColumn('itens', 'nome_responsavel_texto');
    };
    