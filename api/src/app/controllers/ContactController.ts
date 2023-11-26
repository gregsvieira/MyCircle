import { Request, Response } from 'express';

import ContactsRepository from '../repositories/ContactsRepository';
import validate from '../utils/validateFields';
import isValidEmail from '../utils/isValidEmail';
import isValidUUID from '../utils/isValidUUID';
import getErrorMessage from '../utils/getErrorMessage';

class ContactController {
  async index(request: Request, response: Response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(String(orderBy));
    return response.json(contacts);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid Contact ID' });
    }

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    return response.json(contact);
  }

  async store(request: Request, response: Response) {
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
      user_id: ''
    });

    return response.status(201).json(contact);
  }

  async update(request: Request, response: Response) {
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

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid Contact ID' });
    }

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    await ContactsRepository.deleteContactById(id);
    return response.sendStatus(204);
  }
}

// Sigleton - Design Pattern
export default new ContactController();
