<script lang="ts">
  import { MarkdownUI } from '@markdown-ui/svelte';
  import '@markdown-ui/svelte/widgets.css';
  import { Marked } from 'marked';
  import { markedUiExtension } from '@markdown-ui/marked-ext';

  const marked = new Marked();
  marked.use(markedUiExtension);

  const exampleMarkdown = `# Svelte Implementation

This demo runs using **@markdown-ui/svelte**:

## Interactive Widgets

\`\`\`markdown-ui-widget
button-group svelte-choice [Components Stores Actions] Components
\`\`\`

\`\`\`markdown-ui-widget
select svelte-version [4 5] 5
\`\`\`

\`\`\`markdown-ui-widget
slider svelte-reactivity 1 10 1 8
\`\`\`

## Interactive Charts

\`\`\`markdown-ui-widget
chart-line sales_chart "Monthly Sales Growth"
Month,Sales,Target
Jan,120,100
Feb,150,140
Mar,180,160
Apr,220,200
May,280,250
\`\`\`

\`\`\`markdown-ui-widget
chart-bar revenue_chart "Quarterly Revenue"
Quarter,Revenue
Q1,125000
Q2,150000
Q3,175000
Q4,200000
\`\`\`

\`\`\`markdown-ui-widget
chart-pie market_share "Market Share"
Product,Share
Product A,35
Product B,28
Product C,22
Product D,15
\`\`\`

The widgets and charts above emit events when you interact with them, demonstrating Svelte's reactive state management and Chart.js integration.`;

  const renderedHtml = marked.parse(exampleMarkdown);
</script>

<div class="flex flex-col min-h-[400px]">
  <div class="flex justify-between items-center p-4 bg-white border-b border-neutral-200">
    <h3 class="m-0 text-[15px] font-medium text-neutral-800">Svelte Demo</h3>
    <div class="text-xs text-neutral-500 font-mono">@markdown-ui/svelte</div>
  </div>
  <div class="flex-1 p-6">
    <MarkdownUI html={renderedHtml} />
  </div>
</div>
