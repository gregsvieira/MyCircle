import PropTypes from 'prop-types';
import FormGroup from '../FormGroup';
import { Form, ButtonContainer } from './styles';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

export default function ContactForm({ buttonLabel }) {
  return (
    <Form>
      <FormGroup>
        <Input placeholder="Name" />
      </FormGroup>

      <FormGroup
        error="The email format is invalid."
      >
        <Input placeholder="E-mail" error />
      </FormGroup>

      <FormGroup>
        <Input placeholder="Phone" />
      </FormGroup>

      <FormGroup>
        <Select>
          <option value="selectOne">Social media:</option>
          <option value="x-twitter">X / Twitter</option>
          <option value="instagram">Instagram</option>
          <option value="tiktok">Tiktok</option>
        </Select>

        <ButtonContainer>
          <Button type="submit">
            {buttonLabel}
          </Button>
        </ButtonContainer>
      </FormGroup>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
