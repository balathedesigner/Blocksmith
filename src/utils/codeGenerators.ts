import { CodeFormat } from '../components/CodePreview';

interface StyleObject {
  [key: string]: string | number;
}

export const convertStyleObjectToCSS = (styles: StyleObject): string => {
  return Object.entries(styles)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value};`;
    })
    .join('\n  ');
};

export const generateClassName = (component: string, props: Record<string, any>): string => {
  const classes = [component.toLowerCase()];
  
  if (props.variant) {
    classes.push(`${component.toLowerCase()}-${props.variant}`);
  }
  if (props.size) {
    classes.push(`${component.toLowerCase()}-${props.size}`);
  }
  if (props.state && props.state !== 'default') {
    classes.push(`${component.toLowerCase()}-${props.state}`);
  }
  if (props.disabled) {
    classes.push(`${component.toLowerCase()}-disabled`);
  }

  return classes.join(' ');
};

export interface CodeGeneratorProps {
  component: string;
  props: Record<string, any>;
  children?: string;
  styles?: Record<string, StyleObject>;
}

export const generateCode = (format: CodeFormat, { component, props, children = '', styles = {} }: CodeGeneratorProps): string => {
  switch (format) {
    case 'jsx': {
      const propsString = Object.entries(props)
        .map(([key, value]) => {
          if (typeof value === 'string') return `${key}="${value}"`;
          if (typeof value === 'boolean' && value) return key;
          if (typeof value === 'boolean' && !value) return null;
          return `${key}={${JSON.stringify(value)}}`;
        })
        .filter(Boolean)
        .join(' ');

      return `<${component} ${propsString}>${children}</${component}>`;
    }

    case 'html': {
      const className = generateClassName(component, props);
      const html = `<span class="${className}">${children}</span>`;
      
      const css = Object.entries(styles)
        .map(([selector, styleObj]) => {
          const cssStyles = convertStyleObjectToCSS(styleObj);
          return `.${selector} {\n  ${cssStyles}\n}`;
        })
        .join('\n\n');

      return `${html}\n\n<style>\n${css}\n</style>`;
    }

    case 'javascript': {
      const className = generateClassName(component, props);
      const js = `// Create element
const element = document.createElement('span');
element.className = '${className}';
element.textContent = '${children}';\n`;

      const css = Object.entries(styles)
        .map(([selector, styleObj]) => {
          const cssStyles = convertStyleObjectToCSS(styleObj);
          return `// Add styles
const style = document.createElement('style');
style.textContent = \`
.${selector} {
  ${cssStyles}
}\`;
document.head.appendChild(style);`;
        })
        .join('\n\n');

      return `${js}\n${css}\n\n// Add to document\ndocument.body.appendChild(element);`;
    }

    default:
      return '';
  }
}; 