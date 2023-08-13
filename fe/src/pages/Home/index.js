import { Link } from 'react-router-dom';
import {
  Container, Header, ListContainer, Card, InputSearchContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import Loader from '../../components/Loader';
// import Modal from '../../components/Modal';

export default function Home() {
  return (

    <Container>
      <Loader />
      {/* <Modal danger /> */}
      <InputSearchContainer>
        <input type="text" placeholder="Search contact..." />
      </InputSearchContainer>
      <Header>
        <strong>3 contacts</strong>
        <Link to="/new">New Contact</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button" className="sort-button">
            <span>Nome</span>
            <img src={arrow} alt="arrow" />
          </button>
        </header>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>
                Name Lastname
              </strong>
              <small>
                Category
              </small>
            </div>

            <span>
              email@email.com
            </span>
            <span>
              (41) 99999-9999
            </span>
          </div>

          <div className="actions">
            <Link to={`/edit/${123}`}>
              <img src={edit} alt="edit" />
            </Link>
            <button type="button">
              <img src={trash} alt="delete" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}
