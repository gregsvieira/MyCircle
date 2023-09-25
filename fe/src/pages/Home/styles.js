import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
  position: relative;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 16px;
  margin: 32px 0px;

  h1 {
    color: #222;
    font-size: 28px;
  }
`;

export const MenuBar = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[200]};
  padding-bottom: 16px;
  justify-content: center;
  flex-direction: column;

  a {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary.main};
      text-decoration: none;
      border: 2px solid ${({ theme }) => theme.colors.primary.main};
      border-radius: 4px;
      padding: 8px 16px;
      transition: all 0.2s ease-in;
      margin-bottom: 12px;

      &:hover {
        background: ${({ theme }) => theme.colors.primary.main};
        color: #fff;
      }
    }


  `;
