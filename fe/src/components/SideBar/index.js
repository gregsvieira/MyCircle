import {
  AiOutlineCloseCircle,
  AiOutlineUser,
  AiOutlineHome,
  AiOutlineTeam,
  AiOutlineMessage,
  AiOutlineCloudUpload,
} from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ReactPortal from '../ReactPortal';
import { Container, Overlay } from './styles';

export default function SideBar({ onShowSideBar }) {
  return (
    <ReactPortal containerId="sidebar-root">
      <Overlay>
        <Container>
          <header>
            <AiOutlineCloseCircle size={32} onClick={onShowSideBar} />
          </header>
          <nav>
            <Link to="/">
              <AiOutlineHome />
              <span>Home</span>
            </Link>
            <Link to="/profile">
              <AiOutlineUser />
              <span>Profile</span>
            </Link>
            <Link to="/messages">
              <AiOutlineMessage />
              <span>Messages</span>
            </Link>
            <Link to="/contacts">
              <AiOutlineTeam />
              <span>Contacts</span>
            </Link>
            <Link to="/categories">
              <BiCategoryAlt />
              <span>Categories</span>
            </Link>
            <Link to="/upload">
              <AiOutlineCloudUpload />
              <span>Upload</span>
            </Link>
          </nav>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

SideBar.propTypes = {
  onShowSideBar: PropTypes.func.isRequired,
};
