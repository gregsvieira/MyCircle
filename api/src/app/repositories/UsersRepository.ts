import { query } from '../../database';
import { countObjectPlaceholders } from '../utils/countObjectPlaceholders';
import { getNonEmptyObjectValues } from '../utils/getNonEmptyObjectValues';

interface IUsers {
  userId?: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  password: string;
  role_id: string;
  image: string;
  imageKey: string;
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
  image: string;
  imageKey: string;
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

interface IUsersMap {
  [key: string]: string | null | undefined;
}

class UsersRepository {
  async findAll(): Promise<IUsers[] | []> {
    const rows = await query('SELECT * FROM users WHERE users.deleted_at IS NULL');

    return rows as IUsers[] | [];
  }

  async createUser(user: IUsersMap): Promise<ICreateUser | null> {
    const { userId, image } = user;

    const userValues = getNonEmptyObjectValues(user);

    if (!userValues) {
      return null;
    }

    const placeHolders = countObjectPlaceholders(userValues);

    const idExists = userId ? 'id,' : '';

    const imageExists = image ? ', image' : '';

    const [row] = await query(`
      INSERT INTO users(${idExists} name, username, email, password, role_id${imageExists})
      VALUES(${placeHolders})
      RETURNING *
      `, userValues);

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
