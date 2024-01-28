import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: baseline;
  flex-wrap: wrap;

`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

`;

export const ButtonContainer = styled.div`
  margin-top: 24px;

  button {
    width: 100%;
  }
`;

export const Text = styled.textarea`
  transition: all 0.2s ease-in;

  width: 100%;
  height: 170px;
  resize: none;
  background: ${({ theme }) => theme.mode.inputColor};
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
  border: none;
  border: 2px solid ${({ theme }) => theme.mode.cardBackground};
  border-radius: 4px;
  outline: 0;
  padding: 16px;
  transition: border-color 0.2s ease-in;
  appearance: none;
  color: ${({ theme }) => theme.mode.textColor};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
  &::placeholder{
      color: #BCBCBC;
  }

  ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main} !important;
  `}

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-color: ${({ theme }) => theme.colors.gray[200]};
  }
`;
