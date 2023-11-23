import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const InputWrapper = styled.label`
  width: 100%;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
  border: 2px solid #fff;
  border-radius: 4px;
  outline: 0;
  padding: 10px 20px;
  transition: border-color 0.2s ease-in;
  cursor: pointer;
`;

export const FileInput = styled.input`
  display: none;
`;

export const InputLabel = styled.span`
  font-size: 16px;
  color: #333;
`;
