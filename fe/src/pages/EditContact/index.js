import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';

import toast from '../../utils/toast';

import ContactsService from '../../services/ContactsService';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(id);

        setIsLoading(false);
        setContactName(contactData.name);
        contactFormRef.current.setFieldsValues(contactData);
      } catch {
        history.push('/');
        toast({
          type: 'danger',
          text: 'Contact not found!',
        });
      }
    }

    loadContact();
  }, [id, history]);

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

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

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader
        title={isLoading ? 'Loading...' : `Edit ${contactName}`}
      />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Save changes"
        onSubmit={handleSubmit}
      />
    </>
  );
}
