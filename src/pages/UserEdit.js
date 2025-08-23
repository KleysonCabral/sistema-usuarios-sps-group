import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import UserService from "../services/UserService";
import { useAuth } from "../contexts/AuthContext";
import "./UserEdit.css";

export function userLoader({ params }) {
  // Este loader será usado pelo React Router, mas vamos carregar os dados no componente
  // para ter melhor controle de erro e loading states
  return { userId: params.userId };
}

function UserEdit() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "user",
    password: "",
  });

  const isEditing = !!userId && userId !== "new";

  useEffect(() => {
    if (isEditing) {
      loadUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, isEditing]);

  const loadUser = async () => {
    try {
      setLoading(true);
      setError("");
      
      const user = await UserService.get(userId);
      
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      
      setFormData({
        name: user.name || "",
        email: user.email || "",
        type: user.type || "user",
        password: "",
      });
    } catch (err) {
      setError(err.message || "Erro ao carregar usuário");
      console.error("Erro ao carregar usuário:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar mensagens ao editar
    if (error) setError("");
    if (success) setSuccess("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Nome é obrigatório");
      return false;
    }
    if (!formData.email.trim()) {
      setError("E-mail é obrigatório");
      return false;
    }
    if (!formData.email.includes("@")) {
      setError("E-mail deve ter um formato válido");
      return false;
    }
    if (!isEditing && !formData.password) {
      setError("Senha é obrigatória para novos usuários");
      return false;
    }
    if (formData.password && formData.password.length < 4) {
      setError("Senha deve ter pelo menos 4 caracteres");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const userData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        type: formData.type,
      };

      // Só incluir senha se foi informada
      if (formData.password) {
        userData.password = formData.password;
      }

      if (isEditing) {
        await UserService.update(userId, userData);
        setSuccess("Usuário atualizado com sucesso!");
      } else {
        await UserService.create(userData);
        setSuccess("Usuário criado com sucesso!");
        // Limpar formulário após criação
        setFormData({
          name: "",
          email: "",
          type: "user",
          password: "",
        });
      }

      // Redirecionar após sucesso (com delay para mostrar mensagem)
      setTimeout(() => {
        navigate("/users");
      }, 1500);

    } catch (err) {
      setError(err.message || `Erro ao ${isEditing ? 'atualizar' : 'criar'} usuário`);
      console.error("Erro ao salvar usuário:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="user-edit-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando usuário...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-edit-container">
      <div className="user-edit-header">
        <div className="header-content">
          <div className="header-info">
            <Link to="/users" className="back-link">← Voltar para Usuários</Link>
            <h1>{isEditing ? 'Editar Usuário' : 'Novo Usuário'}</h1>
          </div>
          <button onClick={logout} className="btn btn-secondary">
            Sair
          </button>
        </div>
      </div>

      <div className="user-edit-content">
        <div className="form-card">
          {error && (
            <div className="message error-message">
              ❌ {error}
            </div>
          )}
          
          {success && (
            <div className="message success-message">
              ✅ {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="user-form">
            <div className="form-group">
              <label htmlFor="name">Nome *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Digite o nome completo"
                disabled={saving}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Digite o e-mail"
                disabled={saving}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Tipo de Usuário *</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                disabled={saving}
                required
              >
                <option value="user">Usuário</option>
                <option value="admin">Administrador</option>
                <option value="manager">Gerente</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Senha {isEditing ? '(deixe em branco para não alterar)' : '*'}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={isEditing ? "Nova senha (opcional)" : "Digite a senha"}
                disabled={saving}
                required={!isEditing}
                minLength="4"
              />
            </div>

            <div className="form-actions">
              <Link to="/users" className="btn btn-secondary">
                Cancelar
              </Link>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <div className="loading-spinner"></div>
                    {isEditing ? 'Atualizando...' : 'Criando...'}
                  </>
                ) : (
                  isEditing ? 'Atualizar Usuário' : 'Criar Usuário'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserEdit;
