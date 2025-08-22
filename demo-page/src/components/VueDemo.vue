<template>
  <div class="flex flex-col min-h-[400px]">
    <div class="flex justify-between items-center p-4 bg-white border-b border-neutral-200">
      <h3 class="m-0 text-[15px] font-medium text-neutral-800">Vue Demo</h3>
      <div class="text-xs text-neutral-500 font-mono">@markdown-ui/vue</div>
    </div>
    <div class="flex-1 p-6">
      <MarkdownUI :html="html" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { MarkdownUI } from '@markdown-ui/vue'
import '@markdown-ui/vue/widgets.css'
import { Marked } from 'marked'
import { markedUiExtension } from '@markdown-ui/marked-ext'

const marked = new Marked()
marked.use(markedUiExtension)

const exampleMarkdown = `# Vue Implementation

This demo runs using **@markdown-ui/vue**:

\`\`\`markdown-ui-widget
button-group vue-choice [Composition Options Pinia] Composition
\`\`\`

\`\`\`markdown-ui-widget
select vue-version [2 3] 3
\`\`\`

\`\`\`markdown-ui-widget
slider vue-reactivity 1 10 1 9
\`\`\`

The widgets above emit events when you interact with them, demonstrating Vue's reactive state management.`

const html = marked.parse(exampleMarkdown)
</script>
