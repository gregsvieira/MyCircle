import { query } from '../../database';

interface IUsersTokens {
  access_token: string;
  refresh_token: string;
  expires_date: Date;
  user_id: string;
}

interface ICreateUserToken {
  id: string;
  access_token: string;
  refresh_token: string;
  expires_date: Date;
  user_id: string;
}

class UsersTokensRepository {
  async createUserToken(userToken: IUsersTokens): Promise<ICreateUserToken> {
    const{ access_token, refresh_token, expires_date, user_id } = userToken;
    const [row] = await query(`
        INSERT INTO users_tokens(access_token, refresh_token, expires_date, user_id)
        VALUES($1, $2, $3, $4)
        RETURNING *
        `, [access_token, refresh_token, expires_date, user_id]);

    return row as ICreateUserToken;
  }

  async findUserByUserIdAndToken(userId: string, token: string): Promise<string[]> {
    const row = await query(`
      SELECT access_token
      FROM users_tokens
      WHERE user_id = $1
      AND access_token = $2
      AND expires_date > now()
      AND deleted_at IS NULL
    ;`, [userId, token]);

    return row as unknown as string[];
  }

  async deleteTokenByUserId(userId: string): Promise<void> {
    await query(`
      UPDATE users_tokens
      SET deleted_at=CURRENT_TIMESTAMP
      WHERE user_id = $1;
    ;`,[userId]);

  }

}

export default new UsersTokensRepository();
