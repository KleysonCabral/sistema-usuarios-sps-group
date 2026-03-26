#  Sistema de Gerenciamento de Usuários - SPS Group

Sistema CRUD completo com frontend React e backend Node.js para gerenciamento de usuários com autenticação JWT e interface moderna.

##  Sobre o Projeto

Este projeto foi desenvolvido como parte do processo seletivo da **SPS Group**, demonstrando a implementação de um sistema completo de gerenciamento de usuários com as melhores práticas de desenvolvimento full-stack.

##  Estrutura do Projeto

```
sistema-usuarios-sps-group/
 src/               # Aplicação React
 public/
 package.json
 backend/           # API Node.js + Express  
    src/
       controllers/
       middlewares/
       repositories/
       routes/
    package.json
    README.md
 README.md
```

##  Funcionalidades

### Frontend (React)
-  **Autenticação JWT** - Sistema de login seguro com tokens
-  **CRUD Completo** - Criar, listar, editar e excluir usuários
-  **Rotas Protegidas** - Controle de acesso baseado em autenticação
-  **Design Responsivo** - Interface adaptada para mobile e desktop
-  **UX Moderna** - Animações, loading states e feedback visual
-  **Interceptors HTTP** - Configuração automática de headers
-  **Gestão de Estado** - Context API para estado global

### Backend (Node.js)
-  **API REST** - Endpoints completos para CRUD de usuários
-  **JWT Authentication** - Sistema de autenticação seguro
-  **Middleware de Segurança** - Proteção de rotas e validações
-  **Validação de Dados** - Verificações de integridade
-  **Repository Pattern** - Abstração da camada de dados
-  **CORS Configurado** - Integração frontend/backend

##  Tecnologias Utilizadas

### Frontend
- **React 18** - Library principal
- **React Router 6** - Roteamento
- **Context API** - Gerenciamento de estado
- **Axios** - Cliente HTTP
- **CSS3** - Estilização moderna

### Backend  
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **JWT** - Autenticação
- **bcryptjs** - Criptografia
- **CORS** - Configuração de origem

##  Como Executar

### 1. Clone o repositório
```bash
git clone https://github.com/KleysonCabral/sistema-usuarios-sps-group.git
cd sistema-usuarios-sps-group
```

### 2. Backend (API)
```bash
cd backend
npm install
npm start
```
 Backend rodará em: `http://localhost:3005`

### 3. Frontend (React)
```bash
cd frontend  
npm install
npm start
```
 Frontend rodará em: `http://localhost:3000`

##  Credenciais de Teste

Para testar o sistema completo:

- **Email:** `admin@spsgroup.com.br`
- **Senha:** `1234`

##  API Endpoints

- `POST /auth/login` - Autenticação
- `GET /users` - Listar usuários
- `GET /users/:id` - Buscar usuário específico
- `POST /users` - Criar usuário
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

##  Testes

### Postman
Importe o arquivo `backend/api-collection.postman_collection.json` para testar a API.

### Interface Web
Acesse `http://localhost:3000` após iniciar frontend e backend.

##  Arquitetura

### Frontend
- **Components:** Componentes reutilizáveis
- **Pages:** Páginas da aplicação  
- **Contexts:** Gerenciamento de estado
- **Services:** Integração com API

### Backend
- **Controllers:** Lógica de negócio
- **Middlewares:** Interceptadores
- **Repositories:** Camada de dados
- **Routes:** Definição de endpoints

##  Segurança

-  **JWT Tokens** com expiração
-  **Rotas protegidas** no frontend e backend
-  **Validação de dados** em ambas as camadas
-  **Criptografia de senhas** no backend
-  **Headers CORS** configurados

##  Desenvolvedor

**Kleyson da Silva Cabral**
-  Candidato à vaga na SPS Group
-  Especialista em React e Node.js
-  Apaixonado por criar soluções completas

##  Requisitos Atendidos

### Frontend (React)
-  CRUD completo de usuários
-  Página de SignIn para autenticação  
-  Token storage (localStorage)
-  Rotas protegidas por autenticação
-  Integração com API backend

### Backend (Node.js)
-  API REST completa
-  Autenticação JWT
-  CRUD de usuários
-  Middleware de segurança
-  Validações e tratamento de erros

---

**Status:**  Projeto Completo e Funcional  
**Data:** 23/08/25 às 17:20 horário de Manaus - Amazonas

 **Pronto para contribuir com a SPS Group!** 

