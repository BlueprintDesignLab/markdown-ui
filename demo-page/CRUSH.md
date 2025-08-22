CRUSH.md — Project quickguide for agents

Project type: Astro 5 + Svelte 5 + React 19 + TS. No test framework configured yet. Tailwind 4 present.

Commands
- Install deps: npm ci  # or npm i
- Dev server: npm run dev
- Build: npm run build
- Preview build: npm run preview
- Astro CLI: npm run astro -- <subcommand>
- Typecheck: npx tsc -p tsconfig.json --noEmit
- Lint: none configured. If needed, use: npx astro check
- Tests: none configured. Single-test not applicable yet

Recommended test setup (if you need tests)
- Add: npm i -D vitest @vitest/ui @testing-library/{dom,react,svelte} jsdom
- Scripts: "test": "vitest", "test:ui": "vitest --ui", "test:run": "vitest run", "test:file": "vitest run --reporter=verbose -- ", then run: npm run test:file path/to.spec.ts

Repo conventions
- Modules: type: module; use ESM imports; .astro, .svelte, .tsx co-exist
- Imports: absolute from src/ with tsconfig paths if added; otherwise relative. Group: node builtins, deps, local; no default export for components unless existing files do
- Formatting: 2-space indent, semicolons, single quotes in TS/JS; keep Astro/Svelte style consistent with files. Run formatters locally if present (none configured)
- Types: prefer explicit types at boundaries; enable strict TS assumptions when coding; avoid any; narrow unknown; use React.FC only when children typing is needed
- Naming: PascalCase for components (React/Svelte/Astro), camelCase for functions/vars, UPPER_SNAKE for env vars
- State: keep UI logic in Svelte/React components; avoid cross-framework coupling; colocate component-specific files under src/components
- Error handling: fail fast with thrown Error on unrecoverables; guard external input; never log secrets; surface user-safe messages in UI
- Async: use async/await; handle rejection paths; debounce/throttle editor events if needed
- CSS: Tailwind utility-first; custom styles in src/styles/global.css; prefer class composition over deep selectors
- Accessibility: label interactive controls; use semantic tags; ensure focus management for chat/editor demos

Environment
- Required keys may be needed for OpenAI-powered demos (OPENAI_API_KEY). Add a .env locally (not committed) and reference via import.meta.env if promoted to runtime

Notes
- No Cursor/Copilot instruction files found
- If you add lint/tests later, update this CRUSH.md with exact commands