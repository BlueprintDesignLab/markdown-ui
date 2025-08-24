# Markdown UI
**Turn static docs into interactive experiences—instantly.**

✨ [Try the live demo](https://markdown-ui.com/) ✨

Transform any Markdown into clickable UI that works everywhere. Write once, render interactive widgets in any framework.

````markdown
```markdown-ui-widget
select env [dev prod]
```
````

That's it. Real dropdown, real events, zero setup.

## Why it's powerful

- **AI-ready**: LLMs generate interactive flows and gather feedback, all in Markdown
- **Built for humans and bots**: Works great typed by hand or produced with AI
- **Readable everywhere**: Preview rich UI, but if unsupported, it's still legible Markdown
- **Zero lock-in**: Pure spec—works with any Markdown parser + any UI framework

## Get started in 30 seconds

```bash
npm install @markdown-ui/svelte @markdown-ui/marked-ext
```

```javascript
import { MarkdownUI } from '@markdown-ui/svelte';
import { markedUiExtension } from '@markdown-ui/marked-ext';

// Your markdown with widgets → live UI
```

React or Vue? Use `@markdown-ui/react` or `@markdown-ui/vue` instead. Same API, same magic.

## What you can build

**Buttons & choices**
```markdown
button-group plan [Basic Pro Enterprise] Basic
```

**Dropdowns & multi-select** 
```markdown
select region [us-east us-west] us-east
select-multi tools [Docker Redis Postgres] [Docker]
```

**Text & numbers**
```markdown
text-input name "Your name" "Enter name here"
slider cpu 1 32 1 4
```

**Complex forms**
```markdown
form deploy "Launch"
  select env [dev prod] dev
  slider replicas 1 10 1 3
```

## How it works

1. **Write** widgets in Markdown using simple DSL syntax
2. **Parse** with our extension (or bring your own parser)  
3. **Render** as interactive components in your framework
4. **Listen** for events when users interact with widgets

Works with any Markdown parser + any UI framework. Zero lock-in.

## Available packages

**Parsers** ✅
- `@markdown-ui/mdui-lang` - DSL parser
- `@markdown-ui/marked-ext` - Marked.js extension

**Renderers** ✅  
- `@markdown-ui/svelte` - Svelte components
- `@markdown-ui/react` - React components
- `@markdown-ui/vue` - Vue components


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
