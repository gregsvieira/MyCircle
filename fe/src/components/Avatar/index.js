import PropTypes from 'prop-types';
import {
  Container, StyledBagde, StyledImage, StyledSpan, StyledMessages,
} from './styles';

function Avatar({
  size,
  src,
  name,
  hasRecentPost,
  messages,
  isActive,
}) {
  const messagesCount = messages > 99 ? '99+' : messages;

  return (
    <Container size={size} hasRecentPost={hasRecentPost}>
      {isActive && <StyledBagde size={size} />}
      {messages > 0 && <StyledMessages size={size}>{messagesCount}</StyledMessages>}

      {src ? (
        <StyledImage
          alt={name}
          src={src}
        />
      ) : (
        <StyledSpan size={size}>
          {name}
        </StyledSpan>
      ) }
    </Container>
  );
}

Avatar.propTypes = {
  size: PropTypes.oneOf(['s', 'm', 'b']),
  src: PropTypes.string,
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  hasRecentPost: PropTypes.bool,
  messages: PropTypes.number,
};

Avatar.defaultProps = {
  messages: 0,
  size: 'b',
  hasRecentPost: false,
  isActive: false,
  src: '',
};

export default Avatar;
