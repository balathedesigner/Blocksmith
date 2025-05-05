import React, { useState } from 'react';
import ComponentPlaygroundLayout from './ComponentPlaygroundLayout';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Info, Check, AlertTriangle, XCircle, Star, X } from 'lucide-react';
import { CodePreview, CodePreviewData } from './CodePreview';
import { generateCode } from '../utils/codeGenerators';

const ICONS = [
  { name: 'Info', component: Info },
  { name: 'Check', component: Check },
  { name: 'Warning', component: AlertTriangle },
  { name: 'Error', component: XCircle },
  { name: 'Star', component: Star },
];

const StyledBadge = styled.span<{ color: string; variant: string; size: string; disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: ${({ size }) => 
    size === 'small' ? '0.15em 0.5em' : 
    size === 'large' ? '0.35em 1em' : 
    '0.25em 0.75em'
  };
  font-size: ${({ size }) => 
    size === 'small' ? '0.85em' : 
    size === 'large' ? '1.1em' : 
    '0.95em'
  };
  font-weight: 600;
  border-radius: 999px;
  background: ${({ color, variant }) =>
    variant === 'outline' ? 'transparent' :
    variant === 'tinted' ? `${color}15` : color};
  color: ${({ color, variant }) =>
    variant === 'solid' ? '#fff' : color};
  border: ${({ color, variant }) =>
    variant === 'outline' ? `2px solid ${color}` : 'none'};
  transition: background 0.2s, color 0.2s, border 0.2s;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

const STATE_ICON_MAP: Record<string, any> = {
  Primary: Info,
  Success: Check,
  Error: XCircle,
  Warning: AlertTriangle,
  Neutral: Star,
};

// Add a mapping from state value to color code
const STATE_COLOR_MAP: Record<string, string> = {
  primary: '#6366f1', // indigo
  success: '#22c55e', // green
  error: '#ef4444',   // red
  warning: '#f59e42', // orange
  neutral: '#64748b', // gray
};

function Badge({ children, color, variant, size = 'medium', iconPosition, state, disabled }: {
  children: React.ReactNode;
  color: string;
  variant: string;
  size?: 'small' | 'medium' | 'large';
  iconPosition: string;
  state: string;
  disabled?: boolean;
}) {
  const LeftIconComponent = STATE_ICON_MAP[state];
  return (
    <StyledBadge color={color} variant={variant} size={size} disabled={disabled}>
      {(iconPosition === 'left' || iconPosition === 'both') && LeftIconComponent && (
        <LeftIconComponent 
          size={size === 'small' ? 12 : size === 'large' ? 16 : 14} 
          style={{ marginRight: size === 'small' ? 4 : size === 'large' ? 8 : 6, verticalAlign: 'middle' }} 
        />
      )}
      {children}
      {(iconPosition === 'right' || iconPosition === 'both') && (
        <X 
          size={size === 'small' ? 12 : size === 'large' ? 16 : 14} 
          style={{ marginLeft: size === 'small' ? 4 : size === 'large' ? 8 : 6, verticalAlign: 'middle' }} 
        />
      )}
    </StyledBadge>
  );
}

interface BadgeState {
  name: string;
  value: string;
  icon?: boolean;
}

const STATES: BadgeState[] = [
  { name: 'Primary', value: 'primary', icon: true },
  { name: 'Success', value: 'success', icon: true },
  { name: 'Error', value: 'error', icon: true },
  { name: 'Warning', value: 'warning', icon: true },
  { name: 'Neutral', value: 'neutral' },
];
const VARIANTS = ['solid', 'outline', 'tinted'] as const;
const SIZES = ['small', 'medium', 'large'] as const;
const ICON_POSITIONS = ['none', 'left', 'right', 'both'] as const;

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

export default function BadgePlayground() {
  const [label, setLabel] = useState('Badge');
  const [state, setState] = useState(STATES[0].name);
  const [variant, setVariant] = useState<typeof VARIANTS[number]>('solid');
  const [size, setSize] = useState<typeof SIZES[number]>('medium');
  const [iconPosition, setIconPosition] = useState<typeof ICON_POSITIONS[number]>('none');
  const [disabled, setDisabled] = useState(false);

  // Reset iconPosition to 'none' if the selected state does not support icons
  React.useEffect(() => {
    const hasIcon = STATES.find(s => s.name === state)?.icon;
    if (!hasIcon && iconPosition !== 'none') {
      setIconPosition('none');
    }
  }, [state]);

  const handleReset = () => {
    setLabel('Badge');
    setState(STATES[0].name);
    setVariant('solid');
    setSize('medium');
    setIconPosition('none');
    setDisabled(false);
  };

  const color = STATE_COLOR_MAP[STATES.find(s => s.name === state)?.value || STATES[0].value];

  // Define base styles for the badge
  const baseStyles = {
    'badge': {
      display: 'inline-flex',
      alignItems: 'center',
      fontWeight: '600',
      borderRadius: '999px',
      transition: 'all 0.2s',
    },
    'badge-solid': {
      background: color,
      color: '#ffffff',
    },
    'badge-outline': {
      background: 'transparent',
      color: color,
      border: `2px solid ${color}`,
    },
    'badge-tinted': {
      background: `${color}15`,
      color: color,
    },
    'badge-small': {
      padding: '0.15em 0.5em',
      fontSize: '0.85em',
    },
    'badge-medium': {
      padding: '0.25em 0.75em',
      fontSize: '0.95em',
    },
    'badge-large': {
      padding: '0.35em 1em',
      fontSize: '1.1em',
    },
    'badge-disabled': {
      opacity: '0.5',
      pointerEvents: 'none',
    },
  };

  // Generate code for different formats
  const codeProps = {
    component: 'Badge',
    props: {
      color,
      variant,
      ...(size !== 'medium' && { size }),
      ...(iconPosition !== 'none' && { iconPosition }),
      ...(disabled && { disabled }),
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
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>color</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>string</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Background or border color (set by state)</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>variant</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>'solid' | 'outline' | 'tinted'</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Visual style of the badge (solid fill, outline, or tinted background)</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>size</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>'small' | 'medium' | 'large'</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Size of the badge</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>iconPosition</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>'none' | 'left' | 'right' | 'both'</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Where to show icons</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>disabled</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>boolean</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Visually disables the badge</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>children</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>ReactNode</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Badge content</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>state</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>'Primary' | 'Success' | 'Error' | 'Warning' | 'Neutral'</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Semantic badge state</td></tr>
      </tbody>
    </table>
  );

  return (
    <ComponentPlaygroundLayout
      componentName="Badge"
      description="A flexible badge component for status, counts, or labels. Supports multiple variants and sizes."
      controls={[
        {
          type: 'select',
          label: 'Variant',
          options: VARIANTS as unknown as string[],
          value: variant,
          onChange: v => setVariant(v as typeof VARIANTS[number]),
        },
        {
          type: 'select',
          label: 'Size',
          options: SIZES as unknown as string[],
          value: size,
          onChange: v => setSize(v as typeof SIZES[number]),
        },
        {
          type: 'input',
          label: 'Label',
          value: label,
          onChange: setLabel,
        },
        {
          type: 'select',
          label: 'State',
          options: STATES.map(s => s.name),
          value: state,
          onChange: setState,
        },
        ...(STATES.find(s => s.name === state)?.icon ? [{
          type: 'select' as const,
          label: 'Icon Position',
          options: ICON_POSITIONS as unknown as string[],
          value: iconPosition,
          onChange: (v: string) => setIconPosition(v as typeof ICON_POSITIONS[number]),
        }] : []),
        {
          type: 'checkbox',
          label: 'Disabled',
          checked: disabled,
          onChange: setDisabled,
        },
      ]}
      renderPreview={() => (
        <Badge
          color={color}
          variant={variant}
          size={size}
          iconPosition={iconPosition}
          state={state}
          disabled={disabled}
        >
          {label}
        </Badge>
      )}
      renderCode={() => <CodePreview formats={formats} />}
      renderApi={() => apiReference}
      renderControlsFooter={() => <ResetButton onClick={handleReset}>Reset</ResetButton>}
    />
  );
} 