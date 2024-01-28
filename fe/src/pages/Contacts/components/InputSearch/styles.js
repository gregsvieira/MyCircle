import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  transition: all 0.2s ease-in;

  input {
    width: 100%;
    height: 50px;
    background-color: ${({ theme }) => theme.mode.inputColor};
    border: none;
    border-radius: 25px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    outline: 0;
    padding: 0 16px;

    &::placeholder{
      color: #BCBCBC;
    }
  }
`;
