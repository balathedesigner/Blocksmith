import React, { useState } from 'react';
import styled, { css } from 'styled-components';

export type AccordionItem = {
  id: string;
  title: string;
  content: React.ReactNode;
};

export interface AccordionProps {
  items: AccordionItem[];
  variant?: 'default' | 'bordered';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  iconPosition?: 'left' | 'right';
  multipleOpen?: boolean;
}

const AccordionContainer = styled.div<{ variant: string; size: string; disabled: boolean }>`
  width: 100%;
  border-radius: 12px;
  background: ${({ theme }) => theme.bg};
  ${({ variant, theme }) =>
    variant === 'bordered' &&
    css`
      border: 1.5px solid ${theme.border};
    `}
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

const AccordionSection = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.border};
  &:last-child {
    border-bottom: none;
  }
`;

const AccordionHeader = styled.button<{ size: string; open: boolean }>`
  width: 100%;
  background: none;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: ${({ size }) => (size === 'small' ? '1rem' : size === 'large' ? '1.25rem' : '1.1rem')};
  font-weight: 600;
  padding: ${({ size }) => (size === 'small' ? '0.75rem 1rem' : size === 'large' ? '1.25rem 1.5rem' : '1rem 1.25rem')};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: background 0.2s;
  background: ${({ open, theme }) => (open ? theme.accentBg : 'transparent')};
  &:hover, &:focus-visible {
    background: ${({ theme }) => theme.accentBg};
  }
`;

const AccordionIcon = styled.span<{ open: boolean; position: string }>`
  display: flex;
  align-items: center;
  margin-right: ${({ position }) => (position === 'left' ? '0.75em' : 0)};
  margin-left: ${({ position }) => (position === 'right' ? '0.75em' : 0)};
  transition: transform 0.2s;
  transform: rotate(${({ open }) => (open ? 90 : 0)}deg);
`;

const AccordionPanel = styled.div<{ open: boolean; size: string }>`
  max-height: ${({ open }) => (open ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.4,0,0.2,1);
  background: ${({ theme }) => theme.tabContentBg};
  padding: ${({ open, size }) => (open ? (size === 'small' ? '0.5rem 1rem' : size === 'large' ? '1rem 1.5rem' : '0.75rem 1.25rem') : '0 1.25rem')};
  color: ${({ theme }) => theme.text};
  text-align: left;
`;

export const Accordion: React.FC<AccordionProps> = ({
  items,
  variant = 'default',
  size = 'medium',
  disabled = false,
  iconPosition = 'left',
  multipleOpen = false,
}) => {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    if (multipleOpen) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((oid) => oid !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev[0] === id ? [] : [id]));
    }
  };

  return (
    <AccordionContainer variant={variant} size={size} disabled={disabled}>
      {items.map((item) => {
        const open = openIds.includes(item.id);
        return (
          <AccordionSection key={item.id}>
            <AccordionHeader
              size={size}
              open={open}
              onClick={() => handleToggle(item.id)}
              aria-expanded={open}
              aria-controls={`panel-${item.id}`}
              disabled={disabled}
            >
              {iconPosition === 'left' && (
                <AccordionIcon open={open} position="left" aria-hidden>
                  ▶
                </AccordionIcon>
              )}
              <span>{item.title}</span>
              {iconPosition === 'right' && (
                <>
                  <span style={{ flex: 1 }} />
                  <AccordionIcon open={open} position="right" aria-hidden>
                    ▶
                  </AccordionIcon>
                </>
              )}
            </AccordionHeader>
            <AccordionPanel
              id={`panel-${item.id}`}
              open={open}
              size={size}
              aria-hidden={!open}
            >
              {item.content}
            </AccordionPanel>
          </AccordionSection>
        );
      })}
    </AccordionContainer>
  );
}; 