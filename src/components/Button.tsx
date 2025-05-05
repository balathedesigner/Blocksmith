import React from 'react';
import styled, { css } from 'styled-components';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';
export type ButtonState = 'default' | 'success' | 'error' | 'warning';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  state?: ButtonState;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  elevation?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

const stateColor = (state: ButtonState, theme: any) => {
  switch (state) {
    case 'success': return '#22c55e';
    case 'error': return '#ef4444';
    case 'warning': return '#eab308';
    default: return theme.accent;
  }
};

const StyledButton = styled.button<{
  variant: ButtonVariant;
  state: ButtonState;
  size: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  elevation?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border 0.2s, box-shadow 0.2s;
  outline: none;
  border: none;
  position: relative;
  opacity: ${({ disabled, loading }) => (disabled || loading ? 0.6 : 1)};
  pointer-events: ${({ disabled, loading }) => (disabled || loading ? 'none' : 'auto')};
  font-family: inherit;
  ${({ size }) =>
    size === 'small' &&
    css`
      font-size: 14px;
      padding: 6px 16px;
    `}
  ${({ size }) =>
    size === 'medium' &&
    css`
      font-size: 15px;
      padding: 10px 22px;
    `}
  ${({ size }) =>
    size === 'large' &&
    css`
      font-size: 17px;
      padding: 14px 28px;
    `}
  ${({ variant, state, theme }) =>
    variant === 'solid' &&
    css`
      background: ${stateColor(state, theme)};
      color: #fff;
      border: 1.5px solid ${stateColor(state, theme)};
      &:hover, &:focus-visible {
        background: ${theme.accentDark};
        border-color: ${theme.accentDark};
      }
    `}
  ${({ variant, state, theme }) =>
    variant === 'outline' &&
    css`
      background: transparent;
      color: ${stateColor(state, theme)};
      border: 1.5px solid ${stateColor(state, theme)};
      &:hover, &:focus-visible {
        background: ${theme.accentBg};
      }
    `}
  ${({ variant, theme }) =>
    variant === 'ghost' &&
    css`
      background: transparent;
      color: ${theme.text};
      border: 1.5px solid transparent;
      &:hover, &:focus-visible {
        background: ${theme.accentBg};
        color: ${theme.accent};
      }
    `}
  ${({ variant, state, theme }) =>
    variant === 'link' &&
    css`
      background: none;
      color: ${stateColor(state, theme)};
      border: none;
      padding: 0;
      font-weight: 500;
      text-decoration: underline;
      &:hover, &:focus-visible {
        color: ${theme.accentDark};
        background: none;
      }
    `}
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
      display: flex;
    `}
  ${({ elevation }) =>
    elevation &&
    css`
      box-shadow: 0 2px 12px rgba(0,0,0,0.12);
    `}
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  state = 'default',
  size = 'medium',
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  fullWidth = false,
  elevation = false,
  loadingText,
  children,
  ...rest
}) => {
  return (
    <StyledButton
      type={rest.type || 'button'}
      variant={variant}
      state={state}
      size={size}
      loading={loading}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      elevation={elevation}
      {...rest}
    >
      {loading && <IconWrapper><Loader2 className="spin" size={18} /></IconWrapper>}
      {!loading && leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {loading && loadingText ? loadingText : (!loading && children)}
        {loading && !loadingText && children}
      </span>
      {!loading && rightIcon && <IconWrapper>{rightIcon}</IconWrapper>}
    </StyledButton>
  );
}; 