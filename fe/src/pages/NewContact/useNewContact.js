import { useState, useRef, useCallback } from 'react';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useNewContact() {
  const contactFormRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const stopLoading = useCallback(async () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  stopLoading();

  async function handleSubmit(contact) {
    try {
      const response = await ContactsService.createContact(contact);

      contactFormRef.current.resetFields();

      toast({
        type: 'success',
        text: `Contact '${response.name}' registered successfully`,
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: error.message,
      });
    }
  }

  return {
    isLoading,
    contactFormRef,
    handleSubmit,
  };
}
