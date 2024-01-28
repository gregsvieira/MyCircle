import { Request, Response } from 'express';

import CategoriesRepository from '../repositories/CategoriesRepository';
import ContactsRepository from '../repositories/ContactsRepository';

import validate from '../utils/validateFields';
import isValidUUID from '../utils/isValidUUID';
import getErrorMessage from '../utils/getErrorMessage';


class CategoryController {
  async index(request: Request, response: Response) {
    const { user_id } = request.body;

    const { orderBy } = request.query;
    const categories = await CategoriesRepository.findAll(String(orderBy), user_id);
    return response.json(categories);
  }

  async show(request: Request, response: Response) {
    const { user_id } = request.body;
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid Category ID' });
    }

    const category = await CategoriesRepository.findByIdAndUserId(id, user_id);

    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    return response.json(category);
  }

  async store(request: Request, response: Response) {
    const { name, user_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const nameConverted = name.toUpperCase();

    const categoryWithName = await CategoriesRepository.findByNameAndUserId(nameConverted, user_id);

    if (categoryWithName) {
      return response.status(400).json({ error: 'This name is already in use' });
    }

    const category = await CategoriesRepository.create(name, user_id);
    return response.status(201).json(category);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const { user_id } = request.body;


    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid Category ID' });
    }

    const contactsUsingCategory = await ContactsRepository.findByCategoryIdAndUserId(id, user_id);

    if (contactsUsingCategory) {
      return response.status(400).json({ error: 'There are contacts who are using this category!' });
    }

    await CategoriesRepository.deleteByUserId(id, user_id);

    return response.sendStatus(204);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const {
      name, user_id
    } = request.body;

    const { emptyFields, validatorsErrors, isValid } = validate({
      body: {
        ...request.body,
        ...request.params,
      },
      requiredFields: ['id', 'name'],
      validators: {
        id: isValidUUID,
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

    const categoryExists = await CategoriesRepository.findByIdAndUserId(id, user_id);

    if (!categoryExists) {
      return response.status(404).json({ error: 'Category not found!' });
    }

    const nameConverted = name.toUpperCase();

    const categoryWithName = await CategoriesRepository.findByNameAndUserId(nameConverted, user_id);

    if (categoryWithName && categoryWithName.id !== id) {
      return response.status(400).json({ error: 'This name is already in use' });
    }

    const category = await CategoriesRepository.updateByUserId(id, user_id, {
      name,
    });

    return response.json(category);
  }
}

export default new CategoryController();
