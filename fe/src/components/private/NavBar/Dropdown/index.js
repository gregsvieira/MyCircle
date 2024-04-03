/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import './styles.css';
import { IoChevronDownOutline } from 'react-icons/io5';
import {
  DropdownMenu, FirstChildSpan, MainMenu, Menu, MenuInner,
} from './styles';
import { DropdownButton } from './DropdownButton';
import { MenuItem } from './MenuItem';

import Avatar from '../../../Avatar';

const items = [
  {
    name: 'settings',
    subItems: ['photo', 'phone', 'login'],
  },
  {
    name: 'build',
    subItems: ['description', 'folder', 'article'],
  },
  {
    name: 'devices',
    subItems: ['storage', 'mouse', 'keyboard', 'headphones'],
  },
  {
    name: 'logout',
  },
];

export function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [setSubMenuHeight] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const handleClick = (index, subMenuHeight) => {
    setActiveSubMenu(index);
    setSubMenuHeight(subMenuHeight);
    setIsSubMenuOpen(true);
  };

  return (
    <DropdownMenu>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        <FirstChildSpan className="material-symbols-outlined">
          <Avatar name="TST" size="m" />
        </FirstChildSpan>
        <IoChevronDownOutline size={16} />
      </DropdownButton>
      <Menu open={isOpen}>
        <MenuInner open={isSubMenuOpen}>
          <MainMenu>
            {items.map((item, index) => (
              <MenuItem
                key={item.name}
                name={item.name}
                index={index}
                activeSubMenu={activeSubMenu}
                onClick={handleClick}
                subItems={item.subItems}
              />
            ))}
          </MainMenu>
        </MenuInner>
      </Menu>
    </DropdownMenu>
  );
}

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  activeSubMenu: PropTypes.number.isRequired,
  subItems: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func.isRequired,
};
