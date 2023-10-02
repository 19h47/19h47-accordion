import Panel from './Panel';
import { getURLHash } from './utils';

interface Options {
	multiselectable?: boolean;
}

const optionsDefault = {
	multiselectable: false,
};

/**
 * Accordion
 *
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */
export default class Accordion {
	el: HTMLElement;
	accordions: HTMLElement[] = [];
	panels: Panel[] = [];
	current: number = 0;
	options: Options;

	/**
	 * Constructor
	 *
	 * @param {object} el
	 * @param {Options} options
	 */
	constructor(el: HTMLElement, options: Options = {}) {
		this.el = el;

		this.options = { ...optionsDefault, ...options };

		// Bind.
		this.handleHashchange = this.handleHashchange.bind(this);
		this.handleKeydown = this.handleKeydown.bind(this);
	}

	/**
	 * Init
	 */
	init(): boolean {
		// No need to go further if no element have been given
		if (null === this.el || undefined === this.el) {
			return false;
		}

		this.accordions = [...this.el.children].filter(panel =>
			panel.classList.contains('js-accordion-panel'),
		) as HTMLElement[];

		this.accordions.forEach((element, index) => {
			const panel = new Panel(element);

			panel.init();
			this.panels.push(panel);

			element.addEventListener('Panel.open', () => {
				this.current = index;

				if (!this.options.multiselectable) {
					this.closeAll();
				}
			});

			// element.addEventListener('Panel.close', () => {});

			return true;
		});

		this.initEvents();
		this.handleHashchange();

		return true;
	}

	/**
	 * InitEvents
	 */
	initEvents(): void {
		window.addEventListener('hashchange', this.handleHashchange);
		this.el.addEventListener('keydown', this.handleKeydown);
	}

	/**
	 * handleHashchange
	 */
	handleHashchange(): void {
		this.panels.forEach((panel, index) => {
			if (panel.$body && `#${panel.$body.id}` === getURLHash()) {
				this.current = index;
				this.closeAll();

				return panel.open();
			}

			return true;
		});
	}

	/**
	 * Handle keydown
	 *
	 * @param {object} event
	 */
	handleKeydown(event: KeyboardEvent): any {
		const { target, key, code } = event;

		const next = () => {
			if ((target as HTMLElement).classList.contains('js-accordion-header')) {
				this.current = this.current + 1 > this.panels.length - 1 ? 0 : this.current + 1;

				this.panels[this.current].$button?.focus();

				event.preventDefault();
			}
		};

		const previous = () => {
			if ((target as HTMLElement).classList.contains('js-accordion-header')) {
				this.current = 0 > this.current - 1 ? this.panels.length - 1 : this.current - 1;

				this.panels[this.current].$button?.focus();

				event.preventDefault();
			}
		};

		const first = () => {
			this.panels[0].$button?.focus();

			event.preventDefault();
		};

		const last = () => {
			this.panels[this.panels.length - 1].$button?.focus();

			event.preventDefault();
		};

		const codes : any = {
			ArrowUp: previous,
			ArrowRight: next,
			ArrowDown: next,
			ArrowLeft: previous,
			Home: first,
			End: last,
			default: () => false,
		};

		return (codes[key || code] || codes.default)();
	}

	/**
	 * closeAll
	 */
	closeAll = () => this.panels.forEach(panel => panel.close());

	/**
	 * destroyAll
	 */
	destroyAll(): boolean {
		this.panels.forEach(panel => panel.destroy());
		this.panels = [];

		window.removeEventListener('hashchange', this.handleHashchange, false);
		this.el.removeEventListener('keydown', this.handleKeydown);

		return true;
	}
}
