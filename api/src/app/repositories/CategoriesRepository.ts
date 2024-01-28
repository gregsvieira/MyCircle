import { query } from '../../database';

interface ICategories {
  id: string;
  name: string;
}

interface ICreateCategory {
  name: string;
  }

class CategoriesRepository {
  async findAll(orderBy: undefined | string = 'ASC', userId: string): Promise<ICategories[] | []> {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await query(`
      SELECT *
      FROM categories
      WHERE categories.user_id = $1
      AND deleted_at IS NULL
      ORDER BY name ${direction}`, [userId]);

    return rows as ICategories[] | [];
  }

  async create(category: ICreateCategory, user_id: string): Promise<ICategories> {
    const [row] = await query(`
        INSERT INTO categories(name, user_id)
        VALUES($1, $2)
        RETURNING *
        `, [category, user_id]);

    return row as ICategories;
  }

  async findByIdAndUserId(id: string, userId: string): Promise<ICategories | undefined> {
    const [row] = await query(`
    SELECT *
    FROM categories
    WHERE categories.id = $1
    AND categories.user_id = $2
    AND deleted_at IS NULL
    `, [id, userId]);

    return row as ICategories | undefined;
  }

  async findByNameAndUserId(name: string, userId: string): Promise<ICategories | undefined> {
    const [row] = await query(`
    SELECT UPPER(categories.name), categories.id
    FROM categories
    WHERE UPPER(categories.name) = $1
    AND categories.user_id = $2
    AND deleted_at IS NULL
    `, [name, userId]);

    return row as ICategories | undefined;
  }

  async deleteByUserId(id: string, userId: string): Promise<[]> {
    const deletedCategory = await query(`
      UPDATE categories
      SET categories.deleted_at=CURRENT_TIMESTAMP
      WHERE id = $1
      AND categories.user_id = $2
    `, [id, userId]);

    return deletedCategory as [];
  }

  async updateByUserId(id: string, userId: string, {
    name,
  }: {name: string }): Promise<ICategories | undefined> {
    const [row] = await query(`
    UPDATE categories
    SET name = $1
    WHERE id = $2
    AND categories.user_id = $3
    RETURNING *
    `, [name, id, userId]);

    return row as ICategories | undefined;
  }

  async createManyCategories(categories: ICreateCategory[]): Promise<ICategories[] | []> {
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
