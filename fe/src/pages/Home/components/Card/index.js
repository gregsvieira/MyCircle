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

export default function Card({ post }) {
  return (
    <Container>
      <PostCard>
        <PostInfos>
          <AvatarWrapper>
            <Avatar
              name={post.abbreviatedName}
              size="s"
            />
          </AvatarWrapper>

          <UsernameWrapper>
            <strong>
              {post.username}
            </strong>
          </UsernameWrapper>

          <DateWrapper>
            <small>
              {post.createdAt}
            </small>
          </DateWrapper>

        </PostInfos>

        <PostContent>
          <span>
            {post.content}
          </span>
        </PostContent>

        <PostActions>
          <PostsLikes>
            <Like>
              <HeartIcon />
            </Like>
            <p>{post.totalLikes}</p>
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
    id: PropTypes.string.isRequired,
    abbreviatedName: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    totalLikes: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    usersLikes: PropTypes.shape({
      id: PropTypes.string,
    }) || null,
  }).isRequired,
};
