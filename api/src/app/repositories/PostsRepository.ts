import { query } from '../../database';

interface IPostsReturn {
  id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  user_id: string;

}

interface IPosts {
  username: string;
  id: string;
  content: string;
  created_at: Date;
}

interface IContactIds {
  id: string
}

class PostsRepository {
  async findAllPostsByContactId({id}: {id: string}){
    const [row] = await query(`
      SELECT id, content, created_at
      FROM posts
      WHERE posts.user_id = $1
    `, [id]);

    return row as {id: string};
  }

  async findAllPostsByIds({orderBy = 'DESC', ids, user_id }: {orderBy: string, ids: IContactIds[], user_id: string}): Promise<IPosts[] | []>{
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';


    const contactsIdsAndUserId = [...ids, { id: user_id } ];

    const placeholders = contactsIdsAndUserId.map((_, index) => `$${index + 1}`).join(', ');

    const allIds = contactsIdsAndUserId.map((contact) => `${contact.id}`);

    const row = await query(`
      SELECT
        users.username,
        posts.id,
        posts.content,
        posts.created_at,
        ARRAY_AGG(posts_likes.user_id) AS users_likes,
        COUNT(posts_likes.user_id) AS total_likes
      FROM posts
      LEFT JOIN users
        ON users.id = posts.user_id
      LEFT JOIN posts_likes
        ON posts_likes.post_id = posts.id
      WHERE posts.deleted_at IS NULL
        AND posts.user_id IN (${placeholders})
      GROUP BY
      users.username, posts.id, posts.content, posts.created_at
      ORDER BY posts.created_at ${direction}
    `, allIds.map((id) => id));

    console.log(row);
    return row as IPosts[] | [];
  }

  async createNewPost({
    content,
    user_id,
  }: {content: string; user_id: string }): Promise<IPostsReturn>{

    const [row] = await query(`
      INSERT INTO posts(content, user_id)
      VALUES($1, $2)
      RETURNING *
    `, [content, user_id]);

    return row as IPostsReturn;
  }

}

export default new PostsRepository();
