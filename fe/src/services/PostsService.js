import PostMapper from './mappers/PostMapper';
import HttpClient from './utils/HttpClient';

class PostsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listPosts(orderBy = 'desc') {
    const posts = await this.httpClient.get(`/posts?orderBy=${orderBy}`);
    if (posts.error) {
      const error = posts;
      return error;
    }

    return posts.map(PostMapper.toDomain);
  }

  async createPost(post) {
    console.log('post no service', post);
    const body = PostMapper.toPersistence(post);
    const response = await this.httpClient.post('/posts/', { body });
    if (response.error) {
      const error = response;
      return error;
    }
    return response;
  }
}

export default new PostsService();
