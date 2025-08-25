import { MarkdownUI } from '@markdown-ui/react';
import '@markdown-ui/react/widgets.css';
import { Marked } from 'marked';
import { markedUiExtension } from '@markdown-ui/marked-ext';

const marked = new Marked();
marked.use(markedUiExtension);

const exampleMarkdown = `# React Implementation

This demo runs using **@markdown-ui/react**:

\`\`\`markdown-ui-widget
button-group react-choice [Hooks Context Redux] Hooks
\`\`\`

\`\`\`markdown-ui-widget
select react-version [16 17 18 19] 18
\`\`\`

\`\`\`markdown-ui-widget
slider react-components 1 50 1 12
\`\`\``;

const renderedHtml = marked.parse(exampleMarkdown);

export default function ReactDemo() {

  return (
    <div className="flex flex-col min-h-[400px]">
      <div className="flex justify-between items-center p-4 bg-white border-b border-neutral-200">
        <h3 className="m-0 text-[15px] font-medium text-neutral-800">React Demo</h3>
        <div className="text-xs text-neutral-500 font-mono">@markdown-ui/react</div>
      </div>
      <div className="flex-1 p-6">
        <MarkdownUI html={renderedHtml} />
      </div>
    </div>
  );
}