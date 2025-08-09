# Markdown UI
**Micro-spec for interactive widgets inside Markdown.**  

See the [live demo here](https://markdown-ui.yaoke.pro).

If your renderer supports it → live UI. If not → graceful fallback.

````markdown
```markdown-ui-widget
{ "type": "select", "id": "env", "choices": ["dev", "prod"] }
```
````

Becomes an actual dropdown that emits `{id: "env", value: "prod"}` events.

## Why Markdown UI?

- **LLM-Native**: Designed for AI to generate interactive experiences
- **Zero Dependencies**: Pure specification, bring your own parser/renderer  
- **Cross-Platform**: Works with any Markdown parser + any UI framework
- **Secure**: JSON-only, no code execution
- **Progressive**: Graceful fallback to code blocks

## Quick Start

1. **Choose your stack**: We support Svelte, with React coming soon
2. **Install renderer**: `npm install @markdown-ui/svelte`  
3. **Parse markdown**: Use `@markdown-ui/marked-ext` or any parser
4. **Render**: Components handle the rest

```javascript
import { MarkdownUI } from '@markdown-ui/svelte';
// Your markdown with markdown-ui-widget blocks becomes interactive
```

## Supported Widgets

| Widget | Purpose | Events |
|--------|---------|--------|
| **buttonGroup** | A/B choices, yes/no | `string` |
| **select** | Dropdown, multi-select | `string \| string[]` |
| **selectMulti** | Tag selection | `string[]` |
| **slider** | Numeric input | `number` |  
| **textInput** | Free text | `string` |
| **form** | Composite widget | `object` |

## Architecture

**Parser** (`marked-ext`) → Converts `markdown-ui-widget` blocks to standardized XML  
**Renderer** (`svelte`) → XML becomes interactive components + events
**Events** When users interact with the UI components, it emits `{id, value}` objects which your application can handle.

This separation lets you mix any parser with any renderer.

## Implementations

# Implementations

| Package | Status |
|---------|---------|
| `@markdown-ui/marked-ext` (Parser) | ✅ Complete |
| `@markdown-ui/svelte` (Renderer) | ✅ Complete |

## Package Links

- **Parser**: [@markdown-ui/marked-ext](https://www.npmjs.com/package/@markdown-ui/marked-ext)
- **Renderer**: [@markdown-ui/svelte](https://www.npmjs.com/package/@markdown-ui/svelte)

React renderer implementation is coming soon.

## Contributing

- **New widgets**: Open issue with use case
- **Parser/renderer ports**: PRs welcome
- **Spec changes**: Discuss in issues first

MIT © 2025
