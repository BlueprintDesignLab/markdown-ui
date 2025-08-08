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

## Features
- Markdown-native – embed widgets inside standard fenced code blocks (```ui).
- Zero-friction adoption – renderers ignore unknown blocks, so your malformatted content is handled gracefully.
- Framework-agnostic – works with React, Vue, Svelte, CLI, e-mail, or static-site generators.
- Declarative & safe – JSON-only, no code execution, CSP-friendly.
- Tiny footprint – spec < 1 kB, parser < 200 LOC.
- Extensible – community widgets use the x- prefix; core spec never breaks.
- i18n / a11y ready – built-in label and ariaLabel fields.
- Single-file schema – one canonical JSON Schema file for validation.

## Spec snapshot (v0.1)

- **Syntax**: fenced code block with info string `ui`  
- **Payload**: JSON5 (comments OK)  
- **Required keys**: `type`, `id`  
- **Value event**: `{ id, value }` emitted on interaction  

Full schema: [markdown-ui.dev/schema/v0.json](https://markdown-ui.dev/schema/v0.json)

---

| Type             | Required props                   | Optional props                          | Emitted value          | Typical use                                 |
| ---------------- | -------------------------------- | --------------------------------------- | ---------------------- | ------------------------------------------- |
| **button-group** | `choices: string[]`              | `label`, `default`                      | single `string`        | Yes / No, A / B / C                         |
| **select**       | `choices: string[]`              | `label`, `default`, `multiple: boolean` | `string` or `string[]` | Drop-down or multi-select                   |
| **slider**       | `min`, `max`                     | `step`, `default`, `label`              | `number`               | 0 – 100 %                                   |
| **text-input**   | —                                | `placeholder`, `default`, `label`       | `string`               | Free-form text                              |
| **form**         | `fields: array` of widgets above | `submitLabel` (default `"Submit"`)      | `{ [id]: value, ... }` | Group several inputs with one submit button |

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
