import styled, { css } from 'styled-components';

export default styled.input`
  width: 100%;
  height: 52px;
  background: #fff;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
  border: none;
  border: 2px solid #fff;
  border-radius: 4px;
  outline: 0;
  padding: 0 16px;
  transition: border-color 0.2s ease-in;
  appearance: none;

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
