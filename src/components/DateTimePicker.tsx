import React, { useRef, useState, useLayoutEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import CalendarPicker from './CalendarPicker';
import TimePicker from './TimePicker';

// Picker modes
type PickerMode = 'date' | 'date-range' | 'time' | 'time-range';

export interface DateTimePickerProps {
  mode: PickerMode;
  value: Date | [Date, Date] | string | [string, string];
  onChange: (value: Date | [Date, Date] | string | [string, string]) => void;
  label?: string;
  minDate?: Date;
  maxDate?: Date;
  minTime?: string; // "HH:mm"
  maxTime?: string;
  disabled?: boolean;
  /** Optional icon to display at the start of the field */
  icon?: ReactNode;
  // ...other props as needed
}

function isDateArray(val: unknown): val is [Date, Date] {
  return Array.isArray(val) && val.length === 2 && val.every(v => v instanceof Date);
}
function isTimeArray(val: unknown): val is [string, string] {
  return Array.isArray(val) && val.length === 2 && typeof val[0] === 'string' && typeof val[1] === 'string';
}

const StyledInputWrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.bg};
  border: 1.5px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 0.5em 1em;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  transition: border 0.2s, background 0.2s;
  width: 100%;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  justify-content: flex-start;
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  margin-right: 0.7em;
  color: ${({ theme }) => theme.subtext};
  font-size: 1.2em;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  font-size: 1.1em;
  color: ${({ theme }) => theme.text};
  flex: 1;
  padding: 0;
  cursor: pointer;
  text-align: left;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 4px;
  text-align: left;
`;

const Popover = styled.div`
  position: absolute;
  z-index: 2000;
`;

// Model: Holds state and constraints
// Controller: Handles user interaction (to be implemented)
// Presenter: Renders UI based on mode

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  mode,
  value,
  onChange,
  label,
  minDate,
  maxDate,
  minTime,
  maxTime,
  disabled,
  icon,
}) => {
  // Popover state
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  // For range pickers, track which end is being set
  const [rangeStep, setRangeStep] = useState<'start' | 'end'>('start');

  // Popover position
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });

  // Update popover position when open
  useLayoutEffect(() => {
    if (open && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setPopoverPos({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [open]);

  // Close on scroll (optional, for robustness)
  React.useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener('scroll', close, true);
    return () => window.removeEventListener('scroll', close, true);
  }, [open]);

  // Render value as string
  const renderValue = () => {
    if (mode === 'date' && value instanceof Date) return value.toISOString().slice(0, 10);
    if (mode === 'date-range' && isDateArray(value)) return `${value[0].toISOString().slice(0, 10)} to ${value[1].toISOString().slice(0, 10)}`;
    if (mode === 'time' && typeof value === 'string') return value;
    if (mode === 'time-range' && isTimeArray(value)) return `${value[0]} to ${value[1]}`;
    return '';
  };

  // Handlers for pickers
  const handleDateSelect = (date: Date | null | [Date | null, Date | null]) => {
    if (mode === 'date') {
      if (date instanceof Date) {
        onChange(date);
        setOpen(false);
      }
    } else if (mode === 'date-range') {
      if (date instanceof Date) {
        if (rangeStep === 'start') {
          onChange([date, date]);
          setRangeStep('end');
        } else {
          if (isDateArray(value)) {
            const start = value[0];
            if (date < start) {
              onChange([date, date]);
            } else {
              onChange([start, date]);
            }
            setOpen(false);
            setRangeStep('start');
          }
        }
      } else if (Array.isArray(date)) {
        // Support for clear
        onChange([new Date(), new Date()]);
        setOpen(false);
        setRangeStep('start');
      }
    }
  };

  const handleTimeSelect = (time: string | [string, string]) => {
    if (mode === 'time') {
      if (typeof time === 'string') {
        onChange(time);
        setOpen(false);
      }
    } else if (mode === 'time-range') {
      if (typeof time === 'string') {
        if (rangeStep === 'start') {
          onChange([time, time]);
          setRangeStep('end');
        } else {
          if (isTimeArray(value)) {
            const start = value[0];
            if (time < start) {
              onChange([time, time]);
            } else {
              onChange([start, time]);
            }
            setOpen(false);
            setRangeStep('start');
          }
        }
      } else if (Array.isArray(time)) {
        // Support for clear
        onChange(['', '']);
        setOpen(false);
        setRangeStep('start');
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 220, width: 320, position: 'relative' }}>
      {label && <Label>{label}</Label>}
      <div ref={inputRef} style={{ position: 'relative' }}>
        <StyledInputWrapper disabled={disabled} onClick={() => !disabled && setOpen(o => !o)} tabIndex={0}>
          {icon && <IconWrapper>{icon}</IconWrapper>}
          <StyledInput
            as="div"
            tabIndex={-1}
            aria-readonly
            aria-disabled={disabled}
            style={{ userSelect: 'none', cursor: disabled ? 'not-allowed' : 'pointer' }}
          >
            {renderValue() || (mode.includes('date') ? 'Select date' : 'Select time')}
          </StyledInput>
        </StyledInputWrapper>
        {open && typeof window !== 'undefined' && ReactDOM.createPortal(
          <Popover style={{
            top: popoverPos.top,
            left: popoverPos.left,
            width: popoverPos.width,
          }}>
            {mode === 'date' || mode === 'date-range' ? (
              <CalendarPicker
                selected={value as Date | [Date, Date]}
                onSelect={handleDateSelect}
                minDate={minDate}
                maxDate={maxDate}
                mode={mode === 'date' ? 'date' : 'date-range'}
                onClose={() => setOpen(false)}
              />
            ) : (
              <TimePicker
                selected={value as string | [string, string]}
                onSelect={handleTimeSelect}
                minTime={minTime}
                maxTime={maxTime}
                mode={mode === 'time' ? 'time' : 'time-range'}
                onClose={() => setOpen(false)}
              />
            )}
          </Popover>,
          document.body
        )}
      </div>
    </div>
  );
};

export default DateTimePicker; 