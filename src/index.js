const EXPANDED = 'aria-expanded';
// const MULTISELECTABLE = 'aria-multiselectable';

/**
 * Accordion
 *
 * @author	Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
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
		this.panels = null;
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

		this.panels = [...this.accordion.querySelectorAll('.js-accordion-panel')];

		this.panels.map((panel) => this.initPanel(panel));

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
		const open = JSON.parse($element.getAttribute('data-accordion-open'));

		const panel = {
			$body,
			$button,
			$element,
			$inner,
			deselect: JSON.parse($element.getAttribute('data-accordion-deselect')),
			height: $inner.offsetHeight,
		};

		if (true === open) {
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
		const open = JSON.parse(current.$element.getAttribute('data-accordion-open'));
		const closeEvent = new CustomEvent('Accordion.close', {
			detail: {
				current,
			},
		});

		// First of all, we check attribute deselect
		// If data attribute deselect is set to true and panel is open
		if (false === current.deselect && true === open) {
			return false;
		}

		// dispatchEvent close event on current panel
		if (open) {
			this.accordion.dispatchEvent(closeEvent);
		}

		// Next, we close all panels
		Accordion.closeAll(this.panels);

		// If panel is already open
		if (true === open) {
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
		const openEvent = new CustomEvent('Accordion.open', {
			detail: {
				current,
			},
		});

		current.$element.setAttribute('data-accordion-open', true);
		current.$button.setAttribute(EXPANDED, true);

		current.$body.style.maxHeight = `${panel.height}px`;

		Accordion.setActive(panel.$element);
		Accordion.setActive(this.accordion);

		this.accordion.dispatchEvent(openEvent);

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

		panel.setAttribute('data-accordion-open', false);

		$button.setAttribute(EXPANDED, false);
		$body.style.maxHeight = 0;

		Accordion.setInactive(panel);
	}


	/**
	 * Close all
	 *
	 * @param 	arr 	elements
	 * @return	void
	 */
	static closeAll(elements) {
		return elements.map((element) => Accordion.close(element));
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
