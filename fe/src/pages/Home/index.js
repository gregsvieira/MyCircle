import { Link } from 'react-router-dom';

import {
  Container,
  Header,
  MenuBar,
} from './styles';

import Loader from '../../components/Loader';
import useHome from './useHome';

export default function Home() {
  const {
    isLoading,
  } = useHome();

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Header>
        <h1>Home</h1>
      </Header>

      <MenuBar>
        <Link to="/upload">Upload</Link>
        <Link to="/contacts">Contacts</Link>
        <Link to="/categories">Categories</Link>
      </MenuBar>
    </Container>
  );
}
