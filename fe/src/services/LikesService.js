import LikeMapper from './mappers/LikeMapper';
import HttpClient from './utils/HttpClient';

class LikesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async likePost(postId) {
    const body = LikeMapper.toPersistence(postId);

    const response = await this.httpClient.post('/posts/like', { body });
    if (response.error) {
      const error = response;
      return error;
    }

    return response;
  }

  async unlikePost(postId) {
    const body = LikeMapper.toPersistence(postId);

    const response = await this.httpClient.post('/posts/unlike', { body });
    if (response.error) {
      const error = response;
      return error;
    }

    return response;
  }
}

export default new LikesService();
