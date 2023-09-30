import { useState, useRef, useCallback } from 'react';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';
import ContactMapper from '../../services/mappers/ContactMapper';

export default function NewContact() {
  const contactFormRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const stopLoading = useCallback(async () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  stopLoading();

  async function handleSubmit(formData) {
    try {
      const contact = ContactMapper.toPersistence(formData);

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

  return (
    <>
      <PageHeader
        title={isLoading ? 'Loading...' : 'New contact'}
        path="/contacts"
      />
      <ContactForm
        ref={contactFormRef}
        title="New contact"
        buttonLabel="Register"
        onSubmit={handleSubmit}
      />
    </>
  );
}
