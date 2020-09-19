import { setInactive, setActive } from '@/utils';

const EXPANDED = 'aria-expanded';
// const MULTISELECTABLE = 'aria-multiselectable';

const dispatchEvent = (target, details, name) => {
	// console.info(`Panel.${name}`);

	// Create a new event.
	const event = new CustomEvent(`Panel.${name}`, {
		bubbles: true,
		cancelable: true,
		detail: details,
	});

	// Dispatch the event on target.
	target.dispatchEvent(event);
};

/**
 * Panel
 */
export default class Panel {
	/**
	 * Constructor
	 *
	 * @param {*} element
	 * @param {*} options
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
		this.onResize = this.onResize.bind(this);
		this.toggle = this.toggle.bind(this);

		this.$body.style.setProperty('max-height', 0);
		this.$body.style.setProperty('overflow', 'hidden');

		this.onResize();
		this.initEvents();

		if (true === this.isOpen) {
			this.open();
		}
	}

	initEvents() {
		window.addEventListener('resize', this.onResize);
		this.$button.addEventListener('click', this.toggle);
	}

	toggle() {
		// console.info('Panel.toggle', this.isOpen);

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

		this.$button.removeEventListener('click', this.toggle);
		window.removeEventListener('resize', this.onResize);
		this.$body.style.removeProperty('max-height');
		this.$body.style.removeProperty('overflow');

		setInactive(this.rootElement);
	}

	onResize() {
		// console.info('Panel.onResize');

		this.height = this.$inner.offsetHeight;

		if (this.isOpen) {
			this.$body.style.setProperty('max-height', `${this.height}px`);
		}
	}
}
