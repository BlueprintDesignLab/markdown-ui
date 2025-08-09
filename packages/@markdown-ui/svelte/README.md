# @markdown-ui/svelte

A Svelte renderer for [Markdown UI](https://github.com/BlueprintDesignLab/markdown-ui) - transform markdown with embedded interactive widgets into beautiful, functional Svelte components.

## Installation

```bash
npm install @markdown-ui/svelte @markdown-ui/marked-ext marked
```

## Quick Start

```javascript
import { MarkdownUI } from '@markdown-ui/svelte';
import '@markdown-ui/svelte/widgets.css'; // Optional styling

import { Marked } from 'marked';
import { markedUiExtension } from '@markdown-ui/marked-ext';

// Setup marked with the markdown-ui extension
const marked = new Marked();
marked.use(markedUiExtension);

const markdown = `
# Configuration

Choose your deployment settings:

\`\`\`markdown-ui-widget
{ "type": "select", "id": "env", "choices": ["dev", "staging", "prod"] }
\`\`\`
`;

function handleWidgetEvent(event) {
  console.log('User selected:', event.detail); 
  // Output: {id: "env", value: "prod"}
}
```

```svelte
<MarkdownUI 
  html={marked.parse(markdown)} 
  onwidgetevent={handleWidgetEvent} 
/>
```

## Supported Widgets

### Button Group
Create a set of toggle buttons for single selection:

```markdown
\`\`\`markdown-ui-widget
{ 
  "type": "buttonGroup", 
  "id": "mode", 
  "label": "Mode", 
  "choices": ["Development", "Staging", "Production"],
  "default": "Development"
}
\`\`\`
```

### Select Dropdown
Standard dropdown selection:

```markdown
\`\`\`markdown-ui-widget
{ 
  "type": "select", 
  "id": "region", 
  "label": "Region", 
  "choices": ["us-east-1", "us-west-2", "eu-west-1"],
  "default": "us-east-1"
}
\`\`\`
```

### Multi-Select
Allow users to select multiple options:

```markdown
\`\`\`markdown-ui-widget
{ 
  "type": "selectMulti", 
  "id": "features", 
  "label": "Features", 
  "choices": ["SSL", "CDN", "Analytics", "Monitoring"],
  "default": ["SSL"]
}
\`\`\`
```

### Slider
Numeric input with visual feedback:

```markdown
\`\`\`markdown-ui-widget
{ 
  "type": "slider", 
  "id": "replicas", 
  "label": "Replicas", 
  "min": 1, 
  "max": 10, 
  "step": 1,
  "default": 3
}
\`\`\`
```

### Text Input
Simple text input field:

```markdown
\`\`\`markdown-ui-widget
{ 
  "type": "textInput", 
  "id": "appName", 
  "label": "Application Name", 
  "placeholder": "Enter app name...",
  "default": ""
}
\`\`\`
```

### Form
Combine multiple widgets into a single form:

```markdown
\`\`\`markdown-ui-widget
{
  "type": "form",
  "id": "deployment-config",
  "submitLabel": "Deploy",
  "fields": [
    { "type": "textInput", "id": "name", "label": "App Name" },
    { "type": "select", "id": "env", "label": "Environment", "choices": ["dev", "prod"] },
    { "type": "slider", "id": "replicas", "label": "Replicas", "min": 1, "max": 5, "default": 2 }
  ]
}
\`\`\`
```

## Event Handling

All widgets emit standardized events when users interact with them:

```javascript
function handleWidgetEvent(event) {
  const { id, value } = event.detail;
  
  switch(id) {
    case 'env':
      console.log(`Environment changed to: ${value}`);
      break;
    case 'deployment-config':
      console.log('Form submitted:', value); 
      // value = { name: "myapp", env: "prod", replicas: 3 }
      break;
  }
}
```

## Styling

The package includes optional CSS for professional-looking widgets:

```javascript
import '@markdown-ui/svelte/widgets.css';
```

The styles are designed to:
- Work well with most existing designs
- Provide responsive behavior on mobile
- Include focus and hover states for accessibility
- Use modern CSS variables for easy customization

### Custom Styling

You can override the default styles by targeting the CSS classes:

```css
/* Custom button group styling */
.widget-button-group button {
  background: your-custom-color;
  border-radius: your-custom-radius;
}

/* Custom form styling */
.widget-form {
  background: your-form-background;
  padding: your-custom-padding;
}
```

## TypeScript Support

The library is written in TypeScript and includes full type definitions. Widget events are properly typed:

```typescript
import type { CustomEvent } from 'svelte/elements';

interface WidgetEvent {
  id: string;
  value: any;
}

function handleWidgetEvent(event: CustomEvent<WidgetEvent>) {
  const { id, value } = event.detail; // Fully typed
}
```

## Advanced Usage

### Custom Event Handling per Widget Type

```javascript
function handleWidgetEvent(event) {
  const { id, value } = event.detail;
  
  // Handle different widget types
  if (id.startsWith('form-')) {
    // Handle form submissions
    submitToAPI(value);
  } else if (id.includes('config')) {
    // Handle configuration changes
    updateConfig(id, value);
  }
}
```

### Integration with State Management

```javascript
import { writable } from 'svelte/store';

const appConfig = writable({});

function handleWidgetEvent(event) {
  const { id, value } = event.detail;
  appConfig.update(config => ({
    ...config,
    [id]: value
  }));
}
```

## How It Works

1. **Markdown Parsing**: The `@markdown-ui/marked-ext` extension converts `markdown-ui-widget` code blocks into standardized XML tags
2. **Widget Registration**: This Svelte library registers a custom `<markdown-ui-widget>` element
3. **Dynamic Rendering**: The custom element decodes the widget configuration and renders the appropriate Svelte component
4. **Event Emission**: User interactions trigger standardized events that bubble up to your event handler

## Browser Compatibility

- Modern browsers supporting Custom Elements (Chrome 67+, Firefox 63+, Safari 13+)
- For older browser support, include a Custom Elements polyfill

## Contributing

This is part of the [Markdown UI project](https://github.com/BlueprintDesignLab/markdown-ui). Contributions are welcome!

## License

MIT