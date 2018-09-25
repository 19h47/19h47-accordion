import EventEmitter from 'tom32i-event-emitter.js';


/**
 * Accordion
 *
 * @author	Jérémy Levron <jeremylevron@19h47.fr>
 */
export default class AccordionStyle extends EventEmitter {
	/**
	 * Constructor
	 *
	 * @param	obj		DOM element
	 * @return
	 */
	constructor(element) {
		super();

		// eslint-disable-next-line
		this.accordion = element;
		this.panels = null;
	}


	/**
	 * init
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


	on(eventName, callback, context) {
		this.emitter.on(`accordion.${eventName}`, callback, context);
	}


	/**
	 * init panel
	 *
	 * @param	obj		DOM
	 */
	initPanel(element) {
		const $button = element.querySelector('.js-accordion-header');
		const $body = element.querySelector('.js-accordion-body');
		const $inner = $body.querySelector('.js-accordion-inner');

		const panel = {
			body: $body,
			$button,
			height: $inner.offsetHeight,
			element,
			inner: $body.querySelector('.js-accordion-inner'),
			open: element.getAttribute('data-accordion-open'),
		};

		if (panel.open === 'true') {
			this.open(panel);
		}

		$button.addEventListener('click', () => this.toggle(element, panel));
	}


	/**
	 * toggle
	 *
	 * @param	obj		panel
	 */
	toggle(element, panel) {
		// Update panel.open
		// eslint-disable-next-line
		panel.open = element.getAttribute('data-accordion-open');

		// First we close all panels
		this.closeAll();

		// If panel is already open
		if (panel.open === 'true') {
			// eslint-disable-next-line
			panel.open = 'false';
			return true;
		}

		// Else open it
		return this.open(panel);
	}


	/**
	 * open
	 *
	 * @param	obj		panel
	 */
	open(panel) {
		panel.element.setAttribute('data-accordion-open', 'true');
		panel.$button.setAttribute('aria-expanded', 'true');
		console.log(panel);

		// eslint-disable-next-line
		panel.open = 'true';

		// eslint-disable-next-line
		panel.body.style.maxHeight = `${panel.height}px`;

		AccordionStyle.setActive(panel.element);
		AccordionStyle.setActive(this.accordion);

		this.emit('open');

		return true;
	}


	/**
	 * close
	 *
	 * @param	obj		panel
	 */
	// close(panel) {
	// 	panel.element.setAttribute('data-accordion-open', 'false');
	// 	panel.$button.setAttribute('aria-expanded', false);
	//
	// 	// eslint-disable-next-line
	// 	panel.open = 'false';
	//
	// 	// eslint-disable-next-line
	// 	panel.body.style.maxHeight = 0;
	//
	// 	AccordionStyle.setInactive(this.accordion);
	// 	AccordionStyle.setInactive(panel.element);
	//
	// 	this.emit('close');
	//
	// 	return true;
	// }


	/**
	 * close all
	 */
	closeAll() {
		for (let i = 0; i < this.panels.length; i += 1) {
			const $body = this.panels[i].querySelector('.js-accordion-body');
			const $button = this.panels[i].querySelector('.js-accordion-header');

			this.panels[i].removeAttribute('data-accordion-open');

			$button.setAttribute('aria-expanded', false);
			$body.style.maxHeight = 0;

			AccordionStyle.setInactive(this.panels[i]);
		}
	}


	/**
	 * Inactive element
	 *
	 * @param	obj		element		DOM element
	 * @access	static
	 * @return
	 */
	static setInactive(element) {
		return element.classList.remove('is-active');
	}


	/**
	 * Active element
	 *
	 * @param	obj		element		DOM element
	 * @access	static
	 * @return
	 */
	static setActive(element) {
		return element.classList.add('is-active');
	}
}
