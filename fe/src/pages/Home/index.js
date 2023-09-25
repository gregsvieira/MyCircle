import { Link } from 'react-router-dom';
import {
  useState, useCallback,
} from 'react';
import {
  Container,
  Header,
  MenuBar,
} from './styles';

import Loader from '../../components/Loader';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const stopLoading = useCallback(async () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);
  stopLoading();
  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Header>
        <h1>Home</h1>
      </Header>

      <MenuBar>
        <Link to="/contacts">Contacts</Link>
        <Link to="/categories">Categories</Link>
      </MenuBar>
    </Container>
  );
}
