import {
  useState, useCallback, useContext,
} from 'react';
import { AuthContext } from '../../contexts/authContext/auth';

import useErrors from '../../hooks/useErrors';

export default function useRegister() {
  const { register } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (username && name && email && password && errors.length === 0);

  const stopLoading = useCallback(async () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);
  stopLoading();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    const res = await register({
      name, username, email, password,
    });
    console.log(res);
    setIsSubmitting(false);
  };

  function handleUsernameChange(event) {
    setUsername(event.target.value);

    if (!event.target.value) {
      setError({ field: 'username', message: 'Username is required' });
    } else {
      removeError('username');
    }
  }

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Name is required' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (!event.target.value) {
      setError({ field: 'email', message: 'Email is required' });
    } else {
      removeError('email');
    }
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);

    if (!event.target.value) {
      setError({ field: 'password', message: 'Password is required' });
    } else {
      removeError('password');
    }
  }

  return {
    isLoading,
    username,
    name,
    email,
    password,
    isSubmitting,
    handleSubmit,
    handleUsernameChange,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    getErrorMessageByFieldName,
    isFormValid,
  };
}
