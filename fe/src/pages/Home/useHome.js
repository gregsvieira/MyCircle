import {
  useState, useCallback, useEffect, useRef,
} from 'react';
import { useHistory } from 'react-router-dom';
import PostsService from '../../services/PostsService';
import toast from '../../utils/toast';

export default function useHome() {
  const history = useHistory();

  const postFormRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [orderBy, setOrderBy] = useState('desc');
  const [isLoading, setIsLoading] = useState(true);

  const loadPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const postsList = await PostsService.listPosts(orderBy);
      if (postsList.error) {
        setHasError(true);
        setPosts([]);
        history.push('/login');
      }

      setHasError(false);
      setPosts(postsList);
    } catch (error) {
      setHasError(true);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  }, [history, orderBy]);

  function handleTryAgain() {
    loadPosts();
  }

  function handleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'desc' ? 'asc' : 'desc'),
    );
  }

  async function handleSubmit(post) {
    try {
      await PostsService.createPost(post);

      postFormRef.current.resetFields();

      loadPosts();

      toast({
        type: 'success',
        text: 'Post created successfully',
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: error.message,
      });
    }
  }

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return {
    posts,
    handleTryAgain,
    orderBy,
    handleOrderBy,
    isLoading,
    hasError,
    postFormRef,
    handleSubmit,
  };
}
