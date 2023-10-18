import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function useEditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(id);

        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValues(contactData);
          setIsLoading(false);
          setContactName(contactData.name);
        });
      } catch {
        safeAsyncAction(() => {
          history.push('/contacts');
          toast({
            type: 'danger',
            text: 'Contact not found!',
          });
        });
      }
    }

    loadContact();
  }, [id, history, safeAsyncAction]);

  async function handleSubmit(contact) {
    try {
      const updatedContact = await ContactsService.updateContact(
        id,
        contact,
      );

      setContactName(updatedContact.name);

      toast({
        type: 'success',
        text: 'Contact edited successfully',
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: 'An error occurred while editing the contact',
      });
    }
  }

  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  };
}
