import React from 'react';
import { Redirect } from 'react-router-dom';
import Loader from '../../components/Loader';

import useLogout from './useLogout';

function Logout() {
  const { isLoading, isLogout } = useLogout();

  return (
    <>
      <Loader isLoading={isLoading} />
      {isLogout && (
        <Redirect to="/login" />
      )}
    </>
  );
}

export default Logout;
