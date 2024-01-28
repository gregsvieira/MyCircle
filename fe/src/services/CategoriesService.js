/* eslint-disable prefer-destructuring */
import HttpClient from './utils/HttpClient';
import CategoryMapper from './mappers/CategoryMapper';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listCategories(signal, orderBy = 'asc') {
    const categories = await this.httpClient.get(`/categories?orderBy=${orderBy}`, { signal });
    if (categories.error) {
      const error = categories;
      return error;
    }
    return categories.map(CategoryMapper.toDomain);
  }

  async getCategoryById(id) {
    const category = await this.httpClient.get(`/categories/${id}`);
    if (category.error) {
      const error = category;
      return error;
    }
    return CategoryMapper.toDomain(category);
  }

  async createCategory(category) {
    const body = CategoryMapper.toPersistence(category);
    const response = await this.httpClient.post('/categories', { body });
    if (response.error) {
      const error = response;
      return error;
    }
    return response;
  }

  async updateCategory(id, category) {
    const body = CategoryMapper.toPersistence(category);
    const response = await this.httpClient.put(`/categories/${id}`, { body });
    if (response.error) {
      const error = response;
      return error;
    }
    return response;
  }

  async deleteCategory(id) {
    const response = await this.httpClient.delete(`/categories/${id}`);
    if (response.error) {
      const error = response;
      return error;
    }
    return response;
  }
}

export default new CategoriesService();
