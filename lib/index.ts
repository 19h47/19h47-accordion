import Panel from './Panel';
import { getURLHash } from './utils';

/**
 * Options
 *
 * @interface Options
 * @property {boolean} multiselectable - Determines if multiple panels can be expanded at the same time. Default is `false`.
 */
interface Options {
	multiselectable?: boolean;
}

/**
 * Default options for the accordion component.
 *
 * @property {boolean} multiselectable - Determines if multiple panels can be expanded at the same time. Default is `false`.
 */
const optionsDefault: Options = {
	multiselectable: false,
};

/**
 * Accordion
 *
 * @class Accordion
 * @version 6.0.0
 * @since 0.0.0
 *
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */
export default class Accordion {
	el: HTMLElement;
	accordions: HTMLElement[] = [];
	panels: Panel[] = [];
	current: number = 0;
	options: Options;
	listeners: Map<number, () => void> = new Map();

	/**
	 * Constructor
	 *
	 * @param {HTMLElement} el
	 * @param {Options} [options]
	 */
	constructor(el: HTMLElement, options: Options = {}) {
		this.el = el;

		this.options = { ...optionsDefault, ...options };
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
	init(): boolean {
		// No need to go further if no element has been given
		if (!(this.el instanceof HTMLElement)) {
			return false;
		}

		this.accordions = [...this.el.children].filter(panel => panel.classList.contains('js-accordion-panel')) as HTMLElement[];

		this.accordions.forEach((element, index) => {
			const panel = new Panel(element);

			panel.init();
			this.panels.push(panel);

			// Add listener
			this.listeners.set(index, () => this.handlePanelOpen(index));

			panel.el.addEventListener('Panel.open', this.listeners.get(index)!);

			return true;
		});

		this.initEvents();
		this.handleHashChange();

		return true;
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
	initEvents(): void {
		window.addEventListener('hashchange', this.handleHashChange);
		this.el.addEventListener('keydown', this.handleKeyDown);
	}

	/**
	 * handleHashChange
	 *
	 * @return {void}
	 */
	handleHashChange = (): void => {
		this.panels.forEach((panel, index) => {
			if (panel.$body && `#${panel.$body.id}` === getURLHash()) {
				console.info({index, $body: panel.$body, bodyID: `#${panel.$body.id}`, getURLHash: getURLHash()});
				this.current = index;
				this.panels.forEach((panel, i) => {
					if (i !== index) {
						panel.close();
					}
				});

				return panel.open();
			}

			return true;
		});
	};

	/**
	 * Handle keydown
	 *
	 * @param {KeyboardEvent} event
	 *
	 * @return {any}
	 */
	handleKeyDown = (keyboardEvent: KeyboardEvent): any => {
		const { target, key, code } = keyboardEvent;


		const next = () => {
			if ((target as HTMLElement).classList.contains('js-accordion-header')) {
				this.current = this.current + 1 > this.panels.length - 1 ? 0 : this.current + 1;

				this.panels[this.current].$button?.focus();

				keyboardEvent.preventDefault();
			}
		};

		const previous = () => {
			if ((target as HTMLElement).classList.contains('js-accordion-header')) {
				this.current = 0 > this.current - 1 ? this.panels.length - 1 : this.current - 1;

				this.panels[this.current].$button?.focus();

				keyboardEvent.preventDefault();
			}
		};

		const first = () => {
			this.panels[0].$button?.focus();

			keyboardEvent.preventDefault();
		};

		const last = () => {
			this.panels[this.panels.length - 1].$button?.focus();

			keyboardEvent.preventDefault();
		};

		const keyHandlers: any = {
			ArrowUp: previous,
			ArrowRight: next,
			ArrowDown: next,
			ArrowLeft: previous,
			Home: first,
			End: last,
			default: () => false,
		};

		return (keyHandlers[key || code] || keyHandlers.default)();
	};

	/**
	 * handle Panel Open
	 *
	 * @param {number} index
	 *
	 * @return {void}
	 */
	handlePanelOpen = (index: number): void => {
		this.current = index;

		if (!this.options.multiselectable) {
			this.panels.forEach((panel, i) => {
				if (i !== index) {
					panel.close();
				}
			});
		}
	};

	/**
	 * closeAll
	 *
	 * @return {void}
	 */
	closeAll = (): void => this.panels.forEach(panel => panel.close());

	/**
	 * destroyAll
	 *
	 * @return {boolean}
	 */
	destroyAll(): boolean {
		this.panels.forEach((panel, index) => {
			panel.destroy();
			panel.el.removeEventListener('Panel.open', this.listeners.get(index)!);
		});
		this.panels = [];
		window.removeEventListener('hashchange', this.handleHashChange);
		this.el.removeEventListener('keydown', this.handleKeyDown);

		return true;
	}
}
