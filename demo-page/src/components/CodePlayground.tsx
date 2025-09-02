import { useState } from 'react';
import { MarkdownUI } from '@markdown-ui/react';
import '@markdown-ui/react/widgets.css';
import { Marked } from 'marked';
import { markedUiExtension } from '@markdown-ui/marked-ext';

const marked = new Marked();
marked.use(markedUiExtension);

interface CodePlaygroundProps {
  defaultCode: string;
  title?: string;
  description?: string;
  showFrameworkTabs?: boolean;
}

const frameworks = [
  { id: 'react', name: 'React', active: true },
  { id: 'svelte', name: 'Svelte', active: false },
  { id: 'vue', name: 'Vue', active: false }
];

export default function CodePlayground({ 
  defaultCode, 
  title = "Try it yourself",
  description,
  showFrameworkTabs = true 
}: CodePlaygroundProps) {
  const [code, setCode] = useState(defaultCode);
  const [activeFramework, setActiveFramework] = useState('react');

  const wrappedCode = `\`\`\`markdown-ui-widget\n${code}\n\`\`\``;
  const renderedHtml = marked.parse(wrappedCode);

  const getFrameworkCode = (framework: string) => {
    const baseCode = `import { MarkdownUI } from '@markdown-ui/${framework}';
import '@markdown-ui/${framework}/widgets.css';
import { Marked } from 'marked';
import { markedUiExtension } from '@markdown-ui/marked-ext';

const marked = new Marked();
marked.use(markedUiExtension);

const markdown = \`${wrappedCode}\`;
const html = marked.parse(markdown);`;

    switch (framework) {
      case 'react':
        return `${baseCode}

export default function MyComponent() {
  return <MarkdownUI html={html} />;
}`;
      case 'svelte':
        return `<script>
  ${baseCode}
</script>

<MarkdownUI {html} />`;
      case 'vue':
        return `<script setup>
${baseCode}
</script>

<template>
  <MarkdownUI :html="html" />
</template>`;
      default:
        return baseCode;
    }
  };

  return (
    <div className="not-prose bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
        <h3 className="text-lg font-semibold text-gray-900 m-0">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 mt-1 mb-0">{description}</p>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-0">
        {/* Input Side */}
        <div className="bg-gray-50">
          {/* DSL Input */}
          <div className="p-4 border-b border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Markdown UI Widget DSL
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-24 p-3 border border-gray-300 rounded-md font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter widget DSL..."
            />
          </div>

          {/* Framework Code */}
          {showFrameworkTabs && (
            <div>
              <div className="flex border-b border-gray-200">
                {frameworks.map((framework) => (
                  <button
                    key={framework.id}
                    onClick={() => setActiveFramework(framework.id)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      activeFramework === framework.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {framework.name}
                  </button>
                ))}
              </div>
              <div className="p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {frameworks.find(f => f.id === activeFramework)?.name} Implementation
                </label>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                  <code>{getFrameworkCode(activeFramework)}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Output Side */}
        <div className="bg-white">
          <div className="p-4 border-b border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Live Preview</h4>
          </div>
          <div className="p-4">
            <div className="min-h-[120px] flex items-center justify-center">
              <MarkdownUI html={renderedHtml} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}