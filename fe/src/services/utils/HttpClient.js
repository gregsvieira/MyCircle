import APIError from '../../errors/APIError';
import delay from '../../utils/delay';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(path, options) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
    });
  }

  post(path, options) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
      formData: options?.formData,
    });
  }

  put(path, options) {
    return this.makeRequest(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
    });
  }

  delete(path, options) {
    return this.makeRequest(path, {
      method: 'DELETE',
      headers: options?.headers,
    });
  }

  async makeRequest(path, options) {
    await delay(500);
    const headers = new Headers();
    let body = null;

    if (options.body) {
      headers.set('Content-Type', 'application/json');
      body = JSON.stringify(options.body);
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }

    let response;
    if (options.formData) {
      const {
        image, name, username, email, password,
      } = options.formData;

      const formData = new FormData();
      formData.append('file', image);
      formData.append('name', name);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      body = formData;
      response = await fetch(`${this.baseURL}${path}`, {
        method: options.method,
        body: formData,
      });
    }

    if (!options.formData) {
      response = await fetch(`${this.baseURL}${path}`, {
        credentials: 'include',
        method: options.method,
        body,
        headers,
      });
    }

    let responseBody = null;
    const contentType = response.headers.get('Content-Type');
    if (contentType?.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    let error;
    if (response.status === 400) {
      error = { error: 'badRequest' };
      return error;
    }

    if (response.status === 401) {
      error = { error: 'authenticationError' };
      return error;
    }

    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
