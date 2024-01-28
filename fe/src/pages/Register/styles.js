import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const RegisterContainer = styled.div`
  width: 100%;
  min-height: 60dvh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

export const RegisterWrapper = styled.div`
  width: 390px;
  background-color: #333;
  border-radius: 10px;
  overflow: hidden;
  padding: 55px 55px 33px 55px;
  box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.2);
`;

export const Form = styled.form`
  width: 100%;
  max-width: 480px;
  padding: 0.5rem;
`;

export const ButtonContainer = styled.div`
  margin-top: 24px;

  button {
    width: 100%;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Message = styled.p`
  width: 100%;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.mode.textColor};
`;

export const MessageLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.mode.linkColor};
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
