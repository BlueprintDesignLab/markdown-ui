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

## Interactive Charts & Data Visualization

Charts make data come alive. Click on any data point to see events!

### Monthly Progress

\`\`\`markdown-ui-widget
chart-line
id: progress
title: Monthly Progress
height: 300
Month,Tasks,Goals
Jan,85,80
Feb,92,85
Mar,78,90
Apr,94,95
May,105,100
\`\`\`

### Revenue by Quarter (Tall Chart)

\`\`\`markdown-ui-widget
chart-bar
id: revenue
title: Quarterly Revenue
height: 400
Quarter,Revenue
Q1,125000
Q2,150000
Q3,175000
Q4,200000
\`\`\`

### Project Distribution (Compact)

\`\`\`markdown-ui-widget
chart-pie
id: time-distribution
title: Project Time Distribution
height: 250
Category,Hours
Development,45
Design,25
Research,15
Documentation,15
\`\`\`

### Sales Performance (Custom Height)

\`\`\`markdown-ui-widget
chart-line
id: sales
title: Sales vs Target
height: 350
id: sales_performance
Month,Sales,Target
Jan,45000,50000
Feb,52000,50000
Mar,48000,55000
Apr,61000,60000
May,58000,60000
Jun,67000,65000
\`\`\`

## Why it's powerful
- Copy-paste from into an LLM system prompt and use instantly
- Great for forms, surveys, guides, onboarding, or automating tasks
- LLMs generate UI for you, just describe your need
- Works in React, Svelte, and Vue, wherever Markdown is used

---

## Your turn
Change, remix, or extend this markdown and see the UI update live!`;
