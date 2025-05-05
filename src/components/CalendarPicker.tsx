import React from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type CalendarMode = 'date' | 'date-range';

interface CalendarPickerProps {
  selected: Date | [Date, Date];
  onSelect: (date: Date | [Date, Date]) => void;
  mode: CalendarMode;
}

const CalendarContainer = styled.div`
  background: ${({ theme }) => theme.bg};
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  padding: 18px 18px 8px 18px;
  min-width: 320px;
  z-index: 1000;
  font-family: inherit;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const MonthYear = styled.div`
  font-weight: 600;
  font-size: 1.1em;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;
  &:hover, &:focus-visible {
    background: ${({ theme }) => theme.accentBg};
    outline: none;
  }
`;

const DaysRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.subtext};
  font-weight: 500;
`;

const DayCell = styled.div<{
  isHeader?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
  isOutOfMonth?: boolean;
}>`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ isHeader }) => (isHeader ? 600 : 400)};
  color: ${({ isToday, isSelected, isOutOfMonth, theme }) =>
    isSelected ? theme.accent :
    isToday ? theme.accent :
    isOutOfMonth ? '#b0b0b0' :
    theme.text};
  background: ${({ isSelected, theme }) => isSelected ? theme.accentBg : 'transparent'};
  border-radius: 8px;
  cursor: ${({ isOutOfMonth }) => isOutOfMonth ? 'default' : 'pointer'};
  transition: background 0.15s, color 0.15s;
  outline: none;
  &:hover {
    background: ${({ isOutOfMonth, theme }) => isOutOfMonth ? 'transparent' : theme.accentBg};
    color: ${({ isOutOfMonth, theme }) => isOutOfMonth ? '#b0b0b0' : theme.accent};
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

// Helper: get days in month
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

// Helper: is same day
function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const CalendarPicker: React.FC<CalendarPickerProps> = ({
  selected,
  onSelect,
  mode,
}) => {
  const today = new Date();
  const [viewDate, setViewDate] = React.useState(() => selected instanceof Date ? selected : selected[0] || today);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();

  // For range selection, highlight both dates
  const isSelected = (date: Date) => {
    if (selected instanceof Date) return isSameDay(date, selected);
    if (Array.isArray(selected) && selected[0] && selected[1]) {
      return date >= selected[0] && date <= selected[1];
    }
    if (Array.isArray(selected) && selected[0]) {
      return isSameDay(date, selected[0]);
    }
    return false;
  };

  // Render calendar grid (6 weeks)
  const days: React.ReactNode[] = [];
  let dayNum = 1;
  for (let week = 0; week < 6; week++) {
    for (let d = 0; d < 7; d++) {
      const cellIndex = week * 7 + d;
      let date: Date;
      let isOutOfMonth = false;
      if (cellIndex < firstDay) {
        // Previous month
        date = new Date(year, month, -(firstDay - d - 1));
        isOutOfMonth = true;
      } else if (dayNum > daysInMonth) {
        // Next month
        date = new Date(year, month + 1, dayNum - daysInMonth);
        isOutOfMonth = true;
        dayNum++;
      } else {
        date = new Date(year, month, dayNum);
        dayNum++;
      }
      const isToday = isSameDay(date, today);
      const selectedFlag = isSelected(date);
      days.push(
        <DayCell
          key={date.toISOString()}
          isToday={isToday}
          isSelected={selectedFlag}
          isOutOfMonth={isOutOfMonth}
          tabIndex={isOutOfMonth ? -1 : 0}
          role="button"
          aria-label={date.toDateString()}
          onClick={() => !isOutOfMonth && onSelect(date)}
        >
          {date.getDate()}
        </DayCell>
      );
    }
  }

  // Month/year label
  const monthLabel = viewDate.toLocaleString('default', { month: 'long' });

  return (
    <CalendarContainer>
      <Header>
        <NavButton aria-label="Previous month" onClick={() => setViewDate(new Date(year, month - 1, 1))}>
          <ChevronLeft size={20} />
        </NavButton>
        <MonthYear>{monthLabel} {year}</MonthYear>
        <NavButton aria-label="Next month" onClick={() => setViewDate(new Date(year, month + 1, 1))}>
          <ChevronRight size={20} />
        </NavButton>
      </Header>
      <DaysRow>
        {DAYS.map(day => (
          <DayCell key={day} isHeader>{day}</DayCell>
        ))}
      </DaysRow>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0 }}>
        {days}
      </div>
      <ActionsRow>
        <ActionLink onClick={() => onSelect(mode === 'date' ? today : [today, today])}>Clear</ActionLink>
        <ActionLink onClick={() => onSelect(today)}>Today</ActionLink>
      </ActionsRow>
    </CalendarContainer>
  );
};

export default CalendarPicker; 