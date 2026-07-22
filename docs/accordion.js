//#region lib/utils.ts
var e = (e) => e.classList.remove("is-active"), t = (e) => e.classList.add("is-active"), n = () => document.location.hash.replace(/^#\//, ""), r = class {
	el;
	$body = null;
	$button = null;
	$inner = null;
	isDeselect = !1;
	isOpen = !1;
	height = 0;
	transitionDuration = 0;
	openEvent;
	closeEvent;
	constructor(e) {
		this.el = e;
		let t = {
			bubbles: !1,
			cancelable: !0,
			detail: { current: this.el }
		};
		this.openEvent = new CustomEvent("Panel.open", t), this.closeEvent = new CustomEvent("Panel.close", t);
	}
	init() {
		this.$button = this.el.querySelector(".js-accordion-header"), this.$body = this.$button.ariaControlsElements[0], this.$inner = this.$body.querySelector(".js-accordion-inner"), this.isDeselect = JSON.parse(this.el.getAttribute("data-accordion-deselect")), this.isOpen = JSON.parse(this.el.getAttribute("data-accordion-open")), this.$body.setAttribute("aria-labelledby", `${this.$button.id}`), this.handleResize(), this.initEvents(), this.$button?.tagName === "BUTTON" && (!0 === this.isOpen ? this.open() : this.close());
	}
	initEvents() {
		this.$button.addEventListener("click", this.handleClick, { passive: !0 }), window.addEventListener("resize", this.handleResize, { passive: !0 });
	}
	handleClick = () => !1 === this.isDeselect && !0 === this.isOpen ? !1 : !0 === this.isOpen ? (this.el.dispatchEvent(this.closeEvent), this.close()) : !1 === this.isOpen ? (this.el.dispatchEvent(this.openEvent), this.open()) : !0;
	handleResize = () => {
		this.$body.removeAttribute("hidden"), this.height = this.$inner?.offsetHeight || 0, this.$body.style.setProperty("overflow", "hidden"), this.transitionDuration = parseFloat(getComputedStyle(this.$body).transitionDuration) * 1e3 || 0;
	};
	close() {
		this.el.setAttribute("data-accordion-open", "false"), this.$button.setAttribute("aria-expanded", "false"), this.$body.style.setProperty("max-height", `${this.height}px`), setTimeout(() => {
			this.$body.style.setProperty("max-height", "0");
		}, 1), setTimeout(() => {
			this.$body.setAttribute("hidden", "");
		}, this.transitionDuration), e(this.el), this.isOpen = !1;
	}
	open() {
		this.el.setAttribute("data-accordion-open", "true"), this.$button.setAttribute("aria-expanded", "true"), this.$body.removeAttribute("hidden"), setTimeout(() => {
			this.$body.style.setProperty("max-height", `${this.height}px`), setTimeout(() => {
				this.$body.style.removeProperty("max-height");
			}, this.transitionDuration);
		}, 1), t(this.el), this.isOpen = !0;
	}
	destroy() {
		this.$button.removeEventListener("click", this.handleClick), window.removeEventListener("resize", this.handleResize), this.$body.style.removeProperty("max-height"), this.$body.style.removeProperty("overflow"), this.$body.removeAttribute("hidden"), e(this.el);
	}
}, i = { multiselectable: !1 }, a = class {
	el;
	accordions = [];
	panels = [];
	current = 0;
	options;
	listeners = /* @__PURE__ */ new Map();
	constructor(e, t = {}) {
		this.el = e, this.options = {
			...i,
			...t
		};
	}
	init() {
		return this.el instanceof HTMLElement ? (this.accordions = [...this.el.children].filter((e) => e.classList.contains("js-accordion-panel")), this.accordions.forEach((e, t) => {
			let n = new r(e);
			return n.init(), this.panels.push(n), this.listeners.set(t, () => this.handlePanelOpen(t)), n.el.addEventListener("Panel.open", this.listeners.get(t)), !0;
		}), this.initEvents(), this.handleHashChange(), !0) : !1;
	}
	initEvents() {
		window.addEventListener("hashchange", this.handleHashChange), this.el.addEventListener("keydown", this.handleKeyDown);
	}
	handleHashChange = () => {
		this.panels.forEach((e, t) => e.$body && `#${e.$body.id}` === n() ? (console.info({
			index: t,
			$body: e.$body,
			bodyID: `#${e.$body.id}`,
			getURLHash: n()
		}), this.current = t, this.panels.forEach((e, n) => {
			n !== t && e.close();
		}), e.open()) : !0);
	};
	handleKeyDown = (e) => {
		let { target: t, key: n, code: r } = e, i = () => {
			t.classList.contains("js-accordion-header") && (this.current = this.current + 1 > this.panels.length - 1 ? 0 : this.current + 1, this.panels[this.current].$button?.focus(), e.preventDefault());
		}, a = () => {
			t.classList.contains("js-accordion-header") && (this.current = 0 > this.current - 1 ? this.panels.length - 1 : this.current - 1, this.panels[this.current].$button?.focus(), e.preventDefault());
		}, o = {
			ArrowUp: a,
			ArrowRight: i,
			ArrowDown: i,
			ArrowLeft: a,
			Home: () => {
				this.panels[0].$button?.focus(), e.preventDefault();
			},
			End: () => {
				this.panels[this.panels.length - 1].$button?.focus(), e.preventDefault();
			},
			default: () => !1
		};
		return (o[n || r] || o.default)();
	};
	handlePanelOpen = (e) => {
		this.current = e, this.options.multiselectable || this.panels.forEach((t, n) => {
			n !== e && t.close();
		});
	};
	closeAll = () => this.panels.forEach((e) => e.close());
	destroyAll() {
		return this.panels.forEach((e, t) => {
			e.destroy(), e.el.removeEventListener("Panel.open", this.listeners.get(t));
		}), this.panels = [], window.removeEventListener("hashchange", this.handleHashChange), this.el.removeEventListener("keydown", this.handleKeyDown), !0;
	}
};
//#endregion
export { a as default };
