import styled from 'styled-components';

export const Container = styled.div`
  margin: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin-top: 16px;
    text-align: center;
    color: ${({ theme }) => theme.mode.textColor};

    strong {
      color: ${({ theme }) => theme.mode.textColor};
    }
  }
`;
