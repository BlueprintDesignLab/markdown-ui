<<<<<<< HEAD
# Svelte library

Everything you need to build a Svelte library, powered by [`sv`](https://npmjs.com/package/sv).

Read more about creating a library [in the docs](https://svelte.dev/docs/kit/packaging).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of your library, everything inside `src/routes` can be used as a showcase or preview app.

## Building

To build your library:

```sh
npm pack
```

To create a production version of your showcase app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Publishing

Go into the `package.json` and give your package the desired name through the `"name"` option. Also consider adding a `"license"` field and point it to a `LICENSE` file which you can create from a template (one popular option is the [MIT license](https://opensource.org/license/mit/)).

To publish your library to [npm](https://www.npmjs.com):

```sh
npm publish
```
=======
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
  
---

## Implementations

| Language | Package | Status |
|----------|---------|--------|
| React | `@markdown-ui/react` | ✅ |
| Svelte | `@markdown-ui/svelte` | ✅ |
| VS Code ext | `markdown-ui-vscode` | 🚧 |

---

## Contributing

- **Spec** → open an issue or PR in `markdown-ui/spec`  
- **New widgets** → prefix with `x-` until community adoption  
- **Renderer ports** → send a link to be listed above

---

## License

MIT © 2025 markdown-ui contributors
>>>>>>> ddf08a7f0f7c42d88a3f1a150cff4727d58569f8
