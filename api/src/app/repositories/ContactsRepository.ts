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
  id: string;
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
  id: string;
  name: string;
  email: string;
  phone: string;
  active: boolean;
  category_id: string;
  status_id: string;
  user_id: string;
}

interface IContactCreate {
  id: string;
  name: string;
  email: string;
  phone: string;
  active: boolean;
  category_id: string;
  status_id: string;
  user_id: string;
}

interface IContactIds {
  id: string
}

class ContactsRepository {
  async findAll({orderBy = 'ASC', userId}: {orderBy?: string, userId: string}): Promise<IContactsSearch[] | []> {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await query(`
      SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      WHERE contacts.user_id = $1
      AND contacts.deleted_at IS NULL
      ORDER BY contacts.name ${direction}`, [userId]);

    return rows as IContactsSearch[] | [];
  }

  async findAllIdsByUserId({ userId }: { userId: string }): Promise<IContactIds[] | []> {

    const rows = await query(`
      SELECT contacts.id
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      WHERE contacts.user_id = $1
      AND contacts.deleted_at IS NULL
      `, [userId]);

    return rows as IContactIds[] | [];
  }

  async findByIdAndUserId(id: string, userId: string): Promise<IContactSearch | undefined> {
    const [row] = await query(`
      SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      WHERE contacts.id = $1
      AND contacts.user_id = $2
      AND contacts.deleted_at IS NULL
    `, [id, userId]);

    return row as IContactSearch | undefined;
  }

  async findByEmail(email: string): Promise<{ id: string} | undefined> {
    const [row] = await query(`
      SELECT id
      FROM contacts
      WHERE contacts.email = $1
      AND contacts.deleted_at IS NULL
    `, [email]);

    return row as { id: string};
  }

  async findByCategoryIdAndUserId(categoryId: string, userId: string): Promise<IContactsSearch[] | []> {
    const [row] = await query(`
      SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      WHERE contacts.category_id = $1
      AND contacts.user_id = $2
      AND contacts.deleted_at IS NULL
    `, [categoryId, userId]);
    return row as IContactsSearch[] | [];
  }

  async findByEmailAndUserId(email: string, userId: string): Promise<IContactSearch | undefined> {
    const [row] = await query(`
      SELECT *
      FROM contacts
      WHERE email = $1
      AND contacts.user_id = $2
      AND contacts.deleted_at IS NULL`, [email, userId]);
    return row as IContactSearch | undefined;
  }

  async createNewContact({
    name, email, phone, category_id, user_id,
  }: { name: string, email: string, phone: string, category_id: string, user_id: string,
  }): Promise<IContactCreate> {
    const [row] = await query(`
      INSERT INTO contacts(name, email, phone, category_id, status_id, user_id)
      VALUES($1, $2, $3, $4, (SELECT id FROM status WHERE name = 'waiting')::uuid, $5)
      RETURNING *
    `, [name, email, phone, category_id, user_id]);

    return row as IContactCreate;
  }

  async updateContactById(id: string, userId: string, {
    name, email, phone, category_id, status_id
  }: { name?: string, email?: string, phone?: string, category_id?: string, status_id?: string }) {
    const [row] = await query(`
      UPDATE contacts
      SET name = $1, email= $2 , phone= $3, category_id= $4, status_id = $5
      WHERE id = $6
      AND contacts.user_id = $7
      RETURNING *
    `, [name, email, phone, category_id, status_id, id, userId]);

    return row as IContactCreate;
  }

  async deleteContactById(id: string, userId: string): Promise<[]> {
    const deletedContact = await query(`
      UPDATE contacts
      SET deleted_at=CURRENT_TIMESTAMP
      WHERE id = $1
      AND contacts.user_id = $2
    `, [id, userId]);

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
