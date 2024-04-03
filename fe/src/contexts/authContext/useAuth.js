import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import APIError from '../../errors/APIError';
import UsersService from '../../services/UsersService';
import toast from '../../utils/toast';
import delay from '../../utils/delay';

export default function useAuth() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredIsloggedIn = localStorage.getItem('isLoggedIn');

    if (recoveredIsloggedIn) {
      setIsLoggedIn(recoveredIsloggedIn);
    }

    setLoading(false);
  }, [setLoading]);

  const register = async (formData) => {
    try {
      const userRegistered = await UsersService.signUp(formData);

      if (userRegistered.error) {
        toast({
          type: 'danger',
          text: `${userRegistered.error} `,
        });
      }
      toast({
        type: 'success',
        text: 'Registered successfully!',
      });

      toast({
        type: 'success',
        text: `${userRegistered.email} `,
      });

      await delay(500);

      return history.push('/login');
    } catch (error) {
      let message;
      if (error instanceof APIError) {
        message = error.message;
      }

      toast({
        type: 'danger',
        text: `${message ?? 'Unable to login'}`,
      });
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      const {
        success, error,
      } = await UsersService.signIn({ email, password });

      localStorage.setItem('isLoggedIn', isLoggedIn);

      if (error && !success) {
        toast({
          type: 'danger',
          text: 'Unable to login',
        });
        setIsLoggedIn(true);
        localStorage.removeItem('isLoggedIn');
        return history.push('/login');
      }

      setIsLoggedIn(true);
      history.push('/');
      toast({
        type: 'success',
        text: 'Login successful',
      });

      return isLoggedIn;
    } catch (error) {
      let message;
      if (error instanceof APIError) {
        message = error.message;
      }

      toast({
        type: 'danger',
        text: `${message ?? 'Unable to login'}`,
      });
      setIsLoggedIn(null);
      localStorage.removeItem('isLoggedIn');
      return history.push('/login');
    }
  };

  const logout = async () => {
    const {
      success, error,
    } = await UsersService.signOut();

    if (error && !success) {
      toast({
        type: 'danger',
        text: 'Unable to logout. Try again!',
      });
      return error;
    }

    setIsLoggedIn(null);
    localStorage.removeItem('isLoggedIn');
    toast({
      type: 'success',
      text: 'Logout successful',
    });
    return success;
  };

  return {
    isLoggedIn,
    loading,
    register,
    login,
    logout,
  };
}
