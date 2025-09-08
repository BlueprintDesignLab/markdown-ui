# Markdown UI

**Turn static docs into interactive experiences—instantly.**

✨ [Try the live demo](https://markdown-ui.com/) ✨

Transform any Markdown into clickable UI that works everywhere. Write once, render interactive widgets in any framework.

````markdown
```markdown-ui-widget
select env [dev prod]
```
````

## Why it's powerful

- **AI-ready**: LLMs generate interactive flows and gather feedback, all in Markdown
- **Built for humans and bots**: Works great typed by hand or produced with AI
- **Readable everywhere**: Preview rich UI, but if unsupported, it's still legible Markdown
- **Zero lock-in**: Pure spec—works with any Markdown parser + any UI framework

## Get started in 30 seconds

```bash
npm install @markdown-ui/react @markdown-ui/marked-ext
```

````javascript
import { MarkdownUI } from "@markdown-ui/react";
import { Marked } from "marked";
import { markedUiExtension } from "@markdown-ui/marked-ext";

const marked = new Marked().use(markedUiExtension);
const html = marked.parse("```markdown-ui-widget\nselect env [dev prod]\n```");

<MarkdownUI html={html} />;
````

Prefer Svelte or Vue? Use [`@markdown-ui/svelte`](https://www.npmjs.com/package/@markdown-ui/svelte) or [`@markdown-ui/vue`](https://www.npmjs.com/package/@markdown-ui/vue) instead. Same API, same magic.

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

**Interactive charts**

```markdown
chart-line
title: Monthly Sales
Month,Sales,Target
Jan,100,120
Feb,150,140
Mar,200,180
```

**Quizzzes with feedback**

```markdown
quiz js-fundamentals "JavaScript Fundamentals Quiz"
showScore: true
showProgress: true
passingScore: 70
mcq q1 "What is JavaScript?" 10 ["Programming language" "Markup language" "Database"] "Programming language"
short-answer q2 "Name a JavaScript framework" 15 "Enter framework name" ["React" "Vue" "Angular" "Svelte"]
mcq q3 "JavaScript is typed as?" 5 ["Static" "Dynamic" "Both"] "Dynamic"
short-answer q4 "What does 'DOM' stand for?" 20 "Enter your answer" ["Document Object Model"]
```

## How it works

1. **Write** widgets in Markdown using simple DSL syntax
2. **Parse** with our extension (or bring your own parser)
3. **Render** as interactive components in your framework
4. **Listen** for events when users interact with widgets

Works with any Markdown parser + any UI framework. Zero lock-in.

📚 **[View Full Documentation & Spec →](https://markdown-ui.com/spec)**

## Available packages

**Parsers** ✅

- [`@markdown-ui/mdui-lang`](https://www.npmjs.com/package/@markdown-ui/mdui-lang) - Core DSL parser for converting widget syntax to JSON
- [`@markdown-ui/marked-ext`](https://www.npmjs.com/package/@markdown-ui/marked-ext) - Marked.js extension with integrated parser

**Renderers** ✅

- [`@markdown-ui/svelte`](https://www.npmjs.com/package/@markdown-ui/svelte) - Svelte components with full chart support
- [`@markdown-ui/react`](https://www.npmjs.com/package/@markdown-ui/react) - React components with full chart support
- [`@markdown-ui/vue`](https://www.npmjs.com/package/@markdown-ui/vue) - Vue components with full chart support

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
- chart-line, chart-bar, chart-pie, chart-scatter (multi-line with CSV data)
 - multiple-choice-question id "Question text" ["Choice A" "Choice B" ...] "CorrectChoice"? showFeedback?
 - short-answer-question id "Question text" "Placeholder"? ("CorrectAnswer" | ["Answer1" "Answer2" ...])? showFeedback?
 - quiz id "Title" (multi-line)
   - Optional config lines (before questions):
     - showScore: true|false
     - showProgress: true|false
     - passingScore: 0-100
   - Question lines (one per line):
     - mcq qId "Question text" points ["A" "B" ...] "CorrectChoice"?
     - short-answer qId "Question text" points "Placeholder"? ("Answer" | ["Answer1" "Answer2"])?

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

Charts:
```markdown-ui-widget
chart-line
title: Monthly Revenue
height: 300
Month,Sales,Target
Jan,45000,50000
Feb,52000,50000
Mar,48000,55000
```

Multiple Choice Question (basic):
```markdown-ui-widget
multiple-choice-question q1 "Which planet is known as the Red Planet?" ["Mars" "Venus" "Jupiter" "Mercury"]
```

Multiple Choice Question (with feedback):
```markdown-ui-widget
multiple-choice-question q2 "Capital of France?" ["Paris" "Berlin" "Rome" "Madrid"] "Paris" true
```

Short Answer Question (basic):
```markdown-ui-widget
short-answer-question q3 "What does HTML stand for?"
```

Short Answer Question (with validation):
```markdown-ui-widget
short-answer-question q4 "What is 2 + 2?" "Enter a number" "4" true
```

Short Answer Question (with multiple accepted answers):
```markdown-ui-widget
short-answer-question q5 "Name a JS framework" "Enter a name" [React Vue Angular Svelte] true
```

Quiz (mixed questions with scoring):
```markdown-ui-widget
quiz js-fundamentals "JavaScript Fundamentals Quiz"
showScore: true
showProgress: true
passingScore: 70
mcq q1 "What is JavaScript?" 10 ["Programming language" "Markup language" "Database"] "Programming language"
short-answer q2 "Name a JavaScript framework" 15 "Enter framework name" ["React" "Vue" "Angular" "Svelte"]
mcq q3 "JavaScript is typed as?" 5 ["Static" "Dynamic" "Both"] "Dynamic"
short-answer q4 "What does 'DOM' stand for?" 20 "Enter your answer" ["Document Object Model"]
```

**Output Rules:**
- One widget per code block
- Use quotes for any text with spaces
- Parameters after ID are positional and optional
- Form fields must be indented exactly 2 spaces
- Chart data follows CSV format with headers
 - Only use the listed widget types
````

## Contributing

- **New widgets**: [Open issue](https://github.com/BlueprintDesignLab/markdown-ui/issues/new) with use case
- **Parser/renderer ports**: [PRs welcome](https://github.com/BlueprintDesignLab/markdown-ui/pulls)
- **Spec changes**: [Discuss in issues](https://github.com/BlueprintDesignLab/markdown-ui/issues) first

## Resources

- 🌐 **[Live Demo](https://markdown-ui.com/)** - Try all widgets interactively
- 📖 **[Technical Specification](https://markdown-ui.com/spec)** - Complete spec documentation
- 📦 **[npm Packages](https://www.npmjs.com/search?q=%40markdown-ui)** - All available packages
- 🐙 **[GitHub Repository](https://github.com/BlueprintDesignLab/markdown-ui)** - Source code & issues

MIT © 2025
