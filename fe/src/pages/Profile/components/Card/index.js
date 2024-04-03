import PropTypes from 'prop-types';

import {
  Container,
  PostCard,
  PostInfos,
  AvatarWrapper,
  UsernameWrapper,
  DateWrapper,
  PostContent,
  PostActions,
  PostsLikes,
  Like,
  HeartIcon,
  ShowWrapper,
  EyeIcon,
} from './styles';

import Avatar from '../../../../components/Avatar';
import useCard from './useCard';

export default function Card({ post }) {
  const {
    userLiked,
    handleClickLike,
    postLikes,
    postId,
    postAbbreviatedName,
    postContent,
    postCreatedAt,
    // postUserId,
    postUsername,
  } = useCard({ post });

  return (
    <Container>
      <PostCard>
        <PostInfos>
          <AvatarWrapper>
            <Avatar
              messages={5}
              isActive
              hasRecentPost
              name={postAbbreviatedName}
              size="s"
            />
          </AvatarWrapper>

          <UsernameWrapper>
            <strong>
              {postUsername}
            </strong>
          </UsernameWrapper>

          <DateWrapper>
            <small>
              {postCreatedAt}
            </small>
          </DateWrapper>

        </PostInfos>

        <PostContent>
          <span>
            {postContent}
          </span>
        </PostContent>

        <PostActions>
          <PostsLikes>
            <Like>
              <HeartIcon
                userLiked={userLiked}
                onClick={() => (
                  handleClickLike({ id: postId })
                )}
              />
            </Like>
            <p>{postLikes}</p>
          </PostsLikes>

          <ShowWrapper>
            <EyeIcon />
          </ShowWrapper>
        </PostActions>

      </PostCard>

    </Container>
  );
}

Card.propTypes = {
  post: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    abbreviatedName: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    totalLikes: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    usersLikes: PropTypes.arrayOf(
      PropTypes.string,
    ) || null,
  }).isRequired,
};
