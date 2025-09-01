# @markdown-ui/vue
**Transform Markdown into interactive Vue components—instantly.**

Turn static docs into live experiences users can click, select, and submit.

✨ [Try the live demo](https://markdown-ui.com/) ✨

## Get started in 30 seconds

```bash
npm install @markdown-ui/vue @markdown-ui/marked-ext marked
```

```vue
<template>
  <MarkdownUI :html="html" @widgetEvent="handleWidgetEvent" />
</template>

<script setup>
import { MarkdownUI } from '@markdown-ui/vue'
import '@markdown-ui/vue/widgets.css'
import { Marked } from 'marked'
import { markedUiExtension } from '@markdown-ui/marked-ext'

const marked = new Marked()
marked.use(markedUiExtension)

const markdown = `
\`\`\`markdown-ui-widget
select env [dev staging prod]
\`\`\`
`

const html = marked.parse(markdown)

const handleWidgetEvent = (event) => {
  console.log('User selected:', event.detail)
}
</script>
```

## What you can build

**Quick inputs**
```vue
text-input username "Username" "Enter name"
button-group env [dev staging prod] dev
select region [us-east us-west] us-east
```

**Complex forms**
```vue
form deploy "Launch"
  text-input name "App Name"
  slider replicas 1 10 1 3
  select env [dev prod] dev
```

**Interactive charts**
```vue
chart-line
title: Monthly Revenue
height: 300
Month,Sales,Target
Jan,45000,50000
Feb,52000,50000
Mar,48000,55000
```

**Events made simple**
```vue
const handleWidgetEvent = (event) => {
  const { id, value } = event.detail
  // That's it - perfect event data
}
```

## TypeScript ready

Full type safety out of the box. All components and events are properly typed for the best developer experience.

## Works everywhere

**SSR-safe by design.** No special setup needed for Nuxt or any Vue framework.

```vue
// Just import and use - SSR handled automatically
import { MarkdownUI } from '@markdown-ui/vue'
```

**Compatibility:** Vue 3+, Nuxt, Vite, and all modern Vue tooling.

MIT © 2025