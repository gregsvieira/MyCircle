import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
  position: relative;
`;

export const InputSearchContainer = styled.div`
  width: 100%;

  input {
    transition: all 0.2s ease-in;

    width: 100%;
    height: 50px;
    background-color: ${({ theme }) => theme.mode.inputColor};
    border: none;
    border-radius: 25px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    outline: 0;
    padding: 0 16px;
    color

    &::placeholder{
      color: #BCBCBC;
    }
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  margin-top: 16px;
  align-items: center;

  .details {
    margin-left: 16px;

    strong {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.danger.main};
    display: block;
    margin-bottom: 8px;
  }
  }
`;
