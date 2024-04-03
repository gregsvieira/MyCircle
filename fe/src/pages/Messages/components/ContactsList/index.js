import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  ListHeader,
  Card,
  Sentinel,
  AvatarWrapper,
  MessageCircle,
} from './styles';
import arrow from '../../../../assets/images/icons/arrow.svg';

import Avatar from '../../../../components/Avatar';

export default function ContactsList({
  filteredContacts,
  orderBy,
  onToggleOrderBy,
}) {
  const [visibleItems, setVisibleItems] = useState(5);

  const handleShowMore = () => {
    if (visibleItems < filteredContacts.length) {
      setTimeout(() => {
        setVisibleItems((prevVisibleItems) => (
          Math.min(prevVisibleItems + 5, filteredContacts.length)
        ));
      }, 500);
    }
  };

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        handleShowMore();
      }
    });

    intersectionObserver.observe(document.querySelector('.sentinel'));

    return () => intersectionObserver.disconnect();
  }, [handleShowMore]);

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
              <div className="contact-avatar">
                <AvatarWrapper>
                  <Avatar size="b" name={contact.username} />
                </AvatarWrapper>
              </div>
            </div>

          </div>
          <div>
            <MessageCircle>
              <span>ASJDOJIASDJI</span>
            </MessageCircle>
          </div>
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
    }) || null,
    errors: PropTypes.shape({
      name: PropTypes.bool.isRequired,
      email: PropTypes.bool.isRequired,
      phone: PropTypes.bool.isRequired,
    }),
    unreadMessages: PropTypes.number.isRequired,
  })).isRequired,
  orderBy: PropTypes.string.isRequired,
  onToggleOrderBy: PropTypes.func.isRequired,
};
