import { useRef } from 'react';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function NewContact() {
  const contactFormRef = useRef(null);

  async function handleSubmit({
    name,
    email,
    phone,
    categoryId,
  }) {
    try {
      const response = await ContactsService.createContact({
        name,
        email,
        phone,
        category_id: categoryId,
      });

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
        title="New contact"
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
