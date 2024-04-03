import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { Container } from './styles';

export default function ToastMessage({ message, onRemoveMessage }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 7000);

    return (() => {
      clearTimeout(timeoutId);
    });
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
    >
      {message.type === 'danger' && <AiOutlineCloseCircle size={22} />}
      {message.type === 'success' && <AiOutlineCheckCircle size={22} />}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
    duration: PropTypes.number,
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,

};
