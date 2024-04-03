// eslint-disable-next-line import/no-unresolved
import React from 'react';
import useRegister from './useRegister';

import {
  Container,
  RegisterContainer,
  Form,
  ButtonContainer,
  MessageContainer,
  Message,
  MessageLink,
} from './styles';
import FormGroup from '../../components/FormGroup';
import FormGroupImage from '../../components/FormGroupImage';
import Input from '../../components/Input';
import './styles.css';
import Loader from '../../components/Loader';

import Button from '../../components/Button';

export default function Register() {
  const {
    isLoading,
    username,
    name,
    email,
    password,
    isSubmitting,
    handleSubmit,
    handleUsernameChange,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    getErrorMessageByFieldName,
    isFormValid,
    imagePreview,
    handleImageChange,
    handleImageClick,
  } = useRegister();

  return (
    <Container>
      <RegisterContainer>
        <Loader isLoading={isLoading} />
        <Form onSubmit={handleSubmit}>
          <FormGroupImage name="file" image={imagePreview} handleImageClick={handleImageClick}>
            <Input
              type="file"
              onChange={handleImageChange}
              name="file"
            />
          </FormGroupImage>

          <FormGroup error={getErrorMessageByFieldName('name')}>
            <Input
              value={name}
              error={getErrorMessageByFieldName('name')}
              placeholder="Name *"
              onChange={handleNameChange}
              disabled={isSubmitting}
            />
          </FormGroup>

          <FormGroup error={getErrorMessageByFieldName('username')}>
            <Input
              value={username}
              error={getErrorMessageByFieldName('username')}
              placeholder="Username *"
              onChange={handleUsernameChange}
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
              placeholder="E-mail *"
              onChange={handleEmailChange}
              disabled={isSubmitting}
            />
          </FormGroup>

          <FormGroup
            error={getErrorMessageByFieldName('password')}
          >
            <Input
              error={getErrorMessageByFieldName('password')}
              type="password"
              value={password}
              placeholder="Password"
              onChange={handlePasswordChange}
              disabled={isSubmitting}
            />
          </FormGroup>

          <ButtonContainer>
            <Button
              type="submit"
              disabled={!isFormValid}
              isLoading={isSubmitting}
            >
              Sign Up
            </Button>
          </ButtonContainer>
          <MessageContainer>
            <Message>
              Do you already have an account?
            </Message>
            <MessageLink to="/login">
              <strong>Login</strong>
            </MessageLink>
          </MessageContainer>
        </Form>
      </RegisterContainer>
    </Container>
  );
}
