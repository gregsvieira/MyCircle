/* eslint-disable no-nested-ternary */
import {
  Container,
  Header,
  EmptyListContainer,
  ErrorContainer,
  Sentinel,
} from './styles';

import Button from '../../components/Button';

import PostForm from '../../components/PostForm';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import Card from './components/Card';
import Loader from '../../components/Loader';
import useHome from './useHome';

export default function Home() {
  const {
    isLoading,
    handleTryAgain,
    hasError,
    posts,
    postFormRef,
    handleSubmit,
  } = useHome();

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <PostForm
        ref={postFormRef}
        title="New Post"
        buttonLabel="Post"
        onSubmit={handleSubmit}
      />

      <Header
        justifyContent={(
          hasError
            ? 'flex-end'
            : (
              posts.length > 0
                ? 'space-between'
                : 'center'
            )
          )}
      />

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="sad" />

          <div className="details">
            <strong>An error occurred while trying to get the posts</strong>

            <Button type="button" onClick={handleTryAgain}>
              Try again
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
      <>
        {(posts.length < 1 && !isLoading) && (
        <EmptyListContainer>
          <img src={emptyBox} alt="Empty box" />

          <p>
            Your contacts don&apos;t have any post yet! Click the
            {' '}
            <strong>“New Post”</strong>
            button above to register a post to your contacts!
          </p>
        </EmptyListContainer>
        )}

        {posts.map((post) => (
          <Card key={post.id} post={post} />
        ))}
        <Sentinel className="sentinel" />

      </>
      )}

    </Container>
  );
}
