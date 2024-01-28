import styled, { css } from 'styled-components';
import { FiEyeOff, FiHeart } from 'react-icons/fi';

export const Container = styled.div`
  transition: all 0.2s ease-in;
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

export const PostCard = styled.div`
    display: flex;
    flex-direction: column;
`;

export const PostInfos = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const AvatarWrapper = styled.div`
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

export const HeartIcon = styled(FiHeart)`
  fill: "#FC5050";
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

export const EyeIcon = styled(FiEyeOff)`
`;
