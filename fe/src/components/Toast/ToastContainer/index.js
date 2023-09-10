import { useState } from 'react';
import { Container } from './styles';
import ToastMessage from '../ToastMessage';

export default function ToastContainer() {
  const [messages] = useState([
    { id: Math.random(), type: 'default', text: 'Default text' },
    { id: Math.random(), type: 'default', text: 'Danger text' },
    { id: Math.random(), type: 'success', text: 'Success text' },
  ]);
  return (
    <Container>
      {messages.map(({ id, text, type }) => (
        <ToastMessage key={id} text={text} type={type} />
      ))}
    </Container>
  );
}
