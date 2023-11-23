import HttpClient from './utils/HttpClient';
import CategoryMapper from './mappers/CategoryMapper';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listCategories(orderBy = 'asc') {
    const categories = await this.httpClient.get(`/categories?orderBy=${orderBy}`);

    return categories.map(CategoryMapper.toDomain);
  }

  async getCategoryById(id) {
    const category = await this.httpClient.get(`/categories/${id}`);
    return CategoryMapper.toDomain(category);
  }

  createCategory(category) {
    const body = CategoryMapper.toPersistence(category);
    return this.httpClient.post('/categories', { body });
  }

  updateCategory(id, category) {
    const body = CategoryMapper.toPersistence(category);
    return this.httpClient.put(`/categories/${id}`, { body });
  }

  deleteCategory(id) {
    return this.httpClient.delete(`/categories/${id}`);
  }
}

export default new CategoriesService();
