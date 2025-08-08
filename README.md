# markdown-ui
An open standard for rendering interactive widgets in plain Markdown — zero dependencies.

markdown-ui is a micro-spec that lets Large Language Models embed buttons, sliders, toggles, forms inside standard Markdown.
If the renderer understands the spec → live UI.
If not → graceful static fallback.

````markdown
Choose an option:
  ```ui
  {
    "type": "button-group",
    "id": "q1",
    "choices": ["A", "B"],
    "label": "Pick one"
  }
  ```
````

## Spec snapshot (v0.1)

- **Syntax**: fenced code block with info string `ui`  
- **Payload**: JSON5 (comments OK)  
- **Required keys**: `type`, `id`  
- **Value event**: `{ id, value }` emitted on interaction  

Full schema: [markdown-ui.dev/schema/v0.json](https://markdown-ui.dev/schema/v0.json)

---

## Supported widgets

| `type` | minimal props | returns |
|--------|---------------|---------|
| `button-group` | `choices` | string |
| `toggle` | `choices` (length 2) | boolean |
| `slider` | `min`, `max`, `step` | number |
| `select` | `choices` | string |
| `text-input` | `placeholder` | string |
| `form` | array of above | object |

---

## Security

- **Declarative JSON only** – no code execution  
- **Renderer allow-list** – unknown widgets ignored  
- **CSP-friendly** – uses native DOM elements

---

## Implementations

| Language | Package | Status |
|----------|---------|--------|
| React | `@markdown-ui/react` | ✅ |
| Svelte | `@markdown-ui/svelte` | ✅ |
| CLI (Node/Ink) | `@markdown-ui/cli` | ✅ |
| VS Code ext | `markdown-ui-vscode` | 🚧 |

---

## Contributing

- **Spec** → open an issue or PR in `markdown-ui/spec`  
- **New widgets** → prefix with `x-` until community adoption  
- **Renderer ports** → send a link to be listed above

---

## License

MIT © 2025 markdown-ui contributors
