const c = (n) => n.classList.remove("is-active"), p = (n) => n.classList.add("is-active"), d = () => document.location.hash.replace(/^#\//, ""), u = "aria-expanded";
class f {
  /**
   * Constructor
   *
   * @param {HTMLElement} el
   */
  constructor(e) {
    this.$body = null, this.$button = null, this.$inner = null, this.isDeselect = !1, this.isOpen = !1, this.height = 0, this.transitionDuration = 0, this.handleClick = () => this.isDeselect === !1 && this.isOpen === !0 ? !1 : this.isOpen === !0 ? (this.el.dispatchEvent(this.closeEvent), this.close()) : this.isOpen === !1 ? (this.el.dispatchEvent(this.openEvent), this.open()) : !0, this.handleResize = () => {
      this.$body.removeAttribute("hidden"), this.height = this.$inner?.offsetHeight || 0, this.$body.style.setProperty("overflow", "hidden"), this.transitionDuration = parseFloat(getComputedStyle(this.$body).transitionDuration) * 1e3 || 0;
    }, this.el = e;
    const s = {
      bubbles: !1,
      cancelable: !0,
      detail: { current: this.el }
    };
    this.openEvent = new CustomEvent("Panel.open", s), this.closeEvent = new CustomEvent("Panel.close", s);
  }
  /**
   * Init
   *
   * @return {void}
   */
  init() {
    this.$button = this.el.querySelector(".js-accordion-header"), this.$body = this.$button.ariaControlsElements[0], this.$inner = this.$body.querySelector(".js-accordion-inner"), this.isDeselect = JSON.parse(
      this.el.getAttribute("data-accordion-deselect")
    ), this.isOpen = JSON.parse(
      this.el.getAttribute("data-accordion-open")
    ), this.$body.setAttribute("aria-labelledby", `${this.$button.id}`), this.handleResize(), this.initEvents(), this.$button?.tagName === "BUTTON" && (this.isOpen === !0 ? this.open() : this.close());
  }
  /**
   * Init events
   *
   * @return {void}
   */
  initEvents() {
    this.$button.addEventListener("click", this.handleClick, {
      passive: !0
    }), window.addEventListener("resize", this.handleResize, { passive: !0 });
  }
  /**
   * Close
   *
   * @return {void}
   */
  close() {
    this.el.setAttribute("data-accordion-open", "false"), this.$button.setAttribute(u, "false"), this.$body.style.setProperty("max-height", `${this.height}px`), setTimeout(() => {
      this.$body.style.setProperty("max-height", "0");
    }, 1), setTimeout(() => {
      this.$body.setAttribute("hidden", "");
    }, this.transitionDuration), c(this.el), this.isOpen = !1;
  }
  /**
   * Open
   *
   * @return {void}
   */
  open() {
    this.el.setAttribute("data-accordion-open", "true"), this.$button.setAttribute(u, "true"), this.$body.removeAttribute("hidden"), setTimeout(() => {
      this.$body.style.setProperty("max-height", `${this.height}px`), setTimeout(() => {
        this.$body.style.removeProperty("max-height");
      }, this.transitionDuration);
    }, 1), p(this.el), this.isOpen = !0;
  }
  /**
   * Destroy
   *
   * @return {void}
   */
  destroy() {
    this.$button.removeEventListener("click", this.handleClick), window.removeEventListener("resize", this.handleResize), this.$body.style.removeProperty("max-height"), this.$body.style.removeProperty("overflow"), this.$body.removeAttribute("hidden"), c(this.el);
  }
}
const b = {
  multiselectable: !1
};
class $ {
  /**
   * Constructor
   *
   * @param {HTMLElement} el
   * @param {Options} [options]
   */
  constructor(e, s = {}) {
    this.accordions = [], this.panels = [], this.current = 0, this.listeners = /* @__PURE__ */ new Map(), this.handleHashChange = () => {
      this.panels.forEach((t, i) => t.$body && `#${t.$body.id}` === d() ? (console.info({ index: i, $body: t.$body, bodyID: `#${t.$body.id}`, getURLHash: d() }), this.current = i, this.panels.forEach((h, o) => {
        o !== i && h.close();
      }), t.open()) : !0);
    }, this.handleKeyDown = (t) => {
      const { target: i, key: h, code: o } = t, r = () => {
        i.classList.contains("js-accordion-header") && (this.current = this.current + 1 > this.panels.length - 1 ? 0 : this.current + 1, this.panels[this.current].$button?.focus(), t.preventDefault());
      }, a = () => {
        i.classList.contains("js-accordion-header") && (this.current = 0 > this.current - 1 ? this.panels.length - 1 : this.current - 1, this.panels[this.current].$button?.focus(), t.preventDefault());
      }, l = {
        ArrowUp: a,
        ArrowRight: r,
        ArrowDown: r,
        ArrowLeft: a,
        Home: () => {
          this.panels[0].$button?.focus(), t.preventDefault();
        },
        End: () => {
          this.panels[this.panels.length - 1].$button?.focus(), t.preventDefault();
        },
        default: () => !1
      };
      return (l[h || o] || l.default)();
    }, this.handlePanelOpen = (t) => {
      this.current = t, this.options.multiselectable || this.panels.forEach((i, h) => {
        h !== t && i.close();
      });
    }, this.closeAll = () => this.panels.forEach((t) => t.close()), this.el = e, this.options = { ...b, ...s };
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
    return this.el instanceof HTMLElement ? (this.accordions = [...this.el.children].filter((e) => e.classList.contains("js-accordion-panel")), this.accordions.forEach((e, s) => {
      const t = new f(e);
      return t.init(), this.panels.push(t), this.listeners.set(s, () => this.handlePanelOpen(s)), t.el.addEventListener("Panel.open", this.listeners.get(s)), !0;
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
    return this.panels.forEach((e, s) => {
      e.destroy(), e.el.removeEventListener("Panel.open", this.listeners.get(s));
    }), this.panels = [], window.removeEventListener("hashchange", this.handleHashChange), this.el.removeEventListener("keydown", this.handleKeyDown), !0;
  }
}
export {
  $ as default
};
