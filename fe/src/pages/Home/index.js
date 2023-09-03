import { Link } from 'react-router-dom';
import {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import {
  Container,
  Header,
  ListHeader,
  Card,
  InputSearchContainer,
  ErrorContainer,
} from './styles';

import Button from '../../components/Button';

// import APIError from '../../errors/APIError';

import ContactsService from '../../services/ContactsService';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';

import Loader from '../../components/Loader';

export default function Home() {
  const [contacts,
    setContacts] = useState([]);
  const [orderBy, setOrderyBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleOrderBy() {
    setOrderyBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <InputSearchContainer>
        <input
          value={searchTerm}
          type="text"
          placeholder="Search contact..."
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>
      <Header hasError={hasError}>
        {!hasError && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contact' : ' contacts'}
          </strong>
        )}
        <Link to="/new">New Contact</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="sad" />

          <div className="details">
            <strong>An error occurred while trying to get the contacts</strong>

            <Button type="button" onClick={handleTryAgain}>
              Try again
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
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
        </>
      )}

    </Container>
  );
}
