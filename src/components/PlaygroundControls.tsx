import React from 'react';
import styled from 'styled-components';

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px 24px;
  padding-left: 32px;
  background: ${({ theme }) => theme.bg === '#18181b' ? theme.tabContentBg : '#f3f4f6'};
  border-radius: 16px;
  width: 320px;
  min-width: 220px;
  max-width: 320px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  max-height: 520px;
  overflow-y: auto;
  text-align: left;
`;

const ControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

const ControlLabel = styled.label`
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 2px;
  text-align: left;
  color: ${({ theme }) => theme.text};
`;

const CheckboxRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  text-align: left;
`;

export function PlaygroundControls({ children }: { children: React.ReactNode }) {
  return <ControlsContainer>{children}</ControlsContainer>;
}

export function PlaygroundControl({ label, children }: { label: string, children: React.ReactNode }) {
  // If the child is a checkbox, render label and checkbox in a row
  const isCheckbox = React.Children.toArray(children).some(
    (child: any) => child && child.type && (child.type.displayName === 'StyledCheckbox' || child.props?.type === 'checkbox')
  );
  if (isCheckbox) {
    return (
      <CheckboxRow>
        {children}
        <ControlLabel style={{ marginBottom: 0 }}>{label}</ControlLabel>
      </CheckboxRow>
    );
  }
  return (
    <ControlWrapper>
      <ControlLabel>{label}</ControlLabel>
      {children}
    </ControlWrapper>
  );
} 