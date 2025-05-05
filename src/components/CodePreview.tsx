import React, { useState } from 'react';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

export type CodeFormat = 'jsx' | 'html' | 'javascript';

export interface CodePreviewData {
  format: CodeFormat;
  code: string;
  language: string;
}

interface CodePreviewProps {
  formats: CodePreviewData[];
  defaultFormat?: CodeFormat;
}

const PreviewContainer = styled.div`
  background: transparent;
  border-radius: 12px;
  overflow: hidden;
`;

const FormatTabs = styled.div`
  display: flex;
  gap: 1px;
  padding: 8px 12px 0;
  background: transparent;
`;

const FormatTab = styled.button<{ active: boolean }>`
  padding: 6px 12px;
  background: ${({ active }) => active ? '#383c44' : 'rgba(255,255,255,0.05)'};
  color: ${({ active }) => active ? '#fff' : 'rgba(255,255,255,0.6)'};
  border: none;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
  font-size: 13px;
  font-family: inherit;
  transition: all 0.2s;

  &:hover {
    background: ${({ active }) => active ? '#383c44' : 'rgba(255,255,255,0.1)'};
    color: #fff;
  }
`;

const CodeContainer = styled.div`
  position: relative;
  background: #292c34;
  padding: 16px;
  margin: 0;
  overflow-x: auto;
  border-radius: 0 0 8px 8px;
`;

const CopyButton = styled.button<{ copied: boolean }>`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 6px;
  background: ${({ copied }) => copied ? '#059669' : 'rgba(255,255,255,0.1)'};
  border: none;
  border-radius: 4px;
  color: ${({ copied }) => copied ? '#fff' : 'rgba(255,255,255,0.8)'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-family: inherit;
  transition: all 0.2s;

  &:hover {
    background: ${({ copied }) => copied ? '#059669' : 'rgba(255,255,255,0.15)'};
    color: #fff;
  }
`;

export const CodePreview: React.FC<CodePreviewProps> = ({ formats, defaultFormat = 'jsx' }) => {
  const [activeFormat, setActiveFormat] = useState<CodeFormat>(defaultFormat);
  const [copied, setCopied] = useState(false);

  const activeCode = formats.find(f => f.format === activeFormat) || formats[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCode.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <PreviewContainer>
      <FormatTabs>
        {formats.map(({ format }) => (
          <FormatTab
            key={format}
            active={format === activeFormat}
            onClick={() => setActiveFormat(format)}
          >
            {format.toUpperCase()}
          </FormatTab>
        ))}
      </FormatTabs>
      <CodeContainer>
        <CopyButton onClick={handleCopy} copied={copied}>
          {copied ? (
            <>
              <Check size={14} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </CopyButton>
        <SyntaxHighlighter
          language={activeCode.language}
          style={oneDark}
          customStyle={{
            background: 'none',
            fontSize: 14,
            margin: 0,
            padding: 0
          }}
        >
          {activeCode.code}
        </SyntaxHighlighter>
      </CodeContainer>
    </PreviewContainer>
  );
}; 