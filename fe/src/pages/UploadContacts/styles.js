import styled, { css } from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
  position: relative;
  `;

export const Form = styled.form`
  margin-top: 24px;

  `;

export const ButtonContainer = styled.div`
  margin-top: 24px;

  button {
    width: 100%;
  }
`;

export const InputSearchContainer = styled.div`
  width: 100%;

  input {
    width: 100%;
    height: 50px;
    background-color: #fff;
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

export const Input = styled.input`
  width: 100%;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
  border: none;
  border: 2px solid #fff;
  border-radius: 4px;
  outline: 0;
  padding: 10px 20px;
  transition: border-color 0.2s ease-in;
  appearance: none;
  in

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
  &::placeholder{
      color: #BCBCBC;
  }

  ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main} !important;
  `}

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-color: ${({ theme }) => theme.colors.gray[200]};
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};
  margin-top: 32px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[200]};
  padding-bottom: 16px;

  strong {
    color: #222;
    font-size: 24px;
  }

  a {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    border-radius: 4px;
    padding: 8px 16px;
    transition: all 0.2s ease-in;

    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
      color: #fff;
    }
  }
`;

export const ListHeader = styled.header`
  margin-top: 24px;
  margin-bottom: 8px;

  button {
      background: transparent;
      border: none;
      display: flex;
      align-items: center;

    span {
      margin-right: 8px;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary.main};
    }

    img {
      transform: ${({ orderBy }) => (orderBy === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)')};
      transition: transform 0.2s ease-in;
    }
  }


`;

export const Card = styled.div`
  background: #fff;
  height: 96px;
  width: 100%;
  padding: 16px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 16px;
  }
  .info {
    .category-name {
      display: flex;
      align-items: center;

      small {
        background: ${({ theme }) => theme.colors.primary.lighter};
        color: ${({ theme }) => theme.colors.primary.main};
        font-weight: bold;
        text-transform: uppercase;
        padding: 4px;
        border-radius: 4px;
        margin-left: 8px;
      }
    }

    span {
        display: block;
        font-size: 14px;
        color: ${({ theme }) => theme.colors.gray[200]};
      }
  }

  .actions {
    display: flex;
    align-items: center;
    button {
      background: transparent;
      border: none;
      margin-left: 8px;
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

export const SearchNotFoundContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: flex-start;
  span {
    margin-left: 24px;
    color: ${({ theme }) => theme.colors.gray[200]};
    word-break: break-word;
  }
`;
