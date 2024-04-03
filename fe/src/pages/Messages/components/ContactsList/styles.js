import styled, { css } from 'styled-components';
import { FiMessageCircle } from 'react-icons/fi';

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
  background: ${({ theme }) => theme.mode.cardBackground};
  color: ${({ theme }) => theme.mode.textColor};
  height: 96px;
  width: 100%;
  padding: 16px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  transition: all 0.2s ease-in;

  & + & {
    margin-top: 16px;
  }
  .info {
    display: flex;
      align-items: center;

    .contact-name {
      display: flex;
      align-items: center;

      small {
        transition: all 0.2s ease-in;
        background: ${({ theme }) => theme.mode.categorySmallBackground};
        color: ${({ theme }) => theme.mode.categorySmallColor};
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

  ${({ theme, hasError }) => hasError
    && css`
    border: 2px solid ${theme.colors.danger.lighter}
  `}
`;

export const MessageCircle = styled(FiMessageCircle)`
  font-size: 30px;
  color:${({ theme }) => theme.colors.primary.lighter};
  fill: ${({ theme }) => theme.colors.primary.light};
`;

export const UnreadMessages = styled.span`
  display: block;
  font-size: 14px;
  color: ${({ unreadMessages }) => unreadMessages};
  margin-top: 5px;
`;

export const AvatarWrapper = styled.div`
  max-width: 80px;
  margin-right: 6px;
  &:hover{
    cursor: pointer;
  }
`;

export const Sentinel = styled.div`
  margin-top: 20px;
  height: 48px;
  width: 100%;
  padding: 16px;
`;
