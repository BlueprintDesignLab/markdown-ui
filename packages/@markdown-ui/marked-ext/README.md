# @markdown-ui/marked-ext
**Turn your Markdown parser into a widget factory.**

Transform `markdown-ui-widget` code blocks into interactive components with zero configuration.

✨ [Try the live demo](https://markdown-ui.com/) ✨

Works with any Marked.js setup—just add the extension and widgets come alive.

## Get started in 30 seconds

```bash
npm install @markdown-ui/marked-ext marked
```

```typescript
import { Marked } from 'marked';
import { markedUiExtension } from '@markdown-ui/marked-ext';

const marked = new Marked();
marked.use(markedUiExtension);

// This markdown...
const markdown = `
\`\`\`markdown-ui-widget
select env [dev staging prod]
\`\`\`
`;

const html = marked.parse(markdown);
// ...becomes interactive widgets!
```

## Two syntaxes, same magic

Write widgets in **JSON** (traditional) or **DSL** (60% more concise):

**DSL** ⚡
```markdown
text-input username "Username" "Enter username"
button-group env [dev staging prod] dev
select region [us-east-1 us-west-2] us-east-1
form config "Submit"
  text-input name "Name" 
  select env [dev prod]
```

**JSON** 📝
```json
{"type": "text-input", "id": "username", "label": "Username"}
```

Both work identically—the extension auto-detects the format.

## How it works

1. **Detects** `markdown-ui-widget` code blocks in your Markdown
2. **Encodes** widget config as base64 with unique IDs
3. **Generates** `<markdown-ui-widget>` custom elements
4. **Renders** with your framework (React, Svelte, Vue)

Perfect separation—any parser, any renderer, any framework.

**Next step:** Add a renderer like `@markdown-ui/react` or `@markdown-ui/svelte` to see your widgets come alive.

MIT © 2025