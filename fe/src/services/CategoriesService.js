import HttpClient from './utils/HttpClient';
import CategoryMapper from './mappers/CategoryMapper';

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

  createCategory(contact) {
    const body = CategoryMapper.toPersistence(contact);
    return this.httpClient.post('/categories', { body });
  }

  updateCategory(id, contact) {
    const body = CategoryMapper.toPersistence(contact);
    return this.httpClient.put(`/categories/${id}`, { body });
  }

  deleteCategory(id) {
    return this.httpClient.delete(`/categories/${id}`);
  }
}

export default new CategoriesService();
