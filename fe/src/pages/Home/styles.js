import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
  position: relative;
`;

export const InputSearchContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;

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

export const EmptyListContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p && span {
    margin-top: 8px;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray[200]};

    strong {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

export const Header = styled.header`
  transition: all 0.2s ease-in;

  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 16px;
  margin: 32px 0px;
  border-bottom: 2px solid ${({ theme }) => theme.mode.headerBorderBottomColor};
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

export const Sentinel = styled.div`
  margin-top: 20px;
  height: 48px;
  width: 100%;
  padding: 16px;
`;
