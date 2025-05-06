import React from 'react';
import styled, { css } from 'styled-components';

export type CardSize = 'small' | 'medium' | 'large';

export interface CardAction {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface CardProps {
  title?: string;
  description?: string;
  elevation?: boolean;
  size?: CardSize;
  thumbnail?: string | React.ReactNode;
  headerIcon?: React.ReactNode;
  onMenuClick?: () => void;
  footerActions?: CardAction[];
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const sizeStyles = {
  small: css`
    padding: 1rem;
    gap: 0.5rem;
  `,
  medium: css`
    padding: 2rem;
    gap: 0.9rem;
  `,
  large: css`
    padding: 2.75rem 2.5rem;
    gap: 1.4rem;
  `,
};

const CardContainer = styled.div<{ elevation?: boolean; size: CardSize }>`
  background: #fff;
  border-radius: 14px;
  box-shadow: ${({ elevation }) =>
    elevation ? '0 2px 16px rgba(0,0,0,0.07)' : '0 1px 4px rgba(0,0,0,0.03)'};
  color: #23272f;
  transition: box-shadow 0.2s;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  text-align: left;
  ${({ size }) => sizeStyles[size]}
`;

const Thumbnail = styled.div`
  width: 100%;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  margin-bottom: 1rem;
  img {
    width: 100%;
    display: block;
    object-fit: cover;
    max-height: 180px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 0.5em;
`;

const CardHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CardContent = styled.div<{ size: CardSize }>`
  font-size: ${({ size }) =>
    size === 'small' ? '0.98rem' :
    size === 'large' ? '1.18rem' :
    '1.08rem'};
  margin-top: 0.2em;
`;

const CardTitle = styled.h3<{ size: CardSize }>`
  font-weight: 700;
  margin: 0 0 0.4em 0;
  color: #23272f;
  text-align: left;
  ${({ size }) =>
    size === 'small' ? 'font-size: 1.1rem;' :
    size === 'large' ? 'font-size: 1.7rem;' :
    'font-size: 1.35rem;'}
`;

const CardDescription = styled.p<{ size: CardSize }>`
  color: #666;
  margin: 0 0 0.7em 0;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  line-height: 1.5;
  max-height: 3em;
  ${({ size }) =>
    size === 'small'
      ? 'font-size: 0.95rem;'
      : size === 'large'
      ? 'font-size: 1.22rem;'
      : 'font-size: 1.08rem;'}
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: #a1a1aa;
  font-size: 22px;
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;
  display: flex;
  align-items: center;
  &:hover, &:focus-visible {
    background: #f3f4f6;
    color: #6366f1;
    outline: none;
  }
`;

const CardFooter = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 1.5em;
  justify-content: flex-end;
`;

const FooterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5em 1.2em;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s;
  &:hover, &:focus-visible {
    background: #4338ca;
    outline: none;
  }
`;

const IconCircle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.2em;
  height: 2.2em;
  border-radius: 50%;
  background: #eef2ff; /* indigo-50 */
  color: #6366f1;      /* indigo-500 */
  margin-right: 0.5em;
  flex-shrink: 0;
`;

export const Card: React.FC<CardProps> = ({
  title,
  description,
  elevation,
  size = 'medium',
  thumbnail,
  headerIcon,
  onMenuClick,
  footerActions,
  children,
  style,
  className,
}) => (
  <CardContainer elevation={elevation} size={size} style={style} className={className}>
    {thumbnail && (
      <Thumbnail>
        {typeof thumbnail === 'string' ? <img src={thumbnail} alt="Card thumbnail" /> : thumbnail}
      </Thumbnail>
    )}
    {(title || headerIcon || onMenuClick) && (
      <CardHeader>
        <CardHeaderLeft>
          {headerIcon && React.isValidElement(headerIcon) ? (
            <IconCircle>{React.cloneElement(headerIcon as React.ReactElement<any>, { size: 20, color: '#6366f1' })}</IconCircle>
          ) : null}
          {title && <CardTitle size={size}>{title}</CardTitle>}
        </CardHeaderLeft>
        {onMenuClick && (
          <MenuButton aria-label="More options" onClick={onMenuClick}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
          </MenuButton>
        )}
      </CardHeader>
    )}
    {description && <CardDescription size={size}>{description}</CardDescription>}
    {children && <CardContent size={size}>{children}</CardContent>}
    {footerActions && footerActions.length > 0 && (
      <CardFooter>
        {footerActions.slice(0, 3).map((action, i) => (
          <FooterButton key={i} onClick={action.onClick} type="button">
            {action.icon}
            {action.label}
          </FooterButton>
        ))}
      </CardFooter>
    )}
  </CardContainer>
);

export default Card; 