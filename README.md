# markdown-ui
An open standard for rendering interactive widgets in plain Markdown — zero dependencies.

markdown-ui is a micro-spec that lets Large Language Models embed buttons, sliders, toggles, forms inside standard Markdown.
If the renderer understands the spec → live UI.
If not → graceful static fallback.

```markdown
Choose an option:
  ```ui
  {
    "type": "button-group",
    "id": "q1",
    "choices": ["A", "B"],
    "label": "Pick one"
  }
  ```
```
