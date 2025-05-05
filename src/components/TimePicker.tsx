import React from 'react';
import styled from 'styled-components';

// type TimeMode = 'time' | 'time-range';

interface TimePickerProps {
  selected: string | [string, string];
  onSelect: (time: string | [string, string]) => void;
  minTime?: string; // "HH:mm"
  maxTime?: string;
  mode: 'time' | 'time-range';
  // onClose?: () => void;
}

const TimeContainer = styled.div`
  background: ${({ theme }) => theme.bg};
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  padding: 18px 18px 8px 18px;
  min-width: 220px;
  z-index: 1000;
  font-family: inherit;
`;

const Header = styled.div`
  font-weight: 600;
  font-size: 1.1em;
  color: ${({ theme }) => theme.text};
  margin-bottom: 10px;
  text-align: left;
`;

const TimeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: 220px;
  overflow-y: auto;
`;

const TimeCell = styled.div<{ isSelected?: boolean }>`
  width: 72px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: ${({ isSelected, theme }) => isSelected ? theme.accent : theme.text};
  background: ${({ isSelected, theme }) => isSelected ? theme.accentBg : 'transparent'};
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  outline: none;
  &:hover, &:focus-visible {
    background: ${({ theme }) => theme.accentBg};
    color: ${({ theme }) => theme.accent};
    outline: none;
  }
`;

const ActionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  font-size: 15px;
`;

const ActionLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.accent};
  font-weight: 500;
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 6px;
  transition: background 0.15s;
  &:hover, &:focus-visible {
    background: ${({ theme }) => theme.accentBg};
    outline: none;
  }
`;

// Helper: generate time options in 15-min intervals
function generateTimes(min: string = '00:00', max: string = '23:45') {
  const times: string[] = [];
  let [h, m] = min.split(':').map(Number);
  const [maxH, maxM] = max.split(':').map(Number);
  while (h < maxH || (h === maxH && m <= maxM)) {
    const hh = h.toString().padStart(2, '0');
    const mm = m.toString().padStart(2, '0');
    times.push(`${hh}:${mm}`);
    m += 15;
    if (m >= 60) {
      m = 0;
      h++;
    }
  }
  return times;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  selected,
  onSelect,
  minTime,
  maxTime,
  mode,
  // onClose,
}) => {
  const times = generateTimes(minTime, maxTime);
  const isSelected = (time: string) => {
    if (typeof selected === 'string') return selected === time;
    if (Array.isArray(selected) && selected[0] && selected[1]) {
      return time >= selected[0] && time <= selected[1];
    }
    if (Array.isArray(selected) && selected[0]) {
      return selected[0] === time;
    }
    return false;
  };

  // Helper: get current time in HH:mm
  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };

  return (
    <TimeContainer>
      <Header>Select Time</Header>
      <TimeGrid>
        {times.map(time => (
          <TimeCell
            key={time}
            isSelected={isSelected(time)}
            onClick={() => onSelect(time)}
            tabIndex={0}
            role="button"
            aria-label={time}
          >
            {time}
          </TimeCell>
        ))}
      </TimeGrid>
      <ActionsRow>
        <ActionLink onClick={() => onSelect(mode === 'time' ? '' : ['', ''])}>Clear</ActionLink>
        <ActionLink onClick={() => onSelect(getCurrentTime())}>Now</ActionLink>
      </ActionsRow>
    </TimeContainer>
  );
};

export default TimePicker; 