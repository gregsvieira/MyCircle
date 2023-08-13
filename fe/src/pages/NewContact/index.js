import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

export default function NewContact() {
  return (
    <>
      <PageHeader
        title="New contact"
      />
      <ContactForm title="New contact" buttonLabel="Register" />
    </>
  );
}
