import HttpClient from './utils/HttpClient';
import UploadMapper from './mappers/UploadMapper';

class UploadService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async uploadFile(data) {
    const body = UploadMapper.toPersistence(data);

    return this.httpClient.post('/upload', { body });
  }
}

export default new UploadService();
