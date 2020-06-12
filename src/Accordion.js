import Panel from '@/Panel';
import {
	ARROW_UP,
	ARROW_RIGHT,
	ARROW_DOWN,
	ARROW_LEFT,
	// SPACE,
	HOME,
	END,
} from '@19h47/keycode';

const optionsDefault = {
	multiselectable: false,
};

/**
 * Accordion
 *
 * @author	Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */
export default class Accordion {
	/**
	 * Constructor
	 *
	 * @param	obj		DOM element
	 * @return 	void
	 */
	constructor(element, options = {}) {
		this.rootElement = element;
		this.accordions = [];
		this.panels = [];
		this.current = 0;

		this.options = { ...optionsDefault, ...options };

		// Bind.
		this.loadFromUrl = this.loadFromUrl.bind(this);
		this.onKeydown = this.onKeydown.bind(this);
	}

	/**
	 * init
	 *
	 * @return 	bool
	 */
	init() {
		// No need to go further if no element have been given
		if (null === this.rootElement || undefined === this.rootElement) {
			return false;
		}

		this.accordions = [...this.rootElement.querySelectorAll('.js-accordion-panel')];

		this.accordions.map((element, index) => {
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
		this.loadFromUrl();

		return true;
	}

	initEvents() {
		window.addEventListener('hashchange', this.loadFromUrl, false);
		this.rootElement.addEventListener('keydown', this.onKeydown);
	}

	loadFromUrl() {
		const {
			location: { hash },
		} = window;

		if (1 > window.location.hash.length) {
			return;
		}

		this.panels.map((panel, index) => {
			if (panel.$body.id === hash.substring(1)) {
				this.current = index;
				this.closeAll();
				return panel.open();
			}

			return true;
		});
	}

	/**
	 * Close all
	 *
	 * @return	void
	 */
	closeAll() {
		// console.info('Accordion.closeAll');

		return this.panels.map(panel => panel.close());
	}

	destroyAll() {
		this.panels.map(panel => panel.destroy());
		this.panels = [];

		return true;
	}

	/**
	 * Keydown event listener
	 *
	 */
	onKeydown(event) {
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
}
