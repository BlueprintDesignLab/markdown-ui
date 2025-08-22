<script lang="ts">
  import { MarkdownUI } from '@markdown-ui/svelte';
  import '@markdown-ui/svelte/widgets.css';
  import { Marked } from 'marked';
  import { markedUiExtension } from '@markdown-ui/marked-ext';

  const marked = new Marked();
  marked.use(markedUiExtension);

  const exampleMarkdown = `# Svelte Implementation

This demo runs using **@markdown-ui/svelte**:

\`\`\`markdown-ui-widget
button-group svelte-choice [Components Stores Actions] Components
\`\`\`

\`\`\`markdown-ui-widget
select svelte-version [4 5] 5
\`\`\`

\`\`\`markdown-ui-widget
slider svelte-reactivity 1 10 1 8
\`\`\`

The widgets above emit events when you interact with them, demonstrating Svelte's reactive state management.`;

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
