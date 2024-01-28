import styled, { css } from 'styled-components';

const sizes = {
  b: {
    width: '80px',
    height: '80px',
    fontSizeName: '24px',
    bagdeWidth: '28px',
    bagdeHeight: '28px',
    messageWidth: '28px',
    messageHeight: '28px',
    messageFontSize: '9px',
  },
  m: {
    width: '60px',
    height: '60px',
    fontSizeName: '18px',
    bagdeWidth: '24px',
    bagdeHeight: '24px',
    messageWidth: '24px',
    messageHeight: '24px',
    messageFontSize: '8px',
  },
  s: {
    width: '40px',
    height: '40px',
    fontSizeName: '12px',
    bagdeWidth: '14px',
    bagdeHeight: '14px',
    messageWidth: '14px',
    messageHeight: '14px',
    messageFontSize: '6px',
  },
};

const hasRecentPostStyles = css`
  transition: all 0.2s ease-in;

  background: ${({ theme }) => theme.mode.backgroundColor};
  &::before {
    content: "";
    display: block;
    position: absolute;
    z-index: -1;
    top: -2px;
    left: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    border-radius: 50%;
    background:
      linear-gradient(
        -45deg, #21fce2, #0b8fe0
      )
    ;
  }
`;

export const Container = styled.span`
  display: block;
  position: relative;
  width: ${({ size }) => sizes[size].width};
  height: ${({ size }) => sizes[size].height};
  padding: 3px;
  border-radius: 50%;

  ${(p) => p.hasRecentPost
  && hasRecentPostStyles}
`;

const avatarStyles = css`
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary.soft};
`;

export const StyledImage = styled.img`
  ${avatarStyles};
  object-fit: cover;
`;

export const StyledSpan = styled.span`
  transition: all 0.2s ease-in;

  ${avatarStyles};
  display: flex;
  color: ${({ theme }) => theme.mode.textColor};
  align-items: center;
  justify-content: center;
  font-size: ${({ size }) => sizes[size].fontSizeName};
  font-weight: 600;
`;

export const StyledBagde = styled.span`
  transition: all 0.2s ease-in;

  display: block;
  position: absolute;
  z-index: 1;
  bottom: -6px;
  right: -2px;
  width: ${({ size }) => sizes[size].bagdeWidth};
  height: ${({ size }) => sizes[size].bagdeHeight};
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.mode.backgroundColor};
  background: ${({ theme }) => theme.colors.success.light};
`;

export const StyledMessages = styled.span`
  transition: all 0.2s ease-in;

  display: flex;
  position: absolute;
  z-index: 1;
  top: -6px;
  right: -2px;
  width: ${({ size }) => sizes[size].messageWidth};
  height: ${({ size }) => sizes[size].messageHeight};
  border-radius: 50%;
  color: ${({ theme }) => theme.mode.textColor};
  font-size: 9px;
  font-weight: bolder;
  justify-content: center;
  align-items: center;
  border: 4px solid ${({ theme }) => theme.mode.backgroundColor};
  background: ${({ theme }) => theme.colors.newer.main};

`;
