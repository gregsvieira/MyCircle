import { query } from '../../database';

interface IPostsReturn {
  id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  user_id: string;

}

interface IUserLikes {
  id: string
}
interface IPostsReturn {
  username: string;
  id: string;
  content: string;
  created_at: Date;
  total_likes: number;
  user_likes: IUserLikes[];
  userId: string;
}

interface IPostsLikesReturn {
  id: string | null;
  post_id: string | null;
  user_id: string | null;
  created_at: Date | null;
  deleted_at: Date | null;
}

class PostsLikesRepository {
  async findAllLikesByPostId({ post_id }: { post_id: string}): Promise<IPostsReturn>{
    const [row] = await query(`
    SELECT
      users.username,
      posts_likes.user_id,
      posts_likes.created_at
    FROM posts_likes
    LEFT join users
      ON users.id = posts_likes.user_id
    WHERE post_id = $1;
    `, [post_id]);

    return row as IPostsReturn;
  }

  async createPostLike({ post_id, user_id }: { post_id: string, user_id: string}): Promise<IPostsReturn>{
    const [row] = await query(`
      INSERT INTO posts_likes
      (post_id, user_id)
      VALUES($1, $2);
    `, [post_id, user_id]);

    return row as IPostsReturn;
  }

  async findPostLikeInactive({ post_id, user_id }: { post_id: string, user_id: string}): Promise<IPostsLikesReturn>{
    const [row] = await query(`
      SELECT id, post_id, user_id, deleted_at FROM posts_likes
      WHERE post_id = $1
      AND user_id = $2
      AND deleted_at IS NOT NULL
    `, [post_id, user_id]);

    return row as IPostsLikesReturn;
  }

  async findPostLikeActive({ post_id, user_id }: { post_id: string, user_id: string}): Promise<IPostsLikesReturn>{
    const [row] = await query(`
      SELECT id, post_id, user_id, deleted_at FROM posts_likes
      WHERE post_id = $1
      AND user_id = $2
      AND deleted_at IS NULL;
    `, [post_id, user_id]);

    return row as IPostsLikesReturn;
  }

  async removePostLike({ post_id, user_id }: { post_id: string, user_id: string}): Promise<IPostsLikesReturn>{
    const [row] = await query(`
      UPDATE posts_likes
      SET deleted_at=CURRENT_TIMESTAMP
      WHERE post_id = $1
      AND user_id = $2;
    `, [post_id, user_id]);

    return row as IPostsLikesReturn;
  }

  async restoreDeletedPostLike({ post_id, user_id }: { post_id: string, user_id: string}): Promise<IPostsLikesReturn>{
    const [row] = await query(`
      UPDATE posts_likes
      SET deleted_at=NULL, updated_at=CURRENT_TIMESTAMP
      WHERE post_id = $1
      AND user_id = $2;
    `, [post_id, user_id]);

    return row as IPostsLikesReturn;
  }

}

export default new PostsLikesRepository();
