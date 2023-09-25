import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  listCategories(orderBy = 'asc') {
    return this.httpClient.get(`/categories?orderBy=${orderBy}`);
  }

  getCategoryById(id) {
    return this.httpClient.get(`/categories/${id}`);
  }

  createCategory(name) {
    return this.httpClient.post('/categories', { body: name });
  }

  updateCategory(id, category) {
    console.log(category);
    return this.httpClient.put(`/categories/${id}`, { body: category });
  }

  deleteCategory(id) {
    return this.httpClient.delete(`/categories/${id}`);
  }
}

export default new CategoriesService();
