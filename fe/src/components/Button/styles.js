import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  height: 52px;
  border: none;
  border-radius: 4px;
  padding: 0 16px;
  background: ${({ theme }) => theme.colors.primary.main};
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
  transition: background 0.2s ease-in;
  appearance: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled] {
    background: #CCC;
    cursor: default;
  }

  ${({ theme, danger }) => danger && css`
    background: ${theme.colors.danger.main};

    &:hover {
    background: ${theme.colors.danger.light};
    }

    &:active {
      background: ${theme.colors.danger.dark};
    }
  `}
`;
