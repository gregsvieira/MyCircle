import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import FormGroup from '../FormGroup';
import { Form, ButtonContainer } from './styles';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState(''); // controlled Components
  const emailInput = useRef(null); // uncontrolled Components

  return (
    <Form>
      <FormGroup>
        <Input
          value={name}
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Input
          ref={emailInput}
          placeholder="E-mail"
        />
      </FormGroup>

      <FormGroup error="The phone format is invalid.">
        <Input placeholder="Phone" error />
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
