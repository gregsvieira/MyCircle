/* eslint-disable react/jsx-one-expression-per-line */

import {
  Container,
} from './styles';

import Loader from '../../components/Loader';

import useContacts from './useContacts';

import InputSearch from './components/InputSearch';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactsList from './components/ContactsList';
import CreateRecordHeader from '../../components/CreateRecordHeader';

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
    quantityOfFilteredContacts,
    handleTryAgain,
    orderBy,
    handleOrderBy,
    handleDeleteContact,
  } = useContacts();

  const hasContacts = !hasError && contacts.length > 0;
  const isEmptyList = !hasError && (!isLoading && !hasContacts);
  const isSearchEmpty = !hasError && (hasContacts && quantityOfFilteredContacts < 1);

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts && (
        <InputSearch
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      )}

      <CreateRecordHeader
        hasError={hasError}
        quantityOfItems={contacts}
        quantityOfFilteredItems={quantityOfFilteredContacts}
        recordLink="/contacts"
        singularRecordType="contact"
        pluralRecordType="contacts"
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
