import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  ListHeader,
  Card,
  Sentinel,
} from './styles';

import arrow from '../../../../assets/images/icons/arrow.svg';
import edit from '../../../../assets/images/icons/edit.svg';
import trash from '../../../../assets/images/icons/trash.svg';
import confirm from '../../../../assets/images/icons/confirm.svg';
import cancel from '../../../../assets/images/icons/cancel.svg';

export default function ContactsList({
  filteredContacts,
  orderBy,
  onToggleOrderBy,
  onDeleteContact,
  // onEditContact,
  isEditable,
}) {
  const [visibleItems, setVisibleItems] = useState(5);
  const [editingContact, setEditingContact] = useState(null);
  const [editedContact, setEditedContact] = useState(null);

  const handleShowMore = () => {
    if (visibleItems < filteredContacts.length) {
      setTimeout(() => {
        setVisibleItems((prevVisibleItems) => (
          Math.min(prevVisibleItems + 5, filteredContacts.length)
        ));
      }, 500);
    }
  };

  const handleEditClick = (contact) => {
    setEditingContact(contact);
    setEditedContact({ ...contact });
  };

  const handleEditingContact = (event, field) => {
    setEditedContact((prevEditedContact) => ({
      ...prevEditedContact,
      [field]: event.target.value,
    }));
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
  };

  const handleSaveEdit = (contact) => {
    setEditingContact(contact);
  };

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        handleShowMore();
      }
    });

    intersectionObserver.observe(document.querySelector('.sentinel'));

    return () => intersectionObserver.disconnect();
  }, []);

  return (
    <>
      {filteredContacts.length > 0 && (
      <ListHeader orderBy={orderBy}>
        <button type="button" className="sort-button" onClick={onToggleOrderBy}>
          <span>Name</span>
          <img src={arrow} alt="arrow" />
        </button>
      </ListHeader>
      )}

      {filteredContacts.slice(0, visibleItems).map((contact) => (
        <Card hasError={contact.errors?.length > 0} key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>
                {editingContact === contact ? (
                  <input type="text" value={editedContact?.name} onChange={(event) => handleEditingContact(event, 'name')} />
                )
                  : contact.name}
              </strong>
              {contact.category.name && (
              <small>
                {editingContact === contact ? (
                  <input type="text" value={editedContact?.category?.name} onChange={(event) => handleEditingContact(event, 'category')} />
                )
                  : contact.category.name}
              </small>
              )}
            </div>

            <span>
              {editingContact === contact ? (
                <input type="text" value={editedContact?.email} onChange={(event) => handleEditingContact(event, 'email')} />
              )
                : contact.email}
            </span>
            <span>
              {editingContact === contact ? (
                <input type="text" value={editedContact?.phone} onChange={(event) => handleEditingContact(event, 'phone')} />
              )
                : contact.phone}
            </span>
          </div>

          {editingContact === contact ? (
            <div className="actions">
              <button
                type="button"
                onClick={() => handleSaveEdit(editedContact)}
              >
                <img src={confirm} alt="confirm" />
              </button>

              <button
                type="button"
                onClick={() => handleCancelEdit()}
              >
                <img src={cancel} alt="cancel" />
              </button>
            </div>
          )
            : (
              <div className="actions">
                { isEditable ? (
                  <button
                    type="button"
                    onClick={() => handleEditClick(contact)}
                  >
                    <img src={edit} alt="edit" />
                  </button>
                ) : (
                  <Link to={`contacts/edit/${contact.id}`}>
                    <img src={edit} alt="edit" />
                  </Link>
                ) }

                <button
                  type="button"
                  onClick={() => onDeleteContact(contact)}
                >
                  <img src={trash} alt="delete" />
                </button>
              </div>
            )}
        </Card>
      ))}
      <Sentinel className="sentinel" />
    </>
  );
}

ContactsList.propTypes = {
  filteredContacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string,
    category: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
    }),
    errors: PropTypes.shape({
      name: PropTypes.bool.isRequired,
      email: PropTypes.bool.isRequired,
      phone: PropTypes.bool.isRequired,
    }),
  })).isRequired,
  orderBy: PropTypes.string.isRequired,
  onToggleOrderBy: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
  isEditable: PropTypes.bool,
  // onEditContact: PropTypes.func,
};

ContactsList.defaultProps = {
  isEditable: false,
  // onEditContact: null,
};
