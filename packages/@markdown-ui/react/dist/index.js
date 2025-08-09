import { jsxs as h, jsx as r } from "react/jsx-runtime";
import E, { useState as g, useRef as C, useEffect as R } from "react";
import N from "react-dom";
var m = {}, p;
function _() {
  if (p) return m;
  p = 1;
  var o = N;
  if (process.env.NODE_ENV === "production")
    m.createRoot = o.createRoot, m.hydrateRoot = o.hydrateRoot;
  else {
    var t = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    m.createRoot = function(n, c) {
      t.usingClientEntryPoint = !0;
      try {
        return o.createRoot(n, c);
      } finally {
        t.usingClientEntryPoint = !1;
      }
    }, m.hydrateRoot = function(n, c, a) {
      t.usingClientEntryPoint = !0;
      try {
        return o.hydrateRoot(n, c, a);
      } finally {
        t.usingClientEntryPoint = !1;
      }
    };
  }
  return m;
}
var k = _();
const v = ({
  choices: o,
  label: t = "",
  default: n,
  onchange: c
}) => {
  const [a, l] = g(n ?? o[0]), u = (e) => {
    l(e), c(e);
  };
  return /* @__PURE__ */ h("div", { className: "widget-button-group", children: [
    t && /* @__PURE__ */ r("label", { children: t }),
    /* @__PURE__ */ r("div", { role: "group", "aria-label": t, children: o.map((e) => /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        "aria-pressed": a === e,
        onClick: () => u(e),
        children: e
      },
      e
    )) })
  ] });
}, f = ({
  choices: o,
  label: t = "",
  default: n,
  onchange: c
}) => {
  const [a, l] = g(n ?? o[0]);
  return /* @__PURE__ */ h("div", { className: "selector", children: [
    t && /* @__PURE__ */ r("label", { children: t }),
    /* @__PURE__ */ r("select", { value: a, onChange: (e) => {
      const s = e.target.value;
      l(s), c(s);
    }, children: o.map((e) => /* @__PURE__ */ r("option", { value: e, children: e }, e)) })
  ] });
}, y = ({
  choices: o,
  label: t = "",
  default: n,
  onchange: c
}) => {
  const [a, l] = g(
    Array.isArray(n) ? n : n ? [n] : []
  ), u = (e) => {
    const s = e.target.value;
    let i;
    e.target.checked ? i = [...a, s] : i = a.filter((d) => d !== s), l(i), c(i);
  };
  return /* @__PURE__ */ h("div", { className: "selector-multi", children: [
    t && /* @__PURE__ */ r("div", { className: "selector-multi-label", children: t }),
    /* @__PURE__ */ r("div", { className: "checkbox-group", children: o.map((e) => /* @__PURE__ */ h("label", { className: "checkbox-item", children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: "checkbox",
          value: e,
          checked: a.includes(e),
          onChange: u
        }
      ),
      /* @__PURE__ */ r("span", { children: e })
    ] }, e)) })
  ] });
}, w = ({
  min: o,
  max: t,
  step: n = 1,
  label: c = "",
  default: a = o,
  onchange: l
}) => {
  const [u, e] = g(a);
  return /* @__PURE__ */ h("div", { className: "widget-slider", children: [
    c && /* @__PURE__ */ r("label", { children: c }),
    /* @__PURE__ */ r(
      "input",
      {
        type: "range",
        value: u,
        min: o,
        max: t,
        step: n,
        onChange: (i) => {
          const d = Number(i.target.value);
          e(d), l(d);
        }
      }
    )
  ] });
}, b = ({
  placeholder: o = "",
  label: t = "",
  default: n = "",
  onchange: c
}) => {
  const [a, l] = g(n);
  return /* @__PURE__ */ h("div", { className: "widget-button", children: [
    t && /* @__PURE__ */ r("label", { children: t }),
    /* @__PURE__ */ r(
      "input",
      {
        type: "text",
        value: a,
        onChange: (e) => l(e.target.value),
        onBlur: () => {
          c(a);
        },
        placeholder: o
      }
    )
  ] });
}, S = ({
  fields: o,
  submitLabel: t = "Submit",
  onchange: n
}) => {
  const [c, a] = g({}), l = (s, i) => {
    a((d) => ({ ...d, [s]: i }));
  }, u = () => {
    n({ ...c });
  }, e = (s) => {
    const i = {
      ...s,
      onchange: (d) => l(s.id, d)
    };
    switch (s.type) {
      case "buttonGroup":
        return /* @__PURE__ */ r(v, { ...i, choices: s.choices ?? [] });
      case "select":
        return /* @__PURE__ */ r(f, { ...i, choices: s.choices ?? [] });
      case "selectMulti":
        return /* @__PURE__ */ r(y, { ...i, choices: s.choices ?? [] });
      case "slider":
        return /* @__PURE__ */ r(
          w,
          {
            ...i,
            min: s.min ?? 0,
            max: s.max ?? 100
          }
        );
      case "textInput":
        return /* @__PURE__ */ r(b, { ...i });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ h("div", { className: "widget-form", children: [
    o.map((s) => /* @__PURE__ */ r("div", { children: e(s) }, s.id)),
    /* @__PURE__ */ r("button", { type: "button", onClick: u, children: t })
  ] });
}, x = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ButtonGroup: v,
  Form: S,
  Select: f,
  SelectMulti: y,
  Slider: w,
  TextInput: b
}, Symbol.toStringTag, { value: "Module" })), V = ({ id: o, content: t }) => {
  const n = JSON.parse(atob(t)), c = x[n.type], a = (l) => {
    const u = new CustomEvent("widget-event", {
      detail: l,
      bubbles: !0,
      composed: !0
    }), e = document.querySelector(".widget-container");
    e && e.dispatchEvent(u);
  };
  return c ? /* @__PURE__ */ r("div", { className: "widget", children: /* @__PURE__ */ r(
    c,
    {
      ...n,
      onchange: (l) => a({ id: o, value: l })
    }
  ) }) : /* @__PURE__ */ r("div", { className: "widget", children: /* @__PURE__ */ h("span", { style: { color: "red" }, children: [
    'Unknown widget "',
    n.type,
    '"'
  ] }) });
};
class I extends HTMLElement {
  constructor() {
    super(...arguments), this.reactRoot = null;
  }
  connectedCallback() {
    const t = this.getAttribute("id") || "", n = this.getAttribute("content") || "";
    this.innerHTML = "";
    const c = document.createElement("div");
    this.appendChild(c), this.reactRoot = k.createRoot(c), this.reactRoot.render(E.createElement(V, { id: t, content: n }));
  }
  disconnectedCallback() {
    this.reactRoot && (this.reactRoot.unmount(), this.reactRoot = null);
  }
}
typeof window < "u" && !customElements.get("markdown-ui-widget") && customElements.define("markdown-ui-widget", I);
const T = ({ html: o, onWidgetEvent: t }) => {
  const n = C(null);
  return R(() => {
    const c = (l) => {
      t && t(l.detail);
    }, a = n.current;
    if (a)
      return a.addEventListener("widget-event", c), () => {
        a.removeEventListener("widget-event", c);
      };
  }, [t]), /* @__PURE__ */ r("div", { ref: n, className: "widget-container", children: /* @__PURE__ */ r("div", { dangerouslySetInnerHTML: { __html: o } }) });
};
export {
  v as ButtonGroup,
  S as Form,
  T as MarkdownUI,
  f as Select,
  y as SelectMulti,
  w as Slider,
  b as TextInput
};
