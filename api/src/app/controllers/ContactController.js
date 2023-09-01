const ContactsRepository = require('../repositories/ContactsRepository');
// const validate = require('../utils');

class ContactController {
  // Listar todos os registros
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);
    return response.json(contacts);
  }

  // Obter um registro
  async show(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    // 404: Not found
    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    return response.json(contact);
  }

  // Criar novo registro
  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    // emptyFields = validate();
    if (!name || !email || !phone) {
      // eslint-disable-next-line no-nested-ternary
      const emptyParam = !name ? 'name' : !email ? 'email' : !phone ? 'phone' : '';
      return response.status(400).json({ error: `${emptyParam} is required` });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    return response.json(contact);
  }

  // Editar um registro
  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found!' });
    }
    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });

    return response.json(contact);
  }

  // Deletar um registro
  async delete(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    // 404: Not found
    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    await ContactsRepository.delete(id);
    // 204: No content
    return response.sendStatus(204);
  }
}

// Sigleton - Design Pattern
module.exports = new ContactController();
