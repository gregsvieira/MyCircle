import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Container, Header, ListHeader, Card, InputSearchContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderyBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  useEffect(() => {
    fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`)
      .then(async (response) => {
        const json = await response.json();
        setContacts(json);
      }).catch((error) => {
        console.log('error', error);
      });
  }, [orderBy]);

  function handleOrderBy() {
    setOrderyBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <Container>
      <InputSearchContainer>
        <input
          value={searchTerm}
          type="text"
          placeholder="Search contact..."
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>
      <Header>
        <strong>
          {filteredContacts.length}
          {' '}
          {filteredContacts.length === 1 ? 'contact' : 'contacts'}
        </strong>
        <Link to="/new">New Contact</Link>
      </Header>

      {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy}>
          <button type="button" className="sort-button" onClick={handleOrderBy}>
            <span>Nome</span>
            <img src={arrow} alt="arrow" />
          </button>
        </ListHeader>
      )}

      {filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>
                {contact.name}
              </strong>
              {contact.category_name && (
              <small>
                {contact.category_name}
              </small>
              )}
            </div>

            <span>
              {contact.email}
            </span>
            <span>
              {contact.phone}
            </span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="edit" />
            </Link>
            <button type="button">
              <img src={trash} alt="delete" />
            </button>
          </div>
        </Card>
      ))}

    </Container>
  );
}
