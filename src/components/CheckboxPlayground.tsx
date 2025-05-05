import { useState } from 'react';
import ComponentPlaygroundLayout from './ComponentPlaygroundLayout';
import styled from 'styled-components';
import { CodePreview, CodePreviewData } from './CodePreview';
import { generateCode } from '../utils/codeGenerators';

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 20px;
  height: 20px;
  accent-color: ${({ theme }) => theme.accent};
  margin-right: 10px;
`;

function Checkbox({ label, checked, onChange, disabled, description }: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  description?: string;
}) {
  return (
    <div style={{ width: '100%', textAlign: 'left' }}>
      <label style={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        gap: 10, 
        cursor: disabled ? 'not-allowed' : 'pointer', 
        opacity: disabled ? 0.6 : 1,
        width: '100%'
      }}>
        <StyledCheckbox checked={checked} onChange={e => onChange(e.target.checked)} disabled={disabled} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 500, textAlign: 'left' }}>{label}</div>
          {description && <div style={{ fontSize: 14, color: '#888', marginTop: 2, textAlign: 'left' }}>{description}</div>}
        </div>
      </label>
    </div>
  );
}

export default function CheckboxPlayground() {
  const [label, setLabel] = useState('Checkbox label');
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [description, setDescription] = useState('Optional description for the checkbox.');

  // Define base styles for the checkbox
  const baseStyles = {
    'checkbox': {
      display: 'inline-flex',
      alignItems: 'flex-start',
      fontWeight: '500',
      borderRadius: '4px',
      transition: 'all 0.2s',
    },
    'checkbox-disabled': {
      opacity: '0.5',
      pointerEvents: 'none',
    },
  };

  // Generate code for different formats
  const codeProps = {
    component: 'Checkbox',
    props: {
      label,
      checked,
      ...(disabled && { disabled: true }),
      ...(description && { description }),
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
      <tbody>
        <tr><td style={{ padding: '8px', color: '#a5b4fc' }}>label</td><td style={{ padding: '8px' }}>string</td><td style={{ padding: '8px', color: '#f3f4f6' }}>Label for the checkbox</td></tr>
        <tr><td style={{ padding: '8px', color: '#a5b4fc' }}>checked</td><td style={{ padding: '8px' }}>boolean</td><td style={{ padding: '8px', color: '#f3f4f6' }}>Checked state</td></tr>
        <tr><td style={{ padding: '8px', color: '#a5b4fc' }}>onChange</td><td style={{ padding: '8px' }}>(checked: boolean) =&gt; void</td><td style={{ padding: '8px', color: '#f3f4f6' }}>Change handler</td></tr>
        <tr><td style={{ padding: '8px', color: '#a5b4fc' }}>disabled</td><td style={{ padding: '8px' }}>boolean</td><td style={{ padding: '8px', color: '#f3f4f6' }}>Disable the checkbox</td></tr>
        <tr><td style={{ padding: '8px', color: '#a5b4fc' }}>description</td><td style={{ padding: '8px' }}>string</td><td style={{ padding: '8px', color: '#f3f4f6' }}>Optional description</td></tr>
      </tbody>
    </table>
  );

  return (
    <ComponentPlaygroundLayout
      componentName="Checkbox"
      description="A standard checkbox input for toggling boolean values. Supports label, description, and disabled state."
      controls={[
        {
          type: 'input',
          label: 'Label',
          value: label,
          onChange: setLabel,
        },
        {
          type: 'checkbox',
          label: 'Checked',
          checked: checked,
          onChange: setChecked,
        },
        {
          type: 'checkbox',
          label: 'Disabled',
          checked: disabled,
          onChange: setDisabled,
        },
        ...(!disabled ? [{
          type: 'input' as const,
          label: 'Description',
          value: description,
          onChange: setDescription,
        }] : []),
      ]}
      renderPreview={() => (
        <Checkbox
          label={label}
          checked={checked}
          onChange={setChecked}
          disabled={disabled}
          description={description}
        />
      )}
      renderCode={() => <CodePreview formats={formats} />}
      renderApi={() => apiReference}
    />
  );
} 