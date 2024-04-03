import PropTypes from 'prop-types';
import {
  Container, Bagde, Image, Span, Messages,
} from './styles';

function Avatar({
  size,
  src,
  name,
  hasRecentPost,
  messages,
  isActive,
  onClick,
}) {
  const messagesCount = messages > 99 ? '99+' : messages;
  return (
    <Container size={size} hasRecentPost={hasRecentPost} onClick={() => onClick}>
      {isActive && <Bagde size={size} />}
      {messages > 0 && <Messages size={size}>{messagesCount}</Messages>}

      {src ? (
        <Image
          alt={name}
          src={src}
        />
      ) : (
        <Span size={size}>
          {name}
        </Span>
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
  onClick: PropTypes.func,
};

Avatar.defaultProps = {
  messages: 0,
  size: 'b',
  hasRecentPost: false,
  isActive: false,
  src: '',
  onClick: null,
};

export default Avatar;
