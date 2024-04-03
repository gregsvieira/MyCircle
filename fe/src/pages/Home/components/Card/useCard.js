import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../../contexts/authContext/auth';
import LikeService from '../../../../services/LikesService';

export default function useCard({ post }) {
  const { logout } = useContext(AuthContext);
  const { usersLikes: initialUsersLikes } = post;

  const [userLiked, setUserLiked] = useState(initialUsersLikes.includes(post.userId));
  const [postLikes, setPostLikes] = useState(post.totalLikes);

  const [postId] = useState(post.id);
  const [postAbbreviatedName] = useState(post.abbreviatedName);
  const [postContent] = useState(post.content);
  const [postCreatedAt] = useState(post.createdAt);
  const [postUserId] = useState(post.userId);
  const [postUsername] = useState(post.username);

  useEffect(() => {
    setUserLiked(initialUsersLikes.includes(post.userId));
  }, [post.userId, initialUsersLikes]);

  const handleClickLike = async ({ id }) => {
    try {
      setPostLikes((prevPostLikes) => (userLiked ? prevPostLikes - 1 : prevPostLikes + 1));
      setUserLiked(!userLiked);

      const response = userLiked
        ? await LikeService.unlikePost({ postId: id })
        : await LikeService.likePost({ postId: id });

      if (response.error === 'authenticationError') {
        await logout();
      }
    } catch (error) {
      // Handle error
    }
  };

  return {
    userLiked,
    handleClickLike,
    postLikes,
    postId,
    postAbbreviatedName,
    postContent,
    postCreatedAt,
    postUserId,
    postUsername,
  };
}
