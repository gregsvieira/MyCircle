import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  listCategories() {
    return this.httpClient.get('/categories');
  }

  createCategory(name) {
    return this.httpClient.post('/categories', { body: name });
  }
}

export default new CategoriesService();
