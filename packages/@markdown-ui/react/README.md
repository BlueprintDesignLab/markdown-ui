# @markdown-ui/react
**Transform Markdown into interactive React components—instantly.**

Turn static docs into live experiences users can click, select, and submit.

✨ [Try the live demo](https://markdown-ui.com/) ✨

## Get started in 30 seconds

```bash
npm install @markdown-ui/react @markdown-ui/marked-ext marked
```

```tsx
import { MarkdownUI } from '@markdown-ui/react';
import '@markdown-ui/react/widgets.css';
import { Marked } from 'marked';
import { markedUiExtension } from '@markdown-ui/marked-ext';

const marked = new Marked();
marked.use(markedUiExtension);

const markdown = `
\`\`\`markdown-ui-widget
select env [dev staging prod]
\`\`\`
`;

function App() {
  const handleWidgetEvent = (event) => {
    console.log('User selected:', event.detail);
  };

  return (
    <MarkdownUI 
      html={marked.parse(markdown)} 
      onWidgetEvent={handleWidgetEvent} 
    />
  );
}
```

## What you can build

**Quick inputs**
```tsx
text-input username "Username" "Enter name"
button-group env [dev staging prod] dev
select region [us-east us-west] us-east
```

**Complex forms**
```tsx
form deploy "Launch"
  text-input name "App Name"
  slider replicas 1 10 1 3
  select env [dev prod] dev
```

**Events made simple**
```tsx
const handleWidgetEvent = (event) => {
  const { id, value } = event.detail;
  // That's it - perfect event data
};
```

## TypeScript ready

Full type safety out of the box. All components and events are properly typed for the best developer experience.

## Works everywhere

**SSR-safe by design.** No special setup needed for Next.js, Remix, or any React framework.

```tsx
// Just import and use - SSR handled automatically
import { MarkdownUI } from '@markdown-ui/react';
```

**Compatibility:** React 18+, Next.js, Remix, Create React App, Vite, and all modern React frameworks.

MIT © 2025