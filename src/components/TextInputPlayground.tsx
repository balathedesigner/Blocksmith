import React, { useState } from 'react';
import ComponentPlaygroundLayout from './ComponentPlaygroundLayout';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Search, User, Mail, Lock, Eye, Loader2, Hash } from 'lucide-react';
import { CodePreview, CodePreviewData } from './CodePreview';
import { generateCode } from '../utils/codeGenerators';

const ICONS = [
  { name: 'None', component: null },
  { name: 'Search', component: Search },
  { name: 'User', component: User },
  { name: 'Mail', component: Mail },
  { name: 'Lock', component: Lock },
  { name: 'Number', component: Hash },
];

const StyledInputWrapper = styled.div<{ size: string; disabled?: boolean }>`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.bg};
  border: 1.5px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: ${({ size }) => (size === 'small' ? '0.25em 0.75em' : size === 'large' ? '0.75em 1.5em' : '0.5em 1em')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  transition: border 0.2s, background 0.2s;
`;

const StyledInput = styled.input<{ size: string }>`
  border: none;
  outline: none;
  background: transparent;
  font-size: ${({ size }) => (size === 'small' ? '1em' : size === 'large' ? '1.25em' : '1.1em')};
  color: ${({ theme }) => theme.text};
  flex: 1;
  padding: 0;
`;

function TextInput({ label, placeholder, value, onChange, disabled, size, leftIcon, showLabel, loading, type, onEyeClick, showPassword, onNumberChange, required, helperText, state }: {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  size: string;
  leftIcon: string;
  showLabel: boolean;
  loading?: boolean;
  type?: string;
  onEyeClick?: () => void;
  showPassword?: boolean;
  onNumberChange?: (v: number) => void;
  required?: boolean;
  helperText?: string;
  state?: 'default' | 'error' | 'success' | 'warning';
}) {
  const IconComponent = ICONS.find(i => i.name === leftIcon)?.component;
  const isPassword = type === 'password';
  const isNumber = leftIcon === 'Number';
  let borderColor = undefined;
  if (state === 'error') borderColor = '#ef4444';
  else if (state === 'success') borderColor = '#22c55e';
  else if (state === 'warning') borderColor = '#eab308';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div style={{ width: 320 }}>
        {showLabel && (
          <div style={{ minWidth: 90, textAlign: 'left', marginBottom: 6, fontWeight: 500 }}>
            {label}{required && <span style={{ color: '#ef4444', marginLeft: 2 }}>*</span>}
          </div>
        )}
        <StyledInputWrapper size={size} disabled={disabled} style={{ width: '100%', position: 'relative', borderColor: borderColor }}>
          {IconComponent && <IconComponent size={18} style={{ marginRight: 8, color: '#a1a1aa' }} />}
          <StyledInput
            size={size}
            placeholder={placeholder}
            value={value}
            onChange={e => {
              if (isNumber && onNumberChange) {
                const num = Number(e.target.value);
                if (!isNaN(num)) onNumberChange(num);
              } else {
                onChange(e.target.value);
              }
            }}
            disabled={disabled || loading}
            type={isPassword && !showPassword ? 'password' : isNumber ? 'number' : 'text'}
            style={{ paddingRight: isPassword || loading ? 32 : 0 }}
            required={required}
            aria-invalid={state === 'error'}
            aria-describedby={helperText ? 'helper-text' : undefined}
          />
          {loading && <Loader2 className="spin" size={18} style={{ position: 'absolute', right: 8, color: '#6366f1', top: '50%', transform: 'translateY(-50%)' }} />}
          {isPassword && (
            <Eye
              size={18}
              style={{ position: 'absolute', right: 8, color: '#a1a1aa', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
              onClick={onEyeClick}
            />
          )}
        </StyledInputWrapper>
        {helperText && (
          <div id="helper-text" style={{ marginTop: 6, fontSize: 13, color: state === 'error' ? '#ef4444' : state === 'success' ? '#22c55e' : state === 'warning' ? '#eab308' : '#6b7280', textAlign: 'left' }}>{helperText}</div>
        )}
      </div>
    </div>
  );
}

const SIZES = ['small', 'medium', 'large'] as const;

const ResetButton = styled.button`
  margin-top: 16px;
  padding: 6px 16px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f3f4f6;
  color: #333;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
  &:hover, &:focus-visible {
    background: #e5e7eb;
    border-color: #6366f1;
    color: #222;
    outline: none;
  }
`;

export default function TextInputPlayground() {
  const [label, setLabel] = useState('Label');
  const [placeholder, setPlaceholder] = useState('Enter text...');
  const [value, setValue] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [size, setSize] = useState<typeof SIZES[number]>('medium');
  const [leftIcon, setLeftIcon] = useState('None');
  const [showLabel, setShowLabel] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // For number input
  const [numberValue, setNumberValue] = useState(0);

  // Update placeholder based on left icon
  React.useEffect(() => {
    switch (leftIcon) {
      case 'Mail':
        setPlaceholder('Enter mail address');
        break;
      case 'User':
        setPlaceholder('Enter user name');
        break;
      case 'Search':
        setPlaceholder('Search...');
        break;
      case 'Lock':
        setPlaceholder('Enter password');
        break;
      case 'Number':
        setPlaceholder('Enter number');
        setValue(numberValue.toString());
        break;
      default:
        setPlaceholder('Enter text...');
        break;
    }
  }, [leftIcon]);

  // For password type
  const isPassword = leftIcon === 'Lock';
  const isNumber = leftIcon === 'Number';

  const handleReset = () => {
    setLabel('Label');
    setPlaceholder('Enter text...');
    setValue('');
    setDisabled(false);
    setSize('medium');
    setLeftIcon('None');
    setShowLabel(true);
    setLoading(false);
    setShowPassword(false);
    setNumberValue(0);
    setRequired(false);
    setHelperText('');
    setState('default');
  };

  // Define base styles for the text input
  const baseStyles = {
    'textinput': {
      display: 'inline-flex',
      alignItems: 'center',
      fontWeight: '500',
      borderRadius: '8px',
      transition: 'all 0.2s',
    },
    'textinput-small': {
      padding: '0.25em 0.75em',
      fontSize: '0.95em',
    },
    'textinput-medium': {
      padding: '0.5em 1em',
      fontSize: '1.05em',
    },
    'textinput-large': {
      padding: '0.75em 1.5em',
      fontSize: '1.15em',
    },
    'textinput-disabled': {
      opacity: '0.5',
      pointerEvents: 'none',
    },
  };

  // Generate code for different formats
  const codeProps = {
    component: 'TextInput',
    props: {
      ...(showLabel && { label }),
      placeholder,
      value,
      size,
      ...(leftIcon !== 'None' && { leftIcon }),
      ...(disabled && { disabled: true }),
      ...(loading && { loading: true }),
      ...(isPassword && { type: 'password' }),
      ...(isNumber && { type: 'number' }),
    },
    children: '',
    styles: baseStyles,
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
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>label</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>string</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Label for the input</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>placeholder</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>string</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Placeholder text</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>value</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>string | number</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Input value</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>onChange</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>{'(value: string) => void'}</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Change handler</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>disabled</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>boolean</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Disables the input</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>size</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>'small' | 'medium' | 'large'</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Input size</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>leftIcon</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>'None' | 'Search' | 'User' | 'Mail' | 'Lock' | 'Number'</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Icon on the left</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>loading</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>boolean</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Show loading spinner</td></tr>
      </tbody>
    </table>
  );

  const [required, setRequired] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [state, setState] = useState<'default' | 'error' | 'success' | 'warning'>('default');

  // Helper for disabling label input
  const labelInputDisabled = !showLabel;
  // Helper for mandatory helper text
  const showMandatoryHelper = !showLabel && required && !helperText;

  return (
    <ComponentPlaygroundLayout
      componentName="Text Input"
      description="A single-line text input field with support for label, icon, size, required, state, and helper text."
      controls={[
        // Group 1: Label and Required
        {
          type: 'checkbox',
          label: 'Show Label',
          checked: showLabel,
          onChange: setShowLabel,
        },
        ...(showLabel ? [{
          type: 'input' as const,
          label: 'Label',
          value: label,
          onChange: setLabel,
          inputType: 'text',
        }] : []),
        {
          type: 'checkbox',
          label: 'Required',
          checked: required,
          onChange: setRequired,
        },
        // Group 2: Input Configuration
        {
          type: 'input',
          label: 'Placeholder',
          value: placeholder,
          onChange: setPlaceholder,
        },
        {
          type: 'input',
          label: 'Value',
          value: value,
          onChange: setValue,
        },
        // Group 3: Visual Configuration
        {
          type: 'select',
          label: 'Left Icon',
          options: ICONS.map(i => i.name),
          value: leftIcon,
          onChange: setLeftIcon,
        },
        {
          type: 'select',
          label: 'Size',
          options: SIZES as unknown as string[],
          value: size,
          onChange: v => setSize(v as typeof SIZES[number]),
        },
        {
          type: 'select',
          label: 'State',
          options: ['default', 'error', 'success', 'warning'],
          value: state,
          onChange: v => setState(v as typeof state),
        },
        // Group 4: State Configuration
        {
          type: 'checkbox',
          label: 'Disabled',
          checked: disabled,
          onChange: setDisabled,
        },
        {
          type: 'checkbox',
          label: 'Loading',
          checked: loading,
          onChange: setLoading,
        },
        // Group 5: Helper Text (only show if not showing mandatory helper)
        ...(!showMandatoryHelper ? [{
          type: 'input' as const,
          label: 'Helper Text',
          value: helperText,
          onChange: setHelperText,
        }] : []),
      ]}
      renderPreview={() => (
        <TextInput
          label={label}
          placeholder={placeholder}
          value={isNumber ? numberValue.toString() : value}
          onChange={v => {
            if (isNumber) {
              setNumberValue(Number(v));
              setValue(v);
            } else {
              setValue(v);
            }
          }}
          disabled={disabled}
          size={size}
          leftIcon={leftIcon}
          showLabel={showLabel}
          loading={loading}
          type={isPassword ? 'password' : isNumber ? 'number' : 'text'}
          onEyeClick={() => setShowPassword(s => !s)}
          showPassword={showPassword}
          onNumberChange={n => {
            setNumberValue(n);
            setValue(n.toString());
          }}
          required={required}
          helperText={showMandatoryHelper ? 'This field is mandatory' : helperText}
          state={state}
        />
      )}
      renderCode={() => <CodePreview formats={formats} />}
      renderApi={() => apiReference}
      renderControlsFooter={() => <ResetButton onClick={handleReset}>Reset</ResetButton>}
    />
  );
} 