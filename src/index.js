/**
 * Accordion
 *
 * @author	Jérémy Levron <jeremylevron@19h47.fr>
 */
export default class AccordionStyle {
	/**
	 * Constructor
	 *
	 * @param	obj		DOM element
	 * @return 	void
	 */
	constructor(element) {
		this.accordion = element;
		this.panels = null;
	}


	/**
	 * init
	 *
	 * @return 	bool
	 */
	init() {
		// No need to go further if no element have been given
		if (this.accordion === null || this.accordion === undefined) return false;

		this.panels = this.accordion.querySelectorAll('.js-accordion-panel');

		for (let i = 0; i < this.panels.length; i += 1) {
			this.initPanel(this.panels[i]);
		}

		return true;
	}


	/**
	 * init panel
	 *
	 * @param	obj		DOM element
	 * @return	void
	 */
	initPanel($element) {
		const $button = $element.querySelector('.js-accordion-header');
		const $body = $element.querySelector('.js-accordion-body');
		const $inner = $body.querySelector('.js-accordion-inner');
		const open = $element.getAttribute('data-accordion-open');

		const panel = {
			$body,
			$button,
			$element,
			$inner,
			deselect: $element.getAttribute('data-accordion-deselect'),
			height: $inner.offsetHeight,
		};

		if (open === 'true') {
			this.open(panel);
		}

		$button.addEventListener('click', () => this.toggle($element, panel));
	}


	/**
	 * toggle
	 *
	 * @param 	$element 	DOM element
	 * @param	obj			panel
	 * @return	void
	 */
	toggle($element, panel) {
		const current = panel;
		const open = current.$element.getAttribute('data-accordion-open');

		// First of all, we check attribute deselect
		// If data attribute deselect is set to true and panel is open
		if (current.deselect === 'false' && open === 'true') {
			return false;
		}

		// Next, we close all panels
		AccordionStyle.closeAll(this.panels);

		// If panel is already open
		if (open === 'true') {
			return true;
		}

		// Else open it
		return this.open(current);
	}


	/**
	 * open
	 *
	 * @param	obj		panel
	 * @return	bool
	 */
	open(panel) {
		const current = panel;

		current.$element.setAttribute('data-accordion-open', 'true');
		current.$button.setAttribute('aria-expanded', 'true');

		current.$body.style.maxHeight = `${panel.height}px`;

		AccordionStyle.setActive(panel.$element);
		AccordionStyle.setActive(this.accordion);

		return true;
	}


	/**
	 * close
	 *
	 * @param	obj		panel
	 * @access 	static
	 * @return	void
	 */
	static close(panel) {
		const $body = panel.querySelector('.js-accordion-body');
		const $button = panel.querySelector('.js-accordion-header');

		panel.setAttribute('data-accordion-open', 'false');

		$button.setAttribute('aria-expanded', false);
		$body.style.maxHeight = 0;

		AccordionStyle.setInactive(panel);
	}


	/**
	 * Close all
	 *
	 * @param 	obj 	elements
	 * @return	void
	 */
	static closeAll(elements) {
		for (let i = 0; i < elements.length; i += 1) {
			AccordionStyle.close(elements[i]);
		}
	}


	/**
	 * Inactive element
	 *
	 * @param	obj		element		DOM element
	 * @access	static
	 * @return	void
	 */
	static setInactive(element) {
		return element.classList.remove('is-active');
	}


	/**
	 * Active element
	 *
	 * @param	obj		element		DOM element
	 * @access	static
	 * @return 	void
	 */
	static setActive(element) {
		return element.classList.add('is-active');
	}
}
