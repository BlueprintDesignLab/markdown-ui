import { jsxs as u, jsx as t } from "react/jsx-runtime";
import f, { useState as m, useRef as y, useEffect as N } from "react";
import { createRoot as C } from "react-dom/client";
const p = ({
  choices: a,
  label: n = "",
  default: r,
  onchange: l
}) => {
  const [s, o] = m(r ?? a[0]), i = (e) => {
    o(e), l(e);
  };
  return /* @__PURE__ */ u("div", { className: "widget-button-group", children: [
    n && /* @__PURE__ */ t("label", { children: n }),
    /* @__PURE__ */ t("div", { role: "group", "aria-label": n, children: a.map((e) => /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        "aria-pressed": s === e,
        onClick: () => i(e),
        children: e
      },
      e
    )) })
  ] });
}, g = ({
  choices: a,
  label: n = "",
  default: r,
  onchange: l
}) => {
  const [s, o] = m(r ?? a[0]);
  return /* @__PURE__ */ u("div", { className: "selector", children: [
    n && /* @__PURE__ */ t("label", { children: n }),
    /* @__PURE__ */ t("select", { value: s, onChange: (e) => {
      const c = e.target.value;
      o(c), l(c);
    }, children: a.map((e) => /* @__PURE__ */ t("option", { value: e, children: e }, e)) })
  ] });
}, v = ({
  choices: a,
  label: n = "",
  default: r,
  onchange: l
}) => {
  const [s, o] = m(
    Array.isArray(r) ? r : r ? [r] : []
  ), i = (e) => {
    const c = e.target.value;
    let d;
    e.target.checked ? d = [...s, c] : d = s.filter((h) => h !== c), o(d), l(d);
  };
  return /* @__PURE__ */ u("div", { className: "selector-multi", children: [
    n && /* @__PURE__ */ t("div", { className: "selector-multi-label", children: n }),
    /* @__PURE__ */ t("div", { className: "checkbox-group", children: a.map((e) => /* @__PURE__ */ u("label", { className: "checkbox-item", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "checkbox",
          value: e,
          checked: s.includes(e),
          onChange: i
        }
      ),
      /* @__PURE__ */ t("span", { children: e })
    ] }, e)) })
  ] });
}, w = ({
  min: a,
  max: n,
  step: r = 1,
  label: l = "",
  default: s = a,
  onchange: o
}) => {
  const [i, e] = m(s);
  return /* @__PURE__ */ u("div", { className: "widget-slider", children: [
    l && /* @__PURE__ */ t("label", { children: l }),
    /* @__PURE__ */ u("div", { className: "slider-container", children: [
      /* @__PURE__ */ u("div", { className: "slider-values", children: [
        /* @__PURE__ */ t("span", { className: "min-value", children: a }),
        /* @__PURE__ */ t("span", { className: "current-value", children: i }),
        /* @__PURE__ */ t("span", { className: "max-value", children: n })
      ] }),
      /* @__PURE__ */ t(
        "input",
        {
          type: "range",
          value: i,
          min: a,
          max: n,
          step: r,
          onChange: (d) => {
            const h = Number(d.target.value);
            e(h), o(h);
          }
        }
      )
    ] })
  ] });
}, b = ({
  placeholder: a = "",
  label: n = "",
  default: r = "",
  onchange: l
}) => {
  const [s, o] = m(r);
  return /* @__PURE__ */ u("div", { className: "widget-button", children: [
    n && /* @__PURE__ */ t("label", { children: n }),
    /* @__PURE__ */ t(
      "input",
      {
        type: "text",
        value: s,
        onChange: (e) => o(e.target.value),
        onBlur: () => {
          l(s);
        },
        placeholder: a
      }
    )
  ] });
}, k = ({
  fields: a,
  submitLabel: n = "Submit",
  onchange: r
}) => {
  const [l, s] = m({}), o = (c, d) => {
    s((h) => ({ ...h, [c]: d }));
  }, i = () => {
    r({ ...l });
  }, e = (c) => {
    const d = {
      ...c,
      onchange: (h) => o(c.id, h)
    };
    switch (c.type) {
      case "buttonGroup":
        return /* @__PURE__ */ t(p, { ...d, choices: c.choices ?? [] });
      case "select":
        return /* @__PURE__ */ t(g, { ...d, choices: c.choices ?? [] });
      case "selectMulti":
        return /* @__PURE__ */ t(v, { ...d, choices: c.choices ?? [] });
      case "slider":
        return /* @__PURE__ */ t(
          w,
          {
            ...d,
            min: c.min ?? 0,
            max: c.max ?? 100
          }
        );
      case "textInput":
        return /* @__PURE__ */ t(b, { ...d });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ u("div", { className: "widget-form", children: [
    a.map((c) => /* @__PURE__ */ t("div", { children: e(c) }, c.id)),
    /* @__PURE__ */ t("button", { type: "button", onClick: i, children: n })
  ] });
}, S = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ButtonGroup: p,
  Form: k,
  Select: g,
  SelectMulti: v,
  Slider: w,
  TextInput: b
}, Symbol.toStringTag, { value: "Module" })), x = {
  buttonGroup: "ButtonGroup",
  form: "Form",
  select: "Select",
  selectMulti: "SelectMulti",
  slider: "Slider",
  textInput: "TextInput"
}, E = ({ id: a, content: n }) => {
  const r = JSON.parse(atob(n)), l = x[r.type] || r.type, s = S[l], o = (i) => {
    const e = new CustomEvent("widget-event", {
      detail: i,
      bubbles: !0,
      composed: !0
    }), c = document.querySelector(".widget-container");
    c && c.dispatchEvent(e);
  };
  return s ? /* @__PURE__ */ t("div", { className: "widget", children: /* @__PURE__ */ t(
    s,
    {
      ...r,
      onchange: (i) => o({ id: a, value: i })
    }
  ) }) : /* @__PURE__ */ t("div", { className: "widget", children: /* @__PURE__ */ u("span", { style: { color: "red" }, children: [
    'Unknown widget "',
    r.type,
    '"'
  ] }) });
};
class M extends HTMLElement {
  constructor() {
    super(...arguments), this.reactRoot = null;
  }
  connectedCallback() {
    const n = this.getAttribute("id") || "", r = this.getAttribute("content") || "";
    this.innerHTML = "";
    const l = document.createElement("div");
    this.appendChild(l), this.reactRoot = C(l), this.reactRoot.render(f.createElement(E, { id: n, content: r }));
  }
  disconnectedCallback() {
    this.reactRoot && (this.reactRoot.unmount(), this.reactRoot = null);
  }
}
typeof window < "u" && !customElements.get("markdown-ui-widget") && customElements.define("markdown-ui-widget", M);
const T = ({ html: a, onWidgetEvent: n }) => {
  const r = y(null);
  return N(() => {
    const l = (o) => {
      n && n(o.detail);
    }, s = r.current;
    if (s)
      return s.addEventListener("widget-event", l), () => {
        s.removeEventListener("widget-event", l);
      };
  }, [n]), /* @__PURE__ */ t("div", { ref: r, className: "widget-container", children: /* @__PURE__ */ t("div", { dangerouslySetInnerHTML: { __html: a } }) });
};
export {
  p as ButtonGroup,
  k as Form,
  T as MarkdownUI,
  g as Select,
  v as SelectMulti,
  w as Slider,
  b as TextInput
};
