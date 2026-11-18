import { createPortal, flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import Counter from "./counter";
import { SwipeToast, type ToastTone } from "./swipe-toast";
import "./counter.css";
import "./swipe-toast.css";

type Options = {
  language?: string;
  tone?: ToastTone;
  key?: string;
  publication?: boolean;
  returnFocus?: () => void;
  heading?: string;
  detail?: string;
  href?: string;
  linkLabel?: string;
  action?: { label: string; run: () => void };
  closeButton?: boolean;
};
type Toast = { id: number; message: string; options: Options; dismiss: () => void };
type Stat = { node: HTMLElement; value: number; locale: string; appearance: { played: boolean } };

const instances = new WeakMap<Document, ReturnType<typeof mountFeedback>>();
const numberFormat = { useGrouping: false };

function mountFeedback(doc: Document) {
  const host = doc.createElement("div");
  host.className = "action-toast-host";
  host.dataset.actionToastHost = "";
  host.hidden = true;
  doc.body.append(host);
  const root = createRoot(host);
  const counters = new Map<string, Stat>();
  let toasts: Toast[] = [];
  let sequence = 0;

  // One persistent host also serves native dialogs, which make the rest of the page inert.
  const observer = new doc.defaultView!.MutationObserver(records => {
    if (records.some(record => record.type === "attributes" || [...record.removedNodes].some(node => node.contains(host)))) place();
  });
  function place() {
    const dialog = toasts.length ? [...doc.querySelectorAll("dialog[open]")].at(-1) : undefined;
    const target = dialog || doc.body;
    const moving = host.parentElement !== target;
    const focused = moving && host.contains(doc.activeElement) ? doc.activeElement as HTMLElement : null;
    if (moving) {
      if (host.hasAttribute("popover") && host.matches(":popover-open")) host.hidePopover();
      target.append(host);
    }
    host.hidden = toasts.length === 0;
    if (toasts.length && typeof host.showPopover === "function") {
      host.setAttribute("popover", "manual");
      if (!host.matches(":popover-open")) {
        try { host.showPopover(); } catch { host.removeAttribute("popover"); }
      }
    } else {
      host.removeAttribute("popover");
    }
    focused?.focus({ preventScroll: true });
  }

  function render() {
    flushSync(() => root.render(<>
      {toasts.map(({ id, message, options, dismiss }) => <SwipeToast key={id} toastId={id}
        tone={options.tone} language={options.language} publication={options.publication} dismiss={dismiss}
        returnFocus={options.returnFocus} action={options.action} closeButton={options.closeButton}>
        {options.heading && <strong data-success-heading>{options.heading}</strong>}
        <span data-success-message>{message}</span>
        {options.detail && <span data-success-title>{options.detail}</span>}
        {options.href && <a data-success-link href={options.href} target="_blank" rel="noopener noreferrer">{options.linkLabel}</a>}
      </SwipeToast>)}
      {[...counters].filter(([, stat]) => stat.node.isConnected).map(([id, { node, value, locale, appearance }]) =>
        createPortal(<Counter value={value} locale={locale} format={numberFormat} fontSize="inherit" motionBlur={false}
          announce intro={!appearance.played} onFirstAppearance={() => { appearance.played = true; }}/>, node, id))}
    </>));
  }

  function show(message: string, options: Options) {
    const tone = options.tone || "success";
    const key = options.key ?? message;
    const duplicate = toasts.find(toast => toast.options.key === key && toast.options.tone === tone);
    if (duplicate) return handles(duplicate);

    const id = ++sequence;
    const toast = { id, message, options: { ...options, tone, key }, dismiss };
    function dismiss() {
      if (!toasts.includes(toast)) return;
      toasts = toasts.filter(item => item !== toast);
      render();
      if (!toasts.length) { observer.disconnect(); place(); }
    }
    if (toasts.length === 3) {
      const oldest = toasts.find(item => !host.querySelector(`[data-toast-id="${item.id}"]`)?.contains(doc.activeElement));
      toasts = toasts.filter(item => item !== oldest);
    }
    toasts.push(toast);
    place();
    observer.observe(doc.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["open"] });
    render();
    return handles(toast);
  }

  function handles(toast: Toast) {
    return {
      get node() { return host.querySelector(`[data-toast-id="${toast.id}"]`); },
      dismiss: toast.dismiss,
      update(options: Options, text = toast.message) {
        if (!toasts.includes(toast)) return;
        toast.message = text;
        toast.options = { ...toast.options, ...options };
        render();
      }
    };
  }

  function setCounters(values: Record<string, number>, language: string) {
    const locale = language === "vi" ? "vi-VN" : "en-GB";
    let changed = false;
    for (const [id, value] of Object.entries(values)) {
      const node = doc.getElementById(id), current = counters.get(id);
      if (!node || !Number.isFinite(value) || (current?.node === node && current.value === value && current.locale === locale)) continue;
      if (current?.node !== node) node.replaceChildren();
      counters.set(id, { node, value, locale, appearance: current?.appearance || { played: false } });
      changed = true;
    }
    if (changed) render();
  }

  function clearCounters(ids: string[]) {
    if (!ids.some(id => counters.has(id))) return;
    for (const id of ids) counters.delete(id);
    render();
    for (const id of ids) {
      const node = doc.getElementById(id);
      if (node) node.textContent = "—";
    }
  }

  return { show, setCounters, clearCounters };
}

function feedback(doc: Document) {
  let instance = instances.get(doc);
  if (!instance) { instance = mountFeedback(doc); instances.set(doc, instance); }
  return instance;
}

export function showActionToast(doc: Document, message: string, options: Options = {}) {
  return feedback(doc).show(message, options);
}

export function setCounterValues(doc: Document, values: Record<string, number>, language: string) {
  if (Object.keys(values).length) feedback(doc).setCounters(values, language);
}

export function clearCounterValues(doc: Document, ids: string[]) {
  instances.get(doc)?.clearCounters(ids);
}
