# @markdown-ui/react

React renderer for markdown-ui widgets. This package provides React components that work with the markdown-ui widget system.

See [markdown-ui Github](https://github.com/BlueprintDesignLab/markdown-ui/).

## Installation

```bash
npm install @markdown-ui/react @markdown-ui/marked-ext @markdown-ui/mdui-lang
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
  "type": "text-input",
  "id": "name",
  "label": "Your Name",
  "placeholder": "Enter your name"
}
\`\`\`

Or use the more concise DSL syntax:

\`\`\`markdown-ui-widget
text-input name "Your Name" "Enter your name"
\`\`\`
  `;

  const html = marked(markdown);

  const handleWidgetEvent = (event: CustomEvent<{id: string, value: unknown}>) => {
    console.log('Widget event:', event.detail);
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

### DSL Syntax

The `@markdown-ui/marked-ext` extension now supports both JSON and DSL syntax in `markdown-ui-widget` code blocks. The DSL is **60-70% more concise** than JSON:

**JSON:**
```json
{"type": "textInput", "id": "name", "label": "Name", "placeholder": "Enter name"}
```

**DSL:**
```
text-input name "Name" "Enter name"
```

Both syntaxes produce identical widget output. The extension automatically detects the format.

### Widget Examples

#### Text Input
```markdown
\`\`\`markdown-ui-widget
{
  "type": "text-input",
  "id": "name",
  "label": "Name",
  "placeholder": "Enter your name",
  "default": "John Doe"
}
\`\`\`
```

Or with DSL:
```markdown
\`\`\`markdown-ui-widget
text-input name "Name" "Enter your name" "John Doe"
\`\`\`
```

#### Button Group
```markdown
\`\`\`markdown-ui-widget
{
  "type": "button-group",
  "id": "choice",
  "label": "Choose an option",
  "choices": ["Option A", "Option B", "Option C"],
  "default": "Option A"
}
\`\`\`
```

Or with DSL:
```markdown
\`\`\`markdown-ui-widget
button-group choice [OptionA OptionB OptionC] OptionA
\`\`\`
```

#### Slider
```markdown
\`\`\`markdown-ui-widget
{
  "type": "slider",
  "id": "value",
  "label": "Value",
  "min": 0,
  "max": 100,
  "step": 1,
  "default": 50
}
\`\`\`
```

Or with DSL:
```markdown
\`\`\`markdown-ui-widget
slider value 0 100 1 50
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
      "type": "text-input",
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

The `onWidgetEvent` callback receives a CustomEvent when widget values change:

```tsx
const handleWidgetEvent = (event: CustomEvent<{id: string, value: unknown}>) => {
  console.log(`Widget ${event.detail.id} changed to:`, event.detail.value);
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
  const handleWidgetEvent = (event: CustomEvent<{id: string, value: unknown}>) => {
    console.log('Widget event:', event.detail);
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