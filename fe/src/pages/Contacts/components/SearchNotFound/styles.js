import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: flex-start;
  span {
    margin-left: 24px;
    color: ${({ theme }) => theme.mode.textColor};
    word-break: break-word;
  }
`;
