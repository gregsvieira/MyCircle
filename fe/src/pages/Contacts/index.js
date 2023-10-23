/* eslint-disable react/jsx-one-expression-per-line */

import {
  Container,
} from './styles';

import Loader from '../../components/Loader';
import PageHeader from '../../components/PageHeader';

import useContacts from './useContacts';

import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactsList from './components/ContactsList';

import Modal from '../../components/Modal';

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

  const hasContacts = !hasError && contacts.length > 0;
  const isEmptyList = !hasError && (!isLoading && !hasContacts);
  const isSearchEmpty = !hasError && (hasContacts && filteredContacts.length < 1);

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <PageHeader
        path="/"
      />

      {hasContacts && (
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

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isEmptyList && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
        <>
          <ContactsList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleOrderBy}
            onDeleteContact={handleDeleteContact}
          />

          <Modal
            danger
            isLoading={isLoadingDelete}
            title={`Are you sure you want to remove the "${contactBeingDeleted?.name}" contact?`}
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
