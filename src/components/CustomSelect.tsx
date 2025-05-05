import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'lucide-react';

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectButton = styled.button<{
  isOpen: boolean;
  disabled?: boolean;
  state?: 'default' | 'error' | 'success' | 'warning';
}>`
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid
    ${({ theme, isOpen, state }) => {
      if (state === 'error') return '#ef4444';
      if (state === 'success') return '#22c55e';
      if (state === 'warning') return '#eab308';
      return isOpen ? theme.accent : theme.border;
    }};
  background: ${({ theme, disabled }) => (disabled ? '#e5e7eb' : theme.bg)};
  color: ${({ theme, disabled }) => (disabled ? '#a1a1aa' : theme.text)};
  font-size: 15px;
  text-align: left;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: ${({ theme, state }) => {
      if (state === 'error') return '#ef4444';
      if (state === 'success') return '#22c55e';
      if (state === 'warning') return '#eab308';
      return theme.accent;
    }};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme, state }) => {
      if (state === 'error') return '#ef4444';
      if (state === 'success') return '#22c55e';
      if (state === 'warning') return '#eab308';
      return theme.accent;
    }};
    box-shadow: 0 0 0 2px
      ${({ theme, state }) => {
        if (state === 'error') return 'rgba(239,68,68,0.15)';
        if (state === 'success') return 'rgba(34,197,94,0.15)';
        if (state === 'warning') return 'rgba(234,179,8,0.15)';
        return theme.accentBg;
      }};
  }
`;

const DropdownContainer = styled.div<{
  isOpen: boolean;
  state?: 'default' | 'error' | 'success' | 'warning';
}>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background: ${({ theme }) => theme.bg};
  border: 1px solid
    ${({ theme, state }) => {
      if (state === 'error') return '#ef4444';
      if (state === 'success') return '#22c55e';
      if (state === 'warning') return '#eab308';
      return theme.border;
    }};
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: translateY(${({ isOpen }) => (isOpen ? '0' : '-10px')});
  transition: all 0.2s;
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
`;

const Option = styled.div<{ isSelected: boolean }>`
  padding: 8px 12px;
  cursor: pointer;
  text-align: left;
  background: ${({ theme, isSelected }) => isSelected ? theme.accentBg : 'transparent'};
  color: ${({ theme, isSelected }) => isSelected ? theme.accent : theme.text};
  transition: all 0.15s;

  &:hover {
    background: ${({ theme }) => theme.accentBg};
    color: ${({ theme }) => theme.accent};
  }

  &:first-child {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  &:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;

const ChevronIcon = styled(ChevronDown)<{ isOpen: boolean }>`
  transition: transform 0.2s;
  transform: rotate(${({ isOpen }) => (isOpen ? '180deg' : '0deg')});
  color: ${({ theme }) => theme.text};
  opacity: 0.5;
`;

const LeftIconWrapper = styled.span`
  display: flex;
  align-items: center;
  margin-right: 8px;
  color: #a1a1aa;
`;

interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  'aria-label'?: string;
  icon?: React.ReactNode;
  state?: 'default' | 'error' | 'success' | 'warning';
}

export function CustomSelect({
  options,
  value,
  onChange,
  disabled,
  placeholder = 'Select an option',
  'aria-label': ariaLabel,
  icon,
  state = 'default',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        if (!isOpen) {
          setIsOpen(true);
        } else {
          event.preventDefault();
          const currentIndex = options.indexOf(value);
          const nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
          onChange(options[nextIndex]);
        }
        break;
      case 'ArrowUp':
        if (!isOpen) {
          setIsOpen(true);
        } else {
          event.preventDefault();
          const currentIndex = options.indexOf(value);
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
          onChange(options[prevIndex]);
        }
        break;
    }
  };

  return (
    <SelectContainer ref={containerRef}>
      <SelectButton
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        isOpen={isOpen}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
        state={state}
      >
        <span style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
          {icon && <LeftIconWrapper>{icon}</LeftIconWrapper>}
          <span style={{ textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value || placeholder}</span>
        </span>
        <ChevronIcon size={18} isOpen={isOpen} />
      </SelectButton>
      <DropdownContainer 
        isOpen={isOpen} 
        role="listbox" 
        aria-label={ariaLabel}
        state={state}
      >
        {options.map((option) => (
          <Option
            key={option}
            isSelected={option === value}
            onClick={() => handleSelect(option)}
            role="option"
            aria-selected={option === value}
          >
            {option}
          </Option>
        ))}
      </DropdownContainer>
    </SelectContainer>
  );
} 