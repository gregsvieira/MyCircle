import styled from 'styled-components';
import { AiOutlineCloudUpload } from 'react-icons/ai';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin-bottom: 16px;

  small {
    font-size: 0.9rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.danger.dark};
  }

  input {
    background-color: transparent;
    border: none;
    color: transparent;
    box-shadow: none;
    display: none;
    max-width: 0rem;
  }

  .loader {
    position: absolute;
    top: 18px;
    right: 32px;
  }

`;

export const Img = styled.img`
  height: 8rem;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.mode.inputColor};
  width: 8rem;
  transition: border-color 0.2s ease-in;

  :hover {
    transition: 0.2s ease-in;
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    filter: brightness(0.8);
    cursor: pointer;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &:hover + .importIcon {
    transition: opacity 0.2s ease-in;
    opacity: 1;
  }
`;

export const ImportIcon = styled(AiOutlineCloudUpload)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: 50px;
  pointer-events: none;
`;
