import ContactMapper from './mappers/ContactMapper';
import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(signal, orderBy = 'asc') {
    const contacts = await this.httpClient.get(`/contacts?orderBy=${orderBy}`, { signal });

    if (contacts.error) {
      const error = contacts;
      return error;
    }
    return contacts.map(ContactMapper.toDomain);
  }

  async getContactById(id) {
    const contact = await this.httpClient.get(`/contacts/${id}`);

    if (contact.error) {
      const error = contact;
      return error;
    }
    return ContactMapper.toDomain(contact);
  }

  async createContact(contact) {
    const body = ContactMapper.toPersistence(contact);
    const response = await this.httpClient.post('/contacts', { body });
    if (response.error) {
      const error = response;
      return error;
    }
    return response;
  }

  async updateContact(id, contact) {
    const body = ContactMapper.toPersistence(contact);
    const response = await this.httpClient.put(`/contacts/${id}`, { body });
    if (response.error) {
      const error = response;
      return error;
    }
    return response;
  }

  async deleteContact(id) {
    const response = await this.httpClient.delete(`/contacts/${id}`);
    if (response.error) {
      const error = response;
      return error;
    }
    return response;
  }
}

export default new ContactsService();
