import styled from 'styled-components';

export const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  width: 230px;
  height: 72px;
  color: ${({ theme }) => theme.mode.textColor};
  background: transparent;
  border: 0;
  transition: 0.3s;

  &:hover {
    color: #F9F9F9;
  }

  &:hover span:first-child {
    color: #00FBFF;
    background: #4B5858;
  }

  ${(props) => props.dropdown && `
    background: #1D1E1F;
    border-radius: 6px;
  `}
`;
