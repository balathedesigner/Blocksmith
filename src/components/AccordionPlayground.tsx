import React, { useState } from 'react';
import ComponentPlaygroundLayout from './ComponentPlaygroundLayout';
import { Accordion, AccordionItem } from './Accordion';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CodePreview, CodePreviewData } from './CodePreview';
import { generateCode } from '../utils/codeGenerators';

const ACCORDION_ITEMS: AccordionItem[] = [
  { id: '1', title: 'What is an Accordion?', content: 'An accordion is a vertically stacked set of interactive headings that each reveal or hide content associated with them.' },
  { id: '2', title: 'Why use Accordions?', content: 'Accordions help organize content in a compact space, allowing users to expand sections of interest while keeping other sections collapsed.' },
  { id: '3', title: 'Accessibility Features', content: 'This accordion component is fully accessible, supporting keyboard navigation and ARIA attributes for screen readers.' },
];

const VARIANTS = ['default', 'bordered'] as const;
const SIZES = ['small', 'medium', 'large'] as const;
const ICON_POSITIONS = ['left', 'right'] as const;

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

export default function AccordionPlayground() {
  const [variant, setVariant] = useState<typeof VARIANTS[number]>('default');
  const [size, setSize] = useState<typeof SIZES[number]>('medium');
  const [disabled, setDisabled] = useState(false);
  const [iconPosition, setIconPosition] = useState<typeof ICON_POSITIONS[number]>('left');
  const [multipleOpen, setMultipleOpen] = useState(false);

  const handleReset = () => {
    setVariant('default');
    setSize('medium');
    setDisabled(false);
    setIconPosition('left');
    setMultipleOpen(false);
  };

  // Define base styles for the accordion
  const baseStyles = {
    'accordion': {
      display: 'block',
      borderRadius: '8px',
      transition: 'all 0.2s',
    },
    'accordion-default': {
      background: '#fff',
      color: '#222',
    },
    'accordion-bordered': {
      background: '#fff',
      color: '#222',
      border: '2px solid #6366f1',
    },
    'accordion-small': {
      fontSize: '0.95em',
    },
    'accordion-medium': {
      fontSize: '1.05em',
    },
    'accordion-large': {
      fontSize: '1.15em',
    },
    'accordion-disabled': {
      opacity: '0.5',
      pointerEvents: 'none',
    },
  };

  // Generate code for different formats
  const codeProps = {
    component: 'Accordion',
    props: {
      items: '[ /* ... */ ]',
      variant,
      size,
      ...(disabled && { disabled: true }),
      iconPosition,
      multipleOpen,
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

  // API Reference content
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
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>items</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>AccordionItem[]</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Array of sections to display</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>variant</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>'default' | 'bordered'</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Visual style of the accordion</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>size</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>'small' | 'medium' | 'large'</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Size of the accordion</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>disabled</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>boolean</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Disables all interaction</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>iconPosition</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>'left' | 'right'</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Position of the expand/collapse icon</td></tr>
        <tr><td style={{ padding: '8px', color: '#f3f4f6' }}>multipleOpen</td><td style={{ padding: '8px' }}><code style={{ color: '#a5b4fc' }}>boolean</code></td><td style={{ padding: '8px', color: '#f3f4f6' }}>Allow multiple sections to be open at once</td></tr>
      </tbody>
    </table>
  );

  return (
    <ComponentPlaygroundLayout
      componentName="Accordion"
      description="An interactive, accessible accordion component with customizable style, size, and behavior."
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
          type: 'checkbox',
          label: 'Disabled',
          checked: disabled,
          onChange: setDisabled,
        },
        ...(!disabled ? [{
          type: 'select' as const,
          label: 'Icon Position',
          options: ICON_POSITIONS as unknown as string[],
          value: iconPosition,
          onChange: (v: string) => setIconPosition(v as typeof ICON_POSITIONS[number]),
        }] : []),
        ...(!disabled ? [{
          type: 'checkbox' as const,
          label: 'Multiple Open',
          checked: multipleOpen,
          onChange: setMultipleOpen,
        }] : []),
      ]}
      renderPreview={() => (
        <Accordion
          items={ACCORDION_ITEMS}
          variant={variant}
          size={size}
          disabled={disabled}
          iconPosition={iconPosition}
          multipleOpen={multipleOpen}
        />
      )}
      renderCode={() => <CodePreview formats={formats} />}
      renderApi={() => apiReference}
      renderControlsFooter={() => <ResetButton onClick={handleReset}>Reset</ResetButton>}
    />
  );
} 