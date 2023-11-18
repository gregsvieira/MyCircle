const db = require('../../database');

class ContactsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    ORDER BY contacts.name ${direction}`);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    WHERE contacts.id = $1
    `, [id]);
    return row;
  }

  async findByCategoryId(categoryId) {
    const [row] = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    WHERE contacts.category_id = $1
    `, [categoryId]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts where email = $1', [email]);
    return row;
  }

  async createNewContact({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
    INSERT INTO contacts(name, email, phone, category_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [name, email, phone, category_id]);

    return row;
  }

  async updateContactById(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
    UPDATE contacts
    SET name = $1, email= $2 , phone= $3, category_id= $4
    WHERE id = $5
    RETURNING *
    `, [name, email, phone, category_id, id]);
    return row;
  }

  async deleteContactById(id) {
    const deleteOperation = await db.query('DELETE FROM contacts WHERE id = $1', [id]);
    return deleteOperation;
  }

  async createManyContacts(contacts) {
    const placeholders = contacts.map((_, index) => `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${index * 4 + 4})`).join(', ');

    const result = await db.query(`
    INSERT INTO contacts(name, email, phone, category_id)
    VALUES ${placeholders}
    ON CONFLICT ON CONSTRAINT unique_name_email DO NOTHING
    RETURNING *
    `, contacts.flatMap((contact) => (
      [contact.name, contact.email, contact.phone, contact.category]
    )));

    return result;
  }
}

module.exports = new ContactsRepository();
