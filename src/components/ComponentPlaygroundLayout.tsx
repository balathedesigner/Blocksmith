import React, { useState, useRef, useEffect } from 'react';
import styled, { ThemeProvider, DefaultTheme } from 'styled-components';
import { PlaygroundControls, PlaygroundControl } from './PlaygroundControls';
import { Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PreviewWrapper } from './PreviewWrapper';
import { CustomSelect } from './CustomSelect';
import { Button } from './Button';

// Theme objects
export const lightTheme: DefaultTheme = {
  bg: '#fff',
  text: '#222',
  subtext: '#666',
  border: '#e5e7eb',
  accent: '#6366f1',
  accentBg: '#f1f5ff',
  accentActive: '#e0e7ff',
  accentDark: '#4338ca',
  previewBg: '#e5e7eb',
  tabContentBg: '#f3f4f6',
};

export const darkTheme: DefaultTheme = {
  bg: '#18181b',
  text: '#f3f4f6',
  subtext: '#a1a1aa',
  border: '#27272a',
  accent: '#6366f1',
  accentBg: '#23234a',
  accentActive: '#3730a3',
  accentDark: '#a5b4fc',
  previewBg: '#232334',
  tabContentBg: '#232334',
};

declare module 'styled-components' {
  export interface DefaultTheme {
    bg: string;
    text: string;
    subtext: string;
    border: string;
    accent: string;
    accentBg: string;
    accentActive: string;
    accentDark: string;
    previewBg: string;
    tabContentBg: string;
  }
}

// Types for prop-driven controls
export type PlaygroundControlConfig =
  | {
      type: 'select';
      label: string;
      options: string[];
      value: string;
      onChange: (value: string) => void;
    }
  | {
      type: 'checkbox';
      label: string;
      checked: boolean;
      onChange: (checked: boolean) => void;
    }
  | {
      type: 'input';
      label: string;
      value: string;
      onChange: (value: string) => void;
      inputType?: string;
      disabled?: boolean;
    }
  | {
      type: 'button';
      label: string;
      onClick: () => void;
    };

const MainContainer = styled.main`
  width: 100vw;
  min-height: 100vh;
  background: ${({ theme }) => theme.bg};
  position: absolute;
  left: 0;
  top: 0;
`;

const Header = styled.header`
  padding: 32px 0 0 0;
  padding-left: 66px;
  padding-right: 66px;
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 600px) {
    padding: 20px 0 0 0;
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const BackLink = styled.a`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  text-decoration: underline;
  font-weight: 500;
  @media (max-width: 600px) {
    font-size: 15px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  color: ${({ theme }) => theme.text};
  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const Description = styled.p`
  font-size: 17px;
  color: ${({ theme }) => theme.subtext};
  margin: 8px 0 0 0;
  max-width: 700px;
  @media (max-width: 600px) {
    font-size: 15px;
  }
`;

const MainLayout = styled.section`
  display: flex;
  gap: 32px;
  margin-top: 24px;
  align-items: flex-start;
  padding: 0 16px;
  width: 100%;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  max-height: 80vh;
  min-height: 400px;
  overflow: hidden;
`;

const PreviewArea = styled.div`
  position: relative;
  background: ${({ theme }) => theme.previewBg};
  border-radius: 16px;
  min-height: 380px;
  max-height: 540px;
  margin-top: 8px;
  margin-bottom: 16px;
  margin-left: 0;
  margin-right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  overflow: hidden;
  @media (max-width: 600px) {
    min-height: 120px;
    font-size: 15px;
    margin-bottom: 10px;
  }
`;

const Tabs = styled.nav`
  display: flex;
  border-bottom: 2px solid ${({ theme }) => theme.border};
  margin-bottom: 0;
  overflow-x: auto;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 12px 28px;
  font-weight: ${({ active }) => (active ? 700 : 500)};
  font-size: 16px;
  border: none;
  background: none;
  border-bottom: 3px solid ${({ active, theme }) => (active ? theme.accent : 'transparent')};
  color: ${({ active, theme }) => (active ? theme.text : theme.subtext)};
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
  white-space: nowrap;
  border-radius: 6px 6px 0 0;
  @media (max-width: 600px) {
    padding: 10px 16px;
    font-size: 15px;
  }
  &:hover {
    background: ${({ theme }) => theme.accentBg};
    color: ${({ theme }) => theme.accent};
  }
  &:active {
    background: ${({ theme }) => theme.accentActive};
    color: ${({ theme }) => theme.accentDark};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.accent};
    outline-offset: 2px;
    z-index: 1;
  }
`;

const TabContent = styled.section<{ isCode?: boolean }>`
  background: ${({ isCode }) => isCode ? '#292c34' : '#e5e7eb'};
  border-radius: 12px;
  min-height: 100px;
  max-height: 220px;
  margin-top: 12px;
  margin-bottom: 12px;
  padding: 18px;
  color: ${({ isCode, theme }) => isCode ? '#f3f4f6' : theme.text};
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  overflow-y: auto;
  @media (max-width: 600px) {
    padding: 8px;
    min-height: 60px;
    font-size: 15px;
  }
`;

const TABS = [
  { label: 'Code (JSX)' },
  { label: 'API Reference' },
];

interface PlaygroundLayoutProps {
  controls: PlaygroundControlConfig[];
  componentName?: string;
  description?: string;
  renderPreview?: () => React.ReactNode;
  renderCode?: () => React.ReactNode;
  renderApi?: () => React.ReactNode;
  renderControlsFooter?: () => React.ReactNode;
}

const ThemeToggle = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  padding: 4px 12px;
  border-radius: 6px;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  &:hover, &:focus-visible {
    background: ${({ theme }) => theme.accentBg};
    outline: none;
  }
`;

// List of playground components for dropdown
const playgroundComponents = [
  { name: 'Accordion', path: '/playground/accordion' },
  { name: 'Alert', path: '/playground/alert' },
  { name: 'Badge', path: '/playground/badge' },
  { name: 'Button', path: '/playground/button' },
  { name: 'Card', path: '/playground/card' },
  { name: 'Checkbox', path: '/playground/checkbox' },
  { name: 'Date/Time Picker', path: '/playground/date-time-picker' },
  { name: 'Select', path: '/playground/select' },
  { name: 'Table', path: '/playground/table' },
  { name: 'Text Input', path: '/playground/text-input' },
];

const sortedPlaygroundComponents = playgroundComponents.slice().sort((a, b) => a.name.localeCompare(b.name));

export default function ComponentPlaygroundLayout({
  controls,
  componentName = 'Component name',
  description = 'Description about component and the playground',
  renderPreview,
  renderCode,
  renderApi,
  renderControlsFooter,
}: PlaygroundLayoutProps) {
  const [tab, setTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('blocksmith-theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('blocksmith-theme', theme);
  }, [theme]);

  // Keyboard navigation for tabs
  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (i + 1) % TABS.length;
      tabRefs.current[next]?.focus();
      setTab(next);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (i - 1 + TABS.length) % TABS.length;
      tabRefs.current[prev]?.focus();
      setTab(prev);
    }
  };

  const renderTabContent = () => {
    switch (tab) {
      case 0:
        return (
          <TabContent isCode={true}>
            {renderCode?.()}
          </TabContent>
        );
      case 1:
        return (
          <TabContent isCode={true}>
            {renderApi?.()}
          </TabContent>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <MainContainer>
        {/* Header */}
        <Header>
          <BackLink href="/">Back to all components</BackLink>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', gap: 12 }}>
            <div style={{ width: 200 }}>
              <CustomSelect
                options={sortedPlaygroundComponents.map(c => c.name)}
                value={componentName}
                onChange={(name) => {
                  const component = sortedPlaygroundComponents.find(c => c.name === name);
                  if (component) {
                    navigate(component.path);
                  }
                }}
                aria-label="Select component playground"
              />
            </div>
            <ThemeToggle
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </ThemeToggle>
          </div>
        </Header>
        <div style={{ maxWidth: 1600, margin: '32px auto 0 auto', paddingLeft: 66, paddingRight: 66, textAlign: 'left' }}>
          <Title>{componentName}</Title>
          <Description>{description}</Description>
        </div>
        {/* Main layout */}
        <MainLayout>
          {/* Controls section */}
          <PlaygroundControls>
            {controls.map((ctrl) => {
              if (ctrl.type === 'select') {
                return (
                  <PlaygroundControl label={ctrl.label}>
                    <CustomSelect
                      options={ctrl.options}
                      value={ctrl.value}
                      onChange={ctrl.onChange}
                      aria-label={ctrl.label}
                    />
                  </PlaygroundControl>
                );
              }
              if (ctrl.type === 'checkbox') {
                return (
                  <PlaygroundControl label={ctrl.label}>
                    <StyledCheckbox
                      checked={ctrl.checked}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => ctrl.onChange(e.target.checked)}
                      aria-checked={ctrl.checked}
                      aria-label={ctrl.label}
                    />
                  </PlaygroundControl>
                );
              }
              if (ctrl.type === 'input') {
                return (
                  <PlaygroundControl label={ctrl.label}>
                    <StyledInput
                      type={ctrl.inputType || 'text'}
                      value={ctrl.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => ctrl.onChange(e.target.value)}
                      aria-label={ctrl.label}
                      disabled={ctrl.disabled}
                    />
                  </PlaygroundControl>
                );
              }
              if (ctrl.type === 'button') {
                return (
                  <Button key={ctrl.label} onClick={ctrl.onClick} variant="solid" size="medium" style={{ marginTop: 8 }}>
                    {ctrl.label}
                  </Button>
                );
              }
              return null;
            })}
            {renderControlsFooter && renderControlsFooter()}
          </PlaygroundControls>

          {/* Live preview and tabs */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <PreviewArea aria-label="Live preview area">
              <PreviewWrapper>
              {renderPreview ? renderPreview() : 'Live preview area'}
              </PreviewWrapper>
            </PreviewArea>
            {/* Tabs */}
            <Tabs role="tablist" aria-label="Playground tabs">
              {TABS.map((t, i) => (
                <TabButton
                  key={t.label}
                  ref={el => { tabRefs.current[i] = el; }}
                  active={i === tab}
                  role="tab"
                  aria-selected={i === tab}
                  aria-current={i === tab ? 'page' : undefined}
                  aria-controls={`tabpanel-${i}`}
                  id={`tab-${i}`}
                  tabIndex={i === tab ? 0 : -1}
                  onClick={() => setTab(i)}
                  onKeyDown={e => handleTabKeyDown(e, i)}
                >
                  {t.label}
                </TabButton>
              ))}
            </Tabs>
            {/* Tab content area */}
            {renderTabContent()}
          </div>
        </MainLayout>
      </MainContainer>
    </ThemeProvider>
  );
}

// Example usage for demo/testing
export function DemoComponentPlayground() {
  const [size, setSize] = useState('Medium');
  const [disabled, setDisabled] = useState(false);
  const [label, setLabel] = useState('Demo label');

  return (
    <ThemeProvider theme={lightTheme}>
      <ComponentPlaygroundLayout
        componentName="Demo Component"
        description="This is a demo of the prop-driven controls system."
        controls={[
          {
            type: 'select',
            label: 'Size',
            options: ['Small', 'Medium', 'Large'],
            value: size,
            onChange: setSize,
          },
          {
            type: 'checkbox',
            label: 'Disabled',
            checked: disabled,
            onChange: setDisabled,
          },
          {
            type: 'input',
            label: 'Label',
            value: label,
            onChange: setLabel,
          },
        ]}
      />
    </ThemeProvider>
  );
}

const StyledInput = styled.input`
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
  font-size: 15px;
  background: ${({ theme, disabled }) => disabled ? '#e5e7eb' : theme.bg};
  color: ${({ theme, disabled }) => disabled ? '#a1a1aa' : theme.text};
  transition: border-color 0.2s, box-shadow 0.2s;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'text'};
  &:hover {
    border-color: ${({ theme }) => theme.accent};
  }
  &:focus {
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.accentBg};
    outline: none;
  }
`;

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;
  accent-color: ${({ theme }) => theme.accent};
  margin-right: 8px;
  &:focus {
    outline: 2px solid ${({ theme }) => theme.accent};
    outline-offset: 2px;
  }
`;

// End of styled components 