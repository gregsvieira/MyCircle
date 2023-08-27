import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Container, Header, ListContainer, Card, InputSearchContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function Home() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/contacts')
      .then(async (response) => {
        const json = await response.json();
        setContacts(json);
      }).catch((error) => {
        console.log('error', error);
      });
  }, []);

  console.log(contacts);

  return (
    <Container>
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
