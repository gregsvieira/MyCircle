import PostsLikesRepository from '../repositories/PostsLikesRepository';
import { Request, Response } from 'express';
import isValidUUID from '../utils/isValidUUID';


class LikeController {
  async findAllPostLikes(request: Request, response: Response) {
    const { post_id } = request.body;

    if (!isValidUUID(post_id) || !post_id) {
      return response.status(400).json({ error: 'Invalid ID' });
    }

    const likes = await PostsLikesRepository.findAllLikesByPostId({ post_id });

    return response.json(likes);
  }

  async likePost(request: Request, response: Response) {
    const { user_id, post_id } = request.body;

    if (!isValidUUID(user_id) || !user_id || !isValidUUID(post_id) || !post_id) {
      return response.status(400).json({ error: 'Invalid ID' });
    }

    const likedPostFound = await PostsLikesRepository.findPostLikeInactive({ user_id, post_id });

    if(likedPostFound) {
      const postUpdated = await PostsLikesRepository.restoreDeletedPostLike({ user_id, post_id });
      return response.status(201).json({post: postUpdated});
    }

    const likedPost = await PostsLikesRepository.createPostLike({ user_id, post_id });

    return response.status(201).json({post: likedPost});

  }

  async unLikePost(request: Request, response: Response) {
    const { user_id, post_id } = request.body;

    if (!isValidUUID(user_id) || !user_id || !isValidUUID(post_id) || !post_id) {
      return response.status(400).json({ error: 'Invalid ID' });
    }

    const likedPostFound = await PostsLikesRepository.findPostLikeActive({ user_id, post_id });

    if(!likedPostFound) {
      return response.status(400).json({post: 'not found'});
    }

    const postUpdated = await PostsLikesRepository.removePostLike({ user_id, post_id });
    return response.status(201).json({post: postUpdated});
  }
}

export default new LikeController();

