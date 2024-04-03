import {
  useContext, useState, useCallback, useEffect,
} from 'react';

import { AuthContext } from '../../contexts/authContext/auth';

export default function useLogout() {
  const { logout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogout, setIsLogout] = useState(false);

  const loadLogout = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await logout();
      if (response.error) {
        setIsLogout(false);
      }
      setIsLogout(true);
    } catch (error) {
      setIsLogout(false);
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    loadLogout();
  }, []);

  return {
    isLogout,
    isLoading,
    loadLogout,
  };
}
