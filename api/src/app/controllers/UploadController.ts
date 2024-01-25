import { Request, Response } from 'express';

import CategoriesRepository from '../repositories/CategoriesRepository';
import ContactsRepository from '../repositories/ContactsRepository';

interface ICategoriesRequest {
  name: string;
}
interface IContactsRequest {
  name: string;
  email: string;
  phone: string;
  category: string;
}

interface INewCategories { name: string; id: undefined; new: true; }
interface INotNewCategories { name: string; id: string; new: false; }

class UploadController {
  async execute(request: Request, response: Response) {
    try {
      const { categories, contacts, user_id }: { categories: ICategoriesRequest[], contacts: IContactsRequest[], user_id: string } = request.body;
      const { orderBy } = request.query;

      // categories use-case
      const categoriesOnDatabase = await CategoriesRepository.findAll(String(orderBy), user_id);

      const categoriesOnDatabaseMapped = new Map(categoriesOnDatabase.map((category) => (
        [(category.name).toLowerCase(), category.id]
      )));

      const newCategories: INewCategories[] = [];
      const notNewCategories: INotNewCategories[] = [];

      categories.forEach((categoryRequested) => {
        const categoryFoundId = categoriesOnDatabaseMapped.get(categoryRequested.name);
        const itsNew = categoryFoundId === undefined;

        if (itsNew) {
          newCategories.push({
            name: categoryRequested.name,
            id: categoryFoundId,
            new: itsNew,
          });
        } else {
          notNewCategories.push({
            name: categoryRequested.name,
            id: categoryFoundId,
            new: itsNew,
          });
        }
      });

      const categoriesAdded = await CategoriesRepository.createManyCategories(
        newCategories,
      );

      const categoriesAddedAndMapped = categoriesAdded?.map((category) => ({
        name: category.name,
        id: category.id,
        new: true,
      }));

      const allCategories = [ ...notNewCategories, ...categoriesAddedAndMapped ];

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
          active: false,
          status_id: '',
          user_id: ''
        };
      });

      const contactsInserted = await ContactsRepository.createManyContacts(
        contactsWithCategoriesId,
      );

      return response.json({
        contacts: contactsInserted,
        categories: allCategories,
        error: false,
      }).status(200);
    } catch (error) {
      console.log('error', error);
      return response.json({ error: true }).status(400);
    }
  }
}

export default new UploadController();
