import { E as ensure_array_like, F as attr, I as escape_html, B as pop, z as push } from "../../chunks/index2.js";
import { Marked } from "marked";
import { markedUiExtension } from "@markdown-ui/marked-ext";
/* empty css                   */
function _page($$payload, $$props) {
  push();
  const marked = new Marked();
  marked.use(markedUiExtension);
  let isStreaming = false;
  let events = [];
  const each_array = ensure_array_like(events);
  $$payload.out.push(`<div class="streaming-container svelte-154rnyw"><div class="streaming-controls svelte-154rnyw"><button${attr("disabled", isStreaming, true)} class="start-btn svelte-154rnyw">${escape_html("Start Stream")}</button> <button${attr("disabled", !isStreaming, true)} class="stop-btn svelte-154rnyw">Stop Stream</button> <button class="reset-btn svelte-154rnyw">Reset</button> <div class="streaming-status svelte-154rnyw">`);
  {
    $$payload.out.push("<!--[!-->");
    {
      $$payload.out.push("<!--[!-->");
      $$payload.out.push(`<span class="status-indicator idle svelte-154rnyw"></span> Ready to stream`);
    }
    $$payload.out.push(`<!--]-->`);
  }
  $$payload.out.push(`<!--]--></div></div> <div class="demo-container svelte-154rnyw"><main class="demo-content svelte-154rnyw">`);
  {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`<div class="empty-state svelte-154rnyw"><p class="svelte-154rnyw">Click "Start Stream" to begin the streaming demo...</p></div>`);
  }
  $$payload.out.push(`<!--]--></main> <aside class="demo-events svelte-154rnyw"><div class="events-header svelte-154rnyw"><h3 class="svelte-154rnyw">Stream Events</h3> <button class="clear-btn svelte-154rnyw">Clear</button></div> <div class="events-list svelte-154rnyw">`);
  if (events.length === 0) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<p class="no-events svelte-154rnyw">No widget events yet. Interact with widgets during streaming!</p>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let event = each_array[$$index];
    $$payload.out.push(`<div class="event-item svelte-154rnyw"><div class="event-header svelte-154rnyw"><span class="event-id svelte-154rnyw">ID: ${escape_html(event.id)}</span> <span class="event-time svelte-154rnyw">${escape_html(event.timestamp)}</span></div> <div class="event-value svelte-154rnyw">${escape_html(JSON.stringify(event.value, null, 2))}</div></div>`);
  }
  $$payload.out.push(`<!--]--></div></aside></div></div>`);
  pop();
}
export {
  _page as default
};
