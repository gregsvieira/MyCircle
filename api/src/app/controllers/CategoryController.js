const CategoriesRepository = require('../repositories/CategoriesRepository');
const ContactsRepository = require('../repositories/ContactsRepository');

const validate = require('../utils/validateFields');
const isValidUUID = require('../utils/isValidUUID');
const getErrorMessage = require('../utils/getErrorMessage');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    const categories = await CategoriesRepository.findAll(orderBy);
    response.json(categories);
  }

  async show(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid Category ID' });
    }

    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    return response.json(category);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const nameConverted = name.toUpperCase();

    const categoryWithName = await CategoriesRepository.findByName(nameConverted);

    if (categoryWithName) {
      return response.status(400).json({ error: 'This name is already in use' });
    }

    const category = await CategoriesRepository.create(name);
    return response.status(201).json(category);
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid Category ID' });
    }

    const contactsUsingCategory = await ContactsRepository.findByCategoryId(id);

    if (contactsUsingCategory) {
      return response.status(400).json({ error: 'There are contacts who are using this category!' });
    }

    await CategoriesRepository.delete(id);

    return response.sendStatus(204);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name,
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

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      return response.status(404).json({ error: 'Category not found!' });
    }

    const nameConverted = name.toUpperCase();

    const categoryWithName = await CategoriesRepository.findByName(nameConverted);

    if (categoryWithName && categoryWithName.id !== id) {
      return response.status(400).json({ error: 'This name is already in use' });
    }

    const category = await CategoriesRepository.update(id, {
      name,
    });

    return response.json(category);
  }

  async batchStoreCategories(request, response) {
    const categoriesRequested = request.body;

    const allCategories = await CategoriesRepository.findAll();

    const categoriesMapped = new Map(allCategories.map((category) => (
      [(category.name).toLowerCase(), category.id]
    )));

    const categoriesFounded = [];
    const categoriesNotFounded = [];

    categoriesRequested.map((categoryRequested) => {
      const categoryFoundId = categoriesMapped.get(categoryRequested.name);
      let categoryFound;
      let categoryNotFound;

      if (categoryFoundId !== undefined) {
        categoryFound = {
          name: categoryRequested.name,
          id: categoryFoundId,
          created: false,
        };
        categoriesFounded.push(categoryFound);
      } else {
        categoryNotFound = {
          name: categoryRequested.name,
          id: categoryFoundId,
          created: false,
        };
        categoriesNotFounded.push(categoryNotFound);
      }
      return true;
    });

    if (!categoriesNotFounded.length) {
      return response.json({
        categories: { ...categoriesFounded },
      }).status(200);
    }
    // if (categoriesNotFounded)
    // const res = await CategoriesRepository.createManyCategories(categoriesNotFounded);
    // console.log(res);
    return response.json('ok').status(200);
  }
}

module.exports = new CategoryController();
