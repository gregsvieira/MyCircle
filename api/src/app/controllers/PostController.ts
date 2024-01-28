import PostsRepository from '../repositories/PostsRepository';
import ContactsRepository from '../repositories/ContactsRepository';
import { Request, Response } from 'express';
import isValidUUID from '../utils/isValidUUID';


class PostController {
  async findAllPostsByContactsId(request: Request, response: Response) {
    const { user_id } = request.body;
    const { orderBy } = request.query;

    if (!isValidUUID(user_id) || !user_id) {
      return response.status(400).json({ error: 'Invalid ID' });
    }

    const contactsIds = await ContactsRepository.findAllIdsByUserId({ userId: user_id });

    const posts = await PostsRepository.findAllPostsByIds({ orderBy: String(orderBy), ids: contactsIds, user_id });

    return response.json(posts);
  }

  async createNewPost(request: Request, response: Response) {
    const { user_id, content } = request.body;

    if (!isValidUUID(user_id) || !user_id) {
      return response.status(400).json({ error: 'Invalid ID' });
    }

    if (!content) {
      return response.status(400).json({ error: 'Content is required' });
    }

    const post = await PostsRepository.createNewPost({
      content,
      user_id
    });

    return response.status(201).json({post: post});
  }

}

export default new PostController();

