# GMAT - Gestão de Materiais

Sistema completo para gestão e controle de materiais desenvolvido com Node.js e React.

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Bcrypt** - Criptografia de senhas

### Frontend
- **React** - Biblioteca JavaScript para UI
- **Tailwind CSS** - Framework CSS
- **Axios** - Cliente HTTP

## 📋 Funcionalidades

- ✅ Cadastro e controle de materiais
- ✅ Movimentação de estoque (entrada/saída)
- ✅ Controle de responsáveis
- ✅ Autenticação de usuários
- ✅ Interface responsiva
- ✅ Relatórios de movimentação

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL
- npm ou yarn

### 1. Clone o repositório

```bash
git clone https://github.com/Jeymesz/GMAT.git
cd GMAT
```

### 2. Configuração do Backend

```bash
# Navegar para a pasta backend
cd backend

# Instalar dependências
npm install

# Criar arquivo .env com as configurações do banco
cp .env.example .env

# Configurar variáveis de ambiente no arquivo .env
# DATABASE_URL=postgresql://usuario:senha@localhost:5432/gmat
# JWT_SECRET=seu_jwt_secret_aqui
# PORT=3001

# Executar migrações do banco
npm run migrate

# Iniciar o servidor
npm run dev
```

### 3. Configuração do Frontend

```bash
# Em um novo terminal, navegar para a pasta frontend
cd frontend

# Instalar dependências
npm install

# Criar arquivo .env.local
echo "REACT_APP_API_URL=http://localhost:3001" > .env.local

# Iniciar a aplicação
npm start
```

## 🗄️ Estrutura do Banco de Dados

O sistema utiliza as seguintes tabelas principais:

- **usuarios** - Controle de acesso
- **itens** - Cadastro de materiais
- **movimentacoes** - Histórico de entrada/saída
- **responsaveis** - Controle de responsabilidade

## 📱 Como Usar

1. **Acesse o sistema** em `http://localhost:3000`
2. **Faça login** com suas credenciais
3. **Cadastre materiais** na seção "Itens"
4. **Registre movimentações** de entrada e saída
5. **Acompanhe o estoque** em tempo real
6. **Consulte relatórios** de movimentação

## 🔧 Scripts Disponíveis

### Backend
```bash
npm run dev          # Iniciar servidor em modo desenvolvimento
npm run start        # Iniciar servidor em produção
npm run migrate      # Executar migrações do banco
npm test            # Executar testes
```

### Frontend
```bash
npm start           # Iniciar aplicação React
npm run build       # Build para produção
npm test           # Executar testes
npm run eject      # Ejetar configuração (irreversível)
```

## 🌐 Variáveis de Ambiente

### Backend (.env)
```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/gmat
JWT_SECRET=seu_jwt_secret_super_seguro
PORT=3001
NODE_ENV=development
```

### Frontend (.env.local)
```env
REACT_APP_API_URL=http://localhost:3001
```

## 📝 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login do usuário
- `POST /api/auth/register` - Registro de usuário

### Itens
- `GET /api/itens` - Listar todos os itens
- `POST /api/itens` - Criar novo item
- `PUT /api/itens/:id` - Atualizar item
- `DELETE /api/itens/:id` - Deletar item

### Movimentações
- `GET /api/movimentacoes` - Listar movimentações
- `POST /api/movimentacoes` - Criar nova movimentação
- `GET /api/movimentacoes/:id` - Buscar movimentação específica

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👤 Autor

**Jeymeson Belizário Guimarães**
- GitHub: [@Jeymesz](https://github.com/Jeymesz)
- Email: jeymeson.guimaraes@eqtlcontratada.com.br

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas, abra uma [issue](https://github.com/Jeymesz/GMAT/issues) no GitHub.

---

⭐ Se este projeto te ajudou, deixe uma estrela no repositório!
