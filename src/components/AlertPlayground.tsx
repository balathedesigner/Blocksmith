import { useState } from 'react';
import ComponentPlaygroundLayout from './ComponentPlaygroundLayout';
import Alert, { AlertVariant, AlertSize } from './Alert';
import { CodePreview, CodePreviewData } from './CodePreview';
import { generateCode } from '../utils/codeGenerators';
import { Button } from './Button';

const VARIANTS: AlertVariant[] = ['info', 'success', 'warning', 'error'];
const SIZES: AlertSize[] = ['small', 'medium', 'large'];

const STYLE_TYPES = ['tinted', 'solid'] as const;

export default function AlertPlayground() {
  const [variant, setVariant] = useState<AlertVariant>('info');
  const [size, setSize] = useState<AlertSize>('medium');
  const [title, setTitle] = useState('Alert Title');
  const [description, setDescription] = useState('This is an alert description.');
  const [showIcon, setShowIcon] = useState(true);
  const [closable, setClosable] = useState(false);
  const [styleType, setStyleType] = useState<'tinted' | 'solid'>('tinted');

  // For code preview
  const baseStyles = {
    'alert': {
      display: 'flex',
      alignItems: 'flex-start',
      borderRadius: '10px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
    },
    'alert-info': {
      background: '#2563eb15',
      color: '#2563eb',
      border: '1.5px solid #2563eb33',
    },
    'alert-success': {
      background: '#22c55e15',
      color: '#22c55e',
      border: '1.5px solid #22c55e33',
    },
    'alert-warning': {
      background: '#eab30815',
      color: '#eab308',
      border: '1.5px solid #eab30833',
    },
    'alert-error': {
      background: '#ef444415',
      color: '#ef4444',
      border: '1.5px solid #ef444433',
    },
    'alert-small': {
      padding: '10px 16px',
      fontSize: '15px',
    },
    'alert-medium': {
      padding: '16px 22px',
      fontSize: '16px',
    },
    'alert-large': {
      padding: '22px 28px',
      fontSize: '18px',
    },
  };

  const codeProps = {
    component: 'Alert',
    props: {
      variant,
      size,
      ...(title && { title }),
      ...(description && { description }),
      ...(showIcon ? {} : { icon: null }),
      ...(closable && { closable: true }),
      ...(styleType !== 'tinted' && { styleType }),
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

  const handleReset = () => {
    setVariant('info');
    setSize('medium');
    setTitle('Alert Title');
    setDescription('This is an alert description.');
    setShowIcon(true);
    setClosable(false);
    setStyleType('tinted');
  };

  return (
    <ComponentPlaygroundLayout
      componentName="Alert"
      description="A flexible alert component for feedback, warnings, and notifications. Supports variants, sizes, icons, and more."
      controls={[
        {
          type: 'select',
          label: 'Variant',
          options: VARIANTS,
          value: variant,
          onChange: v => setVariant(v as AlertVariant),
        },
        {
          type: 'select',
          label: 'Style',
          options: STYLE_TYPES as unknown as string[],
          value: styleType,
          onChange: v => setStyleType(v as 'tinted' | 'solid'),
        },
        {
          type: 'select',
          label: 'Size',
          options: SIZES,
          value: size,
          onChange: v => setSize(v as AlertSize),
        },
        {
          type: 'input',
          label: 'Title',
          value: title,
          onChange: setTitle,
        },
        {
          type: 'input',
          label: 'Description',
          value: description,
          onChange: setDescription,
        },
        {
          type: 'checkbox',
          label: 'Show Icon',
          checked: showIcon,
          onChange: setShowIcon,
        },
        {
          type: 'checkbox',
          label: 'Closable',
          checked: closable,
          onChange: setClosable,
        },
      ]}
      renderPreview={() => (
        <Alert
          variant={variant}
          size={size}
          title={title}
          description={description}
          icon={showIcon ? undefined : null}
          closable={closable}
          styleType={styleType}
        />
      )}
      renderCode={() => <CodePreview formats={formats} />}
      renderControlsFooter={() => (
        <Button variant="solid" size="medium" onClick={handleReset} style={{ marginTop: 16 }}>
          Reset
        </Button>
      )}
    />
  );
} 