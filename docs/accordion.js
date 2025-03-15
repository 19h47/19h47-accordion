const a = (n) => n.classList.remove("is-active"), p = (n) => n.classList.add("is-active"), f = () => document.location.hash.replace(/^#\//, ""), c = "aria-expanded";
class v {
  /**
   * Constructor
   *
   * @param {HTMLElement} el
   */
  constructor(s) {
    this.$body = null, this.$button = null, this.$inner = null, this.isDeselect = !1, this.isOpen = !1, this.height = 0, this.handleClick = () => this.isDeselect === !1 && this.isOpen === !0 ? !1 : this.isOpen === !0 ? (this.el.dispatchEvent(this.closeEvent), this.close()) : this.isOpen === !1 ? (this.el.dispatchEvent(this.openEvent), this.open()) : !0, this.handleResize = () => {
      var t;
      this.height = ((t = this.$inner) == null ? void 0 : t.offsetHeight) || 0, this.isOpen && this.$body.style.setProperty("max-height", `${this.height}px`);
    }, this.el = s;
    const e = {
      bubbles: !1,
      cancelable: !0,
      detail: { current: this.el }
    };
    this.openEvent = new CustomEvent("Panel.open", e), this.closeEvent = new CustomEvent("Panel.close", e);
  }
  /**
   * Init
   *
   * @return {void}
   */
  init() {
    var e;
    this.$button = this.el.querySelector(".js-accordion-header");
    const s = ((e = this.$button.getAttribute("aria-controls")) == null ? void 0 : e.trim().split(" ")[0]) || "";
    this.$body = document.getElementById(s), this.$inner = this.$body.querySelector(".js-accordion-inner"), this.isDeselect = JSON.parse(this.el.getAttribute("data-accordion-deselect")), this.isOpen = JSON.parse(this.el.getAttribute("data-accordion-open")), this.$body.style.setProperty("max-height", this.height.toString()), this.$body.style.setProperty("overflow", "hidden"), this.$body.setAttribute("aria-labelledby", `${this.$button.id}`), this.handleResize(), this.initEvents(), this.isOpen === !0 && this.open();
  }
  /**
   * Init events
   *
   * @return {void}
   */
  initEvents() {
    this.$button.addEventListener("click", this.handleClick, { passive: !0 }), window.addEventListener("resize", this.handleResize, { passive: !0 });
  }
  /**
   * Close
   *
   * @return {void}
   */
  close() {
    this.el.setAttribute("data-accordion-open", "false"), this.$button.setAttribute(c, "false"), this.$body.style.setProperty("max-height", "0"), a(this.el), this.isOpen = !1;
  }
  /**
   * Open
   *
   * @return {void}
   */
  open() {
    this.el.setAttribute("data-accordion-open", "true"), this.$button.setAttribute(c, "true"), this.$body.style.setProperty("max-height", `${this.height}px`), p(this.el), this.isOpen = !0;
  }
  /**
   * Destroy
   *
   * @return {void}
   */
  destroy() {
    this.$button.removeEventListener("click", this.handleClick), window.removeEventListener("resize", this.handleResize), this.$body.style.removeProperty("max-height"), this.$body.style.removeProperty("overflow"), a(this.el);
  }
}
const b = {
  multiselectable: !1
};
class g {
  /**
   * Constructor
   *
   * @param {HTMLElement} el
   * @param {Options} [options]
   */
  constructor(s, e = {}) {
    this.accordions = [], this.panels = [], this.current = 0, this.listeners = /* @__PURE__ */ new Map(), this.handleHashChange = () => {
      this.panels.forEach((t, h) => t.$body && `#${t.$body.id}` === f() ? (this.current = h, this.closeAll(), t.open()) : !0);
    }, this.handleKeyDown = (t) => {
      const { target: h, key: d, code: u } = t, r = () => {
        var i;
        h.classList.contains("js-accordion-header") && (this.current = this.current + 1 > this.panels.length - 1 ? 0 : this.current + 1, (i = this.panels[this.current].$button) == null || i.focus(), t.preventDefault());
      }, o = () => {
        var i;
        h.classList.contains("js-accordion-header") && (this.current = 0 > this.current - 1 ? this.panels.length - 1 : this.current - 1, (i = this.panels[this.current].$button) == null || i.focus(), t.preventDefault());
      }, l = {
        ArrowUp: o,
        ArrowRight: r,
        ArrowDown: r,
        ArrowLeft: o,
        Home: () => {
          var i;
          (i = this.panels[0].$button) == null || i.focus(), t.preventDefault();
        },
        End: () => {
          var i;
          (i = this.panels[this.panels.length - 1].$button) == null || i.focus(), t.preventDefault();
        },
        default: () => !1
      };
      return (l[d || u] || l.default)();
    }, this.handlePanelOpen = (t) => {
      this.current = t, this.options.multiselectable || this.closeAll();
    }, this.closeAll = () => this.panels.forEach((t) => t.close()), this.el = s, this.options = { ...b, ...e };
  }
  /**
   * Initializes the accordion component.
   *
   * @returns {boolean} - Returns `false` if no element has been provided, otherwise `true`.
   *
   * This method performs the following actions:
   * - Checks if the element (`this.el`) is `null` or `undefined`. If so, it returns `false`.
   * - Filters the children of the element to find those with the class `js-accordion-panel` and stores them in `this.accordions`.
   * - Iterates over each accordion panel, initializes a new `Panel` instance, and adds it to `this.panels`.
   * - Adds an event listener for the `Panel.open` event to each panel.
   * - Initializes additional events by calling `this.initEvents()`.
   * - Handles any hash changes by calling `this.handleHashChange()`.
   */
  init() {
    return this.el instanceof HTMLElement ? (this.accordions = [...this.el.children].filter((s) => s.classList.contains("js-accordion-panel")), this.accordions.forEach((s, e) => {
      const t = new v(s);
      return t.init(), this.panels.push(t), this.listeners.set(e, () => this.handlePanelOpen(e)), t.el.addEventListener("Panel.open", this.listeners.get(e)), !0;
    }), this.initEvents(), this.handleHashChange(), !0) : !1;
  }
  /**
   * Initializes event listeners for the accordion component.
   *
   * This method sets up the following event listeners:
   * - `hashchange` event on the `window` object, handled by `handleHashChange`.
   * - `keydown` event on the accordion element (`this.el`), handled by `handleKeyDown`.
   *
   * @returns {void}
   */
  initEvents() {
    window.addEventListener("hashchange", this.handleHashChange), this.el.addEventListener("keydown", this.handleKeyDown);
  }
  /**
   * destroyAll
   *
   * @return {boolean}
   */
  destroyAll() {
    return this.panels.forEach((s, e) => {
      s.destroy(), s.el.removeEventListener("Panel.open", this.listeners.get(e));
    }), this.panels = [], window.removeEventListener("hashchange", this.handleHashChange), this.el.removeEventListener("keydown", this.handleKeyDown), !0;
  }
}
export {
  g as default
};
