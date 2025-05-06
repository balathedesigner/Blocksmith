import { useState } from 'react';
import ComponentPlaygroundLayout from './ComponentPlaygroundLayout';
import styled from 'styled-components';
import { User } from 'lucide-react';
import { CustomSelect } from './CustomSelect';
import { CodePreview, CodePreviewData } from './CodePreview';
import { generateCode } from '../utils/codeGenerators';
import { Button } from './Button';

const OPTIONS = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

const StyledSelectWrapper = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
`;

function Select({ 
  label, 
  value, 
  onChange, 
  disabled, 
  showLabel, 
  required, 
  helperText, 
  state, 
  showIcon 
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  showLabel: boolean;
  required?: boolean;
  helperText?: string;
  state?: 'default' | 'error' | 'success' | 'warning';
  showIcon: boolean;
}) {
  const IconComponent = showIcon ? User : null;
  return (
    <StyledSelectWrapper>
      {showLabel && (
        <div style={{ minWidth: 90, textAlign: 'left', marginBottom: 6, fontWeight: 500 }}>
          {label}{required && <span style={{ color: '#ef4444', marginLeft: 2 }}>*</span>}
        </div>
      )}
      <div style={{ position: 'relative', width: '100%' }}>
        <CustomSelect
          options={OPTIONS.map(opt => opt.label)}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder="Select an option"
          aria-label={label}
          icon={IconComponent ? <IconComponent size={18} /> : undefined}
          state={state}
        />
      </div>
      {helperText && (
        <div id="helper-text" style={{ 
          marginTop: 6, 
          fontSize: 13, 
          color: state === 'error' ? '#ef4444' : 
                 state === 'success' ? '#22c55e' : 
                 state === 'warning' ? '#eab308' : '#6b7280', 
          textAlign: 'left' 
        }}>
          {helperText}
        </div>
      )}
    </StyledSelectWrapper>
  );
}

export default function SelectPlayground() {
  const [label, setLabel] = useState('Label');
  const [value, setValue] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [showLabel, setShowLabel] = useState(true);
  const [required, setRequired] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [state, setState] = useState<'default' | 'error' | 'success' | 'warning'>('default');
  const [showIcon, setShowIcon] = useState(false);

  // Helper for mandatory helper text
  const showMandatoryHelper = !showLabel && required && !helperText;

  const handleReset = () => {
    setLabel('Label');
    setValue(OPTIONS[0].value);
    setDisabled(false);
    setShowLabel(true);
    setRequired(false);
    setHelperText('');
    setState('default');
    setShowIcon(false);
  };

  // Define base styles for the select
  const baseStyles = {
    'select': {
      display: 'inline-flex',
      alignItems: 'center',
      fontWeight: '500',
      borderRadius: '8px',
      transition: 'all 0.2s',
    },
    'select-small': {
      padding: '0.25em 0.75em',
      fontSize: '0.95em',
    },
    'select-medium': {
      padding: '0.5em 1em',
      fontSize: '1.05em',
    },
    'select-large': {
      padding: '0.75em 1.5em',
      fontSize: '1.15em',
    },
    'select-disabled': {
      opacity: '0.5',
      pointerEvents: 'none',
    },
  };

  // Generate code for different formats
  const codeProps = {
    component: 'Select',
    props: {
      ...(showLabel && { label }),
      value,
      ...(disabled && { disabled: true }),
      ...(required && { required: true }),
      ...(state !== 'default' && { state }),
      ...(showIcon && { showIcon: true }),
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
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>label</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>string</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Label for the select</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>value</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>string</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Selected value</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>onChange</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>{'(value: string) => void'}</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Change handler</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>disabled</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>boolean</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Disables the select</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>showLabel</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>boolean</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Show label</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>required</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>boolean</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Field is required</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>helperText</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>string</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Helper text below the select</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>state</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>'default' | 'error' | 'success' | 'warning'</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Visual state</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>showIcon</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>boolean</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Show icon</td></tr>
      </tbody>
    </table>
  );

  return (
    <ComponentPlaygroundLayout
      componentName="Select"
      description="A dropdown select input for choosing a single option from a list."
      controls={[
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
        {
          type: 'input',
          label: 'Helper Text',
          value: helperText,
          onChange: setHelperText,
        },
        {
          type: 'select',
          label: 'State',
          options: ['default', 'error', 'success', 'warning'],
          value: state,
          onChange: v => setState(v as 'default' | 'error' | 'success' | 'warning'),
        },
        {
          type: 'checkbox',
          label: 'Disabled',
          checked: disabled,
          onChange: setDisabled,
        },
        {
          type: 'checkbox',
          label: 'Show Icon',
          checked: showIcon,
          onChange: setShowIcon,
        },
      ]}
      renderPreview={() => (
        <Select
          label={label}
          value={value}
          onChange={setValue}
          disabled={disabled}
          showLabel={showLabel}
          required={required}
          helperText={showMandatoryHelper ? 'This field is mandatory' : helperText}
          state={state}
          showIcon={showIcon}
        />
      )}
      renderCode={() => <CodePreview formats={formats} />}
      renderApi={() => apiReference}
      renderControlsFooter={() => (
        <Button variant="solid" size="medium" onClick={handleReset} style={{ marginTop: 16 }}>
          Reset
        </Button>
      )}
    />
  );
} 