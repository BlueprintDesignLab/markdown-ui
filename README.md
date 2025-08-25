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
select region ["US East" "US West"] "US East"
select-multi tools [Docker "Redis Cache" Postgres] [Docker]
```

**Text & numbers**
```markdown
text-input name "Your name" "Enter name here"
slider cpu 1 32 1 4
```

**Complex forms**
```markdown
form deploy "Launch"
  select env ["Development" "Production"] "Development"
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

## DSL Syntax Reference

**Widget Types:**
- text-input id "label" "placeholder" "default"
- button-group id ["Choice 1" "Choice 2" ...] "default"
- select id ["Option A" "Option B" ...] "default"  
- select-multi id ["Item 1" "Item 2" ...] ["default1" "default2"]
- slider id min max step default
- form id "Submit Label" (multi-line with 2-space indented fields)

**Quoting Rules:**
- Use quotes for ANY text containing spaces: "User Name", "New York"
- Arrays support mixed quoting: [Simple "Complex Item" Another]
- Required quotes: labels, placeholders, array items with spaces
- Optional quotes: single words, numbers

**Examples:**

Text Input:
```markdown-ui-widget
text-input email "Email Address" "Enter your email" "user@example.com"
```

Button Groups:
```markdown-ui-widget
button-group plan ["Basic Plan" "Pro Plan" "Enterprise"] "Basic Plan"
```

Dropdowns:
```markdown-ui-widget
select region ["US East" "US West" "Europe"] "US East"
```

Multi-Select:
```markdown-ui-widget
select-multi tools [Docker "Redis Cache" "PostgreSQL DB"] [Docker]
```

Sliders:
```markdown-ui-widget
slider cpu 1 32 1 4
```

Forms:
```markdown-ui-widget
form deployment "Deploy Now"
  text-input name "App Name"
  select env ["Development" "Production"] "Development"
  slider replicas 1 10 1 3
```

**Output Rules:**
- One widget per code block
- Use quotes for any text with spaces
- Parameters after ID are positional and optional
- Form fields must be indented exactly 2 spaces
- Only use the 6 widget types above
````

## Contributing

- **New widgets**: Open issue with use case
- **Parser/renderer ports**: PRs welcome
- **Spec changes**: Discuss in issues first

MIT © 2025
