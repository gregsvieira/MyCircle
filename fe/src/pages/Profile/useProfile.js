import {
  useState, useCallback, useEffect, useRef,
} from 'react';
import { useHistory } from 'react-router-dom';
import UsersService from '../../services/UsersService';
// import toast from '../../utils/toast';

export default function useProfile() {
  const history = useHistory();

  const userFormRef = useRef(null);
  const [userActive, setUserActive] = useState(true);
  const [userCreatedAt, setUserCreatedAt] = useState('');
  const [userDeletedAt, setUserDeletedAt] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userUsername, setUserUsername] = useState('');
  const [hasError, setHasError] = useState(false);
  const [orderBy, setOrderBy] = useState('desc');
  const [isLoading, setIsLoading] = useState(true);

  const loadInfos = useCallback(async () => {
    try {
      setIsLoading(true);
      const userInfos = await UsersService.profile();
      console.log(userInfos);
      if (userInfos.error === 'authenticationError') {
        setHasError(true);
        history.push('/login');
      }
      const {
        // eslint-disable-next-line camelcase
        isActive, email, created_at, deleted_at, id, name, password, phone, username,
      } = userInfos;
      setHasError(false);
      setUserActive(isActive);
      setUserCreatedAt(created_at);
      setUserDeletedAt(deleted_at);
      setUserEmail(email);
      setUserId(id);
      setUserName(name);
      setUserPassword(password);
      setUserPhone(phone);
      setUserUsername(username);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [history, orderBy]);

  function handleTryAgain() {
    loadInfos();
  }

  function handleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'desc' ? 'asc' : 'desc'),
    );
  }

  // async function handleSubmit(post) {
  //   try {
  //     await PostsService.createPost(post);

  //     postFormRef.current.resetFields();

  //     loadInfos();

  //     toast({
  //       type: 'success',
  //       text: 'Post created successfully',
  //     });
  //   } catch (error) {
  //     toast({
  //       type: 'danger',
  //       text: error.message,
  //     });
  //   }
  // }

  useEffect(() => {
    loadInfos();
  }, [loadInfos]);

  return {
    handleTryAgain,
    orderBy,
    handleOrderBy,
    isLoading,
    hasError,
    userFormRef,
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
  };
}
