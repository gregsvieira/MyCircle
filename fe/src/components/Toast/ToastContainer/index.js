import { useEffect, useState } from 'react';
import { Container } from './styles';
import ToastMessage from '../ToastMessage';

import { toastEventManager } from '../../../utils/toast';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text }) {
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text },
      ]);
    }
    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  });
  return (
    <Container>
      {messages.map(({ id, text, type }) => (
        <ToastMessage key={id} text={text} type={type} />
      ))}
    </Container>
  );
}
