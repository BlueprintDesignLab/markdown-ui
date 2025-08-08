# @markdown-ui/svelte

**Micro-spec for interactive widgets inside Markdown.** [Markdown UI](https://github.com/BlueprintDesignLab/markdown-ui)

## Installation

```bash
npm install @markdown-ui/svelte
```

## Quick Start

```svelte
<script>
  import { MarkdownUI } from '@markdown-ui/svelte';
  
  const markdown = `
# Hello World

Choose your environment:

\`\`\`markdown-ui-widget
{ "type": "select", "id": "env", "choices": ["dev", "staging", "prod"] }
\`\`\`
  `;
  
  function handleWidgetEvent(event) {
    console.log('Widget event:', event.detail); // {id: "env", value: "prod"}
  }
</script>

<MarkdownUI 
  md={markdown} 
  onwidgetevent={handleWidgetEvent} 
/>
```

## Internal Parser

1. **With marked extension (recommended):**

```javascript
import { marked } from 'marked';
import { markdownUIExtension } from '@markdown-ui/marked-ext';

marked.use(markdownUIExtension());
const html = marked.parse(markdownWithWidgets);
```

Currently these are coupled. 

In the future this may change to accept any markdown to html parser.

## Supported Widgets

| Widget | Props | Event Value |
|--------|-------|-------------|
| `buttonGroup` | `choices`, `label`, `default` | `string` |
| `select` | `choices`, `label`, `default` | `string` |  
| `selectMulti` | `choices`, `label`, `default` | `string[]` |
| `slider` | `min`, `max`, `step`, `label`, `default` | `number` |
| `textInput` | `label`, `placeholder`, `default` | `string` |
| `form` | `fields`, `submitLabel` | `object` |

## Events

All widgets emit `widget-event` with this structure:

```typescript
{
  detail: {
    id: string,     // Widget ID
    value: any      // Widget value
  }
}
```

## Styling

Import the default styles:

```javascript
import '@markdown-ui/svelte/widgets.css';
```

Or create your own CSS targeting the widget classes:

```css
.widget-button-group { /* ... */ }
.widget-slider { /* ... */ }
.selector { /* ... */ }
```

## License

MIT
