import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

import ContactsService from '../../services/ContactsService';

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
    } catch (error) {
      alert('An API error occurred');
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
