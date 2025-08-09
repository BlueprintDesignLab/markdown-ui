# @markdown-ui/marked-ext

Marked extension for markdown-ui widgets

## Overview

This package provides a Marked.js extension that enables rendering of `markdown-ui-widget` code blocks as interactive UI components. When markdown contains code blocks with the language `markdown-ui-widget`, this extension converts them into custom web components.

## Installation

```bash
npm install @markdown-ui/marked-ext
```

## Usage

```typescript
import { marked } from 'marked';
import { markedUiExtension } from '@markdown-ui/marked-ext';

// Register the extension
marked.use(markedUiExtension);

// Now markdown code blocks with lang="markdown-ui-widget" will be rendered as widgets
const markdown = `
\`\`\`markdown-ui-widget
{
  "type": "button",
  "text": "Click me!"
}
\`\`\`
`;

const html = marked(markdown);
console.log(html);
// Output: <markdown-ui-widget id="unique-id" content="base64-encoded-content"></markdown-ui-widget>
```

## How it works

1. The extension identifies code blocks with the language `markdown-ui-widget`
2. It base64-encodes the widget configuration content
3. It generates a unique ID using nanoid
4. It creates a `<markdown-ui-widget>` custom element with the encoded content and ID, which will require a marked-ui supported renderer.

## Dependencies

- `nanoid`: Used for generating unique widget IDs
- `marked`: Peer dependency for the Marked.js library

## License

ISC