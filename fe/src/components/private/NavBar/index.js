import {
  useCallback, useContext, useEffect, useState,
} from 'react';

import PropTypes from 'prop-types';

import { AiOutlineMenu } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import SideBar from '../SideBar';
import ToggleThemeButton from '../../ToggleThemeButton';
import { Container, NavBarEmpty/* , AvatarWrapper */ } from './styles';
// import Avatar from '../../Avatar';
import { AuthContext } from '../../../contexts/authContext/auth';
import { Dropdown } from './Dropdown';

export default function NavBar({ theme, onToggleTheme }) {
  const { isLoggedIn } = useContext(AuthContext);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const location = useLocation();

  const handleShowSideBar = useCallback(() => {
    setOpenSideBar((prevState) => !prevState);
  }, []);

  const handleShowDropdown = useCallback(() => {
    setOpenDropdown((prevState) => !prevState);
  }, []);

  useEffect(() => {
    setOpenSideBar(false);
  }, [location]);

  console.log('openDropdown', openDropdown);
  return (
    <Container>
      {isLoggedIn ? (
        <>
          <AiOutlineMenu size={32} onClick={handleShowSideBar} />
          <ToggleThemeButton theme={theme} onToggleTheme={onToggleTheme} />
          <Dropdown onShowDropdown={handleShowDropdown} />

          {openSideBar && <SideBar onShowSideBar={handleShowSideBar} />}
        </>
      )
        : (
          <NavBarEmpty />
        )}

    </Container>
  );
}

NavBar.propTypes = {
  theme: PropTypes.string.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
};
