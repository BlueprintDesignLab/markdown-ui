import { P as current_component, z as push, Q as fallback, G as attr_class, I as escape_html, R as bind_props, B as pop, S as stringify, E as ensure_array_like, T as copy_payload, U as assign_payload } from "../../../chunks/index2.js";
import "clsx";
import { M as MarkdownUI } from "../../../chunks/MarkdownUI.js";
import { Marked } from "marked";
import { markedUiExtension } from "@markdown-ui/marked-ext";
/* empty css                      */
import { basicSetup } from "codemirror";
import { EditorView, keymap, placeholder } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { indentWithTab } from "@codemirror/commands";
import { indentUnit } from "@codemirror/language";
import { markdown } from "@codemirror/lang-markdown";
function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
function CodeMirror($$payload, $$props) {
  push();
  let classes = fallback($$props["class"], "");
  let value = fallback($$props["value"], "");
  let basic = fallback($$props["basic"], true);
  let lang = fallback($$props["lang"], () => void 0, true);
  let theme = fallback($$props["theme"], () => void 0, true);
  let extensions = fallback($$props["extensions"], () => [], true);
  let useTab = fallback($$props["useTab"], true);
  let tabSize = fallback($$props["tabSize"], 2);
  let styles = fallback($$props["styles"], () => void 0, true);
  let lineWrapping = fallback($$props["lineWrapping"], false);
  let editable = fallback($$props["editable"], true);
  let readonly = fallback($$props["readonly"], false);
  let placeholder$1 = fallback($$props["placeholder"], () => void 0, true);
  let nodebounce = fallback($$props["nodebounce"], false);
  const is_browser = typeof window !== "undefined";
  let view;
  onDestroy(() => view?.destroy());
  function get_base_extensions(basic2, useTab2, tabSize2, lineWrapping2, placeholder2, editable2, readonly2, lang2) {
    const extensions2 = [
      indentUnit.of(" ".repeat(tabSize2)),
      EditorView.editable.of(editable2),
      EditorState.readOnly.of(readonly2)
    ];
    if (basic2) extensions2.push(basicSetup);
    if (useTab2) extensions2.push(keymap.of([indentWithTab]));
    if (placeholder2) extensions2.push(placeholder(placeholder2));
    if (lang2) extensions2.push(lang2);
    if (lineWrapping2) extensions2.push(EditorView.lineWrapping);
    return extensions2;
  }
  function get_theme(theme2, styles2) {
    const extensions2 = [];
    if (styles2) extensions2.push(EditorView.theme(styles2));
    if (theme2) extensions2.push(theme2);
    return extensions2;
  }
  [
    ...get_base_extensions(basic, useTab, tabSize, lineWrapping, placeholder$1, editable, readonly, lang),
    ...get_theme(theme, styles),
    ...extensions
  ];
  if (is_browser) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<div${attr_class(`codemirror-wrapper ${stringify(classes)}`, "svelte-kcx0g9")}></div>`);
  } else {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`<div${attr_class(`scm-waiting ${stringify(classes)}`, "svelte-kcx0g9")}><div class="scm-waiting__loading scm-loading svelte-kcx0g9"><div class="scm-loading__spinner svelte-kcx0g9"></div> <p class="scm-loading__text svelte-kcx0g9">Loading editor...</p></div> <pre class="scm-pre cm-editor svelte-kcx0g9">${escape_html(value)}</pre></div>`);
  }
  $$payload.out.push(`<!--]-->`);
  bind_props($$props, {
    class: classes,
    value,
    basic,
    lang,
    theme,
    extensions,
    useTab,
    tabSize,
    styles,
    lineWrapping,
    editable,
    readonly,
    placeholder: placeholder$1,
    nodebounce
  });
  pop();
}
function WidgetEvents($$payload, $$props) {
  push();
  let { events = [], onClear = null, showClearButton = false } = $$props;
  const each_array = ensure_array_like(events);
  $$payload.out.push(`<div class="events-panel svelte-hbl4ma"><div class="panel-header svelte-hbl4ma"><h3 class="svelte-hbl4ma">Widget Events</h3> <div class="header-controls svelte-hbl4ma"><div class="events-count svelte-hbl4ma">${escape_html(events.length)} events</div> `);
  if (showClearButton && onClear) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<button class="clear-btn svelte-hbl4ma">Clear Events</button>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div></div> <div class="events-list svelte-hbl4ma">`);
  if (events.length === 0) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<p class="no-events svelte-hbl4ma">No events yet. Interact with widgets in the preview!</p>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let event = each_array[$$index];
    $$payload.out.push(`<div class="event-item svelte-hbl4ma"><div class="event-header svelte-hbl4ma"><span class="event-id svelte-hbl4ma">ID: ${escape_html(event.id)}</span> <span class="event-time svelte-hbl4ma">${escape_html(event.timestamp)}</span></div> <div class="event-value svelte-hbl4ma">${escape_html(JSON.stringify(event.value, null, 2))}</div></div>`);
  }
  $$payload.out.push(`<!--]--></div></div>`);
  pop();
}
function _page($$payload, $$props) {
  push();
  const marked = new Marked();
  marked.use(markedUiExtension);
  let events = [];
  let markdownContent = `# Interactive Markdown Editor

Welcome to the interactive markdown editor! Type your markdown in the editor on the left and see the UI render in real-time on the right.

## Try Some Widgets

Edit this markdown to experiment with different widgets:

### Button Group Example

\`\`\`markdown-ui-widget
{ "type": "buttonGroup", "id": "example-buttons", "label": "Choose Option", "choices": ["Option A", "Option B", "Option C"], "default": "Option A" }
\`\`\`

### Form Example

\`\`\`markdown-ui-widget
{
  "type": "form",
  "id": "sample-form",
  "submitLabel": "Submit Form",
  "fields": [
    { "type": "select", "id": "priority", "label": "Priority", "choices": ["Low", "Medium", "High"], "default": "Medium" },
    { "type": "slider", "id": "urgency", "label": "Urgency Level", "min": 1, "max": 10, "default": 5 },
    { "type": "textInput", "id": "description", "label": "Description", "placeholder": "Describe your request..." }
  ]
}
\`\`\`

### Multi-Select Example

\`\`\`markdown-ui-widget
{ "type": "selectMulti", "id": "features", "label": "Select Features", "choices": ["Auto-save", "Live Preview", "Export PDF", "Collaboration"], "default": ["Live Preview"] }
\`\`\`

## Markdown Tips

- Use **bold** and *italic* text
- Create [links](https://example.com)
- Add \`inline code\`
- Use > for blockquotes
- Create lists with - or 1.

### Code Blocks

\`\`\`javascript
function hello(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

### Tables

| Feature | Supported | Notes |
|---------|-----------|--------|
| Widgets | ✅ | Full support |
| Tables | ✅ | Standard markdown |
| Code | ✅ | Syntax highlighting |

---

**Happy editing!** Try modifying this content or creating your own widgets.
`;
  function handleWidgetEvent(detail) {
    const timestamp = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    events = [{ timestamp, ...detail }, ...events].slice(0, 50);
  }
  const extensions = [markdown(), EditorView.lineWrapping];
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out.push(`<div class="editor-container svelte-ejwty8"><div class="editor-controls svelte-ejwty8"><div class="control-group svelte-ejwty8"><button class="example-btn svelte-ejwty8">Load Minimal Example</button> <button class="example-btn svelte-ejwty8">Load Widget Showcase</button> <button class="example-btn svelte-ejwty8">Load Complex Example</button></div> <div class="control-group svelte-ejwty8"><button class="clear-btn svelte-ejwty8">Clear Events</button></div></div> <div class="editor-layout svelte-ejwty8"><div class="editor-panel svelte-ejwty8"><div class="panel-header svelte-ejwty8"><h3 class="svelte-ejwty8">Markdown Editor</h3> <div class="editor-info svelte-ejwty8">${escape_html(markdownContent.length)} characters</div></div> <div class="editor-wrapper svelte-ejwty8">`);
    CodeMirror($$payload2, {
      extensions,
      styles: {
        "&": { fontSize: "14px", height: "100%" },
        ".cm-focused": { outline: "none" },
        ".cm-editor": { height: "100%" },
        ".cm-scroller": { fontFamily: '"SF Mono", Monaco, "Cascadia Code", monospace' }
      },
      get value() {
        return markdownContent;
      },
      set value($$value) {
        markdownContent = $$value;
        $$settled = false;
      }
    });
    $$payload2.out.push(`<!----></div></div> <div class="preview-panel svelte-ejwty8"><div class="panel-header svelte-ejwty8"><h3 class="svelte-ejwty8">Live Preview</h3> <div class="preview-info svelte-ejwty8">Real-time rendering</div></div> <div class="preview-content svelte-ejwty8">`);
    MarkdownUI($$payload2, {
      html: marked.parse(markdownContent),
      onwidgetevent: handleWidgetEvent
    });
    $$payload2.out.push(`<!----></div></div> `);
    WidgetEvents($$payload2, { events });
    $$payload2.out.push(`<!----></div></div>`);
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
export {
  _page as default
};
