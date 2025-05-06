import React, { useState } from 'react';
import ComponentPlaygroundLayout from './ComponentPlaygroundLayout';
import { Card, CardSize } from './Card';
import { CodePreview, CodePreviewData } from './CodePreview';
import { Image, User, MoreVertical, Star, Mail } from 'lucide-react';

export default function CardPlayground() {
  const [title, setTitle] = useState('Demo Card');
  const [content, setContent] = useState(
    "This card demonstrates all the features of the Card component. Use the controls to the right to toggle these features!"
  );
  const [size, setSize] = useState<CardSize>('medium');
  const [elevation, setElevation] = useState(true);
  const [showThumbnail, setShowThumbnail] = useState(false);
  const [showHeaderIcon, setShowHeaderIcon] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [footerActionCount, setFooterActionCount] = useState(0);
  const [footerActions, setFooterActions] = useState([
    { label: 'Action 1', icon: <Star size={16} />, onClick: () => alert('Action 1') },
    { label: 'Action 2', icon: <Mail size={16} />, onClick: () => alert('Action 2') },
    { label: 'Action 3', icon: <User size={16} />, onClick: () => alert('Action 3') },
  ]);

  // Initial values for reset
  const initialTitle = 'Demo Card';
  const initialContent = "This card demonstrates all the features of the Card component. Use the controls to the right to toggle these features!";
  const initialSize: CardSize = 'medium';
  const initialElevation = true;
  const initialShowThumbnail = false;
  const initialShowHeaderIcon = false;
  const initialShowMenu = false;
  const initialFooterActionCount = 0;
  const initialFooterActions = [
    { label: 'Action 1', icon: <Star size={16} />, onClick: () => alert('Action 1') },
    { label: 'Action 2', icon: <Mail size={16} />, onClick: () => alert('Action 2') },
    { label: 'Action 3', icon: <User size={16} />, onClick: () => alert('Action 3') },
  ];

  const codeProps = {
    component: 'Card',
    props: {
      ...(title ? { title } : {}),
      ...(elevation ? { elevation: true } : {}),
      ...(size !== 'medium' ? { size } : {}),
      ...(showThumbnail ? { thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' } : {}),
      ...(showHeaderIcon ? { headerIcon: '<User />' } : {}),
      ...(showMenu ? { onMenuClick: '() => {}' } : {}),
      ...(footerActionCount > 0 ? { footerActions: '...' } : {}),
    },
    children: content,
  };

  const formats: CodePreviewData[] = [
    {
      format: 'jsx',
      language: 'jsx',
      code: `<Card${title ? ` title=\"${title}\"` : ''}${elevation ? ' elevation' : ''}${size !== 'medium' ? ` size=\"${size}\"` : ''}>
  ${content}
</Card>`
    }
  ];

  return (
    <ComponentPlaygroundLayout
      componentName="Card"
      description="A flexible card component for grouping content, with optional title, elevation, size, thumbnail, header icon, menu, and footer actions."
      controls={[
        // Content controls
        {
          type: 'input',
          label: 'Title',
          value: title,
          onChange: setTitle,
        },
        {
          type: 'input',
          label: 'Content',
          value: content,
          onChange: setContent,
        },
        // Visual controls
        {
          type: 'select',
          label: 'Size',
          options: ['small', 'medium', 'large'],
          value: size,
          onChange: (v: string) => setSize(v as CardSize),
        },
        {
          type: 'checkbox',
          label: 'Elevation (Shadow)',
          checked: elevation,
          onChange: setElevation,
        },
        // Advanced controls
        {
          type: 'checkbox',
          label: 'Show Thumbnail',
          checked: showThumbnail,
          onChange: setShowThumbnail,
        },
        {
          type: 'checkbox',
          label: 'Show Header Icon',
          checked: showHeaderIcon,
          onChange: setShowHeaderIcon,
        },
        {
          type: 'checkbox',
          label: 'Show Menu Button',
          checked: showMenu,
          onChange: setShowMenu,
        },
        {
          type: 'select',
          label: 'Footer Actions',
          options: [0, 1, 2, 3],
          value: footerActionCount,
          onChange: (v: number) => setFooterActionCount(Number(v)),
        },
        {
          type: 'button',
          label: 'Reset',
          onClick: () => {
            setTitle(initialTitle);
            setContent(initialContent);
            setSize(initialSize);
            setElevation(initialElevation);
            setShowThumbnail(initialShowThumbnail);
            setShowHeaderIcon(initialShowHeaderIcon);
            setShowMenu(initialShowMenu);
            setFooterActionCount(initialFooterActionCount);
            setFooterActions(initialFooterActions);
          },
        },
      ]}
      renderPreview={() => (
        <Card
          title={title}
          elevation={elevation}
          size={size}
          thumbnail={showThumbnail ? (
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Sample" />
          ) : undefined}
          headerIcon={showHeaderIcon ? <User size={20} /> : undefined}
          onMenuClick={showMenu ? (() => alert('Menu clicked!')) : undefined}
          footerActions={footerActionCount > 0 ? footerActions.slice(0, footerActionCount) : undefined}
        >
          {content}
        </Card>
      )}
      renderCode={() => <CodePreview formats={formats} />}
    />
  );
} 