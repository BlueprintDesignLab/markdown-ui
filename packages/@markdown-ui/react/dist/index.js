import { jsxs as p, jsx as t } from "react/jsx-runtime";
import N, { useState as h, useMemo as C, useEffect as f, useRef as k } from "react";
import { createRoot as E } from "react-dom/client";
const v = ({
  choices: c,
  label: o = "",
  default: i,
  onchange: l
}) => {
  const [r, a] = h(i ?? c[0]), d = (s) => {
    a(s), l(s);
  };
  return /* @__PURE__ */ p("div", { className: "widget-button-group", children: [
    o && /* @__PURE__ */ t("label", { children: o }),
    /* @__PURE__ */ t("div", { role: "group", "aria-label": o, children: c.map((s) => /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        "aria-pressed": r === s,
        onClick: () => d(s),
        children: s
      },
      s
    )) })
  ] });
}, y = ({
  choices: c,
  label: o = "",
  default: i,
  onchange: l
}) => {
  const [r, a] = h(i ?? c[0]);
  return /* @__PURE__ */ p("div", { className: "selector", children: [
    o && /* @__PURE__ */ t("label", { children: o }),
    /* @__PURE__ */ t("select", { value: r, onChange: (s) => {
      const u = s.target.value;
      a(u), l(u);
    }, children: c.map((s) => /* @__PURE__ */ t("option", { value: s, children: s }, s)) })
  ] });
}, w = ({
  choices: c,
  label: o = "",
  default: i,
  onchange: l
}) => {
  const [r, a] = h(
    Array.isArray(i) ? i : i ? [i] : []
  ), d = (s) => {
    const u = s.target.value;
    let n;
    s.target.checked ? n = [...r, u] : n = r.filter((e) => e !== u), a(n), l(n);
  };
  return /* @__PURE__ */ p("div", { className: "selector-multi", children: [
    o && /* @__PURE__ */ t("div", { className: "selector-multi-label", children: o }),
    /* @__PURE__ */ t("div", { className: "checkbox-group", children: c.map((s) => /* @__PURE__ */ p("label", { className: "checkbox-item", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "checkbox",
          value: s,
          checked: r.includes(s),
          onChange: d
        }
      ),
      /* @__PURE__ */ t("span", { children: s })
    ] }, s)) })
  ] });
}, b = ({
  min: c,
  max: o,
  step: i = 1,
  label: l = "",
  default: r = c,
  onchange: a
}) => {
  const [d, s] = h(r), u = (e) => {
    const m = Number(e.target.value);
    s(m);
  }, n = () => {
    a(d);
  };
  return /* @__PURE__ */ p("div", { className: "widget-slider", children: [
    l && /* @__PURE__ */ t("label", { children: l }),
    /* @__PURE__ */ p("div", { className: "slider-container", children: [
      /* @__PURE__ */ p("div", { className: "slider-values", children: [
        /* @__PURE__ */ t("span", { className: "min-value", children: c }),
        /* @__PURE__ */ t("span", { className: "current-value", children: d }),
        /* @__PURE__ */ t("span", { className: "max-value", children: o })
      ] }),
      /* @__PURE__ */ t(
        "input",
        {
          type: "range",
          value: d,
          min: c,
          max: o,
          step: i,
          onChange: u,
          onMouseUp: n,
          onTouchEnd: n
        }
      )
    ] })
  ] });
}, x = ({
  placeholder: c = "",
  label: o = "",
  default: i = "",
  onchange: l
}) => {
  const [r, a] = h(i);
  return /* @__PURE__ */ p("div", { className: "widget-button", children: [
    o && /* @__PURE__ */ t("label", { children: o }),
    /* @__PURE__ */ t(
      "input",
      {
        type: "text",
        value: r,
        onChange: (s) => a(s.target.value),
        onBlur: () => {
          l(r);
        },
        placeholder: c
      }
    )
  ] });
}, S = ({
  fields: c,
  submitLabel: o = "Submit",
  onchange: i
}) => {
  const l = C(() => {
    const n = {};
    for (const e of c)
      if (e.type === "button-group")
        n[e.id] = e.default ?? (Array.isArray(e.choices) && e.choices.length ? e.choices[0] : void 0);
      else if (e.type === "select")
        n[e.id] = e.default ?? (Array.isArray(e.choices) && e.choices.length ? e.choices[0] : void 0);
      else if (e.type === "select-multi") {
        const m = e.default;
        n[e.id] = Array.isArray(m) ? m : m ? [m] : [];
      } else e.type === "slider" ? n[e.id] = e.default ?? (typeof e.min == "number" ? e.min : 0) : e.type === "text-input" && (n[e.id] = e.default ?? "");
    return n;
  }, [c]), [r, a] = h(l);
  f(() => {
    a(l);
  }, [l]);
  const d = (n, e) => {
    a((m) => ({ ...m, [n]: e }));
  }, s = () => {
    i({ ...r });
  }, u = (n) => {
    const e = {
      ...n,
      onchange: (m) => d(n.id, m)
    };
    switch (n.type) {
      case "button-group":
        return /* @__PURE__ */ t(v, { ...e, choices: n.choices ?? [] });
      case "select":
        return /* @__PURE__ */ t(y, { ...e, choices: n.choices ?? [] });
      case "select-multi":
        return /* @__PURE__ */ t(w, { ...e, choices: n.choices ?? [] });
      case "slider":
        return /* @__PURE__ */ t(
          b,
          {
            ...e,
            min: n.min ?? 0,
            max: n.max ?? 100
          }
        );
      case "text-input":
        return /* @__PURE__ */ t(x, { ...e });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ p("div", { className: "widget-form", children: [
    c.map((n) => /* @__PURE__ */ t("div", { children: u(n) }, n.id)),
    /* @__PURE__ */ t("button", { type: "button", onClick: s, children: o })
  ] });
}, M = () => /* @__PURE__ */ t("div", { className: "incomplete-widget", children: /* @__PURE__ */ t("div", { className: "loading-indicator", children: /* @__PURE__ */ t("span", { className: "loading-text", children: "Loading..." }) }) }), A = `
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
  const c = document.createElement("style");
  c.id = "incomplete-widget-styles", c.textContent = A, document.head.appendChild(c);
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
}, I = ({ id: c, content: o }) => {
  const i = JSON.parse(atob(o)), l = T[i.type] || i.type, r = R[l], a = (d) => {
    const s = new CustomEvent("widget-event", {
      detail: d,
      bubbles: !0,
      composed: !0
    }), u = document.querySelector(`markdown-ui-widget[id="${c}"]`);
    if (u) {
      const n = u.closest(".widget-container");
      n && n.dispatchEvent(s);
    }
  };
  return r ? /* @__PURE__ */ t("div", { className: "widget", children: /* @__PURE__ */ t(
    r,
    {
      ...i,
      onchange: (d) => a({ id: c, value: d })
    }
  ) }) : /* @__PURE__ */ t("div", { className: "widget", children: /* @__PURE__ */ p("span", { style: { color: "red" }, children: [
    'Unknown widget "',
    i.type,
    '"'
  ] }) });
};
let g;
typeof HTMLElement < "u" && (g = class extends HTMLElement {
  constructor() {
    super(...arguments), this.reactRoot = null;
  }
  connectedCallback() {
    const c = this.getAttribute("id") || "", o = this.getAttribute("content") || "";
    this.innerHTML = "";
    const i = document.createElement("div");
    this.appendChild(i), this.reactRoot = E(i), this.reactRoot.render(N.createElement(I, { id: c, content: o }));
  }
  disconnectedCallback() {
    this.reactRoot && (this.reactRoot.unmount(), this.reactRoot = null);
  }
}, typeof window < "u" && !customElements.get("markdown-ui-widget") && customElements.define("markdown-ui-widget", g));
const _ = ({ html: c, onWidgetEvent: o }) => {
  const i = k(null);
  return f(() => {
    const l = (a) => {
      o && o(a);
    }, r = i.current;
    if (r)
      return r.addEventListener("widget-event", l), () => {
        r.removeEventListener("widget-event", l);
      };
  }, [o]), /* @__PURE__ */ t("div", { ref: i, className: "widget-container", children: /* @__PURE__ */ t("div", { dangerouslySetInnerHTML: { __html: c } }) });
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
