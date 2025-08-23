import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Redireciona para onde o usuário queria ir, ou para /users por padrão
  const from = location.state?.from?.pathname || '/users';

  // Se já estiver logado, redireciona
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      setIsLoading(false);
      return;
    }

    const result = await login(email, password);
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = () => {
    console.log('Demo login clicked!'); // Debug
    setEmail('admin@spsgroup.com.br');
    setPassword('1234');
    console.log('Email and password set'); // Debug
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-header">
          <h1>SPS Group</h1>
          <p>Sistema de Gerenciamento de Usuários</p>
        </div>
        
        <form onSubmit={handleSubmit} className="signin-form">
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              disabled={isLoading}
            />
          </div>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            className="signin-button"
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
          
          <div className="demo-section">
            <p>Credenciais para teste:</p>
            <button 
              type="button" 
              className="demo-button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              style={{ 
                display: 'block', 
                margin: '0 auto',
                minWidth: '200px',
                padding: '10px 20px',
                backgroundColor: 'transparent',
                border: '2px solid #667eea',
                color: '#667eea',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Usar credenciais admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
