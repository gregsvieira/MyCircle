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
    borderSize: '4px',
    positionHeight: '-6px',
  },
  m: {
    width: '60px',
    height: '60px',
    fontSizeName: '18px',
    bagdeWidth: '22px',
    bagdeHeight: '22px',
    messageWidth: '24px',
    messageHeight: '24px',
    messageFontSize: '12px',
    borderSize: '4px',
    positionHeight: '-6px',
  },
  s: {
    width: '40px',
    height: '40px',
    fontSizeName: '12px',
    bagdeWidth: '14px',
    bagdeHeight: '14px',
    messageWidth: '16px',
    messageHeight: '16px',
    messageFontSize: '10px',
    borderSize: '2px',
    positionHeight: '-2px',
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

  cursor: ${(onClick) => (onClick ? 'pointer' : 'auto')}
`;

const avatarStyles = css`
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary.soft};
`;

export const Image = styled.img`
  ${avatarStyles};
  object-fit: cover;
`;

export const Span = styled.span`
  transition: all 0.2s ease-in;

  ${avatarStyles};
  display: flex;
  color: ${({ theme }) => theme.colors.gray[50]};
  align-items: center;
  justify-content: center;
  font-size: ${({ size }) => sizes[size].fontSizeName};
  font-weight: 600;
`;

export const Bagde = styled.span`
  transition: all 0.2s ease-in;

  display: block;
  position: absolute;
  z-index: 1;
  bottom: ${({ size }) => sizes[size].positionHeight};
  right: -2px;
  width: ${({ size }) => sizes[size].bagdeWidth};
  height: ${({ size }) => sizes[size].bagdeHeight};
  border-radius: 50%;
  border: ${({ size }) => sizes[size].borderSize} solid ${({ theme }) => theme.mode.backgroundColor};
  background: ${({ theme }) => theme.colors.success.light};
`;

export const Messages = styled.span`
  transition: all 0.2s ease-in;

  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  z-index: 1;
  top: ${({ size }) => sizes[size].positionHeight};
  right: -2px;
  width: ${({ size }) => sizes[size].messageWidth};
  height: ${({ size }) => sizes[size].messageHeight};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.gray[50]};
  font-size: ${({ size }) => sizes[size].messageFontSize};
  font-weight: bolder;

  border: ${({ size }) => sizes[size].borderSize} solid ${({ theme }) => theme.mode.backgroundColor};
  background: ${({ theme }) => theme.colors.newer.main};

`;
