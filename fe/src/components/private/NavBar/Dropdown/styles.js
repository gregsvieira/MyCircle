import styled from 'styled-components';

export const DropdownMenu = styled.div`
  position: relative;
`;

export const Menu = styled.div`
  position: absolute;
  overflow: hidden;
  z-index: 1;
  top: 82px;
  left: 0;
  width: 100%;
  height: 168px;
  opacity: 0;
  transform: translateY(-20px);
  visibility: hidden;
  border-radius: 6px;
  background: #2D2F31;
  transition: 0.3s;

  ${(props) => props.open && `
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
  `}
`;

export const MainMenu = styled.div`
  width: 230px;
`;

export const MenuInner = styled.div`
  position: absolute;
  width: 460px;
  display: flex;
  transition: 0.4s;

  ${(props) => props.open && `
    translate: -50%;
  `}
`;

export const MenuItem = styled.button`
  border: 0;
  height: 56px;
  border-radius: 0;

  &:hover {
    background: #1D1E1F;
  }
`;

export const SubMenu = styled.div`
  position: absolute;
  width: 230px;
  left: 230px;
  top: 0;
  opacity: 0;
  visibility: hidden;

  ${(props) => props.open && `
    opacity: 1;
    visibility: visible;
  `}
`;

export const FirstChildSpan = styled.span`
  background: #4E4F51;
  color: #AFB3B5;
  border-radius: 50%;
  font-size: 20px;
  padding: 6px;
  transition: 0.3s;
`;
