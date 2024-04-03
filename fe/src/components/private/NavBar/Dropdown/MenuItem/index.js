/* eslint-disable react/require-default-props */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles.css';
import { MenuButton } from '../MenuButton';

export function MenuItem({
  name,
  index,
  activeSubMenu,
  subItems,
  onClick,
}) {
  const subMenuRef = useRef(null);
  const isActive = activeSubMenu === index;

  const handleClick = () => {
    if (subItems) {
      onClick(index, subMenuRef.current?.clientHeight);
    }
  };

  return (
    <>
      <MenuButton
        onClick={handleClick}
        name={name}
        index={index}
        hasSubItems={Boolean(subItems)}
        subMenuHeight={subMenuRef.current?.clientHeight}
      />
      {subItems?.length && (
        <div ref={subMenuRef} className={`sub-menu ${isActive ? 'open' : ''}`}>
          <MenuButton onClick={onClick} icon="arrow_back" name={name} />
            {subItems.map((subItem) => (
              <MenuButton key={subItem} name={subItem} />
            ))}
        </div>
      )}
    </>
  );
}

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  activeSubMenu: PropTypes.number.isRequired,
  subItems: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func.isRequired,
};
