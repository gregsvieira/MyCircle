/* eslint-disable no-nested-ternary */

import {
  Container,
  Header,
  // ProfileCardWrapper,
  // ProfileCard,
  // ProfileInfos,
  // AvatarWrapper,
  // EmptyListContainer,
  ErrorContainer,
  // Sentinel,
} from './styles';

import Button from '../../components/Button';
import EmptyList from '../../components/EmptyList';
import ContactsList from './components/ContactsList';
// import Input from '../../components/Input';

import sad from '../../assets/images/sad.svg';
// import emptyBox from '../../assets/images/empty-box.svg';
// import Card from './components/Card';
import Loader from '../../components/Loader';
import InputSearch from '../Contacts/components/InputSearch';
import SearchNotFound from '../Contacts/components/SearchNotFound';
import ErrorStatus from '../Contacts/components/ErrorStatus';
import useMessages from './useMessages';

export default function Messages() {
  const {
    handleTryAgain,
    orderBy,
    handleOrderBy,
    isLoading,
    hasError,
    contacts,
    // quantityOfContacts,
    searchTerm,
    handleChangeSearchTerm,
    filteredContacts,
    quantityOfFilteredContacts,
  } = useMessages();

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

      <Header
        justifyContent={(
          hasError
            ? 'flex-end'
            : (
              !'as'
                ? 'space-between'
                : 'center'
            )
          )}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isEmptyList && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
        <ContactsList
          filteredContacts={filteredContacts}
          orderBy={orderBy}
          onToggleOrderBy={handleOrderBy}
        />
      )}

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="sad" />

          <div className="details">
            <strong>An error occurred while trying to get your messages</strong>

            <Button type="button" onClick={handleTryAgain}>
              Try again
            </Button>
          </div>
        </ErrorContainer>
      )}

    </Container>
  );
}
