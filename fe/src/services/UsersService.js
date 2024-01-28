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

  async signUp({
    name, username, email, password,
  }) {
    const body = UserMapper.toPersistenceSignUp({
      name, username, email, password,
    });
    return this.httpClient.post('/signup', { body });
  }

  async signOut() {
    return this.httpClient.post('/signout');
  }
}

export default new UsersService();
