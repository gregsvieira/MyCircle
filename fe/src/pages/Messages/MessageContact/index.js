/* eslint-disable no-nested-ternary */
import {
  Container,
  Header,
  ProfileCardWrapper,
  ProfileCard,
  ProfileInfos,
  AvatarWrapper,
  // EmptyListContainer,
  ErrorContainer,
  // Sentinel,
} from './styles';

import Button from '../../../components/Button';
// import Input from '../../components/Input';

import sad from '../../../assets/images/sad.svg';
// import emptyBox from '../../assets/images/empty-box.svg';
// import Card from './components/Card';
import Loader from '../../../components/Loader';
import useMessageContact from './useMessageContact';
import Avatar from '../../../components/Avatar';
import FormGroup from '../../../components/FormGroup';

export default function MessageContact() {
  const {
    handleTryAgain,
    // orderBy,
    // handleOrderBy,
    isLoading,
    hasError,
    /*  contacts, */
    message,
    // quantityOfContacts,
    // searchTerm,
    // handleChangeSearchTerm,
    // filteredContacts,
    // quantityOfFilteredContacts,
  } = useMessageContact();

  // console.log('-----------------');
  // console.log('message: ', message);

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <form>
        <FormGroup>
          <textField value={message} />
          <Button />
        </FormGroup>
      </form>

      <ProfileCardWrapper>
        <ProfileCard>
          <AvatarWrapper>
            <Avatar size="b" name="TES" isActive />

          </AvatarWrapper>
          <ProfileInfos />
        </ProfileCard>
      </ProfileCardWrapper>
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
