export const reactExample = `import { MarkdownUI } from '@markdown-ui/react';
import '@markdown-ui/react/widgets.css';
import { Marked } from 'marked';
import { markedUiExtension } from '@markdown-ui/marked-ext';

const marked = new Marked();
marked.use(markedUiExtension);

export default function ReactDemo() {
  const exampleMarkdown = \`# React Implementation
This demo runs using **@markdown-ui/react**:

\`\`\`markdown-ui-widget
button-group react-choice [Hooks Context Redux] Hooks
\`\`\`
\`\`\`markdown-ui-widget
select react-version [16 17 18 19] 18
\`\`\`
\`\`\`markdown-ui-widget
slider react-components 1 50 1 12
\`\`\`\`;

  const renderedHtml = marked.parse(exampleMarkdown);
  return <MarkdownUI html={renderedHtml} />;
}`;

export const svelteExample = `<script lang="ts">
  import { MarkdownUI } from '@markdown-ui/svelte';
  import '@markdown-ui/svelte/widgets.css';
  import { Marked } from 'marked';
  import { markedUiExtension } from '@markdown-ui/marked-ext';

  const marked = new Marked();
  marked.use(markedUiExtension);

  const exampleMarkdown = \`# Svelte Implementation

This demo runs using **@markdown-ui/svelte**:

\`\`\`markdown-ui-widget
button-group svelte-choice [Components Stores Actions] Components
\`\`\`
\`\`\`markdown-ui-widget
select svelte-version [4 5] 5
\`\`\`
\`\`\`markdown-ui-widget
slider svelte-reactivity 1 10 1 8
\`\`\`\`;

  const renderedHtml = marked.parse(exampleMarkdown);
</script>

<MarkdownUI html={renderedHtml} />`;

export const vueExample = `<template>
  <MarkdownUI :html="html" />
</template>

<script setup lang="ts">
import { MarkdownUI } from '@markdown-ui/vue'
import '@markdown-ui/vue/widgets.css'
import { Marked } from 'marked'
import { markedUiExtension } from '@markdown-ui/marked-ext'

const marked = new Marked()
marked.use(markedUiExtension)

const exampleMarkdown = \`# Vue Implementation

This demo runs using **@markdown-ui/vue**:
\`\`\`markdown-ui-widget
button-group vue-choice [Composition Options Pinia] Composition
\`\`\`
\`\`\`markdown-ui-widget
select vue-version [2 3] 3
\`\`\`
\`\`\`markdown-ui-widget
slider vue-reactivity 1 10 1 9
\`\`\`\`

const html = marked.parse(exampleMarkdown)
</script>`;