/* eslint-disable react/jsx-one-expression-per-line */
import emptyBox from '../../assets/images/empty-box.svg';
import { Container } from './styles';

export default function EmptyList() {
  return (
    <Container>
      <img src={emptyBox} alt="Empty box" />

      <p>
        You don&apos;t have any contact registered!
        Click the <strong>“New Contact”</strong> button above
        to register the first contact!
      </p>
    </Container>
  );
}
