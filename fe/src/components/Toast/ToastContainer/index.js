import { useEffect, useState } from 'react';
import { Container } from './styles';
import ToastMessage from '../ToastMessage';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast(event) {
      console.log('addToastListener', event);
      const { type, text } = event.detail;

      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text },
      ]);
    }
    document.addEventListener('addtoast', handleAddToast);

    return () => {
      document.removeEventListener('addtoast', handleAddToast);
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
