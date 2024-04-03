import styled from 'styled-components';

export const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 16px 0;


  svg {
    color: ${({ theme }) => theme.colors.primary.main};
    cursor: pointer;
  }
`;

export const NavBarEmpty = styled.div`
  padding: 16px 0;
  width: 468px;
  height: 32px;
`;

export const AvatarWrapper = styled.div`
  margin-right: 6px;
  &:hover{
    cursor: pointer;
  }
`;
