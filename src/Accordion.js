import Panel from '@/Panel';


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
	constructor(element) {
		this.accordion = element;
		this.accordions = [...this.accordion.querySelectorAll('.js-accordion-panel')];
		this.panels = [];
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

		this.accordions.map(element => {
			const panel = new Panel(element);

			panel.init();
			this.panels.push(panel);

			element.addEventListener('Panel.open', () => {
				this.closeAll();
			});

			element.addEventListener('Panel.close', () => {

			});

			return true;
		});

		return true;
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
