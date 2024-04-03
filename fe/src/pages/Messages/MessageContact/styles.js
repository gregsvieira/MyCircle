import styled, { css } from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
  position: relative;
`;

export const ProfileCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  background: ${({ theme }) => theme.mode.cardBackground};
  height: max-content;
  width: 100%;
  padding: 16px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  color: #BCBCBC;
  border: 1px solid ${({ theme }) => theme.mode.cardBackground};

  &:hover {
    border: 1px solid ${({ theme }) => theme.mode.linkColor};
    transition: all 0.2s ease-in;
  }

  & + & {
    margin-top: 22px;
  }

  ${({ theme, hasError }) => hasError
    && css`
      border: 2px solid ${theme.colors.danger.lighter};
    `}
`;

export const ProfileCard = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ProfileInfos = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const AvatarWrapper = styled.div`
  max-width: 80px;
  margin-right: 6px;
  &:hover{
    cursor: pointer;
  }
`;

export const UsernameWrapper = styled.div`
  margin-right: 6px;

  strong {
    font-size: 14px;
    font-size: medium;

    &:hover{
    color: ${({ theme }) => theme.mode.linkColor};
    cursor: pointer;
    }
  }
`;

export const DateWrapper = styled.div`
  margin-left: auto;

  small {
    background: ${({ theme }) => theme.colors.primary.lighter};
    color: ${({ theme }) => theme.colors.primary.main};
    font-weight: bold;
    text-transform: uppercase;
    padding: 4px;
    border-radius: 4px;
  }
`;

export const PostContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin: 15px 20px;

  span {
    width: 100%;
  }
`;

export const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PostsLikes = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const Like = styled.div`
  position: relative;
  margin: 0px 6px;
  bottom: -2px;

  color: ${({ theme }) => theme.colors.danger.light};

  &:hover{
    color: ${({ theme }) => theme.colors.danger.main};
    cursor: pointer;
  }
`;

export const ShowWrapper = styled.div`
  position: relative;
  margin: 0px 6px;
  bottom: -2px;

  &:hover{
    color: ${({ theme }) => theme.colors.primary.light};
    cursor: pointer;
}
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
