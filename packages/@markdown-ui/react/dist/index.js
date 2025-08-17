import { jsxs as u, jsx as e } from "react/jsx-runtime";
import w, { useState as p, useRef as b, useEffect as x } from "react";
import { createRoot as N } from "react-dom/client";
const h = ({
  choices: s,
  label: n = "",
  default: c,
  onchange: l
}) => {
  const [o, r] = p(c ?? s[0]), i = (t) => {
    r(t), l(t);
  };
  return /* @__PURE__ */ u("div", { className: "widget-button-group", children: [
    n && /* @__PURE__ */ e("label", { children: n }),
    /* @__PURE__ */ e("div", { role: "group", "aria-label": n, children: s.map((t) => /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        "aria-pressed": o === t,
        onClick: () => i(t),
        children: t
      },
      t
    )) })
  ] });
}, g = ({
  choices: s,
  label: n = "",
  default: c,
  onchange: l
}) => {
  const [o, r] = p(c ?? s[0]);
  return /* @__PURE__ */ u("div", { className: "selector", children: [
    n && /* @__PURE__ */ e("label", { children: n }),
    /* @__PURE__ */ e("select", { value: o, onChange: (t) => {
      const a = t.target.value;
      r(a), l(a);
    }, children: s.map((t) => /* @__PURE__ */ e("option", { value: t, children: t }, t)) })
  ] });
}, v = ({
  choices: s,
  label: n = "",
  default: c,
  onchange: l
}) => {
  const [o, r] = p(
    Array.isArray(c) ? c : c ? [c] : []
  ), i = (t) => {
    const a = t.target.value;
    let d;
    t.target.checked ? d = [...o, a] : d = o.filter((m) => m !== a), r(d), l(d);
  };
  return /* @__PURE__ */ u("div", { className: "selector-multi", children: [
    n && /* @__PURE__ */ e("div", { className: "selector-multi-label", children: n }),
    /* @__PURE__ */ e("div", { className: "checkbox-group", children: s.map((t) => /* @__PURE__ */ u("label", { className: "checkbox-item", children: [
      /* @__PURE__ */ e(
        "input",
        {
          type: "checkbox",
          value: t,
          checked: o.includes(t),
          onChange: i
        }
      ),
      /* @__PURE__ */ e("span", { children: t })
    ] }, t)) })
  ] });
}, f = ({
  min: s,
  max: n,
  step: c = 1,
  label: l = "",
  default: o = s,
  onchange: r
}) => {
  const [i, t] = p(o);
  return /* @__PURE__ */ u("div", { className: "widget-slider", children: [
    l && /* @__PURE__ */ e("label", { children: l }),
    /* @__PURE__ */ u("div", { className: "slider-container", children: [
      /* @__PURE__ */ u("div", { className: "slider-values", children: [
        /* @__PURE__ */ e("span", { className: "min-value", children: s }),
        /* @__PURE__ */ e("span", { className: "current-value", children: i }),
        /* @__PURE__ */ e("span", { className: "max-value", children: n })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          type: "range",
          value: i,
          min: s,
          max: n,
          step: c,
          onChange: (d) => {
            const m = Number(d.target.value);
            t(m), r(m);
          }
        }
      )
    ] })
  ] });
}, y = ({
  placeholder: s = "",
  label: n = "",
  default: c = "",
  onchange: l
}) => {
  const [o, r] = p(c);
  return /* @__PURE__ */ u("div", { className: "widget-button", children: [
    n && /* @__PURE__ */ e("label", { children: n }),
    /* @__PURE__ */ e(
      "input",
      {
        type: "text",
        value: o,
        onChange: (t) => r(t.target.value),
        onBlur: () => {
          l(o);
        },
        placeholder: s
      }
    )
  ] });
}, C = ({
  fields: s,
  submitLabel: n = "Submit",
  onchange: c
}) => {
  const [l, o] = p({}), r = (a, d) => {
    o((m) => ({ ...m, [a]: d }));
  }, i = () => {
    c({ ...l });
  }, t = (a) => {
    const d = {
      ...a,
      onchange: (m) => r(a.id, m)
    };
    switch (a.type) {
      case "button-group":
        return /* @__PURE__ */ e(h, { ...d, choices: a.choices ?? [] });
      case "select":
        return /* @__PURE__ */ e(g, { ...d, choices: a.choices ?? [] });
      case "select-multi":
        return /* @__PURE__ */ e(v, { ...d, choices: a.choices ?? [] });
      case "slider":
        return /* @__PURE__ */ e(
          f,
          {
            ...d,
            min: a.min ?? 0,
            max: a.max ?? 100
          }
        );
      case "text-input":
        return /* @__PURE__ */ e(y, { ...d });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ u("div", { className: "widget-form", children: [
    s.map((a) => /* @__PURE__ */ e("div", { children: t(a) }, a.id)),
    /* @__PURE__ */ e("button", { type: "button", onClick: i, children: n })
  ] });
}, k = () => /* @__PURE__ */ e("div", { className: "incomplete-widget", children: /* @__PURE__ */ e("div", { className: "loading-indicator", children: /* @__PURE__ */ e("span", { className: "loading-text", children: "Loading..." }) }) }), S = `
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
  const s = document.createElement("style");
  s.id = "incomplete-widget-styles", s.textContent = S, document.head.appendChild(s);
}
const E = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ButtonGroup: h,
  Form: C,
  Incomplete: k,
  Select: g,
  SelectMulti: v,
  Slider: f,
  TextInput: y
}, Symbol.toStringTag, { value: "Module" })), R = {
  "button-group": "ButtonGroup",
  form: "Form",
  incomplete: "Incomplete",
  select: "Select",
  "select-multi": "SelectMulti",
  slider: "Slider",
  "text-input": "TextInput"
}, M = ({ id: s, content: n }) => {
  const c = JSON.parse(atob(n)), l = R[c.type] || c.type, o = E[l], r = (i) => {
    const t = new CustomEvent("widget-event", {
      detail: i,
      bubbles: !0,
      composed: !0
    }), a = document.querySelector(".widget-container");
    a && a.dispatchEvent(t);
  };
  return o ? /* @__PURE__ */ e("div", { className: "widget", children: /* @__PURE__ */ e(
    o,
    {
      ...c,
      onchange: (i) => r({ id: s, value: i })
    }
  ) }) : /* @__PURE__ */ e("div", { className: "widget", children: /* @__PURE__ */ u("span", { style: { color: "red" }, children: [
    'Unknown widget "',
    c.type,
    '"'
  ] }) });
};
class I extends HTMLElement {
  constructor() {
    super(...arguments), this.reactRoot = null;
  }
  connectedCallback() {
    const n = this.getAttribute("id") || "", c = this.getAttribute("content") || "";
    this.innerHTML = "";
    const l = document.createElement("div");
    this.appendChild(l), this.reactRoot = N(l), this.reactRoot.render(w.createElement(M, { id: n, content: c }));
  }
  disconnectedCallback() {
    this.reactRoot && (this.reactRoot.unmount(), this.reactRoot = null);
  }
}
typeof window < "u" && !customElements.get("markdown-ui-widget") && customElements.define("markdown-ui-widget", I);
const L = ({ html: s, onWidgetEvent: n }) => {
  const c = b(null);
  return x(() => {
    const l = (r) => {
      n && n(r.detail);
    }, o = c.current;
    if (o)
      return o.addEventListener("widget-event", l), () => {
        o.removeEventListener("widget-event", l);
      };
  }, [n]), /* @__PURE__ */ e("div", { ref: c, className: "widget-container", children: /* @__PURE__ */ e("div", { dangerouslySetInnerHTML: { __html: s } }) });
};
export {
  h as ButtonGroup,
  C as Form,
  k as Incomplete,
  L as MarkdownUI,
  g as Select,
  v as SelectMulti,
  f as Slider,
  y as TextInput
};
