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
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
    setIsSubmitting(true);
    setIsLoading(true);
    event.preventDefault();

    const formData = {
      image,
      name,
      username,
      email,
      password,
    };

    await register(formData);
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

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
      setImagePreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleImageClick = () => {
    document.querySelector('input[type="file"]').click();
  };

  return {
    isLoading,
    username,
    handleUsernameChange,
    name,
    handleNameChange,
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
    handleImageChange,
    imagePreview,
    isSubmitting,
    handleSubmit,
    getErrorMessageByFieldName,
    isFormValid,
    handleImageClick,
  };
}
