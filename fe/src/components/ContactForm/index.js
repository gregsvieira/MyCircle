import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Form, ButtonContainer } from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import useContactForm from './useContactForm';

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const {
    handleSubmit,
    getErrorMessageByFieldName,
    handleNameChange,
    isSubmitting,
    name,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    isLoadingCategories,
    categoryId,
    categories,
    isFormValid,
    setCategoryId,
  } = useContactForm(onSubmit, ref);

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          value={name}
          error={getErrorMessageByFieldName('name')}
          placeholder="Name *"
          onChange={handleNameChange}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup
        error={getErrorMessageByFieldName('email')}
      >
        <Input
          error={getErrorMessageByFieldName('email')}
          type="email"
          value={email}
          placeholder="E-mail"
          onChange={handleEmailChange}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup
        error={getErrorMessageByFieldName('phone')}
      >
        <Input
          type="tel"
          error={getErrorMessageByFieldName('phone')}
          value={phone}
          placeholder="Phone"
          onChange={handlePhoneChange}
          maxLength="15"
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">No Category</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>

          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmitting}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
});

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
