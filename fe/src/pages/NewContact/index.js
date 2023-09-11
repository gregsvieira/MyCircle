import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function NewContact() {
  async function handleSubmit({
    name,
    email,
    phone,
    categoryId,
  }) {
    try {
      const response = await ContactsService.createContacts({
        name,
        email,
        phone,
        category_id: categoryId,
      });

      console.log(response);

      toast({
        type: 'success',
        text: `Contact ${response.name} registered successfully`,
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
        title="New contact"
        buttonLabel="Register"
        onSubmit={handleSubmit}
      />
    </>
  );
}
