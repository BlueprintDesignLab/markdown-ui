# @markdown-ui/react

React renderer for markdown-ui widgets. This package provides React components that work with the markdown-ui widget system.

## Installation

```bash
npm install @markdown-ui/react @markdown-ui/marked-ext
```

## Usage

### Basic Setup

```tsx
import React from 'react';
import { MarkdownUI } from '@markdown-ui/react';
import '@markdown-ui/react/widgets.css'; // Optional styling
import { marked } from 'marked';
import { markedUiExtension } from '@markdown-ui/marked-ext';

// Configure marked with the UI extension
marked.use(markedUiExtension);

const App = () => {
  const markdown = `
# My Form

\`\`\`markdown-ui-widget
{
  "type": "textInput",
  "label": "Your Name",
  "placeholder": "Enter your name"
}
\`\`\`
  `;

  const html = marked(markdown);

  const handleWidgetEvent = (data: any) => {
    console.log('Widget event:', data);
  };

  return (
    <MarkdownUI 
      html={html} 
      onWidgetEvent={handleWidgetEvent} 
    />
  );
};
```

### Available Widgets

All widgets from the Svelte implementation are available:

- **TextInput**: Single line text input
- **ButtonGroup**: Multiple choice buttons
- **Select**: Dropdown selection
- **SelectMulti**: Multiple selection with checkboxes
- **Slider**: Range input
- **Form**: Container for multiple widgets

### Widget Examples

#### Text Input
```markdown
\`\`\`markdown-ui-widget
{
  "type": "textInput",
  "label": "Name",
  "placeholder": "Enter your name",
  "default": "John Doe"
}
\`\`\`
```

#### Button Group
```markdown
\`\`\`markdown-ui-widget
{
  "type": "buttonGroup",
  "label": "Choose an option",
  "choices": ["Option A", "Option B", "Option C"],
  "default": "Option A"
}
\`\`\`
```

#### Slider
```markdown
\`\`\`markdown-ui-widget
{
  "type": "slider",
  "label": "Value",
  "min": 0,
  "max": 100,
  "step": 1,
  "default": 50
}
\`\`\`
```

#### Form
```markdown
\`\`\`markdown-ui-widget
{
  "type": "form",
  "submitLabel": "Submit Form",
  "fields": [
    {
      "type": "textInput",
      "id": "name",
      "label": "Name",
      "placeholder": "Your name"
    },
    {
      "type": "select",
      "id": "country",
      "label": "Country",
      "choices": ["USA", "Canada", "UK"]
    }
  ]
}
\`\`\`
```

### Styling

Import the CSS file for default styling:

```tsx
import '@markdown-ui/react/widgets.css';
```

You can also customize the styling by overriding the CSS classes:

- `.widget` - Base widget container
- `.widget-form` - Form container
- `.widget-button-group` - Button group container
- `.widget-button` - Text input container
- `.selector` - Select dropdown container
- `.selector-multi` - Multi-select container
- `.widget-slider` - Slider container

### Event Handling

The `onWidgetEvent` callback receives data when widget values change:

```tsx
const handleWidgetEvent = (data: { id: string, value: any }) => {
  console.log(`Widget ${data.id} changed to:`, data.value);
};
```

## TypeScript Support

This package includes full TypeScript definitions. All components are typed and provide IntelliSense support.

## Next.js Usage

Due to the use of Web Components and browser APIs, this library requires client-side rendering. Use dynamic imports with SSR disabled:

```tsx
import dynamic from 'next/dynamic';

const MarkdownUI = dynamic(() => import('@markdown-ui/react').then(mod => ({ default: mod.MarkdownUI })), {
  ssr: false
});

export default function Page() {
  const handleWidgetEvent = (data: any) => {
    console.log('Widget event:', data);
  };

  return (
    <MarkdownUI 
      html={yourProcessedHtml} 
      onWidgetEvent={handleWidgetEvent} 
    />
  );
}
```

## Compatibility

- React 19+ (React 18+ also supported)
- Modern browsers with Web Components support
- Next.js (with client-side rendering only)
- Create React App and other React frameworks