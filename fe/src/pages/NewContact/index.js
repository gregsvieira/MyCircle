import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

import useNewContact from './useNewContact';

export default function NewContact() {
  const {
    isLoading,
    contactFormRef,
    handleSubmit,
  } = useNewContact();

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
