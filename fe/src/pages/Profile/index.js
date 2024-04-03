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

import Button from '../../components/Button';

import sad from '../../assets/images/sad.svg';
// import emptyBox from '../../assets/images/empty-box.svg';
// import Card from './components/Card';
import Loader from '../../components/Loader';
import useProfile from './useProfile';
import Avatar from '../../components/Avatar';

export default function Profile() {
  const {
    handleTryAgain,
    // orderBy,
    // handleOrderBy,
    isLoading,
    hasError,
    // userFormRef,
    userActive,
    userCreatedAt,
    userDeletedAt,
    userEmail,
    userId,
    userName,
    userPassword,
    userPhone,
    userUsername,
    // handleSubmit,
  } = useProfile();

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <ProfileCardWrapper>
        <ProfileCard>
          <AvatarWrapper>
            <Avatar size="b" name="TES" />

          </AvatarWrapper>
          <ProfileInfos>
            {userActive}
            {userCreatedAt}
            {userDeletedAt}
            {userEmail}
            {userName}
            {userPassword}
            {userPhone}
            {userUsername}
          </ProfileInfos>
        </ProfileCard>
      </ProfileCardWrapper>
      <Header
        justifyContent={(
          hasError
            ? 'flex-end'
            : (
              !userId
                ? 'space-between'
                : 'center'
            )
          )}
      />

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="sad" />

          <div className="details">
            <strong>An error occurred while trying to get your infos</strong>

            <Button type="button" onClick={handleTryAgain}>
              Try again
            </Button>
          </div>
        </ErrorContainer>
      )}

    </Container>
  );
}
