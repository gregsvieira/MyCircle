import { query } from '../../database';

interface ICategories {
  id: string;
  name: string;
}

class CategoriesRepository {
  async findAll(orderBy: string = 'ASC'): Promise<ICategories[] | []> {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await query(`SELECT * FROM categories ORDER BY name ${direction}`);

    return rows as ICategories[] | [];
  }

  async create(name: string): Promise<ICategories> {
    const [row] = await query(`
        INSERT INTO categories(name)
        VALUES($1)
        RETURNING *
        `, [name]);

    return row as ICategories;
  }

  async findById(id: string): Promise<ICategories | undefined> {
    console.log('id', id);
    const [row] = await query(`
    SELECT *
    FROM categories
    WHERE categories.id = $1
    `, [id]);

    console.log('row', row);

    return row as ICategories | undefined;
  }

  async findByName(name: string): Promise<ICategories | undefined> {
    const [row] = await query(`
    SELECT UPPER(categories.name), categories.id
    FROM categories
    WHERE UPPER(categories.name) = $1
    `, [name]);

    return row as ICategories | undefined;
  }

  async delete(id: string): Promise<[]> {
    console.log({id});
    const deletedCategory = await query('DELETE FROM categories WHERE id = $1', [id]);

    return deletedCategory as [];
  }

  async update(id: string, {
    name,
  }: {name: string }): Promise<ICategories | undefined> {
    const [row] = await query(`
    UPDATE categories
    SET name = $1
    WHERE id = $2
    RETURNING *
    `, [name, id]);

    return row as ICategories | undefined;
  }

  async createManyCategories(categories: ICategories[]): Promise<ICategories[] | []> {
    if (!categories.length) {
      return [];
    }
    const values = categories.map((_, index) => `($${index + 1})`).join(', ');

    const queryString  = `
        INSERT INTO categories(name)
        VALUES ${values}
        RETURNING *
    `;

    const result = await query(queryString, categories.map((category) => category.name));

    return result as ICategories[] | [];
  }
}

export default new CategoriesRepository();
