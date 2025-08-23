// Script de debug para testar o token
import axios from 'axios';

// Simular um token no localStorage
localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlhdCI6MTczNzU2NzA1NSwiZXhwIjoxNzM3NjUzNDU1fQ.WyRbKvq1B1-YV_w9R3KVJOKQk4bCGbL3DiFLU3UHOC8');

// Configurar interceptor
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Fazer uma requisição de teste
const testRequest = async () => {
  try {
    console.log('🧪 Testando requisição com token...');
    console.log('🔑 Token:', token);
    console.log('⚙️ Headers:', axios.defaults.headers.common);
    
    const response = await axios.get('http://localhost:3005/users');
    console.log('✅ Sucesso!', response.data);
  } catch (error) {
    console.error('❌ Erro:', error.response?.data);
  }
};

testRequest();
