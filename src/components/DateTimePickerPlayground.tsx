import { useState } from 'react';
import ComponentPlaygroundLayout from './ComponentPlaygroundLayout';
import DateTimePicker from './DateTimePicker';
import { CodePreview, CodePreviewData } from './CodePreview';
import { CalendarClock } from 'lucide-react';
import { generateCode } from '../utils/codeGenerators';

const MODES = ['date', 'date-range', 'time', 'time-range'] as const;
type PickerMode = typeof MODES[number];

const defaultValues: Record<PickerMode, Date | [Date, Date] | string | [string, string]> = {
  'date': new Date(),
  'date-range': [new Date(), new Date()],
  'time': '12:00',
  'time-range': ['12:00', '13:00'],
};

export default function DateTimePickerPlayground() {
  // Model: state for picker
  const [mode, setMode] = useState<PickerMode>('date');
  const [value, setValue] = useState<Date | [Date, Date] | string | [string, string]>(defaultValues['date']);
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [minTime, setMinTime] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [disabled, setDisabled] = useState(false);

  // Controller: handle changes
  const handleModeChange = (v: string) => {
    const newMode = v as PickerMode;
    setMode(newMode);
    setValue(defaultValues[newMode]);
  };

  const handleReset = () => {
    setMode('date');
    setValue(defaultValues['date']);
    setMinDate('');
    setMaxDate('');
    setMinTime('');
    setMaxTime('');
    setDisabled(false);
  };

  // Controls array for ComponentPlaygroundLayout
  const controls = [
    {
      type: 'select' as const,
      label: 'Mode',
      options: MODES as unknown as string[],
      value: mode,
      onChange: handleModeChange,
    },
    ...(mode === 'date' || mode === 'date-range'
      ? [
          {
            type: 'input' as const,
            label: 'Min Date',
            value: minDate,
            onChange: setMinDate,
            inputType: 'date',
          },
          {
            type: 'input' as const,
            label: 'Max Date',
            value: maxDate,
            onChange: setMaxDate,
            inputType: 'date',
          },
        ]
      : []),
    ...(mode === 'time' || mode === 'time-range'
      ? [
          {
            type: 'input' as const,
            label: 'Min Time',
            value: minTime,
            onChange: setMinTime,
            inputType: 'time',
          },
          {
            type: 'input' as const,
            label: 'Max Time',
            value: maxTime,
            onChange: setMaxTime,
            inputType: 'time',
          },
        ]
      : []),
    {
      type: 'checkbox' as const,
      label: 'Disabled',
      checked: disabled,
      onChange: setDisabled,
    },
  ];

  // Code preview (multi-format)
  const codeProps = {
    component: 'DateTimePicker',
    props: {
      mode,
      value,
      minDate: minDate ? new Date(minDate) : undefined,
      maxDate: maxDate ? new Date(maxDate) : undefined,
      minTime: minTime || undefined,
      maxTime: maxTime || undefined,
      disabled,
      icon: '<CalendarClock size={18} />',
    },
    children: '',
  };

  const formats: CodePreviewData[] = [
    {
      format: 'jsx',
      language: 'jsx',
      code: generateCode('jsx', codeProps),
    },
    {
      format: 'html',
      language: 'html',
      code: generateCode('html', codeProps),
    },
    {
      format: 'javascript',
      language: 'javascript',
      code: generateCode('javascript', codeProps),
    },
  ];

  // API reference (optional, placeholder for now)
  const apiReference = (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15, textAlign: 'left', color: '#f3f4f6' }}>
      <thead>
        <tr style={{ textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>
          <th style={{ padding: '8px', color: '#f3f4f6' }}>Prop</th>
          <th style={{ padding: '8px', color: '#f3f4f6' }}>Type</th>
          <th style={{ padding: '8px', color: '#f3f4f6' }}>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>mode</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>'date' | 'date-range' | 'time' | 'time-range'</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Picker mode</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>value</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>Date | [Date, Date] | string | [string, string]</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Current value</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>onChange</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>(value) =&gt; void</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Change handler</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>minDate</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>Date</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Minimum date</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>maxDate</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>Date</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Maximum date</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>minTime</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>string</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Minimum time ("HH:mm")</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>maxTime</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>string</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Maximum time ("HH:mm")</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>disabled</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>boolean</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Disable the picker</td></tr>
      </tbody>
    </table>
  );

  return (
    <ComponentPlaygroundLayout
      componentName="Date/Time Picker"
      description="A flexible picker for dates, times, and ranges. Supports single date, date range, time, and time range modes."
      controls={controls}
      renderPreview={() => (
        <DateTimePicker
          mode={mode}
          value={value}
          onChange={setValue}
          label="Date/Time Picker"
          minDate={minDate ? new Date(minDate) : undefined}
          maxDate={maxDate ? new Date(maxDate) : undefined}
          minTime={minTime || undefined}
          maxTime={maxTime || undefined}
          disabled={disabled}
          icon={<CalendarClock size={18} />}
        />
      )}
      renderCode={() => <CodePreview formats={formats} />}
      renderApi={() => apiReference}
      renderControlsFooter={() => (
        <button onClick={handleReset} style={{ marginTop: 16, padding: '6px 16px', fontSize: 14, borderRadius: 6, border: '1px solid #ccc', background: '#f3f4f6', color: '#333', cursor: 'pointer' }}>Reset</button>
      )}
    />
  );
} 