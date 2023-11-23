import styled from 'styled-components';

export const Container = styled.div`
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
