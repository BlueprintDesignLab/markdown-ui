# Markdown UI
**Micro-spec for interactive widgets inside Markdown.**  

See the [live demo here](https://markdown-ui.blueprintlab.io/).

If your renderer supports it → live UI. If not → graceful fallback.

````markdown
```markdown-ui-widget
{ "type": "select", "id": "env", "choices": ["dev", "prod"] }
```
````

> NEW
Or use the more concise DSL syntax in the same tag:

````markdown
```markdown-ui-widget
select env [dev prod]
```
````

Both become an actual dropdown that emits `{id: "env", value: "prod"}` events.

## Why Markdown UI?

- **LLM-Native**: Designed for AI to generate interactive experiences
- **Zero Dependencies**: Pure specification, bring your own parser/renderer  
- **Cross-Platform**: Works with any Markdown parser + any UI framework
- **Secure**: JSON-only, no code execution
- **Progressive**: Graceful fallback to code blocks

## Quick Start

1. **Choose your stack**: We support Svelte and React
2. **Install renderer**: `npm install @markdown-ui/svelte` or `npm install @markdown-ui/react`  
3. **Parse markdown**: Use `@markdown-ui/marked-ext` or any parser
4. **Render**: Components handle the rest

```javascript
// Svelte
import { MarkdownUI } from '@markdown-ui/svelte';

// React  
import { MarkdownUI } from '@markdown-ui/react';
// Your markdown with markdown-ui-widget blocks becomes interactive
```

## Supported Widgets

| Widget | Purpose | Events |
|--------|---------|--------|
| **button-group** | A/B choices, yes/no | `string` |
| **select** | Dropdown, multi-select | `string \| string[]` |
| **select-multi** | Tag selection | `string[]` |
| **slider** | Numeric input | `number` |  
| **text-input** | Free text | `string` |
| **form** | Composite widget | `object` |

## Architecture

**Parser** (`marked-ext`) → Converts `markdown-ui-widget` blocks to standardized XML  
**Renderer** (`svelte` | `react`) → XML becomes interactive components + events
**Events** When users interact with the UI components, it emits `CustomEvent<{id, value}>` objects which your application can handle.

This separation lets you mix any parser with any renderer.

## Implementations

| Package | Status |
|---------|---------|
| `@markdown-ui/marked-ext` (Parser) | ✅ Complete |
| `@markdown-ui/svelte` (Renderer) | ✅ Complete |
| `@markdown-ui/react` (Renderer) | ✅ Complete |

## Package Links

- **DSL Parser**: [@markdown-ui/mdui-lang](https://www.npmjs.com/package/@markdown-ui/mdui-lang)
- **Parser**: [@markdown-ui/marked-ext](https://www.npmjs.com/package/@markdown-ui/marked-ext)
- **Svelte Renderer**: [@markdown-ui/svelte](https://www.npmjs.com/package/@markdown-ui/svelte)
- **React Renderer**: [@markdown-ui/react](https://www.npmjs.com/package/@markdown-ui/react)


## Copyable System Prompt For LLMs

````text
You can embed interactive UI widgets in Markdown using fenced code blocks with language "markdown-ui-widget". 

**DSL Format:**
Use concise DSL syntax for more ergonomic widget definitions.

**DSL Format Examples:**

1. text-input
```markdown-ui-widget
text-input username "Username" "Enter username" "john"
```

2. button-group
```markdown-ui-widget
button-group env [dev staging prod] dev
```

3. select
```markdown-ui-widget
select region [us-east-1 us-west-2] us-east-1
```

4. select-multi
```markdown-ui-widget
select-multi services [redis postgres nginx] [redis]
```

5. slider
```markdown-ui-widget
slider cpu 1 32 1 4
```

6. form
```markdown-ui-widget
form config "Deploy"
  select env [dev prod]
  slider replicas 1 10 1
```


Output rules:
- Use one widget per fenced code block. Only one widget per response.
- Keep all surrounding content as normal Markdown prose outside the widget code fences.
- Only use the widget types listed above; do not invent new types.
- DSL: Use concise syntax; parameters after id are positional and optional.
````

## DSL Syntax Reference

The `markdown-ui-widget` blocks support both JSON and a concise **DSL syntax**. The DSL is 60-70% shorter than JSON while maintaining full functionality.

### Atomic Widgets (single line)

```
text-input id label placeholder default
button-group id [choice1 choice2 ...] default
select id [choice1 choice2 ...] default  
select-multi id [choice1 choice2 ...] default
slider id min max step default
```

### Form Widget (multi-line with indentation)

```
form id [submitLabel]
  text-input id label placeholder default
  select id [choice1 choice2 ...] default
  ...
```

### DSL Rules

- **Tokens**: Separated by one or more spaces
- **Arrays**: Wrapped in `[]`, items separated by spaces
- **Quotes**: Use double quotes `"..."` for strings with spaces or brackets
- **Indentation**: Form fields indented exactly 2 spaces
- **Positioning**: Parameters after `id` are positional and optional

### Examples

```markdown
# Simple widgets
text-input username "Username" "Enter username" "john"
button-group env [dev staging prod] dev
select region [us-east-1 us-west-2] us-east-1
slider cpu 1 32 1 4

# Complex form
form server-config "Deploy"
  text-input name "Server Name" 
  select env [dev prod] dev
  slider replicas 1 10 1 3
```


## Contributing

- **New widgets**: Open issue with use case
- **Parser/renderer ports**: PRs welcome
- **Spec changes**: Discuss in issues first

MIT © 2025
