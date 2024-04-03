import UserMapper from './mappers/UserMapper';
import HttpClient from './utils/HttpClient';

class UsersService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async signIn({ email, password }) {
    const body = UserMapper.toPersistenceSignIn({ email, password });
    return this.httpClient.post('/signin', { body });
  }

  async signUp(formData) {
    return this.httpClient.post('/signup', {
      formData,
    });
  }

  async signOut() {
    return this.httpClient.post('/signout');
  }

  async profile() {
    return this.httpClient.get('/profile');
  }
}

export default new UsersService();
