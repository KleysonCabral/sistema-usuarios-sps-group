const { Router } = require("express");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const routes = Router();

// Rota de status da API
routes.get("/", (req, res) => {
  res.json({
    message: "API SPS Group - Sistema de Gerenciamento de Usuários",
    version: "1.0.0",
    status: "online",
    endpoints: {
      auth: {
        login: "POST /auth/login"
      },
      users: {
        list: "GET /users",
        show: "GET /users/:id",
        create: "POST /users",
        update: "PUT /users/:id",
        delete: "DELETE /users/:id"
      }
    }
  });
});

// Rotas de autenticação
routes.use("/auth", authRoutes);

// Rotas de usuários
routes.use("/users", userRoutes);

module.exports = routes;
