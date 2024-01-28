import abbreviateName from '../../utils/abbreviateName';
import formatDate from '../../utils/formatDate';

class PostMapper {
  toPersistence(domainPost) {
    return {
      content: domainPost.content,
    };
  }

  toDomain(persistensePost) {
    return {
      id: persistensePost.id,
      username: persistensePost.username,
      abbreviatedName: abbreviateName(persistensePost.username),
      content: persistensePost.content,
      createdAt: formatDate(persistensePost.created_at),
      totalLikes: persistensePost.total_likes,
      usersLikes: {
        ...persistensePost.users_likes,
      },
    };
  }
}

export default new PostMapper();
