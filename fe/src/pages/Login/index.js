import React from 'react';
import useLogin from './useLogin';
import {
  Container, LoginContainer, Form, Field, Input, Span, ButtonContainer,
  MessageContainer,
  Message,
  MessageLink,
} from './styles';
// eslint-disable-next-line import/no-unresolved
import './styles.css';
import Loader from '../../components/Loader';

import Button from '../../components/Button';

export default function Login() {
  const {
    isLoading,
    email,
    password,
    isSubmitting,
    handleSubmit,
    handleEmailChange,
    handlePasswordChange,
    getErrorMessageByFieldName,
    isFormValid,
  } = useLogin();

  return (
    <Container>
      <LoginContainer>
        <Loader isLoading={isLoading} />
        <Form onSubmit={handleSubmit}>
          <Field>
            <Input
              type="text"
              // error={getErrorMessageByFieldName('email')}
              value={email}
              onChange={handleEmailChange}
              disabled={isSubmitting}
              className={email !== '' ? 'has-val input' : 'input'}
            />
            <Span
              error={getErrorMessageByFieldName('email')}
              placeholder="Email"
              data-placeholder="Email"
              className="focus-input"
            />
          </Field>

          <Field>
            <Input
              type="password"
              error={getErrorMessageByFieldName('password')}
              value={password}
              onChange={handlePasswordChange}
              disabled={isSubmitting}
              className={password !== '' ? 'has-val input' : 'input'}
            />
            <Span
              error={getErrorMessageByFieldName('password')}
              data-placeholder="Password"
              className="focus-input"
            />
          </Field>

          <ButtonContainer>
            <Button
              type="submit"
              disabled={!isFormValid}
              isLoading={isSubmitting}
            >
              Sign In
            </Button>
          </ButtonContainer>

          <MessageContainer>
            <Message>
              You don&apos;t have account yet?
            </Message>
            <MessageLink to="/register">
              <strong>Register</strong>
            </MessageLink>
          </MessageContainer>

        </Form>
      </LoginContainer>
    </Container>
  );
}
