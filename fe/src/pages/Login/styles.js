import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  color: ${({ theme }) => theme.mode.textColor};
`;

export const LoginContainer = styled.div`
  width: 100%;
  min-height: 60dvh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

export const LoginWrapper = styled.div`
  width: 390px;
  background-color: #333;
  border-radius: 10px;
  overflow: hidden;
  padding: 55px 55px 33px 55px;
  box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.2);
`;

export const Form = styled.form`
  width: 100%;
  max-width: 480px;
  padding: 0.5rem;
`;

export const Span = styled.span`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  /* color: #000; */
  font-family: Nunito, sans-serif;

  /* ${({ theme, error }) => (error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main} !important;
    background: ${theme.colors.danger.main} !important;
  `)
}; */

  &::before {
    content: "";
    display: block;
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
    background: #6a7dfe;


    ${({ theme, error }) => (error ? css`
    background: ${theme.colors.danger.main} !important;
  `
    : css`
    background: -webkit-linear-gradient(to left, #6a7dfe, #6014ee);
    background: -o-linear-gradient(to left, #6a7dfe, #6014ee);
    background: -moz-linear-gradient(to left, #6a7dfe, #6014ee);
    background: linear-gradient(to left, #6a7dfe, #6014ee);
    `)
}
  }

  &::after {
    font-family: Nunito, sans-serif;
    font-size: 18px;
    color: #999999;
    line-height: 1.2;
    content: attr(data-placeholder);
    display: block;
    width: 100%;
    position: absolute;
    top: 16px;
    left: 0px;
    padding-left: 5px;
    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
    top: 0px;

    ${({ theme, error }) => (error && css`
    -webkit-transition:0;
    border-bottom: ${theme.colors.danger.main} !important;
    `)};
  }
`;

export const Field = styled.div`
  width: 100%;
  position: relative;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[200]};
  margin-bottom: 37px;

  &:focus-within {
    ${Span}::before {
      width: 100%;
    }

    ${Span}::after {
      top: -28px;
      width: 100%;
    }
  }
`;

export const Input = styled.input`
  width: 100%;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray[900]};
  line-height: 0.2;
  border: none;

  &::placeholder {
    color: #bcbcbc;
  }

  &:focus {
    outline: 0;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  font-size: 15px;
  color: ${({ theme }) => theme.mode.textColor};;
  line-height: 1.2;
  border: none;
  display: block;
  width: 100%;
  height: 45px;
  background-color: transparent;
  padding: 0 5px;
  font-family: Nunito, sans-serif;
`;

export const ButtonContainer = styled.div`
  margin-top: 24px;

  button {
    width: 100%;

    &:hover {
      cursor: pointer;
    }
  }

  p {
    margin-top: 20px;
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Message = styled.p`
  width: 100%;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const MessageLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.mode.linkColor};;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
