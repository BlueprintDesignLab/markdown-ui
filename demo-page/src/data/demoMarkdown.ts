export const demoMarkdown = `# Make your Markdown come alive

Transform any Markdown note, checklist, or section of text into a live experience users can click, select, and submit—directly in your app or docs.

- **Instant UI from Markdown**: Anyone can write it, everyone can use it.
- **AI-ready**: LLMs generate interactive flows and gather feedback, all in Markdown.
- **Built for humans and bots**: Works great typed by hand or produced with an AI.
- **Readable everywhere**: Preview rich UI, but if unsupported, it’s still legible Markdown.

## See for yourself (edit anything below)

\`\`\`markdown-ui-widget
{ "type": "button-group", "id": "plan", "label": "Plan", "choices": ["Brainstorm", "Review", "Launch"], "default": "Brainstorm" }
\`\`\`

Pick a focus area:

\`\`\`markdown-ui-widget
select focus [Design Writing Research Planning] Writing
\`\`\`

Add tools to help you:

\`\`\`markdown-ui-widget
select-multi helpers [Reminders Templates Examples Checklists] [Reminders]
\`\`\`

## Gather quick details

\`\`\`markdown-ui-widget
form quick-form "Save"
  text-input title "Title" "Give this a name"
  slider time 15 120 15 45
  select mood [Chill Focused Energized] Focused
\`\`\`

## Why it’s powerful
- Copy-paste from into an LLM system prompt and use instantly
- Great for forms, surveys, guides, onboarding, or automating tasks
- LLMs generate UI for you, just describe your need
- Works in React, Svelte, and Vue, wherever Markdown is used

---

## Your turn
Change, remix, or extend this markdown and see the UI update live!`;
