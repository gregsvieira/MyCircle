import {
  useState, useCallback, useContext,
} from 'react';
import { AuthContext } from '../../contexts/authContext/auth';

import useErrors from '../../hooks/useErrors';

export default function useLogin() {
  const { /* authenticated, */ login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (email && password && errors.length === 0);

  const stopLoading = useCallback(async () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);
  stopLoading();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      setIsSubmitting(true);

      const res = await login(email, password);
      console.log(res);
    } catch {} finally {
      setIsSubmitting(false);
    }
  };

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
    email,
    password,
    handleSubmit,
    isSubmitting,
    handleEmailChange,
    handlePasswordChange,
    getErrorMessageByFieldName,
    isFormValid,
  };
}
