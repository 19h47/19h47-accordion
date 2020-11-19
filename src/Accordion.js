import Panel from '@/Panel';
import { ARROW_UP, ARROW_RIGHT, ARROW_DOWN, ARROW_LEFT, HOME, END } from '@19h47/keycode';

const optionsDefault = {
	multiselectable: false,
};

/**
 * Accordion
 *
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */
export default class Accordion {
	/**
	 * Constructor
	 *
	 * @param {object} element
	 * @param {object} options
	 */
	constructor(element, options = {}) {
		this.rootElement = element;
		this.accordions = [];
		this.panels = [];
		this.current = 0;

		this.options = { ...optionsDefault, ...options };

		// Bind.
		this.handleHashchange = this.handleHashchange.bind(this);
		this.handleKeydown = this.handleKeydown.bind(this);
	}

	/**
	 * Init
	 */
	init() {
		// No need to go further if no element have been given
		if (null === this.rootElement || undefined === this.rootElement) {
			return false;
		}

		this.accordions = [...this.rootElement.children].filter(panel =>
			panel.classList.contains('js-accordion-panel'),
		);

		this.accordions.forEach((element, index) => {
			const panel = new Panel(element, { hash: this.options.hash });

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
	initEvents() {
		window.addEventListener('hashchange', this.handleHashchange, false);
		this.rootElement.addEventListener('keydown', this.handleKeydown);
	}

	/**
	 * handleHashchange
	 */
	handleHashchange() {
		const {
			location: { hash },
		} = window;

		if (1 > window.location.hash.length) {
			return;
		}

		this.panels.forEach((panel, index) => {
			if (panel.$body.id === hash.substring(1)) {
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
	handleKeydown(event) {
		const key = event.keyCode || event.which;

		const next = () => {
			this.current = this.current + 1 > this.panels.length - 1 ? 0 : this.current + 1;

			this.panels[this.current].$button.focus();

			event.preventDefault();
		};

		const previous = () => {
			this.current = 0 > this.current - 1 ? this.panels.length - 1 : this.current - 1;

			this.panels[this.current].$button.focus();

			event.preventDefault();
		};

		const first = () => {
			this.panels[0].$button.focus();

			event.preventDefault();
		};

		const last = () => {
			this.panels[this.panels.length - 1].$button.focus();

			event.preventDefault();
		};

		const codes = {
			[ARROW_UP]: previous,
			[ARROW_RIGHT]: next,
			[ARROW_DOWN]: next,
			[ARROW_LEFT]: previous,
			[HOME]: first,
			[END]: last,
			default: () => false,
		};

		return (codes[key] || codes.default)();
	}

	/**
	 * closeAll
	 */
	closeAll = () => this.panels.forEach(panel => panel.close());

	/**
	 * destroyAll
	 */
	destroyAll() {
		this.panels.forEach(panel => panel.destroy());
		this.panels = [];

		window.removeEventListener('hashchange', this.handleHashchange, false);
		this.rootElement.removeEventListener('keydown', this.handleKeydown);

		return true;
	}
}
