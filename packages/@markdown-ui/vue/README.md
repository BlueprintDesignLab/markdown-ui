# @markdown-ui/vue

Vue renderer for markdown-ui widgets.

## Installation

```bash
npm install @markdown-ui/vue
```

## Usage

```vue
<template>
  <MarkdownUI :html="html" @widgetEvent="handleWidgetEvent" />
</template>

<script setup lang="ts">
import { MarkdownUI } from '@markdown-ui/vue'
import '@markdown-ui/vue/widgets.css'
import { Marked } from 'marked'
import { markedUiExtension } from '@markdown-ui/marked-ext'

const marked = new Marked()
marked.use(markedUiExtension)

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

\`\`\`markdown-ui-widget
{
  "type": "button-group",
  "id": "env",
  "label": "Environment", 
  "choices": ["dev", "staging", "prod"],
  "default": "dev"
}
\`\`\`
`

const html = marked.parse(markdown)

const handleWidgetEvent = (event: CustomEvent<{id: string, value: unknown}>) => {
  console.log('Widget event:', event.detail)
  // Output: {id: "name", value: "John Doe"}
}
</script>
```

### Event Handling

The `@widgetEvent` listener receives a CustomEvent when widget values change:

```typescript
const handleWidgetEvent = (event: CustomEvent<{id: string, value: unknown}>) => {
  console.log(`Widget ${event.detail.id} changed to:`, event.detail.value)
}
```

The event contains:
- `event.detail.id`: The widget identifier
- `event.detail.value`: The current widget value

### Widget Types

All standard markdown-ui widgets are supported:

- `text-input`
- `button-group` 
- `select`
- `select-multi`
- `slider`
- `form`

See the main [markdown-ui documentation](https://github.com/anthropics/markdown-ui) for complete widget syntax and options.

### TypeScript Support

Full TypeScript support is included:

```typescript
interface WidgetEvent {
  id: string
  value: unknown
}

const handleWidgetEvent = (event: CustomEvent<WidgetEvent>) => {
  const { id, value } = event.detail // Fully typed
}
```