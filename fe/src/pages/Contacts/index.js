/* eslint-disable react/jsx-one-expression-per-line */
import { Link } from 'react-router-dom';

import {
  Container,
  ListHeader,
  Card,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,
} from './styles';

import Button from '../../components/Button';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';

import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import PageHeader from '../../components/PageHeader';

import useContacts from './useContacts';

import InputSearch from './components/InputSearch';
import Header from './components/Header';

export default function Contacts() {
  const {
    isLoading,
    isLoadingDelete,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleCloseDeleteContact,
    isDeleteModalVisible,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleOrderBy,
    handleDeleteContact,
  } = useContacts();

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <PageHeader
        path="/"
      />

      {contacts.length > 0 && (
        <InputSearch
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      )}

      <Header
        hasError={hasError}
        quantityOfContacts={contacts}
        quantityOfFilteredContacts={filteredContacts}
      />

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
          {(contacts.length < 1 && !isLoading) && (
          <EmptyListContainer>
            <img src={emptyBox} alt="Empty box" />

            <p>
              You don&apos;t have any contact registered! Click the <strong>“New Contact”</strong>
              button above to register the first contact!
            </p>
          </EmptyListContainer>
          )}

          {(contacts.length > 0 && filteredContacts.length < 1 && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="Magnifier question" />
              <span>Nenhum resultado foi encontrado para <strong>”{searchTerm}”</strong>.</span>
            </SearchNotFoundContainer>
          ))}

          {filteredContacts.length > 0 && (
          <ListHeader orderBy={orderBy}>
            <button type="button" className="sort-button" onClick={handleOrderBy}>
              <span>Name</span>
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
                  {contact.category.name && (
                  <small>
                    {contact.category.name}
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
                <Link to={`contacts/edit/${contact.id}`}>
                  <img src={edit} alt="edit" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDeleteContact(contact)}
                >
                  <img src={trash} alt="delete" />
                </button>
              </div>
            </Card>
          ))}

          <Modal
            danger
            isLoading={isLoadingDelete}
            title={`Are you sure you want to remove the "${!contactBeingDeleted?.name}" contact?`}
            confirmLabel="Delete"
            onCancel={handleCloseDeleteModal}
            onConfirm={handleCloseDeleteContact}
            visible={isDeleteModalVisible}
          >
            <p>
              You can&apos;t restore this contact after remove
            </p>
          </Modal>
        </>
      )}

    </Container>
  );
}
