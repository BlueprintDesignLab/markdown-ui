import { jsxs as h, jsx as t } from "react/jsx-runtime";
import f, { useState as m, useRef as C, useEffect as y } from "react";
import { createRoot as k } from "react-dom/client";
const g = ({
  choices: o,
  label: n = "",
  default: r,
  onchange: c
}) => {
  const [s, l] = m(r ?? o[0]), i = (e) => {
    l(e), c(e);
  };
  return /* @__PURE__ */ h("div", { className: "widget-button-group", children: [
    n && /* @__PURE__ */ t("label", { children: n }),
    /* @__PURE__ */ t("div", { role: "group", "aria-label": n, children: o.map((e) => /* @__PURE__ */ t(
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
}, p = ({
  choices: o,
  label: n = "",
  default: r,
  onchange: c
}) => {
  const [s, l] = m(r ?? o[0]);
  return /* @__PURE__ */ h("div", { className: "selector", children: [
    n && /* @__PURE__ */ t("label", { children: n }),
    /* @__PURE__ */ t("select", { value: s, onChange: (e) => {
      const a = e.target.value;
      l(a), c(a);
    }, children: o.map((e) => /* @__PURE__ */ t("option", { value: e, children: e }, e)) })
  ] });
}, v = ({
  choices: o,
  label: n = "",
  default: r,
  onchange: c
}) => {
  const [s, l] = m(
    Array.isArray(r) ? r : r ? [r] : []
  ), i = (e) => {
    const a = e.target.value;
    let d;
    e.target.checked ? d = [...s, a] : d = s.filter((u) => u !== a), l(d), c(d);
  };
  return /* @__PURE__ */ h("div", { className: "selector-multi", children: [
    n && /* @__PURE__ */ t("div", { className: "selector-multi-label", children: n }),
    /* @__PURE__ */ t("div", { className: "checkbox-group", children: o.map((e) => /* @__PURE__ */ h("label", { className: "checkbox-item", children: [
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
  min: o,
  max: n,
  step: r = 1,
  label: c = "",
  default: s = o,
  onchange: l
}) => {
  const [i, e] = m(s);
  return /* @__PURE__ */ h("div", { className: "widget-slider", children: [
    c && /* @__PURE__ */ t("label", { children: c }),
    /* @__PURE__ */ t(
      "input",
      {
        type: "range",
        value: i,
        min: o,
        max: n,
        step: r,
        onChange: (d) => {
          const u = Number(d.target.value);
          e(u), l(u);
        }
      }
    )
  ] });
}, b = ({
  placeholder: o = "",
  label: n = "",
  default: r = "",
  onchange: c
}) => {
  const [s, l] = m(r);
  return /* @__PURE__ */ h("div", { className: "widget-button", children: [
    n && /* @__PURE__ */ t("label", { children: n }),
    /* @__PURE__ */ t(
      "input",
      {
        type: "text",
        value: s,
        onChange: (e) => l(e.target.value),
        onBlur: () => {
          c(s);
        },
        placeholder: o
      }
    )
  ] });
}, N = ({
  fields: o,
  submitLabel: n = "Submit",
  onchange: r
}) => {
  const [c, s] = m({}), l = (a, d) => {
    s((u) => ({ ...u, [a]: d }));
  }, i = () => {
    r({ ...c });
  }, e = (a) => {
    const d = {
      ...a,
      onchange: (u) => l(a.id, u)
    };
    switch (a.type) {
      case "buttonGroup":
        return /* @__PURE__ */ t(g, { ...d, choices: a.choices ?? [] });
      case "select":
        return /* @__PURE__ */ t(p, { ...d, choices: a.choices ?? [] });
      case "selectMulti":
        return /* @__PURE__ */ t(v, { ...d, choices: a.choices ?? [] });
      case "slider":
        return /* @__PURE__ */ t(
          w,
          {
            ...d,
            min: a.min ?? 0,
            max: a.max ?? 100
          }
        );
      case "textInput":
        return /* @__PURE__ */ t(b, { ...d });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ h("div", { className: "widget-form", children: [
    o.map((a) => /* @__PURE__ */ t("div", { children: e(a) }, a.id)),
    /* @__PURE__ */ t("button", { type: "button", onClick: i, children: n })
  ] });
}, x = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ButtonGroup: g,
  Form: N,
  Select: p,
  SelectMulti: v,
  Slider: w,
  TextInput: b
}, Symbol.toStringTag, { value: "Module" })), E = ({ id: o, content: n }) => {
  const r = JSON.parse(atob(n)), c = x[r.type], s = (l) => {
    const i = new CustomEvent("widget-event", {
      detail: l,
      bubbles: !0,
      composed: !0
    }), e = document.querySelector(".widget-container");
    e && e.dispatchEvent(i);
  };
  return c ? /* @__PURE__ */ t("div", { className: "widget", children: /* @__PURE__ */ t(
    c,
    {
      ...r,
      onchange: (l) => s({ id: o, value: l })
    }
  ) }) : /* @__PURE__ */ t("div", { className: "widget", children: /* @__PURE__ */ h("span", { style: { color: "red" }, children: [
    'Unknown widget "',
    r.type,
    '"'
  ] }) });
};
class S extends HTMLElement {
  constructor() {
    super(...arguments), this.reactRoot = null;
  }
  connectedCallback() {
    const n = this.getAttribute("id") || "", r = this.getAttribute("content") || "";
    this.innerHTML = "";
    const c = document.createElement("div");
    this.appendChild(c), this.reactRoot = k(c), this.reactRoot.render(f.createElement(E, { id: n, content: r }));
  }
  disconnectedCallback() {
    this.reactRoot && (this.reactRoot.unmount(), this.reactRoot = null);
  }
}
typeof window < "u" && !customElements.get("markdown-ui-widget") && customElements.define("markdown-ui-widget", S);
const _ = ({ html: o, onWidgetEvent: n }) => {
  const r = C(null);
  return y(() => {
    const c = (l) => {
      n && n(l.detail);
    }, s = r.current;
    if (s)
      return s.addEventListener("widget-event", c), () => {
        s.removeEventListener("widget-event", c);
      };
  }, [n]), /* @__PURE__ */ t("div", { ref: r, className: "widget-container", children: /* @__PURE__ */ t("div", { dangerouslySetInnerHTML: { __html: o } }) });
};
export {
  g as ButtonGroup,
  N as Form,
  _ as MarkdownUI,
  p as Select,
  v as SelectMulti,
  w as Slider,
  b as TextInput
};
