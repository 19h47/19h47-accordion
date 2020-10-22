import { setInactive, setActive, dispatchEvent } from '@/utils';

const EXPANDED = 'aria-expanded';
// const MULTISELECTABLE = 'aria-multiselectable';

/**
 * Panel
 *
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */
export default class Panel {
	/**
	 * Constructor
	 *
	 * @param {object} element
	 * @param {object} options
	 */
	constructor(element, options) {
		this.rootElement = element;
		this.options = options;
	}

	init() {
		this.$button = this.rootElement.querySelector('.js-accordion-header');
		this.$body = this.rootElement.querySelector('.js-accordion-body');
		this.$inner = this.rootElement.querySelector('.js-accordion-inner');

		this.isDeselect = JSON.parse(this.rootElement.getAttribute('data-accordion-deselect'));
		this.isOpen = JSON.parse(this.rootElement.getAttribute('data-accordion-open')) || false;

		// Bind
		this.handleResize = this.handleResize.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.$body.style.setProperty('max-height', 0);
		this.$body.style.setProperty('overflow', 'hidden');

		this.handleResize();
		this.initEvents();

		if (true === this.isOpen) {
			this.open();
		}
	}

	initEvents() {
		this.$button.addEventListener('click', this.handleClick);
		window.addEventListener('resize', this.handleResize);
	}

	handleClick() {
		// console.info('Panel.handleClick', this.isOpen);

		if (false === this.isDeselect && true === this.isOpen) {
			return false;
		}

		if (true === this.isOpen) {
			dispatchEvent(this.rootElement, { current: this.rootElement }, 'close');

			return this.close();
		}

		if (false === this.isOpen) {
			dispatchEvent(this.rootElement, { current: this.rootElement }, 'open');

			return this.open();
		}

		return true;
	}

	handleResize() {
		// console.info('Panel.handleResize');

		this.height = this.$inner.offsetHeight;

		if (this.isOpen) {
			this.$body.style.setProperty('max-height', `${this.height}px`);
		}
	}

	close() {
		// console.info('Panel.close', this.isOpen);

		this.rootElement.setAttribute('data-accordion-open', false);
		this.$button.setAttribute(EXPANDED, false);

		this.$body.style.setProperty('max-height', 0);

		setInactive(this.rootElement);

		this.isOpen = false;
	}

	open() {
		// console.info('Panel.open');

		this.rootElement.setAttribute('data-accordion-open', true);
		this.$button.setAttribute(EXPANDED, true);

		this.$body.style.setProperty('max-height', `${this.height}px`);

		setActive(this.rootElement);

		this.isOpen = true;
	}

	destroy() {
		// console.info('Panel.destroy');

		this.$button.removeEventListener('click', this.handleClick);
		window.removeEventListener('resize', this.handleResize);
		this.$body.style.removeProperty('max-height');
		this.$body.style.removeProperty('overflow');

		setInactive(this.rootElement);
	}
}
