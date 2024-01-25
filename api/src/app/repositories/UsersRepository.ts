import { query } from '../../database';

interface IUsers {
  userId?: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  password: string;
  active: boolean;
  role_id: string;
}

interface ICreateUser {
  id: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  password: string;
  active: boolean;
  role_id: string;
}

interface IUserSearched {
  id: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  password: string;
  active: boolean;
  role_id: string;
}

class UsersRepository {
  async findAll(): Promise<IUsers[] | []> {
    const rows = await query('SELECT * FROM users WHERE users.deleted_at IS NULL');

    return rows as IUsers[] | [];
  }

  async createUser(user: IUsers): Promise<ICreateUser> {
    const { userId, name, email, username, phone, password, role_id } = user;

    const id = userId ?? 'uuid_generate_v4()';

    const [row] = await query(`
        INSERT INTO users(id, name, email, username, phone, password, role_id)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `, [id, name, email, username, phone, password, role_id]);

    return row as ICreateUser;
  }

  async findById(id: string): Promise<IUserSearched | undefined> {
    const [row] = await query(`
      SELECT *
      FROM users
      WHERE users.id = $1
      AND users.deleted_at IS NULL
    `, [id]);

    return row as IUserSearched | undefined;
  }

  async findByUsername(username: string): Promise<IUserSearched | undefined> {
    const [row] = await query(`
      SELECT *
      FROM users
      WHERE users.username = $1
      AND users.deleted_at IS NULL
    `, [username]);

    return row as IUserSearched | undefined;
  }

  async findByEmail(email: string): Promise<IUserSearched | undefined> {
    const [row] = await query(`
      SELECT *
      FROM users
      WHERE users.email = $1
      AND users.deleted_at IS NULL
    `, [email]);

    return row as IUserSearched | undefined;
  }

  async deleteUser(id: string): Promise<[]> {
    const deletedUser = await query('UPDATE users SET deleted_at=CURRENT_TIMESTAMP WHERE id = $1', [id]);

    return deletedUser as [];
  }

  async updateUser(id: string, {
    name,
  }: {name: string }): Promise<IUsers | undefined> {
    const [row] = await query(`
      UPDATE categories
      SET name = $1
      WHERE id = $2
      RETURNING *
    `, [name, id]);

    return row as IUsers | undefined;
  }
}

export default new UsersRepository();
