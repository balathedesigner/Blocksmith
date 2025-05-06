import { useState } from 'react';
import ComponentPlaygroundLayout from './ComponentPlaygroundLayout';
import { Button } from './Button';
import { User } from 'lucide-react';
import { CodePreview, CodePreviewData } from './CodePreview';
import { generateCode } from '../utils/codeGenerators';

const VARIANTS = ['solid', 'outline', 'ghost', 'link'] as const;
const STATES = ['default', 'success', 'error', 'warning'] as const;
const SIZES = ['small', 'medium', 'large'] as const;
const ICON_POSITIONS = ['none', 'left', 'right', 'both'] as const;

export default function ButtonPlayground() {
  const [label, setLabel] = useState('Button');
  const [variant, setVariant] = useState<typeof VARIANTS[number]>('solid');
  const [state, setState] = useState<typeof STATES[number]>('default');
  const [size, setSize] = useState<typeof SIZES[number]>('medium');
  const [iconPosition, setIconPosition] = useState<typeof ICON_POSITIONS[number]>('none');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const [elevation, setElevation] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const handleReset = () => {
    setLabel('Button');
    setVariant('solid');
    setState('default');
    setSize('medium');
    setIconPosition('none');
    setLoading(false);
    setDisabled(false);
    setFullWidth(false);
    setElevation(false);
    setLoadingText('');
  };

  const icon = <User size={18} />;
  const leftIcon = iconPosition === 'left' || iconPosition === 'both' ? icon : undefined;
  const rightIcon = iconPosition === 'right' || iconPosition === 'both' ? icon : undefined;

  // Define base styles for the button
  const baseStyles = {
    'button': {
      display: 'inline-flex',
      alignItems: 'center',
      fontWeight: '600',
      borderRadius: '8px',
      transition: 'all 0.2s',
    },
    'button-solid': {
      background: '#6366f1',
      color: '#ffffff',
    },
    'button-outline': {
      background: 'transparent',
      color: '#6366f1',
      border: '2px solid #6366f1',
    },
    'button-ghost': {
      background: 'transparent',
      color: '#6366f1',
    },
    'button-link': {
      background: 'none',
      color: '#6366f1',
      textDecoration: 'underline',
    },
    'button-small': {
      padding: '0.25em 0.75em',
      fontSize: '0.95em',
    },
    'button-medium': {
      padding: '0.5em 1em',
      fontSize: '1.05em',
    },
    'button-large': {
      padding: '0.75em 1.5em',
      fontSize: '1.15em',
    },
    'button-disabled': {
      opacity: '0.5',
      pointerEvents: 'none',
    },
  };

  // Generate code for different formats
  const codeProps = {
    component: 'Button',
    props: {
      variant,
      ...(state !== 'default' && { state }),
      size,
      ...(iconPosition === 'left' || iconPosition === 'both' ? { leftIcon: '<User size={18} />' } : {}),
      ...(iconPosition === 'right' || iconPosition === 'both' ? { rightIcon: '<User size={18} />' } : {}),
      ...(loading && { loading: true }),
      ...(disabled && { disabled: true }),
      ...(fullWidth && { fullWidth: true }),
      ...(elevation && { elevation: true }),
      ...(loadingText && { loadingText }),
    },
    children: label,
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
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>type</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>'button' | 'submit' | 'reset'</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Button type</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>variant</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>'solid' | 'outline' | 'ghost' | 'link'</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Visual style</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>state</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>'default' | 'success' | 'error' | 'warning'</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Semantic state</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>size</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>'small' | 'medium' | 'large'</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Button size</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>leftIcon</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>ReactNode</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Icon on the left</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>rightIcon</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>ReactNode</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Icon on the right</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>loading</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>boolean</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Show loading spinner</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>disabled</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>boolean</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Disable the button</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>children</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>ReactNode</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Button label/content</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>onClick</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>{'(event) => void'}</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Click handler</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>fullWidth</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>boolean</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Expand button to full width</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>elevation</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>boolean</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Add elevation (shadow)</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>loadingText</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>string</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Loading text</td></tr>
      </tbody>
    </table>
  );

  return (
    <ComponentPlaygroundLayout
      componentName="Button"
      description="A flexible button component supporting variants, states, icons, loading, and more."
      controls={[
        {
          type: 'input',
          label: 'Label',
          value: label,
          onChange: setLabel,
        },
        {
          type: 'select',
          label: 'Variant',
          options: VARIANTS as unknown as string[],
          value: variant,
          onChange: v => setVariant(v as typeof VARIANTS[number]),
        },
        {
          type: 'select',
          label: 'State',
          options: STATES as unknown as string[],
          value: state,
          onChange: v => setState(v as typeof STATES[number]),
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
          label: 'Icon Position',
          options: ICON_POSITIONS as unknown as string[],
          value: iconPosition,
          onChange: v => setIconPosition(v as typeof ICON_POSITIONS[number]),
        },
        {
          type: 'checkbox',
          label: 'Loading',
          checked: loading,
          onChange: setLoading,
        },
        ...(
          loading
            ? [{
                type: 'input' as const,
                label: 'Loading Text',
                value: loadingText,
                onChange: setLoadingText,
              }]
            : []
        ),
        {
          type: 'checkbox',
          label: 'Disabled',
          checked: disabled,
          onChange: setDisabled,
        },
        {
          type: 'checkbox',
          label: 'Full Width',
          checked: fullWidth,
          onChange: setFullWidth,
        },
        {
          type: 'checkbox',
          label: 'Elevation (Shadow)',
          checked: elevation,
          onChange: setElevation,
        },
      ]}
      renderPreview={() => (
        <Button
          variant={variant}
          state={state}
          size={size}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          loading={loading}
          disabled={disabled}
          fullWidth={fullWidth}
          elevation={elevation}
          loadingText={loadingText}
        >
          {label}
        </Button>
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