import { MarkdownUI } from '@markdown-ui/react';
import '@markdown-ui/react/widgets.css';
import { Marked } from 'marked';
import { markedUiExtension } from '@markdown-ui/marked-ext';

const marked = new Marked();
marked.use(markedUiExtension);

export default function SvelteDemoReact() {
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

  return (
    <div className="flex flex-col min-h-[400px]">
      <div className="flex justify-between items-center p-4 bg-white border-b border-neutral-200">
        <h3 className="m-0 text-[15px] font-medium text-neutral-800">Svelte Demo</h3>
        <div className="text-xs text-neutral-500 font-mono">@markdown-ui/svelte</div>
      </div>
      <div className="flex-1 p-6">
        <MarkdownUI html={renderedHtml} />
      </div>
    </div>
  );
}
