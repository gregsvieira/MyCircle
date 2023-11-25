import { query } from '../../database';

interface IContacts {
  name: string;
  email: string;
  phone: string;
  active: boolean;
  category: string;
  status_id: string;
  user_id: string;
}


interface IContactsSearch {
  name: string;
  email: string;
  phone: string;
  active: boolean;
  category_id: string;
  status_id: string;
  user_id: string;
  category_name: string;
}

interface IContactSearch {
  name: string;
  email: string;
  phone: string;
  active: boolean;
  category_id: string;
  status_id: string;
  user_id: string;
}

interface IContactCreate {
  name: string;
  email: string;
  phone: string;
  active: boolean;
  category_id: string;
  status_id: string;
  user_id: string;
}

class ContactsRepository {
  async findAll(orderBy: string = 'ASC'): Promise<IContactsSearch[] | []> {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await query(`
      SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      ORDER BY contacts.name ${direction}`);

    return rows as IContactsSearch[] | [];
  }

  async findById(id: string): Promise<IContactSearch | undefined> {
    const [row] = await query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    WHERE contacts.id = $1
    `, [id]);
    console.log(row);
    return row as IContactSearch | undefined;
  }

  async findByCategoryId(categoryId: string): Promise<IContactsSearch[] | []> {
    const [row] = await query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    WHERE contacts.category_id = $1
    `, [categoryId]);
    return row as IContactsSearch[] | [];
  }

  async findByEmail(email: string): Promise<IContactSearch | undefined> {
    const [row] = await query('SELECT * FROM contacts where email = $1', [email]);
    return row as IContactSearch | undefined;
  }

  async createNewContact({
    name, email, phone, category_id, user_id,
  }: { name: string, email: string, phone: string, category_id: string, user_id: string,
  }): Promise<IContactCreate> {
    const [row] = await query(`
    INSERT INTO contacts(name, email, phone, category_id, user_id)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *
    `, [name, email, phone, category_id, user_id]);

    return row as IContactCreate;
  }

  async updateContactById(id: string, {
    name, email, phone, category_id,
  }: { name: string, email: string, phone: string, category_id: string }) {
    const [row] = await query(`
    UPDATE contacts
    SET name = $1, email= $2 , phone= $3, category_id= $4
    WHERE id = $5
    RETURNING *
    `, [name, email, phone, category_id, id]);

    console.log({row});
    return row;
  }

  async deleteContactById(id: string): Promise<[]> {
    const deletedContact = await query('DELETE FROM contacts WHERE id = $1', [id]);

    return deletedContact as [];
  }

  async createManyContacts(contacts: IContacts[]): Promise<IContacts [] | []> {
    const placeholders = contacts.map((_, index) => `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${index * 4 + 4})`).join(', ');

    const result = await query(`
    INSERT INTO contacts(name, email, phone, category_id)
    VALUES ${placeholders}
    ON CONFLICT ON CONSTRAINT unique_name_email DO NOTHING
    RETURNING *
    `, contacts.flatMap((contact) => (
      [contact.name, contact.email, contact.phone, contact.category]
    )));

    return result as IContacts [] | [];
  }
}

export default new ContactsRepository();
