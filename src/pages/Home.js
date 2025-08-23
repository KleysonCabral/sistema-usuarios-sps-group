import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Home.css";

function Home() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // Se estiver logado, redireciona para /users
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/users');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="home-container">
      <div className="home-content">
        <header className="home-header">
          <h1>SPS Group</h1>
          <p>Sistema de Gerenciamento de Usuários</p>
        </header>

        {isAuthenticated ? (
          <div className="home-authenticated">
            <p>Bem-vindo, {user?.email || 'Usuário'}!</p>
            <div className="home-actions">
              <Link to="/users" className="btn btn-primary">
                Gerenciar Usuários
              </Link>
              <button onClick={logout} className="btn btn-secondary">
                Sair
              </button>
            </div>
          </div>
        ) : (
          <div className="home-guest">
            <p>Faça login para acessar o sistema</p>
            <Link to="/signin" className="btn btn-primary">
              Fazer Login
            </Link>
          </div>
        )}

        <div className="home-info">
          <h3>Funcionalidades:</h3>
          <ul>
            <li>✅ Autenticação segura com JWT</li>
            <li>✅ CRUD completo de usuários</li>
            <li>✅ Validação de e-mail único</li>
            <li>✅ Interface responsiva e intuitiva</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
