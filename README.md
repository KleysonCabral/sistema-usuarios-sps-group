# 🚀 Sistema de Gerenciamento de Usuários - SPS Group

Sistema CRUD completo desenvolvido em React para gerenciamento de usuários com autenticação JWT e interface moderna.

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como parte do processo seletivo da **SPS Group**, demonstrando a implementação de um sistema completo de gerenciamento de usuários com as melhores práticas de desenvolvimento frontend.

## ✨ Funcionalidades

- 🔐 **Autenticação JWT** - Sistema de login seguro com tokens
- 👥 **CRUD Completo** - Criar, listar, editar e excluir usuários
- 🛡️ **Rotas Protegidas** - Controle de acesso baseado em autenticação
- 📱 **Design Responsivo** - Interface adaptada para mobile e desktop
- ⚡ **UX Moderna** - Animações, loading states e feedback visual
- 🔄 **Interceptors HTTP** - Configuração automática de headers de autenticação
- 📊 **Gestão de Estado** - Context API para estado global da aplicação
- ✅ **Estados de Loading**: Feedback visual durante operações
- ✅ **Tratamento de Erros**: Mensagens claras para o usuário
- ✅ **Confirmação de Exclusão**: Modal de confirmação para segurança

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React 18, React Router 6, Context API
- **HTTP Client:** Axios com interceptors
- **Styling:** CSS3 com Flexbox/Grid, animações e gradientes
- **Autenticação:** JWT (JSON Web Tokens)
- **Build Tool:** Create React App
- **Backend:** Node.js + Express (API REST)

## � Credenciais de Teste

Para testar o sistema, utilize as seguintes credenciais:

- **Email:** `admin@spsgroup.com.br`
- **Senha:** `admin123` (ou conforme configurado no backend)

## �📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Backend da aplicação rodando (test-sps-server)

## 🔧 Instalação e Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SPS-Group/test-sps-react.git
   cd test-sps-react
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o ambiente:**
   ```bash
   # O arquivo .env já está configurado com:
   REACT_APP_SERVER_URL=http://localhost:3005
   ```

4. **Inicie a aplicação:**
   ```bash
   npm start
   ```

5. **Acesse no navegador:**
   ```
   http://localhost:3000
   ```

## 🔐 Credenciais para Teste

Para testar a aplicação, use as credenciais do usuário administrador:

- **E-mail:** admin@spsgroup.com.br
- **Senha:** 1234

## 📱 Como Usar

### 1. **Login**
- Acesse a página inicial
- Clique em "Fazer Login"
- Use as credenciais de teste ou clique em "Usar credenciais admin"

### 2. **Listar Usuários**
- Após o login, você será redirecionado para a lista de usuários
- Visualize todos os usuários cadastrados com seus tipos

### 3. **Criar Usuário**
- Clique em "+ Novo Usuário"
- Preencha os campos obrigatórios:
  - Nome
  - E-mail (deve ser único)
  - Tipo (Usuário, Administrador, Gerente)
  - Senha (mínimo 4 caracteres)

### 4. **Editar Usuário**
- Na lista, clique em "Editar" na linha do usuário
- Modifique os dados necessários
- A senha é opcional na edição

### 5. **Excluir Usuário**
- Na lista, clique em "Excluir"
- Confirme a exclusão no modal

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   └── ProtectedRoute.js     # Componente de rota protegida
├── contexts/
│   └── AuthContext.js        # Contexto de autenticação
├── pages/
│   ├── Home.js              # Página inicial
│   ├── SignIn.js            # Página de login
│   ├── Users.js             # Lista de usuários
│   └── UserEdit.js          # Criação/edição de usuários
├── services/
│   └── UserService.js       # Serviço para API
├── index.js                 # Ponto de entrada
└── routes.js               # Configuração de rotas
```

## 🎨 Características da Interface

- **Design Moderno**: Gradientes, sombras e animações suaves
- **Responsivo**: Funciona perfeitamente em mobile e desktop
- **Acessibilidade**: Labels apropriados e navegação por teclado
- **UX Intuitiva**: Feedbacks visuais e mensagens claras

## 🔒 Segurança

- **JWT Token**: Armazenado no localStorage e enviado automaticamente
- **Rotas Protegidas**: Acesso restrito apenas a usuários autenticados
- **Interceptors**: Configuração automática do Axios com token
- **Validação**: Validações no frontend e tratamento de erros da API

## 📋 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm build` - Cria build de produção
- `npm test` - Executa testes
- `npm eject` - Remove dependência do Create React App

## 🐛 Resolução de Problemas

### Erro de conexão com API
- Verifique se o backend está rodando na porta 3001
- Confirme a URL no arquivo `.env`

### Erro de autenticação
- Limpe o localStorage do navegador
- Tente fazer login novamente

### Problemas de instalação
- Delete `node_modules` e `package-lock.json`
- Execute `npm install` novamente

## 🚀 Deploy

Para fazer deploy em produção:

1. **Build da aplicação:**
   ```bash
   npm run build
   ```

2. **Configure a variável de ambiente:**
   ```bash
   REACT_APP_SERVER_URL=https://sua-api-backend.com
   ```

## 👨‍💻 Desenvolvedor

Este projeto foi desenvolvido para o processo seletivo da **SPS Group**, demonstrando habilidades em:

- Desenvolvimento React moderno
- Gerenciamento de estado
- Integração com APIs REST
- Design de interfaces
- Boas práticas de código
- Documentação técnica

---

**Status:** ✅ Completo e funcional
**Versão:** 1.0.0
**Data:** Agosto 2025

## 🎯 Habilidades Demonstradas

Este projeto demonstra domínio em:

- ⚛️ **React 18** com hooks modernos e boas práticas
- 🔄 **Context API** para gerenciamento de estado global
- 🛣️ **React Router 6** com rotas protegidas
- 📡 **Axios** com interceptors e tratamento de erros
- 🔐 **JWT Authentication** implementação completa
- 🎨 **CSS3** avançado com design responsivo
- 🐛 **Debugging** e logs estruturados
- 🏗️ **Arquitetura limpa** e separação de responsabilidades

## 👨‍💻 Desenvolvido por

**Kleyson da Silva Cabral**
- 🎯 Candidato à vaga na SPS Group
- ⚛️ Especialista em React e desenvolvimento frontend
- 🚀 Apaixonado por criar experiências de usuário excepcionais

---

## 📝 Requisitos Originais Atendidos

### ESPANHOL
## PRUEBA SPS REACT
- ✅ Crear un CRUD de usuarios

## Reglas
- ✅ Crear la página de inicio de sesión (signIn) para autenticar al usuario
- ✅ Se puede utilizar cualquier tipo de almacenamiento para guardar el token
- ✅ Solo será posible registrar y/o visualizar usuarios si el usuario está autenticado
- ✅ Consumir la API creada anteriormente (test-sps-server)

### PORTUGUÊS
# SPS REACT TEST
- ✅ Criar um CRUD de usuários

# Regras
- ✅ Criar a página de signIn para fazer a autenticação do usuário
- ✅ Pode usar qualquer tipo de storage para guardar o token
- ✅ Só será possível cadastrar e/ou visualizar os usuários se estiver autenticado
- ✅ Chamar a API que foi criada anteriormente (test-sps-server)

---

 **Agradeço desde já a oportunidade de demonstrar minhas habilidades técnicas!** 

🚀 **Pronto para contribuir com a SPS Group!** 🚀
