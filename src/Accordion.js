import Panel from '@/Panel';


const optionsDefault = {};


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
		this.accordion = element;
		this.accordions = [];
		this.panels = [];

		this.options = { ...optionsDefault, ...options };

		// Bind.
		this.loadFromUrl = this.loadFromUrl.bind(this);
	}


	/**
	 * init
	 *
	 * @return 	bool
	 */
	init() {
		// No need to go further if no element have been given
		if (null === this.accordion || undefined === this.accordion) {
			return false;
		}

		this.accordions = [...this.accordion.querySelectorAll('.js-accordion-panel')];

		this.accordions.map(element => {
			const panel = new Panel(element, { hash: this.options.hash });

			panel.init();
			this.panels.push(panel);

			element.addEventListener('Panel.open', () => {
				this.closeAll();
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
	}


	loadFromUrl() {
		const { location: { hash } } = window;

		if (1 > window.location.hash.length) {
			return;
		}

		this.panels.map(panel => {
			if (panel.$body.id === hash.substring(1)) {
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
		return this.panels.map(panel => panel.close());
	}


	destroyAll() {
		this.panels.map(panel => panel.destroy());
		this.panels = [];

		return true;
	}
}
