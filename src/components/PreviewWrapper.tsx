import React from 'react';
import styled from 'styled-components';

const PreviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const CenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-width: 200px;
  max-width: 100%;
`;

interface PreviewWrapperProps {
  children: React.ReactNode;
}

export function PreviewWrapper({ children }: PreviewWrapperProps) {
  return (
    <PreviewContainer>
      <CenteredContent>
        {children}
      </CenteredContent>
    </PreviewContainer>
  );
} 