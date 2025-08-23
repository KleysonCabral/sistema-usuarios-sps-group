import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import UserService from "../services/UserService";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      
      const userData = await UserService.list();
      const userArray = Array.isArray(userData) ? userData : [];
      
      setUsers(userArray);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
      setError(err.message || "Erro ao carregar usuários");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!userId) return;
    
    try {
      await UserService.delete(userId);
      setUsers(users.filter(user => user.id !== userId));
      setDeleteConfirm(null);
    } catch (err) {
      setError(err.message || "Erro ao excluir usuário");
      console.error("Erro ao excluir usuário:", err);
    }
  };

  const confirmDelete = (user) => {
    setDeleteConfirm(user);
  };

  if (loading) {
    return (
      <div className="users-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando usuários...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="users-container">
      <div className="users-header">
        <div className="header-content">
          <h1>Gerenciamento de Usuários</h1>
          <div className="header-actions">
            <Link to="/users/new" className="btn btn-primary">
              + Novo Usuário
            </Link>
            <button onClick={logout} className="btn btn-secondary">
              Sair
            </button>
          </div>
        </div>
      </div>

      <div className="users-content">
        {error && (
          <div className="error-banner">
            <span>❌ {error}</span>
            <button onClick={loadUsers} className="btn btn-secondary btn-sm">
              Tentar Novamente
            </button>
          </div>
        )}

        {users.length === 0 ? (
          <div className="empty-state">
            <h3>Nenhum usuário encontrado</h3>
            <p>Comece criando seu primeiro usuário.</p>
            <Link to="/users/new" className="btn btn-primary">
              Criar Usuário
            </Link>
          </div>
        ) : (
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Tipo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(users) && users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`user-type user-type-${user.type}`}>
                        {user.type}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Link 
                          to={`/users/${user.id}`} 
                          className="btn btn-primary btn-sm"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => confirmDelete(user)}
                          className="btn btn-danger btn-sm"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de confirmação de exclusão */}
      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmar Exclusão</h3>
            <p>
              Tem certeza que deseja excluir o usuário <strong>{deleteConfirm.name}</strong>?
            </p>
            <p className="modal-warning">Esta ação não pode ser desfeita.</p>
            <div className="modal-actions">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                className="btn btn-danger"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
