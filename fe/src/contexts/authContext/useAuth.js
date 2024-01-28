import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import APIError from '../../errors/APIError';
import UsersService from '../../services/UsersService';
import toast from '../../utils/toast';
import delay from '../../utils/delay';

export default function useAuth() {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user');

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }

    setLoading(false);
  }, [setLoading]);

  const register = async ({
    name, username, email, password,
  }) => {
    try {
      const userRegistered = await UsersService.signUp({
        name, username, email, password,
      });

      toast({
        type: 'success',
        text: `Registered successfully! Username: ${userRegistered.username} Email: ${userRegistered.email} `,
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
      const { token, refreshToken } = await UsersService.signIn({ email, password });

      const loggedUser = {
        token,
        refresh_token: refreshToken,
        email,
      };

      localStorage.setItem('user', JSON.stringify(loggedUser));

      if (loggedUser) {
        setUser(loggedUser);
        history.push('/');
        toast({
          type: 'success',
          text: 'Login successful',
        });
      }
      return loggedUser;
    } catch (error) {
      let message;
      if (error instanceof APIError) {
        message = error.message;
      }

      toast({
        type: 'danger',
        text: `${message ?? 'Unable to login'}`,
      });
      setUser(null);
      localStorage.removeItem('user');
      return history.push('/login');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    history.push('/login');
  };

  return {
    user,
    loading,
    register,
    login,
    logout,
  };
}
