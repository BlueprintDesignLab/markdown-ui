import "clsx";
import { B as pop, z as push } from "./index2.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function MarkdownUI($$payload, $$props) {
  push();
  let { onwidgetevent, html: html$1 } = $$props;
  $$payload.out.push(`<div class="widget-container">${html(html$1)}</div>`);
  pop();
}
export {
  MarkdownUI as M
};
