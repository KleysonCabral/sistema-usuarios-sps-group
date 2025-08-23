import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL;

class UserService {
  async list() {
    try {
      const response = await axios.get(`${API_URL}/users`);
      const userData = response.data.users || response.data;
      return userData;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async get(id) {
    try {
      const response = await axios.get(`${API_URL}/users/${id}`);
      const userData = response.data.user || response.data;
      return userData;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async create(userData) {
    try {
      const response = await axios.post(`${API_URL}/users`, userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async update(id, userData) {
    try {
      const response = await axios.put(`${API_URL}/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete(id) {
    try {
      await axios.delete(`${API_URL}/users/${id}`);
      return true;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      // Erro do servidor (status 4xx, 5xx)
      return {
        message: error.response.data.message || 'Erro no servidor',
        status: error.response.status,
      };
    } else if (error.request) {
      // Erro de rede
      return {
        message: 'Erro de conexão com o servidor',
        status: 0,
      };
    } else {
      // Outro erro
      return {
        message: error.message || 'Erro desconhecido',
        status: -1,
      };
    }
  }
}

const userService = new UserService();
export default userService;
