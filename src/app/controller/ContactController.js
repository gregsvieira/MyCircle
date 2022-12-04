const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  // Listar todos os registros
  async index(request, response) {
    const contacts = await ContactsRepository.findAll();
    response.json(contacts);
  }

  async show() {
    // Obter um registro
  }

  async store() {
    // Criar novo registro
  }

  async update() {
    // Editar um registro
  }

  async delete() {
    // Deletar um registro
  }
}

// Sigleton - Design Pattern
module.exports = new ContactController();
