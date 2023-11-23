const ContactsRepository = require('../repositories/ContactsRepository');
const validate = require('../utils/validateFields');
const isValidEmail = require('../utils/isValidEmail');
const isValidUUID = require('../utils/isValidUUID');
const getErrorMessage = require('../utils/getErrorMessage');

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

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid Contact ID' });
    }

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

    const { emptyFields, validatorsErrors, isValid } = validate({
      body: request.body,
      requiredFields: ['name', 'email', 'phone'],
      validators: {
        email: isValidEmail,
        category_id: isValidUUID,
      },
    });

    if (!isValid && emptyFields.length) {
      const errorMessage = getErrorMessage(emptyFields, 'is required', 'is required');
      return response.status(400).json({ error: errorMessage });
    }

    if (!isValid && validatorsErrors.length) {
      const errorMessage = getErrorMessage(validatorsErrors, 'is wrong', 'has validation errors');
      return response.status(400).json({ error: errorMessage });
    }

    if (email) {
      const contactExists = await ContactsRepository.findByEmail(email);
      if (contactExists) {
        return response.status(400).json({ error: 'This e-mail is already in use' });
      }
    }

    const contact = await ContactsRepository.createNewContact({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    return response.status(201).json(contact);
  }

  // Editar um registro
  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const { emptyFields, validatorsErrors, isValid } = validate({
      body: {
        ...request.body,
        ...request.params,
      },
      requiredFields: ['id', 'name', 'email', 'phone'],
      validators: {
        id: isValidUUID,
        email: isValidEmail,
        category_id: isValidUUID,
      },
    });

    if (!isValid && emptyFields.length) {
      const errorMessage = getErrorMessage(emptyFields, 'is required', 'is required');
      return response.status(400).json({ error: errorMessage });
    }

    if (!isValid && validatorsErrors.length) {
      const errorMessage = getErrorMessage(validatorsErrors, 'is wrong', 'has validation errors');
      return response.status(400).json({ error: errorMessage });
    }

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found!' });
    }

    if (email) {
      const contactByEmail = await ContactsRepository.findByEmail(email);
      if (contactByEmail && contactByEmail.id !== id) {
        return response.status(400).json({ error: 'This e-mail is already in use' });
      }
    }

    const contact = await ContactsRepository.updateContactById(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    return response.json(contact);
  }

  // Deletar um registro
  async delete(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid Contact ID' });
    }

    const contact = await ContactsRepository.findById(id);

    // 404: Not found
    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    await ContactsRepository.deleteContactById(id);
    // 204: No content
    return response.sendStatus(204);
  }

  async batchStoreContacts(request, response) {
    console.log(request.body);

    return response.json(request).status(200);
  }
}

// Sigleton - Design Pattern
module.exports = new ContactController();
