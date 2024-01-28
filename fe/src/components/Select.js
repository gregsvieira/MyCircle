import styled from 'styled-components';

export default styled.select`
  width: 100%;
  height: 52px;
  background: ${({ theme }) => theme.mode.inputColor};
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
  border: none;
  border: 2px solid ${({ theme }) => theme.mode.inputColor};
  border-radius: 4px;
  outline: 0;
  padding: 0 16px;
  transition: border-color 0.2s ease-in;
  appearance: none;
  color: ${({ theme }) => theme.mode.selectTextColor};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
  &::placeholder{
      color: #BCBCBC;
    }

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-color: ${({ theme }) => theme.colors.gray[200]};
    opacity: 1;
    color: #cbc0bc;
  }
`;
