import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

export default function EditContact() {
  return (
    <>
      <PageHeader
        title="Edit contact"
      />
      <ContactForm title="Edit contact" buttonLabel="Save changes" />
    </>
  );
}
