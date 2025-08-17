# @markdown-ui/marked-ext

Marked extension for markdown-ui widgets.

See [markdown-ui Github](https://github.com/BlueprintDesignLab/markdown-ui/).

## Overview

This package provides a Marked.js extension that enables rendering of `markdown-ui-widget` code blocks as interactive UI components. When markdown contains code blocks with the language `markdown-ui-widget`, this extension converts them into custom web components.

> New! Added support for atom widgets – ultra-lightweight inline controls that render directly in the text flow.

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

// JSON widget syntax
const jsonMarkdown = `
\`\`\`markdown-ui-widget
{
  "type": "textInput",
  "id": "username", 
  "label": "Username",
  "placeholder": "Enter username"
}
\`\`\`
`;

// DSL syntax (more concise!)
const dslMarkdown = `
\`\`\`markdown-ui-widget
text-input username "Username" "Enter username"
\`\`\`
`;

const html = marked(jsonMarkdown);
console.log(html);
// Output: <markdown-ui-widget id="unique-id" content="base64-encoded-content"></markdown-ui-widget>
```

### Dual Syntax Support

This extension supports **both JSON and DSL syntax** in `markdown-ui-widget` code blocks:

- **JSON**: Traditional object notation for maximum flexibility
- **DSL**: Concise syntax that's 60-70% shorter than JSON

The extension automatically detects the format - try JSON first, fall back to DSL if JSON parsing fails.

**DSL Examples:**
```
text-input username "Username" "Enter username"
button-group env [dev staging prod] dev
select region [us-east-1 us-west-2] us-east-1
slider cpu 1 32 1 4
form config "Submit"
  text-input name "Name"
  select env [dev prod]
```

For complete DSL documentation, see [@markdown-ui/mdui-lang](https://www.npmjs.com/package/@markdown-ui/mdui-lang).

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