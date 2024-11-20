import axios from 'axios';

class AuthService {
  private apiUrl = 'http://localhost:8088/auth';

  async login(username: string, password: string): Promise<string> {
    try {
      const response = await axios.post(this.apiUrl, {
        username,
        password
      });
      
      const token = response.data.token; 
      this.saveToken(token);
      return token;
    } catch (error) {
      console.error('Error de autenticación:', error);
      throw new Error('Error al iniciar sesión');
    }
  }

  private saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    return this.getToken() !== null;
  }
}

export default new AuthService();
