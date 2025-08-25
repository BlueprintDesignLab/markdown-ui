import { jsxs as p, jsx as n } from "react/jsx-runtime";
import N, { useState as h, useMemo as C, useEffect as f, useRef as k } from "react";
import { createRoot as E } from "react-dom/client";
const v = ({
  choices: o,
  label: s = "",
  default: l,
  onchange: r
}) => {
  const [i, d] = h(l ?? o[0]), a = (c) => {
    d(c), r(c);
  };
  return /* @__PURE__ */ p("div", { className: "widget-button-group", children: [
    s && /* @__PURE__ */ n("label", { children: s }),
    /* @__PURE__ */ n("div", { role: "group", "aria-label": s, children: o.map((c) => /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        "aria-pressed": i === c,
        onClick: () => a(c),
        children: c
      },
      c
    )) })
  ] });
}, y = ({
  choices: o,
  label: s = "",
  default: l,
  onchange: r
}) => {
  const [i, d] = h(l ?? o[0]);
  return /* @__PURE__ */ p("div", { className: "selector", children: [
    s && /* @__PURE__ */ n("label", { children: s }),
    /* @__PURE__ */ n("select", { value: i, onChange: (c) => {
      const u = c.target.value;
      d(u), r(u);
    }, children: o.map((c) => /* @__PURE__ */ n("option", { value: c, children: c }, c)) })
  ] });
}, w = ({
  choices: o,
  label: s = "",
  default: l,
  onchange: r
}) => {
  const [i, d] = h(
    Array.isArray(l) ? l : l ? [l] : []
  ), a = (c) => {
    const u = c.target.value;
    let t;
    c.target.checked ? t = [...i, u] : t = i.filter((e) => e !== u), d(t), r(t);
  };
  return /* @__PURE__ */ p("div", { className: "selector-multi", children: [
    s && /* @__PURE__ */ n("div", { className: "selector-multi-label", children: s }),
    /* @__PURE__ */ n("div", { className: "checkbox-group", children: o.map((c) => /* @__PURE__ */ p("label", { className: "checkbox-item", children: [
      /* @__PURE__ */ n(
        "input",
        {
          type: "checkbox",
          value: c,
          checked: i.includes(c),
          onChange: a
        }
      ),
      /* @__PURE__ */ n("span", { children: c })
    ] }, c)) })
  ] });
}, b = ({
  min: o,
  max: s,
  step: l = 1,
  label: r = "",
  default: i = o,
  onchange: d
}) => {
  const [a, c] = h(i), u = (e) => {
    const m = Number(e.target.value);
    c(m);
  }, t = () => {
    d(a);
  };
  return /* @__PURE__ */ p("div", { className: "widget-slider", children: [
    r && /* @__PURE__ */ n("label", { children: r }),
    /* @__PURE__ */ p("div", { className: "slider-container", children: [
      /* @__PURE__ */ p("div", { className: "slider-values", children: [
        /* @__PURE__ */ n("span", { className: "min-value", children: o }),
        /* @__PURE__ */ n("span", { className: "current-value", children: a }),
        /* @__PURE__ */ n("span", { className: "max-value", children: s })
      ] }),
      /* @__PURE__ */ n(
        "input",
        {
          type: "range",
          value: a,
          min: o,
          max: s,
          step: l,
          onChange: u,
          onMouseUp: t,
          onTouchEnd: t
        }
      )
    ] })
  ] });
}, x = ({
  placeholder: o = "",
  label: s = "",
  default: l = "",
  onchange: r
}) => {
  const [i, d] = h(l);
  return /* @__PURE__ */ p("div", { className: "widget-button", children: [
    s && /* @__PURE__ */ n("label", { children: s }),
    /* @__PURE__ */ n(
      "input",
      {
        type: "text",
        value: i,
        onChange: (c) => d(c.target.value),
        onBlur: () => {
          r(i);
        },
        placeholder: o
      }
    )
  ] });
}, S = ({
  fields: o,
  submitLabel: s = "Submit",
  onchange: l
}) => {
  const r = C(() => {
    const t = {};
    for (const e of o)
      if (e.type === "button-group")
        t[e.id] = e.default ?? (Array.isArray(e.choices) && e.choices.length ? e.choices[0] : void 0);
      else if (e.type === "select")
        t[e.id] = e.default ?? (Array.isArray(e.choices) && e.choices.length ? e.choices[0] : void 0);
      else if (e.type === "select-multi") {
        const m = e.default;
        t[e.id] = Array.isArray(m) ? m : m ? [m] : [];
      } else e.type === "slider" ? t[e.id] = e.default ?? (typeof e.min == "number" ? e.min : 0) : e.type === "text-input" && (t[e.id] = e.default ?? "");
    return t;
  }, [o]), [i, d] = h(r);
  f(() => {
    d(r);
  }, [r]);
  const a = (t, e) => {
    d((m) => ({ ...m, [t]: e }));
  }, c = () => {
    l({ ...i });
  }, u = (t) => {
    const e = {
      ...t,
      onchange: (m) => a(t.id, m)
    };
    switch (t.type) {
      case "button-group":
        return /* @__PURE__ */ n(v, { ...e, choices: t.choices ?? [] });
      case "select":
        return /* @__PURE__ */ n(y, { ...e, choices: t.choices ?? [] });
      case "select-multi":
        return /* @__PURE__ */ n(w, { ...e, choices: t.choices ?? [] });
      case "slider":
        return /* @__PURE__ */ n(
          b,
          {
            ...e,
            min: t.min ?? 0,
            max: t.max ?? 100
          }
        );
      case "text-input":
        return /* @__PURE__ */ n(x, { ...e });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ p("div", { className: "widget-form", children: [
    o.map((t) => /* @__PURE__ */ n("div", { children: u(t) }, t.id)),
    /* @__PURE__ */ n("button", { type: "button", onClick: c, children: s })
  ] });
}, M = () => /* @__PURE__ */ n("div", { className: "incomplete-widget", children: /* @__PURE__ */ n("div", { className: "loading-indicator", children: /* @__PURE__ */ n("span", { className: "loading-text", children: "Loading..." }) }) }), A = `
.incomplete-widget {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  color: #666;
}

.loading-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
}

.loading-text {
  opacity: 0.7;
}

.loading-text::after {
  content: '';
  animation: dots 1.5s infinite;
}

@keyframes dots {
  0%, 20% { content: ''; }
  40% { content: '.'; }
  60% { content: '..'; }
  80%, 100% { content: '...'; }
}
`;
if (typeof document < "u" && !document.getElementById("incomplete-widget-styles")) {
  const o = document.createElement("style");
  o.id = "incomplete-widget-styles", o.textContent = A, document.head.appendChild(o);
}
const R = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ButtonGroup: v,
  Form: S,
  Incomplete: M,
  Select: y,
  SelectMulti: w,
  Slider: b,
  TextInput: x
}, Symbol.toStringTag, { value: "Module" })), T = {
  "button-group": "ButtonGroup",
  form: "Form",
  incomplete: "Incomplete",
  select: "Select",
  "select-multi": "SelectMulti",
  slider: "Slider",
  "text-input": "TextInput"
}, I = ({ id: o, content: s }) => {
  const l = JSON.parse(atob(s)), r = T[l.type] || l.type, i = R[r], d = (a) => {
    console.log("🔥 Widget dispatch called", { id: o, detail: a });
    const c = new CustomEvent("widget-event", {
      detail: a,
      bubbles: !0,
      composed: !0
    }), u = document.querySelector(`markdown-ui-widget[id="${o}"]`);
    if (console.log("🔍 Custom element found:", u), u) {
      const t = u.closest(".widget-container");
      console.log("📦 Container found:", t), t && (console.log("📤 Dispatching event on container"), t.dispatchEvent(c));
    } else
      console.log("❌ No custom element found for id:", o);
  };
  return i ? /* @__PURE__ */ n("div", { className: "widget", children: /* @__PURE__ */ n(
    i,
    {
      ...l,
      onchange: (a) => d({ id: o, value: a })
    }
  ) }) : /* @__PURE__ */ n("div", { className: "widget", children: /* @__PURE__ */ p("span", { style: { color: "red" }, children: [
    'Unknown widget "',
    l.type,
    '"'
  ] }) });
};
let g;
typeof HTMLElement < "u" && (g = class extends HTMLElement {
  constructor() {
    super(...arguments), this.reactRoot = null;
  }
  connectedCallback() {
    const o = this.getAttribute("id") || "", s = this.getAttribute("content") || "";
    console.log("🏗️ Custom element connected", { id: o, content: s }), this.innerHTML = "";
    const l = document.createElement("div");
    this.appendChild(l), this.reactRoot = E(l), this.reactRoot.render(N.createElement(I, { id: o, content: s }));
  }
  disconnectedCallback() {
    this.reactRoot && (this.reactRoot.unmount(), this.reactRoot = null);
  }
}, typeof window < "u" && !customElements.get("markdown-ui-widget") && customElements.define("markdown-ui-widget", g));
const _ = ({ html: o, onWidgetEvent: s }) => {
  const l = k(null);
  return f(() => {
    const r = (d) => {
      s && s(d);
    }, i = l.current;
    if (i)
      return i.addEventListener("widget-event", r), () => {
        i.removeEventListener("widget-event", r);
      };
  }, [s]), /* @__PURE__ */ n("div", { ref: l, className: "widget-container", children: /* @__PURE__ */ n("div", { dangerouslySetInnerHTML: { __html: o } }) });
};
export {
  v as ButtonGroup,
  S as Form,
  M as Incomplete,
  _ as MarkdownUI,
  y as Select,
  w as SelectMulti,
  b as Slider,
  x as TextInput
};
