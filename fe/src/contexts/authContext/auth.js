/* eslint-disable react/jsx-no-constructed-context-values */
import PropTypes from 'prop-types';
import React, { createContext } from 'react';

import useAuth from './useAuth';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const {
    isLoggedIn,
    loading,
    register,
    login,
    logout,
  } = useAuth();

  return (
    <AuthContext.Provider value={{
      authenticated: !!isLoggedIn, isLoggedIn, loading, register, login, logout,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
