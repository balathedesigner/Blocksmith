import React from 'react';
import styled, { css } from 'styled-components';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';
export type AlertSize = 'small' | 'medium' | 'large';

export interface AlertProps {
  variant?: AlertVariant;
  size?: AlertSize;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  styleType?: 'tinted' | 'solid';
  style?: React.CSSProperties;
  className?: string;
}

const variantIcon = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

const variantColor = {
  info: '#2563eb',
  success: '#22c55e',
  warning: '#eab308',
  error: '#ef4444',
};

const AlertContainer = styled.div<{
  variant: AlertVariant;
  size: AlertSize;
  styleType: 'tinted' | 'solid';
}>`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  border-radius: 10px;
  background: ${({ variant, styleType }) =>
    styleType === 'solid'
      ? variantColor[variant]
      : `${variantColor[variant]}15`};
  color: ${({ variant, styleType }) =>
    styleType === 'solid'
      ? '#fff'
      : variantColor[variant]};
  border: 1.5px solid
    ${({ variant, styleType }) =>
      styleType === 'solid'
        ? variantColor[variant]
        : `${variantColor[variant]}33`};
  padding: ${({ size }) =>
    size === 'small' ? '10px 16px' : size === 'large' ? '22px 28px' : '16px 22px'};
  font-size: ${({ size }) =>
    size === 'small' ? '15px' : size === 'large' ? '18px' : '16px'};
  position: relative;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
`;

const IconWrapper = styled.span<{
  variant: AlertVariant;
  styleType: 'tinted' | 'solid';
}>`
  display: flex;
  align-items: center;
  color: ${({ variant, styleType }) =>
    styleType === 'solid' ? '#fff' : variantColor[variant]};
  margin-top: 2px;
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
  text-align: left;
`;

const Title = styled.div`
  font-weight: 600;
  margin-bottom: 2px;
  color: inherit;
  font-size: 1em;
`;

const Description = styled.div`
  color: inherit;
  font-size: 0.97em;
  opacity: 0.85;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  position: absolute;
  top: 10px;
  right: 12px;
  font-size: 18px;
  cursor: pointer;
  opacity: 0.7;
  padding: 2px;
  border-radius: 4px;
  transition: background 0.15s;
  &:hover, &:focus-visible {
    background: #e5e7eb;
    opacity: 1;
    outline: none;
  }
`;

const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  size = 'medium',
  title,
  description,
  icon,
  closable = false,
  onClose,
  children,
  styleType = 'tinted',
  style,
  className,
}) => {
  const IconComp = icon !== undefined ? icon : React.createElement(variantIcon[variant], { size: 22 });
  return (
    <AlertContainer variant={variant} size={size} styleType={styleType} style={style} className={className}>
      <IconWrapper variant={variant} styleType={styleType}>{IconComp}</IconWrapper>
      <Content>
        {title && <Title>{title}</Title>}
        {description && <Description>{description}</Description>}
        {children}
      </Content>
      {closable && (
        <CloseButton aria-label="Close alert" onClick={onClose}>
          <X size={18} />
        </CloseButton>
      )}
    </AlertContainer>
  );
};

export default Alert; 