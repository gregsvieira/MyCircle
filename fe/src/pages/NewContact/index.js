import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Select from '../../components/Select';

export default function NewContact() {
  return (
    <>
      <PageHeader
        title="New contact"
      />
      <Input
        type="text"
        placeholder="Name"
      />
      <Input
        type="text"
        placeholder="E-mail"
      />
      <Input
        type="text"
        placeholder="Phone"
      />
      <Select>
        <option value="123">Instagram</option>
        <option value="123">X</option>
        <option value="123">TikTok</option>
      </Select>
    </>
  );
}
