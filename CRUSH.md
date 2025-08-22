CRUSH.md — Quick guide for agents working in this monorepo

Repo layout
- packages/@markdown-ui/*: react, svelte, vue (no package.json), marked-ext, mdui-lang
- demo-page: Astro 5 demo site using the published/local packages
- TypeScript + ESM everywhere

Build/lint/typecheck/test
- React pkg: npm --prefix packages/@markdown-ui/react run build | typecheck: npm --prefix packages/@markdown-ui/react run typecheck
- Svelte pkg: npm --prefix packages/@markdown-ui/svelte run build | check: npm --prefix packages/@markdown-ui/svelte run check
- Marked-ext: npm --prefix packages/@markdown-ui/marked-ext run build
- MDUI-lang (has tests):
  - Build: npm --prefix packages/@markdown-ui/mdui-lang run build
  - Test all: npm --prefix packages/@markdown-ui/mdui-lang run test
  - Test watch: npm --prefix packages/@markdown-ui/mdui-lang run test:watch
  - Single test file: npm --prefix packages/@markdown-ui/mdui-lang run test -- parser.test.ts
- Demo app (Astro): in demo-page → npm ci; dev: npm run dev; build: npm run build; preview: npm run preview; typecheck: npx tsc -p tsconfig.json --noEmit
- Linting: no eslint configured; Svelte package has svelte-check; optional: npx astro check in demo-page

Code style
- Imports: ESM only; order groups → node builtins, external deps, internal packages (@markdown-ui/*), then relative; prefer named exports for components
- Formatting: 2-space indent; semicolons; single quotes in TS/JS; keep .svelte/.vue/.astro templates minimal and consistent with surrounding files
- Types: prefer explicit types at module boundaries; avoid any; narrow unknown; use interfaces/types for component props; don’t rely on React.FC unless needed
- Naming: PascalCase for components; camelCase for functions/vars; UPPER_SNAKE for env vars; files named after primary export
- Errors: validate external input; throw Error for unrecoverables; never log secrets; UI surfaces user-safe messages
- Async: use async/await; always handle/rethrow rejections; debounce frequent editor/UI events
- CSS: widgets.css lives per framework; Tailwind 4 utilities in demo-page; avoid deep selectors

Release/publish
- Packages use prepublishOnly to build (react, marked-ext, mdui-lang). Build svelte before publishing. Vue folder is source-only (no package.json) and consumed as part of monorepo/dev.

Notes
- No Cursor rules (.cursor/rules or .cursorrules) or Copilot instructions found
- If you introduce lint/tests later, update this file with exact commands