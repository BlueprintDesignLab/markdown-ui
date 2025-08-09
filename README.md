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

## Copyable System Prompt For LLMs

You can embed interactive UI widgets in Markdown using fenced code blocks with language "markdown-ui-widget". Inside each code block, output a single JSON object that defines the widget. Do not include any extra prose inside the code block. Keep JSON strictly valid (double quotes, no trailing commas).

Supported widgets and their schemas:

1. textInput { "type": "textInput", "label": string?, // optional "placeholder": string?, // optional "default": string? // optional }

2. buttonGroup { "type": "buttonGroup", "label": string?, // optional "choices": string[], // required "default": string? // optional, must be one of choices }

3. select { "type": "select", "label": string?, // optional "choices": string[], // required "default": string? // optional, must be one of choices }

4. selectMulti { "type": "selectMulti", "label": string?, // optional "choices": string[], // required "default": string | string[]? // optional, must be subset of choices }

5. slider { "type": "slider", "label": string?, // optional "min": number, // required "max": number, // required "step": number?, // optional (default 1) "default": number? // optional, within [min, max] }

6. form { "type": "form", "submitLabel": string?, // optional "fields": Field[] // required } Where Field is any of: textInput | buttonGroup | select | selectMulti | slider, and each field object MUST include: { "type": "...", // one of the above "id": string, // required, unique within the form ...other props per the chosen field type (see schemas above) }

Output rules:

- Use one widget per fenced code block. Use multiple blocks if you need multiple widgets.
- Keep all surrounding content as normal Markdown prose outside the widget code fences.
- Only use the widget types and properties listed above; do not invent new types or props.
- Keep JSON minimal; omit optional properties unless they add value.
- Do not include comments inside JSON.


## Contributing

- **New widgets**: Open issue with use case
- **Parser/renderer ports**: PRs welcome
- **Spec changes**: Discuss in issues first

MIT © 2025
