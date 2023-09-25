const db = require('../../database');

class CategoriesRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM categories ORDER BY name ${direction}`);
    return rows;
  }

  async create(name) {
    const [row] = await db.query(`
    INSERT INTO categories(name)
    VALUES($1)
    RETURNING *
    `, [name]);

    return row;
  }

  async findById(id) {
    const [row] = await db.query(`
    SELECT *
    FROM categories
    WHERE categories.id = $1
    `, [id]);
    return row;
  }

  async findByName(name) {
    const [row] = await db.query(`
    SELECT UPPER(categories.name), categories.id
    FROM categories
    WHERE UPPER(categories.name) = $1
    `, [name]);

    return row;
  }

  async delete(id) {
    const deleteOperation = await db.query('DELETE FROM categories WHERE id = $1', [id]);
    return deleteOperation;
  }

  async update(id, {
    name,
  }) {
    const [row] = await db.query(`
    UPDATE categories
    SET name = $1
    WHERE id = $2
    RETURNING *
    `, [name, id]);
    return row;
  }
}

module.exports = new CategoriesRepository();
