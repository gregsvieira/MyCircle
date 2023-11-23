const CategoriesRepository = require('../repositories/CategoriesRepository');
const ContactsRepository = require('../repositories/ContactsRepository');

// const validate = require('../utils/validateFields');
// const isValidUUID = require('../utils/isValidUUID');
// const getErrorMessage = require('../utils/getErrorMessage');

class UploadController {
  async execute(request, response) {
    try {
      const { categories, contacts } = request.body;
      // categories use-case
      const categoriesOnDatabase = await CategoriesRepository.findAll();

      const categoriesMapped = new Map(categoriesOnDatabase.map((category) => (
        [(category.name).toLowerCase(), category.id]
      )));

      const categoriesOnDatabaseOrNot = categories.map((categoryRequested) => {
        const categoryFoundId = categoriesMapped.get(categoryRequested.name);

        const itsNew = categoryFoundId === undefined;

        const category = {
          name: categoryRequested.name,
          id: categoryFoundId,
          new: itsNew,
        };
        return category;
      });

      const newCategories = await CategoriesRepository.createManyCategories(
        categoriesOnDatabaseOrNot.filter((category) => category.new === true),
      );

      let allCategories = newCategories?.map((category) => ({
        name: category.name,
        id: category.id,
        new: true,
      })) ?? [];

      allCategories = allCategories.concat(
        categoriesOnDatabaseOrNot.filter(
          (category) => category.new === false,
        ),
      );

      // contacts use-case
      const contactsWithCategoriesId = contacts.map((contact) => {
        const [category] = allCategories.filter(
          (oneCategory) => oneCategory.name === contact.category,
        );
        return {
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          category: category.id,
        };
      });

      const contactsInserted = await ContactsRepository.createManyContacts(
        contactsWithCategoriesId,
      );

      return response.json({
        contacts: contactsInserted,
        categories: newCategories,
        error: false,
      }).status(200);
    } catch (error) {
      console.log('error', error);
      return response.json({ error: true }).status(400);
    }
  }
}

module.exports = new UploadController();
